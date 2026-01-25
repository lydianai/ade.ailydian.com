import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UsersIcon, DocumentDuplicateIcon, ClockIcon, CpuChipIcon, ChartBarIcon, ShieldCheckIcon, BoltIcon, CheckCircleIcon, ArrowTrendingUpIcon, CurrencyDollarIcon, DocumentTextIcon, BuildingOffice2Icon, } from '@heroicons/react/24/outline';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function Muhasebe() {
    const features = [
        {
            icon: UsersIcon,
            title: 'Çoklu Müşteri Yönetimi',
            desc: 'Tüm müşterilerinizi tek panelden yönetin. Müşteri bazlı dashboard, raporlar ve takip',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: DocumentDuplicateIcon,
            title: 'Toplu İşlem',
            desc: 'Tüm müşterileriniz için tek tıkla beyanname, mizan, bilanço oluşturma',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: ClockIcon,
            title: 'Otomasyon',
            desc: 'e-Fatura, e-Defter, muhtasar, stopaj otomatik hesaplama ve gönderim',
            gradient: 'from-amber-500 to-orange-500',
        },
        {
            icon: CpuChipIcon,
            title: 'AI Denetim Asistanı',
            desc: 'Hatalı kayıtları, eksik belgeleri, vergi riski olan işlemleri otomatik tespit',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: ChartBarIcon,
            title: 'Gelişmiş Raporlama',
            desc: 'Müşteri karlılık analizi, iş yükü dağılımı, performans metrikleri',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Yetki Yönetimi',
            desc: 'Asistan muhasebecilere sınırlı yetki, müşterilere salt okunur erişim',
            gradient: 'from-rose-500 to-red-500',
        },
    ];
    const automationFeatures = [
        {
            title: 'Otomatik Fatura Entegrasyonu',
            desc: 'Müşterilerinizin e-Fatura, e-Arşiv, e-İrsaliye\'leri otomatik sisteme aktarılır. Manuel giriş sıfıra iner.',
            stat: '%95 zaman tasarrufu',
            icon: DocumentTextIcon,
        },
        {
            title: 'AI Yevmiye Önerisi',
            desc: 'Geçmiş kayıtlardan öğrenen AI, yeni faturalar için doğru hesap kodlarını önerir.',
            stat: '%98 doğruluk',
            icon: CpuChipIcon,
        },
        {
            title: 'Toplu Beyanname',
            desc: 'Tüm müşterilerinizin KDV, Muhtasar, Stopaj beyannamelerini tek tıkla hazırlayıp gönderin.',
            stat: '1000 müşteri/saat',
            icon: BoltIcon,
        },
        {
            title: 'Müşteri Self-Service',
            desc: 'Müşteriler kendi panellerinden raporlarını görür, belge yükler. Sizden sürekli rapor istemez.',
            stat: '%60 destek azalması',
            icon: UsersIcon,
        },
    ];
    const useCases = [
        {
            title: 'Ahmet Bey SMMM - 450 Müşteri - İstanbul',
            icon: '👨‍💼',
            challenge: '8 asistan muhasebeci ile çalışıyor. Her ay beyanname zamanı kaos yaşanıyor. Müşteri raporları geç hazırlanıyor.',
            solution: 'ADE ile tüm müşteriler sisteme entegre edildi. e-Faturalar otomatik düşüyor. AI yevmiye kayıtlarını öneriyor. Beyannameler toplu hazırlanıyor.',
            results: [
                { metric: 'İş Yükü', value: '%70 azalma', color: 'text-green-400' },
                { metric: 'Müşteri Kapasitesi', value: '450 → 850', color: 'text-teal-400' },
                { metric: 'Hata Oranı', value: '%85 düşüş', color: 'text-amber-400' },
                { metric: 'Müşteri Memnuniyeti', value: '%92', color: 'text-purple-400' },
            ],
        },
        {
            title: 'Elif Hanım SMMM - 120 Müşteri - Ankara',
            icon: '👩‍💼',
            challenge: 'Tek başına çalışıyor. Müşteri artırmak istiyor ama fiziksel olarak yetişemiyor. Raporlar manuel hazırlanıyor.',
            solution: 'ADE Muhasebe paketi ile tüm rutin işler otomatikleşti. Müşterilere self-service panel verildi. AI denetim asistanı hataları önlüyor.',
            results: [
                { metric: 'Çalışma Saati', value: '70 → 40 saat/hafta', color: 'text-green-400' },
                { metric: 'Müşteri Sayısı', value: '2x artış', color: 'text-teal-400' },
                { metric: 'Gelir', value: '%180 artış', color: 'text-amber-400' },
                { metric: 'İş-Yaşam Dengesi', value: 'İyileşti', color: 'text-purple-400' },
            ],
        },
    ];
    const pricing = [
        {
            name: 'Starter',
            price: '999',
            description: 'Küçük muhasebe büroları için',
            features: [
                '50 müşteriye kadar',
                '2 kullanıcı',
                'Otomatik e-Fatura entegrasyonu',
                'Temel raporlama',
                'AI yevmiye önerisi',
                'Müşteri self-service',
                'Email destek',
            ],
            highlighted: false,
        },
        {
            name: 'Professional',
            price: '2.999',
            description: 'Orta ölçekli bürolar için',
            features: [
                '200 müşteriye kadar',
                '10 kullanıcı',
                'Tüm otomasyonlar',
                'Gelişmiş raporlama',
                'AI denetim asistanı',
                'Toplu beyanname',
                'Müşteri karlılık analizi',
                'WhatsApp entegrasyonu',
                'Öncelikli destek',
            ],
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: '9.999',
            description: 'Büyük muhasebe firmaları için',
            features: [
                'Sınırsız müşteri',
                'Sınırsız kullanıcı',
                'Özel entegrasyonlar',
                'Özel AI modelleri',
                'White-label seçeneği',
                'API erişimi',
                'Çoklu şube yönetimi',
                'Hesap yöneticisi',
                '7/24 canlı destek',
            ],
            highlighted: false,
        },
    ];
    const integrations = [
        'Logo Tiger',
        'Netsis',
        'Mikro',
        'Luca',
        'Paraşüt',
        'e-Muhasebe.NET',
        'Zirve',
        'Eta',
    ];
    const benefits = [
        {
            title: 'Müşteri Kapasitesini Artırın',
            desc: 'Otomasyon sayesinde aynı ekiple 2-3 kat daha fazla müşteriye hizmet verin',
            value: '2-3x',
            icon: ArrowTrendingUpIcon,
        },
        {
            title: 'Gelirinizi Artırın',
            desc: 'Daha fazla müşteri, daha fazla gelir. Ek hizmetler (danışmanlık) için vakit kalır',
            value: '%150+',
            icon: CurrencyDollarIcon,
        },
        {
            title: 'Hata Riskini Azaltın',
            desc: 'AI denetim asistanı hataları önceden tespit eder. Vergi riski minimize edilir',
            value: '%85',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Müşteri Memnuniyeti',
            desc: 'Daha hızlı hizmet, daha az hata, anlık raporlar. Müşteriler memnun kalır',
            value: '4.9/5',
            icon: UsersIcon,
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl", style: { animationDelay: '2s' } }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-5xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8", children: [_jsx(BuildingOffice2Icon, { className: "w-5 h-5 text-blue-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "SMMM ve YMM'ler i\u00E7in \u00D6zel Platform" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8 leading-tight", children: [_jsx("span", { className: "text-white", children: "Muhasebeciler i\u00E7in" }), _jsx("br", {}), _jsx("span", { className: "text-gradient-amber-teal", children: "AI Destekli Otomasyon" })] }), _jsx("p", { className: "text-xl md:text-2xl text-white/70 mb-12 leading-relaxed", children: "T\u00FCm m\u00FC\u015Fterilerinizi tek panelden y\u00F6netin. AI ile yevmiye kayd\u0131, toplu beyanname, otomatik denetim. M\u00FC\u015Fteri kapasitesini 3 kat\u0131na \u00E7\u0131kar\u0131n." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 mb-16", children: [_jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg", children: "30 G\u00FCn \u00DCcretsiz Dene" }), _jsx(Link, { to: "#features", className: "btn-secondary text-lg", children: "\u00D6zellikleri \u0130ncele" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                        { value: '3.200+', label: 'Muhasebeci Kullanıcı' },
                                        { value: '127K', label: 'Yönetilen Müşteri' },
                                        { value: '%70', label: 'İş Yükü Azalması' },
                                        { value: '4.9/5', label: 'Memnuniyet' },
                                    ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("div", { className: "text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { id: "features", className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Muhasebe B\u00FCronuz i\u00E7in " }), _jsx("span", { className: "text-gradient-amber-teal", children: "G\u00FC\u00E7l\u00FC Ara\u00E7lar" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Rutin i\u015Fleri otomatikle\u015Ftirin, de\u011Fer yaratan dan\u0131\u015Fmanl\u0131\u011Fa odaklan\u0131n" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 group", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(feature.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: feature.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Otomasyon " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Yetenekleri" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Manuel i\u015Flerden kurtulun, AI sizin yerinize \u00E7al\u0131\u015Fs\u0131n" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: automationFeatures.map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0", children: _jsx(feature.icon, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: feature.title }), _jsx("p", { className: "text-white/70 mb-4 leading-relaxed", children: feature.desc }), _jsx("div", { className: "inline-flex px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-semibold", children: feature.stat })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "ADE ile " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Kazan\u0131mlar" })] }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: benefits.map((benefit, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8 text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center mx-auto mb-6", children: _jsx(benefit.icon, { className: "w-8 h-8 text-white" }) }), _jsx("div", { className: "text-4xl font-bold text-gradient-amber-teal mb-3", children: benefit.value }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: benefit.title }), _jsx("p", { className: "text-white/70 text-sm", children: benefit.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ba\u015Far\u0131 " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Hikayeleri" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Ger\u00E7ek muhasebecilerden ger\u00E7ek sonu\u00E7lar" })] }), _jsx("div", { className: "space-y-12", children: useCases.map((useCase, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-8 md:p-12", children: [_jsxs("div", { className: "flex items-start gap-6 mb-8", children: [_jsx("div", { className: "text-6xl", children: useCase.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-6", children: useCase.title }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6 border-l-4 border-red-500", children: [_jsx("span", { className: "text-red-400 font-semibold mb-2 block", children: "Zorluk" }), _jsx("p", { className: "text-white/80 text-lg", children: useCase.challenge })] }), _jsxs("div", { className: "glass-card p-6 border-l-4 border-teal-500", children: [_jsx("span", { className: "text-teal-400 font-semibold mb-2 block", children: "ADE \u00C7\u00F6z\u00FCm\u00FC" }), _jsx("p", { className: "text-white/80 text-lg", children: useCase.solution })] })] })] })] }), _jsx("div", { className: "grid md:grid-cols-4 gap-6", children: useCase.results.map((result, rIndex) => (_jsxs("div", { className: "glass-card p-6 text-center", children: [_jsx("div", { className: `text-3xl font-bold ${result.color} mb-2`, children: result.value }), _jsx("div", { className: "text-white/60 text-sm", children: result.metric })] }, rIndex))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-12", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Muhasebe Yaz\u0131l\u0131m\u0131 " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Entegrasyonlar\u0131" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Mevcut yaz\u0131l\u0131m\u0131n\u0131zla sorunsuz \u00E7al\u0131\u015F\u0131r" })] }), _jsx("div", { className: "flex flex-wrap justify-center gap-4", children: integrations.map((integration, index) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.05 }, className: "px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-amber-500/30 transition-all", children: integration }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "\u00D6l\u00E7eklenebilir " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Fiyatland\u0131rma" })] }), _jsx("p", { className: "text-xl text-white/70", children: "M\u00FC\u015Fteri say\u0131n\u0131za g\u00F6re esnek planlar" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: pricing.map((plan, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: `glass-card p-8 relative ${plan.highlighted ? 'border-2 border-blue-500 shadow-2xl shadow-blue-500/20' : ''}`, children: [plan.highlighted && (_jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold", children: "En Pop\u00FCler" })), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: plan.name }), _jsxs("div", { className: "mb-4", children: [_jsx("span", { className: "text-5xl font-bold text-gradient-amber-teal", children: plan.price }), _jsx("span", { className: "text-white/60 ml-2", children: "TL / ay" })] }), _jsx("p", { className: "text-white/70 mb-8", children: plan.description }), _jsx("ul", { className: "space-y-3 mb-8", children: plan.features.map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-white/80", children: feature })] }, i))) }), _jsx(Link, { to: "/kayit-ol", className: `block w-full text-center ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`, children: "30 G\u00FCn \u00DCcretsiz Dene" })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "B\u00FCronuzu " }), _jsx("span", { className: "text-gradient-amber-teal", children: "D\u00F6n\u00FC\u015Ft\u00FCr\u00FCn" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8 max-w-2xl mx-auto", children: "3.200+ muhasebeci ADE kullan\u0131yor. Siz de m\u00FC\u015Fteri kapasitesizi art\u0131r\u0131n, gelirinizi y\u00FCkseltin." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg px-12 py-6", children: "30 G\u00FCn \u00DCcretsiz Dene" }), _jsx(Link, { to: "/contact", className: "btn-secondary text-lg px-12 py-6", children: "Demo Talep Et" })] }), _jsx("p", { className: "text-sm text-white/50 mt-6", children: "Kredi kart\u0131 gerekmez \u2022 \u0130stedi\u011Fin zaman iptal et \u2022 \u00DCcretsiz e\u011Fitim dahil" })] }) }) }), _jsx(Footer, {})] }));
}
