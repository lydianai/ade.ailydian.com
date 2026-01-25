import SwiftUI
import Combine
import AVFoundation
import Speech

/**
 * AI Assistant ViewModel
 *
 * Manages AI chat functionality:
 * - Message sending/receiving
 * - Voice recording (Speech-to-Text)
 * - Chat history persistence
 * - API communication
 *
 * @author ADE iOS Team
 * @since 2026-01-24
 */

@MainActor
class AIAssistantViewModel: ObservableObject {
    // MARK: - Published Properties

    @Published var messages: [ChatMessage] = []
    @Published var isTyping = false
    @Published var isSending = false

    // MARK: - Private Properties

    private let apiClient = APIClient.shared
    private var cancellables = Set<AnyCancellable>()

    // Voice Recognition
    private var audioEngine: AVAudioEngine?
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "tr-TR"))

    // Persistence
    private let messagesKey = "chat_messages_history"

    // MARK: - Initialization

    init() {
        requestSpeechPermission()
    }

    // MARK: - Chat History

    func loadChatHistory() async {
        if let data = UserDefaults.standard.data(forKey: messagesKey),
           let savedMessages = try? JSONDecoder().decode([ChatMessage].self, from: data) {
            messages = savedMessages
        }
    }

    private func saveChatHistory() {
        if let encoded = try? JSONEncoder().encode(messages) {
            UserDefaults.standard.set(encoded, forKey: messagesKey)
        }
    }

    func clearHistory() {
        messages.removeAll()
        UserDefaults.standard.removeObject(forKey: messagesKey)
    }

    func exportChatHistory() {
        let text = messages.map { message in
            let sender = message.isUser ? "Siz" : "AI Asistan"
            let timestamp = message.timestamp.formatted(date: .abbreviated, time: .shortened)
            return "[\(timestamp)] \(sender): \(message.content)"
        }.joined(separator: "\n\n")

        let activityVC = UIActivityViewController(
            activityItems: [text],
            applicationActivities: nil
        )

        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
           let rootVC = windowScene.windows.first?.rootViewController {
            rootVC.present(activityVC, animated: true)
        }
    }

    // MARK: - Message Sending

    func sendMessage(_ text: String) async {
        // Add user message
        let userMessage = ChatMessage(
            content: text,
            isUser: true,
            isSending: true
        )
        messages.append(userMessage)

        isSending = true
        isTyping = true

        do {
            // Call AI API
            let response: AIResponse = try await apiClient.request(
                endpoint: .aiChat(message: text),
                method: .post,
                body: ["message": text, "context": getCurrentContext()],
                requiresAuth: true
            )

            // Update user message status
            if let index = messages.firstIndex(where: { $0.id == userMessage.id }) {
                messages[index].isSending = false
            }

            // Add AI response
            let aiMessage = ChatMessage(
                content: response.message,
                isUser: false
            )
            messages.append(aiMessage)

            // Save history
            saveChatHistory()

        } catch {
            // Mark user message as error
            if let index = messages.firstIndex(where: { $0.id == userMessage.id }) {
                messages[index].isSending = false
                messages[index].isError = true
            }

            // Add error message
            let errorMessage = ChatMessage(
                content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
                isUser: false
            )
            messages.append(errorMessage)

            print("Error sending message: \(error)")
        }

        isTyping = false
        isSending = false
    }

    private func getCurrentContext() -> [String: Any] {
        // Gather context from other parts of the app
        var context: [String: Any] = [:]
        context["timestamp"] = Date().ISO8601Format()
        context["language"] = "tr"
        context["platform"] = "iOS"

        // Add recent business metrics if available
        // This would be populated from Dashboard or other screens
        context["hasRecentData"] = true

        return context
    }

    // MARK: - Voice Recording

    private func requestSpeechPermission() {
        SFSpeechRecognizer.requestAuthorization { authStatus in
            DispatchQueue.main.async {
                switch authStatus {
                case .authorized:
                    print("Speech recognition authorized")
                case .denied, .restricted, .notDetermined:
                    print("Speech recognition not authorized")
                @unknown default:
                    break
                }
            }
        }
    }

    func startVoiceRecording() {
        // Cancel any ongoing task
        recognitionTask?.cancel()
        recognitionTask = nil

        // Configure audio session
        let audioSession = AVAudioSession.sharedInstance()
        do {
            try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch {
            print("Audio session error: \(error)")
            return
        }

        // Create recognition request
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        guard let recognitionRequest = recognitionRequest else { return }
        recognitionRequest.shouldReportPartialResults = true

        // Setup audio engine
        audioEngine = AVAudioEngine()
        guard let audioEngine = audioEngine else { return }

        let inputNode = audioEngine.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)

        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
            recognitionRequest.append(buffer)
        }

        audioEngine.prepare()

        do {
            try audioEngine.start()
        } catch {
            print("Audio engine error: \(error)")
            return
        }

        // Start recognition
        recognitionTask = speechRecognizer?.recognitionTask(with: recognitionRequest) { [weak self] result, error in
            if let result = result {
                // Update UI with partial results if needed
                print("Transcription: \(result.bestTranscription.formattedString)")
            }

            if error != nil || result?.isFinal == true {
                self?.audioEngine?.stop()
                inputNode.removeTap(onBus: 0)
            }
        }
    }

    func stopVoiceRecording() async -> String? {
        audioEngine?.stop()
        audioEngine?.inputNode.removeTap(onBus: 0)

        recognitionRequest?.endAudio()

        // Wait a bit for final result
        try? await Task.sleep(nanoseconds: 500_000_000) // 0.5 seconds

        let transcription = recognitionTask?.result?.bestTranscription.formattedString

        recognitionTask?.cancel()
        recognitionTask = nil
        recognitionRequest = nil

        return transcription
    }
}

// MARK: - Response Model

struct AIResponse: Decodable {
    let message: String
    let suggestions: [String]?
    let data: [String: AnyCodable]?

    enum CodingKeys: String, CodingKey {
        case message, suggestions, data
    }
}

// MARK: - AnyCodable Helper

struct AnyCodable: Codable {
    let value: Any

    init(_ value: Any) {
        self.value = value
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()

        if let int = try? container.decode(Int.self) {
            value = int
        } else if let double = try? container.decode(Double.self) {
            value = double
        } else if let string = try? container.decode(String.self) {
            value = string
        } else if let bool = try? container.decode(Bool.self) {
            value = bool
        } else if let array = try? container.decode([AnyCodable].self) {
            value = array.map { $0.value }
        } else if let dict = try? container.decode([String: AnyCodable].self) {
            value = dict.mapValues { $0.value }
        } else {
            value = NSNull()
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()

        switch value {
        case let int as Int:
            try container.encode(int)
        case let double as Double:
            try container.encode(double)
        case let string as String:
            try container.encode(string)
        case let bool as Bool:
            try container.encode(bool)
        case let array as [Any]:
            try container.encode(array.map { AnyCodable($0) })
        case let dict as [String: Any]:
            try container.encode(dict.mapValues { AnyCodable($0) })
        default:
            try container.encodeNil()
        }
    }
}

// MARK: - API Endpoint Extension

extension APIEndpoint {
    static func aiChat(message: String) -> APIEndpoint {
        return .custom(path: "/ai/chat")
    }
}
