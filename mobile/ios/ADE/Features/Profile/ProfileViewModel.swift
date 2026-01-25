import SwiftUI
import Combine

/**
 * Profile ViewModel
 *
 * Manages user profile and app settings
 *
 * @author ADE iOS Team
 * @since 2026-01-24
 */

@MainActor
class ProfileViewModel: ObservableObject {
    // MARK: - Published Properties

    @Published var user: User?

    // Notifications
    @Published var pushNotificationsEnabled = true
    @Published var emailNotificationsEnabled = true
    @Published var salesAlertsEnabled = true
    @Published var lowStockAlertsEnabled = true

    // Appearance
    @Published var selectedTheme: AppTheme = .system
    @Published var selectedLanguage: AppLanguage = .turkish

    // Security
    @Published var biometricEnabled = false
    @Published var twoFactorEnabled = false

    // App Info
    let appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
    let buildNumber = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "1"

    // MARK: - Private Properties

    private let apiClient = APIClient.shared
    private var cancellables = Set<AnyCancellable>()
    private let userDefaults = UserDefaults.standard

    // Keys
    private let pushNotifKey = "push_notifications_enabled"
    private let emailNotifKey = "email_notifications_enabled"
    private let salesAlertsKey = "sales_alerts_enabled"
    private let lowStockAlertsKey = "low_stock_alerts_enabled"
    private let themeKey = "selected_theme"
    private let languageKey = "selected_language"
    private let biometricKey = "biometric_enabled"
    private let twoFactorKey = "two_factor_enabled"

    // MARK: - Initialization

    init() {
        loadSettings()
        setupObservers()
    }

    private func loadSettings() {
        // Load notification settings
        pushNotificationsEnabled = userDefaults.bool(forKey: pushNotifKey)
        emailNotificationsEnabled = userDefaults.bool(forKey: emailNotifKey)
        salesAlertsEnabled = userDefaults.bool(forKey: salesAlertsKey)
        lowStockAlertsEnabled = userDefaults.bool(forKey: lowStockAlertsKey)

        // Load appearance settings
        if let themeRaw = userDefaults.string(forKey: themeKey),
           let theme = AppTheme(rawValue: themeRaw) {
            selectedTheme = theme
        }

        if let langRaw = userDefaults.string(forKey: languageKey),
           let language = AppLanguage(rawValue: langRaw) {
            selectedLanguage = language
        }

        // Load security settings
        biometricEnabled = userDefaults.bool(forKey: biometricKey)
        twoFactorEnabled = userDefaults.bool(forKey: twoFactorKey)
    }

    private func setupObservers() {
        // Notification settings
        $pushNotificationsEnabled
            .dropFirst()
            .sink { [weak self] value in
                self?.userDefaults.set(value, forKey: self?.pushNotifKey ?? "")
                self?.updateNotificationSettings()
            }
            .store(in: &cancellables)

        $emailNotificationsEnabled
            .dropFirst()
            .sink { [weak self] value in
                self?.userDefaults.set(value, forKey: self?.emailNotifKey ?? "")
                self?.updateNotificationSettings()
            }
            .store(in: &cancellables)

        $salesAlertsEnabled
            .dropFirst()
            .sink { [weak self] value in
                self?.userDefaults.set(value, forKey: self?.salesAlertsKey ?? "")
                self?.updateNotificationSettings()
            }
            .store(in: &cancellables)

        $lowStockAlertsEnabled
            .dropFirst()
            .sink { [weak self] value in
                self?.userDefaults.set(value, forKey: self?.lowStockAlertsKey ?? "")
                self?.updateNotificationSettings()
            }
            .store(in: &cancellables)

        // Appearance settings
        $selectedTheme
            .dropFirst()
            .sink { [weak self] theme in
                self?.userDefaults.set(theme.rawValue, forKey: self?.themeKey ?? "")
                self?.applyTheme(theme)
            }
            .store(in: &cancellables)

        $selectedLanguage
            .dropFirst()
            .sink { [weak self] language in
                self?.userDefaults.set(language.rawValue, forKey: self?.languageKey ?? "")
                // Apply language change
            }
            .store(in: &cancellables)

        // Security settings
        $biometricEnabled
            .dropFirst()
            .sink { [weak self] value in
                self?.userDefaults.set(value, forKey: self?.biometricKey ?? "")
                self?.updateSecuritySettings()
            }
            .store(in: &cancellables)

        $twoFactorEnabled
            .dropFirst()
            .sink { [weak self] value in
                self?.userDefaults.set(value, forKey: self?.twoFactorKey ?? "")
                if value {
                    self?.enableTwoFactor()
                } else {
                    self?.disableTwoFactor()
                }
            }
            .store(in: &cancellables)
    }

    // MARK: - Profile Management

    func loadUserProfile() async {
        do {
            let userResponse: User = try await apiClient.request(
                endpoint: .getProfile,
                method: .get,
                requiresAuth: true
            )

            user = userResponse

        } catch {
            print("Error loading profile: \(error)")
        }
    }

    func updateProfile(name: String, email: String, phone: String, companyName: String) async {
        do {
            let request = UpdateProfileRequest(
                name: name,
                email: email,
                phone: phone,
                companyName: companyName
            )

            let updatedUser: User = try await apiClient.request(
                endpoint: .updateProfile,
                method: .put,
                body: request,
                requiresAuth: true
            )

            user = updatedUser

        } catch {
            print("Error updating profile: \(error)")
        }
    }

    // MARK: - Settings Management

