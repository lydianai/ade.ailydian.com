package tr.gov.ade.features.profile

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import tr.gov.ade.core.network.APIClient
import javax.inject.Inject

/**
 * Profile ViewModel
 *
 * Manages user profile and app settings
 *
 * @author ADE Android Team
 * @since 2026-01-24
 */

@HiltViewModel
class ProfileViewModel @Inject constructor(
    @ApplicationContext private val context: Context,
    private val apiClient: APIClient
) : ViewModel() {

    // MARK: - State Flows

    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user.asStateFlow()

    // Notifications
    private val _pushNotificationsEnabled = MutableStateFlow(true)
    val pushNotificationsEnabled: StateFlow<Boolean> = _pushNotificationsEnabled.asStateFlow()

    private val _emailNotificationsEnabled = MutableStateFlow(true)
    val emailNotificationsEnabled: StateFlow<Boolean> = _emailNotificationsEnabled.asStateFlow()

    private val _salesAlertsEnabled = MutableStateFlow(true)
    val salesAlertsEnabled: StateFlow<Boolean> = _salesAlertsEnabled.asStateFlow()

    private val _lowStockAlertsEnabled = MutableStateFlow(true)
    val lowStockAlertsEnabled: StateFlow<Boolean> = _lowStockAlertsEnabled.asStateFlow()

    // Appearance
    private val _selectedTheme = MutableStateFlow(AppTheme.SYSTEM)
    val selectedTheme: StateFlow<AppTheme> = _selectedTheme.asStateFlow()

    private val _selectedLanguage = MutableStateFlow(AppLanguage.TURKISH)
    val selectedLanguage: StateFlow<AppLanguage> = _selectedLanguage.asStateFlow()

    // Security
    private val _biometricEnabled = MutableStateFlow(false)
    val biometricEnabled: StateFlow<Boolean> = _biometricEnabled.asStateFlow()

    private val _twoFactorEnabled = MutableStateFlow(false)
    val twoFactorEnabled: StateFlow<Boolean> = _twoFactorEnabled.asStateFlow()

    // App Info
    val appVersion: String
        get() = try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            "${packageInfo.versionName} (${packageInfo.versionCode})"
        } catch (e: Exception) {
            "1.0.0"
        }

    // MARK: - Persistence

    private val prefs = context.getSharedPreferences("profile_settings", Context.MODE_PRIVATE)

    private val pushNotifKey = "push_notifications_enabled"
    private val emailNotifKey = "email_notifications_enabled"
    private val salesAlertsKey = "sales_alerts_enabled"
    private val lowStockAlertsKey = "low_stock_alerts_enabled"
    private val themeKey = "selected_theme"
    private val languageKey = "selected_language"
    private val biometricKey = "biometric_enabled"
    private val twoFactorKey = "two_factor_enabled"

    init {
        loadSettings()
    }

    private fun loadSettings() {
        _pushNotificationsEnabled.value = prefs.getBoolean(pushNotifKey, true)
        _emailNotificationsEnabled.value = prefs.getBoolean(emailNotifKey, true)
        _salesAlertsEnabled.value = prefs.getBoolean(salesAlertsKey, true)
        _lowStockAlertsEnabled.value = prefs.getBoolean(lowStockAlertsKey, true)

        val themeOrdinal = prefs.getInt(themeKey, AppTheme.SYSTEM.ordinal)
        _selectedTheme.value = AppTheme.values()[themeOrdinal]

        val languageOrdinal = prefs.getInt(languageKey, AppLanguage.TURKISH.ordinal)
        _selectedLanguage.value = AppLanguage.values()[languageOrdinal]

        _biometricEnabled.value = prefs.getBoolean(biometricKey, false)
        _twoFactorEnabled.value = prefs.getBoolean(twoFactorKey, false)
    }

    // MARK: - Profile Management

    fun loadUserProfile() {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.getProfile()
            }.onSuccess { user ->
                _user.value = user
            }.onFailure { error ->
                println("Error loading profile: $error")
            }
        }
    }

    fun updateProfile(name: String, email: String, phone: String, companyName: String) {
        viewModelScope.launch {
            val request = UpdateProfileRequest(
                name = name,
                email = email,
                phone = phone,
                companyName = companyName
            )

            apiClient.safeApiCall {
                apiClient.service.updateProfile(request)
            }.onSuccess { user ->
                _user.value = user
            }.onFailure { error ->
                println("Error updating profile: $error")
            }
        }
    }

    // MARK: - Notification Settings

    fun updatePushNotifications(enabled: Boolean) {
        _pushNotificationsEnabled.value = enabled
        prefs.edit().putBoolean(pushNotifKey, enabled).apply()
        updateNotificationSettings()
    }

    fun updateEmailNotifications(enabled: Boolean) {
        _emailNotificationsEnabled.value = enabled
        prefs.edit().putBoolean(emailNotifKey, enabled).apply()
        updateNotificationSettings()
    }

    fun updateSalesAlerts(enabled: Boolean) {
        _salesAlertsEnabled.value = enabled
        prefs.edit().putBoolean(salesAlertsKey, enabled).apply()
        updateNotificationSettings()
    }

    fun updateLowStockAlerts(enabled: Boolean) {
        _lowStockAlertsEnabled.value = enabled
        prefs.edit().putBoolean(lowStockAlertsKey, enabled).apply()
        updateNotificationSettings()
    }

    private fun updateNotificationSettings() {
        viewModelScope.launch {
            val settings = NotificationSettings(
                pushEnabled = _pushNotificationsEnabled.value,
                emailEnabled = _emailNotificationsEnabled.value,
                salesAlerts = _salesAlertsEnabled.value,
                lowStockAlerts = _lowStockAlertsEnabled.value
            )

            apiClient.safeApiCall {
                apiClient.service.updateNotificationSettings(settings)
            }.onFailure { error ->
                println("Error updating notification settings: $error")
            }
        }
    }

    // MARK: - Appearance Settings

    fun updateTheme(theme: AppTheme) {
        _selectedTheme.value = theme
        prefs.edit().putInt(themeKey, theme.ordinal).apply()
        // Apply theme change
    }

    fun updateLanguage(language: AppLanguage) {
        _selectedLanguage.value = language
        prefs.edit().putInt(languageKey, language.ordinal).apply()
        // Apply language change
    }

    // MARK: - Security Settings

    fun updateBiometric(enabled: Boolean) {
        _biometricEnabled.value = enabled
        prefs.edit().putBoolean(biometricKey, enabled).apply()
        updateSecuritySettings()
    }

    fun updateTwoFactor(enabled: Boolean) {
        _twoFactorEnabled.value = enabled
        prefs.edit().putBoolean(twoFactorKey, enabled).apply()

        if (enabled) {
            enableTwoFactor()
        } else {
            disableTwoFactor()
        }
    }

    private fun updateSecuritySettings() {
        viewModelScope.launch {
            val settings = SecuritySettings(
                biometricEnabled = _biometricEnabled.value,
                twoFactorEnabled = _twoFactorEnabled.value
            )

            apiClient.safeApiCall {
                apiClient.service.updateSecuritySettings(settings)
            }.onFailure { error ->
                println("Error updating security settings: $error")
            }
        }
    }

    private fun enableTwoFactor() {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.enableTwoFactor()
            }.onSuccess { response ->
                println("Two-factor enabled: ${response.secret}")
            }.onFailure { error ->
                println("Error enabling two-factor: $error")
                _twoFactorEnabled.value = false
                prefs.edit().putBoolean(twoFactorKey, false).apply()
            }
        }
    }

    private fun disableTwoFactor() {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.disableTwoFactor()
            }.onFailure { error ->
                println("Error disabling two-factor: $error")
                _twoFactorEnabled.value = true
                prefs.edit().putBoolean(twoFactorKey, true).apply()
            }
        }
    }

    // MARK: - Account Actions

    fun logout() {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.logout()
            }.onSuccess {
                // Clear local data
                prefs.edit().clear().apply()
                context.getSharedPreferences("auth", Context.MODE_PRIVATE)
                    .edit().clear().apply()

                // Navigate to login (handled by navigation)
                // TODO: Trigger navigation event
            }.onFailure { error ->
                println("Error logging out: $error")
            }
        }
    }

    fun deleteAccount() {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.deleteAccount()
            }.onSuccess {
                // Clear all local data
                prefs.edit().clear().apply()
                context.getSharedPreferences("auth", Context.MODE_PRIVATE)
                    .edit().clear().apply()

                // Navigate to login (handled by navigation)
                // TODO: Trigger navigation event
            }.onFailure { error ->
                println("Error deleting account: $error")
            }
        }
    }

    fun rateApp() {
        try {
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("market://details?id=${context.packageName}")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            // Fallback to browser
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("https://play.google.com/store/apps/details?id=${context.packageName}")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(intent)
        }
    }
}

