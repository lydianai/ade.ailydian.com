import Foundation
import Combine

/**
 * Dashboard ViewModel for ADE iOS
 *
 * Handles dashboard data fetching and state management
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

@MainActor
class DashboardViewModel: ObservableObject {
    // MARK: - Published Properties

    @Published var stats: DashboardStats?
    @Published var revenueData: [RevenueDataPoint] = []
    @Published var recentOrders: [Order] = []
    @Published var aiSuggestions: [AISuggestion] = []

    @Published var isLoading = false
    @Published var showError = false
    @Published var errorMessage: String?

    @Published var selectedPeriod = 0 {
        didSet {
            Task {
                await loadRevenueChart()
            }
        }
    }

    // MARK: - Dependencies

    private let apiClient = APIClient.shared
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Initialization

    init() {
        // Subscribe to network state changes
        apiClient.$error
            .sink { [weak self] error in
                if let error = error {
                    self?.errorMessage = error.errorDescription
                    self?.showError = true
                }
            }
            .store(in: &cancellables)
    }

    // MARK: - Data Loading

    func loadDashboard() async {
        isLoading = true

        do {
            async let statsTask = loadStats()
            async let ordersTask = loadRecentOrders()
            async let chartTask = loadRevenueChart()
            async let suggestionsTask = loadAISuggestions()

            _ = try await (statsTask, ordersTask, chartTask, suggestionsTask)

        } catch {
            errorMessage = error.localizedDescription
            showError = true
        }

        isLoading = false
    }

    private func loadStats() async throws {
        let response: DashboardStats = try await apiClient.request(
            endpoint: .getDashboardStats
        )

        stats = response
    }

    private func loadRecentOrders() async throws {
        let response: ECommerceStats = try await apiClient.request(
            endpoint: .getECommerceStats
        )

        recentOrders = response.recentOrders
    }

    private func loadRevenueChart() async throws {
        // Determine period
        let period: String
        switch selectedPeriod {
        case 0: period = "7d"
        case 1: period = "30d"
        case 2: period = "12m"
        default: period = "7d"
        }

        let response: RevenueAnalytics = try await apiClient.request(
            endpoint: .getRevenueAnalytics,
            headers: ["period": period]
        )

        // Convert to chart data
        revenueData = response.byDate.map { dateRevenue in
            RevenueDataPoint(
                date: ISO8601DateFormatter().date(from: dateRevenue.date) ?? Date(),
                revenue: Double(truncating: dateRevenue.revenue as NSDecimalNumber)
            )
        }
    }

    private func loadAISuggestions() async throws {
        let response: ECommerceStats = try await apiClient.request(
            endpoint: .getECommerceStats
        )

        aiSuggestions = response.aiSuggestions
    }

    // MARK: - Actions

    func refresh() async {
        await loadDashboard()
    }
}

// MARK: - Helper Models

struct RevenueDataPoint: Identifiable {
    let id = UUID()
    let date: Date
    let revenue: Double
}
