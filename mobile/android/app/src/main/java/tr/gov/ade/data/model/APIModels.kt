package tr.gov.ade.data.model

import com.google.gson.annotations.SerializedName
import java.math.BigDecimal
import java.util.Date

/**
 * API Data Models for ADE Android
 *
 * All request/response models for API communication
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

// MARK: - Authentication Models

data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginResponse(
    @SerializedName("access_token") val accessToken: String,
    @SerializedName("refresh_token") val refreshToken: String,
    val user: User
)

data class PhoneLoginRequest(
    val phone: String,
    val otp: String
)

data class RegisterRequest(
    val email: String,
    val password: String,
    val phone: String,
    @SerializedName("tc_kimlik") val tcKimlik: String,
    @SerializedName("first_name") val firstName: String? = null,
    @SerializedName("last_name") val lastName: String? = null
)

data class RefreshTokenRequest(
    @SerializedName("refresh_token") val refreshToken: String
)

data class RefreshTokenResponse(
    @SerializedName("access_token") val accessToken: String,
    @SerializedName("refresh_token") val refreshToken: String
)

data class EDevletUrlResponse(
    val url: String
)

// MARK: - Two-Factor Authentication

data class TwoFactorResponse(
    val secret: String,
    @SerializedName("qr_code") val qrCode: String,
    @SerializedName("backup_codes") val backupCodes: List<String>
)

data class TwoFactorVerifyRequest(
    val code: String
)

data class TwoFactorVerifyResponse(
    @SerializedName("is_valid") val isValid: Boolean
)

// MARK: - User Models

data class User(
    val id: String,
    val email: String,
    val phone: String? = null,
    @SerializedName("tc_kimlik") val tcKimlik: String? = null,
    @SerializedName("first_name") val firstName: String? = null,
    @SerializedName("last_name") val lastName: String? = null,
    val avatar: String? = null,
    val role: UserRole,
    @SerializedName("is_email_verified") val isEmailVerified: Boolean,
    @SerializedName("is_phone_verified") val isPhoneVerified: Boolean,
    @SerializedName("is_2fa_enabled") val is2FAEnabled: Boolean,
    @SerializedName("created_at") val createdAt: Date,
    @SerializedName("updated_at") val updatedAt: Date
) {
    val fullName: String
        get() = if (firstName != null && lastName != null) {
            "$firstName $lastName"
        } else {
            email
        }

    val initials: String
        get() = if (firstName != null && lastName != null) {
            "${firstName.take(1)}${lastName.take(1)}".uppercase()
        } else {
            email.take(2).uppercase()
        }
}

enum class UserRole {
    @SerializedName("user") USER,
    @SerializedName("admin") ADMIN,
    @SerializedName("super_admin") SUPER_ADMIN
}

data class UpdateProfileRequest(
    @SerializedName("first_name") val firstName: String? = null,
    @SerializedName("last_name") val lastName: String? = null,
    val phone: String? = null
)

data class ChangePasswordRequest(
    @SerializedName("current_password") val currentPassword: String,
    @SerializedName("new_password") val newPassword: String
)

data class UploadResponse(
    val url: String
)

// MARK: - Integration Models

data class Integration(
    val id: String,
    val name: String,
    val category: IntegrationCategory,
    val description: String,
    val icon: String,
    val color: String,
    @SerializedName("is_connected") val isConnected: Boolean,
    @SerializedName("is_official") val isOfficial: Boolean,
    @SerializedName("is_premium") val isPremium: Boolean,
    val features: List<String>,
    @SerializedName("required_credentials") val requiredCredentials: List<String>,
    @SerializedName("connected_at") val connectedAt: Date? = null
)

enum class IntegrationCategory {
    @SerializedName("e_devlet") E_DEVLET,
    @SerializedName("e_commerce") E_COMMERCE,
    @SerializedName("accounting") ACCOUNTING,
    @SerializedName("logistics") LOGISTICS,
    @SerializedName("payment") PAYMENT,
    @SerializedName("marketing") MARKETING
}

data class IntegrationDetail(
    val integration: Integration,
    val credentials: Map<String, String>? = null,
    val settings: Map<String, Any>? = null,
    @SerializedName("last_sync_at") val lastSyncAt: Date? = null,
    @SerializedName("sync_status") val syncStatus: SyncStatus,
    val stats: IntegrationStats? = null
)

enum class SyncStatus {
    @SerializedName("syncing") SYNCING,
    @SerializedName("success") SUCCESS,
    @SerializedName("failed") FAILED,
    @SerializedName("never_synced") NEVER_SYNCED
}

data class IntegrationStats(
    @SerializedName("total_requests") val totalRequests: Int,
    @SerializedName("successful_requests") val successfulRequests: Int,
    @SerializedName("failed_requests") val failedRequests: Int,
    @SerializedName("last_error") val lastError: String? = null
)

data class ConnectIntegrationRequest(
    val credentials: Map<String, String>,
    val settings: Map<String, String>? = null
)

// MARK: - E-Devlet Models

data class GIBData(
    @SerializedName("taxpayer_id") val taxpayerId: String,
    @SerializedName("company_name") val companyName: String,
    @SerializedName("tax_office") val taxOffice: String,
    val status: String,
    val invoices: List<Invoice>,
    val declarations: List<TaxDeclaration>
)

data class Invoice(
    val id: String,
    val type: InvoiceType,
    val number: String,
    val date: Date,
    val amount: BigDecimal,
    val currency: String,
    val status: InvoiceStatus,
    @SerializedName("customer_id") val customerId: String? = null,
    @SerializedName("customer_name") val customerName: String? = null
)

enum class InvoiceType {
    @SerializedName("sales") SALES,
    @SerializedName("purchase") PURCHASE,
    @SerializedName("e_archive") E_ARCHIVE,
    @SerializedName("e_invoice") E_INVOICE
}

enum class InvoiceStatus {
    @SerializedName("draft") DRAFT,
    @SerializedName("sent") SENT,
    @SerializedName("approved") APPROVED,
    @SerializedName("rejected") REJECTED,
    @SerializedName("cancelled") CANCELLED
}

data class TaxDeclaration(
    val id: String,
    val period: String,
    val type: String,
    val amount: BigDecimal,
    @SerializedName("submitted_at") val submittedAt: Date? = null,
    val status: String
)

data class SGKData(
    @SerializedName("employee_count") val employeeCount: Int,
    @SerializedName("total_premium") val totalPremium: BigDecimal,
    @SerializedName("last_payment_date") val lastPaymentDate: Date? = null,
    val declarations: List<SGKDeclaration>
)

data class SGKDeclaration(
    val id: String,
    val period: String,
    @SerializedName("employee_count") val employeeCount: Int,
    @SerializedName("total_wages") val totalWages: BigDecimal,
    @SerializedName("total_premium") val totalPremium: BigDecimal,
    val status: String
)

data class MernisSorguRequest(
    @SerializedName("tc_kimlik") val tcKimlik: String,
    @SerializedName("first_name") val firstName: String,
    @SerializedName("last_name") val lastName: String,
    @SerializedName("birth_year") val birthYear: Int
)

data class MernisSorguResponse(
    @SerializedName("tc_kimlik") val tcKimlik: String,
    @SerializedName("first_name") val firstName: String,
    @SerializedName("last_name") val lastName: String,
    @SerializedName("birth_year") val birthYear: Int,
    @SerializedName("is_valid") val isValid: Boolean
)

// MARK: - E-Commerce Models

data class ECommerceStats(
    @SerializedName("total_revenue") val totalRevenue: BigDecimal,
    @SerializedName("total_orders") val totalOrders: Int,
    @SerializedName("average_order_value") val averageOrderValue: BigDecimal,
    val platforms: List<PlatformStats>,
    @SerializedName("recent_orders") val recentOrders: List<Order>,
    @SerializedName("top_products") val topProducts: List<ProductStats>,
    @SerializedName("ai_suggestions") val aiSuggestions: List<AISuggestion>
)

data class PlatformStats(
    val id: String,
    val platform: ECommercePlatform,
    val orders: Int,
    val revenue: BigDecimal,
    val growth: String,
    val status: String
)

enum class ECommercePlatform {
    @SerializedName("hepsiburada") HEPSIBURADA,
    @SerializedName("trendyol") TRENDYOL,
    @SerializedName("n11") N11,
    @SerializedName("amazon_tr") AMAZON_TR,
    @SerializedName("shopify") SHOPIFY,
    @SerializedName("woocommerce") WOOCOMMERCE
}

data class Order(
    val id: String,
    val platform: ECommercePlatform,
    @SerializedName("order_number") val orderNumber: String,
    val date: Date,
    val amount: BigDecimal,
    val currency: String,
    val status: OrderStatus,
    val customer: Customer,
    val items: List<OrderItem>,
    @SerializedName("shipping_address") val shippingAddress: Address,
    @SerializedName("tracking_number") val trackingNumber: String? = null
)

enum class OrderStatus {
    @SerializedName("pending") PENDING,
    @SerializedName("confirmed") CONFIRMED,
    @SerializedName("processing") PROCESSING,
    @SerializedName("shipped") SHIPPED,
    @SerializedName("delivered") DELIVERED,
    @SerializedName("cancelled") CANCELLED,
    @SerializedName("refunded") REFUNDED
}

data class Customer(
    val id: String,
    val name: String,
    val email: String? = null,
    val phone: String? = null
)

data class OrderItem(
    val id: String,
    @SerializedName("product_id") val productId: String,
    @SerializedName("product_name") val productName: String,
    val sku: String? = null,
    val quantity: Int,
    val price: BigDecimal,
    val total: BigDecimal
)

data class Address(
    val street: String,
    val city: String,
    val district: String? = null,
    @SerializedName("postal_code") val postalCode: String? = null,
    val country: String
)

data class Product(
    val id: String,
    val name: String,
    val description: String,
    val sku: String,
    val price: BigDecimal,
    @SerializedName("compare_at_price") val compareAtPrice: BigDecimal? = null,
    val cost: BigDecimal? = null,
    val stock: Int,
    val category: String,
    val images: List<String>,
    val platforms: List<ECommercePlatform>,
    @SerializedName("is_active") val isActive: Boolean,
    @SerializedName("created_at") val createdAt: Date,
    @SerializedName("updated_at") val updatedAt: Date
)

data class ProductStats(
    val id: String,
    val product: Product,
    val sales: Int,
    val revenue: BigDecimal,
    val growth: String
)

data class CreateProductRequest(
    val name: String,
    val description: String,
    val sku: String,
    val price: BigDecimal,
    @SerializedName("compare_at_price") val compareAtPrice: BigDecimal? = null,
    val cost: BigDecimal? = null,
    val stock: Int,
    val category: String,
    val images: List<String> = emptyList(),
    val platforms: List<ECommercePlatform> = emptyList()
)

data class UpdateProductRequest(
    val name: String? = null,
    val description: String? = null,
    val price: BigDecimal? = null,
    @SerializedName("compare_at_price") val compareAtPrice: BigDecimal? = null,
    val stock: Int? = null,
    @SerializedName("is_active") val isActive: Boolean? = null
)

data class AISuggestion(
    val id: String,
    val type: SuggestionType,
    val title: String,
    val description: String,
    val impact: ImpactLevel,
    @SerializedName("action_url") val actionUrl: String? = null
)

enum class SuggestionType {
    @SerializedName("price") PRICE,
    @SerializedName("stock") STOCK,
    @SerializedName("marketing") MARKETING,
    @SerializedName("shipping") SHIPPING,
    @SerializedName("product") PRODUCT
}

enum class ImpactLevel {
    @SerializedName("low") LOW,
    @SerializedName("medium") MEDIUM,
    @SerializedName("high") HIGH,
    @SerializedName("critical") CRITICAL
}

data class UpdateOrderStatusRequest(
    val status: OrderStatus,
    @SerializedName("tracking_number") val trackingNumber: String? = null,
    val note: String? = null
)

// MARK: - Notification Models

data class Notification(
    val id: String,
    val type: NotificationType,
    val title: String,
    val message: String,
    val data: Map<String, String>? = null,
    @SerializedName("is_read") val isRead: Boolean,
    @SerializedName("created_at") val createdAt: Date
)

enum class NotificationType {
    @SerializedName("order") ORDER,
    @SerializedName("integration") INTEGRATION,
    @SerializedName("invoice") INVOICE,
    @SerializedName("system") SYSTEM,
    @SerializedName("alert") ALERT
}

// MARK: - Analytics Models

data class DashboardStats(
    val revenue: RevenueStats,
    val orders: OrderStats,
    val customers: CustomerStats,
    val integrations: IntegrationSummary
)

data class RevenueStats(
    val today: BigDecimal,
    @SerializedName("this_week") val thisWeek: BigDecimal,
    @SerializedName("this_month") val thisMonth: BigDecimal,
    @SerializedName("this_year") val thisYear: BigDecimal,
    val growth: GrowthMetrics
)

data class OrderStats(
    val today: Int,
    @SerializedName("this_week") val thisWeek: Int,
    @SerializedName("this_month") val thisMonth: Int,
    val pending: Int,
    val processing: Int
)

data class CustomerStats(
    val total: Int,
    @SerializedName("new") val newCustomers: Int,
    val returning: Int,
    @SerializedName("top_customers") val topCustomers: List<Customer>
)

data class IntegrationSummary(
    val connected: Int,
    val total: Int,
    val status: Map<String, Int>
)

data class GrowthMetrics(
    val daily: String,
    val weekly: String,
    val monthly: String
)

data class RevenueAnalytics(
    val period: String,
    @SerializedName("total_revenue") val totalRevenue: BigDecimal,
    @SerializedName("by_platform") val byPlatform: Map<String, BigDecimal>,
    @SerializedName("by_date") val byDate: List<DateRevenue>
)

data class DateRevenue(
    val date: String,
    val revenue: BigDecimal
)

data class CustomerAnalytics(
    @SerializedName("total_customers") val totalCustomers: Int,
    @SerializedName("new_customers") val newCustomers: Int,
    @SerializedName("returning_customers") val returningCustomers: Int,
    @SerializedName("customer_lifetime_value") val customerLifetimeValue: BigDecimal,
    @SerializedName("top_customers") val topCustomers: List<CustomerWithValue>
)

data class CustomerWithValue(
    val customer: Customer,
    @SerializedName("total_orders") val totalOrders: Int,
    @SerializedName("total_spent") val totalSpent: BigDecimal
)

// MARK: - Response Wrappers

data class APIResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val message: String? = null,
    val errors: Map<String, List<String>>? = null
)

data class PaginatedResponse<T>(
    val data: List<T>,
    val total: Int,
    val page: Int,
    val limit: Int,
    @SerializedName("has_more") val hasMore: Boolean
)
