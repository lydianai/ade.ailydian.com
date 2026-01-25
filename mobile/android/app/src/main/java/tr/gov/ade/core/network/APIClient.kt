package tr.gov.ade.core.network

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import okhttp3.*
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*
import tr.gov.ade.BuildConfig
import tr.gov.ade.core.security.EncryptedPrefsManager
import tr.gov.ade.data.model.*
import com.google.gson.GsonBuilder
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

/**
 * API Client for ADE Android
 *
 * Features:
 * - Retrofit + OkHttp
 * - Automatic token refresh
 * - Request/Response interceptors
 * - Certificate pinning
 * - Network connectivity monitoring
 * - Request retrying
 * - Logging & Analytics
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

// MARK: - API Configuration

enum class APIEnvironment(val baseUrl: String) {
    DEVELOPMENT("http://10.0.2.2:3000/api/v1"), // Android emulator localhost
    STAGING("https://staging-api.ade.gov.tr/api/v1"),
    PRODUCTION("https://api.ade.gov.tr/api/v1")
}

// MARK: - API Service Interface

interface APIService {
    // Authentication
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse

    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): LoginResponse

    @POST("auth/logout")
    suspend fun logout()

    @POST("auth/refresh")
    suspend fun refreshToken(@Body request: RefreshTokenRequest): RefreshTokenResponse

    @POST("auth/login/phone")
    suspend fun loginWithPhone(@Body request: PhoneLoginRequest): LoginResponse

    @GET("auth/edevlet/url")
    suspend fun getEDevletAuthUrl(): EDevletUrlResponse

    @POST("auth/edevlet/callback")
    suspend fun exchangeEDevletCode(@Query("code") code: String): LoginResponse

    // Two-Factor Authentication
    @POST("auth/2fa/enable")
    suspend fun enable2FA(): TwoFactorResponse

    @POST("auth/2fa/verify")
    suspend fun verify2FA(@Body request: TwoFactorVerifyRequest): TwoFactorVerifyResponse

    @POST("auth/2fa/disable")
    suspend fun disable2FA()

    // User Profile
    @GET("users/profile")
    suspend fun getProfile(): User

    @PUT("users/profile")
    suspend fun updateProfile(@Body request: UpdateProfileRequest): User

    @Multipart
    @POST("users/avatar")
    suspend fun uploadAvatar(@Part file: MultipartBody.Part): UploadResponse

    @POST("users/password")
    suspend fun changePassword(@Body request: ChangePasswordRequest)

    // E-Devlet Integrations
    @GET("integrations")
    suspend fun getIntegrations(): List<Integration>

    @GET("integrations/{id}")
    suspend fun getIntegrationDetail(@Path("id") id: String): IntegrationDetail

    @POST("integrations/{id}/connect")
    suspend fun connectIntegration(
        @Path("id") id: String,
        @Body request: ConnectIntegrationRequest
    ): IntegrationDetail

    @POST("integrations/{id}/disconnect")
    suspend fun disconnectIntegration(@Path("id") id: String)

    @GET("integrations/gib/data")
    suspend fun getGIBData(): GIBData

    @GET("integrations/sgk/data")
    suspend fun getSGKData(): SGKData

    @POST("integrations/mernis/sorgu")
    suspend fun getMernisSorgu(@Body request: MernisSorguRequest): MernisSorguResponse

    // E-Commerce
    @GET("ecommerce/stats")
    suspend fun getECommerceStats(): ECommerceStats

    @GET("ecommerce/orders")
    suspend fun getOrders(@QueryMap filters: Map<String, String>): PaginatedResponse<Order>

    @GET("ecommerce/orders/{id}")
    suspend fun getOrderDetail(@Path("id") id: String): Order

    @PUT("ecommerce/orders/{id}/status")
    suspend fun updateOrderStatus(
        @Path("id") id: String,
        @Body request: UpdateOrderStatusRequest
    ): Order

    @GET("ecommerce/products")
    suspend fun getProducts(@QueryMap filters: Map<String, String>): PaginatedResponse<Product>

    @POST("ecommerce/products")
    suspend fun createProduct(@Body request: CreateProductRequest): Product

    @PUT("ecommerce/products/{id}")
    suspend fun updateProduct(
        @Path("id") id: String,
        @Body request: UpdateProductRequest
    ): Product

    @DELETE("ecommerce/products/{id}")
    suspend fun deleteProduct(@Path("id") id: String)

    // Notifications
    @GET("notifications")
    suspend fun getNotifications(): List<Notification>

    @POST("notifications/{id}/read")
    suspend fun markNotificationRead(@Path("id") id: String)

    @POST("notifications/read-all")
    suspend fun markAllNotificationsRead()

    @DELETE("notifications/{id}")
    suspend fun deleteNotification(@Path("id") id: String)

    // Analytics
    @GET("analytics/dashboard")
    suspend fun getDashboardStats(): DashboardStats

    @GET("analytics/revenue")
    suspend fun getRevenueAnalytics(@QueryMap params: Map<String, String>): RevenueAnalytics

    @GET("analytics/customers")
    suspend fun getCustomerAnalytics(): CustomerAnalytics
}

// MARK: - API Client

@Singleton
class APIClient @Inject constructor(
    @ApplicationContext private val context: Context,
    private val encryptedPrefs: EncryptedPrefsManager
) {
    private val environment = if (BuildConfig.DEBUG) {
        APIEnvironment.DEVELOPMENT
    } else {
        APIEnvironment.PRODUCTION
    }

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<APIError?>(null)
    val error: StateFlow<APIError?> = _error.asStateFlow()

    // OkHttp Client
    private val okHttpClient: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .addInterceptor(authInterceptor)
            .addInterceptor(headerInterceptor)
            .addInterceptor(loggingInterceptor)
            .authenticator(tokenAuthenticator)
            .apply {
                if (!BuildConfig.DEBUG) {
                    // Certificate pinning for production
                    certificatePinner(
                        CertificatePinner.Builder()
                            .add("api.ade.gov.tr", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
                            .build()
                    )
                }
            }
            .build()
    }

    // Retrofit Service
    val service: APIService by lazy {
        Retrofit.Builder()
            .baseUrl(environment.baseUrl)
            .client(okHttpClient)
            .addConverterFactory(
                GsonConverterFactory.create(
                    GsonBuilder()
                        .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                        .create()
                )
            )
            .build()
            .create(APIService::class.java)
    }

    // MARK: - Interceptors

    private val authInterceptor = Interceptor { chain ->
        val request = chain.request()
        val accessToken = encryptedPrefs.getAccessToken()

        val newRequest = if (!accessToken.isNullOrEmpty()) {
            request.newBuilder()
                .header("Authorization", "Bearer $accessToken")
                .build()
        } else {
            request
        }

        chain.proceed(newRequest)
    }

    private val headerInterceptor = Interceptor { chain ->
        val request = chain.request()
        val newRequest = request.newBuilder()
            .header("Content-Type", "application/json")
            .header("Accept-Language", "tr-TR")
            .header("X-Platform", "Android")
            .header("X-App-Version", BuildConfig.VERSION_NAME)
            .build()

        chain.proceed(newRequest)
    }

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = if (BuildConfig.DEBUG) {
            HttpLoggingInterceptor.Level.BODY
        } else {
            HttpLoggingInterceptor.Level.NONE
        }
    }

    // MARK: - Token Authenticator

    private val tokenAuthenticator = Authenticator { _, response ->
        // If 401, try to refresh token
        if (response.code == 401) {
            val refreshToken = encryptedPrefs.getRefreshToken()

            if (!refreshToken.isNullOrEmpty()) {
                try {
                    // Refresh token synchronously
                    val refreshResponse = refreshTokenSync(refreshToken)

                    // Save new tokens
                    encryptedPrefs.saveAccessToken(refreshResponse.accessToken)
                    encryptedPrefs.saveRefreshToken(refreshResponse.refreshToken)

                    // Retry original request with new token
                    return@Authenticator response.request.newBuilder()
                        .header("Authorization", "Bearer ${refreshResponse.accessToken}")
                        .build()
                } catch (e: Exception) {
                    // Refresh failed, logout user
                    encryptedPrefs.clearAll()
                    return@Authenticator null
                }
            }
        }

        null
    }

    private fun refreshTokenSync(refreshToken: String): RefreshTokenResponse {
        val request = RefreshTokenRequest(refreshToken = refreshToken)

        val response = okHttpClient.newCall(
            Request.Builder()
                .url("${environment.baseUrl}/auth/refresh")
                .post(
                    RequestBody.create(
                        MediaType.parse("application/json"),
                        GsonBuilder().create().toJson(request)
                    )
                )
                .build()
        ).execute()

        if (response.isSuccessful) {
            return GsonBuilder().create().fromJson(
                response.body?.string(),
                RefreshTokenResponse::class.java
            )
        } else {
            throw Exception("Token refresh failed")
        }
    }

    // MARK: - Helper Methods

    suspend fun <T> safeApiCall(
        apiCall: suspend () -> T
    ): Result<T> {
        return try {
            _isLoading.value = true
            _error.value = null

            val result = apiCall()
            Result.success(result)

        } catch (e: Exception) {
            val error = when (e) {
                is retrofit2.HttpException -> {
                    when (e.code()) {
                        401 -> APIError.Unauthorized
                        403 -> APIError.Forbidden
                        404 -> APIError.NotFound
                        422 -> APIError.ValidationFailed(e.message())
                        429 -> APIError.RateLimited
                        in 500..599 -> APIError.ServerError(e.code())
                        else -> APIError.Unknown
                    }
                }
                is java.net.UnknownHostException -> APIError.NetworkError
                is java.net.SocketTimeoutException -> APIError.NetworkError
                else -> APIError.Unknown
            }

            _error.value = error
            Result.failure(error.toException())

        } finally {
            _isLoading.value = false
        }
    }

    // MARK: - File Upload

    suspend fun uploadFile(
        endpoint: String,
        file: MultipartBody.Part,
        parameters: Map<String, String> = emptyMap()
    ): Result<UploadResponse> {
        return safeApiCall {
            // Build request with parameters
            val requestBuilder = Request.Builder()
                .url("${environment.baseUrl}$endpoint")
                .post(
                    MultipartBody.Builder()
                        .setType(MultipartBody.FORM)
                        .apply {
                            parameters.forEach { (key, value) ->
                                addFormDataPart(key, value)
                            }
                        }
                        .addPart(file)
                        .build()
                )

            val accessToken = encryptedPrefs.getAccessToken()
            if (!accessToken.isNullOrEmpty()) {
                requestBuilder.header("Authorization", "Bearer $accessToken")
            }

            val response = okHttpClient.newCall(requestBuilder.build()).execute()

            if (response.isSuccessful) {
                GsonBuilder().create().fromJson(
                    response.body?.string(),
                    UploadResponse::class.java
                )
            } else {
                throw retrofit2.HttpException(
                    retrofit2.Response.error<Any>(
                        response.code,
                        ResponseBody.create(null, "")
                    )
                )
            }
        }
    }
}

// MARK: - Error Handling

sealed class APIError : Exception() {
    object InvalidURL : APIError()
    object InvalidResponse : APIError()
    object Unauthorized : APIError()
    object Forbidden : APIError()
    object NotFound : APIError()
    data class ValidationFailed(override val message: String) : APIError()
    object RateLimited : APIError()
    data class ServerError(val code: Int) : APIError()
    object NetworkError : APIError()
    object DecodingFailed : APIError()
    object Unknown : APIError()

    fun toException(): Exception = this

    override val message: String
        get() = when (this) {
            InvalidURL -> "Geçersiz URL"
            InvalidResponse -> "Geçersiz sunucu yanıtı"
            Unauthorized -> "Oturum süreniz doldu, lütfen tekrar giriş yapın"
            Forbidden -> "Bu işlem için yetkiniz yok"
            NotFound -> "İstenen kaynak bulunamadı"
            is ValidationFailed -> "Validasyon hatası: $message"
            RateLimited -> "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin"
            is ServerError -> "Sunucu hatası ($code)"
            NetworkError -> "İnternet bağlantınızı kontrol edin"
            DecodingFailed -> "Veri işleme hatası"
            Unknown -> "Bilinmeyen bir hata oluştu"
        }
}
