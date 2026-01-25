import SwiftUI
import Charts

/**
 * E-Commerce View
 *
 * Features:
 * - Product listing with search & filters
 * - Order management with status tracking
 * - Product CRUD operations
 * - Multi-platform sync status
 * - Analytics dashboard
 * - Low stock alerts
 *
 * @author ADE iOS Team
 * @since 2026-01-24
 */

struct ECommerceView: View {
    @StateObject private var viewModel = ECommerceViewModel()
    @State private var selectedTab: ECommerceTab = .products
    @State private var searchText = ""
    @State private var showAddProduct = false
    @State private var showFilters = false
    @State private var selectedProduct: Product?
    @State private var selectedOrder: Order?

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Tab Selector
                tabSelectorView

                // Content
                Group {
                    switch selectedTab {
                    case .products:
                        productsView
                    case .orders:
                        ordersView
                    case .analytics:
                        analyticsView
                    }
                }
            }
            .navigationTitle("E-Ticaret")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    toolbarButtons
                }
            }
            .searchable(text: $searchText, prompt: selectedTab == .products ? "Ürün ara..." : "Sipariş ara...")
            .sheet(isPresented: $showAddProduct) {
                AddProductSheet(viewModel: viewModel)
            }
            .sheet(item: $selectedProduct) { product in
                ProductDetailSheet(product: product, viewModel: viewModel)
            }
            .sheet(item: $selectedOrder) { order in
                OrderDetailSheet(order: order, viewModel: viewModel)
            }
            .sheet(isPresented: $showFilters) {
                FiltersSheet(viewModel: viewModel)
            }
        }
        .task {
            await viewModel.loadInitialData()
        }
    }

    // MARK: - Tab Selector

    private var tabSelectorView: some View {
        HStack(spacing: 0) {
            ForEach(ECommerceTab.allCases, id: \.self) { tab in
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        selectedTab = tab
                    }
                } label: {
                    VStack(spacing: 8) {
                        HStack(spacing: 6) {
                            Image(systemName: tab.icon)
                                .font(.system(size: 16, weight: .medium))
                            Text(tab.title)
                                .font(.system(size: 15, weight: .medium))
                        }
                        .foregroundStyle(selectedTab == tab ? Color.blue : Color.secondary)

                        Rectangle()
                            .fill(selectedTab == tab ? Color.blue : Color.clear)
                            .frame(height: 2)
                    }
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding(.horizontal)
        .background(Color(uiColor: .systemBackground))
    }

    // MARK: - Toolbar

    private var toolbarButtons: some View {
        HStack(spacing: 12) {
            if selectedTab == .products {
                Button {
                    showFilters = true
                } label: {
                    Image(systemName: "line.3.horizontal.decrease.circle")
                        .font(.system(size: 20))
                }

                Button {
                    showAddProduct = true
                } label: {
                    Image(systemName: "plus.circle.fill")
                        .font(.system(size: 20))
                }
            } else if selectedTab == .orders {
                Button {
                    showFilters = true
                } label: {
                    Image(systemName: "line.3.horizontal.decrease.circle")
                        .font(.system(size: 20))
                }
            }

            Button {
                Task {
                    await viewModel.syncAllPlatforms()
                }
            } label: {
                Image(systemName: viewModel.isSyncing ? "arrow.triangle.2.circlepath" : "arrow.triangle.2.circlepath")
                    .font(.system(size: 20))
                    .rotationEffect(viewModel.isSyncing ? .degrees(360) : .degrees(0))
                    .animation(viewModel.isSyncing ? .linear(duration: 1).repeatForever(autoreverses: false) : .default, value: viewModel.isSyncing)
            }
        }
    }

    // MARK: - Products View

    private var productsView: some View {
        ScrollView {
            LazyVStack(spacing: 16) {
                // Stats Cards
                statsCardsView

                // Low Stock Alert
                if !viewModel.lowStockProducts.isEmpty {
                    lowStockAlertView
                }

                // Products List
                ForEach(filteredProducts) { product in
                    ProductCard(product: product) {
                        selectedProduct = product
                    } onEdit: {
                        selectedProduct = product
                    } onDelete: {
                        Task {
                            await viewModel.deleteProduct(product.id)
                        }
                    }
                }

                if viewModel.isLoadingProducts {
                    ProgressView()
                        .padding()
                }
            }
            .padding()
        }
        .refreshable {
            await viewModel.refreshProducts()
        }
    }

    private var statsCardsView: some View {
        HStack(spacing: 12) {
            StatCard(
                title: "Toplam Ürün",
                value: "\(viewModel.totalProducts)",
                icon: "cube.box.fill",
                color: .blue
            )

            StatCard(
                title: "Stokta",
                value: "\(viewModel.inStockProducts)",
                icon: "checkmark.circle.fill",
                color: .green
            )

            StatCard(
                title: "Düşük Stok",
                value: "\(viewModel.lowStockProducts.count)",
                icon: "exclamationmark.triangle.fill",
                color: .orange
            )
        }
    }

    private var lowStockAlertView: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "exclamationmark.triangle.fill")
                    .foregroundStyle(.orange)
                Text("Düşük Stok Uyarısı")
                    .font(.headline)
                Spacer()
                Text("\(viewModel.lowStockProducts.count) ürün")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(viewModel.lowStockProducts.prefix(5)) { product in
                        LowStockProductCard(product: product) {
                            selectedProduct = product
                        }
                    }
                }
            }
        }
        .padding()
        .background(Color.orange.opacity(0.1))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private var filteredProducts: [Product] {
        viewModel.products.filter { product in
            searchText.isEmpty || product.name.localizedCaseInsensitiveContains(searchText)
        }
    }

    // MARK: - Orders View

    private var ordersView: some View {
        ScrollView {
            LazyVStack(spacing: 16) {
                // Order Stats
                orderStatsView

                // Orders List
                ForEach(filteredOrders) { order in
                    OrderCard(order: order) {
                        selectedOrder = order
                    }
                }

                if viewModel.isLoadingOrders {
                    ProgressView()
                        .padding()
                }
            }
            .padding()
        }
        .refreshable {
            await viewModel.refreshOrders()
        }
    }

    private var orderStatsView: some View {
        HStack(spacing: 12) {
            StatCard(
                title: "Bekleyen",
                value: "\(viewModel.pendingOrders)",
                icon: "clock.fill",
                color: .orange
            )

            StatCard(
                title: "Hazırlanıyor",
                value: "\(viewModel.processingOrders)",
                icon: "shippingbox.fill",
                color: .blue
            )

            StatCard(
                title: "Teslim Edildi",
                value: "\(viewModel.deliveredOrders)",
                icon: "checkmark.circle.fill",
                color: .green
            )
        }
    }

    private var filteredOrders: [Order] {
        viewModel.orders.filter { order in
            searchText.isEmpty ||
            order.orderNumber.localizedCaseInsensitiveContains(searchText) ||
            order.customerName.localizedCaseInsensitiveContains(searchText)
        }
    }

    // MARK: - Analytics View

    private var analyticsView: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Sales Chart
                salesChartView

                // Top Products
                topProductsView

                // Platform Performance
                platformPerformanceView

                // Recent Activity
                recentActivityView
            }
            .padding()
        }
        .refreshable {
            await viewModel.refreshAnalytics()
        }
    }

    private var salesChartView: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Satış Trendi")
                    .font(.headline)
                Spacer()
                Picker("Dönem", selection: $viewModel.selectedPeriod) {
                    Text("7 Gün").tag("7d")
                    Text("30 Gün").tag("30d")
                    Text("12 Ay").tag("12m")
                }
                .pickerStyle(.segmented)
                .frame(width: 200)
            }

            if !viewModel.salesData.isEmpty {
                Chart {
                    ForEach(viewModel.salesData) { data in
                        LineMark(
                            x: .value("Tarih", data.date),
                            y: .value("Satış", data.amount)
                        )
                        .foregroundStyle(.blue)

                        AreaMark(
                            x: .value("Tarih", data.date),
                            y: .value("Satış", data.amount)
                        )
                        .foregroundStyle(.blue.opacity(0.2))
                    }
                }
                .frame(height: 200)
            } else {
                Text("Veri yükleniyor...")
                    .foregroundStyle(.secondary)
                    .frame(height: 200)
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.05), radius: 8)
    }

    private var topProductsView: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("En Çok Satan Ürünler")
                .font(.headline)

            ForEach(viewModel.topProducts.prefix(5)) { product in
                HStack {
                    AsyncImage(url: URL(string: product.imageUrl ?? "")) { image in
                        image.resizable().scaledToFill()
                    } placeholder: {
                        Color.gray.opacity(0.2)
                    }
                    .frame(width: 50, height: 50)
                    .clipShape(RoundedRectangle(cornerRadius: 8))

                    VStack(alignment: .leading, spacing: 4) {
                        Text(product.name)
                            .font(.subheadline)
                            .fontWeight(.medium)
                        Text("\(product.soldCount) satış")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    Spacer()

                    Text(product.totalRevenue.formatted(.currency(code: "TRY")))
                        .font(.subheadline)
                        .fontWeight(.semibold)
                }
                .padding(.vertical, 8)
                Divider()
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.05), radius: 8)
    }

    private var platformPerformanceView: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Platform Performansı")
                .font(.headline)

            ForEach(viewModel.platformStats) { platform in
                HStack {
                    Image(systemName: platform.icon)
                        .font(.system(size: 24))
                        .foregroundStyle(platform.color)
                        .frame(width: 40)

                    VStack(alignment: .leading, spacing: 4) {
                        Text(platform.name)
                            .font(.subheadline)
                            .fontWeight(.medium)
                        Text("\(platform.orderCount) sipariş")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 4) {
                        Text(platform.revenue.formatted(.currency(code: "TRY")))
                            .font(.subheadline)
                            .fontWeight(.semibold)
                        Text("%\(platform.growthRate, specifier: "%.1f")")
                            .font(.caption)
                            .foregroundStyle(platform.growthRate >= 0 ? .green : .red)
                    }
                }
                .padding(.vertical, 8)
                Divider()
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.05), radius: 8)
    }

    private var recentActivityView: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Son Aktiviteler")
                .font(.headline)

            ForEach(viewModel.recentActivities.prefix(10)) { activity in
                HStack(spacing: 12) {
                    Image(systemName: activity.icon)
                        .font(.system(size: 16))
                        .foregroundStyle(activity.iconColor)
                        .frame(width: 32, height: 32)
                        .background(activity.iconColor.opacity(0.1))
                        .clipShape(Circle())

                    VStack(alignment: .leading, spacing: 4) {
                        Text(activity.title)
                            .font(.subheadline)
                            .fontWeight(.medium)
                        Text(activity.description)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    Spacer()

                    Text(activity.timestamp, style: .relative)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding(.vertical, 8)
                Divider()
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.05), radius: 8)
    }
}

