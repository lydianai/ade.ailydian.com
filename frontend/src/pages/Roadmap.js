import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, RocketLaunchIcon, SparklesIcon, CpuChipIcon, GlobeAltIcon, DevicePhoneMobileIcon, ChartBarIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Roadmap() {
    const roadmapData = [
        {
            quarter: 'Q4 2025',
            status: 'completed',
            icon: CheckCircleIcon,
            color: 'from-green-500 to-emerald-500',
            items: [
                { title: 'ADE Platform Lansmanı', desc: '18 bakanlık entegrasyonu ile başlangıç' },
                { title: 'e-Fatura & e-İrsaliye', desc: 'GİB entegrasyonu ve otomatik fatura kesimi' },
                { title: 'Sesli Asistan v1', desc: 'Gelişmiş ses tanıma ve dil modeli entegrasyonu' },
                { title: 'Vergi Hesaplama Motoru', desc: '13 farklı vergi türü için otomatik hesaplama' },
                { title: 'iOS & Android Uygulamaları', desc: 'Native mobil deneyim' },
            ],
        },
        {
            quarter: 'Q1 2026',
            status: 'in-progress',
            icon: ClockIcon,
            color: 'from-orange-500 to-amber-500',
            items: [
                { title: 'AI Muhasebeci v2', desc: 'Tam otomatik defter tutma ve raporlama', status: 'progress' },
                { title: 'E-ticaret Entegrasyonları', desc: 'Trendyol, Hepsiburada, N11 otomatik senkronizasyon', status: 'progress' },
                { title: 'Çoklu Şirket Yönetimi', desc: 'Tek hesaptan birden fazla şirket yönetimi', status: 'testing' },
                { title: 'Gelişmiş Raporlama', desc: 'AI destekli tahminleme ve analiz araçları', status: 'planning' },
            ],
        },
        {
            quarter: 'Q2 2026',
            status: 'planned',
            icon: RocketLaunchIcon,
            color: 'from-purple-500 to-pink-500',
            items: [
                { title: 'Açık Bankacılık Entegrasyonu', desc: 'Otomatik banka mutabakatı ve nakit akışı yönetimi' },
                { title: 'White-Label Çözüm', desc: 'Bankalar ve muhasebe firmalar için beyaz etiket platform' },
                { title: 'Blockchain e-İmza', desc: 'NFT tabanlı dijital imza altyapısı' },
                { title: 'Proaktif Uyarılar v2', desc: 'Gelişmiş AI ile fırsat ve risk tespiti' },
            ],
        },
        {
            quarter: 'Q3 2026',
            status: 'planned',
            icon: SparklesIcon,
            color: 'from-blue-500 to-cyan-500',
            items: [
                { title: 'Multi-Language Support', desc: 'İngilizce, Almanca, Fransızca dil desteği' },
                { title: 'API Marketplace', desc: '3. parti geliştiriciler için uygulama mağazası' },
                { title: 'Enterprise SLA', desc: '99.99% uptime garantisi ve dedicated support' },
                { title: 'Advanced Analytics Dashboard', desc: 'Gerçek zamanlı BI ve veri görselleştirme' },
            ],
        },
        {
            quarter: 'Q4 2026',
            status: 'future',
            icon: GlobeAltIcon,
            color: 'from-teal-500 to-green-500',
            items: [
                { title: 'Uluslararası Genişleme', desc: 'Avrupa Birliği ülkelerine açılış (pilot: Almanya)' },
                { title: 'ADE Coin', desc: 'Blockchain tabanlı ödül ve ödeme sistemi' },
                { title: 'Quantum-Safe Encryption', desc: 'Post-quantum kriptografi altyapısı' },
                { title: 'AI CFO', desc: 'Tam otonom finansal yönetim asistanı' },
            ],
        },
    ];
    const statusLabels = {
        completed: { label: 'Tamamlandı', color: 'text-green-400' },
        'in-progress': { label: 'Geliştiriliyor', color: 'text-orange-400' },
        planned: { label: 'Planlandı', color: 'text-purple-400' },
        future: { label: 'Gelecek', color: 'text-teal-400' },
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 font-medium text-sm mb-6", children: [_jsx(RocketLaunchIcon, { className: "w-4 h-4" }), "Son G\u00FCncelleme: 23 Ocak 2026"] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "Yol " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Haritas\u0131" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12 leading-relaxed", children: "ADE'nin gelece\u011Fi. \u015Eeffaf, topluluk odakl\u0131 geli\u015Fim plan\u0131m\u0131z\u0131 ke\u015Ffedin. \u00D6nerilerinizi dinliyor, \u00F6nceliklendiriyor ve hayata ge\u00E7iriyoruz." })] }) })] }), _jsx("section", { className: "section-padding", children: _jsx("div", { className: "container-custom", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-orange-500 to-purple-500 opacity-30 hidden lg:block" }), _jsx("div", { className: "space-y-24", children: roadmapData.map((quarter, qIndex) => (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: qIndex * 0.1 }, className: "relative", children: [_jsx("div", { className: "flex items-center justify-center mb-12", children: _jsxs("div", { className: `glass-card-premium px-8 py-4 inline-flex items-center gap-4 border-2 border-gradient-to-r ${quarter.color}`, children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${quarter.color} flex items-center justify-center`, children: _jsx(quarter.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: quarter.quarter }), _jsx("p", { className: `text-sm ${statusLabels[quarter.status].color} font-semibold`, children: statusLabels[quarter.status].label })] })] }) }), _jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: quarter.items.map((item, iIndex) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: iIndex * 0.05 }, className: "glass-card p-6 hover:scale-105 transition-transform", children: _jsxs("div", { className: "flex items-start gap-4", children: [quarter.status === 'completed' && (_jsx(CheckCircleIcon, { className: "w-6 h-6 text-green-400 flex-shrink-0 mt-1" })), quarter.status === 'in-progress' && (_jsxs("div", { className: "relative flex h-6 w-6 flex-shrink-0 mt-1", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-6 w-6 bg-orange-400" })] })), (quarter.status === 'planned' || quarter.status === 'future') && (_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-purple-400/50 flex-shrink-0 mt-1" })), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-2", children: item.title }), _jsx("p", { className: "text-white/70 text-sm", children: item.desc }), item.status && (_jsxs("div", { className: "mt-3", children: [item.status === 'progress' && (_jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30", children: "Geli\u015Ftiriliyor" })), item.status === 'testing' && (_jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30", children: "Test A\u015Famas\u0131nda" })), item.status === 'planning' && (_jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30", children: "Planlan\u0131yor" }))] }))] })] }) }, iIndex))) })] }, qIndex))) })] }) }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-orange-900/20 via-purple-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 max-w-4xl mx-auto text-center", children: [_jsx(CpuChipIcon, { className: "w-16 h-16 text-amber-400 mx-auto mb-6" }), _jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: "\u00D6ncelikler Sizi Dinleyerek Belirleniyor" }), _jsx("p", { className: "text-xl text-white/70 mb-8 leading-relaxed", children: "Hangi \u00F6zelliklerin \u00F6ncelikli geli\u015Ftirilmesini istiyorsunuz? Topluluk oylamas\u0131 ile birlikte roadmap'i \u015Fekillendirin. Her ay\u0131n ba\u015F\u0131nda en \u00E7ok oy alan 3 \u00F6zellik sprint plan\u0131na eklenir." }), _jsxs("a", { href: "https://feedback.ade.gov.tr", target: "_blank", rel: "noopener noreferrer", className: "btn-primary text-lg", children: [_jsx(ChartBarIcon, { className: "w-5 h-5" }), "Oy Ver & \u00D6neri G\u00F6nder"] })] }) }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-12", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Yak\u0131nda " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Yeni \u00D6zellikler" })] }) }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
                                {
                                    icon: DevicePhoneMobileIcon,
                                    title: 'Offline Mode',
                                    desc: 'İnternet olmadan da fatura kesimi ve temel işlemler',
                                    eta: 'Q2 2026',
                                },
                                {
                                    icon: GlobeAltIcon,
                                    title: 'Multi-Currency',
                                    desc: 'Döviz kurları ve uluslararası fatura desteği',
                                    eta: 'Q3 2026',
                                },
                                {
                                    icon: CpuChipIcon,
                                    title: 'Smart Contracts',
                                    desc: 'Blockchain üzerinde otomatik ödeme ve sözleşme',
                                    eta: 'Q4 2026',
                                },
                            ].map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8 text-center", children: [_jsx(feature.icon, { className: "w-12 h-12 text-purple-400 mx-auto mb-4" }), _jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: feature.title }), _jsx("p", { className: "text-white/70 mb-4", children: feature.desc }), _jsx("span", { className: "text-sm text-teal-400 font-semibold", children: feature.eta })] }, index))) })] }) }), _jsx(Footer, {})] }));
}
