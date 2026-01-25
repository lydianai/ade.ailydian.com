import SwiftUI
import AVFoundation

/**
 * AI Assistant View
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
 * @author ADE iOS Team
 * @since 2026-01-24
 */

struct AIAssistantView: View {
    @StateObject private var viewModel = AIAssistantViewModel()
    @State private var messageText = ""
    @State private var isRecording = false
    @State private var showQuickActions = true
    @FocusState private var isInputFocused: Bool

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Messages List
                messagesListView

                // Quick Actions (collapsible)
                if showQuickActions && viewModel.messages.isEmpty {
                    quickActionsView
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                }

                // Input Area
                inputAreaView
            }
            .navigationTitle("AI Asistan")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Button {
                            viewModel.clearHistory()
                        } label: {
                            Label("Geçmişi Temizle", systemImage: "trash")
                        }

                        Button {
                            showQuickActions.toggle()
                        } label: {
                            Label(
                                showQuickActions ? "Hızlı Eylemleri Gizle" : "Hızlı Eylemleri Göster",
                                systemImage: showQuickActions ? "eye.slash" : "eye"
                            )
                        }

                        Button {
                            viewModel.exportChatHistory()
                        } label: {
                            Label("Sohbeti Dışa Aktar", systemImage: "square.and.arrow.up")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
            }
        }
        .task {
            await viewModel.loadChatHistory()
        }
    }

    // MARK: - Messages List

    private var messagesListView: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(spacing: 16) {
                    if viewModel.messages.isEmpty {
                        emptyStateView
                    } else {
                        ForEach(viewModel.messages) { message in
                            MessageBubble(message: message)
                                .id(message.id)
                        }

                        // Typing Indicator
                        if viewModel.isTyping {
                            TypingIndicator()
                                .id("typing")
                        }
                    }
                }
                .padding()
            }
            .onChange(of: viewModel.messages.count) { _ in
                withAnimation {
                    if let lastMessage = viewModel.messages.last {
                        proxy.scrollTo(lastMessage.id, anchor: .bottom)
                    }
                }
            }
            .onChange(of: viewModel.isTyping) { isTyping in
                if isTyping {
                    withAnimation {
                        proxy.scrollTo("typing", anchor: .bottom)
                    }
                }
            }
        }
    }

    private var emptyStateView: some View {
        VStack(spacing: 20) {
            Spacer()

            Image(systemName: "brain.head.profile")
                .font(.system(size: 80))
                .foregroundStyle(.blue.gradient)

            VStack(spacing: 8) {
                Text("AI Asistanınız Hazır")
                    .font(.title2)
                    .fontWeight(.bold)

                Text("İşletmeniz hakkında sorular sorun, analiz isteyin veya hızlı eylemlerden birini seçin")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }

            Spacer()
        }
    }

    // MARK: - Quick Actions

    private var quickActionsView: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Hızlı Eylemler")
                    .font(.headline)
                Spacer()
                Button {
                    withAnimation {
                        showQuickActions = false
                    }
                } label: {
                    Image(systemName: "chevron.down.circle.fill")
                        .foregroundStyle(.secondary)
                }
            }

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    QuickActionButton(
                        icon: "chart.line.uptrend.xyaxis",
                        title: "Bugünkü Satışlar",
                        color: .blue
                    ) {
                        sendQuickMessage("Bugün kaç sipariş geldi ve toplam satış ne kadar?")
                    }

                    QuickActionButton(
                        icon: "star.fill",
                        title: "En Çok Satanlar",
                        color: .orange
                    ) {
                        sendQuickMessage("En çok satan ürünlerim hangileri?")
                    }

                    QuickActionButton(
                        icon: "exclamationmark.triangle.fill",
                        title: "Düşük Stok",
                        color: .red
                    ) {
                        sendQuickMessage("Stokta azalan ürünler hangileri?")
                    }

                    QuickActionButton(
                        icon: "dollarsign.circle.fill",
                        title: "Gelir Analizi",
                        color: .green
                    ) {
                        sendQuickMessage("Bu ayki gelir durumumu analiz et")
                    }

                    QuickActionButton(
                        icon: "person.2.fill",
                        title: "Müşteri İstatistikleri",
                        color: .purple
                    ) {
                        sendQuickMessage("Müşteri istatistiklerimi göster")
                    }

                    QuickActionButton(
                        icon: "sparkles",
                        title: "Öneriler",
                        color: .pink
                    ) {
                        sendQuickMessage("İşletmem için önerilerini paylaş")
                    }
                }
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
    }

    // MARK: - Input Area

    private var inputAreaView: some View {
        VStack(spacing: 0) {
            Divider()

            HStack(spacing: 12) {
                // Voice Input Button
                Button {
                    toggleRecording()
                } label: {
                    Image(systemName: isRecording ? "stop.circle.fill" : "mic.circle.fill")
                        .font(.system(size: 32))
                        .foregroundStyle(isRecording ? .red : .blue)
                }
                .disabled(viewModel.isSending)

                // Text Input
                HStack(spacing: 8) {
                    TextField("Mesajınızı yazın...", text: $messageText, axis: .vertical)
                        .textFieldStyle(.plain)
                        .lineLimit(1...5)
                        .focused($isInputFocused)
                        .disabled(viewModel.isSending)

                    if !messageText.isEmpty {
                        Button {
                            messageText = ""
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundStyle(.secondary)
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(Color(uiColor: .systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 20))

                // Send Button
                Button {
                    sendMessage()
                } label: {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 32))
                        .foregroundStyle(messageText.isEmpty ? .secondary : .blue)
                }
                .disabled(messageText.isEmpty || viewModel.isSending)
            }
            .padding()
            .background(Color(uiColor: .systemBackground))
        }
    }

    // MARK: - Actions

    private func sendMessage() {
        let text = messageText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }

        messageText = ""
        isInputFocused = false
        showQuickActions = false

        Task {
            await viewModel.sendMessage(text)
        }
    }

    private func sendQuickMessage(_ text: String) {
        showQuickActions = false
        Task {
            await viewModel.sendMessage(text)
        }
    }

    private func toggleRecording() {
        if isRecording {
            stopRecording()
        } else {
            startRecording()
        }
    }

    private func startRecording() {
        isRecording = true
        viewModel.startVoiceRecording()
    }

    private func stopRecording() {
        isRecording = false
        Task {
            if let transcription = await viewModel.stopVoiceRecording() {
                messageText = transcription
            }
        }
    }
}

