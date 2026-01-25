package tr.gov.ade.core.auth

import android.content.Context
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import tr.gov.ade.core.network.APIClient
import tr.gov.ade.core.security.EncryptedPrefsManager
import tr.gov.ade.data.model.*
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Authentication Manager for ADE Android
 *
 * Handles all authentication operations:
 * - Email/Phone login
 * - Biometric authentication (Fingerprint, Face)
 * - e-Devlet OAuth
 * - 2FA (TOTP)
 * - Session management
 * - Token refresh
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */
@Singleton
class AuthenticationManager @Inject constructor(
    @ApplicationContext private val context: Context,
    private val apiClient: APIClient,
    private val encryptedPrefs: EncryptedPrefsManager
) {
    // MARK: - State

    private val _isAuthenticated = MutableStateFlow(false)
    val isAuthenticated: StateFlow<Boolean> = _isAuthenticated.asStateFlow()

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    private val _biometricType = MutableStateFlow(BiometricType.NONE)
    val biometricType: StateFlow<BiometricType> = _biometricType.asStateFlow()

    private val _authError = MutableStateFlow<AuthError?>(null)
    val authError: StateFlow<AuthError?> = _authError.asStateFlow()

    // MARK: - Initialization

    init {
        checkBiometricAvailability()
        loadSavedSession()
    }

    // MARK: - Biometric Authentication

    fun checkBiometricAvailability() {
        val biometricManager = BiometricManager.from(context)

        _biometricType.value = when (biometricManager.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_STRONG
        )) {
            BiometricManager.BIOMETRIC_SUCCESS -> {
                // Check if device has Face or Fingerprint
                when {
                    hasFaceAuth() -> BiometricType.FACE
                    hasFingerprintAuth() -> BiometricType.FINGERPRINT
                    else -> BiometricType.NONE
                }
            }
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> BiometricType.NONE
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> BiometricType.NONE
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> BiometricType.NOT_ENROLLED
            else -> BiometricType.NONE
        }
    }

    fun authenticateWithBiometrics(
        activity: FragmentActivity,
        onSuccess: () -> Unit,
        onError: (AuthError) -> Unit
    ) {
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("ADE Girişi")
            .setSubtitle("Giriş yapmak için kimliğinizi doğrulayın")
            .setNegativeButtonText("İptal")
            .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
            .build()

        val biometricPrompt = BiometricPrompt(
            activity,
            ContextCompat.getMainExecutor(context),
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)
                    // Load saved credentials and authenticate
                    onSuccess()
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    super.onAuthenticationError(errorCode, errString)
                    onError(
                        when (errorCode) {
                            BiometricPrompt.ERROR_USER_CANCELED -> AuthError.UserCancelled
                            BiometricPrompt.ERROR_LOCKOUT -> AuthError.BiometricLockout
                            BiometricPrompt.ERROR_NO_BIOMETRICS -> AuthError.BiometricNotEnrolled
                            else -> AuthError.BiometricFailed(errString.toString())
                        }
                    )
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    onError(AuthError.BiometricFailed("Kimlik doğrulama başarısız"))
                }
            }
        )

        biometricPrompt.authenticate(promptInfo)
    }

    // MARK: - Email/Phone Authentication

    suspend fun login(email: String, password: String): Result<User> {
        return try {
            // Validate inputs
            if (!isValidEmail(email)) {
                return Result.failure(AuthError.InvalidEmail.toException())
            }

            if (password.length < 8) {
                return Result.failure(AuthError.WeakPassword.toException())
            }

            // API call
            val request = LoginRequest(email = email, password = password)
            val response = apiClient.login(request)

            // Save tokens
            encryptedPrefs.saveAccessToken(response.accessToken)
            encryptedPrefs.saveRefreshToken(response.refreshToken)

            // Update state
            _currentUser.value = response.user
            _isAuthenticated.value = true

            // Analytics
            // Analytics.track("login", mapOf("method" to "email"))

            Result.success(response.user)
        } catch (e: Exception) {
            Result.failure(AuthError.LoginFailed(e.message ?: "Unknown error").toException())
        }
    }

    suspend fun loginWithPhone(phone: String, otp: String): Result<User> {
        return try {
            if (!isValidPhone(phone)) {
                return Result.failure(AuthError.InvalidPhone.toException())
            }

            val request = PhoneLoginRequest(phone = phone, otp = otp)
            val response = apiClient.loginWithPhone(request)

            encryptedPrefs.saveAccessToken(response.accessToken)
            encryptedPrefs.saveRefreshToken(response.refreshToken)

            _currentUser.value = response.user
            _isAuthenticated.value = true

            Result.success(response.user)
        } catch (e: Exception) {
            Result.failure(AuthError.LoginFailed(e.message ?: "Unknown error").toException())
        }
    }

    // MARK: - e-Devlet Login

    suspend fun loginWithEDevlet(): Result<String> {
        return try {
            // Get OAuth URL from backend
            val authUrl = apiClient.getEDevletAuthUrl()
            Result.success(authUrl)
        } catch (e: Exception) {
            Result.failure(AuthError.EDevletLoginFailed.toException())
        }
    }

    suspend fun handleEDevletCallback(code: String): Result<User> {
        return try {
            val response = apiClient.exchangeEDevletCode(code)

            encryptedPrefs.saveAccessToken(response.accessToken)
            encryptedPrefs.saveRefreshToken(response.refreshToken)

            _currentUser.value = response.user
            _isAuthenticated.value = true

            Result.success(response.user)
        } catch (e: Exception) {
            Result.failure(AuthError.EDevletLoginFailed.toException())
        }
    }

    // MARK: - Registration

    suspend fun register(
        email: String,
        password: String,
        phone: String,
        tcKimlik: String
    ): Result<User> {
        return try {
            // Validate inputs
            if (!isValidEmail(email)) {
                return Result.failure(AuthError.InvalidEmail.toException())
            }

            if (!isValidPassword(password)) {
                return Result.failure(AuthError.WeakPassword.toException())
            }

            if (!isValidTCKimlik(tcKimlik)) {
                return Result.failure(AuthError.InvalidTCKimlik.toException())
            }

            val request = RegisterRequest(
                email = email,
                password = password,
                phone = phone,
                tcKimlik = tcKimlik
            )

            val response = apiClient.register(request)

            encryptedPrefs.saveAccessToken(response.accessToken)
            encryptedPrefs.saveRefreshToken(response.refreshToken)

            _currentUser.value = response.user
            _isAuthenticated.value = true

            Result.success(response.user)
        } catch (e: Exception) {
            Result.failure(AuthError.RegistrationFailed(e.message ?: "Unknown error").toException())
        }
    }

    // MARK: - Two-Factor Authentication

    suspend fun enable2FA(): Result<TwoFactorResponse> {
        return try {
            if (!_isAuthenticated.value) {
                return Result.failure(AuthError.NotAuthenticated.toException())
            }

            val response = apiClient.enable2FA()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(AuthError.TwoFactorSetupFailed.toException())
        }
    }

    suspend fun verify2FACode(code: String): Result<Boolean> {
        return try {
            val request = TwoFactorVerifyRequest(code = code)
            val response = apiClient.verify2FA(request)
            Result.success(response.isValid)
        } catch (e: Exception) {
            Result.failure(AuthError.Invalid2FACode.toException())
        }
    }

    // MARK: - Session Management

    suspend fun logout() {
        try {
            // Revoke tokens on backend
            apiClient.logout()
        } catch (e: Exception) {
            // Log error but continue logout
        }

        // Clear local data
        encryptedPrefs.clearAll()
        _currentUser.value = null
        _isAuthenticated.value = false

        // Analytics.track("logout")
    }

    suspend fun refreshToken(): Result<Unit> {
        return try {
            val refreshToken = encryptedPrefs.getRefreshToken()
                ?: return Result.failure(AuthError.NoRefreshToken.toException())

            val request = RefreshTokenRequest(refreshToken = refreshToken)
            val response = apiClient.refreshToken(request)

            encryptedPrefs.saveAccessToken(response.accessToken)
            encryptedPrefs.saveRefreshToken(response.refreshToken)

            Result.success(Unit)
        } catch (e: Exception) {
            // Refresh failed, logout user
            logout()
            Result.failure(AuthError.SessionExpired.toException())
        }
    }

    // MARK: - Private Methods

    private fun loadSavedSession() {
        val accessToken = encryptedPrefs.getAccessToken()

        if (!accessToken.isNullOrEmpty()) {
            // Validate token on backend (in coroutine)
            // For now, just set authenticated
            _isAuthenticated.value = true
        }
    }

    private fun hasFaceAuth(): Boolean {
        // Check if device has face authentication
        // This is device-specific, some Android devices have face unlock
        return false // Simplified for now
    }

    private fun hasFingerprintAuth(): Boolean {
        val biometricManager = BiometricManager.from(context)
        return biometricManager.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_STRONG
        ) == BiometricManager.BIOMETRIC_SUCCESS
    }

    // MARK: - Validation

    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    private fun isValidPhone(phone: String): Boolean {
        // Turkish phone: 10 digits starting with 5
        val phoneRegex = Regex("^5[0-9]{9}$")
        return phoneRegex.matches(phone)
    }

    private fun isValidPassword(password: String): Boolean {
        // Minimum 8 characters, at least one uppercase, lowercase, and number
        return password.length >= 8 &&
                password.any { it.isUpperCase() } &&
                password.any { it.isLowerCase() } &&
                password.any { it.isDigit() }
    }

    private fun isValidTCKimlik(tcKimlik: String): Boolean {
        // Turkish ID: 11 digits with checksum
        if (tcKimlik.length != 11 || tcKimlik[0] == '0') return false

        val digits = tcKimlik.map { it.digitToIntOrNull() ?: return false }

        // Simplified validation (full algorithm exists)
        return true
    }
}

