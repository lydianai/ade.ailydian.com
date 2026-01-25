import Foundation

/**
 * API Data Models for ADE iOS
 *
 * All request/response models for API communication
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

// MARK: - Authentication Models

struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct LoginResponse: Codable {
    let accessToken: String
    let refreshToken: String
    let user: User
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
    let firstName: String?
    let lastName: String?
}

struct RefreshTokenRequest: Codable {
    let refreshToken: String
}

struct RefreshTokenResponse: Codable {
    let accessToken: String
    let refreshToken: String
}

// MARK: - Two-Factor Authentication

struct TwoFactorResponse: Codable {
    let secret: String
    let qrCode: String
    let backupCodes: [String]
}

struct TwoFactorVerifyRequest: Codable {
    let code: String
}

struct TwoFactorVerifyResponse: Codable {
    let isValid: Bool
}

// MARK: - User Models

struct User: Codable, Identifiable {
    let id: String
    let email: String
    let phone: String?
    let tcKimlik: String?
    let firstName: String?
    let lastName: String?
    let avatar: String?
    let role: UserRole
    let isEmailVerified: Bool
    let isPhoneVerified: Bool
    let is2FAEnabled: Bool
    let createdAt: Date
    let updatedAt: Date

    var fullName: String {
        if let firstName = firstName, let lastName = lastName {
            return "\(firstName) \(lastName)"
        }
        return email
    }

    var initials: String {
        if let firstName = firstName, let lastName = lastName {
            let first = firstName.prefix(1)
            let last = lastName.prefix(1)
            return "\(first)\(last)".uppercased()
        }
        return email.prefix(2).uppercased()
    }
}

enum UserRole: String, Codable {
    case user = "user"
    case admin = "admin"
    case superAdmin = "super_admin"
}

struct UpdateProfileRequest: Codable {
    let firstName: String?
    let lastName: String?
    let phone: String?
}

struct ChangePasswordRequest: Codable {
    let currentPassword: String
    let newPassword: String
}

// MARK: - Integration Models

struct Integration: Codable, Identifiable {
    let id: String
    let name: String
    let category: IntegrationCategory
    let description: String
    let icon: String
    let color: String
    let isConnected: Bool
    let isOfficial: Bool
    let isPremium: Bool
    let features: [String]
    let requiredCredentials: [String]
    let connectedAt: Date?
}

enum IntegrationCategory: String, Codable {
    case eDevlet = "e_devlet"
    case eCommerce = "e_commerce"
    case accounting = "accounting"
    case logistics = "logistics"
    case payment = "payment"
    case marketing = "marketing"
}

struct IntegrationDetail: Codable {
    let integration: Integration
    let credentials: [String: String]?
    let settings: [String: Any]?
    let lastSyncAt: Date?
    let syncStatus: SyncStatus
    let stats: IntegrationStats?
}

enum SyncStatus: String, Codable {
    case syncing = "syncing"
    case success = "success"
    case failed = "failed"
    case neverSynced = "never_synced"
}

struct IntegrationStats: Codable {
    let totalRequests: Int
    let successfulRequests: Int
    let failedRequests: Int
    let lastError: String?
}

struct ConnectIntegrationRequest: Codable {
    let credentials: [String: String]
    let settings: [String: String]?
}

// MARK: - E-Devlet Models

struct GIBData: Codable {
    let taxpayerId: String
    let companyName: String
    let taxOffice: String
    let status: String
    let invoices: [Invoice]
    let declarations: [TaxDeclaration]
}

struct Invoice: Codable, Identifiable {
    let id: String
    let type: InvoiceType
    let number: String
    let date: Date
    let amount: Decimal
    let currency: String
    let status: InvoiceStatus
    let customerId: String?
    let customerName: String?
}

enum InvoiceType: String, Codable {
    case sales = "sales"
    case purchase = "purchase"
    case eArchive = "e_archive"
    case eInvoice = "e_invoice"
}

enum InvoiceStatus: String, Codable {
    case draft = "draft"
    case sent = "sent"
    case approved = "approved"
    case rejected = "rejected"
    case cancelled = "cancelled"
}

struct TaxDeclaration: Codable, Identifiable {
    let id: String
    let period: String
    let type: String
    let amount: Decimal
    let submittedAt: Date?
    let status: String
}

struct SGKData: Codable {
    let employeeCount: Int
    let totalPremium: Decimal
    let lastPaymentDate: Date?
    let declarations: [SGKDeclaration]
}

struct SGKDeclaration: Codable, Identifiable {
    let id: String
    let period: String
    let employeeCount: Int
    let totalWages: Decimal
    let totalPremium: Decimal
    let status: String
}

struct MernisSorguResponse: Codable {
    let tcKimlik: String
    let firstName: String
    let lastName: String
    let birthYear: Int
    let isValid: Bool
}

// MARK: - E-Commerce Models

struct ECommerceStats: Codable {
    let totalRevenue: Decimal
    let totalOrders: Int
    let averageOrderValue: Decimal
    let platforms: [PlatformStats]
    let recentOrders: [Order]
    let topProducts: [ProductStats]
    let aiSuggestions: [AISuggestion]
}

struct PlatformStats: Codable, Identifiable {
    let id: String
    let platform: ECommercePlatform
    let orders: Int
    let revenue: Decimal
    let growth: String
    let status: String
}

enum ECommercePlatform: String, Codable {
    case hepsiburada = "hepsiburada"
    case trendyol = "trendyol"
    case n11 = "n11"
    case amazonTR = "amazon_tr"
    case shopify = "shopify"
    case woocommerce = "woocommerce"
}

struct Order: Codable, Identifiable {
    let id: String
    let platform: ECommercePlatform
    let orderNumber: String
    let date: Date
    let amount: Decimal
    let currency: String
    let status: OrderStatus
    let customer: Customer
    let items: [OrderItem]
    let shippingAddress: Address
    let trackingNumber: String?
}

enum OrderStatus: String, Codable {
    case pending = "pending"
    case confirmed = "confirmed"
    case processing = "processing"
    case shipped = "shipped"
    case delivered = "delivered"
    case cancelled = "cancelled"
    case refunded = "refunded"
}

struct Customer: Codable, Identifiable {
    let id: String
    let name: String
    let email: String?
    let phone: String?
}

struct OrderItem: Codable, Identifiable {
    let id: String
    let productId: String
    let productName: String
    let sku: String?
    let quantity: Int
    let price: Decimal
    let total: Decimal
}

struct Address: Codable {
    let street: String
    let city: String
    let district: String?
    let postalCode: String?
    let country: String
}

struct Product: Codable, Identifiable {
    let id: String
    let name: String
    let description: String
    let sku: String
    let price: Decimal
    let compareAtPrice: Decimal?
    let cost: Decimal?
    let stock: Int
    let category: String
    let images: [String]
    let platforms: [ECommercePlatform]
    let isActive: Bool
    let createdAt: Date
    let updatedAt: Date
}

struct ProductStats: Codable, Identifiable {
    let id: String
    let product: Product
    let sales: Int
    let revenue: Decimal
    let growth: String
}

struct AISuggestion: Codable, Identifiable {
    let id: String
    let type: SuggestionType
    let title: String
    let description: String
    let impact: ImpactLevel
    let actionUrl: String?
}

enum SuggestionType: String, Codable {
    case price = "price"
    case stock = "stock"
    case marketing = "marketing"
    case shipping = "shipping"
    case product = "product"
}

enum ImpactLevel: String, Codable {
    case low = "low"
    case medium = "medium"
    case high = "high"
    case critical = "critical"
}

struct UpdateOrderStatusRequest: Codable {
    let status: OrderStatus
    let trackingNumber: String?
    let note: String?
}

// MARK: - Notification Models

struct Notification: Codable, Identifiable {
    let id: String
    let type: NotificationType
    let title: String
    let message: String
    let data: [String: String]?
    let isRead: Bool
    let createdAt: Date
}

enum NotificationType: String, Codable {
    case order = "order"
    case integration = "integration"
    case invoice = "invoice"
    case system = "system"
    case alert = "alert"
}

// MARK: - Analytics Models

struct DashboardStats: Codable {
    let revenue: RevenueStats
    let orders: OrderStats
    let customers: CustomerStats
    let integrations: IntegrationSummary
}

struct RevenueStats: Codable {
    let today: Decimal
    let thisWeek: Decimal
    let thisMonth: Decimal
    let thisYear: Decimal
    let growth: GrowthMetrics
}

struct OrderStats: Codable {
    let today: Int
    let thisWeek: Int
    let thisMonth: Int
    let pending: Int
    let processing: Int
}

struct CustomerStats: Codable {
    let total: Int
    let new: Int
    let returning: Int
    let topCustomers: [Customer]
}

struct IntegrationSummary: Codable {
    let connected: Int
    let total: Int
    let status: [String: Int]
}

struct GrowthMetrics: Codable {
    let daily: String
    let weekly: String
    let monthly: String
}

// MARK: - Response Wrappers

struct APIResponse<T: Codable>: Codable {
    let success: Bool
    let data: T?
    let message: String?
    let errors: [String: [String]]?
}

struct PaginatedResponse<T: Codable>: Codable {
    let data: [T]
    let total: Int
    let page: Int
    let limit: Int
    let hasMore: Bool
}
