import SwiftUI

/**
 * Integrations View for ADE iOS
 *
 * Features:
 * - E-Devlet integrations (GIB, SGK, MERNİS, e-Fatura)
 * - E-Commerce platforms (Hepsiburada, Trendyol, N11, Amazon)
 * - Accounting software (Logo, Mikro, Eta)
 * - Shipping companies (Aras, MNG, Yurtiçi, PTT)
 * - Payment systems (İyzico, PayTR, Stripe)
 * - OAuth flow handling
 * - Connection status & sync
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

struct IntegrationsView: View {
    @StateObject private var viewModel = IntegrationsViewModel()
    @State private var selectedCategory: IntegrationCategory = .eDevlet
    @State private var showConnectSheet = false
    @State private var selectedIntegration: Integration?

    var body: some View {
        NavigationStack {
            ZStack {
                // Background gradient
                LinearGradient(
                    colors: [
                        Color(hex: "3B82F6").opacity(0.05),
                        Color.clear
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Category tabs
                    categoryTabsView

                    // Integrations list
                    ScrollView {
                        LazyVStack(spacing: 16) {
                            ForEach(viewModel.filteredIntegrations(for: selectedCategory)) { integration in
                                IntegrationCard(
                                    integration: integration,
                                    onTap: {
                                        selectedIntegration = integration
                                        if integration.isConnected {
                                            // Navigate to detail
                                        } else {
                                            showConnectSheet = true
                                        }
                                    },
                                    onToggle: {
                                        if integration.isConnected {
                                            Task {
                                                await viewModel.disconnect(integration)
                                            }
                                        } else {
                                            selectedIntegration = integration
                                            showConnectSheet = true
                                        }
                                    }
                                )
                            }
                        }
                        .padding()
                    }
                }

                // Loading overlay
                if viewModel.isLoading && viewModel.integrations.isEmpty {
                    ProgressView()
                        .scaleEffect(1.5)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(Color.black.opacity(0.2))
                }
            }
            .navigationTitle("Entegrasyonlar")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        Task {
                            await viewModel.syncAll()
                        }
                    } label: {
                        Image(systemName: "arrow.clockwise")
                            .foregroundColor(Color(hex: "3B82F6"))
                    }
                }
            }
            .sheet(isPresented: $showConnectSheet) {
                if let integration = selectedIntegration {
                    ConnectIntegrationSheet(
                        integration: integration,
                        onConnect: { credentials in
                            Task {
                                await viewModel.connect(integration, credentials: credentials)
                                showConnectSheet = false
                            }
                        },
                        onCancel: {
                            showConnectSheet = false
                        }
                    )
                }
            }
            .alert("Hata", isPresented: $viewModel.showError) {
                Button("Tamam", role: .cancel) {}
            } message: {
                Text(viewModel.errorMessage ?? "Bilinmeyen bir hata oluştu")
            }
        }
        .task {
            await viewModel.loadIntegrations()
        }
    }

    // MARK: - Category Tabs

    private var categoryTabsView: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 12) {
                ForEach([
                    IntegrationCategory.eDevlet,
                    IntegrationCategory.eCommerce,
                    IntegrationCategory.accounting,
                    IntegrationCategory.logistics,
                    IntegrationCategory.payment
                ], id: \.self) { category in
                    CategoryTab(
                        title: categoryTitle(category),
                        icon: categoryIcon(category),
                        isSelected: selectedCategory == category,
                        count: viewModel.integrations.filter { $0.category == category }.count
                    ) {
                        withAnimation {
                            selectedCategory = category
                        }
                    }
                }
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 12)
        .background(.ultraThinMaterial)
    }

    private func categoryTitle(_ category: IntegrationCategory) -> String {
        switch category {
        case .eDevlet: return "e-Devlet"
        case .eCommerce: return "E-Ticaret"
        case .accounting: return "Muhasebe"
        case .logistics: return "Kargo"
        case .payment: return "Ödeme"
        case .marketing: return "Pazarlama"
        }
    }

    private func categoryIcon(_ category: IntegrationCategory) -> String {
        switch category {
        case .eDevlet: return "building.columns.fill"
        case .eCommerce: return "cart.fill"
        case .accounting: return "doc.text.fill"
        case .logistics: return "shippingbox.fill"
        case .payment: return "creditcard.fill"
        case .marketing: return "megaphone.fill"
        }
    }
}

// MARK: - Category Tab

struct CategoryTab: View {
    let title: String
    let icon: String
    let isSelected: Bool
    let count: Int
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.callout)

                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)

                if count > 0 {
                    Text("\(count)")
                        .font(.caption2)
                        .fontWeight(.bold)
                        .foregroundColor(isSelected ? .white : .secondary)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(
                            Capsule()
                                .fill(isSelected ? Color.white.opacity(0.3) : Color.secondary.opacity(0.2))
                        )
                }
            }
            .foregroundColor(isSelected ? .white : .primary)
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .background(
                Capsule()
                    .fill(isSelected ?
                          LinearGradient(
                            colors: [Color(hex: "3B82F6"), Color(hex: "2563EB")],
                            startPoint: .leading,
                            endPoint: .trailing
                          ) :
                          LinearGradient(
                            colors: [Color.clear],
                            startPoint: .leading,
                            endPoint: .trailing
                          )
                    )
            )
            .overlay(
                Capsule()
                    .stroke(isSelected ? Color.clear : Color.secondary.opacity(0.3), lineWidth: 1)
            )
        }
    }
}

// MARK: - Integration Card

struct IntegrationCard: View {
    let integration: Integration
    let onTap: () -> Void
    let onToggle: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 16) {
                // Icon
                ZStack {
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color(hex: integration.color),
                                    Color(hex: integration.color).opacity(0.7)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 56, height: 56)

                    Image(systemName: integration.icon)
                        .font(.title2)
                        .foregroundColor(.white)
                }

                // Info
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Text(integration.name)
                            .font(.headline)

                        if integration.isOfficial {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.caption)
                                .foregroundColor(.blue)
                        }

                        if integration.isPremium {
                            Text("PRO")
                                .font(.caption2)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(
                                    Capsule()
                                        .fill(
                                            LinearGradient(
                                                colors: [Color(hex: "F59E0B"), Color(hex: "D97706")],
                                                startPoint: .leading,
                                                endPoint: .trailing
                                            )
                                        )
                                )
                        }
                    }

                    Text(integration.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .lineLimit(2)

                    if integration.isConnected {
                        HStack(spacing: 4) {
                            Circle()
                                .fill(Color.green)
                                .frame(width: 6, height: 6)

                            Text("Bağlı")
                                .font(.caption2)
                                .foregroundColor(.green)

                            if let connectedAt = integration.connectedAt {
                                Text("• \(connectedAt.formatted(.relative(presentation: .named)))")
                                    .font(.caption2)
                                    .foregroundColor(.secondary)
                            }
                        }
                    } else {
                        Text("Bağlı değil")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }

                Spacer()

                // Toggle switch
                Toggle("", isOn: .constant(integration.isConnected))
                    .labelsHidden()
                    .onChange(of: integration.isConnected) { _ in
                        onToggle()
                    }
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(.ultraThinMaterial)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(integration.isConnected ? Color.green.opacity(0.5) : Color.clear, lineWidth: 2)
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Connect Integration Sheet

struct ConnectIntegrationSheet: View {
    let integration: Integration
    let onConnect: ([String: String]) -> Void
    let onCancel: () -> Void

    @State private var credentials: [String: String] = [:]
    @State private var isConnecting = false

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    HStack {
                        Spacer()
                        VStack(spacing: 12) {
                            ZStack {
                                Circle()
                                    .fill(
                                        LinearGradient(
                                            colors: [
                                                Color(hex: integration.color),
                                                Color(hex: integration.color).opacity(0.7)
                                            ],
                                            startPoint: .topLeading,
                                            endPoint: .bottomTrailing
                                        )
                                    )
                                    .frame(width: 80, height: 80)

                                Image(systemName: integration.icon)
                                    .font(.system(size: 32))
                                    .foregroundColor(.white)
                            }

                            Text(integration.name)
                                .font(.title2)
                                .fontWeight(.bold)

                            Text(integration.description)
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                        }
                        Spacer()
                    }
                    .listRowBackground(Color.clear)
                }

                Section("Bağlantı Bilgileri") {
                    ForEach(integration.requiredCredentials, id: \.self) { field in
                        if field.lowercased().contains("password") || field.lowercased().contains("secret") || field.lowercased().contains("key") {
                            SecureField(fieldLabel(field), text: binding(for: field))
                        } else {
                            TextField(fieldLabel(field), text: binding(for: field))
                        }
                    }
                }

                Section("Özellikler") {
                    ForEach(integration.features, id: \.self) { feature in
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                            Text(feature)
                                .font(.subheadline)
                        }
                    }
                }
            }
            .navigationTitle("Entegrasyon Bağla")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("İptal") {
                        onCancel()
                    }
                }

                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Bağlan") {
                        isConnecting = true
                        onConnect(credentials)
                    }
                    .disabled(isConnecting || !isFormValid())
                }
            }
        }
    }

    private func binding(for field: String) -> Binding<String> {
        Binding(
            get: { credentials[field] ?? "" },
            set: { credentials[field] = $0 }
        )
    }

    private func fieldLabel(_ field: String) -> String {
        field.replacingOccurrences(of: "_", with: " ").capitalized
    }

    private func isFormValid() -> Bool {
        integration.requiredCredentials.allSatisfy { field in
            !(credentials[field] ?? "").isEmpty
        }
    }
}

// MARK: - Preview

#Preview {
    IntegrationsView()
}
