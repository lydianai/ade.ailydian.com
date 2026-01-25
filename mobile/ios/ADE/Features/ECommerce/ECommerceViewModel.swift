import SwiftUI
import Combine

/**
 * E-Commerce ViewModel
 *
 * Manages state and business logic for e-commerce features
 *
 * @author ADE iOS Team
 * @since 2026-01-24
 */

@MainActor
class ECommerceViewModel: ObservableObject {
    // MARK: - Published Properties

    @Published var products: [Product] = []
    @Published var orders: [Order] = []
    @Published var lowStockProducts: [Product] = []
    @Published var topProducts: [Product] = []
    @Published var platformStats: [PlatformStat] = []
    @Published var salesData: [SalesData] = []
    @Published var recentActivities: [Activity] = []

    @Published var isLoadingProducts = false
    @Published var isLoadingOrders = false
    @Published var isSyncing = false

    @Published var selectedPeriod = "7d"

    @Published var totalProducts = 0
    @Published var inStockProducts = 0
    @Published var pendingOrders = 0
    @Published var processingOrders = 0
    @Published var deliveredOrders = 0

    // MARK: - Private Properties

    private let apiClient = APIClient.shared
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Initialization

    init() {
        setupObservers()
    }

    private func setupObservers() {
        $selectedPeriod
            .dropFirst()
            .sink { [weak self] _ in
                Task { await self?.refreshAnalytics() }
            }
            .store(in: &cancellables)
    }

    // MARK: - Data Loading

    func loadInitialData() async {
        await withTaskGroup(of: Void.self) { group in
            group.addTask { await self.loadProducts() }
            group.addTask { await self.loadOrders() }
            group.addTask { await self.loadAnalytics() }
        }
    }

    func loadProducts() async {
        guard !isLoadingProducts else { return }
        isLoadingProducts = true

        do {
            let response: ProductsResponse = try await apiClient.request(
                endpoint: .getProducts(page: 1, limit: 100),
                method: .get,
                requiresAuth: true
            )

            products = response.data
            totalProducts = response.total
            inStockProducts = products.filter { $0.stock > 0 }.count
            lowStockProducts = products.filter { $0.stock < 10 && $0.stock > 0 }

        } catch {
            print("Error loading products: \(error)")
        }

        isLoadingProducts = false
    }

    func loadOrders() async {
        guard !isLoadingOrders else { return }
        isLoadingOrders = true

        do {
            let response: OrdersResponse = try await apiClient.request(
                endpoint: .getOrders(page: 1, limit: 100),
                method: .get,
                requiresAuth: true
            )

            orders = response.data
            updateOrderStats()

        } catch {
            print("Error loading orders: \(error)")
        }

        isLoadingOrders = false
    }

    func loadAnalytics() async {
        do {
            async let salesTask: SalesAnalyticsResponse = apiClient.request(
                endpoint: .getSalesAnalytics(period: selectedPeriod),
                method: .get,
                requiresAuth: true
            )

            async let topProductsTask: TopProductsResponse = apiClient.request(
                endpoint: .getTopProducts(period: selectedPeriod),
                method: .get,
                requiresAuth: true
            )

            async let platformStatsTask: PlatformStatsResponse = apiClient.request(
                endpoint: .getPlatformStats,
                method: .get,
                requiresAuth: true
            )

            async let activitiesTask: ActivitiesResponse = apiClient.request(
                endpoint: .getRecentActivities,
                method: .get,
                requiresAuth: true
            )

            let (sales, topProds, platforms, activities) = try await (
                salesTask,
                topProductsTask,
                platformStatsTask,
                activitiesTask
            )

            salesData = sales.data
            topProducts = topProds.data
            platformStats = platforms.data
            recentActivities = activities.data

        } catch {
            print("Error loading analytics: \(error)")
        }
    }

    private func updateOrderStats() {
        pendingOrders = orders.filter { $0.status == .pending }.count
        processingOrders = orders.filter { $0.status == .processing }.count
        deliveredOrders = orders.filter { $0.status == .delivered }.count
    }

    // MARK: - Refresh

    func refreshProducts() async {
        await loadProducts()
    }

    func refreshOrders() async {
        await loadOrders()
    }

    func refreshAnalytics() async {
        await loadAnalytics()
    }

    // MARK: - Product Operations