    private func updateNotificationSettings() {
        Task {
            do {
                let settings = NotificationSettings(
                    pushEnabled: pushNotificationsEnabled,
                    emailEnabled: emailNotificationsEnabled,
                    salesAlerts: salesAlertsEnabled,
                    lowStockAlerts: lowStockAlertsEnabled
                )

                let _: EmptyResponse = try await apiClient.request(
                    endpoint: .updateNotificationSettings,
                    method: .put,
                    body: settings,
                    requiresAuth: true
                )

            } catch {
                print("Error updating notification settings: \(error)")
            }
        }
    }

    private func updateSecuritySettings() {
        Task {
            do {
                let settings = SecuritySettings(
                    biometricEnabled: biometricEnabled,
                    twoFactorEnabled: twoFactorEnabled
                )

                let _: EmptyResponse = try await apiClient.request(
                    endpoint: .updateSecuritySettings,
                    method: .put,
                    body: settings,
                    requiresAuth: true
                )

            } catch {
                print("Error updating security settings: \(error)")
            }
        }
    }

    private func applyTheme(_ theme: AppTheme) {
        // Apply theme to the app
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
            windowScene.windows.forEach { window in
                switch theme {
                case .light:
                    window.overrideUserInterfaceStyle = .light
                case .dark:
                    window.overrideUserInterfaceStyle = .dark
                case .system:
                    window.overrideUserInterfaceStyle = .unspecified
                }
            }
        }
    }

    // MARK: - Two-Factor Authentication

    private func enableTwoFactor() {
        Task {
            do {
                let response: TwoFactorResponse = try await apiClient.request(
                    endpoint: .enableTwoFactor,
                    method: .post,
                    requiresAuth: true
                )

                // Show QR code or secret to user
                print("Two-factor secret: \(response.secret)")

            } catch {
                print("Error enabling two-factor: \(error)")
                twoFactorEnabled = false
            }
        }
    }

    private func disableTwoFactor() {
        Task {
            do {
                let _: EmptyResponse = try await apiClient.request(
                    endpoint: .disableTwoFactor,
                    method: .post,
                    requiresAuth: true
                )

            } catch {
                print("Error disabling two-factor: \(error)")
                twoFactorEnabled = true
            }
        }
    }

    // MARK: - Account Actions

    func logout() async {
        do {
            let _: EmptyResponse = try await apiClient.request(
                endpoint: .logout,
                method: .post,
                requiresAuth: true
            )

            // Clear local data
            userDefaults.removeObject(forKey: "access_token")
            userDefaults.removeObject(forKey: "refresh_token")

            // Navigate to login screen (handled by app coordinator)
            NotificationCenter.default.post(name: .userDidLogout, object: nil)

        } catch {
            print("Error logging out: \(error)")
        }
    }

    func deleteAccount() async {
        do {
            let _: EmptyResponse = try await apiClient.request(
                endpoint: .deleteAccount,
                method: .delete,
                requiresAuth: true
            )

            // Clear all local data
            if let bundleID = Bundle.main.bundleIdentifier {
                userDefaults.removePersistentDomain(forName: bundleID)
            }

            // Navigate to login screen
            NotificationCenter.default.post(name: .userDidLogout, object: nil)

        } catch {
            print("Error deleting account: \(error)")
        }
    }

    func rateApp() {
        if let url = URL(string: "https://apps.apple.com/app/id123456789") {
            UIApplication.shared.open(url)
        }
    }
}

// MARK: - Models

struct User: Codable {
    let id: String
    let name: String
    let email: String
    let phone: String?
    let companyName: String?
    let profileImageUrl: String?
}

struct UpdateProfileRequest: Encodable {
    let name: String
    let email: String
    let phone: String
    let companyName: String
}

struct NotificationSettings: Encodable {
    let pushEnabled: Bool
    let emailEnabled: Bool
    let salesAlerts: Bool
    let lowStockAlerts: Bool
}

struct SecuritySettings: Encodable {
    let biometricEnabled: Bool
    let twoFactorEnabled: Bool
}

struct TwoFactorResponse: Decodable {
    let secret: String
    let qrCode: String
}

struct EmptyResponse: Decodable {}

// MARK: - Enums

enum AppTheme: String, CaseIterable {
    case light = "light"
    case dark = "dark"
    case system = "system"

    var displayName: String {
        switch self {
        case .light: return "Açık"
        case .dark: return "Koyu"
        case .system: return "Sistem"
        }
    }
}

enum AppLanguage: String, CaseIterable {
    case turkish = "tr"
    case english = "en"

    var displayName: String {
        switch self {
        case .turkish: return "Türkçe"
        case .english: return "English"
        }
    }
}

// MARK: - Notifications

extension Notification.Name {
    static let userDidLogout = Notification.Name("userDidLogout")
}

// MARK: - API Endpoints

extension APIEndpoint {
    static let getProfile = APIEndpoint.custom(path: "/auth/profile")
    static let updateProfile = APIEndpoint.custom(path: "/auth/profile")
    static let updateNotificationSettings = APIEndpoint.custom(path: "/settings/notifications")
    static let updateSecuritySettings = APIEndpoint.custom(path: "/settings/security")
    static let enableTwoFactor = APIEndpoint.custom(path: "/auth/2fa/enable")
    static let disableTwoFactor = APIEndpoint.custom(path: "/auth/2fa/disable")
    static let logout = APIEndpoint.custom(path: "/auth/logout")
    static let deleteAccount = APIEndpoint.custom(path: "/auth/delete-account")
}
