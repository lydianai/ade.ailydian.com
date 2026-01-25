import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BuildingOffice2Icon, ShieldCheckIcon, CpuChipIcon, UserGroupIcon, ServerIcon, ClockIcon, ChartBarIcon, CheckCircleIcon, PhoneIcon, CodeBracketIcon, LockClosedIcon, GlobeAltIcon, } from '@heroicons/react/24/outline';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function Enterprise() {
    const features = [
        {
            icon: BuildingOffice2Icon,
            title: 'White-Label Çözüm',
            desc: 'ADE\'yi kendi markanız altında sunun. Logo, renk, domain tamamen sizin. Müşterileriniz sizin yazılımınızı kullanır.',
            gradient: 'from-amber-500 to-orange-500',
        },
        {
            icon: ShieldCheckIcon,
            title: '99.95% SLA Garantisi',
            desc: 'Kurumsal sözleşme, 7/24 izleme, otomatik yedekleme, disaster recovery planı dahil.',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: CpuChipIcon,
            title: 'Özel AI Modelleri',
            desc: 'Sektörünüze özel eğitilmiş AI modelleri. Kendi verilerinizle fine-tuning yapılır.',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: UserGroupIcon,
            title: 'Sınırsız Kullanıcı',
            desc: 'Tüm çalışanlarınız, şubeleriniz, bölümleriniz tek platformda. Rol bazlı yetkilendirme.',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: ServerIcon,
            title: 'On-Premise Seçeneği',
            desc: 'İsterseniz sunucularınızda çalışır. Tüm veriler sizin altyapınızda kalır.',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: CodeBracketIcon,
            title: 'Özel Entegrasyonlar',
            desc: 'ERP, CRM, WMS, BI araçlarınızla entegrasyon. Özel API endpointleri geliştiririz.',
            gradient: 'from-rose-500 to-red-500',
        },
    ];
    const enterpriseBenefits = [
        {
            title: 'Dedicated Account Manager',
            desc: 'Size özel hesap yöneticisi. 7/24 erişilebilir, ihtiyaçlarınızı önceden öngörür, çözüm sunar.',
            icon: PhoneIcon,
        },
        {
            title: 'Priority Support',
            desc: 'Destek taleplerinde öncelik. Ortalama yanıt süresi 15 dakika, çözüm süresi 4 saat.',
            icon: ClockIcon,
        },
        {
            title: 'Custom Training',
            desc: 'Ekibiniz için özel eğitim programları. Yüz yüze veya online, ihtiyaca göre tasarlanır.',
            icon: UserGroupIcon,
        },
        {
            title: 'Security Audits',
            desc: 'Yıllık penetrasyon testleri, güvenlik denetimleri, compliance raporları.',
            icon: LockClosedIcon,
        },
        {
            title: 'Custom Dashboards',
            desc: 'Yöneticileriniz için özel tasarlanmış dashboard\'lar. İstediğiniz metrikleri gösterir.',
            icon: ChartBarIcon,
        },
        {
            title: 'Multi-Region Support',
            desc: 'Birden fazla ülkede operasyon yapıyorsanız, multi-currency, multi-language destek.',
            icon: GlobeAltIcon,
        },
    ];
    const useCases = [
        {
            company: 'Holding A - 45 Grup Şirketi',
            industry: 'Konglomer',
            employees: '12.000+',
            challenge: 'Her şirketin farklı muhasebe yazılımı var. Konsolidasyon manuel yapılıyor. Raporlar 2 hafta geç geliyor.',
            solution: 'Tüm şirketler ADE Enterprise\'a geçirildi. Konsolide raporlar gerçek zamanlı hazırlanıyor. CFO tek dashboard\'dan her şeyi görüyor.',
            results: [
                { metric: 'Rapor Hazırlama Süresi', value: '15 gün → 2 saat', color: 'text-green-400' },
                { metric: 'Sistem Maliyeti', value: '%60 azalma', color: 'text-teal-400' },
                { metric: 'Operasyonel Verimlilik', value: '%40 artış', color: 'text-amber-400' },
            ],
        },
        {
            company: 'Franchise B - 280 Şube',
            industry: 'Restoran Zinciri',
            employees: '4.500+',
            challenge: 'Franchise\'lerin muhasebe kalitesi düşük. Merkez her şubeyi ayrı ayrı denetleyemiyor. Vergi riski yüksek.',
            solution: 'ADE White-Label çözümü franchise\'lere zorunlu tutuldu. Merkez her şubeyi canlı izliyor. AI denetim asistanı hataları önlüyor.',
            results: [
                { metric: 'Muhasebe Hatası', value: '%87 azalma', color: 'text-green-400' },
                { metric: 'Denetim Süresi', value: '%75 azalma', color: 'text-teal-400' },
                { metric: 'Franchise Memnuniyeti', value: '%92', color: 'text-amber-400' },
            ],
        },
    ];
    const securityCompliance = [
        {
            title: 'ISO 27001',
            desc: 'Bilgi güvenliği yönetim sistemi sertifikası',
            status: 'Sertifikalı',
        },
        {
            title: 'SOC 2 Type II',
            desc: 'Güvenlik, kullanılabilirlik, gizlilik denetimi',
            status: 'Sertifikalı',
        },
        {
            title: 'KVKK Uyumlu',
            desc: 'Türk kişisel veri koruma mevzuatına tam uyum',
            status: 'Uyumlu',
        },
        {
            title: 'PCI DSS',
            desc: 'Ödeme kartı veri güvenliği standardı',
            status: 'Level 1',
        },
        {
            title: 'GDPR',
            desc: 'Avrupa Genel Veri Koruma Tüzüğü',
            status: 'Uyumlu',
        },
        {
            title: 'ISO 9001',
            desc: 'Kalite yönetim sistemi',
            status: 'Sertifikalı',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl", style: { animationDelay: '2s' } }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-5xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/30 mb-8", children: [_jsx(BuildingOffice2Icon, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "Kurumsal \u00D6l\u00E7ekte AI Destekli Platform" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8 leading-tight", children: [_jsx("span", { className: "text-white", children: "Kurumsal" }), _jsx("br", {}), _jsx("span", { className: "text-gradient-amber-teal", children: "ADE \u00C7\u00F6z\u00FCmleri" })] }), _jsx("p", { className: "text-xl md:text-2xl text-white/70 mb-12 leading-relaxed", children: "White-label, on-premise, \u00F6zel entegrasyonlar, 99.95% SLA garantisi. B\u00FCy\u00FCk organizasyonlar i\u00E7in kurumsal destek ve \u00F6zellikler." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 mb-16", children: [_jsx(Link, { to: "/contact", className: "btn-primary text-lg", children: "Teklif Al\u0131n" }), _jsx(Link, { to: "#features", className: "btn-secondary text-lg", children: "\u00D6zellikleri \u0130ncele" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                        { value: '450+', label: 'Kurumsal Müşteri' },
                                        { value: '1.2M+', label: 'Aktif Kullanıcı' },
                                        { value: '99.95%', label: 'Uptime SLA' },
                                        { value: '15 dk', label: 'Ortalama Yanıt Süresi' },
                                    ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("div", { className: "text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { id: "features", className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Enterprise " }), _jsx("span", { className: "text-gradient-amber-teal", children: "\u00D6zellikler" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Kurumsal ihtiya\u00E7lar\u0131n\u0131z i\u00E7in \u00F6zel geli\u015Ftirilmi\u015F yetenekler" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 group", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(feature.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: feature.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Premium " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Destek" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Kurumsal m\u00FC\u015Fterilerimize \u00F6zel hizmetler" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: enterpriseBenefits.map((benefit, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8", children: [_jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6", children: _jsx(benefit.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: benefit.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: benefit.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "G\u00FCvenlik ve " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Uyumluluk" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Uluslararas\u0131 standartlara tam uyum" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: securityCompliance.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.05 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx(ShieldCheckIcon, { className: "w-12 h-12 text-green-400" }), _jsx("span", { className: "px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold", children: item.status })] }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: item.title }), _jsx("p", { className: "text-white/60 text-sm", children: item.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Kurumsal " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Referanslar" })] }), _jsx("p", { className: "text-xl text-white/70", children: "B\u00FCy\u00FCk organizasyonlardan ba\u015Far\u0131 hikayeleri" })] }), _jsx("div", { className: "space-y-12", children: useCases.map((useCase, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-8 md:p-12", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-6", children: [_jsx("h3", { className: "text-3xl font-bold text-white", children: useCase.company }), _jsx("span", { className: "px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-semibold", children: useCase.industry }), _jsxs("span", { className: "px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 font-semibold", children: [useCase.employees, " \u00E7al\u0131\u015Fan"] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6 border-l-4 border-red-500", children: [_jsx("span", { className: "text-red-400 font-semibold mb-2 block", children: "Zorluk" }), _jsx("p", { className: "text-white/80 text-lg", children: useCase.challenge })] }), _jsxs("div", { className: "glass-card p-6 border-l-4 border-teal-500", children: [_jsx("span", { className: "text-teal-400 font-semibold mb-2 block", children: "ADE Enterprise \u00C7\u00F6z\u00FCm\u00FC" }), _jsx("p", { className: "text-white/80 text-lg", children: useCase.solution })] })] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: useCase.results.map((result, rIndex) => (_jsxs("div", { className: "glass-card p-6 text-center", children: [_jsx("div", { className: `text-3xl font-bold ${result.color} mb-2`, children: result.value }), _jsx("div", { className: "text-white/60 text-sm", children: result.metric })] }, rIndex))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-12", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Kurumsal " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Fiyatland\u0131rma" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto mb-12", children: "Her kurumun ihtiyac\u0131 farkl\u0131d\u0131r. Size \u00F6zel paket haz\u0131rl\u0131yoruz." })] }), _jsx("div", { className: "max-w-3xl mx-auto", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center", children: [_jsx(BuildingOffice2Icon, { className: "w-20 h-20 text-purple-400 mx-auto mb-6" }), _jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: "\u00D6zel Teklif" }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Kullan\u0131c\u0131 say\u0131s\u0131, \u00F6zellikler ve destek seviyesine g\u00F6re \u00F6zel fiyat haz\u0131rl\u0131yoruz." }), _jsx("ul", { className: "space-y-3 mb-8 text-left max-w-xl mx-auto", children: [
                                            'Sınırsız kullanıcı ve şube',
                                            'White-label seçeneği',
                                            'On-premise kurulum',
                                            'Özel entegrasyonlar',
                                            '99.95% SLA garantisi',
                                            'Dedicated account manager',
                                            '7/24 premium destek',
                                            'Özel eğitim programı',
                                        ].map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircleIcon, { className: "w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-white/80 text-lg", children: feature })] }, i))) }), _jsx(Link, { to: "/contact", className: "btn-primary text-lg px-12 py-6 inline-flex items-center gap-3", children: "Teklif Talep Et" })] }) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-purple-900/20 via-amber-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "\u015Eirketinizi " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Gelece\u011Fe Ta\u015F\u0131y\u0131n" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8 max-w-2xl mx-auto", children: "450+ kurumsal m\u00FC\u015Fteri ADE Enterprise kullan\u0131yor. Siz de operasyonlar\u0131n\u0131z\u0131 dijitalle\u015Ftirin." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsx(Link, { to: "/contact", className: "btn-primary text-lg px-12 py-6", children: "\u0130leti\u015Fime Ge\u00E7in" }), _jsx(Link, { to: "#features", className: "btn-secondary text-lg px-12 py-6", children: "Daha Fazla Bilgi" })] }), _jsx("p", { className: "text-sm text-white/50 mt-6", children: "\u00DCcretsiz dan\u0131\u015Fmanl\u0131k \u2022 Demo sunum \u2022 POC deste\u011Fi" })] }) }) }), _jsx(Footer, {})] }));
}
