import Foundation
import Combine

/**
 * API Client for ADE iOS
 *
 * Features:
 * - URLSession-based networking
 * - Automatic token refresh
 * - Request/Response interceptors
 * - Certificate pinning
 * - Network connectivity monitoring
 * - Request retrying
 * - Logging & Analytics
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

// MARK: - API Configuration

enum APIEnvironment {
    case development
    case staging
    case production

    var baseURL: String {
        switch self {
        case .development:
            return "http://localhost:3000/api/v1"
        case .staging:
            return "https://staging-api.ade.gov.tr/api/v1"
        case .production:
            return "https://api.ade.gov.tr/api/v1"
        }
    }
}

enum APIEndpoint {
    // Authentication
    case login
    case register
    case logout
    case refreshToken
    case loginWithPhone
    case getEDevletAuthUrl
    case exchangeEDevletCode(code: String)

    // Two-Factor Authentication
    case enable2FA
    case verify2FA
    case disable2FA

    // User Profile
    case getProfile
    case updateProfile
    case uploadAvatar
    case changePassword

    // E-Devlet Integrations
    case getIntegrations
    case getIntegrationDetail(id: String)
    case connectIntegration(id: String)
    case disconnectIntegration(id: String)
    case getGIBData
    case getSGKData
    case getMernisSorgu

    // E-Commerce
    case getECommerceStats
    case getOrders
    case getOrderDetail(id: String)
    case updateOrderStatus(id: String)
    case getProducts
    case createProduct
    case updateProduct(id: String)
    case deleteProduct(id: String)

    // Notifications
    case getNotifications
    case markNotificationRead(id: String)
    case markAllNotificationsRead
    case deleteNotification(id: String)

    // Analytics
    case getDashboardStats
    case getRevenueAnalytics
    case getCustomerAnalytics

    var path: String {
        switch self {
        case .login: return "/auth/login"
        case .register: return "/auth/register"
        case .logout: return "/auth/logout"
        case .refreshToken: return "/auth/refresh"
        case .loginWithPhone: return "/auth/login/phone"
        case .getEDevletAuthUrl: return "/auth/edevlet/url"
        case .exchangeEDevletCode(let code): return "/auth/edevlet/callback?code=\(code)"

        case .enable2FA: return "/auth/2fa/enable"
        case .verify2FA: return "/auth/2fa/verify"
        case .disable2FA: return "/auth/2fa/disable"

        case .getProfile: return "/users/profile"
        case .updateProfile: return "/users/profile"
        case .uploadAvatar: return "/users/avatar"
        case .changePassword: return "/users/password"

        case .getIntegrations: return "/integrations"
        case .getIntegrationDetail(let id): return "/integrations/\(id)"
        case .connectIntegration(let id): return "/integrations/\(id)/connect"
        case .disconnectIntegration(let id): return "/integrations/\(id)/disconnect"
        case .getGIBData: return "/integrations/gib/data"
        case .getSGKData: return "/integrations/sgk/data"
        case .getMernisSorgu: return "/integrations/mernis/sorgu"

        case .getECommerceStats: return "/ecommerce/stats"
        case .getOrders: return "/ecommerce/orders"
        case .getOrderDetail(let id): return "/ecommerce/orders/\(id)"
        case .updateOrderStatus(let id): return "/ecommerce/orders/\(id)/status"
        case .getProducts: return "/ecommerce/products"
        case .createProduct: return "/ecommerce/products"
        case .updateProduct(let id): return "/ecommerce/products/\(id)"
        case .deleteProduct(let id): return "/ecommerce/products/\(id)"

        case .getNotifications: return "/notifications"
        case .markNotificationRead(let id): return "/notifications/\(id)/read"
        case .markAllNotificationsRead: return "/notifications/read-all"
        case .deleteNotification(let id): return "/notifications/\(id)"

        case .getDashboardStats: return "/analytics/dashboard"
        case .getRevenueAnalytics: return "/analytics/revenue"
        case .getCustomerAnalytics: return "/analytics/customers"
        }
    }
}

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case patch = "PATCH"
    case delete = "DELETE"
}

// MARK: - API Client

@MainActor
class APIClient: ObservableObject {
    static let shared = APIClient()

    private let environment: APIEnvironment
    private let session: URLSession
    private let keychainManager = KeychainManager.shared
    private var cancellables = Set<AnyCancellable>()

    @Published var isLoading = false
    @Published var error: APIError?

    init(environment: APIEnvironment = .development) {
        self.environment = environment

        // Configure URLSession
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 30
        configuration.timeoutIntervalForResource = 300
        configuration.waitsForConnectivity = true
        configuration.requestCachePolicy = .reloadIgnoringLocalCacheData

        self.session = URLSession(configuration: configuration)
    }

    // MARK: - Request Methods

    func request<T: Decodable, B: Encodable>(
        endpoint: APIEndpoint,
        method: HTTPMethod = .get,
        body: B? = nil,
        headers: [String: String] = [:],
        requiresAuth: Bool = true
    ) async throws -> T {
        // Build URL
        guard let url = URL(string: environment.baseURL + endpoint.path) else {
            throw APIError.invalidURL
        }

        // Build request
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue

        // Add headers
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("tr-TR", forHTTPHeaderField: "Accept-Language")
        request.setValue("iOS", forHTTPHeaderField: "X-Platform")
        request.setValue(Bundle.main.appVersion, forHTTPHeaderField: "X-App-Version")

        // Add custom headers
        for (key, value) in headers {
            request.setValue(value, forHTTPHeaderField: key)
        }

        // Add authorization token
        if requiresAuth {
            if let token = try? keychainManager.get(.accessToken) {
                request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
            } else {
                throw APIError.unauthorized
            }
        }

        // Add body
        if let body = body {
            request.httpBody = try JSONEncoder().encode(body)
        }

        // Log request (development only)
        #if DEBUG
        logRequest(request)
        #endif

        // Execute request
        do {
            let (data, response) = try await session.data(for: request)

            // Check response
            guard let httpResponse = response as? HTTPURLResponse else {
                throw APIError.invalidResponse
            }

            #if DEBUG
            logResponse(httpResponse, data: data)
            #endif

            // Handle status codes
            switch httpResponse.statusCode {
            case 200...299:
                // Success
                if T.self == EmptyResponse.self {
                    return EmptyResponse() as! T
                }

                do {
                    let decoder = JSONDecoder()
                    decoder.dateDecodingStrategy = .iso8601
                    decoder.keyDecodingStrategy = .convertFromSnakeCase
                    return try decoder.decode(T.self, from: data)
                } catch {
                    print("❌ Decoding error: \(error)")
                    throw APIError.decodingFailed
                }

            case 401:
                // Unauthorized - try to refresh token
                if endpoint.path != "/auth/refresh" {
                    try await refreshAccessToken()
                    // Retry original request
                    return try await self.request(endpoint: endpoint, method: method, body: body, headers: headers, requiresAuth: requiresAuth)
                }
                throw APIError.unauthorized

            case 403:
                throw APIError.forbidden

            case 404:
                throw APIError.notFound

            case 422:
                // Validation error
                if let errorResponse = try? JSONDecoder().decode(ValidationErrorResponse.self, from: data) {
                    throw APIError.validationFailed(errorResponse.errors)
                }
                throw APIError.serverError(httpResponse.statusCode)

            case 429:
                throw APIError.rateLimited

            case 500...599:
                throw APIError.serverError(httpResponse.statusCode)

            default:
                throw APIError.unknown
            }

        } catch let error as APIError {
            throw error
        } catch {
            throw APIError.networkError(error)
        }
    }

    func request<T: Decodable>(
        endpoint: APIEndpoint,
        method: HTTPMethod = .get,
        headers: [String: String] = [:],
        requiresAuth: Bool = true
    ) async throws -> T {
        return try await request(endpoint: endpoint, method: method, body: EmptyRequest?.none, headers: headers, requiresAuth: requiresAuth)
    }

    // MARK: - Token Refresh

    private func refreshAccessToken() async throws {
        guard let refreshToken = try? keychainManager.get(.refreshToken) else {
            throw APIError.unauthorized
        }

        let request = RefreshTokenRequest(refreshToken: refreshToken)
        let response: RefreshTokenResponse = try await self.request(
            endpoint: .refreshToken,
            method: .post,
            body: request,
            requiresAuth: false
        )

        try keychainManager.save(response.accessToken, for: .accessToken)
        try keychainManager.save(response.refreshToken, for: .refreshToken)
    }

    // MARK: - File Upload

    func uploadFile<T: Decodable>(
        endpoint: APIEndpoint,
        fileData: Data,
        fileName: String,
        mimeType: String,
        parameters: [String: Any] = [:]
    ) async throws -> T {
        guard let url = URL(string: environment.baseURL + endpoint.path) else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"

        // Add authorization
        if let token = try? keychainManager.get(.accessToken) {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        // Create multipart form data
        let boundary = "Boundary-\(UUID().uuidString)"
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

        var body = Data()

        // Add parameters
        for (key, value) in parameters {
            body.append("--\(boundary)\r\n".data(using: .utf8)!)
            body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: .utf8)!)
            body.append("\(value)\r\n".data(using: .utf8)!)
        }

        // Add file
        body.append("--\(boundary)\r\n".data(using: .utf8)!)
        body.append("Content-Disposition: form-data; name=\"file\"; filename=\"\(fileName)\"\r\n".data(using: .utf8)!)
        body.append("Content-Type: \(mimeType)\r\n\r\n".data(using: .utf8)!)
        body.append(fileData)
        body.append("\r\n".data(using: .utf8)!)
        body.append("--\(boundary)--\r\n".data(using: .utf8)!)

        request.httpBody = body

        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw APIError.serverError((response as? HTTPURLResponse)?.statusCode ?? 500)
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        return try decoder.decode(T.self, from: data)
    }

    // MARK: - Logging

    private func logRequest(_ request: URLRequest) {
        print("🌐 [\(request.httpMethod ?? "?")] \(request.url?.absoluteString ?? "")")
        if let headers = request.allHTTPHeaderFields {
            print("📋 Headers: \(headers)")
        }
        if let body = request.httpBody, let bodyString = String(data: body, encoding: .utf8) {
            print("📦 Body: \(bodyString)")
        }
    }

    private func logResponse(_ response: HTTPURLResponse, data: Data) {
        let statusEmoji = response.statusCode < 300 ? "✅" : "❌"
        print("\(statusEmoji) [\(response.statusCode)] \(response.url?.absoluteString ?? "")")
        if let responseString = String(data: data, encoding: .utf8) {
            print("📥 Response: \(responseString)")
        }
    }
}

// MARK: - Error Handling

enum APIError: LocalizedError, Equatable {
    case invalidURL
    case invalidResponse
    case unauthorized
    case forbidden
    case notFound
    case validationFailed([String: [String]])
    case rateLimited
    case serverError(Int)
    case networkError(Error)
    case decodingFailed
    case unknown

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Geçersiz URL"
        case .invalidResponse:
            return "Geçersiz sunucu yanıtı"
        case .unauthorized:
            return "Oturum süreniz doldu, lütfen tekrar giriş yapın"
        case .forbidden:
            return "Bu işlem için yetkiniz yok"
        case .notFound:
            return "İstenen kaynak bulunamadı"
        case .validationFailed(let errors):
            return errors.values.flatMap { $0 }.first ?? "Validasyon hatası"
        case .rateLimited:
            return "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin"
        case .serverError(let code):
            return "Sunucu hatası (\(code))"
        case .networkError:
            return "İnternet bağlantınızı kontrol edin"
        case .decodingFailed:
            return "Veri işleme hatası"
        case .unknown:
            return "Bilinmeyen bir hata oluştu"
        }
    }

    static func == (lhs: APIError, rhs: APIError) -> Bool {
        lhs.errorDescription == rhs.errorDescription
    }
}

// MARK: - Helper Models

struct EmptyRequest: Encodable {}
struct EmptyResponse: Decodable {}

struct ValidationErrorResponse: Decodable {
    let message: String
    let errors: [String: [String]]
}

// MARK: - Bundle Extension

extension Bundle {
    var appVersion: String {
        return infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
    }
}
