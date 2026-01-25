package tr.gov.ade.features.integrations

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import tr.gov.ade.data.model.*

/**
 * Integrations Screen for ADE Android
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IntegrationsScreen(
    viewModel: IntegrationsViewModel = hiltViewModel(),
    onNavigate: (String) -> Unit
) {
    val integrations by viewModel.integrations.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()

    var selectedCategory by remember { mutableStateOf(IntegrationCategory.E_DEVLET) }
    var showConnectDialog by remember { mutableStateOf(false) }
    var selectedIntegration by remember { mutableStateOf<Integration?>(null) }

    LaunchedEffect(Unit) {
        viewModel.loadIntegrations()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Entegrasyonlar") },
                actions = {
                    IconButton(onClick = { viewModel.syncAll() }) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Senkronize Et",
                            tint = Color(0xFF3B82F6)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.Transparent
                )
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF3B82F6).copy(alpha = 0.05f),
                            Color.Transparent
                        )
                    )
                )
                .padding(paddingValues)
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                // Category tabs
                CategoryTabsRow(
                    selectedCategory = selectedCategory,
                    integrations = integrations,
                    onCategorySelect = { selectedCategory = it }
                )

                // Integrations list
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    val filteredIntegrations = integrations.filter { it.category == selectedCategory }

                    items(filteredIntegrations) { integration ->
                        IntegrationCard(
                            integration = integration,
                            onClick = {
                                selectedIntegration = integration
                                if (integration.isConnected) {
                                    // Navigate to detail
                                    onNavigate("integration/${integration.id}")
                                } else {
                                    showConnectDialog = true
                                }
                            },
                            onToggle = {
                                if (integration.isConnected) {
                                    viewModel.disconnect(integration)
                                } else {
                                    selectedIntegration = integration
                                    showConnectDialog = true
                                }
                            }
                        )
                    }
                }
            }

            // Loading overlay
            AnimatedVisibility(
                visible = isLoading && integrations.isEmpty(),
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color.Black.copy(alpha = 0.3f)),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Color(0xFF3B82F6))
                }
            }

            // Error snackbar
            error?.let { errorMsg ->
                Snackbar(
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(16.dp)
                ) {
                    Text(errorMsg)
                }
            }
        }
    }

    // Connect dialog
    if (showConnectDialog && selectedIntegration != null) {
        ConnectIntegrationDialog(
            integration = selectedIntegration!!,
            onConnect = { credentials ->
                viewModel.connect(selectedIntegration!!, credentials)
                showConnectDialog = false
            },
            onDismiss = {
                showConnectDialog = false
            }
        )
    }
}

// MARK: - Category Tabs Row

@Composable
fun CategoryTabsRow(
    selectedCategory: IntegrationCategory,
    integrations: List<Integration>,
    onCategorySelect: (IntegrationCategory) -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
    ) {
        LazyRow(
            modifier = Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            val categories = listOf(
                IntegrationCategory.E_DEVLET,
                IntegrationCategory.E_COMMERCE,
                IntegrationCategory.ACCOUNTING,
                IntegrationCategory.LOGISTICS,
                IntegrationCategory.PAYMENT
            )

            items(categories) { category ->
                CategoryTab(
                    category = category,
                    isSelected = selectedCategory == category,
                    count = integrations.count { it.category == category },
                    onClick = { onCategorySelect(category) }
                )
            }
        }
    }
}

@Composable
fun CategoryTab(
    category: IntegrationCategory,
    isSelected: Boolean,
    count: Int,
    onClick: () -> Void
) {
    val (title, icon) = when (category) {
        IntegrationCategory.E_DEVLET -> "e-Devlet" to Icons.Default.AccountBalance
        IntegrationCategory.E_COMMERCE -> "E-Ticaret" to Icons.Default.ShoppingCart
        IntegrationCategory.ACCOUNTING -> "Muhasebe" to Icons.Default.Description
        IntegrationCategory.LOGISTICS -> "Kargo" to Icons.Default.LocalShipping
        IntegrationCategory.PAYMENT -> "Ödeme" to Icons.Default.Payment
        IntegrationCategory.MARKETING -> "Pazarlama" to Icons.Default.Campaign
    }

    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(20.dp),
        color = if (isSelected) {
            Color(0xFF3B82F6)
        } else {
            Color.Transparent
        },
        border = if (!isSelected) {
            androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
        } else null
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.size(18.dp)
            )

            Text(
                text = title,
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.SemiBold,
                color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface
            )

            if (count > 0) {
                Surface(
                    shape = CircleShape,
                    color = if (isSelected) {
                        Color.White.copy(alpha = 0.3f)
                    } else {
                        MaterialTheme.colorScheme.secondaryContainer
                    }
                ) {
                    Text(
                        text = count.toString(),
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.Bold,
                        color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }
            }
        }
    }
}

// MARK: - Integration Card

@Composable
fun IntegrationCard(
    integration: Integration,
    onClick: () -> Unit,
    onToggle: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(16.dp),
        border = if (integration.isConnected) {
            androidx.compose.foundation.BorderStroke(2.dp, Color(0xFF10B981).copy(alpha = 0.5f))
        } else null
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Icon
            Box(
                modifier = Modifier
                    .size(56.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                parseColor(integration.color),
                                parseColor(integration.color).copy(alpha = 0.7f)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getIconForIntegration(integration.icon),
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(28.dp)
                )
            }

            // Info
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = integration.name,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )

                    if (integration.isOfficial) {
                        Icon(
                            imageVector = Icons.Default.Verified,
                            contentDescription = "Resmi",
                            tint = Color(0xFF3B82F6),
                            modifier = Modifier.size(16.dp)
                        )
                    }

                    if (integration.isPremium) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(0xFFF59E0B)
                        ) {
                            Text(
                                text = "PRO",
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }
                }

                Text(
                    text = integration.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2
                )

                // Status
                Row(
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    if (integration.isConnected) {
                        Box(
                            modifier = Modifier
                                .size(6.dp)
                                .clip(CircleShape)
                                .background(Color(0xFF10B981))
                        )
                        Text(
                            text = "Bağlı",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color(0xFF10B981)
                        )
                        integration.connectedAt?.let { date ->
                            Text(
                                text = "• ${formatRelativeTime(date)}",
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    } else {
                        Text(
                            text = "Bağlı değil",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }

            // Toggle switch
            Switch(
                checked = integration.isConnected,
                onCheckedChange = { onToggle() }
            )
        }
    }
}

// MARK: - Connect Dialog

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ConnectIntegrationDialog(
    integration: Integration,
    onConnect: (Map<String, String>) -> Unit,
    onDismiss: () -> Unit
) {
    var credentials by remember { mutableStateOf<Map<String, String>>(emptyMap()) }

    AlertDialog(
        onDismissRequest = onDismiss,
        icon = {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                parseColor(integration.color),
                                parseColor(integration.color).copy(alpha = 0.7f)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getIconForIntegration(integration.icon),
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(36.dp)
                )
            }
        },
        title = {
            Text(
                text = integration.name,
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = integration.description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                // Credential inputs
                integration.requiredCredentials.forEach { field ->
                    OutlinedTextField(
                        value = credentials[field] ?: "",
                        onValueChange = { value ->
                            credentials = credentials + (field to value)
                        },
                        label = { Text(formatFieldLabel(field)) },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                }

                // Features
                Text(
                    text = "Özellikler:",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold
                )

                integration.features.take(3).forEach { feature ->
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.CheckCircle,
                            contentDescription = null,
                            tint = Color(0xFF10B981),
                            modifier = Modifier.size(18.dp)
                        )
                        Text(
                            text = feature,
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = { onConnect(credentials) },
                enabled = integration.requiredCredentials.all { credentials[it]?.isNotBlank() == true }
            ) {
                Text("Bağlan")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("İptal")
            }
        }
    )
}

// MARK: - Helper Functions

fun parseColor(hex: String): Color {
    return try {
        Color(android.graphics.Color.parseColor(if (hex.startsWith("#")) hex else "#$hex"))
    } catch (e: Exception) {
        Color.Gray
    }
}

fun getIconForIntegration(iconName: String): ImageVector {
    return when (iconName.lowercase()) {
        "building.columns.fill", "building" -> Icons.Default.AccountBalance
        "cart.fill", "cart" -> Icons.Default.ShoppingCart
        "doc.text.fill", "document" -> Icons.Default.Description
        "shippingbox.fill", "shipping" -> Icons.Default.LocalShipping
        "creditcard.fill", "payment" -> Icons.Default.Payment
        else -> Icons.Default.Apps
    }
}

fun formatFieldLabel(field: String): String {
    return field.replace("_", " ").split(" ").joinToString(" ") { it.capitalize() }
}

fun formatRelativeTime(date: java.util.Date): String {
    val now = System.currentTimeMillis()
    val diff = now - date.time
    val seconds = diff / 1000
    val minutes = seconds / 60
    val hours = minutes / 60
    val days = hours / 24

    return when {
        days > 0 -> "$days gün önce"
        hours > 0 -> "$hours saat önce"
        minutes > 0 -> "$minutes dakika önce"
        else -> "Az önce"
    }
}
