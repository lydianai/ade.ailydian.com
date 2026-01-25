import Foundation
import Combine

/**
 * Integrations ViewModel for ADE iOS
 *
 * Handles integration data fetching, connection, and sync
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

@MainActor
class IntegrationsViewModel: ObservableObject {
    // MARK: - Published Properties

    @Published var integrations: [Integration] = []
    @Published var isLoading = false
    @Published var showError = false
    @Published var errorMessage: String?

    // MARK: - Dependencies

    private let apiClient = APIClient.shared
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Data Loading

    func loadIntegrations() async {
        isLoading = true

        do {
            let response: [Integration] = try await apiClient.request(
                endpoint: .getIntegrations
            )

            integrations = response

        } catch {
            errorMessage = error.localizedDescription
            showError = true
        }

        isLoading = false
    }

    func filteredIntegrations(for category: IntegrationCategory) -> [Integration] {
        integrations.filter { $0.category == category }
    }

    // MARK: - Actions

    func connect(_ integration: Integration, credentials: [String: String]) async {
        isLoading = true

        do {
            let request = ConnectIntegrationRequest(
                credentials: credentials,
                settings: nil
            )

            let response: IntegrationDetail = try await apiClient.request(
                endpoint: .connectIntegration(id: integration.id),
                method: .post,
                body: request
            )

            // Update local integration
            if let index = integrations.firstIndex(where: { $0.id == integration.id }) {
                integrations[index] = response.integration
            }

            // Optional: Show success message
            print("✅ Connected to \(integration.name)")

        } catch {
            errorMessage = error.localizedDescription
            showError = true
        }

        isLoading = false
    }

    func disconnect(_ integration: Integration) async {
        isLoading = true

        do {
            let _: EmptyResponse = try await apiClient.request(
                endpoint: .disconnectIntegration(id: integration.id),
                method: .post
            )

            // Update local integration
            if let index = integrations.firstIndex(where: { $0.id == integration.id }) {
                var updated = integrations[index]
                updated.isConnected = false
                updated.connectedAt = nil
                integrations[index] = updated
            }

            print("❌ Disconnected from \(integration.name)")

        } catch {
            errorMessage = error.localizedDescription
            showError = true
        }

        isLoading = false
    }

    func syncAll() async {
        isLoading = true

        // Sync all connected integrations
        for integration in integrations.filter({ $0.isConnected }) {
            await sync(integration)
        }

        isLoading = false
    }

    func sync(_ integration: Integration) async {
        do {
            let _: EmptyResponse = try await apiClient.request(
                endpoint: .getIntegrationDetail(id: integration.id),
                method: .post
            )

            print("🔄 Synced \(integration.name)")

        } catch {
            print("⚠️ Failed to sync \(integration.name): \(error.localizedDescription)")
        }
    }
}
