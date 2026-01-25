import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mic,
  StopCircle,
  Sparkles,
  Lightbulb,
  FileText,
  Calculator,
  Users,
  ArrowLeft,
  Loader2,
  Bot,
  User as UserIcon,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  intent?: string;
  suggestions?: string[];
}

const AIAsistan = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Merhaba! Ben ADE AI asistanınızım. Size vergi, fatura, SGK ve e-Devlet işlemlerinde yardımcı olabilirim. Ne ile ilgili yardım istiyorsunuz?',
      timestamp: new Date(),
      suggestions: [
        'e-Fatura nasıl kesilir?',
        'KDV beyannamesi hazırla',
        'SGK prim hesapla',
        'Vergi takvimini göster',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Lütfen giriş yapın');
      }

      const response = await fetch('http://localhost:3000/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          history: messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate('/giris-yap');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        intent: data.intent,
        suggestions: data.suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('❌ AI chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Üzgünüm, bir hata oluştu: ${error.message}. Lütfen tekrar deneyin.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // TODO: Implement actual voice recording and STT
      alert('Ses kaydı durduruldu. Whisper STT entegrasyonu yakında eklenecek!');
    } else {
      // Start recording
      setIsRecording(true);
      alert('Ses kaydı başlatıldı! Konuşmaya başlayabilirsiniz.');
    }
  };

  const quickActions = [
    {
      icon: FileText,
      label: 'e-Fatura Kes',
      color: 'primary',
      prompt: 'Yeni bir e-Fatura kesmek istiyorum',
    },
    {
      icon: Calculator,
      label: 'Vergi Hesapla',
      color: 'secondary',
      prompt: 'KDV hesaplama yapmak istiyorum',
    },
    {
      icon: Users,
      label: 'SGK İşlemi',
      color: 'accent',
      prompt: 'Çalışan SGK bildirimi yapmak istiyorum',
    },
    {
      icon: Lightbulb,
      label: 'Öneri Al',
      color: 'purple',
      prompt: 'Bana proaktif önerilerde bulun',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={ArrowLeft}
                onClick={() => navigate('/panel')}
              >
                Geri
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Asistan</h1>
                  <p className="text-sm text-gray-600">Claude 4 + Personaplex-7B</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)] flex flex-col" padding="none">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[85%] ${
                          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-secondary-500 to-secondary-700'
                              : message.role === 'system'
                              ? 'bg-gradient-to-br from-purple-500 to-purple-700'
                              : 'bg-gradient-to-br from-primary-600 to-primary-800'
                          }`}
                        >
                          {message.role === 'user' ? (
                            <UserIcon className="h-5 w-5 text-white" />
                          ) : (
                            <Sparkles className="h-5 w-5 text-white" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div className="flex-1">
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.role === 'user'
                                ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>

                          {/* Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.suggestions.map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block w-full text-left px-4 py-2 text-sm text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-lg transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="mt-1 text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                      </div>
                      <div className="px-4 py-3 bg-gray-100 rounded-2xl">
                        <p className="text-sm text-gray-600">AI düşünüyor...</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-end space-x-3">
                  <button
                    onClick={handleVoiceRecording}
                    className={`p-3 rounded-xl transition-all ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={isRecording ? 'Kaydı durdur' : 'Sesli mesaj'}
                  >
                    {isRecording ? (
                      <StopCircle className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </button>

                  <div className="flex-1">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Mesajınızı yazın... (Enter ile gönderin)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      rows={1}
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    size="lg"
                    variant="primary"
                    className="px-6"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
              <div className="space-y-3">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(action.prompt)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${action.color}-500 to-${action.color}-700 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* AI Capabilities */}
            <Card className="bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
              <h3 className="text-sm font-semibold text-primary-900 mb-3">
                AI Yetenekleri
              </h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li className="flex items-start space-x-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Claude 4 ile gelişmiş Türkçe anlama</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Vergi, fatura ve SGK danışmanlığı</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Proaktif öneriler ve hatırlatmalar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Whisper ile sesli komut desteği</span>
                </li>
              </ul>
            </Card>

            {/* Tips */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span>İpuçları</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>• Sorunuzu net ve detaylı sorun</li>
                <li>• Şirket bilgilerinizi ekleyin</li>
                <li>• Önerilere tıklayarak devam edin</li>
                <li>• Shift+Enter ile yeni satır ekleyin</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAsistan;
