package tr.gov.ade.features.aiassistant

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import kotlinx.coroutines.launch

/**
 * AI Assistant Screen
 *
 * Features:
 * - Conversational AI chat interface
 * - Voice input (speech-to-text)
 * - Quick action buttons
 * - Smart business suggestions
 * - Message history
 * - Auto-scroll to latest message
 * - Typing indicator
 * - Error handling
 *
 * @author ADE Android Team
 * @since 2026-01-24
 */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AIAssistantScreen(
    viewModel: AIAssistantViewModel = hiltViewModel()
) {
    val messages by viewModel.messages.collectAsState()
    val isTyping by viewModel.isTyping.collectAsState()
    val isSending by viewModel.isSending.collectAsState()
    val isRecording by viewModel.isRecording.collectAsState()

    var messageText by remember { mutableStateOf("") }
    var showQuickActions by remember { mutableStateOf(true) }
    var showMenu by remember { mutableStateOf(false) }

    val listState = rememberLazyListState()
    val coroutineScope = rememberCoroutineScope()

    // Auto-scroll to bottom when new message arrives
    LaunchedEffect(messages.size, isTyping) {
        if (messages.isNotEmpty() || isTyping) {
            coroutineScope.launch {
                listState.animateScrollToItem(
                    index = if (isTyping) messages.size else messages.size - 1
                )
            }
        }
    }

    LaunchedEffect(Unit) {
        viewModel.loadChatHistory()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("AI Asistan") },
                actions = {
                    IconButton(onClick = { showMenu = true }) {
                        Icon(Icons.Default.MoreVert, "Menü")
                    }

                    DropdownMenu(
                        expanded = showMenu,
                        onDismissRequest = { showMenu = false }
                    ) {
                        DropdownMenuItem(
                            text = { Text("Geçmişi Temizle") },
                            onClick = {
                                showMenu = false
                                viewModel.clearHistory()
                            },
                            leadingIcon = { Icon(Icons.Default.Delete, null) }
                        )
                        DropdownMenuItem(
                            text = {
                                Text(if (showQuickActions) "Hızlı Eylemleri Gizle" else "Hızlı Eylemleri Göster")
                            },
                            onClick = {
                                showMenu = false
                                showQuickActions = !showQuickActions
                            },
                            leadingIcon = {
                                Icon(
                                    if (showQuickActions) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                                    null
                                )
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Sohbeti Dışa Aktar") },
                            onClick = {
                                showMenu = false
                                viewModel.exportChatHistory()
                            },
                            leadingIcon = { Icon(Icons.Default.Share, null) }
                        )
                    }
                }
            )
        },
        bottomBar = {
            InputArea(
                messageText = messageText,
                onMessageTextChange = { messageText = it },
                isRecording = isRecording,
                isSending = isSending,
                onSend = {
                    if (messageText.isNotBlank()) {
                        viewModel.sendMessage(messageText.trim())
                        messageText = ""
                        showQuickActions = false
                    }
                },
                onStartRecording = { viewModel.startVoiceRecording() },
                onStopRecording = {
                    viewModel.stopVoiceRecording { transcription ->
                        transcription?.let { messageText = it }
                    }
                },
                onClearText = { messageText = "" }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Messages List
            LazyColumn(
                state = listState,
                modifier = Modifier.weight(1f),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                if (messages.isEmpty() && !isTyping) {
                    item {
                        EmptyState()
                    }
                } else {
                    items(messages) { message ->
                        MessageBubble(message = message)
                    }

                    if (isTyping) {
                        item {
                            TypingIndicator()
                        }
                    }
                }
            }

            // Quick Actions
            AnimatedVisibility(
                visible = showQuickActions && messages.isEmpty(),
                enter = slideInVertically() + fadeIn(),
                exit = slideOutVertically() + fadeOut()
            ) {
                QuickActionsSection(
                    onActionClick = { message ->
                        viewModel.sendMessage(message)
                        showQuickActions = false
                    },
                    onDismiss = { showQuickActions = false }
                )
            }
        }
    }
}

// MARK: - Empty State

@Composable
private fun EmptyState() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 80.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        Icon(
            imageVector = Icons.Default.SmartToy,
            contentDescription = null,
            modifier = Modifier.size(80.dp),
            tint = MaterialTheme.colorScheme.primary
        )

        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = "AI Asistanınız Hazır",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = "İşletmeniz hakkında sorular sorun, analiz isteyin veya hızlı eylemlerden birini seçin",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 32.dp)
            )
        }
    }
}

// MARK: - Message Bubble

