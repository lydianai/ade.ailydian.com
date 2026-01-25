import SwiftUI
import Charts

/**
 * Dashboard View for ADE iOS
 *
 * Main dashboard with:
 * - Revenue & Order statistics
 * - Real-time charts
 * - Quick actions
 * - Recent activities
 * - AI-powered insights
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

struct DashboardView: View {
    @StateObject private var viewModel = DashboardViewModel()
    @EnvironmentObject var authManager: AuthenticationManager
    @EnvironmentObject var themeManager: ThemeManager

    var body: some View {
        NavigationStack {
            ZStack {
                // Background gradient
                LinearGradient(
                    colors: [
                        Color(hex: "F97316").opacity(0.05),
                        Color.clear
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        // Header with user info
                        headerSection

                        // Stats cards
                        statsSection

                        // Revenue chart
                        revenueChartSection

                        // Quick actions
                        quickActionsSection

                        // Recent orders
                        recentOrdersSection

                        // AI Suggestions
                        if !viewModel.aiSuggestions.isEmpty {
                            aiSuggestionsSection
                        }
                    }
                    .padding()
                }
                .refreshable {
                    await viewModel.loadDashboard()
                }

                // Loading overlay
                if viewModel.isLoading && viewModel.stats == nil {
                    ProgressView()
                        .scaleEffect(1.5)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(Color.black.opacity(0.2))
                }
            }
            .navigationTitle("Gösterge Paneli")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        // Notifications
                    } label: {
                        Image(systemName: "bell.fill")
                            .foregroundColor(Color(hex: "F97316"))
                    }
                }
            }
            .alert("Hata", isPresented: $viewModel.showError) {
                Button("Tamam", role: .cancel) {}
            } message: {
                Text(viewModel.errorMessage ?? "Bilinmeyen bir hata oluştu")
            }
        }
        .task {
            await viewModel.loadDashboard()
        }
    }

    // MARK: - Header Section

    private var headerSection: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("Hoş geldiniz,")
                    .font(.subheadline)
                    .foregroundColor(.secondary)

                Text(authManager.currentUser?.fullName ?? "Kullanıcı")
                    .font(.title2)
                    .fontWeight(.bold)
            }

            Spacer()

            // Avatar
            Circle()
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "F97316"), Color(hex: "FB923C")],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 50, height: 50)
                .overlay {
                    Text(authManager.currentUser?.initials ?? "ADE")
                        .font(.headline)
                        .foregroundColor(.white)
                }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
        )
    }

    // MARK: - Stats Section

    private var statsSection: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 16) {
            StatCard(
                title: "Bugünkü Gelir",
                value: viewModel.stats?.revenue.today.formatted(.currency(code: "TRY")) ?? "₺0",
                change: viewModel.stats?.revenue.growth.daily ?? "+0%",
                icon: "banknote.fill",
                color: Color(hex: "10B981")
            )

            StatCard(
                title: "Bugünkü Sipariş",
                value: "\(viewModel.stats?.orders.today ?? 0)",
                change: viewModel.stats?.revenue.growth.daily ?? "+0%",
                icon: "cart.fill",
                color: Color(hex: "3B82F6")
            )

            StatCard(
                title: "Aylık Gelir",
                value: viewModel.stats?.revenue.thisMonth.formatted(.currency(code: "TRY")) ?? "₺0",
                change: viewModel.stats?.revenue.growth.monthly ?? "+0%",
                icon: "chart.line.uptrend.xyaxis",
                color: Color(hex: "F97316")
            )

            StatCard(
                title: "Toplam Müşteri",
                value: "\(viewModel.stats?.customers.total ?? 0)",
                change: "+\(viewModel.stats?.customers.new ?? 0) yeni",
                icon: "person.2.fill",
                color: Color(hex: "8B5CF6")
            )
        }
    }

    // MARK: - Revenue Chart Section

    private var revenueChartSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Gelir Trendi")
                    .font(.headline)

                Spacer()

                Picker("Periyot", selection: $viewModel.selectedPeriod) {
                    Text("7 Gün").tag(0)
                    Text("30 Gün").tag(1)
                    Text("12 Ay").tag(2)
                }
                .pickerStyle(.segmented)
                .frame(width: 200)
            }

            if !viewModel.revenueData.isEmpty {
                Chart(viewModel.revenueData) { item in
                    LineMark(
                        x: .value("Tarih", item.date),
                        y: .value("Gelir", item.revenue)
                    )
                    .foregroundStyle(
                        LinearGradient(
                            colors: [Color(hex: "F97316"), Color(hex: "FB923C")],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .interpolationMethod(.catmullRom)

                    AreaMark(
                        x: .value("Tarih", item.date),
                        y: .value("Gelir", item.revenue)
                    )
                    .foregroundStyle(
                        LinearGradient(
                            colors: [
                                Color(hex: "F97316").opacity(0.3),
                                Color(hex: "FB923C").opacity(0.1)
                            ],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .interpolationMethod(.catmullRom)
                }
                .frame(height: 200)
                .chartXAxis {
                    AxisMarks(values: .stride(by: .day, count: viewModel.selectedPeriod == 0 ? 1 : 7)) { _ in
                        AxisGridLine()
                        AxisTick()
                        AxisValueLabel(format: .dateTime.day().month())
                    }
                }
                .chartYAxis {
                    AxisMarks { value in
                        AxisGridLine()
                        AxisTick()
                        AxisValueLabel {
                            if let revenue = value.as(Double.self) {
                                Text(revenue.formatted(.currency(code: "TRY")))
                            }
                        }
                    }
                }
            } else {
                ProgressView()
                    .frame(height: 200)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
        )
    }

    // MARK: - Quick Actions Section

    private var quickActionsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Hızlı İşlemler")
                .font(.headline)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 12) {
                QuickActionButton(
                    title: "Yeni Sipariş",
                    icon: "plus.circle.fill",
                    color: Color(hex: "10B981")
                ) {
                    // Navigate to new order
                }

                QuickActionButton(
                    title: "Entegrasyonlar",
                    icon: "building.2.fill",
                    color: Color(hex: "3B82F6")
                ) {
                    // Navigate to integrations
                }

                QuickActionButton(
                    title: "E-Fatura",
                    icon: "doc.text.fill",
                    color: Color(hex: "F97316")
                ) {
                    // Navigate to invoices
                }

                QuickActionButton(
                    title: "Raporlar",
                    icon: "chart.bar.fill",
                    color: Color(hex: "8B5CF6")
                ) {
                    // Navigate to reports
                }

                QuickActionButton(
                    title: "AI Asistan",
                    icon: "sparkles",
                    color: Color(hex: "EC4899")
                ) {
                    // Navigate to AI assistant
                }

                QuickActionButton(
                    title: "Ayarlar",
                    icon: "gear",
                    color: Color.gray
                ) {
                    // Navigate to settings
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
        )
    }

    // MARK: - Recent Orders Section

    private var recentOrdersSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Son Siparişler")
                    .font(.headline)

                Spacer()

                Button("Tümünü Gör") {
                    // Navigate to all orders
                }
                .font(.subheadline)
                .foregroundColor(Color(hex: "F97316"))
            }

            if !viewModel.recentOrders.isEmpty {
                ForEach(viewModel.recentOrders.prefix(5)) { order in
                    OrderRowView(order: order)
                }
            } else {
                Text("Henüz sipariş yok")
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 32)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
        )
    }

    // MARK: - AI Suggestions Section

    private var aiSuggestionsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Image(systemName: "sparkles")
                    .foregroundColor(Color(hex: "F97316"))

                Text("AI Önerileri")
                    .font(.headline)
            }

            ForEach(viewModel.aiSuggestions.prefix(3)) { suggestion in
                AISuggestionCard(suggestion: suggestion)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
        )
    }
}

// MARK: - Supporting Views

struct StatCard: View {
    let title: String
    let value: String
    let change: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)

                Spacer()

                Text(change)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(change.hasPrefix("+") ? .green : .red)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(
                        Capsule()
                            .fill(change.hasPrefix("+") ? Color.green.opacity(0.1) : Color.red.opacity(0.1))
                    )
            }

            Text(value)
                .font(.title2)
                .fontWeight(.bold)

            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(.ultraThinMaterial)
        )
    }
}

struct QuickActionButton: View {
    let title: String
    let icon: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)

                Text(title)
                    .font(.caption)
                    .foregroundColor(.primary)
                    .multilineTextAlignment(.center)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(.ultraThinMaterial)
            )
        }
    }
}

struct OrderRowView: View {
    let order: Order

    var body: some View {
        HStack(spacing: 12) {
            // Platform icon
            Circle()
                .fill(platformColor(order.platform))
                .frame(width: 40, height: 40)
                .overlay {
                    Text(platformInitials(order.platform))
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                }

            VStack(alignment: .leading, spacing: 4) {
                Text(order.orderNumber)
                    .font(.subheadline)
                    .fontWeight(.semibold)

                Text(order.customer.name)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 4) {
                Text(order.amount.formatted(.currency(code: order.currency)))
                    .font(.subheadline)
                    .fontWeight(.semibold)

                Text(statusText(order.status))
                    .font(.caption)
                    .foregroundColor(statusColor(order.status))
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(UIColor.systemBackground))
        )
    }

    private func platformColor(_ platform: ECommercePlatform) -> Color {
        switch platform {
        case .hepsiburada: return Color.orange
        case .trendyol: return Color.orange
        case .n11: return Color.purple
        case .amazonTR: return Color.blue
        default: return Color.gray
        }
    }

    private func platformInitials(_ platform: ECommercePlatform) -> String {
        switch platform {
        case .hepsiburada: return "HB"
        case .trendyol: return "TY"
        case .n11: return "N11"
        case .amazonTR: return "AMZ"
        default: return "?"
        }
    }

    private func statusText(_ status: OrderStatus) -> String {
        switch status {
        case .pending: return "Bekliyor"
        case .confirmed: return "Onaylandı"
        case .processing: return "Hazırlanıyor"
        case .shipped: return "Kargoda"
        case .delivered: return "Teslim Edildi"
        case .cancelled: return "İptal"
        case .refunded: return "İade"
        }
    }

    private func statusColor(_ status: OrderStatus) -> Color {
        switch status {
        case .pending: return .orange
        case .confirmed: return .blue
        case .processing: return .purple
        case .shipped: return .cyan
        case .delivered: return .green
        case .cancelled: return .red
        case .refunded: return .gray
        }
    }
}

struct AISuggestionCard: View {
    let suggestion: AISuggestion

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: suggestionIcon(suggestion.type))
                .font(.title3)
                .foregroundColor(impactColor(suggestion.impact))
                .frame(width: 40, height: 40)
                .background(
                    Circle()
                        .fill(impactColor(suggestion.impact).opacity(0.1))
                )

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(suggestion.title)
                        .font(.subheadline)
                        .fontWeight(.semibold)

                    Spacer()

                    Text(impactText(suggestion.impact))
                        .font(.caption2)
                        .fontWeight(.semibold)
                        .foregroundColor(impactColor(suggestion.impact))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(
                            Capsule()
                                .fill(impactColor(suggestion.impact).opacity(0.1))
                        )
                }

                Text(suggestion.description)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(UIColor.systemBackground))
        )
    }

    private func suggestionIcon(_ type: SuggestionType) -> String {
        switch type {
        case .price: return "tag.fill"
        case .stock: return "cube.fill"
        case .marketing: return "megaphone.fill"
        case .shipping: return "shippingbox.fill"
        case .product: return "square.grid.2x2.fill"
        }
    }

    private func impactText(_ impact: ImpactLevel) -> String {
        switch impact {
        case .low: return "Düşük"
        case .medium: return "Orta"
        case .high: return "Yüksek"
        case .critical: return "Kritik"
        }
    }

    private func impactColor(_ impact: ImpactLevel) -> Color {
        switch impact {
        case .low: return .blue
        case .medium: return .orange
        case .high: return .red
        case .critical: return .purple
        }
    }
}

// MARK: - Color Extension

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Preview

#Preview {
    DashboardView()
        .environmentObject(AuthenticationManager.shared)
        .environmentObject(ThemeManager.shared)
}
