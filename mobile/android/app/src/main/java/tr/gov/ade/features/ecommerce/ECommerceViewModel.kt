package tr.gov.ade.features.ecommerce

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import tr.gov.ade.core.network.APIClient
import tr.gov.ade.data.model.*
import javax.inject.Inject

/**
 * E-Commerce ViewModel
 *
 * Manages state and business logic for e-commerce features
 *
 * @author ADE Android Team
 * @since 2026-01-24
 */

@HiltViewModel
class ECommerceViewModel @Inject constructor(
    private val apiClient: APIClient
) : ViewModel() {

    // MARK: - State Flows

    private val _products = MutableStateFlow<List<Product>>(emptyList())
    val products: StateFlow<List<Product>> = _products.asStateFlow()

    private val _orders = MutableStateFlow<List<Order>>(emptyList())
    val orders: StateFlow<List<Order>> = _orders.asStateFlow()

    private val _lowStockProducts = MutableStateFlow<List<Product>>(emptyList())
    val lowStockProducts: StateFlow<List<Product>> = _lowStockProducts.asStateFlow()

    private val _topProducts = MutableStateFlow<List<Product>>(emptyList())
    val topProducts: StateFlow<List<Product>> = _topProducts.asStateFlow()

    private val _platformStats = MutableStateFlow<List<PlatformStat>>(emptyList())
    val platformStats: StateFlow<List<PlatformStat>> = _platformStats.asStateFlow()

    private val _salesData = MutableStateFlow<List<SalesData>>(emptyList())
    val salesData: StateFlow<List<SalesData>> = _salesData.asStateFlow()

    private val _recentActivities = MutableStateFlow<List<Activity>>(emptyList())
    val recentActivities: StateFlow<List<Activity>> = _recentActivities.asStateFlow()

    private val _isLoadingProducts = MutableStateFlow(false)
    val isLoadingProducts: StateFlow<Boolean> = _isLoadingProducts.asStateFlow()

    private val _isLoadingOrders = MutableStateFlow(false)
    val isLoadingOrders: StateFlow<Boolean> = _isLoadingOrders.asStateFlow()

    private val _isSyncing = MutableStateFlow(false)
    val isSyncing: StateFlow<Boolean> = _isSyncing.asStateFlow()

    private val _selectedPeriod = MutableStateFlow("7d")
    val selectedPeriod: StateFlow<String> = _selectedPeriod.asStateFlow()

    private val _productStats = MutableStateFlow(ProductStats())
    val productStats: StateFlow<ProductStats> = _productStats.asStateFlow()

    private val _orderStats = MutableStateFlow(OrderStats())
    val orderStats: StateFlow<OrderStats> = _orderStats.asStateFlow()

    // MARK: - Data Loading

    fun loadInitialData() {
        viewModelScope.launch {
            launch { loadProducts() }
            launch { loadOrders() }
            launch { loadAnalytics() }
        }
    }

    private suspend fun loadProducts() {
        if (_isLoadingProducts.value) return
        _isLoadingProducts.value = true

        apiClient.safeApiCall {
            apiClient.service.getProducts(page = 1, limit = 100)
        }.onSuccess { response ->
            _products.value = response.data
            _productStats.value = ProductStats(
                totalProducts = response.total,
                inStockProducts = response.data.count { it.stock > 0 }
            )
            _lowStockProducts.value = response.data.filter { it.stock in 1..9 }
        }.onFailure { error ->
            println("Error loading products: $error")
        }

        _isLoadingProducts.value = false
    }

    private suspend fun loadOrders() {
        if (_isLoadingOrders.value) return
        _isLoadingOrders.value = true

        apiClient.safeApiCall {
            apiClient.service.getOrders(page = 1, limit = 100)
        }.onSuccess { response ->
            _orders.value = response.data
            updateOrderStats(response.data)
        }.onFailure { error ->
            println("Error loading orders: $error")
        }

        _isLoadingOrders.value = false
    }

    private suspend fun loadAnalytics() {
        viewModelScope.launch {
            // Load sales data
            launch {
                apiClient.safeApiCall {
                    apiClient.service.getSalesAnalytics(period = _selectedPeriod.value)
                }.onSuccess { response ->
                    _salesData.value = response.data
                }.onFailure { error ->
                    println("Error loading sales data: $error")
                }
            }

            // Load top products
            launch {
                apiClient.safeApiCall {
                    apiClient.service.getTopProducts(period = _selectedPeriod.value)
                }.onSuccess { response ->
                    _topProducts.value = response.data
                }.onFailure { error ->
                    println("Error loading top products: $error")
                }
            }

            // Load platform stats
            launch {
                apiClient.safeApiCall {
                    apiClient.service.getPlatformStats()
                }.onSuccess { response ->
                    _platformStats.value = response.data
                }.onFailure { error ->
                    println("Error loading platform stats: $error")
                }
            }

            // Load recent activities
            launch {
                apiClient.safeApiCall {
                    apiClient.service.getRecentActivities()
                }.onSuccess { response ->
                    _recentActivities.value = response.data
                }.onFailure { error ->
                    println("Error loading activities: $error")
                }
            }
        }
    }

    private fun updateOrderStats(orders: List<Order>) {
        _orderStats.value = OrderStats(
            pending = orders.count { it.status == OrderStatus.PENDING },
            processing = orders.count { it.status == OrderStatus.PROCESSING },
            delivered = orders.count { it.status == OrderStatus.DELIVERED }
        )
    }

    // MARK: - Refresh

    fun refreshProducts() {
        viewModelScope.launch {
            loadProducts()
        }
    }

    fun refreshOrders() {
        viewModelScope.launch {
            loadOrders()
        }
    }

    fun refreshAnalytics() {
        viewModelScope.launch {
            loadAnalytics()
        }
    }

    // MARK: - Product Operations

    fun createProduct(
        name: String,
        description: String,
        price: Double,
        stock: Int,
        category: String,
        sku: String
    ) {
        viewModelScope.launch {
            val request = CreateProductRequest(
                name = name,
                description = description,
                price = price,
                stock = stock,
                category = category,
                sku = sku
            )

            apiClient.safeApiCall {
                apiClient.service.createProduct(request)
            }.onSuccess { product ->
                _products.value = listOf(product) + _products.value
                _productStats.value = _productStats.value.copy(
                    totalProducts = _productStats.value.totalProducts + 1,
                    inStockProducts = if (product.stock > 0) _productStats.value.inStockProducts + 1 else _productStats.value.inStockProducts
                )

                addActivity(
                    title = "Yeni ürün eklendi",
                    description = name,
                    icon = "add_circle",
                    iconColor = androidx.compose.ui.graphics.Color(0xFF4CAF50)
                )
            }.onFailure { error ->
                println("Error creating product: $error")
            }
        }
    }

    fun updateProduct(id: String, updates: Map<String, Any>) {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.updateProduct(id, updates)
            }.onSuccess { product ->
                _products.value = _products.value.map {
                    if (it.id == id) product else it
                }

                addActivity(
                    title = "Ürün güncellendi",
                    description = product.name,
                    icon = "edit",
                    iconColor = androidx.compose.ui.graphics.Color(0xFF2196F3)
                )
            }.onFailure { error ->
                println("Error updating product: $error")
            }
        }
    }

    fun deleteProduct(id: String) {
        viewModelScope.launch {
            val product = _products.value.find { it.id == id }

            apiClient.safeApiCall {
                apiClient.service.deleteProduct(id)
            }.onSuccess {
                _products.value = _products.value.filter { it.id != id }
                _productStats.value = _productStats.value.copy(
                    totalProducts = _productStats.value.totalProducts - 1,
                    inStockProducts = if (product?.stock ?: 0 > 0) _productStats.value.inStockProducts - 1 else _productStats.value.inStockProducts
                )

                product?.let {
                    addActivity(
                        title = "Ürün silindi",
                        description = it.name,
                        icon = "delete",
                        iconColor = androidx.compose.ui.graphics.Color(0xFFF44336)
                    )
                }
            }.onFailure { error ->
                println("Error deleting product: $error")
            }
        }
    }

    fun updateProductStock(id: String, stock: Int) {
        viewModelScope.launch {
            val request = UpdateStockRequest(stock = stock)

            apiClient.safeApiCall {
                apiClient.service.updateProductStock(id, request)
            }.onSuccess { product ->
                _products.value = _products.value.map {
                    if (it.id == id) product else it
                }

                addActivity(
                    title = "Stok güncellendi",
                    description = "${product.name}: $stock adet",
                    icon = "inventory",
                    iconColor = androidx.compose.ui.graphics.Color(0xFF2196F3)
                )
            }.onFailure { error ->
                println("Error updating stock: $error")
            }
        }
    }

    // MARK: - Order Operations

    fun updateOrderStatus(id: String, status: OrderStatus, trackingNumber: String? = null) {
        viewModelScope.launch {
            val request = UpdateOrderStatusRequest(
                status = status.name,
                trackingNumber = trackingNumber
            )

            apiClient.safeApiCall {
                apiClient.service.updateOrderStatus(id, request)
            }.onSuccess { order ->
                _orders.value = _orders.value.map {
                    if (it.id == id) order else it
                }
                updateOrderStats(_orders.value)

                addActivity(
                    title = "Sipariş durumu güncellendi",
                    description = "${order.orderNumber}: ${status.displayName}",
                    icon = "check_circle",
                    iconColor = androidx.compose.ui.graphics.Color(0xFF4CAF50)
                )
            }.onFailure { error ->
                println("Error updating order status: $error")
            }
        }
    }

    fun cancelOrder(id: String, reason: String) {
        viewModelScope.launch {
            val request = CancelOrderRequest(reason = reason)

            apiClient.safeApiCall {
                apiClient.service.cancelOrder(id, request)
            }.onSuccess {
                _orders.value = _orders.value.map {
                    if (it.id == id) it.copy(status = OrderStatus.CANCELLED) else it
                }
                updateOrderStats(_orders.value)

                addActivity(
                    title = "Sipariş iptal edildi",
                    description = reason,
                    icon = "cancel",
                    iconColor = androidx.compose.ui.graphics.Color(0xFFF44336)
                )
            }.onFailure { error ->
                println("Error cancelling order: $error")
            }
        }
    }

    // MARK: - Platform Sync

    fun syncAllPlatforms() {
        viewModelScope.launch {
            if (_isSyncing.value) return@launch
            _isSyncing.value = true

            apiClient.safeApiCall {
                apiClient.service.syncAllPlatforms()
            }.onSuccess { response ->
                loadInitialData()

                addActivity(
                    title = "Platform senkronizasyonu tamamlandı",
                    description = "Tüm platformlar güncellendi",
                    icon = "sync",
                    iconColor = androidx.compose.ui.graphics.Color(0xFF2196F3)
                )
            }.onFailure { error ->
                println("Error syncing platforms: $error")
            }

            _isSyncing.value = false
        }
    }

    fun syncProduct(id: String) {
        viewModelScope.launch {
            apiClient.safeApiCall {
                apiClient.service.syncProduct(id)
            }.onSuccess {
                val product = _products.value.find { it.id == id }
                product?.let {
                    addActivity(
                        title = "Ürün senkronize edildi",
                        description = it.name,
                        icon = "sync",
                        iconColor = androidx.compose.ui.graphics.Color(0xFF2196F3)
                    )
                }
            }.onFailure { error ->
                println("Error syncing product: $error")
            }
        }
    }

    // MARK: - Filters

    fun applyFilters() {
        viewModelScope.launch {
            loadProducts()
        }
    }

    fun updatePeriod(period: String) {
        _selectedPeriod.value = period
        refreshAnalytics()
    }

    // MARK: - Activity Tracking

    private fun addActivity(
        title: String,
        description: String,
        icon: String,
        iconColor: androidx.compose.ui.graphics.Color
    ) {
        val activity = Activity(
            id = java.util.UUID.randomUUID().toString(),
            title = title,
            description = description,
            icon = icon,
            iconColor = iconColor,
            timestamp = System.currentTimeMillis()
        )

        _recentActivities.value = listOf(activity) + _recentActivities.value.take(49)
    }
}

