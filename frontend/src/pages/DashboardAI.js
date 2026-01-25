import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, SparklesIcon, UserCircleIcon, MicrophoneIcon, StopIcon, } from '@heroicons/react/24/outline';
import { apiClient } from '../services/api';
export default function DashboardAI() {
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: 'Merhaba! Ben ADE yapay zeka asistanınızım. Vergi, fatura, SGK ve e-Devlet işlemlerinizde size yardımcı olabilirim. Nasıl yardımcı olabilirim?',
            timestamp: new Date(),
            suggestions: [
                'Bu ay vergi borcum var mı?',
                'e-Fatura nasıl kesilir?',
                'SGK prim bildirimi yap',
            ],
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handleSend = async () => {
        if (!input.trim() || isLoading)
            return;
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        try {
            const response = await apiClient.post('/ai/chat', {
                message: input,
                history: messages.slice(-10).map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
            });
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.data.response,
                timestamp: new Date(),
                intent: response.data.intent,
                suggestions: response.data.suggestions,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }
        catch (error) {
            console.error('AI Chat error:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Üzgünüm, şu anda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    };
    const handleVoiceToggle = () => {
        setIsRecording(!isRecording);
        // TODO: Implement voice recording with ADE STT Engine
        if (!isRecording) {
            console.log('🎤 Ses kaydı başladı...');
        }
        else {
            console.log('⏹️ Ses kaydı durdu');
        }
    };
    const getIntentIcon = (intent) => {
        switch (intent) {
            case 'tax_inquiry':
                return '💰';
            case 'invoice_inquiry':
                return '📄';
            case 'sgk_inquiry':
                return '🏥';
            case 'kvkk_inquiry':
                return '🔒';
            case 'edevlet_inquiry':
                return '🏛️';
            default:
                return '💬';
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "mb-4 px-8 pt-8", children: _jsx(BackButton, {}) }) }), _jsx("div", { className: "p-6 border-b border-white/10", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 flex items-center justify-center", children: _jsx(SparklesIcon, { className: "w-7 h-7 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "AI Asistan" }), _jsx("p", { className: "text-white/60 text-sm", children: "Son nesil yapay zeka ile g\u00FC\u00E7lendirilmi\u015F" })] })] }) }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [messages.map((message) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`, children: [_jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                        : 'bg-gradient-to-r from-amber-500 to-teal-500'}`, children: message.role === 'user' ? (_jsx(UserCircleIcon, { className: "w-6 h-6 text-white" })) : (_jsx("span", { className: "text-xl", children: getIntentIcon(message.intent) })) }), _jsxs("div", { className: `flex-1 ${message.role === 'user' ? 'text-right' : ''}`, children: [_jsx("div", { className: `inline-block p-4 rounded-2xl max-w-[80%] ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                                                : 'glass-card'}`, children: _jsx("p", { className: "text-white whitespace-pre-wrap", children: message.content }) }), _jsx("p", { className: "text-xs text-white/40 mt-1 px-2", children: message.timestamp.toLocaleTimeString('tr-TR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            }) }), message.suggestions && message.suggestions.length > 0 && (_jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: message.suggestions.map((suggestion, idx) => (_jsx("button", { onClick: () => handleSuggestionClick(suggestion), className: "px-3 py-1.5 text-sm glass-card hover:bg-white/10 transition-colors rounded-lg text-white/80", children: suggestion }, idx))) }))] })] }, message.id))), isLoading && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 flex items-center justify-center", children: _jsx(SparklesIcon, { className: "w-6 h-6 text-white animate-pulse" }) }), _jsx("div", { className: "glass-card p-4 rounded-2xl", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("div", { className: "w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]" }), _jsx("div", { className: "w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]" }), _jsx("div", { className: "w-2 h-2 bg-white/60 rounded-full animate-bounce" })] }) })] })), _jsx("div", { ref: messagesEndRef })] }) }), _jsx("div", { className: "p-6 border-t border-white/10", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "glass-card p-4 rounded-2xl", children: _jsxs("div", { className: "flex gap-3", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), placeholder: "Bir soru sorun veya komut verin...", className: "flex-1 bg-transparent text-white placeholder:text-white/40 outline-none", disabled: isLoading }), _jsx("button", { onClick: handleVoiceToggle, className: `p-2 rounded-xl transition-colors ${isRecording
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/10 text-white/60 hover:text-white'}`, children: isRecording ? (_jsx(StopIcon, { className: "w-5 h-5" })) : (_jsx(MicrophoneIcon, { className: "w-5 h-5" })) }), _jsx("button", { onClick: handleSend, disabled: !input.trim() || isLoading, className: "btn-primary px-6", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : (_jsx(PaperAirplaneIcon, { className: "w-5 h-5" })) })] }) }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [_jsx("span", { className: "text-white/40 text-sm", children: "H\u0131zl\u0131 Eylemler:" }), [
                                    'Vergi hesapla',
                                    'Fatura kes',
                                    'SGK prim öde',
                                    'e-Devlet bilgilerim',
                                ].map((action, idx) => (_jsx("button", { onClick: () => setInput(action), className: "px-3 py-1 text-sm glass-card hover:bg-white/10 transition-colors rounded-lg text-white/60", children: action }, idx)))] })] }) })] }));
}
