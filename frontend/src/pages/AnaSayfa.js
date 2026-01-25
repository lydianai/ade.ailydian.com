import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SparklesIcon, ShieldCheckIcon, BoltIcon, ChartBarIcon, DocumentTextIcon, UserGroupIcon, ArrowRightIcon, CheckIcon, BuildingOffice2Icon, CloudArrowUpIcon, CpuChipIcon, ShoppingBagIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function AnaSayfa() {
    const features = [
        {
            icon: CpuChipIcon,
            title: 'Yapay Zeka Destekli',
            description: 'Son nesil yapay zeka teknolojisi ile güçlendirilmiş asistanınız. Türk hukuku ve mevzuatı üzerine özel eğitilmiş, proaktif öneriler sunar.',
            gradient: 'from-amber-500 to-orange-500',
        },
        {
            icon: ShoppingBagIcon,
            title: 'E-Ticaret Entegrasyonu',
            description: 'Hepsiburada, Trendyol, N11, Amazon TR. Tüm satış kanallarınızı tek yerden yönetin, AI önerileri ile satışları artırın.',
            gradient: 'from-orange-500 to-red-500',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Hukuken Geçerli İşlemler',
            description: 'e-İmza entegrasyonu ile kestiğiniz faturalar ve yaptığınız beyannameler hukuken geçerlidir.',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: BoltIcon,
            title: 'Proaktif Bildirimler',
            description: 'Vergilerinizi, SGK primlerinizi unutmayın. ADE size hatırlatır ve onayınızla otomatik öder.',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: BuildingOffice2Icon,
            title: '18 Bakanlık Entegrasyonu',
            description: 'e-Devlet, GİB, SGK, MERSIS, UYAP ve daha fazlası. Tek platformdan tüm devlet işlemleri.',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: DocumentTextIcon,
            title: 'Otomatik Muhasebe',
            description: 'e-Fatura, e-İrsaliye, yevmiye defteri otomatik oluşturulur. 10 yıl arşivleme dahil.',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: ChartBarIcon,
            title: 'Tahminleme & Analiz',
            description: 'AI ile satış tahmini, stok optimizasyonu, nakit akışı analizi. Geleceği görün.',
            gradient: 'from-rose-500 to-red-500',
        },
    ];
    const integrations = [
        { name: 'Hepsiburada', logo: '🛍️', desc: 'E-Ticaret Yönetimi' },
        { name: 'Trendyol', logo: '🛒', desc: 'Sipariş & Satış' },
        { name: 'e-Devlet', logo: '🏛️', desc: '8.000+ hizmet' },
        { name: 'GİB', logo: '💼', desc: 'e-Fatura, e-Arşiv' },
        { name: 'SGK', logo: '🏥', desc: 'Sigorta, Prim' },
        { name: 'MERSIS', logo: '🏢', desc: 'Şirket Kuruluşu' },
        { name: 'UYAP', logo: '⚖️', desc: 'Dava Takibi' },
        { name: 'MHRS', logo: '🩺', desc: 'Sağlık Randevusu' },
        { name: 'e-İmza', logo: '✍️', desc: 'Dijital İmza' },
        { name: 'Açık Bankacılık', logo: '🏦', desc: 'Finansal Veri' },
        { name: 'N11', logo: '🏪', desc: 'Çoklu Platform' },
        { name: 'Amazon TR', logo: '📦', desc: 'FBA Yönetimi' },
    ];
    const useCases = [
        {
            type: 'E-Ticaret',
            icon: '🛍️',
            title: 'Ayşe - Ev Tekstili Satıcısı',
            problem: 'Hepsiburada, Trendyol, N11\'de 487 sipariş biriken, hangi ürün karlı bilmiyor, stok karmaşası',
            solution: 'AI: "Ayşe Hanım, bugün 127 yeni sipariş 🔥 Havlu setinizin fiyatını ₺89\'dan ₺79\'a düşürürseniz satışlar %42 artar. Trendyol\'da 3 adet kaldı, N11\'den 8 adet sipariş geldi. Hepsini tek tıkla kargoya hazırlıyorum, e-Faturalar oluşturuldu."',
            result: '✅ Tüm platformlar tek yerden, ✅ AI fiyat optimizasyonu, ✅ Otomatik stok senkronizasyonu, ✅ E-Fatura entegrasyonu',
        },
        {
            type: 'Esnaf',
            icon: '🏪',
            title: 'Bakkal Ahmet Amca',
            problem: 'e-Fatura sistemi çok karmaşık, SGK primini geç öder',
            solution: '"ADE, bugün ne satış yaptım?" → AI: "47 satış, 2.340 TL. Yarın KDV beyannamen var, vergini hesapladım: 1.850 TL. İstersen ödüyorum?"',
            result: '✅ Tüm satışlar otomatik e-Fatura, ✅ Vergi zamanında ödeniyor',
        },
        {
            type: 'KOBİ',
            icon: '☕',
            title: 'Kafe Sahibi Elif',
            problem: '3 şubesi var, hangi şube karlı bilmiyor',
            solution: 'AI sabah raporu: "Kadıköy: 8.450 TL ✅, Beşiktaş: 5.230 TL ⚠️ (%15 düşük), Beyoğlu: 11.900 TL 🔥 (rekor!)"',
            result: '✅ Şube bazlı kar/zarar, ✅ Stok uyarıları, ✅ AI önerileri',
        },
        {
            type: 'Vatandaş',
            icon: '👵',
            title: 'Emekli Fatma Teyze',
            problem: 'Elektrik faturasını geç ödüyor, hastane randevusu alamıyor',
            solution: 'AI sesli: "Fatma Teyze, elektrik faturanız 385 TL, son ödeme bugün. İstersen ödüyorum? Yarın kardiyoloji randevunuz var."',
            result: '✅ Tüm faturalar zamanında, ✅ Reçete takibi, ✅ Sesli asistan',
        },
    ];
    const pricingPlans = [
        {
            name: 'Ücretsiz',
            price: '0',
            period: 'süresiz',
            description: 'Bireysel kullanım ve küçük esnaflar için',
            features: [
                '10 fatura/ay',
                'Temel muhasebe',
                'e-Devlet entegrasyonu',
                'Vergi takibi',
                'Email destek',
            ],
            cta: 'Hemen Başla',
            popular: false,
        },
        {
            name: 'Pro',
            price: '299',
            period: 'aylık',
            description: 'Büyüyen işletmeler için tam özellikli paket',
            features: [
                'Sınırsız fatura',
                'Tam muhasebe (defter, mizan)',
                'Stok yönetimi',
                'AI tahminleme',
                '18 bakanlık entegrasyonu',
                'Marketplace (Trendyol, Hepsiburada)',
                'Öncelikli destek',
                'API erişimi',
            ],
            cta: '14 Gün Ücretsiz Dene',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: '2.499',
            period: 'aylık',
            description: 'Kurumsal çözümler ve özel ihtiyaçlar',
            features: [
                'Pro\'daki her şey',
                'Çoklu kullanıcı yönetimi',
                'Özel API limitleri',
                'White-label çözüm',
                '99.95% SLA garantisi',
                'Özel eğitim',
                '7/24 canlı destek',
                'Hesap yöneticisi',
            ],
            cta: 'İletişime Geç',
            popular: false,
        },
    ];
    const testimonials = [
        {
            name: 'Mehmet Yılmaz',
            role: 'Bakkal Sahibi, İstanbul',
            avatar: '👨‍💼',
            text: 'ADE olmadan önce muhasebeciye ayda 3.000 TL veriyordum. Şimdi sadece 299 TL. Hem daha hızlı, hem daha kolay. AI asistanım her şeyi anlatıyor.',
            rating: 5,
        },
        {
            name: 'Ayşe Demir',
            role: 'Kuaför, Ankara',
            text: 'Instagram\'dan gelen randevuları ADE otomatik alıyor. Müşteri geldi mi hatırlatma yapıyor. Fiyatları bile güncelliyor. İnanılmaz!',
            avatar: '👩‍💼',
            rating: 5,
        },
        {
            name: 'Can Öztürk',
            role: 'E-ticaret Girişimci, İzmir',
            text: 'Trendyol\'dan sipariş geldi mi, ADE otomatik fatura kesiyor, stoktan düşüyor, kargo etiketi hazırlıyor. 1 saatlik işi 10 saniyede yapıyor.',
            avatar: '👨‍💻',
            rating: 5,
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl", style: { animationDelay: '2s' } }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "text-center max-w-5xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 mb-8", children: [_jsx(SparklesIcon, { className: "w-5 h-5 text-amber-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "T\u00FCrkiye'nin \u0130lk Yapay Zeka Devlet Asistan\u0131" })] }), _jsxs(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight", children: [_jsx("span", { className: "text-white", children: "Her Vatanda\u015F\u0131n" }), _jsx("br", {}), _jsx("span", { className: "text-white", children: "Cebinde" }), _jsx("br", {}), _jsx("span", { className: "text-gradient-amber-teal", children: "Devlet Dan\u0131\u015Fman\u0131" })] }), _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, className: "text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto", children: "18 bakanl\u0131k ve kurumla entegre, yapay zeka destekli, hukuken ge\u00E7erli i\u015Flemler yapabilen tek platform. Vergilerinizi, SGK primlerinizi, faturalar\u0131n\u0131z\u0131 otomatik y\u00F6netin." }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.9 }, className: "grid grid-cols-2 md:grid-cols-4 gap-8 mt-20", children: [
                                        { value: '18', label: 'Bakanlık Entegrasyonu' },
                                        { value: '7/24', label: 'Kesintisiz Hizmet' },
                                        { value: '%80', label: 'Zaman Tasarrufu' },
                                        { value: '99.95%', label: 'Uptime Garantisi' },
                                    ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("div", { className: "text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { id: "features", className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Neden " }), _jsx("span", { className: "text-gradient-amber-teal", children: "ADE?" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "D\u00FCnyada ilk ve tek: Proaktif devlet asistan\u0131. Sadece bilgi vermez, sizin ad\u0131n\u0131za i\u015Flem yapar." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 group", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(feature.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: feature.description })] }, index))) })] }) }), _jsx("section", { id: "how-it-works", className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Nas\u0131l " }), _jsx("span", { className: "text-gradient-purple-pink", children: "\u00C7al\u0131\u015F\u0131r?" })] }), _jsx("p", { className: "text-xl text-white/70", children: "3 basit ad\u0131mda ba\u015Flay\u0131n" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-12 max-w-5xl mx-auto", children: [
                                {
                                    step: '1',
                                    title: 'Kayıt Ol',
                                    description: 'e-Devlet ile giriş yap veya email ile kaydol. 2 dakika sürer.',
                                    icon: UserGroupIcon,
                                },
                                {
                                    step: '2',
                                    title: 'Entegrasyonları Bağla',
                                    description: 'GİB, SGK, e-Devlet hesaplarını bağla. e-İmza ile onaylarsın, hepsi hazır.',
                                    icon: CloudArrowUpIcon,
                                },
                                {
                                    step: '3',
                                    title: 'AI Yönetsin',
                                    description: 'Artık rahat ol. ADE vergilerini öder, fatura keser, sana sadece haber verir.',
                                    icon: CpuChipIcon,
                                },
                            ].map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.2 }, className: "relative", children: [index < 2 && (_jsx("div", { className: "hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent" })), _jsxs("div", { className: "glass-card p-8 text-center", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white", children: item.step }), _jsx(item.icon, { className: "w-12 h-12 text-amber-400 mx-auto mb-4" }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: item.title }), _jsx("p", { className: "text-white/70", children: item.description })] })] }, index))) })] }) }), _jsxs("section", { className: "section-padding bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-transparent relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsx("div", { className: "absolute inset-0", style: {
                                backgroundImage: 'linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)',
                                backgroundSize: '50px 50px'
                            } }) }), _jsxs("div", { className: "container-custom relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs(motion.div, { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 font-medium text-sm mb-6", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-orange-400" })] }), "Geli\u015Fmi\u015F Yapay Zeka Altyap\u0131s\u0131 ile G\u00FC\u00E7lendirildi"] }), _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Sesli " }), _jsx("span", { className: "text-gradient-amber-teal", children: "ADE Asistan" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "T\u00FCrk\u00E7e konu\u015Fan, sizi tan\u0131yan, 7/24 yan\u0131n\u0131zda olan yapay zeka asistan\u0131. T\u00FCm devlet i\u015Flemlerinizi sesli komutla yap\u0131n." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "lg:sticky lg:top-24", children: [_jsxs("div", { className: "glass-card-premium overflow-hidden", children: [_jsx("div", { className: "bg-gradient-to-r from-orange-600 to-amber-600 p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { animate: {
                                                                        scale: [1, 1.1, 1],
                                                                    }, transition: {
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                    }, className: "w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm", children: _jsx("svg", { className: "w-7 h-7 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" }) }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg text-white", children: "ADE Sesli Asistan" }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-white/90", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-400" })] }), _jsx("span", { children: "\u00C7evrimi\u00E7i" })] })] })] }) }), _jsxs("div", { className: "p-6 space-y-6 min-h-[400px] bg-gradient-to-b from-slate-900/50 to-slate-800/50", children: [_jsx(motion.div, { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "flex justify-end", children: _jsxs("div", { className: "max-w-[80%]", children: [_jsx("div", { className: "bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl rounded-tr-sm p-4 shadow-xl", children: _jsx("p", { className: "text-white font-medium", children: "ADE, Ahmet Y\u0131lmaz'a 10.000 TL fatura kes" }) }), _jsxs("div", { className: "flex items-center justify-end gap-2 mt-2 text-xs text-white/50", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" }) }), "Sesli Komut"] })] }) }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-center gap-2", children: [_jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => (_jsx(motion.div, { className: "w-2 h-2 bg-orange-400 rounded-full", animate: { y: [0, -8, 0] }, transition: {
                                                                                duration: 0.6,
                                                                                repeat: Infinity,
                                                                                delay: i * 0.1,
                                                                            } }, i))) }), _jsx("span", { className: "text-sm text-white/50", children: "ADE d\u00FC\u015F\u00FCn\u00FCyor..." })] }), _jsx(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: 0.5 }, className: "flex justify-start", children: _jsxs("div", { className: "max-w-[85%]", children: [_jsx("div", { className: "glass-card rounded-2xl rounded-tl-sm p-4 shadow-xl border border-orange-500/20", children: _jsxs("p", { className: "text-white/90 leading-relaxed", children: ["Tabii, Ahmet Y\u0131lmaz i\u00E7in 10.000 TL tutar\u0131nda fatura haz\u0131rlad\u0131m. KDV %20 olarak 2.000 TL hesapland\u0131. Toplam ", _jsx("span", { className: "font-bold text-orange-400", children: "12.000 TL" }), ". G\u0130B'e g\u00F6ndermemi ister misiniz?"] }) }), _jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs text-white/50", children: [_jsx("svg", { className: "w-4 h-4 text-green-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), "Yan\u0131t s\u00FCresi: 2.3 saniye"] })] }) })] }), _jsx("div", { className: "p-6 bg-slate-900/80 border-t border-white/10", children: _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-2xl transition-all", children: [_jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" }) }), "Sesli Asistan\u0131 Dene"] }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.3 }, className: "mt-6 glass-card p-6", children: [_jsxs("h4", { className: "font-bold text-white mb-4 flex items-center gap-2", children: [_jsx(CpuChipIcon, { className: "w-5 h-5 text-orange-400" }), "Teknoloji Altyap\u0131s\u0131"] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 bg-white/5 rounded-lg border border-orange-500/20", children: [_jsx("p", { className: "text-xs text-white/50 mb-1", children: "Ses Tan\u0131ma" }), _jsx("p", { className: "font-semibold text-sm text-white", children: "Kurumsal STT Motoru" })] }), _jsxs("div", { className: "p-3 bg-white/5 rounded-lg border border-orange-500/20", children: [_jsx("p", { className: "text-xs text-white/50 mb-1", children: "Yapay Zeka \u00C7ekirde\u011Fi" }), _jsx("p", { className: "font-semibold text-sm text-white", children: "ADE Neural Engine" })] }), _jsxs("div", { className: "p-3 bg-white/5 rounded-lg border border-orange-500/20", children: [_jsx("p", { className: "text-xs text-white/50 mb-1", children: "Ki\u015Fiselle\u015Ftirme" }), _jsx("p", { className: "font-semibold text-sm text-white", children: "ADE Persona AI" })] }), _jsxs("div", { className: "p-3 bg-white/5 rounded-lg border border-orange-500/20", children: [_jsx("p", { className: "text-xs text-white/50 mb-1", children: "Ses Sentezi" }), _jsx("p", { className: "font-semibold text-sm text-white", children: "Kurumsal TTS Motoru" })] })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "space-y-4", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: "\u00D6rnek Senaryolar" }), [
                                                {
                                                    icon: DocumentTextIcon,
                                                    title: 'e-Fatura Kesimi',
                                                    desc: 'Sesli komutla saniyeler içinde fatura kesin, otomatik GİB gönderimi',
                                                    time: '2.3 saniye',
                                                    color: 'from-orange-500 to-amber-500',
                                                },
                                                {
                                                    icon: ChartBarIcon,
                                                    title: 'Vergi Hesaplama',
                                                    desc: '"Bu ay ne kadar vergi ödeyeceğim?" sorusuna anında detaylı yanıt',
                                                    time: '1.8 saniye',
                                                    color: 'from-amber-500 to-yellow-500',
                                                },
                                                {
                                                    icon: UserGroupIcon,
                                                    title: 'SGK İşlemleri',
                                                    desc: 'Yeni çalışan girişi, çıkışı ve prim bildirimi sesli komutla',
                                                    time: '2.1 saniye',
                                                    color: 'from-teal-500 to-cyan-500',
                                                },
                                                {
                                                    icon: BoltIcon,
                                                    title: 'Proaktif Uyarılar',
                                                    desc: 'Son ödeme tarihleri, eksik beyannameler için otomatik hatırlatma',
                                                    time: 'Otomatik',
                                                    color: 'from-purple-500 to-pink-500',
                                                },
                                            ].map((scenario, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, whileHover: { scale: 1.02, x: 5 }, className: "glass-card p-6 border-l-4 border-orange-500 hover:border-amber-400 transition-all cursor-pointer", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center flex-shrink-0`, children: _jsx(scenario.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-bold text-lg text-white mb-1", children: scenario.title }), _jsx("p", { className: "text-sm text-white/60 mb-3", children: scenario.desc }), _jsxs("div", { className: "inline-flex px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold", children: ["\u26A1 ", scenario.time] })] })] }) }, index)))] })] })] })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ger\u00E7ek " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Kullan\u0131c\u0131 Hikayeleri" })] }) }), _jsx("div", { className: "space-y-12", children: useCases.map((useCase, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, whileHover: { scale: 1.02, y: -5 }, className: `relative ${index === 0
                                    ? 'glass-card-premium p-8 md:p-12 border-2 border-orange-500/40 shadow-2xl shadow-orange-500/20 bg-gradient-to-br from-orange-500/10 to-pink-500/10'
                                    : 'glass-card-premium p-8 md:p-12'}`, children: [index === 0 && (_jsx("div", { className: "absolute top-4 right-4", children: _jsx(motion.div, { animate: {
                                                scale: [1, 1.2, 1],
                                                opacity: [0.7, 1, 0.7],
                                            }, transition: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }, className: "px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold", children: "\uD83D\uDD25 YEN\u0130" }) })), _jsxs("div", { className: "flex items-start gap-6", children: [_jsx(motion.div, { className: "text-6xl", animate: index === 0
                                                    ? {
                                                        rotate: [0, 10, -10, 0],
                                                        scale: [1, 1.1, 1],
                                                    }
                                                    : {}, transition: index === 0
                                                    ? {
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: 'easeInOut',
                                                    }
                                                    : {}, children: useCase.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: `inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${index === 0
                                                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                                                            : 'bg-amber-500/20 text-amber-400'}`, children: useCase.type }), _jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: useCase.title }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-red-400 font-semibold", children: "\u274C Sorun: " }), _jsx("span", { className: "text-white/70", children: useCase.problem })] }), _jsxs("div", { className: `glass-card p-4 border-l-4 ${index === 0 ? 'border-orange-500 bg-orange-500/5' : 'border-teal-500'}`, children: [_jsxs("span", { className: `font-semibold ${index === 0 ? 'text-orange-400' : 'text-teal-400'}`, children: ["\uD83D\uDCAC ADE \u00C7\u00F6z\u00FCm\u00FC:", ' '] }), _jsx("p", { className: "text-white/90 mt-2 italic", children: useCase.solution })] }), _jsxs("div", { children: [_jsx("span", { className: "text-green-400 font-semibold", children: "\u2728 Sonu\u00E7: " }), _jsx("span", { className: "text-white/70", children: useCase.result })] })] })] })] })] }, index))) })] }) }), _jsx("section", { id: "integrations", className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "18 Resmi " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Entegrasyon" })] }), _jsx("p", { className: "text-xl text-white/70", children: "T\u00FCm devlet kurumlar\u0131 tek platformda" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: integrations.map((integration, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.05 }, className: "glass-card p-6 text-center group hover:scale-105 transition-transform", children: [_jsx("div", { className: "text-5xl mb-4", children: integration.logo }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: integration.name }), _jsx("p", { className: "text-sm text-white/60", children: integration.desc })] }, index))) })] }) }), _jsx("section", { id: "pricing", className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "\u015Eeffaf " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Fiyatland\u0131rma" })] }), _jsx("p", { className: "text-xl text-white/70", children: "14 g\u00FCn \u00FCcretsiz dene, istedi\u011Fin zaman iptal et" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: pricingPlans.map((plan, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: `glass-card p-8 relative ${plan.popular ? 'border-2 border-amber-500 shadow-2xl shadow-amber-500/20' : ''}`, children: [plan.popular && (_jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-teal-500 text-white text-sm font-semibold", children: "En Pop\u00FCler" })), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: plan.name }), _jsx("div", { className: "mb-4", children: _jsx("span", { className: "text-5xl font-bold text-gradient-amber-teal", children: "Planlan\u0131yor" }) }), _jsx("p", { className: "text-white/70 mb-8", children: plan.description }), _jsx("ul", { className: "space-y-3 mb-8", children: plan.features.map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckIcon, { className: "w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-white/80", children: feature })] }, i))) }), _jsx(Link, { to: "/kayit-ol", className: `block w-full text-center ${plan.popular ? 'btn-primary' : 'btn-secondary'}`, children: plan.cta })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Kullan\u0131c\u0131lar\u0131m\u0131z " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Ne Diyor?" })] }) }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: testimonials.map((testimonial, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8", children: [_jsxs("div", { className: "flex items-center gap-4 mb-6", children: [_jsx("div", { className: "text-5xl", children: testimonial.avatar }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-white", children: testimonial.name }), _jsx("div", { className: "text-sm text-white/60", children: testimonial.role })] })] }), _jsx("div", { className: "flex gap-1 mb-4", children: [...Array(testimonial.rating)].map((_, i) => (_jsx("span", { className: "text-amber-400", children: "\u2605" }, i))) }), _jsxs("p", { className: "text-white/80 italic", children: ["\"", testimonial.text, "\""] })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-amber-500/10 via-teal-500/10 to-purple-500/10", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Haz\u0131r m\u0131s\u0131n? " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Hemen ba\u015Fla!" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8 max-w-2xl mx-auto", children: "18 bakanl\u0131k entegrasyonu, tek platform. Devlet hizmetlerinde yapay zeka devrimi ba\u015Fl\u0131yor." }), _jsxs(Link, { to: "/kayit-ol", className: "btn-primary text-lg px-12 py-6 inline-flex items-center gap-3", children: ["14 G\u00FCn \u00DCcretsiz Dene", _jsx(ArrowRightIcon, { className: "w-6 h-6" })] }), _jsx("p", { className: "text-sm text-white/50 mt-6", children: "Kredi kart\u0131 gerekmez \u2022 \u0130stedi\u011Fin zaman iptal et \u2022 24/7 destek" })] }) }) }), _jsx(Footer, {})] }));
}