    func createProduct(
        name: String,
        description: String,
        price: Double,
        stock: Int,
        category: String,
        sku: String
    ) async {
        do {
            let body = CreateProductRequest(
                name: name,
                description: description,
                price: price,
                stock: stock,
                category: category,
                sku: sku
            )

            let product: Product = try await apiClient.request(
                endpoint: .createProduct,
                method: .post,
                body: body,
                requiresAuth: true
            )

            products.insert(product, at: 0)
            totalProducts += 1

            if product.stock > 0 {
                inStockProducts += 1
            }

            addActivity(
                title: "Yeni ürün eklendi",
                description: name,
                icon: "plus.circle.fill",
                iconColor: .green
            )

        } catch {
            print("Error creating product: \(error)")
        }
    }

    func updateProduct(_ id: String, updates: [String: Any]) async {
        // Implementation for updating product
    }

    func deleteProduct(_ id: String) async {
        do {
            let _: EmptyResponse = try await apiClient.request(
                endpoint: .deleteProduct(id: id),
                method: .delete,
                requiresAuth: true
            )

            if let index = products.firstIndex(where: { $0.id == id }) {
                let product = products[index]
                products.remove(at: index)
                totalProducts -= 1

                if product.stock > 0 {
                    inStockProducts -= 1
                }

                addActivity(
                    title: "Ürün silindi",
                    description: product.name,
                    icon: "trash.fill",
                    iconColor: .red
                )
            }

        } catch {
            print("Error deleting product: \(error)")
        }
    }

    func updateProductStock(_ id: String, stock: Int) async {
        do {
            let body = UpdateStockRequest(stock: stock)

            let product: Product = try await apiClient.request(
                endpoint: .updateProductStock(id: id),
                method: .put,
                body: body,
                requiresAuth: true
            )

            if let index = products.firstIndex(where: { $0.id == id }) {
                products[index] = product
            }

            addActivity(
                title: "Stok güncellendi",
                description: "\(product.name): \(stock) adet",
                icon: "cube.box.fill",
                iconColor: .blue
            )

        } catch {
            print("Error updating stock: \(error)")
        }
    }

    // MARK: - Order Operations

    func updateOrderStatus(_ id: String, status: OrderStatus, trackingNumber: String? = nil) async {
        do {
            let body = UpdateOrderStatusRequest(
                status: status.rawValue,
                trackingNumber: trackingNumber
            )

            let order: Order = try await apiClient.request(
                endpoint: .updateOrderStatus(id: id),
                method: .put,
                body: body,
                requiresAuth: true
            )

            if let index = orders.firstIndex(where: { $0.id == id }) {
                orders[index] = order
            }

            updateOrderStats()

            addActivity(
                title: "Sipariş durumu güncellendi",
                description: "\(order.orderNumber): \(status.displayName)",
                icon: "checkmark.circle.fill",
                iconColor: .green
            )

        } catch {
            print("Error updating order status: \(error)")
        }
    }

    func cancelOrder(_ id: String, reason: String) async {
        do {
            let body = CancelOrderRequest(reason: reason)

            let _: EmptyResponse = try await apiClient.request(
                endpoint: .cancelOrder(id: id),
                method: .post,
                body: body,
                requiresAuth: true
            )

            if let index = orders.firstIndex(where: { $0.id == id }) {
                orders[index].status = .cancelled
            }

            updateOrderStats()

            addActivity(
                title: "Sipariş iptal edildi",
                description: reason,
                icon: "xmark.circle.fill",
                iconColor: .red
            )

        } catch {
            print("Error cancelling order: \(error)")
        }
    }

    // MARK: - Platform Sync

    func syncAllPlatforms() async {
        guard !isSyncing else { return }
        isSyncing = true

        do {
            let _: SyncResponse = try await apiClient.request(
                endpoint: .syncAllPlatforms,
                method: .post,
                requiresAuth: true
            )

            await loadInitialData()

            addActivity(
                title: "Platform senkronizasyonu tamamlandı",
                description: "Tüm platformlar güncellendi",
                icon: "arrow.triangle.2.circlepath",
                iconColor: .blue
            )

        } catch {
            print("Error syncing platforms: \(error)")
        }

        isSyncing = false
    }

