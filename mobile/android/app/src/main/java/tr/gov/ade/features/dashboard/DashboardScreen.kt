package tr.gov.ade.features.dashboard

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
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
import com.patrykandpatrick.vico.compose.axis.horizontal.bottomAxis
import com.patrykandpatrick.vico.compose.axis.vertical.startAxis
import com.patrykandpatrick.vico.compose.chart.Chart
import com.patrykandpatrick.vico.compose.chart.line.lineChart
import com.patrykandpatrick.vico.core.entry.entryModelOf
import tr.gov.ade.data.model.*
import java.text.NumberFormat
import java.util.*

/**
 * Dashboard Screen for ADE Android
 *
 * Main dashboard with:
 * - Revenue & Order statistics
 * - Real-time charts
 * - Quick actions
 * - Recent activities
 * - AI-powered insights
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    viewModel: DashboardViewModel = hiltViewModel(),
    onNavigate: (String) -> Unit
) {
    val stats by viewModel.stats.collectAsState()
    val revenueData by viewModel.revenueData.collectAsState()
    val recentOrders by viewModel.recentOrders.collectAsState()
    val aiSuggestions by viewModel.aiSuggestions.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()

    // Launch effect to load data
    LaunchedEffect(Unit) {
        viewModel.loadDashboard()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Gösterge Paneli") },
                actions = {
                    IconButton(onClick = { onNavigate("notifications") }) {
                        Icon(
                            imageVector = Icons.Default.Notifications,
                            contentDescription = "Bildirimler",
                            tint = Color(0xFFF97316)
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
                            Color(0xFFF97316).copy(alpha = 0.05f),
                            Color.Transparent
                        )
                    )
                )
                .padding(paddingValues)
        ) {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                // Header
                item {
                    HeaderSection(
                        userName = "Kullanıcı", // TODO: Get from auth state
                        userInitials = "ADE"
                    )
                }

                // Stats Cards
                item {
                    StatsSection(stats = stats)
                }

                // Revenue Chart
                item {
                    RevenueChartSection(
                        revenueData = revenueData,
                        onPeriodChange = { period ->
                            viewModel.changePeriod(period)
                        }
                    )
                }

                // Quick Actions
                item {
                    QuickActionsSection(onNavigate = onNavigate)
                }

                // Recent Orders
                item {
                    RecentOrdersSection(
                        orders = recentOrders,
                        onViewAll = { onNavigate("orders") }
                    )
                }

                // AI Suggestions
                if (aiSuggestions.isNotEmpty()) {
                    item {
                        AISuggestionsSection(suggestions = aiSuggestions)
                    }
                }
            }

            // Loading overlay
            AnimatedVisibility(
                visible = isLoading && stats == null,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color.Black.copy(alpha = 0.3f)),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Color(0xFFF97316))
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
}

// MARK: - Header Section

@Composable
fun HeaderSection(
    userName: String,
    userInitials: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Hoş geldiniz,",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = userName,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
            }

            // Avatar
            Box(
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                Color(0xFFF97316),
                                Color(0xFFFB923C)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = userInitials,
                    style = MaterialTheme.typography.titleMedium,
                    color = Color.White,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

// MARK: - Stats Section

@Composable
fun StatsSection(stats: DashboardStats?) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.height(360.dp)
    ) {
        item {
            StatCard(
                title = "Bugünkü Gelir",
                value = stats?.revenue?.today?.let { formatCurrency(it) } ?: "₺0",
                change = stats?.revenue?.growth?.daily ?: "+0%",
                icon = Icons.Default.AttachMoney,
                color = Color(0xFF10B981)
            )
        }

        item {
            StatCard(
                title = "Bugünkü Sipariş",
                value = "${stats?.orders?.today ?: 0}",
                change = stats?.revenue?.growth?.daily ?: "+0%",
                icon = Icons.Default.ShoppingCart,
                color = Color(0xFF3B82F6)
            )
        }

        item {
            StatCard(
                title = "Aylık Gelir",
                value = stats?.revenue?.thisMonth?.let { formatCurrency(it) } ?: "₺0",
                change = stats?.revenue?.growth?.monthly ?: "+0%",
                icon = Icons.Default.TrendingUp,
                color = Color(0xFFF97316)
            )
        }

        item {
            StatCard(
                title = "Toplam Müşteri",
                value = "${stats?.customers?.total ?: 0}",
                change = "+${stats?.customers?.newCustomers ?: 0} yeni",
                icon = Icons.Default.People,
                color = Color(0xFF8B5CF6)
            )
        }
    }
}

@Composable
fun StatCard(
    title: String,
    value: String,
    change: String,
    icon: ImageVector,
    color: Color
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = color,
                    modifier = Modifier.size(32.dp)
                )

                Surface(
                    color = if (change.startsWith("+")) Color(0xFF10B981).copy(alpha = 0.1f) else Color.Red.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = change,
                        style = MaterialTheme.typography.labelSmall,
                        color = if (change.startsWith("+")) Color(0xFF10B981) else Color.Red,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            Text(
                text = value,
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = title,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

// MARK: - Revenue Chart Section

@Composable
fun RevenueChartSection(
    revenueData: List<RevenueDataPoint>,
    onPeriodChange: (Int) -> Unit
) {
    var selectedPeriod by remember { mutableStateOf(0) }

    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Gelir Trendi",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                // Period selector (simplified)
                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    listOf("7G", "30G", "12A").forEachIndexed { index, label ->
                        FilterChip(
                            selected = selectedPeriod == index,
                            onClick = {
                                selectedPeriod = index
                                onPeriodChange(index)
                            },
                            label = { Text(label) }
                        )
                    }
                }
            }

            // Chart placeholder
            if (revenueData.isNotEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                        .background(
                            Color(0xFFF97316).copy(alpha = 0.1f),
                            RoundedCornerShape(12.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Chart will be rendered here")
                    // TODO: Implement Vico chart
                }
            } else {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
        }
    }
}

// MARK: - Quick Actions Section

@Composable
fun QuickActionsSection(onNavigate: (String) -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "Hızlı İşlemler",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            LazyVerticalGrid(
                columns = GridCells.Fixed(3),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.height(200.dp)
            ) {
                val actions = listOf(
                    QuickAction("Yeni Sipariş", Icons.Default.AddCircle, Color(0xFF10B981), "new_order"),
                    QuickAction("Entegrasyonlar", Icons.Default.Business, Color(0xFF3B82F6), "integrations"),
                    QuickAction("E-Fatura", Icons.Default.Description, Color(0xFFF97316), "invoices"),
                    QuickAction("Raporlar", Icons.Default.BarChart, Color(0xFF8B5CF6), "reports"),
                    QuickAction("AI Asistan", Icons.Default.AutoAwesome, Color(0xFFEC4899), "ai_assistant"),
                    QuickAction("Ayarlar", Icons.Default.Settings, Color.Gray, "settings")
                )

                items(actions) { action ->
                    QuickActionButton(
                        action = action,
                        onClick = { onNavigate(action.route) }
                    )
                }
            }
        }
    }
}

data class QuickAction(
    val title: String,
    val icon: ImageVector,
    val color: Color,
    val route: String
)

@Composable
fun QuickActionButton(
    action: QuickAction,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(
                imageVector = action.icon,
                contentDescription = null,
                tint = action.color,
                modifier = Modifier.size(28.dp)
            )

            Text(
                text = action.title,
                style = MaterialTheme.typography.labelSmall,
                maxLines = 2,
                modifier = Modifier.padding(horizontal = 4.dp)
            )
        }
    }
}

// MARK: - Recent Orders Section

@Composable
fun RecentOrdersSection(
    orders: List<Order>,
    onViewAll: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Son Siparişler",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                TextButton(onClick = onViewAll) {
                    Text("Tümünü Gör", color = Color(0xFFF97316))
                }
            }

            if (orders.isNotEmpty()) {
                orders.take(5).forEach { order ->
                    OrderRowView(order = order)
                }
            } else {
                Text(
                    text = "Henüz sipariş yok",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 32.dp),
                )
            }
        }
    }
}

@Composable
fun OrderRowView(order: Order) {
    // TODO: Implement full order row
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(order.orderNumber)
            Text(formatCurrency(order.amount))
        }
    }
}

// MARK: - AI Suggestions Section

@Composable
fun AISuggestionsSection(suggestions: List<AISuggestion>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.AutoAwesome,
                    contentDescription = null,
                    tint = Color(0xFFF97316)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "AI Önerileri",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
            }

            suggestions.take(3).forEach { suggestion ->
                AISuggestionCard(suggestion = suggestion)
            }
        }
    }
}

@Composable
fun AISuggestionCard(suggestion: AISuggestion) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp)
        ) {
            Text(suggestion.title)
        }
    }
}

// MARK: - Helper Models

data class RevenueDataPoint(
    val date: String,
    val revenue: Double
)

// MARK: - Helper Functions

fun formatCurrency(amount: java.math.BigDecimal): String {
    val formatter = NumberFormat.getCurrencyInstance(Locale("tr", "TR"))
    formatter.currency = Currency.getInstance("TRY")
    return formatter.format(amount)
}
