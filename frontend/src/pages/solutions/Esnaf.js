import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, DocumentTextIcon, ChartBarIcon, BoltIcon, CheckCircleIcon, CurrencyDollarIcon, ClockIcon, ShieldCheckIcon, } from '@heroicons/react/24/outline';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function Esnaf() {
    const painPoints = [
        {
            icon: ClockIcon,
            title: 'Muhasebe Zamanı',
            problem: 'Ayda 40+ saat kağıt işiyle uğraşıyorsunuz',
            solution: 'ADE ile 5 dakika. %95 zaman tasarrufu',
        },
        {
            icon: CurrencyDollarIcon,
            title: 'Muhasebeci Maliyeti',
            problem: 'Ayda 2.000-5.000 TL muhasebe ücreti ödüyorsunuz',
            solution: 'Sadece 299 TL/ay. Yıllık 40.000 TL tasarruf',
        },
        {
            icon: DocumentTextIcon,
            title: 'e-Fatura Karmaşası',
            problem: 'GİB portalı karmaşık, her fatura 10 dakika alıyor',
            solution: 'Sesli komutla 30 saniyede fatura',
        },
        {
            icon: BoltIcon,
            title: 'Geç Ödeme Cezaları',
            problem: 'SGK ve vergi ödemelerini unutup gecikme faizi ödüyorsunuz',
            solution: 'Proaktif hatırlatma ve otomatik ödeme',
        },
    ];
    const features = [
        {
            icon: ShoppingBagIcon,
            title: 'Satış Noktası Entegrasyonu',
            desc: 'Yazar kasa, tablet kasa ve POS entegrasyonu. Her satış otomatik fatura',
            gradient: 'from-orange-500 to-amber-500',
        },
        {
            icon: DocumentTextIcon,
            title: 'Otomatik e-Fatura',
            desc: 'e-Fatura, e-Arşiv, e-İrsaliye otomatik kesimi ve GİB gönderimi',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: ChartBarIcon,
            title: 'Günlük Raporlar',
            desc: 'Satışlar, gelir-gider, kar-zarar AI sesli rapor. Her sabah WhatsApp\'ta',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: BoltIcon,
            title: 'Vergi & SGK Otomasyonu',
            desc: 'Stopaj, KDV, Muhtasar, 4A hesaplaması ve zamanında otomatik ödeme',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: ShieldCheckIcon,
            title: 'e-İmza Dahil',
            desc: 'Mobil e-İmza (3.990 TL değerinde) ilk yıl ücretsiz',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: CurrencyDollarIcon,
            title: 'Stok & Kasa Takibi',
            desc: 'Gerçek zamanlı stok, kasa ve banka hesap takibi. Eksikler bildirir',
            gradient: 'from-rose-500 to-red-500',
        },
    ];
    const useCases = [
        {
            title: 'Bakkal Ahmet Amca - İstanbul',
            avatar: '🏪',
            testimony: 'ADE olmadan önce muhasebeciye ayda 3.000 TL veriyordum. Şimdi 299 TL. AI asistanım her şeyi sesli anlatıyor, ben de anlıyorum artık.',
            results: ['Yıllık 32.400 TL tasarruf', 'Sıfır gecikme faizi', '40 saat/ay zaman kazancı'],
        },
        {
            title: 'Kuaför Elif - Ankara',
            avatar: '💇‍♀️',
            testimony: 'Instagram\'dan gelen randevuları ADE otomatik alıyor. Müşteri geldi mi hatırlatıyor. En çok satan hizmeti bile söylüyor!',
            results: ['%35 randevu artışı', 'Müşteri memnuniyeti %95', 'Stok fire %60 azaldı'],
        },
        {
            title: 'Kuru Temizlemeci Hasan - İzmir',
            avatar: '👔',
            testimony: '150 müşterim var. Kimlerin elbisesi hazır, kimlerin borclu kim, hepsini ADE takip ediyor. Tahsilat oranım %98\'e çıktı!',
            results: ['Tahsilat %40 arttı', 'Kayıp eşya sıfırlandı', 'WhatsApp hatırlatma otomatik'],
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "text-7xl mb-6", children: "\uD83C\uDFEA" }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "Esnaf i\u00E7in " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Ak\u0131ll\u0131 Asistan" })] }), _jsx("p", { className: "text-xl md:text-2xl text-white/70 mb-8 leading-relaxed", children: "Muhasebeci masraf\u0131ndan kurtulun. Vergilerinizi, SGK'n\u0131z\u0131, faturalar\u0131n\u0131z\u0131 yapay zeka y\u00F6netsin. Ayda sadece 299 TL." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg", children: "14 G\u00FCn \u00DCcretsiz Dene" }), _jsx(Link, { to: "#features", className: "btn-secondary text-lg", children: "\u00D6zellikleri G\u00F6r" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                        { value: '87.000+', label: 'Esnaf Kullanıcı' },
                                        { value: '32.400 TL', label: 'Yıllık Ortalama Tasarruf' },
                                        { value: '%95', label: 'Zaman Tasarrufu' },
                                        { value: '4.8/5', label: 'Kullanıcı Puanı' },
                                    ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6 text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Bildi\u011Fimiz " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Sorunlar" })] }), _jsx("p", { className: "text-xl text-white/70", children: "ADE, esnaf\u0131n ger\u00E7ek problemlerini \u00E7\u00F6z\u00FCyor" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: painPoints.map((point, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: [_jsx(point.icon, { className: "w-12 h-12 text-red-400 mb-6" }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: point.title }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-red-400 font-semibold text-sm", children: "\u274C Sorun:" }), _jsx("p", { className: "text-white/70 mt-1", children: point.problem })] }), _jsxs("div", { className: "glass-card p-4 border-l-4 border-green-500", children: [_jsx("span", { className: "text-green-400 font-semibold text-sm", children: "\u2713 ADE \u00C7\u00F6z\u00FCm\u00FC:" }), _jsx("p", { className: "text-white/90 mt-1", children: point.solution })] })] })] }, index))) })] }) }), _jsx("section", { id: "features", className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Esnaf i\u00E7in " }), _jsx("span", { className: "text-gradient-amber-teal", children: "\u00D6zel \u00D6zellikler" })] }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8 hover:scale-105 transition-transform", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`, children: _jsx(feature.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70", children: feature.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ger\u00E7ek " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Hikayeler" })] }) }), _jsx("div", { className: "space-y-8", children: useCases.map((useCase, index) => (_jsx(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "text-6xl flex-shrink-0", children: useCase.avatar }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: useCase.title }), _jsxs("p", { className: "text-white/80 italic mb-6 text-lg", children: ["\"", useCase.testimony, "\""] }), _jsx("div", { className: "grid md:grid-cols-3 gap-4", children: useCase.results.map((result, rIndex) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400 flex-shrink-0" }), _jsx("span", { className: "text-white/80", children: result })] }, rIndex))) })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Hemen " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Ba\u015Fla" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "14 g\u00FCn \u00FCcretsiz dene. Kredi kart\u0131 gerekmez. \u0130stedi\u011Fin zaman iptal et." }), _jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg", children: "\u00DCcretsiz Dene" }), _jsx("p", { className: "text-sm text-white/50 mt-6", children: "87.000+ esnaf ADE kullan\u0131yor \u2022 Ortalama %95 memnuniyet \u2022 7/24 destek" })] }) }) }), _jsx(Footer, {})] }));
}
