package tr.gov.ade.features.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.AsyncImage

/**
 * Profile Screen
 *
 * Features:
 * - User profile information
 * - App settings (notifications, language, theme)
 * - Security settings (2FA, biometric, PIN)
 * - Account management (logout, delete account)
 * - App information (version, terms, privacy)
 * - Support & feedback
 *
 * @author ADE Android Team
 * @since 2026-01-24
 */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    viewModel: ProfileViewModel = hiltViewModel()
) {
    val user by viewModel.user.collectAsState()
    val pushNotificationsEnabled by viewModel.pushNotificationsEnabled.collectAsState()
    val emailNotificationsEnabled by viewModel.emailNotificationsEnabled.collectAsState()
    val salesAlertsEnabled by viewModel.salesAlertsEnabled.collectAsState()
    val lowStockAlertsEnabled by viewModel.lowStockAlertsEnabled.collectAsState()
    val biometricEnabled by viewModel.biometricEnabled.collectAsState()
    val twoFactorEnabled by viewModel.twoFactorEnabled.collectAsState()
    val selectedTheme by viewModel.selectedTheme.collectAsState()
    val selectedLanguage by viewModel.selectedLanguage.collectAsState()

    var showLogoutDialog by remember { mutableStateOf(false) }
    var showDeleteAccountDialog by remember { mutableStateOf(false) }
    var showEditProfile by remember { mutableStateOf(false) }
    var showLanguagePicker by remember { mutableStateOf(false) }
    var showAbout by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        viewModel.loadUserProfile()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profil") }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(bottom = 32.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Profile Header
            item {
                ProfileHeader(
                    user = user,
                    onEditClick = { showEditProfile = true }
                )
            }

            // Account Section
            item {
                SettingsSection(title = "Hesap") {
                    SettingsRow(
                        icon = Icons.Default.Person,
                        iconColor = Color(0xFF2196F3),
                        title = "Kişisel Bilgiler",
                        onClick = { showEditProfile = true }
                    )
                    SettingsRow(
                        icon = Icons.Default.Business,
                        iconColor = Color(0xFFFF9800),
                        title = "Şirket Bilgileri",
                        onClick = { /* Navigate */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.CreditCard,
                        iconColor = Color(0xFF4CAF50),
                        title = "Abonelik & Faturalama",
                        trailing = {
                            AssistChip(
                                onClick = {},
                                label = { Text("Pro", style = MaterialTheme.typography.labelSmall) },
                                colors = AssistChipDefaults.assistChipColors(
                                    containerColor = Color(0xFF4CAF50),
                                    labelColor = Color.White
                                )
                            )
                        },
                        onClick = { /* Navigate */ }
                    )
                }
            }

            // Notifications Section
            item {
                SettingsSection(title = "Bildirimler") {
                    SettingsToggleRow(
                        icon = Icons.Default.Notifications,
                        iconColor = Color(0xFFF44336),
                        title = "Push Bildirimleri",
                        subtitle = "Anlık bildirimler al",
                        isChecked = pushNotificationsEnabled,
                        onCheckedChange = { viewModel.updatePushNotifications(it) }
                    )
                    SettingsToggleRow(
                        icon = Icons.Default.Email,
                        iconColor = Color(0xFF2196F3),
                        title = "E-posta Bildirimleri",
                        subtitle = "Önemli güncellemeler için",
                        isChecked = emailNotificationsEnabled,
                        onCheckedChange = { viewModel.updateEmailNotifications(it) }
                    )
                    SettingsToggleRow(
                        icon = Icons.Default.TrendingUp,
                        iconColor = Color(0xFF4CAF50),
                        title = "Satış Uyarıları",
                        subtitle = "Yeni siparişler için bildirim",
                        isChecked = salesAlertsEnabled,
                        onCheckedChange = { viewModel.updateSalesAlerts(it) }
                    )
                    SettingsToggleRow(
                        icon = Icons.Default.Warning,
                        iconColor = Color(0xFFFF9800),
                        title = "Düşük Stok Uyarıları",
                        subtitle = "Stok azaldığında bildir",
                        isChecked = lowStockAlertsEnabled,
                        onCheckedChange = { viewModel.updateLowStockAlerts(it) }
                    )
                }
            }

            // Appearance Section
            item {
                SettingsSection(title = "Görünüm") {
                    SettingsRow(
                        icon = Icons.Default.Palette,
                        iconColor = Color(0xFF9C27B0),
                        title = "Tema",
                        trailing = {
                            Text(
                                text = selectedTheme.displayName,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        },
                        onClick = { /* Show theme picker */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.Language,
                        iconColor = Color(0xFF2196F3),
                        title = "Dil",
                        trailing = {
                            Text(
                                text = selectedLanguage.displayName,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        },
                        onClick = { showLanguagePicker = true }
                    )
                }
            }

            // Security Section
            item {
                SettingsSection(title = "Güvenlik") {
                    SettingsToggleRow(
                        icon = Icons.Default.Fingerprint,
                        iconColor = Color(0xFF4CAF50),
                        title = "Biyometrik Kimlik Doğrulama",
                        subtitle = "Hızlı ve güvenli giriş",
                        isChecked = biometricEnabled,
                        onCheckedChange = { viewModel.updateBiometric(it) }
                    )
                    SettingsToggleRow(
                        icon = Icons.Default.Security,
                        iconColor = Color(0xFFFF9800),
                        title = "İki Faktörlü Kimlik Doğrulama",
                        subtitle = "Ekstra güvenlik katmanı",
                        isChecked = twoFactorEnabled,
                        onCheckedChange = { viewModel.updateTwoFactor(it) }
                    )
                    SettingsRow(
                        icon = Icons.Default.Key,
                        iconColor = Color(0xFF2196F3),
                        title = "Şifre Değiştir",
                        onClick = { /* Navigate */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.History,
                        iconColor = Color(0xFF9C27B0),
                        title = "Oturum Geçmişi",
                        onClick = { /* Navigate */ }
                    )
                }
            }

            // Support Section
            item {
                SettingsSection(title = "Destek & Yardım") {
                    SettingsRow(
                        icon = Icons.Default.Help,
                        iconColor = Color(0xFF2196F3),
                        title = "Yardım Merkezi",
                        onClick = { /* Open help */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.Mail,
                        iconColor = Color(0xFF4CAF50),
                        title = "Bize Ulaşın",
                        onClick = { /* Open contact */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.Star,
                        iconColor = Color(0xFFFF9800),
                        title = "Uygulamayı Değerlendir",
                        onClick = { viewModel.rateApp() }
                    )
                    SettingsRow(
                        icon = Icons.Default.Feedback,
                        iconColor = Color(0xFF9C27B0),
                        title = "Geri Bildirim Gönder",
                        onClick = { /* Open feedback */ }
                    )
                }
            }

            // About Section
            item {
                SettingsSection(title = "Hakkında") {
                    SettingsRow(
                        icon = Icons.Default.Info,
                        iconColor = Color(0xFF2196F3),
                        title = "Uygulama Hakkında",
                        trailing = {
                            Text(
                                text = viewModel.appVersion,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        },
                        onClick = { showAbout = true }
                    )
                    SettingsRow(
                        icon = Icons.Default.Description,
                        iconColor = Color(0xFFFF9800),
                        title = "Kullanım Koşulları",
                        onClick = { /* Open terms */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.PrivacyTip,
                        iconColor = Color(0xFF9C27B0),
                        title = "Gizlilik Politikası",
                        onClick = { /* Open privacy */ }
                    )
                    SettingsRow(
                        icon = Icons.Default.CheckCircle,
                        iconColor = Color(0xFF4CAF50),
                        title = "Lisanslar",
                        onClick = { /* Show licenses */ }
                    )
                }
            }

            // Danger Zone
            item {
                SettingsSection(title = "Tehlikeli Bölge") {
                    SettingsRow(
                        icon = Icons.Default.Logout,
                        iconColor = Color(0xFFFF9800),
                        title = "Çıkış Yap",
                        onClick = { showLogoutDialog = true }
                    )
                    SettingsRow(
                        icon = Icons.Default.DeleteForever,
                        iconColor = Color(0xFFF44336),
                        title = "Hesabı Sil",
                        onClick = { showDeleteAccountDialog = true }
                    )
                }
            }
        }
    }

    // Dialogs
    if (showLogoutDialog) {
        LogoutDialog(
            onDismiss = { showLogoutDialog = false },
            onConfirm = {
                viewModel.logout()
                showLogoutDialog = false
            }
        )
    }

    if (showDeleteAccountDialog) {
        DeleteAccountDialog(
            onDismiss = { showDeleteAccountDialog = false },
            onConfirm = {
                viewModel.deleteAccount()
                showDeleteAccountDialog = false
            }
        )
    }

    if (showEditProfile) {
        EditProfileDialog(
            user = user,
            onDismiss = { showEditProfile = false },
            onSave = { name, email, phone, company ->
                viewModel.updateProfile(name, email, phone, company)
                showEditProfile = false
            }
        )
    }

    if (showLanguagePicker) {
        LanguagePickerDialog(
            selectedLanguage = selectedLanguage,
            onDismiss = { showLanguagePicker = false },
            onSelect = { language ->
                viewModel.updateLanguage(language)
                showLanguagePicker = false
            }
        )
    }

    if (showAbout) {
        AboutDialog(
            onDismiss = { showAbout = false }
        )
    }
}

// MARK: - Profile Header

@Composable
private fun ProfileHeader(
    user: User?,
    onEditClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Profile Picture
        Box(
            modifier = Modifier
                .size(100.dp)
                .clickable(onClick = onEditClick)
        ) {
            if (user?.profileImageUrl != null) {
                AsyncImage(
                    model = user.profileImageUrl,
                    contentDescription = "Profile Picture",
                    modifier = Modifier
                        .fillMaxSize()
                        .clip(CircleShape),
                    contentScale = ContentScale.Crop
                )
            } else {
                Icon(
                    imageVector = Icons.Default.AccountCircle,
                    contentDescription = "Profile Picture",
                    modifier = Modifier.fillMaxSize(),
                    tint = MaterialTheme.colorScheme.primary
                )
            }

            Surface(
                modifier = Modifier
                    .size(28.dp)
                    .align(Alignment.BottomEnd),
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primary
            ) {
                Icon(
                    imageVector = Icons.Default.CameraAlt,
                    contentDescription = "Edit",
                    modifier = Modifier.padding(6.dp),
                    tint = Color.White
                )
            }
        }

        // User Info
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = user?.name ?: "Kullanıcı",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = user?.email ?: "user@example.com",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            user?.companyName?.let { company ->
                Text(
                    text = company,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // Edit Button
        Button(
            onClick = onEditClick,
            modifier = Modifier.padding(top = 8.dp)
        ) {
            Text("Profili Düzenle")
        }
    }
}

// MARK: - Settings Components

@Composable
private fun SettingsSection(
    title: String,
    content: @Composable ColumnScope.() -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(horizontal = 4.dp, vertical = 8.dp)
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column {
                content()
            }
        }
    }
}

@Composable
private fun SettingsRow(
    icon: ImageVector,
    iconColor: Color,
    title: String,
    subtitle: String? = null,
    trailing: @Composable (() -> Unit)? = null,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                shape = RoundedCornerShape(6.dp),
                color = iconColor,
                modifier = Modifier.size(32.dp)
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = title,
                    tint = Color.White,
                    modifier = Modifier.padding(6.dp)
                )
            }

            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.bodyMedium
                )

                subtitle?.let {
                    Text(
                        text = it,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            if (trailing != null) {
                trailing()
            } else {
                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = "Navigate",
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun SettingsToggleRow(
    icon: ImageVector,
    iconColor: Color,
    title: String,
    subtitle: String? = null,
    isChecked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Surface(
            shape = RoundedCornerShape(6.dp),
            color = iconColor,
            modifier = Modifier.size(32.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = title,
                tint = Color.White,
                modifier = Modifier.padding(6.dp)
            )
        }

        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(2.dp)
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium
            )

            subtitle?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        Switch(
            checked = isChecked,
            onCheckedChange = onCheckedChange
        )
    }
}

// MARK: - Dialogs (Simplified placeholders)

@Composable
private fun LogoutDialog(
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = { Icon(Icons.Default.Logout, null) },
        title = { Text("Çıkış Yap") },
        text = { Text("Çıkış yapmak istediğinizden emin misiniz?") },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Çıkış Yap")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("İptal")
            }
        }
    )
}

@Composable
private fun DeleteAccountDialog(
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = { Icon(Icons.Default.DeleteForever, null, tint = Color(0xFFF44336)) },
        title = { Text("Hesabı Sil") },
        text = { Text("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinecektir.") },
        confirmButton = {
            TextButton(
                onClick = onConfirm,
                colors = ButtonDefaults.textButtonColors(contentColor = Color(0xFFF44336))
            ) {
                Text("Sil")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("İptal")
            }
        }
    )
}

@Composable
private fun EditProfileDialog(
    user: User?,
    onDismiss: () -> Unit,
    onSave: (String, String, String, String) -> Unit
) {
    // Simplified placeholder
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Profili Düzenle") },
        text = { Text("Profile edit form") },
        confirmButton = {
            TextButton(onClick = { onSave("", "", "", "") }) {
                Text("Kaydet")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("İptal")
            }
        }
    )
}

@Composable
private fun LanguagePickerDialog(
    selectedLanguage: AppLanguage,
    onDismiss: () -> Unit,
    onSelect: (AppLanguage) -> Unit
) {
    // Simplified placeholder
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Dil Seçin") },
        text = { Text("Language picker") },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Kapat")
            }
        }
    )
}

@Composable
private fun AboutDialog(onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = { Icon(Icons.Default.Business, null) },
        title = { Text("ADE - Akıllı Devlet Ekosistemi") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Versiyon 1.0.0 (Build 1)")
                Text("İşletmenizi dijital dönüşüme taşıyan platform.")
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Kapat")
            }
        }
    )
}

// MARK: - Data Models

data class User(
    val id: String,
    val name: String,
    val email: String,
    val phone: String?,
    val companyName: String?,
    val profileImageUrl: String?
)

enum class AppTheme(val displayName: String) {
    LIGHT("Açık"),
    DARK("Koyu"),
    SYSTEM("Sistem")
}

enum class AppLanguage(val displayName: String) {
    TURKISH("Türkçe"),
    ENGLISH("English")
}