// MARK: - Request Models

data class UpdateProfileRequest(
    val name: String,
    val email: String,
    val phone: String,
    val companyName: String
)

data class NotificationSettings(
    val pushEnabled: Boolean,
    val emailEnabled: Boolean,
    val salesAlerts: Boolean,
    val lowStockAlerts: Boolean
)

data class SecuritySettings(
    val biometricEnabled: Boolean,
    val twoFactorEnabled: Boolean
)

// MARK: - Response Models

data class TwoFactorResponse(
    val secret: String,
    val qrCode: String
)

// MARK: - API Service Extensions

suspend fun tr.gov.ade.core.network.APIService.getProfile(): User {
    // Placeholder implementation
    return User(
        id = "1",
        name = "Kullanıcı",
        email = "user@example.com",
        phone = null,
        companyName = null,
        profileImageUrl = null
    )
}

suspend fun tr.gov.ade.core.network.APIService.updateProfile(request: UpdateProfileRequest): User {
    // Placeholder implementation
    return User(
        id = "1",
        name = request.name,
        email = request.email,
        phone = request.phone,
        companyName = request.companyName,
        profileImageUrl = null
    )
}

suspend fun tr.gov.ade.core.network.APIService.updateNotificationSettings(settings: NotificationSettings) {
    // Placeholder implementation
}

suspend fun tr.gov.ade.core.network.APIService.updateSecuritySettings(settings: SecuritySettings) {
    // Placeholder implementation
}

suspend fun tr.gov.ade.core.network.APIService.enableTwoFactor(): TwoFactorResponse {
    // Placeholder implementation
    return TwoFactorResponse(secret = "SECRET", qrCode = "QR_CODE")
}

suspend fun tr.gov.ade.core.network.APIService.disableTwoFactor() {
    // Placeholder implementation
}

suspend fun tr.gov.ade.core.network.APIService.logout() {
    // Placeholder implementation
}

suspend fun tr.gov.ade.core.network.APIService.deleteAccount() {
    // Placeholder implementation
}
