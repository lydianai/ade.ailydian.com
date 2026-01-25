package tr.gov.ade.features.ecommerce

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.AsyncImage
import tr.gov.ade.data.model.*

/**
 * E-Commerce Screen
 *
 * Features:
 * - Product listing with search & filters
 * - Order management with status tracking
 * - Product CRUD operations
 * - Multi-platform sync status
 * - Analytics dashboard
 * - Low stock alerts
 *
 * @author ADE Android Team
 * @since 2026-01-24
 */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ECommerceScreen(
    viewModel: ECommerceViewModel = hiltViewModel()
) {
    var selectedTab by remember { mutableStateOf(ECommerceTab.PRODUCTS) }
    var searchText by remember { mutableStateOf("") }
    var showAddProduct by remember { mutableStateOf(false) }
    var showFilters by remember { mutableStateOf(false) }
    var selectedProduct by remember { mutableStateOf<Product?>(null) }
    var selectedOrder by remember { mutableStateOf<Order?>(null) }

    val products by viewModel.products.collectAsState()
    val orders by viewModel.orders.collectAsState()
    val lowStockProducts by viewModel.lowStockProducts.collectAsState()
    val isSyncing by viewModel.isSyncing.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadInitialData()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("E-Ticaret") },
                actions = {
                    if (selectedTab == ECommerceTab.PRODUCTS) {
                        IconButton(onClick = { showFilters = true }) {
                            Icon(Icons.Default.FilterList, "Filtreler")
                        }
                        IconButton(onClick = { showAddProduct = true }) {
                            Icon(Icons.Default.Add, "Yeni Ürün")
                        }
                    } else if (selectedTab == ECommerceTab.ORDERS) {
                        IconButton(onClick = { showFilters = true }) {
                            Icon(Icons.Default.FilterList, "Filtreler")
                        }
                    }

                    IconButton(
                        onClick = { viewModel.syncAllPlatforms() },
                        enabled = !isSyncing
                    ) {
                        Icon(
                            Icons.Default.Sync,
                            "Senkronize Et",
                            modifier = Modifier.then(
                                if (isSyncing) Modifier else Modifier
                            )
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Tab Selector
            TabSelector(
                selectedTab = selectedTab,
                onTabSelected = { selectedTab = it }
            )

            // Search Bar
            SearchBar(
                searchText = searchText,
                onSearchTextChange = { searchText = it },
                placeholder = if (selectedTab == ECommerceTab.PRODUCTS) "Ürün ara..." else "Sipariş ara..."
            )

            // Content
            when (selectedTab) {
                ECommerceTab.PRODUCTS -> ProductsContent(
                    viewModel = viewModel,
                    searchText = searchText,
                    onProductClick = { selectedProduct = it }
                )
                ECommerceTab.ORDERS -> OrdersContent(
                    viewModel = viewModel,
                    searchText = searchText,
                    onOrderClick = { selectedOrder = it }
                )
                ECommerceTab.ANALYTICS -> AnalyticsContent(viewModel = viewModel)
            }
        }
    }

    // Sheets
    if (showAddProduct) {
        AddProductSheet(
            viewModel = viewModel,
            onDismiss = { showAddProduct = false }
        )
    }

    selectedProduct?.let { product ->
        ProductDetailSheet(
            product = product,
            viewModel = viewModel,
            onDismiss = { selectedProduct = null }
        )
    }

    selectedOrder?.let { order ->
        OrderDetailSheet(
            order = order,
            viewModel = viewModel,
            onDismiss = { selectedOrder = null }
        )
    }

    if (showFilters) {
        FiltersSheet(
            viewModel = viewModel,
            onDismiss = { showFilters = false }
        )
    }
}

// MARK: - Tab Selector

