import SwiftUI
import LocalAuthentication

/**
 * Profile View
 *
 * Features:
 * - User profile information
 * - App settings (notifications, language, theme)
 * - Security settings (2FA, biometric, PIN)
 * - Account management (logout, delete account)
 * - App information (version, terms, privacy)
 * - Support & feedback
 *
 * @author ADE iOS Team
 * @since 2026-01-24
 */

struct ProfileView: View {
    @StateObject private var viewModel = ProfileViewModel()
    @State private var showLogoutAlert = false
    @State private var showDeleteAccountAlert = false
    @State private var showEditProfile = false
    @State private var showLanguagePicker = false
    @State private var showAbout = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Profile Header
                    profileHeaderView

                    // Settings Sections
                    VStack(spacing: 16) {
                        accountSection
                        notificationsSection
                        appearanceSection
                        securitySection
                        supportSection
                        aboutSection
                        dangerZoneSection
                    }
                    .padding(.horizontal)
                }
                .padding(.bottom, 32)
            }
            .navigationTitle("Profil")
            .navigationBarTitleDisplayMode(.large)
            .sheet(isPresented: $showEditProfile) {
                EditProfileSheet(viewModel: viewModel)
            }
            .sheet(isPresented: $showLanguagePicker) {
                LanguagePickerSheet(viewModel: viewModel)
            }
            .sheet(isPresented: $showAbout) {
                AboutSheet()
            }
            .alert("Çıkış Yap", isPresented: $showLogoutAlert) {
                Button("İptal", role: .cancel) {}
                Button("Çıkış Yap", role: .destructive) {
                    Task {
                        await viewModel.logout()
                    }
                }
            } message: {
                Text("Çıkış yapmak istediğinizden emin misiniz?")
            }
            .alert("Hesabı Sil", isPresented: $showDeleteAccountAlert) {
                Button("İptal", role: .cancel) {}
                Button("Sil", role: .destructive) {
                    Task {
                        await viewModel.deleteAccount()
                    }
                }
            } message: {
                Text("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinecektir.")
            }
        }
        .task {
            await viewModel.loadUserProfile()
        }
    }

    // MARK: - Profile Header

    private var profileHeaderView: some View {
        VStack(spacing: 16) {
            // Profile Picture
            Button {
                showEditProfile = true
            } label: {
                ZStack(alignment: .bottomTrailing) {
                    if let imageUrl = viewModel.user?.profileImageUrl,
                       let url = URL(string: imageUrl) {
                        AsyncImage(url: url) { image in
                            image.resizable().scaledToFill()
                        } placeholder: {
                            Image(systemName: "person.circle.fill")
                                .resizable()
                                .foregroundStyle(.blue.gradient)
                        }
                        .frame(width: 100, height: 100)
                        .clipShape(Circle())
                    } else {
                        Image(systemName: "person.circle.fill")
                            .resizable()
                            .foregroundStyle(.blue.gradient)
                            .frame(width: 100, height: 100)
                    }

                    Image(systemName: "camera.circle.fill")
                        .font(.system(size: 28))
                        .foregroundStyle(.white, .blue)
                        .background(Circle().fill(.white))
                }
            }

            // User Info
            VStack(spacing: 4) {
                Text(viewModel.user?.name ?? "Kullanıcı")
                    .font(.title2)
                    .fontWeight(.bold)

                Text(viewModel.user?.email ?? "user@example.com")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                if let company = viewModel.user?.companyName {
                    Text(company)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            // Edit Profile Button
            Button {
                showEditProfile = true
            } label: {
                Text("Profili Düzenle")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .padding(.horizontal, 24)
                    .padding(.vertical, 8)
            }
            .buttonStyle(.bordered)
        }
        .padding(.vertical, 24)
    }

    // MARK: - Account Section

    private var accountSection: some View {
        SettingsSection(title: "Hesap") {
            SettingsRow(
                icon: "person.fill",
                iconColor: .blue,
                title: "Kişisel Bilgiler",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                showEditProfile = true
            }

            SettingsRow(
                icon: "building.2.fill",
                iconColor: .orange,
                title: "Şirket Bilgileri",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Navigate to company settings
            }

            SettingsRow(
                icon: "creditcard.fill",
                iconColor: .green,
                title: "Abonelik & Faturalama",
                trailing: {
                    HStack(spacing: 4) {
                        Text("Pro")
                            .font(.caption)
                            .fontWeight(.medium)
                            .foregroundStyle(.white)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.green)
                            .clipShape(Capsule())
                        Image(systemName: "chevron.right")
                            .foregroundStyle(.secondary)
                    }
                }
            ) {
                // Navigate to billing
            }
        }
    }

    // MARK: - Notifications Section

    private var notificationsSection: some View {
        SettingsSection(title: "Bildirimler") {
            SettingsToggleRow(
                icon: "bell.fill",
                iconColor: .red,
                title: "Push Bildirimleri",
                subtitle: "Anlık bildirimler al",
                isOn: $viewModel.pushNotificationsEnabled
            )

            SettingsToggleRow(
                icon: "envelope.fill",
                iconColor: .blue,
                title: "E-posta Bildirimleri",
                subtitle: "Önemli güncellemeler için",
                isOn: $viewModel.emailNotificationsEnabled
            )

            SettingsToggleRow(
                icon: "chart.line.uptrend.xyaxis",
                iconColor: .green,
                title: "Satış Uyarıları",
                subtitle: "Yeni siparişler için bildirim",
                isOn: $viewModel.salesAlertsEnabled
            )

            SettingsToggleRow(
                icon: "exclamationmark.triangle.fill",
                iconColor: .orange,
                title: "Düşük Stok Uyarıları",
                subtitle: "Stok azaldığında bildir",
                isOn: $viewModel.lowStockAlertsEnabled
            )
        }
    }

    // MARK: - Appearance Section

    private var appearanceSection: some View {
        SettingsSection(title: "Görünüm") {
            SettingsRow(
                icon: "paintbrush.fill",
                iconColor: .purple,
                title: "Tema",
                trailing: {
                    HStack(spacing: 4) {
                        Text(viewModel.selectedTheme.displayName)
                            .foregroundStyle(.secondary)
                        Image(systemName: "chevron.right")
                            .foregroundStyle(.secondary)
                    }
                }
            ) {
                // Show theme picker
            }

            SettingsRow(
                icon: "globe",
                iconColor: .blue,
                title: "Dil",
                trailing: {
                    HStack(spacing: 4) {
                        Text(viewModel.selectedLanguage.displayName)
                            .foregroundStyle(.secondary)
                        Image(systemName: "chevron.right")
                            .foregroundStyle(.secondary)
                    }
                }
            ) {
                showLanguagePicker = true
            }
        }
    }

    // MARK: - Security Section

    private var securitySection: some View {
        SettingsSection(title: "Güvenlik") {
            SettingsToggleRow(
                icon: "faceid",
                iconColor: .green,
                title: biometricType,
                subtitle: "Hızlı ve güvenli giriş",
                isOn: $viewModel.biometricEnabled
            )

            SettingsToggleRow(
                icon: "lock.shield.fill",
                iconColor: .orange,
                title: "İki Faktörlü Kimlik Doğrulama",
                subtitle: "Ekstra güvenlik katmanı",
                isOn: $viewModel.twoFactorEnabled
            )

            SettingsRow(
                icon: "key.fill",
                iconColor: .blue,
                title: "Şifre Değiştir",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Navigate to change password
            }

            SettingsRow(
                icon: "clock.arrow.circlepath",
                iconColor: .purple,
                title: "Oturum Geçmişi",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Show session history
            }
        }
    }

    // MARK: - Support Section

    private var supportSection: some View {
        SettingsSection(title: "Destek & Yardım") {
            SettingsRow(
                icon: "questionmark.circle.fill",
                iconColor: .blue,
                title: "Yardım Merkezi",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Open help center
            }

            SettingsRow(
                icon: "envelope.fill",
                iconColor: .green,
                title: "Bize Ulaşın",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Open contact form
            }

            SettingsRow(
                icon: "star.fill",
                iconColor: .orange,
                title: "Uygulamayı Değerlendir",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                viewModel.rateApp()
            }

            SettingsRow(
                icon: "bubble.left.and.bubble.right.fill",
                iconColor: .purple,
                title: "Geri Bildirim Gönder",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Open feedback form
            }
        }
    }

    // MARK: - About Section

    private var aboutSection: some View {
        SettingsSection(title: "Hakkında") {
            SettingsRow(
                icon: "info.circle.fill",
                iconColor: .blue,
                title: "Uygulama Hakkında",
                trailing: {
                    HStack(spacing: 4) {
                        Text(viewModel.appVersion)
                            .foregroundStyle(.secondary)
                        Image(systemName: "chevron.right")
                            .foregroundStyle(.secondary)
                    }
                }
            ) {
                showAbout = true
            }

            SettingsRow(
                icon: "doc.text.fill",
                iconColor: .orange,
                title: "Kullanım Koşulları",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Open terms
            }

            SettingsRow(
                icon: "hand.raised.fill",
                iconColor: .purple,
                title: "Gizlilik Politikası",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Open privacy policy
            }

            SettingsRow(
                icon: "checkmark.seal.fill",
                iconColor: .green,
                title: "Lisanslar",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                // Show open source licenses
            }
        }
    }

    // MARK: - Danger Zone

    private var dangerZoneSection: some View {
        SettingsSection(title: "Tehlikeli Bölge") {
            SettingsRow(
                icon: "rectangle.portrait.and.arrow.right.fill",
                iconColor: .orange,
                title: "Çıkış Yap",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                showLogoutAlert = true
            }

            SettingsRow(
                icon: "trash.fill",
                iconColor: .red,
                title: "Hesabı Sil",
                trailing: {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            ) {
                showDeleteAccountAlert = true
            }
        }
    }

    // MARK: - Helpers

    private var biometricType: String {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            switch context.biometryType {
            case .faceID:
                return "Face ID"
            case .touchID:
                return "Touch ID"
            case .opticID:
                return "Optic ID"
            default:
                return "Biyometrik Kimlik Doğrulama"
            }
        }

        return "Biyometrik Kimlik Doğrulama"
    }
}

