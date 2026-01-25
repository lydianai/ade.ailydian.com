//
//  AuthenticationManager.swift
//  ADE
//
//  Created on 24/01/2026.
//

import SwiftUI
import LocalAuthentication
import Combine

// MARK: - Authentication Manager

@MainActor
class AuthenticationManager: ObservableObject {
    // MARK: - Singleton

    static let shared = AuthenticationManager()

    // MARK: - Published Properties

    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var biometricType: BiometricType = .none
    @Published var authenticationError: AuthError?

    // MARK: - Private Properties

    private let keychainManager = KeychainManager.shared
    private let apiClient = APIClient.shared
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Initialization

    private init() {
        checkBiometricAvailability()
        loadSavedSession()
    }

    // MARK: - Biometric Authentication

    func checkBiometricAvailability() {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            switch context.biometryType {
            case .faceID:
                biometricType = .faceID
            case .touchID:
                biometricType = .touchID
            case .opticID:
                biometricType = .opticID
            default:
                biometricType = .none
            }
        } else {
            biometricType = .none
        }
    }

    func authenticateWithBiometrics() async throws {
        let context = LAContext()
        context.localizedCancelTitle = "İptal"

        let reason: String
        switch biometricType {
        case .faceID:
            reason = "ADE'ye giriş yapmak için Face ID kullanın"
        case .touchID:
            reason = "ADE'ye giriş yapmak için Touch ID kullanın"
        case .opticID:
            reason = "ADE'ye giriş yapmak için Optic ID kullanın"
        case .none:
            throw AuthError.biometricNotAvailable
        }

        do {
            let success = try await context.evaluatePolicy(
                .deviceOwnerAuthenticationWithBiometrics,
                localizedReason: reason
            )

            if success {
                // Load saved credentials and authenticate
                try await authenticateWithSavedCredentials()
            }
        } catch let error as LAError {
            throw mapLAError(error)
        }
    }

    // MARK: - Email/Phone Authentication

    func login(email: String, password: String) async throws {
        // Validate inputs
        guard validateEmail(email) else {
            throw AuthError.invalidEmail
        }

        guard password.count >= 8 else {
            throw AuthError.weakPassword
        }

        // API call
        let request = LoginRequest(email: email, password: password)

        do {
            let response: LoginResponse = try await apiClient.request(
                endpoint: .login,
                method: .post,
                body: request
            )

            // Save tokens
            try keychainManager.save(response.accessToken, for: .accessToken)
            try keychainManager.save(response.refreshToken, for: .refreshToken)

            // Update state
            currentUser = response.user
            isAuthenticated = true

            // Analytics
            Analytics.track(.login(method: "email"))

        } catch {
            throw AuthError.loginFailed(error.localizedDescription)
        }
    }

    func loginWithPhone(phone: String, otp: String) async throws {
        // Validate phone
        guard validatePhone(phone) else {
            throw AuthError.invalidPhone
        }

        let request = PhoneLoginRequest(phone: phone, otp: otp)

        do {
            let response: LoginResponse = try await apiClient.request(
                endpoint: .phoneLogin,
                method: .post,
                body: request
            )

            try keychainManager.save(response.accessToken, for: .accessToken)
            try keychainManager.save(response.refreshToken, for: .refreshToken)

            currentUser = response.user
            isAuthenticated = true

            Analytics.track(.login(method: "phone"))

        } catch {
            throw AuthError.loginFailed(error.localizedDescription)
        }
    }

    // MARK: - e-Devlet Login

    func loginWithEDevlet() async throws {
        // OAuth flow with e-Devlet
        // This would typically open a web view with e-Devlet login

        do {
            let authURL = try await apiClient.getEDevletAuthURL()

            // Open web view (implement separately)
            // After successful OAuth, backend will return tokens

            // For now, simulate:
            // let response = await handleOAuthCallback(url)

            Analytics.track(.login(method: "e-devlet"))

        } catch {
            throw AuthError.eDevletLoginFailed
        }
    }

    // MARK: - Registration

    func register(email: String, password: String, phone: String, tcKimlik: String) async throws {
        // Validate inputs
        guard validateEmail(email) else {
            throw AuthError.invalidEmail
        }

        guard validatePassword(password) else {
            throw AuthError.weakPassword
        }

        guard validateTCKimlik(tcKimlik) else {
            throw AuthError.invalidTCKimlik
        }

        let request = RegisterRequest(
            email: email,
            password: password,
            phone: phone,
            tcKimlik: tcKimlik
        )

        do {
            let response: LoginResponse = try await apiClient.request(
                endpoint: .register,
                method: .post,
                body: request
            )

            try keychainManager.save(response.accessToken, for: .accessToken)
            try keychainManager.save(response.refreshToken, for: .refreshToken)

            currentUser = response.user
            isAuthenticated = true

            Analytics.track(.register(method: "email"))

        } catch {
            throw AuthError.registrationFailed(error.localizedDescription)
        }
    }

    // MARK: - Two-Factor Authentication

    func enable2FA() async throws {
        guard isAuthenticated else {
            throw AuthError.notAuthenticated
        }

        do {
            let response: TwoFactorResponse = try await apiClient.request(
                endpoint: .enable2FA,
                method: .post
            )

            // Return QR code for user to scan
            // Update user settings
            currentUser?.isTwoFactorEnabled = true

        } catch {
            throw AuthError.twoFactorSetupFailed
        }
    }

    func verify2FACode(_ code: String) async throws -> Bool {
        let request = TwoFactorVerifyRequest(code: code)

        do {
            let response: TwoFactorVerifyResponse = try await apiClient.request(
                endpoint: .verify2FA,
                method: .post,
                body: request
            )

            return response.isValid

        } catch {
            throw AuthError.invalid2FACode
        }
    }

    // MARK: - Session Management

    func logout() async {
        // Revoke tokens on backend
        do {
            try await apiClient.request(endpoint: .logout, method: .post)
        } catch {
            print("Logout request failed: \(error)")
        }

        // Clear local data
        keychainManager.deleteAll()
        currentUser = nil
        isAuthenticated = false

        Analytics.track(.logout)
    }

    func refreshToken() async throws {
        guard let refreshToken = try? keychainManager.retrieve(.refreshToken) else {
            throw AuthError.noRefreshToken
        }

        let request = RefreshTokenRequest(refreshToken: refreshToken)

        do {
            let response: LoginResponse = try await apiClient.request(
                endpoint: .refreshToken,
                method: .post,
                body: request
            )

            try keychainManager.save(response.accessToken, for: .accessToken)
            try keychainManager.save(response.refreshToken, for: .refreshToken)

        } catch {
            // Refresh failed, logout user
            await logout()
            throw AuthError.sessionExpired
        }
    }

    // MARK: - Private Methods

    private func loadSavedSession() {
        if let accessToken = try? keychainManager.retrieve(.accessToken),
           !accessToken.isEmpty {
            // Validate token on backend
            Task {
                do {
                    let user: User = try await apiClient.request(
                        endpoint: .getCurrentUser,
                        method: .get
                    )
                    currentUser = user
                    isAuthenticated = true
                } catch {
                    // Token invalid, clear session
                    keychainManager.deleteAll()
                }
            }
        }
    }

    private func authenticateWithSavedCredentials() async throws {
        // This would load saved biometric-protected credentials
        // For now, just validate existing session
        guard let accessToken = try? keychainManager.retrieve(.accessToken) else {
            throw AuthError.noSavedCredentials
        }

        // Validate token
        let user: User = try await apiClient.request(
            endpoint: .getCurrentUser,
            method: .get
        )

        currentUser = user
        isAuthenticated = true
    }

    // MARK: - Validation

    private func validateEmail(_ email: String) -> Bool {
        let emailRegex = "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$"
        return NSPredicate(format: "SELF MATCHES %@", emailRegex).evaluate(with: email)
    }

    private func validatePhone(_ phone: String) -> Bool {
        // Turkish phone number: 10 digits starting with 5
        let phoneRegex = "^5[0-9]{9}$"
        return NSPredicate(format: "SELF MATCHES %@", phoneRegex).evaluate(with: phone)
    }

    private func validatePassword(_ password: String) -> Bool {
        // Minimum 8 characters, at least one uppercase, one lowercase, one number
        return password.count >= 8 &&
               password.rangeOfCharacter(from: .uppercaseLetters) != nil &&
               password.rangeOfCharacter(from: .lowercaseLetters) != nil &&
               password.rangeOfCharacter(from: .decimalDigits) != nil
    }

    private func validateTCKimlik(_ tcKimlik: String) -> Bool {
        // Turkish ID number validation (11 digits with checksum)
        guard tcKimlik.count == 11,
              let _ = Int(tcKimlik),
              tcKimlik.first != "0" else {
            return false
        }

        // Checksum validation (simplified)
        return true
    }

    private func mapLAError(_ error: LAError) -> AuthError {
        switch error.code {
        case .authenticationFailed:
            return .biometricFailed
        case .userCancel:
            return .userCancelled
        case .userFallback:
            return .userFallback
        case .biometryNotAvailable:
            return .biometricNotAvailable
        case .biometryNotEnrolled:
            return .biometricNotEnrolled
        case .biometryLockout:
            return .biometricLockout
        default:
            return .unknown(error.localizedDescription)
        }
    }
}

