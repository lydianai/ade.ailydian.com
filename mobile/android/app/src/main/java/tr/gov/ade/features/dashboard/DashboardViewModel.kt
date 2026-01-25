package tr.gov.ade.features.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import tr.gov.ade.core.network.APIClient
import tr.gov.ade.data.model.*
import javax.inject.Inject

/**
 * Dashboard ViewModel for ADE Android
 *
 * Handles dashboard data fetching and state management
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val apiClient: APIClient
) : ViewModel() {

    // MARK: - State

    private val _stats = MutableStateFlow<DashboardStats?>(null)
    val stats: StateFlow<DashboardStats?> = _stats.asStateFlow()

    private val _revenueData = MutableStateFlow<List<RevenueDataPoint>>(emptyList())
    val revenueData: StateFlow<List<RevenueDataPoint>> = _revenueData.asStateFlow()

    private val _recentOrders = MutableStateFlow<List<Order>>(emptyList())
    val recentOrders: StateFlow<List<Order>> = _recentOrders.asStateFlow()

    private val _aiSuggestions = MutableStateFlow<List<AISuggestion>>(emptyList())
    val aiSuggestions: StateFlow<List<AISuggestion>> = _aiSuggestions.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    private val _selectedPeriod = MutableStateFlow(0)
    val selectedPeriod: StateFlow<Int> = _selectedPeriod.asStateFlow()

    // MARK: - Data Loading

    fun loadDashboard() {
        viewModelScope.launch {
            _isLoading.value = true

            try {
                // Load all data in parallel
                launch { loadStats() }
                launch { loadRecentOrders() }
                launch { loadRevenueChart() }
                launch { loadAISuggestions() }

            } catch (e: Exception) {
                _error.value = e.message ?: "Bilinmeyen bir hata oluştu"
            } finally {
                _isLoading.value = false
            }
        }
    }

    private suspend fun loadStats() {
        apiClient.safeApiCall {
            apiClient.service.getDashboardStats()
        }.onSuccess { response ->
            _stats.value = response
        }.onFailure { error ->
            _error.value = error.message
        }
    }

    private suspend fun loadRecentOrders() {
        apiClient.safeApiCall {
            apiClient.service.getECommerceStats()
        }.onSuccess { response ->
            _recentOrders.value = response.recentOrders
        }.onFailure { error ->
            _error.value = error.message
        }
    }

    private suspend fun loadRevenueChart() {
        val period = when (_selectedPeriod.value) {
            0 -> "7d"
            1 -> "30d"
            2 -> "12m"
            else -> "7d"
        }

        apiClient.safeApiCall {
            apiClient.service.getRevenueAnalytics(mapOf("period" to period))
        }.onSuccess { response ->
            _revenueData.value = response.byDate.map { dateRevenue ->
                RevenueDataPoint(
                    date = dateRevenue.date,
                    revenue = dateRevenue.revenue.toDouble()
                )
            }
        }.onFailure { error ->
            _error.value = error.message
        }
    }

    private suspend fun loadAISuggestions() {
        apiClient.safeApiCall {
            apiClient.service.getECommerceStats()
        }.onSuccess { response ->
            _aiSuggestions.value = response.aiSuggestions
        }.onFailure { error ->
            _error.value = error.message
        }
    }

    // MARK: - Actions

    fun changePeriod(period: Int) {
        _selectedPeriod.value = period
        viewModelScope.launch {
            loadRevenueChart()
        }
    }

    fun refresh() {
        loadDashboard()
    }

    fun clearError() {
        _error.value = null
    }
}