    func syncProduct(_ id: String) async {
        do {
            let _: SyncResponse = try await apiClient.request(
                endpoint: .syncProduct(id: id),
                method: .post,
                requiresAuth: true
            )

            if let product = products.first(where: { $0.id == id }) {
                addActivity(
                    title: "Ürün senkronize edildi",
                    description: product.name,
                    icon: "arrow.triangle.2.circlepath",
                    iconColor: .blue
                )
            }

        } catch {
            print("Error syncing product: \(error)")
        }
    }

    // MARK: - Filters

    func applyFilters() async {
        // Implementation for applying filters
        await loadProducts()
    }

    // MARK: - Activity Tracking

    private func addActivity(title: String, description: String, icon: String, iconColor: Color) {
        let activity = Activity(
            id: UUID().uuidString,
            title: title,
            description: description,
            icon: icon,
            iconColor: iconColor,
            timestamp: Date()
        )

        recentActivities.insert(activity, at: 0)

        // Keep only last 50 activities
        if recentActivities.count > 50 {
            recentActivities = Array(recentActivities.prefix(50))
        }
    }
}

// MARK: - Request/Response Models

struct CreateProductRequest: Encodable {
    let name: String
    let description: String
    let price: Double
    let stock: Int
    let category: String
    let sku: String
}

struct UpdateStockRequest: Encodable {
    let stock: Int
}

struct UpdateOrderStatusRequest: Encodable {
    let status: String
    let trackingNumber: String?
}

struct CancelOrderRequest: Encodable {
    let reason: String
}

struct ProductsResponse: Decodable {
    let data: [Product]
    let total: Int
    let page: Int
    let limit: Int
}

struct OrdersResponse: Decodable {
    let data: [Order]
    let total: Int
    let page: Int
    let limit: Int
}

struct SalesAnalyticsResponse: Decodable {
    let data: [SalesData]
    let total: Double
    let growth: Double
}

struct TopProductsResponse: Decodable {
    let data: [Product]
}

struct PlatformStatsResponse: Decodable {
    let data: [PlatformStat]
}

struct ActivitiesResponse: Decodable {
    let data: [Activity]
}

struct SyncResponse: Decodable {
    let success: Bool
    let message: String
    let syncedCount: Int
}

struct EmptyResponse: Decodable {}

// MARK: - Additional Models

struct SalesData: Identifiable, Decodable {
    let id: String
    let date: Date
    let amount: Double
    let orderCount: Int
}

struct PlatformStat: Identifiable, Decodable {
    let id: String
    let name: String
    let icon: String
    let color: Color
    let orderCount: Int
    let revenue: Double
    let growthRate: Double

    enum CodingKeys: String, CodingKey {
        case id, name, icon, orderCount, revenue, growthRate
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        icon = try container.decode(String.self, forKey: .icon)
        orderCount = try container.decode(Int.self, forKey: .orderCount)
        revenue = try container.decode(Double.self, forKey: .revenue)
        growthRate = try container.decode(Double.self, forKey: .growthRate)

        // Map platform name to color
        switch name.lowercased() {
        case "trendyol": color = .orange
        case "hepsiburada": color = .orange
        case "n11": color = .purple
        case "amazon": color = .yellow
        default: color = .blue
        }
    }
}

struct Activity: Identifiable, Decodable {
    let id: String
    let title: String
    let description: String
    let icon: String
    let iconColor: Color
    let timestamp: Date

    enum CodingKeys: String, CodingKey {
        case id, title, description, icon, timestamp
    }

    init(id: String, title: String, description: String, icon: String, iconColor: Color, timestamp: Date) {
        self.id = id
        self.title = title
        self.description = description
        self.icon = icon
        self.iconColor = iconColor
        self.timestamp = timestamp
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        title = try container.decode(String.self, forKey: .title)
        description = try container.decode(String.self, forKey: .description)
        icon = try container.decode(String.self, forKey: .icon)
        timestamp = try container.decode(Date.self, forKey: .timestamp)
        iconColor = .blue // Default color for decoded activities
    }
}

extension OrderStatus {
    var displayName: String {
        switch self {
        case .pending: return "Bekliyor"
        case .processing: return "Hazırlanıyor"
        case .shipped: return "Kargoda"
        case .delivered: return "Teslim Edildi"
        case .cancelled: return "İptal Edildi"
        case .refunded: return "İade Edildi"
        }
    }

    var color: Color {
        switch self {
        case .pending: return .orange
        case .processing: return .blue
        case .shipped: return .purple
        case .delivered: return .green
        case .cancelled: return .red
        case .refunded: return .gray
        }
    }
}