// MARK: - Supporting Views

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(color)

            Text(value)
                .font(.title2)
                .fontWeight(.bold)

            Text(title)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(color.opacity(0.1))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

struct ProductCard: View {
    let product: Product
    let onTap: () -> Void
    let onEdit: () -> Void
    let onDelete: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 16) {
                AsyncImage(url: URL(string: product.imageUrl ?? "")) { image in
                    image.resizable().scaledToFill()
                } placeholder: {
                    Color.gray.opacity(0.2)
                }
                .frame(width: 80, height: 80)
                .clipShape(RoundedRectangle(cornerRadius: 12))

                VStack(alignment: .leading, spacing: 8) {
                    Text(product.name)
                        .font(.headline)
                        .foregroundStyle(.primary)

                    Text(product.category)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    HStack {
                        Text(product.price.formatted(.currency(code: "TRY")))
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundStyle(.blue)

                        Spacer()

                        HStack(spacing: 4) {
                            Image(systemName: "cube.box.fill")
                                .font(.caption)
                            Text("\(product.stock)")
                                .font(.caption)
                        }
                        .foregroundStyle(product.stock < 10 ? .orange : .secondary)
                    }
                }

                Spacer()
            }
            .padding()
            .background(Color(uiColor: .systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(color: .black.opacity(0.05), radius: 8)
        }
        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
            Button(role: .destructive) {
                onDelete()
            } label: {
                Label("Sil", systemImage: "trash")
            }

            Button {
                onEdit()
            } label: {
                Label("Düzenle", systemImage: "pencil")
            }
            .tint(.blue)
        }
    }
}

