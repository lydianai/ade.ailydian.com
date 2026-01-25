import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CodeBracketIcon, CommandLineIcon, CubeIcon, DocumentTextIcon, KeyIcon, RocketLaunchIcon, ShieldCheckIcon, BoltIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function ApiDocs() {
    const apiSections = [
        {
            icon: KeyIcon,
            title: 'Kimlik Doğrulama',
            endpoint: '/api/v1/auth',
            methods: ['POST'],
            description: 'JWT tabanlı güvenli kimlik doğrulama sistemi',
            gradient: 'from-amber-500 to-orange-500',
        },
        {
            icon: DocumentTextIcon,
            title: 'e-Fatura API',
            endpoint: '/api/v1/invoices',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            description: 'e-Fatura oluşturma, sorgulama ve GİB entegrasyonu',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: CodeBracketIcon,
            title: 'Vergi Hesaplama',
            endpoint: '/api/v1/tax-calculator',
            methods: ['POST'],
            description: '13 farklı vergi türü için otomatik hesaplama motoru',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: CubeIcon,
            title: 'SGK İşlemleri',
            endpoint: '/api/v1/sgk',
            methods: ['GET', 'POST'],
            description: 'Sigorta primleri ve 4A/4B/4C işlemleri',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: CommandLineIcon,
            title: 'AI Asistan',
            endpoint: '/api/v1/voice',
            methods: ['POST'],
            description: 'Sesli komut işleme ve yapay zeka yanıtları',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: RocketLaunchIcon,
            title: 'Webhooks',
            endpoint: '/api/v1/webhooks',
            methods: ['POST'],
            description: 'Gerçek zamanlı bildirimler ve olay tetikleyicileri',
            gradient: 'from-rose-500 to-red-500',
        },
    ];
    const quickStart = [
        {
            step: '1',
            title: 'API Key Al',
            description: 'Panel üzerinden ücretsiz API anahtarınızı oluşturun',
            code: 'Dashboard → Ayarlar → API Keys',
        },
        {
            step: '2',
            title: 'İlk İstek',
            description: 'cURL veya tercih ettiğiniz HTTP istemcisiyle bağlanın',
            code: `curl -X POST https://api.ade.gov.tr/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"***"}'`,
        },
        {
            step: '3',
            title: 'Token Kullan',
            description: 'Bearer token ile korumalı endpointlere erişin',
            code: `curl https://api.ade.gov.tr/v1/invoices \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
        },
    ];
    const sdks = [
        { name: 'JavaScript / TypeScript', version: 'v2.1.0', downloads: '145K', icon: '📦' },
        { name: 'Python', version: 'v1.8.3', downloads: '98K', icon: '🐍' },
        { name: 'PHP', version: 'v1.5.2', downloads: '67K', icon: '🐘' },
        { name: 'Java', version: 'v2.0.1', downloads: '52K', icon: '☕' },
        { name: 'Go', version: 'v1.4.0', downloads: '41K', icon: '🔷' },
        { name: 'Ruby', version: 'v1.3.5', downloads: '28K', icon: '💎' },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" }), _jsxs("div", { className: "container-custom relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 font-medium text-sm mb-6", children: [_jsx(ShieldCheckIcon, { className: "w-4 h-4" }), "RESTful API \u2022 OpenAPI 3.0 Spec \u2022 99.95% Uptime"] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "API " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Dok\u00FCmantasyonu" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12 leading-relaxed", children: "ADE'nin t\u00FCm \u00F6zelliklerini kendi uygulaman\u0131zda kullan\u0131n. 85+ endpoint, 6 resmi SDK, detayl\u0131 \u00F6rnekler ve 7/24 destek." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsxs(Link, { to: "/kayit-ol", className: "btn-primary", children: [_jsx(KeyIcon, { className: "w-5 h-5" }), "API Key Al"] }), _jsxs("a", { href: "https://api.ade.gov.tr/docs", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary", children: [_jsx(CodeBracketIcon, { className: "w-5 h-5" }), "OpenAPI Spec"] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "grid grid-cols-2 md:grid-cols-4 gap-6 mt-16", children: [
                                    { value: '85+', label: 'API Endpoints' },
                                    { value: '6', label: 'Resmi SDK' },
                                    { value: '99.95%', label: 'API Uptime' },
                                    { value: '<200ms', label: 'Avg Response' },
                                ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6 text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "H\u0131zl\u0131 " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Ba\u015Flang\u0131\u00E7" })] }), _jsx("p", { className: "text-xl text-white/70", children: "3 ad\u0131mda API entegrasyonu" })] }), _jsx("div", { className: "space-y-8 max-w-4xl mx-auto", children: quickStart.map((item, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0", children: item.step }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: item.title }), _jsx("p", { className: "text-white/70 mb-4", children: item.description }), _jsx("div", { className: "bg-slate-900/80 rounded-xl p-4 border border-orange-500/20", children: _jsx("code", { className: "text-sm text-orange-300 font-mono break-all whitespace-pre-wrap", children: item.code }) })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "API " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Kategorileri" })] }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: apiSections.map((section, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8 hover:scale-105 transition-transform", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6`, children: _jsx(section.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: section.title }), _jsx("code", { className: "text-sm text-orange-400 mb-4 block", children: section.endpoint }), _jsx("p", { className: "text-white/70 mb-4", children: section.description }), _jsx("div", { className: "flex flex-wrap gap-2", children: section.methods.map((method) => (_jsx("span", { className: "px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-white/80", children: method }, method))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Resmi " }), _jsx("span", { className: "text-gradient-amber-teal", children: "SDK'lar" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Her dil i\u00E7in haz\u0131r k\u00FCt\u00FCphaneler" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: sdks.map((sdk, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.05 }, className: "glass-card p-6 hover:border-orange-500/50 transition-all", children: [_jsx("div", { className: "text-4xl mb-4", children: sdk.icon }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: sdk.name }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-white/60", children: sdk.version }), _jsxs("span", { className: "text-teal-400", children: [sdk.downloads, " indirme"] })] })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex items-start gap-6 mb-8", children: [_jsx(BoltIcon, { className: "w-12 h-12 text-amber-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Rate Limits" }), _jsx("p", { className: "text-white/70 leading-relaxed", children: "API istekleriniz plan baz\u0131nda limitlere tabidir. \u00DCcretsiz plan: 1.000 istek/saat, Pro plan: 10.000 istek/saat, Enterprise plan: S\u0131n\u0131rs\u0131z." })] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
                                    { plan: 'Ücretsiz', limit: '1,000/saat', burst: '100/dakika' },
                                    { plan: 'Pro', limit: '10,000/saat', burst: '500/dakika' },
                                    { plan: 'Enterprise', limit: 'Sınırsız', burst: 'Sınırsız' },
                                ].map((item, index) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("h3", { className: "font-bold text-white mb-4", children: item.plan }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Saatlik:" }), _jsx("span", { className: "text-orange-400 font-semibold", children: item.limit })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Burst:" }), _jsx("span", { className: "text-teal-400 font-semibold", children: item.burst })] })] })] }, index))) })] }) }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Geli\u015Ftirmeye " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Ba\u015Fla" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "\u00DCcretsiz API anahtar\u0131n\u0131z\u0131 al\u0131n ve dakikalar i\u00E7inde entegre edin" }), _jsxs(Link, { to: "/kayit-ol", className: "btn-primary text-lg", children: [_jsx(KeyIcon, { className: "w-5 h-5" }), "\u00DCcretsiz API Key Al"] })] }) }) }), _jsx(Footer, {})] }));
}