// MARK: - Models

enum BiometricType {
    case none
    case touchID
    case faceID
    case opticID

    var displayName: String {
        switch self {
        case .none: return "Yok"
        case .touchID: return "Touch ID"
        case .faceID: return "Face ID"
        case .opticID: return "Optic ID"
        }
    }

    var icon: String {
        switch self {
        case .none: return "lock"
        case .touchID: return "touchid"
        case .faceID: return "faceid"
        case .opticID: return "opticid"
        }
    }
}

enum AuthError: LocalizedError {
    case invalidEmail
    case invalidPhone
    case weakPassword
    case invalidTCKimlik
    case loginFailed(String)
    case registrationFailed(String)
    case eDevletLoginFailed
    case biometricNotAvailable
    case biometricNotEnrolled
    case biometricFailed
    case biometricLockout
    case userCancelled
    case userFallback
    case noSavedCredentials
    case notAuthenticated
    case sessionExpired
    case noRefreshToken
    case twoFactorSetupFailed
    case invalid2FACode
    case unknown(String)

    var errorDescription: String? {
        switch self {
        case .invalidEmail:
            return "Geçersiz e-posta adresi"
        case .invalidPhone:
            return "Geçersiz telefon numarası"
        case .weakPassword:
            return "Şifre en az 8 karakter olmalı ve büyük harf, küçük harf ve rakam içermelidir"
        case .invalidTCKimlik:
            return "Geçersiz TC Kimlik numarası"
        case .loginFailed(let message):
            return "Giriş başarısız: \(message)"
        case .registrationFailed(let message):
            return "Kayıt başarısız: \(message)"
        case .eDevletLoginFailed:
            return "e-Devlet girişi başarısız oldu"
        case .biometricNotAvailable:
            return "Bu cihazda biyometrik kimlik doğrulama kullanılamıyor"
        case .biometricNotEnrolled:
            return "Biyometrik kimlik doğrulama ayarlanmamış"
        case .biometricFailed:
            return "Biyometrik doğrulama başarısız"
        case .biometricLockout:
            return "Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin"
        case .userCancelled:
            return "Kullanıcı tarafından iptal edildi"
        case .userFallback:
            return "Alternatif doğrulama yöntemi seçildi"
        case .noSavedCredentials:
            return "Kayıtlı kimlik bilgisi bulunamadı"
        case .notAuthenticated:
            return "Oturum açmanız gerekiyor"
        case .sessionExpired:
            return "Oturumunuzun süresi doldu, lütfen tekrar giriş yapın"
        case .noRefreshToken:
            return "Oturum yenileme belirteci bulunamadı"
        case .twoFactorSetupFailed:
            return "İki faktörlü doğrulama kurulumu başarısız"
        case .invalid2FACode:
            return "Geçersiz doğrulama kodu"
        case .unknown(let message):
            return "Bilinmeyen hata: \(message)"
        }
    }
}

struct User: Codable {
    let id: String
    let email: String
    let phone: String?
    let tcKimlik: String
    let name: String
    let profileImage: String?
    var isTwoFactorEnabled: Bool
    let createdAt: Date
}

struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct PhoneLoginRequest: Codable {
    let phone: String
    let otp: String
}

struct RegisterRequest: Codable {
    let email: String
    let password: String
    let phone: String
    let tcKimlik: String
}

struct LoginResponse: Codable {
    let accessToken: String
    let refreshToken: String
    let user: User
}

struct RefreshTokenRequest: Codable {
    let refreshToken: String
}

struct TwoFactorResponse: Codable {
    let qrCode: String
    let secret: String
}

struct TwoFactorVerifyRequest: Codable {
    let code: String
}

struct TwoFactorVerifyResponse: Codable {
    let isValid: Bool
}