struct LowStockProductCard: View {
    let product: Product
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 8) {
                AsyncImage(url: URL(string: product.imageUrl ?? "")) { image in
                    image.resizable().scaledToFill()
                } placeholder: {
                    Color.gray.opacity(0.2)
                }
                .frame(width: 100, height: 100)
                .clipShape(RoundedRectangle(cornerRadius: 8))

                Text(product.name)
                    .font(.caption)
                    .fontWeight(.medium)
                    .lineLimit(2)

                Text("Stok: \(product.stock)")
                    .font(.caption2)
                    .foregroundStyle(.orange)
            }
            .frame(width: 120)
            .padding(8)
            .background(Color(uiColor: .systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }
}

struct OrderCard: View {
    let order: Order
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text(order.orderNumber)
                        .font(.headline)

                    Spacer()

                    Text(order.status.displayName)
                        .font(.caption)
                        .fontWeight(.medium)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(order.status.color.opacity(0.2))
                        .foregroundStyle(order.status.color)
                        .clipShape(Capsule())
                }

                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(order.customerName)
                            .font(.subheadline)
                        Text(order.platform)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 4) {
                        Text(order.total.formatted(.currency(code: "TRY")))
                            .font(.headline)
                            .foregroundStyle(.blue)
                        Text(order.createdAt, style: .relative)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .padding()
            .background(Color(uiColor: .systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(color: .black.opacity(0.05), radius: 8)
        }
    }
}