// MARK: - Settings Components

struct SettingsSection<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.headline)
                .foregroundStyle(.secondary)
                .padding(.horizontal, 4)

            VStack(spacing: 0) {
                content
            }
            .background(Color(uiColor: .systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
    }
}

struct SettingsRow<Trailing: View>: View {
    let icon: String
    let iconColor: Color
    let title: String
    let subtitle: String?
    @ViewBuilder let trailing: Trailing
    let action: () -> Void

    init(
        icon: String,
        iconColor: Color,
        title: String,
        subtitle: String? = nil,
        @ViewBuilder trailing: () -> Trailing = { EmptyView() },
        action: @escaping () -> Void
    ) {
        self.icon = icon
        self.iconColor = iconColor
        self.title = title
        self.subtitle = subtitle
        self.trailing = trailing()
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundStyle(.white)
                    .frame(width: 32, height: 32)
                    .background(iconColor)
                    .clipShape(RoundedRectangle(cornerRadius: 6))

                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.body)
                        .foregroundStyle(.primary)

                    if let subtitle = subtitle {
                        Text(subtitle)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }

                Spacer()

                trailing
            }
            .padding(12)
        }
        .buttonStyle(.plain)
    }
}

struct SettingsToggleRow: View {
    let icon: String
    let iconColor: Color
    let title: String
    let subtitle: String?
    @Binding var isOn: Bool

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(.white)
                .frame(width: 32, height: 32)
                .background(iconColor)
                .clipShape(RoundedRectangle(cornerRadius: 6))

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.body)

                if let subtitle = subtitle {
                    Text(subtitle)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            Spacer()

            Toggle("", isOn: $isOn)
                .labelsHidden()
        }
        .padding(12)
    }
}