@Composable
private fun TabSelector(
    selectedTab: ECommerceTab,
    onTabSelected: (ECommerceTab) -> Unit
) {
    TabRow(
        selectedTabIndex = selectedTab.ordinal,
        containerColor = MaterialTheme.colorScheme.surface
    ) {
        ECommerceTab.values().forEach { tab ->
            Tab(
                selected = selectedTab == tab,
                onClick = { onTabSelected(tab) },
                text = { Text(tab.title) },
                icon = { Icon(tab.icon, tab.title) }
            )
        }
    }
}

// MARK: - Search Bar

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SearchBar(
    searchText: String,
    onSearchTextChange: (String) -> Unit,
    placeholder: String
) {
    OutlinedTextField(
        value = searchText,
        onValueChange = onSearchTextChange,
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        placeholder = { Text(placeholder) },
        leadingIcon = { Icon(Icons.Default.Search, "Ara") },
        trailingIcon = {
            if (searchText.isNotEmpty()) {
                IconButton(onClick = { onSearchTextChange("") }) {
                    Icon(Icons.Default.Clear, "Temizle")
                }
            }
        },
        singleLine = true,
        shape = RoundedCornerShape(12.dp)
    )
}

// MARK: - Products Content

@Composable
private fun ProductsContent(
    viewModel: ECommerceViewModel,
    searchText: String,
    onProductClick: (Product) -> Unit
) {
    val products by viewModel.products.collectAsState()
    val lowStockProducts by viewModel.lowStockProducts.collectAsState()
    val stats by viewModel.productStats.collectAsState()

    val filteredProducts = remember(products, searchText) {
        if (searchText.isEmpty()) products
        else products.filter { it.name.contains(searchText, ignoreCase = true) }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Stats Cards
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                StatCard(
                    modifier = Modifier.weight(1f),
                    title = "Toplam Ürün",
                    value = stats.totalProducts.toString(),
                    icon = Icons.Default.Inventory,
                    color = MaterialTheme.colorScheme.primary
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    title = "Stokta",
                    value = stats.inStockProducts.toString(),
                    icon = Icons.Default.CheckCircle,
                    color = Color(0xFF4CAF50)
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    title = "Düşük Stok",
                    value = lowStockProducts.size.toString(),
                    icon = Icons.Default.Warning,
                    color = Color(0xFFFF9800)
                )
            }
        }

        // Low Stock Alert
        if (lowStockProducts.isNotEmpty()) {
            item {
                LowStockAlert(
                    products = lowStockProducts,
                    onProductClick = onProductClick
                )
            }
        }

        // Products List
        items(filteredProducts) { product ->
            ProductCard(
                product = product,
                onClick = { onProductClick(product) },
                onEdit = { onProductClick(product) },
                onDelete = { viewModel.deleteProduct(product.id) }
            )
        }
    }
}

@Composable
private fun StatCard(
    modifier: Modifier = Modifier,
    title: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    color: Color
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = color.copy(alpha = 0.1f)
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = title,
                tint = color,
                modifier = Modifier.size(24.dp)
            )
            Text(
                text = value,
                style = MaterialTheme.typography.headlineMedium,
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

@Composable
private fun LowStockAlert(
    products: List<Product>,
    onProductClick: (Product) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color(0xFFFF9800).copy(alpha = 0.1f)
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(
                    Icons.Default.Warning,
                    "Uyarı",
                    tint = Color(0xFFFF9800)
                )
                Text(
                    text = "Düşük Stok Uyarısı",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(Modifier.weight(1f))
                Text(
                    text = "${products.size} ürün",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(products.take(5)) { product ->
                    LowStockProductCard(
                        product = product,
                        onClick = { onProductClick(product) }
                    )
                }
            }
        }
    }
}