// MARK: - Request Models

data class CreateProductRequest(
    val name: String,
    val description: String,
    val price: Double,
    val stock: Int,
    val category: String,
    val sku: String
)

data class UpdateStockRequest(
    val stock: Int
)

data class UpdateOrderStatusRequest(
    val status: String,
    val trackingNumber: String?
)

data class CancelOrderRequest(
    val reason: String
)

// MARK: - Stats Models

data class ProductStats(
    val totalProducts: Int = 0,
    val inStockProducts: Int = 0
)

data class OrderStats(
    val pending: Int = 0,
    val processing: Int = 0,
    val delivered: Int = 0
)

// MARK: - Extension for OrderStatus

val OrderStatus.displayName: String
    get() = when (this) {
        OrderStatus.PENDING -> "Bekliyor"
        OrderStatus.PROCESSING -> "Hazırlanıyor"
        OrderStatus.SHIPPED -> "Kargoda"
        OrderStatus.DELIVERED -> "Teslim Edildi"
        OrderStatus.CANCELLED -> "İptal Edildi"
        OrderStatus.REFUNDED -> "İade Edildi"
    }

val OrderStatus.color: androidx.compose.ui.graphics.Color
    get() = when (this) {
        OrderStatus.PENDING -> androidx.compose.ui.graphics.Color(0xFFFF9800)
        OrderStatus.PROCESSING -> androidx.compose.ui.graphics.Color(0xFF2196F3)
        OrderStatus.SHIPPED -> androidx.compose.ui.graphics.Color(0xFF9C27B0)
        OrderStatus.DELIVERED -> androidx.compose.ui.graphics.Color(0xFF4CAF50)
        OrderStatus.CANCELLED -> androidx.compose.ui.graphics.Color(0xFFF44336)
        OrderStatus.REFUNDED -> androidx.compose.ui.graphics.Color(0xFF757575)
    }
