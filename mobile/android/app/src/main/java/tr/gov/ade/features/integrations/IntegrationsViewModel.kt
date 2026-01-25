package tr.gov.ade.features.integrations

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
 * Integrations ViewModel for ADE Android
 *
 * Handles integration data fetching, connection, and sync
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

@HiltViewModel
class IntegrationsViewModel @Inject constructor(
    private val apiClient: APIClient
) : ViewModel() {

    // MARK: - State

    private val _integrations = MutableStateFlow<List<Integration>>(emptyList())
    val integrations: StateFlow<List<Integration>> = _integrations.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    // MARK: - Data Loading

    fun loadIntegrations() {
        viewModelScope.launch {
            _isLoading.value = true

            apiClient.safeApiCall {
                apiClient.service.getIntegrations()
            }.onSuccess { response ->
                _integrations.value = response
            }.onFailure { error ->
                _error.value = error.message
            }

            _isLoading.value = false
        }
    }

    // MARK: - Actions

    fun connect(integration: Integration, credentials: Map<String, String>) {
        viewModelScope.launch {
            _isLoading.value = true

            val request = ConnectIntegrationRequest(
                credentials = credentials,
                settings = null
            )

            apiClient.safeApiCall {
                apiClient.service.connectIntegration(integration.id, request)
            }.onSuccess { response ->
                // Update local integration
                val updatedList = _integrations.value.map {
                    if (it.id == integration.id) response.integration else it
                }
                _integrations.value = updatedList

                println("✅ Connected to ${integration.name}")
            }.onFailure { error ->
                _error.value = error.message
            }

            _isLoading.value = false
        }
    }

    fun disconnect(integration: Integration) {
        viewModelScope.launch {
            _isLoading.value = true

            apiClient.safeApiCall {
                apiClient.service.disconnectIntegration(integration.id)
            }.onSuccess {
                // Update local integration
                val updatedList = _integrations.value.map {
                    if (it.id == integration.id) {
                        it.copy(isConnected = false, connectedAt = null)
                    } else {
                        it
                    }
                }
                _integrations.value = updatedList

                println("❌ Disconnected from ${integration.name}")
            }.onFailure { error ->
                _error.value = error.message
            }

            _isLoading.value = false
        }
    }

    fun syncAll() {
        viewModelScope.launch {
            _isLoading.value = true

            // Sync all connected integrations
            _integrations.value.filter { it.isConnected }.forEach { integration ->
                sync(integration)
            }

            _isLoading.value = false
        }
    }

    private suspend fun sync(integration: Integration) {
        apiClient.safeApiCall {
            apiClient.service.getIntegrationDetail(integration.id)
        }.onSuccess {
            println("🔄 Synced ${integration.name}")
        }.onFailure { error ->
            println("⚠️ Failed to sync ${integration.name}: ${error.message}")
        }
    }

    fun clearError() {
        _error.value = null
    }
}