@Composable
private fun LowStockProductCard(
    product: Product,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .width(120.dp)
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            AsyncImage(
                model = product.imageUrl,
                contentDescription = product.name,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp)
                    .clip(RoundedCornerShape(8.dp)),
                contentScale = ContentScale.Crop
            )
            Text(
                text = product.name,
                style = MaterialTheme.typography.bodySmall,
                fontWeight = FontWeight.Medium,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = "Stok: ${product.stock}",
                style = MaterialTheme.typography.labelSmall,
                color = Color(0xFFFF9800)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ProductCard(
    product: Product,
    onClick: () -> Unit,
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    var showMenu by remember { mutableStateOf(false) }

    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            AsyncImage(
                model = product.imageUrl,
                contentDescription = product.name,
                modifier = Modifier
                    .size(80.dp)
                    .clip(RoundedCornerShape(12.dp)),
                contentScale = ContentScale.Crop
            )

            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = product.name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = product.category,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Row(
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "₺${product.price}",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            Icons.Default.Inventory,
                            contentDescription = "Stok",
                            modifier = Modifier.size(16.dp),
                            tint = if (product.stock < 10) Color(0xFFFF9800) else MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = product.stock.toString(),
                            style = MaterialTheme.typography.bodySmall,
                            color = if (product.stock < 10) Color(0xFFFF9800) else MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }

            Box {
                IconButton(onClick = { showMenu = true }) {
                    Icon(Icons.Default.MoreVert, "Menü")
                }
                DropdownMenu(
                    expanded = showMenu,
                    onDismissRequest = { showMenu = false }
                ) {
                    DropdownMenuItem(
                        text = { Text("Düzenle") },
                        onClick = {
                            showMenu = false
                            onEdit()
                        },
                        leadingIcon = { Icon(Icons.Default.Edit, "Düzenle") }
                    )
                    DropdownMenuItem(
                        text = { Text("Sil") },
                        onClick = {
                            showMenu = false
                            onDelete()
                        },
                        leadingIcon = { Icon(Icons.Default.Delete, "Sil") }
                    )
                }
            }
        }
    }
}

// MARK: - Orders Content

