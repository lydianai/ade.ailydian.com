import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, Cog6ToothIcon, ShieldCheckIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Cookies() {
    const cookieTypes = [
        {
            name: 'Zorunlu �erezler',
            icon: CheckCircleIcon,
            required: true,
            description: 'Sitenin �al1_mas1 i�in gerekli �erezler. Devre d1_1 b1rak1lamaz.',
            examples: [
                'Oturum y�netimi (session)',
                'G�venlik tokenlari',
                'Kullan1c1 tercihleri (dil, tema)',
                'Load balancer �erezleri',
            ],
            duration: 'Oturum s�resi veya 30 g�n',
        },
        {
            name: 'Performans �erezleri',
            icon: Cog6ToothIcon,
            required: false,
            description: 'Sitenin performans1n1 �l�mek ve iyile_tirmek i�in kullan1l1r.',
            examples: [
                'Google Analytics',
                'Sayfa y�klenme s�releri',
                'Hata raporlama',
                'A/B test verileri',
            ],
            duration: '2 y1l',
        },
        {
            name: 'Fonksiyonel �erezler',
            icon: CheckCircleIcon,
            required: false,
            description: 'Geli_mi_ �zelliklerin �al1_mas1 i�in kullan1l1r.',
            examples: [
                'Canl1 destek widget',
                'Video oynat1c1 tercihleri',
                'Kay1tl1 formlar',
                'Harita konumu',
            ],
            duration: '1 y1l',
        },
        {
            name: 'Pazarlama �erezleri',
            icon: XCircleIcon,
            required: false,
            description: 'Ki_iselle_tirilmi_ reklamlar i�in kullan1l1r. (ADE\'de kullan1lm1yor)',
            examples: [
                'Facebook Pixel',
                'Google Ads',
                'LinkedIn Insight',
                'Retargeting pixelleri',
            ],
            duration: 'Kullan1lm1yor',
        },
    ];
    const cookieList = [
        {
            name: 'ade_session',
            purpose: 'Kullan1c1 oturumu',
            type: 'Zorunlu',
            duration: 'Oturum',
        },
        {
            name: 'ade_auth',
            purpose: 'Kimlik dorulama token',
            type: 'Zorunlu',
            duration: '30 g�n',
        },
        {
            name: 'ade_preferences',
            purpose: 'Kullan1c1 tercihleri',
            type: 'Zorunlu',
            duration: '1 y1l',
        },
        {
            name: '_ga',
            purpose: 'Google Analytics kullan1c1 ID',
            type: 'Performans',
            duration: '2 y1l',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" }), _jsxs("div", { className: "container-custom relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "\uFFFDerez " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Politikas1" })] }), _jsx("p", { className: "text-xl text-white/70 mb-4", children: "ADE web sitesi ve uygulamalar1nda kulland1\u001F1m1z \uFFFDerezler hakk1nda bilgilendirme" }), _jsx("p", { className: "text-sm text-white/50", children: "Son g\uFFFDncelleme: 15 Ocak 2026" })] }), _jsxs("div", { className: "max-w-4xl mx-auto mt-16", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "\uFFFDerez Nedir?" }), _jsx("p", { className: "text-white/80 leading-relaxed mb-4", children: "\uFFFDerezler, web sitelerini ziyaret etti\u001Finizde cihaz1n1za kaydedilen k\uFFFD\uFFFD\uFFFDk metin dosyalar1d1r. \uFFFDerezler, sitenin d\uFFFDzg\uFFFDn \uFFFDal1_mas1, daha iyi kullan1c1 deneyimi sunmas1 ve site trafi\u001Fini analiz etmesi i\uFFFDin kullan1l1r." }), _jsx("p", { className: "text-white/80 leading-relaxed", children: "ADE olarak, \uFFFDerezleri yaln1zca hizmetlerimizi iyile_tirmek ve size daha iyi bir deneyim sunmak i\uFFFDin kullan1yoruz. Ki_isel verilerinizi asla \uFFFD\uFFFD\uFFFDnc\uFFFD taraflarla pazarlama ama\uFFFDl1 payla_m1yoruz." })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8 mb-16", children: cookieTypes.map((type, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: [_jsxs("div", { className: "flex items-start gap-4 mb-6", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center ${type.required
                                                                ? 'bg-green-500/20'
                                                                : type.name.includes('Pazarlama')
                                                                    ? 'bg-red-500/20'
                                                                    : 'bg-blue-500/20'}`, children: _jsx(type.icon, { className: `w-6 h-6 ${type.required
                                                                    ? 'text-green-400'
                                                                    : type.name.includes('Pazarlama')
                                                                        ? 'text-red-400'
                                                                        : 'text-blue-400'}` }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: type.name }), _jsx("span", { className: `inline-block px-3 py-1 rounded-full text-xs font-semibold ${type.required
                                                                        ? 'bg-green-500/20 text-green-400'
                                                                        : 'bg-blue-500/20 text-blue-400'}`, children: type.required ? 'Zorunlu' : '0stee Bal1' })] })] }), _jsx("p", { className: "text-white/70 mb-6 leading-relaxed", children: type.description }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "text-white font-semibold mb-3", children: "\uFFFDrnekler:" }), _jsx("ul", { className: "space-y-2", children: type.examples.map((example, eIndex) => (_jsxs("li", { className: "flex items-start gap-2 text-white/60 text-sm", children: [_jsx("span", { className: "text-amber-400 mt-1", children: "\"" }), _jsx("span", { children: example })] }, eIndex))) })] }), _jsxs("div", { className: "pt-4 border-t border-white/10", children: [_jsx("span", { className: "text-white/50 text-sm", children: "Saklama S\uFFFDresi: " }), _jsx("span", { className: "text-white font-medium text-sm", children: type.duration })] })] }, index))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 mb-16", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Kulland1\u001F1m1z \uFFFDerezler" }), _jsx("div", { className: "space-y-4", children: cookieList.map((cookie, index) => (_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl bg-white/5 border border-white/10", children: [_jsxs("div", { className: "flex-1", children: [_jsx("code", { className: "text-amber-400 font-mono text-sm", children: cookie.name }), _jsx("p", { className: "text-white/70 text-sm mt-1", children: cookie.purpose })] }), _jsxs("div", { className: "flex items-center gap-4 mt-3 md:mt-0", children: [_jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${cookie.type === 'Zorunlu'
                                                                        ? 'bg-green-500/20 text-green-400'
                                                                        : 'bg-blue-500/20 text-blue-400'}`, children: cookie.type }), _jsx("span", { className: "text-white/50 text-sm", children: cookie.duration })] })] }, index))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "\uFFFDerezleri Nas1l Kontrol Ederim?" }), _jsxs("div", { className: "space-y-6 text-white/80 leading-relaxed", children: [_jsx("p", { children: "\uFFFDo\u001Fu taray1c1 \uFFFDerezleri otomatik olarak kabul eder, ancak taray1c1 ayarlar1n1zdan \uFFFDerezleri engelleyebilir veya silebilirsiniz. ADE hesab1n1zdan da \uFFFDerez tercihlerinizi y\uFFFDnetebilirsiniz." }), _jsx("div", { className: "pt-6 border-t border-white/10", children: _jsx("p", { className: "text-amber-400 font-medium", children: "\uFFFDnemli: \uFFFDerezleri tamamen devre d1_1 b1rak1rsan1z, ADE'nin baz1 \uFFFDzellikleri d\uFFFDzg\uFFFDn \uFFFDal1_mayabilir." }) })] })] })] })] })] }), _jsx("section", { className: "section-padding bg-gradient-to-br from-amber-900/20 via-teal-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-4xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "Sorular1n1z m1 Var?" }) }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "\uFFFDerez politikam1z hakk1nda daha fazla bilgi almak i\uFFFDin bizimle ileti_ime ge\uFFFDin" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/contact", className: "btn-primary", children: "0leti_ime Ge\uFFFD" }), _jsx(Link, { to: "/privacy", className: "btn-secondary", children: "KVKK Politikas1" })] })] }) }) }), _jsx(Footer, {})] }));
}