// MARK: - Models

enum class BiometricType {
    NONE,
    FINGERPRINT,
    FACE,
    NOT_ENROLLED
}

sealed class AuthError : Exception() {
    object InvalidEmail : AuthError()
    object InvalidPhone : AuthError()
    object WeakPassword : AuthError()
    object InvalidTCKimlik : AuthError()
    data class LoginFailed(override val message: String) : AuthError()
    data class RegistrationFailed(override val message: String) : AuthError()
    object EDevletLoginFailed : AuthError()
    object BiometricNotAvailable : AuthError()
    object BiometricNotEnrolled : AuthError()
    data class BiometricFailed(override val message: String) : AuthError()
    object BiometricLockout : AuthError()
    object UserCancelled : AuthError()
    object NoSavedCredentials : AuthError()
    object NotAuthenticated : AuthError()
    object SessionExpired : AuthError()
    object NoRefreshToken : AuthError()
    object TwoFactorSetupFailed : AuthError()
    object Invalid2FACode : AuthError()

    fun toException(): Exception = this

    override val message: String
        get() = when (this) {
            InvalidEmail -> "Geçersiz e-posta adresi"
            InvalidPhone -> "Geçersiz telefon numarası"
            WeakPassword -> "Şifre en az 8 karakter olmalı ve büyük harf, küçük harf ve rakam içermelidir"
            InvalidTCKimlik -> "Geçersiz TC Kimlik numarası"
            is LoginFailed -> "Giriş başarısız: $message"
            is RegistrationFailed -> "Kayıt başarısız: $message"
            EDevletLoginFailed -> "e-Devlet girişi başarısız oldu"
            BiometricNotAvailable -> "Bu cihazda biyometrik kimlik doğrulama kullanılamıyor"
            BiometricNotEnrolled -> "Biyometrik kimlik doğrulama ayarlanmamış"
            is BiometricFailed -> "Biyometrik doğrulama başarısız: $message"
            BiometricLockout -> "Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin"
            UserCancelled -> "Kullanıcı tarafından iptal edildi"
            NoSavedCredentials -> "Kayıtlı kimlik bilgisi bulunamadı"
            NotAuthenticated -> "Oturum açmanız gerekiyor"
            SessionExpired -> "Oturumunuzun süresi doldu, lütfen tekrar giriş yapın"
            NoRefreshToken -> "Oturum yenileme belirteci bulunamadı"
            TwoFactorSetupFailed -> "İki faktörlü doğrulama kurulumu başarısız"
            Invalid2FACode -> "Geçersiz doğrulama kodu"
        }
}