@Composable
private fun OrdersContent(
    viewModel: ECommerceViewModel,
    searchText: String,
    onOrderClick: (Order) -> Unit
) {
    val orders by viewModel.orders.collectAsState()
    val orderStats by viewModel.orderStats.collectAsState()

    val filteredOrders = remember(orders, searchText) {
        if (searchText.isEmpty()) orders
        else orders.filter {
            it.orderNumber.contains(searchText, ignoreCase = true) ||
            it.customerName.contains(searchText, ignoreCase = true)
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Order Stats
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                StatCard(
                    modifier = Modifier.weight(1f),
                    title = "Bekleyen",
                    value = orderStats.pending.toString(),
                    icon = Icons.Default.Schedule,
                    color = Color(0xFFFF9800)
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    title = "Hazırlanıyor",
                    value = orderStats.processing.toString(),
                    icon = Icons.Default.LocalShipping,
                    color = MaterialTheme.colorScheme.primary
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    title = "Teslim Edildi",
                    value = orderStats.delivered.toString(),
                    icon = Icons.Default.CheckCircle,
                    color = Color(0xFF4CAF50)
                )
            }
        }

        // Orders List
        items(filteredOrders) { order ->
            OrderCard(
                order = order,
                onClick = { onOrderClick(order) }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun OrderCard(
    order: Order,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = order.orderNumber,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                AssistChip(
                    onClick = {},
                    label = { Text(order.status.displayName) },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = order.status.color.copy(alpha = 0.2f),
                        labelColor = order.status.color
                    )
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(
                        text = order.customerName,
                        style = MaterialTheme.typography.bodyMedium
                    )
                    Text(
                        text = order.platform,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Column(
                    horizontalAlignment = Alignment.End,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Text(
                        text = "₺${order.total}",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Text(
                        text = order.createdAt.toString(),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

// MARK: - Analytics Content

@Composable
private fun AnalyticsContent(
    viewModel: ECommerceViewModel
) {
    val salesData by viewModel.salesData.collectAsState()
    val topProducts by viewModel.topProducts.collectAsState()
    val platformStats by viewModel.platformStats.collectAsState()
    val recentActivities by viewModel.recentActivities.collectAsState()

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        // Sales Chart
        item {
            SalesChartCard(viewModel = viewModel, salesData = salesData)
        }

        // Top Products
        item {
            TopProductsCard(products = topProducts)
        }

        // Platform Performance
        item {
            PlatformPerformanceCard(stats = platformStats)
        }

        // Recent Activity
        item {
            RecentActivityCard(activities = recentActivities)
        }
    }
}

@Composable
private fun SalesChartCard(
    viewModel: ECommerceViewModel,
    salesData: List<SalesData>
) {
    var selectedPeriod by remember { mutableStateOf("7d") }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Satış Trendi",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                // Period selector
                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    listOf("7d", "30d", "12m").forEach { period ->
                        FilterChip(
                            selected = selectedPeriod == period,
                            onClick = {
                                selectedPeriod = period
                                viewModel.updatePeriod(period)
                            },
                            label = { Text(period) }
                        )
                    }
                }
            }

            // Placeholder for chart
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .background(
                        MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f),
                        RoundedCornerShape(8.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "Satış Grafiği",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun TopProductsCard(products: List<Product>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "En Çok Satan Ürünler",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            products.take(5).forEach { product ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    AsyncImage(
                        model = product.imageUrl,
                        contentDescription = product.name,
                        modifier = Modifier
                            .size(50.dp)
                            .clip(RoundedCornerShape(8.dp)),
                        contentScale = ContentScale.Crop
                    )

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = product.name,
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Medium
                        )
                        Text(
                            text = "${product.soldCount} satış",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    Text(
                        text = "₺${product.totalRevenue}",
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                }
                if (product != products.take(5).last()) {
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun PlatformPerformanceCard(stats: List<PlatformStat>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "Platform Performansı",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            stats.forEach { platform ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Store,
                        contentDescription = platform.name,
                        modifier = Modifier.size(40.dp),
                        tint = platform.color
                    )

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = platform.name,
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Medium
                        )
                        Text(
                            text = "${platform.orderCount} sipariş",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = "₺${platform.revenue}",
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "%${platform.growthRate}",
                            style = MaterialTheme.typography.bodySmall,
                            color = if (platform.growthRate >= 0) Color(0xFF4CAF50) else Color(0xFFF44336)
                        )
                    }
                }
                if (platform != stats.last()) {
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun RecentActivityCard(activities: List<Activity>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "Son Aktiviteler",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            activities.take(10).forEach { activity ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .background(
                                activity.iconColor.copy(alpha = 0.1f),
                                CircleShape
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Info,
                            contentDescription = null,
                            tint = activity.iconColor,
                            modifier = Modifier.size(16.dp)
                        )
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = activity.title,
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Medium
                        )
                        Text(
                            text = activity.description,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    Text(
                        text = activity.timestamp.toString(),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                if (activity != activities.take(10).last()) {
                    HorizontalDivider()
                }
            }
        }
    }
}

// MARK: - Sheets (Simplified placeholders)

@Composable
private fun AddProductSheet(
    viewModel: ECommerceViewModel,
    onDismiss: () -> Unit
) {
    // Simplified placeholder
}

@Composable
private fun ProductDetailSheet(
    product: Product,
    viewModel: ECommerceViewModel,
    onDismiss: () -> Unit
) {
    // Simplified placeholder
}

@Composable
private fun OrderDetailSheet(
    order: Order,
    viewModel: ECommerceViewModel,
    onDismiss: () -> Unit
) {
    // Simplified placeholder
}

@Composable
private fun FiltersSheet(
    viewModel: ECommerceViewModel,
    onDismiss: () -> Unit
) {
    // Simplified placeholder
}

// MARK: - Supporting Types

enum class ECommerceTab(val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    PRODUCTS("Ürünler", Icons.Default.Inventory),
    ORDERS("Siparişler", Icons.Default.LocalShipping),
    ANALYTICS("Analitik", Icons.Default.BarChart)
}