// MARK: - Sheets

struct AddProductSheet: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: ECommerceViewModel

    @State private var name = ""
    @State private var description = ""
    @State private var price = ""
    @State private var stock = ""
    @State private var category = ""
    @State private var sku = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Ürün Bilgileri") {
                    TextField("Ürün Adı", text: $name)
                    TextField("Açıklama", text: $description, axis: .vertical)
                        .lineLimit(3...6)
                    TextField("Kategori", text: $category)
                    TextField("SKU", text: $sku)
                }

                Section("Fiyat ve Stok") {
                    TextField("Fiyat", text: $price)
                        .keyboardType(.decimalPad)
                    TextField("Stok Miktarı", text: $stock)
                        .keyboardType(.numberPad)
                }
            }
            .navigationTitle("Yeni Ürün")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("İptal") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Kaydet") {
                        Task {
                            await viewModel.createProduct(
                                name: name,
                                description: description,
                                price: Double(price) ?? 0,
                                stock: Int(stock) ?? 0,
                                category: category,
                                sku: sku
                            )
                            dismiss()
                        }
                    }
                    .disabled(name.isEmpty || price.isEmpty)
                }
            }
        }
    }
}

struct ProductDetailSheet: View {
    @Environment(\.dismiss) var dismiss
    let product: Product
    @ObservedObject var viewModel: ECommerceViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    AsyncImage(url: URL(string: product.imageUrl ?? "")) { image in
                        image.resizable().scaledToFit()
                    } placeholder: {
                        Color.gray.opacity(0.2)
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 250)
                    .clipShape(RoundedRectangle(cornerRadius: 12))