// MARK: - Sheets

struct EditProfileSheet: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: ProfileViewModel

    @State private var name = ""
    @State private var email = ""
    @State private var phone = ""
    @State private var companyName = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Kişisel Bilgiler") {
                    TextField("Ad Soyad", text: $name)
                    TextField("E-posta", text: $email)
                        .keyboardType(.emailAddress)
                        .textInputAutocapitalization(.never)
                    TextField("Telefon", text: $phone)
                        .keyboardType(.phonePad)
                }

                Section("Şirket Bilgileri") {
                    TextField("Şirket Adı", text: $companyName)
                }
            }
            .navigationTitle("Profili Düzenle")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("İptal") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Kaydet") {
                        Task {
                            await viewModel.updateProfile(
                                name: name,
                                email: email,
                                phone: phone,
                                companyName: companyName
                            )
                            dismiss()
                        }
                    }
                }
            }
            .onAppear {
                name = viewModel.user?.name ?? ""
                email = viewModel.user?.email ?? ""
                phone = viewModel.user?.phone ?? ""
                companyName = viewModel.user?.companyName ?? ""
            }
        }
    }
}

struct LanguagePickerSheet: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: ProfileViewModel

    var body: some View {
        NavigationStack {
            List {
                ForEach(AppLanguage.allCases, id: \.self) { language in
                    Button {
                        viewModel.selectedLanguage = language
                        dismiss()
                    } label: {
                        HStack {
                            Text(language.displayName)
                            Spacer()
                            if viewModel.selectedLanguage == language {
                                Image(systemName: "checkmark")
                                    .foregroundStyle(.blue)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Dil Seçin")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Kapat") { dismiss() }
                }
            }
        }
    }
}

struct AboutSheet: View {
    @Environment(\.dismiss) var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    Image(systemName: "building.2.fill")
                        .font(.system(size: 80))
                        .foregroundStyle(.blue.gradient)

                    VStack(spacing: 8) {
                        Text("ADE - Akıllı Devlet Ekosistemi")
                            .font(.title2)
                            .fontWeight(.bold)

                        Text("Versiyon 1.0.0 (Build 1)")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }

                    Text("İşletmenizi dijital dönüşüme taşıyan, yapay zeka destekli, blockchain tabanlı e-fatura sistemi ile güvenli, hızlı ve akıllı iş yönetimi platformu.")
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                        .foregroundStyle(.secondary)

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Özellikler:")
                            .fontWeight(.semibold)
                        Text("• E-Devlet entegrasyonu")
                        Text("• Çoklu e-ticaret platform yönetimi")
                        Text("• AI destekli muhasebe")
                        Text("• Blockchain e-fatura sistemi")
                        Text("• Satış tahminleme ve fiyat optimizasyonu")
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color(uiColor: .systemGray6))
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .padding(.horizontal)
                }
                .padding(.vertical, 32)
            }
            .navigationTitle("Hakkında")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Kapat") { dismiss() }
                }
            }
        }
    }
}

// MARK: - Preview

#Preview {
    ProfileView()
}