// MARK: - Message Bubble

struct MessageBubble: View {
    let message: ChatMessage

    var body: some View {
        HStack {
            if message.isUser {
                Spacer(minLength: 60)
            }

            VStack(alignment: message.isUser ? .trailing : .leading, spacing: 8) {
                // Message Content
                Text(message.content)
                    .font(.body)
                    .foregroundStyle(message.isUser ? .white : .primary)
                    .padding(12)
                    .background(
                        message.isUser ?
                            AnyShapeStyle(Color.blue) :
                            AnyShapeStyle(Color(uiColor: .systemGray5))
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 16))

                // Timestamp & Status
                HStack(spacing: 4) {
                    Text(message.timestamp, style: .time)
                        .font(.caption2)
                        .foregroundStyle(.secondary)

                    if message.isUser {
                        if message.isSending {
                            Image(systemName: "clock.fill")
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                        } else if message.isError {
                            Image(systemName: "exclamationmark.circle.fill")
                                .font(.caption2)
                                .foregroundStyle(.red)
                        } else {
                            Image(systemName: "checkmark")
                                .font(.caption2)
                                .foregroundStyle(.blue)
                        }
                    }
                }
                .padding(.horizontal, 4)
            }

            if !message.isUser {
                Spacer(minLength: 60)
            }
        }
    }
}

// MARK: - Typing Indicator

struct TypingIndicator: View {
    @State private var dotCount = 0

    var body: some View {
        HStack {
            HStack(spacing: 4) {
                ForEach(0..<3) { index in
                    Circle()
                        .fill(Color.secondary)
                        .frame(width: 8, height: 8)
                        .opacity(dotCount == index ? 1.0 : 0.3)
                }
            }
            .padding(12)
            .background(Color(uiColor: .systemGray5))
            .clipShape(RoundedRectangle(cornerRadius: 16))

            Spacer(minLength: 60)
        }
        .onAppear {
            Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { _ in
                withAnimation {
                    dotCount = (dotCount + 1) % 3
                }
            }
        }
    }
}

// MARK: - Quick Action Button

struct QuickActionButton: View {
    let icon: String
    let title: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.system(size: 24))
                    .foregroundStyle(color)
                    .frame(width: 48, height: 48)
                    .background(color.opacity(0.1))
                    .clipShape(Circle())

                Text(title)
                    .font(.caption)
                    .foregroundStyle(.primary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
                    .frame(width: 80)
            }
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Supporting Types

struct ChatMessage: Identifiable, Codable {
    let id: String
    let content: String
    let isUser: Bool
    let timestamp: Date
    var isSending: Bool = false
    var isError: Bool = false

    init(id: String = UUID().uuidString, content: String, isUser: Bool, timestamp: Date = Date(), isSending: Bool = false, isError: Bool = false) {
        self.id = id
        self.content = content
        self.isUser = isUser
        self.timestamp = timestamp
        self.isSending = isSending
        self.isError = isError
    }
}

// MARK: - Preview

#Preview {
    AIAssistantView()
}