                    VStack(alignment: .leading, spacing: 16) {
                        Text(product.name)
                            .font(.title2)
                            .fontWeight(.bold)

                        Text(product.description ?? "")
                            .foregroundStyle(.secondary)

                        Divider()

                        HStack {
                            Text("Fiyat:")
                                .foregroundStyle(.secondary)
                            Spacer()
                            Text(product.price.formatted(.currency(code: "TRY")))
                                .font(.headline)
                                .foregroundStyle(.blue)
                        }

                        HStack {
                            Text("Stok:")
                                .foregroundStyle(.secondary)
                            Spacer()
                            Text("\(product.stock)")
                                .font(.headline)
                        }

                        HStack {
                            Text("Kategori:")
                                .foregroundStyle(.secondary)
                            Spacer()
                            Text(product.category)
                        }

                        HStack {
                            Text("SKU:")
                                .foregroundStyle(.secondary)
                            Spacer()
                            Text(product.sku)
                                .font(.system(.body, design: .monospaced))
                        }
                    }
                    .padding()
                }
                .padding()
            }
            .navigationTitle("Ürün Detayı")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Kapat") { dismiss() }
                }
                ToolbarItem(placement: .primaryAction) {
                    Button("Düzenle") {
                        // Edit functionality
                    }
                }
            }
        }
    }
}

struct OrderDetailSheet: View {
    @Environment(\.dismiss) var dismiss
    let order: Order
    @ObservedObject var viewModel: ECommerceViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Order Status
                    HStack {
                        Text("Durum:")
                        Spacer()
                        Text(order.status.displayName)
                            .font(.headline)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(order.status.color.opacity(0.2))
                            .foregroundStyle(order.status.color)
                            .clipShape(Capsule())
                    }

                    Divider()

                    // Customer Info
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Müşteri Bilgileri")
                            .font(.headline)
                        Text(order.customerName)
                        Text(order.customerEmail ?? "")
                            .foregroundStyle(.secondary)
                    }

                    Divider()

                    // Order Items
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Ürünler")
                            .font(.headline)

                        ForEach(order.items) { item in
                            HStack {
                                Text(item.productName)
                                Spacer()
                                Text("\(item.quantity)x")
                                    .foregroundStyle(.secondary)
                                Text(item.price.formatted(.currency(code: "TRY")))
                            }
                        }
                    }

                    Divider()

                    // Total
                    HStack {
                        Text("Toplam:")
                            .font(.headline)
                        Spacer()
                        Text(order.total.formatted(.currency(code: "TRY")))
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundStyle(.blue)
                    }
                }
                .padding()
            }
            .navigationTitle("Sipariş #\(order.orderNumber)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Kapat") { dismiss() }
                }
            }
        }
    }
}

struct FiltersSheet: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: ECommerceViewModel

    var body: some View {
        NavigationStack {
            Form {
                Section("Kategori") {
                    // Category filters
                }

                Section("Fiyat Aralığı") {
                    // Price range sliders
                }

                Section("Stok Durumu") {
                    // Stock status toggles
                }

                Section("Platform") {
                    // Platform filters
                }
            }
            .navigationTitle("Filtreler")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("İptal") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Uygula") {
                        Task {
                            await viewModel.applyFilters()
                            dismiss()
                        }
                    }
                }
            }
        }
    }
}

// MARK: - Supporting Types

enum ECommerceTab: String, CaseIterable {
    case products = "Ürünler"
    case orders = "Siparişler"
    case analytics = "Analitik"

    var title: String { rawValue }

    var icon: String {
        switch self {
        case .products: return "cube.box"
        case .orders: return "shippingbox"
        case .analytics: return "chart.bar"
        }
    }
}