@Composable
private fun MessageBubble(message: ChatMessage) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (message.isUser) Arrangement.End else Arrangement.Start
    ) {
        if (!message.isUser) Spacer(modifier = Modifier.width(60.dp))

        Column(
            horizontalAlignment = if (message.isUser) Alignment.End else Alignment.Start,
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            // Message Content
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = if (message.isUser)
                    MaterialTheme.colorScheme.primary
                else
                    MaterialTheme.colorScheme.surfaceVariant
            ) {
                Text(
                    text = message.content,
                    style = MaterialTheme.typography.bodyMedium,
                    color = if (message.isUser)
                        MaterialTheme.colorScheme.onPrimary
                    else
                        MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(12.dp)
                )
            }

            // Timestamp & Status
            Row(
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(horizontal = 4.dp)
            ) {
                Text(
                    text = message.timestamp.toString(),
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                if (message.isUser) {
                    when {
                        message.isSending -> Icon(
                            Icons.Default.Schedule,
                            contentDescription = "Gönderiliyor",
                            modifier = Modifier.size(12.dp),
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        message.isError -> Icon(
                            Icons.Default.Error,
                            contentDescription = "Hata",
                            modifier = Modifier.size(12.dp),
                            tint = MaterialTheme.colorScheme.error
                        )
                        else -> Icon(
                            Icons.Default.Check,
                            contentDescription = "Gönderildi",
                            modifier = Modifier.size(12.dp),
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                }
            }
        }

        if (message.isUser) Spacer(modifier = Modifier.width(60.dp))
    }
}

// MARK: - Typing Indicator

@Composable
private fun TypingIndicator() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Start
    ) {
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.surfaceVariant
        ) {
            Row(
                modifier = Modifier.padding(12.dp),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                repeat(3) { index ->
                    var alpha by remember { mutableStateOf(0.3f) }

                    LaunchedEffect(Unit) {
                        kotlinx.coroutines.delay(index * 200L)
                        while (true) {
                            alpha = 1f
                            kotlinx.coroutines.delay(600)
                            alpha = 0.3f
                            kotlinx.coroutines.delay(600)
                        }
                    }

                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(
                                MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = alpha)
                            )
                    )
                }
            }
        }

        Spacer(modifier = Modifier.width(60.dp))
    }
}

// MARK: - Quick Actions

@Composable
private fun QuickActionsSection(
    onActionClick: (String) -> Unit,
    onDismiss: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surface)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Hızlı Eylemler",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            IconButton(onClick = onDismiss) {
                Icon(Icons.Default.ExpandMore, "Gizle")
            }
        }

        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                QuickActionButton(
                    icon = Icons.Default.TrendingUp,
                    title = "Bugünkü\nSatışlar",
                    color = Color(0xFF2196F3)
                ) {
                    onActionClick("Bugün kaç sipariş geldi ve toplam satış ne kadar?")
                }
            }

            item {
                QuickActionButton(
                    icon = Icons.Default.Star,
                    title = "En Çok\nSatanlar",
                    color = Color(0xFFFF9800)
                ) {
                    onActionClick("En çok satan ürünlerim hangileri?")
                }
            }

            item {
                QuickActionButton(
                    icon = Icons.Default.Warning,
                    title = "Düşük\nStok",
                    color = Color(0xFFF44336)
                ) {
                    onActionClick("Stokta azalan ürünler hangileri?")
                }
            }

            item {
                QuickActionButton(
                    icon = Icons.Default.AttachMoney,
                    title = "Gelir\nAnalizi",
                    color = Color(0xFF4CAF50)
                ) {
                    onActionClick("Bu ayki gelir durumumu analiz et")
                }
            }

            item {
                QuickActionButton(
                    icon = Icons.Default.People,
                    title = "Müşteri\nİstatistikleri",
                    color = Color(0xFF9C27B0)
                ) {
                    onActionClick("Müşteri istatistiklerimi göster")
                }
            }

            item {
                QuickActionButton(
                    icon = Icons.Default.AutoAwesome,
                    title = "Öneriler",
                    color = Color(0xFFE91E63)
                ) {
                    onActionClick("İşletmem için önerilerini paylaş")
                }
            }
        }
    }
}

@Composable
private fun QuickActionButton(
    icon: ImageVector,
    title: String,
    color: Color,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        modifier = Modifier.width(100.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = color.copy(alpha = 0.1f),
            contentColor = color
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .background(color.copy(alpha = 0.2f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = title,
                    modifier = Modifier.size(24.dp),
                    tint = color
                )
            }

            Text(
                text = title,
                style = MaterialTheme.typography.labelSmall,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}

// MARK: - Input Area

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun InputArea(
    messageText: String,
    onMessageTextChange: (String) -> Unit,
    isRecording: Boolean,
    isSending: Boolean,
    onSend: () -> Unit,
    onStartRecording: () -> Unit,
    onStopRecording: () -> Unit,
    onClearText: () -> Unit
) {
    Surface(
        tonalElevation = 3.dp
    ) {
        Column {
            HorizontalDivider()

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.Bottom
            ) {
                // Voice Input Button
                IconButton(
                    onClick = {
                        if (isRecording) onStopRecording() else onStartRecording()
                    },
                    enabled = !isSending
                ) {
                    Icon(
                        imageVector = if (isRecording) Icons.Default.Stop else Icons.Default.Mic,
                        contentDescription = if (isRecording) "Durdur" else "Sesli Giriş",
                        tint = if (isRecording) Color(0xFFF44336) else MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(32.dp)
                    )
                }

                // Text Input
                OutlinedTextField(
                    value = messageText,
                    onValueChange = onMessageTextChange,
                    modifier = Modifier.weight(1f),
                    placeholder = { Text("Mesajınızı yazın...") },
                    trailingIcon = {
                        if (messageText.isNotEmpty()) {
                            IconButton(onClick = onClearText) {
                                Icon(Icons.Default.Clear, "Temizle")
                            }
                        }
                    },
                    enabled = !isSending,
                    maxLines = 5,
                    shape = RoundedCornerShape(20.dp)
                )

                // Send Button
                IconButton(
                    onClick = onSend,
                    enabled = messageText.isNotBlank() && !isSending
                ) {
                    Icon(
                        imageVector = Icons.Default.Send,
                        contentDescription = "Gönder",
                        tint = if (messageText.isNotBlank())
                            MaterialTheme.colorScheme.primary
                        else
                            MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(32.dp)
                    )
                }
            }
        }
    }
}

// MARK: - Data Models

data class ChatMessage(
    val id: String = java.util.UUID.randomUUID().toString(),
    val content: String,
    val isUser: Boolean,
    val timestamp: Long = System.currentTimeMillis(),
    val isSending: Boolean = false,
    val isError: Boolean = false
)
