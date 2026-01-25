package tr.gov.ade.features.aiassistant

import android.content.Context
import android.content.Intent
import android.speech.RecognizerIntent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import tr.gov.ade.core.network.APIClient
import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Inject

/**
 * AI Assistant ViewModel
 *
 * Manages AI chat functionality:
 * - Message sending/receiving
 * - Voice recording (Speech-to-Text)
 * - Chat history persistence
 * - API communication
 *
 * @author ADE Android Team
 * @since 2026-01-24
 */

@HiltViewModel
class AIAssistantViewModel @Inject constructor(
    @ApplicationContext private val context: Context,
    private val apiClient: APIClient
) : ViewModel() {

    // MARK: - State Flows

    private val _messages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isTyping = MutableStateFlow(false)
    val isTyping: StateFlow<Boolean> = _isTyping.asStateFlow()

    private val _isSending = MutableStateFlow(false)
    val isSending: StateFlow<Boolean> = _isSending.asStateFlow()

    private val _isRecording = MutableStateFlow(false)
    val isRecording: StateFlow<Boolean> = _isRecording.asStateFlow()

    // MARK: - Persistence

    private val prefsKey = "chat_messages_history"
    private val prefs = context.getSharedPreferences("ai_assistant", Context.MODE_PRIVATE)
    private val gson = Gson()

    // MARK: - Chat History

    fun loadChatHistory() {
        viewModelScope.launch {
            val json = prefs.getString(prefsKey, null)
            if (json != null) {
                try {
                    val type = object : com.google.gson.reflect.TypeToken<List<ChatMessage>>() {}.type
                    val savedMessages: List<ChatMessage> = gson.fromJson(json, type)
                    _messages.value = savedMessages
                } catch (e: Exception) {
                    println("Error loading chat history: $e")
                }
            }
        }
    }

    private fun saveChatHistory() {
        viewModelScope.launch {
            try {
                val json = gson.toJson(_messages.value)
                prefs.edit().putString(prefsKey, json).apply()
            } catch (e: Exception) {
                println("Error saving chat history: $e")
            }
        }
    }

    fun clearHistory() {
        _messages.value = emptyList()
        prefs.edit().remove(prefsKey).apply()
    }

    fun exportChatHistory() {
        val dateFormat = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault())
        val text = _messages.value.joinToString("\n\n") { message ->
            val sender = if (message.isUser) "Siz" else "AI Asistan"
            val timestamp = dateFormat.format(Date(message.timestamp))
            "[$timestamp] $sender: ${message.content}"
        }

        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, text)
            putExtra(Intent.EXTRA_SUBJECT, "AI Asistan Sohbet Geçmişi")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

        context.startActivity(Intent.createChooser(intent, "Sohbeti Paylaş").apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        })
    }

    // MARK: - Message Sending

    fun sendMessage(text: String) {
        viewModelScope.launch {
            // Add user message
            val userMessage = ChatMessage(
                content = text,
                isUser = true,
                isSending = true
            )
            _messages.value = _messages.value + userMessage

            _isSending.value = true
            _isTyping.value = true

            try {
                // Call AI API
                val request = mapOf(
                    "message" to text,
                    "context" to getCurrentContext()
                )

                val response = apiClient.safeApiCall {
                    apiClient.service.aiChat(request)
                }

                response.onSuccess { aiResponse ->
                    // Update user message status
                    _messages.value = _messages.value.map {
                        if (it.id == userMessage.id) it.copy(isSending = false) else it
                    }

                    // Add AI response
                    val aiMessage = ChatMessage(
                        content = aiResponse.message,
                        isUser = false
                    )
                    _messages.value = _messages.value + aiMessage

                    // Save history
                    saveChatHistory()

                }.onFailure { error ->
                    // Mark user message as error
                    _messages.value = _messages.value.map {
                        if (it.id == userMessage.id) it.copy(isSending = false, isError = true) else it
                    }

                    // Add error message
                    val errorMessage = ChatMessage(
                        content = "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
                        isUser = false
                    )
                    _messages.value = _messages.value + errorMessage

                    println("Error sending message: $error")
                }

            } catch (e: Exception) {
                println("Exception sending message: $e")

                _messages.value = _messages.value.map {
                    if (it.id == userMessage.id) it.copy(isSending = false, isError = true) else it
                }
            }

            _isTyping.value = false
            _isSending.value = false
        }
    }

    private fun getCurrentContext(): Map<String, Any> {
        return mapOf(
            "timestamp" to System.currentTimeMillis(),
            "language" to "tr",
            "platform" to "Android",
            "hasRecentData" to true
        )
    }

    // MARK: - Voice Recording

    fun startVoiceRecording() {
        _isRecording.value = true
    }

    fun stopVoiceRecording(onResult: (String?) -> Unit) {
        _isRecording.value = false

        // In a real implementation, you would use Android's SpeechRecognizer
        // For now, we'll create an intent that can be used by the UI layer
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "tr-TR")
            putExtra(RecognizerIntent.EXTRA_PROMPT, "Konuşun...")
        }

        // Note: The actual speech recognition would need to be handled in the Activity/Fragment
        // This is a placeholder for the ViewModel's part
        onResult(null)
    }
}

// MARK: - Response Models

data class AIResponse(
    val message: String,
    val suggestions: List<String>? = null,
    val data: Map<String, Any>? = null
)

// MARK: - API Service Extension

suspend fun tr.gov.ade.core.network.APIService.aiChat(request: Map<String, Any>): AIResponse {
    // This would be implemented in the actual APIService interface
    // Placeholder implementation
    return AIResponse(
        message = "AI response placeholder",
        suggestions = null,
        data = null
    )
}
