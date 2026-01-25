import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon, ChartBarIcon, CubeIcon, UsersIcon, BanknotesIcon, DevicePhoneMobileIcon, ArrowTrendingUpIcon, ShieldCheckIcon, DocumentChartBarIcon, ClockIcon, CheckCircleIcon, CpuChipIcon, } from '@heroicons/react/24/outline';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function Kobi() {
    const features = [
        {
            icon: BuildingStorefrontIcon,
            title: 'Çoklu Şube Yönetimi',
            desc: 'Tüm şubelerinizi tek panelden yönetin. Şube bazlı raporlama, stok transferi, merkezi fiyatlandırma',
            gradient: 'from-orange-500 to-amber-500',
        },
        {
            icon: ChartBarIcon,
            title: 'Gelişmiş Analitik',
            desc: 'AI destekli satış tahminleme, müşteri segmentasyonu, karlılık analizi, trend tespiti',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: CubeIcon,
            title: 'Akıllı Stok Yönetimi',
            desc: 'Otomatik sipariş önerileri, barkod sistemi, seri/lot takibi, fire analizi, ABC sınıflandırma',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: UsersIcon,
            title: 'Çalışan Yönetimi',
            desc: 'Vardiya planı, performans takibi, komisyon hesaplama, SGK otomasyonu, bordro entegrasyonu',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: BanknotesIcon,
            title: 'Nakit Akışı Yönetimi',
            desc: 'Gelir-gider tahmini, vadeli çek-senet takibi, çoklu banka hesabı, otomatik mutabakat',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: DevicePhoneMobileIcon,
            title: 'Mobil Uygulamalar',
            desc: 'iOS ve Android uygulamaları. Sahada satış, mobil fatura, hızlı rapor görüntüleme',
            gradient: 'from-rose-500 to-red-500',
        },
    ];
    const integrations = [
        {
            name: 'E-Ticaret',
            platforms: ['Trendyol', 'Hepsiburada', 'Amazon', 'N11', 'Çiçeksepeti'],
            desc: 'Siparişler otomatik aktarılır, stok senkronize olur',
        },
        {
            name: 'Muhasebe',
            platforms: ['Logo', 'Netsis', 'Mikro', 'Luca', 'Paraşüt'],
            desc: 'Fiş ve faturalar otomatik muhasebe yazılımına aktarılır',
        },
        {
            name: 'Kargo',
            platforms: ['MNG', 'Yurtiçi', 'Aras', 'PTT', 'Sürat'],
            desc: 'Toplu etiket basımı, kargo takibi, otomatik bildirim',
        },
        {
            name: 'Bankacılık',
            platforms: ['İş Bankası', 'Garanti', 'Akbank', 'Yapı Kredi', 'QNB'],
            desc: 'Açık Bankacılık ile canlı hesap hareketleri',
        },
    ];
    const useCases = [
        {
            title: 'Kafe Zinciri - 8 Şube - İstanbul',
            icon: '☕',
            challenge: 'Her şubenin ayrı kasası, hangi şubenin karlı olduğunu bilmiyorlar. Stok sayımı manuel yapılıyor.',
            solution: 'ADE ile tüm şubeler merkezi panelden izleniyor. AI her sabah şube performans raporu gönderiyor. Stok otomatik sayılıyor.',
            results: [
                { metric: 'Operasyonel Verimlilik', value: '%45 artış', color: 'text-green-400' },
                { metric: 'Stok Maliyeti', value: '%30 azalma', color: 'text-teal-400' },
                { metric: 'Zaman Tasarrufu', value: '25 saat/hafta', color: 'text-amber-400' },
            ],
        },
        {
            title: 'Giyim Mağazası - 5 Mağaza - Ankara',
            icon: '👔',
            challenge: 'Mevsimlik ürünlerde stok sıkışması yaşıyorlar. Hangi ürünün hangi şubede satıldığını bilmiyorlar.',
            solution: 'AI satış geçmişini analiz edip her şube için sipariş önerisi veriyor. Satışı düşük ürünler otomatik indirime giriyor.',
            results: [
                { metric: 'Stok Devir Hızı', value: '2.1x', color: 'text-purple-400' },
                { metric: 'Kar Marjı', value: '%18 artış', color: 'text-green-400' },
                { metric: 'Fire Oranı', value: '%65 azalma', color: 'text-teal-400' },
            ],
        },
        {
            title: 'Restoran Grubu - 12 Şube - İzmir',
            icon: '🍽️',
            challenge: 'Her şubenin mutfak maliyeti farklı. Tedarikçi faturaları manuel girilince hata oluyor.',
            solution: 'Tedarikçi faturaları otomatik sisteme düşüyor. AI her şubenin malzeme kullanımını analiz edip fire uyarısı veriyor.',
            results: [
                { metric: 'Malzeme Maliyeti', value: '%22 azalma', color: 'text-teal-400' },
                { metric: 'Fire Oranı', value: '%40 düşüş', color: 'text-green-400' },
                { metric: 'Fatura Giriş Hatası', value: 'Sıfıra indi', color: 'text-amber-400' },
            ],
        },
    ];
    const advancedFeatures = [
        {
            title: 'AI Satış Tahminleme',
            desc: 'Geçmiş satış verileri, mevsimsellik, kampanyalar, hava durumu analiz edilerek gelecek 90 gün için satış tahmini',
            icon: ArrowTrendingUpIcon,
            stats: ['%92 doğruluk oranı', '90 günlük tahmin', 'Ürün bazlı analiz'],
        },
        {
            title: 'Otomatik Sipariş Önerisi',
            desc: 'Stok seviyeleri, satış hızı ve tedarik süreleri göz önünde bulundurularak otomatik sipariş önerisi',
            icon: CubeIcon,
            stats: ['%30 stok tasarrufu', 'Sıfır stoksuzluk', 'ABC analiz destekli'],
        },
        {
            title: 'Müşteri Segmentasyonu',
            desc: 'RFM analizi ile müşteri segmentleri oluşturulur. Her segment için özel kampanya önerileri',
            icon: UsersIcon,
            stats: ['5 farklı segment', '%35 conversion artışı', 'Kişiselleştirilmiş kampanya'],
        },
        {
            title: 'Dinamik Fiyatlandırma',
            desc: 'Rakip fiyatları, stok durumu, talep yoğunluğuna göre AI fiyat önerileri',
            icon: BanknotesIcon,
            stats: ['Gerçek zamanlı', '%12 kar artışı', 'Rekabetçi analiz'],
        },
    ];
    const pricing = [
        {
            name: 'Business',
            price: '999',
            description: 'Küçük ve orta ölçekli işletmeler için',
            features: [
                '5 şubeye kadar',
                '10 kullanıcı',
                'Sınırsız fatura',
                'Gelişmiş raporlama',
                'Stok yönetimi',
                'E-ticaret entegrasyonu (2 platform)',
                'AI satış tahmini',
                'Email destek',
            ],
            highlighted: false,
        },
        {
            name: 'Business Pro',
            price: '2.499',
            description: 'Büyüyen işletmeler için tam özellikli',
            features: [
                '20 şubeye kadar',
                'Sınırsız kullanıcı',
                'Sınırsız fatura',
                'Tüm gelişmiş raporlar',
                'Çoklu depo yönetimi',
                'Tüm e-ticaret entegrasyonları',
                'AI tahminleme + Sipariş önerisi',
                'Müşteri segmentasyonu',
                'CRM entegrasyonu',
                'Öncelikli destek',
                'API erişimi',
            ],
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: 'Özel',
            description: 'Kurumsal çözümler',
            features: [
                'Sınırsız şube',
                'Sınırsız kullanıcı',
                'White-label çözüm',
                'Özel entegrasyonlar',
                'Özel AI modelleri',
                '99.95% SLA',
                'Hesap yöneticisi',
                '7/24 canlı destek',
                'Özel eğitim',
                'On-premise seçeneği',
            ],
            highlighted: false,
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl", style: { animationDelay: '2s' } }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-5xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8", children: [_jsx(CpuChipIcon, { className: "w-5 h-5 text-teal-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "AI Destekli \u00C7oklu \u015Eube Y\u00F6netimi" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8 leading-tight", children: [_jsx("span", { className: "text-white", children: "KOB\u0130'ler i\u00E7in" }), _jsx("br", {}), _jsx("span", { className: "text-gradient-amber-teal", children: "Ak\u0131ll\u0131 \u0130\u015Fletme Y\u00F6netimi" })] }), _jsx("p", { className: "text-xl md:text-2xl text-white/70 mb-12 leading-relaxed", children: "T\u00FCm \u015Fubelerinizi tek panelden y\u00F6netin. AI ile sat\u0131\u015F tahmini, otomatik stok sipari\u015Fi, geli\u015Fmi\u015F analitik. B\u00FCy\u00FCyen i\u015Fletmeniz i\u00E7in eksiksiz \u00E7\u00F6z\u00FCm." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 mb-16", children: [_jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg", children: "14 G\u00FCn \u00DCcretsiz Dene" }), _jsx(Link, { to: "#features", className: "btn-secondary text-lg", children: "\u00D6zellikleri \u0130ncele" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                        { value: '12.500+', label: 'KOBİ Kullanıcı' },
                                        { value: '3.400', label: 'Ortalama Şube Sayısı' },
                                        { value: '%45', label: 'Operasyonel Verimlilik Artışı' },
                                        { value: '4.9/5', label: 'Kullanıcı Memnuniyeti' },
                                    ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("div", { className: "text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { id: "features", className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "KOB\u0130'ler i\u00E7in " }), _jsx("span", { className: "text-gradient-amber-teal", children: "\u00D6zel \u00D6zellikler" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "B\u00FCy\u00FCyen i\u015Fletmenizin ihtiya\u00E7 duydu\u011Fu t\u00FCm ara\u00E7lar tek platformda" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 group", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(feature.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: feature.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Yapay Zeka " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Yetenekleri" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "AI destekli ak\u0131ll\u0131 \u00F6zellikler i\u015Fletmenizi bir ad\u0131m \u00F6ne ta\u015F\u0131r" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: advancedFeatures.map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0", children: _jsx(feature.icon, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: feature.title }), _jsx("p", { className: "text-white/70 mb-4 leading-relaxed", children: feature.desc }), _jsx("div", { className: "flex flex-wrap gap-2", children: feature.stats.map((stat, sIndex) => (_jsx("span", { className: "px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium", children: stat }, sIndex))) })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "G\u00FC\u00E7l\u00FC " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Entegrasyonlar" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Kulland\u0131\u011F\u0131n\u0131z t\u00FCm platformlarla sorunsuz \u00E7al\u0131\u015F\u0131r" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: integrations.map((integration, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: integration.name }), _jsx("p", { className: "text-white/60 mb-6", children: integration.desc }), _jsx("div", { className: "flex flex-wrap gap-2", children: integration.platforms.map((platform, pIndex) => (_jsx("span", { className: "px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-colors", children: platform }, pIndex))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ba\u015Far\u0131 " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Hikayeleri" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Ger\u00E7ek KOB\u0130'lerden ger\u00E7ek sonu\u00E7lar" })] }), _jsx("div", { className: "space-y-12", children: useCases.map((useCase, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-8 md:p-12", children: [_jsxs("div", { className: "flex items-start gap-6 mb-8", children: [_jsx("div", { className: "text-6xl", children: useCase.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-6", children: useCase.title }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "glass-card p-6 border-l-4 border-red-500", children: [_jsx("span", { className: "text-red-400 font-semibold mb-2 block", children: "Zorluk" }), _jsx("p", { className: "text-white/80", children: useCase.challenge })] }), _jsxs("div", { className: "glass-card p-6 border-l-4 border-teal-500", children: [_jsx("span", { className: "text-teal-400 font-semibold mb-2 block", children: "ADE \u00C7\u00F6z\u00FCm\u00FC" }), _jsx("p", { className: "text-white/80", children: useCase.solution })] })] })] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: useCase.results.map((result, rIndex) => (_jsxs("div", { className: "glass-card p-6 text-center", children: [_jsx("div", { className: `text-4xl font-bold ${result.color} mb-2`, children: result.value }), _jsx("div", { className: "text-white/60 text-sm", children: result.metric })] }, rIndex))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "\u00D6l\u00E7eklenebilir " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Fiyatland\u0131rma" })] }), _jsx("p", { className: "text-xl text-white/70", children: "\u0130\u015Fletmenizin b\u00FCy\u00FCmesine g\u00F6re \u00F6l\u00E7eklenen planlar" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: pricing.map((plan, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: `glass-card p-8 relative ${plan.highlighted ? 'border-2 border-teal-500 shadow-2xl shadow-teal-500/20' : ''}`, children: [plan.highlighted && (_jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white text-sm font-semibold", children: "En Pop\u00FCler" })), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: plan.name }), _jsx("div", { className: "mb-4", children: plan.price === 'Özel' ? (_jsx("span", { className: "text-5xl font-bold text-gradient-amber-teal", children: plan.price })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-5xl font-bold text-gradient-amber-teal", children: plan.price }), _jsx("span", { className: "text-white/60 ml-2", children: "TL / ay" })] })) }), _jsx("p", { className: "text-white/70 mb-8", children: plan.description }), _jsx("ul", { className: "space-y-3 mb-8", children: plan.features.map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-white/80", children: feature })] }, i))) }), _jsx(Link, { to: plan.price === 'Özel' ? '/contact' : '/kayit-ol', className: `block w-full text-center ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`, children: plan.price === 'Özel' ? 'İletişime Geç' : '14 Gün Ücretsiz Dene' })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-teal-900/20 via-purple-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "\u0130\u015Fletmenizi " }), _jsx("span", { className: "text-gradient-amber-teal", children: "D\u00F6n\u00FC\u015Ft\u00FCr\u00FCn" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8 max-w-2xl mx-auto", children: "12.500+ KOB\u0130 ADE ile b\u00FCy\u00FCyor. Siz de i\u015Fletmenizi bir sonraki seviyeye ta\u015F\u0131y\u0131n." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg px-12 py-6", children: "14 G\u00FCn \u00DCcretsiz Dene" }), _jsx(Link, { to: "/contact", className: "btn-secondary text-lg px-12 py-6", children: "Demo Talep Et" })] }), _jsx("p", { className: "text-sm text-white/50 mt-6", children: "Kredi kart\u0131 gerekmez \u2022 \u0130stedi\u011Fin zaman iptal et \u2022 Kurulum deste\u011Fi dahil" })] }) }) }), _jsx(Footer, {})] }));
}
