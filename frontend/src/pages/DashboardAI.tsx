import { useState, useRef, useEffect } from 'react'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'
import {
  PaperAirplaneIcon,
  SparklesIcon,
  UserCircleIcon,
  MicrophoneIcon,
  StopIcon,
} from '@heroicons/react/24/outline'
import { apiClient } from '../services/api'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  intent?: string
  suggestions?: string[]
}

export default function DashboardAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Merhaba! Ben ADE yapay zeka asistanınızım. Vergi, fatura, SGK ve e-Devlet işlemlerinizde size yardımcı olabilirim. Nasıl yardımcı olabilirim?',
      timestamp: new Date(),
      suggestions: [
        'Bu ay vergi borcum var mı?',
        'e-Fatura nasıl kesilir?',
        'SGK prim bildirimi yap',
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await apiClient.post('/ai/chat', {
        message: input,
        history: messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        intent: response.data.intent,
        suggestions: response.data.suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Üzgünüm, şu anda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    // TODO: Implement voice recording with ADE STT Engine
    if (!isRecording) {
      console.log('🎤 Ses kaydı başladı...')
    } else {
      console.log('⏹️ Ses kaydı durdu')
    }
  }

  const getIntentIcon = (intent?: string) => {
    switch (intent) {
      case 'tax_inquiry':
        return '💰'
      case 'invoice_inquiry':
        return '📄'
      case 'sgk_inquiry':
        return '🏥'
      case 'kvkk_inquiry':
        return '🔒'
      case 'edevlet_inquiry':
        return '🏛️'
      default:
        return '💬'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4 px-8 pt-8">
          <BackButton />
        </div>
      </div>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 flex items-center justify-center">
              <SparklesIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Asistan</h1>
              <p className="text-white/60 text-sm">Son nesil yapay zeka ile güçlendirilmiş</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-amber-500 to-teal-500'
                }`}
              >
                {message.role === 'user' ? (
                  <UserCircleIcon className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-xl">{getIntentIcon(message.intent)}</span>
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-white whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-white/40 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 text-sm glass-card hover:bg-white/10 transition-colors rounded-lg text-white/80"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="glass-card p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Bir soru sorun veya komut verin..."
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                disabled={isLoading}
              />
              <button
                onClick={handleVoiceToggle}
                className={`p-2 rounded-xl transition-colors ${
                  isRecording
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                {isRecording ? (
                  <StopIcon className="w-5 h-5" />
                ) : (
                  <MicrophoneIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="btn-primary px-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <PaperAirplaneIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-white/40 text-sm">Hızlı Eylemler:</span>
            {[
              'Vergi hesapla',
              'Fatura kes',
              'SGK prim öde',
              'e-Devlet bilgilerim',
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => setInput(action)}
                className="px-3 py-1 text-sm glass-card hover:bg-white/10 transition-colors rounded-lg text-white/60"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
