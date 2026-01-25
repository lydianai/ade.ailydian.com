import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, ClockIcon, UserGroupIcon, SparklesIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Support() {
    const supportChannels = [
        {
            icon: ChatBubbleLeftRightIcon,
            title: 'Canl1 Destek',
            desc: 'An1nda yard1m al1n',
            availability: '7/24 aktif',
            responseTime: 'Ortalama 2 dakika',
            color: 'from-teal-500 to-cyan-500',
            action: 'Sohbet Ba_lat',
            badge: 'En H1zl1',
        },
        {
            icon: PhoneIcon,
            title: 'Telefon Destei',
            desc: '0850 390 80 80',
            availability: 'Hafta i�i 09:00-18:00',
            responseTime: 'An1nda balant1',
            color: 'from-blue-500 to-indigo-500',
            action: 'Hemen Ara',
            badge: '',
        },
        {
            icon: EnvelopeIcon,
            title: 'Email Destei',
            desc: 'destek@ade.gov.tr',
            availability: 'Her zaman',
            responseTime: 'Ortalama 4 saat',
            color: 'from-purple-500 to-pink-500',
            action: 'Email G�nder',
            badge: '',
        },
    ];
    const supportPlans = [
        {
            name: 'Standart Destek',
            price: 'Dahil',
            features: [
                'Email destek (4 saat yan1t)',
                'Canl1 sohbet (09:00-18:00)',
                'Yard1m merkezi eri_imi',
                'Video eitimler',
                'Topluluk forumu',
            ],
            included: true,
        },
        {
            name: '�ncelikli Destek',
            price: '299 TL/ay',
            features: [
                'Email destek (2 saat yan1t)',
                '7/24 canl1 sohbet',
                'Telefon destei',
                '�zel eitim oturumlar1',
                '�ncelik s1ras1',
                'Teknik hesap y�neticisi',
            ],
            included: false,
            popular: true,
        },
        {
            name: 'Premium Destek',
            price: '999 TL/ay',
            features: [
                'Email destek (30 dakika yan1t)',
                '7/24 �zel hat',
                'WhatsApp destek',
                'Haftal1k dan1_manl1k',
                'SLA garantisi',
                'Dedicated hesap y�neticisi',
                'On-site destek',
            ],
            included: false,
        },
    ];
    const faqQuick = [
        {
            q: 'Destek saatleri nedir?',
            a: 'Canl1 destek 7/24 aktiftir. Telefon destei hafta i�i 09:00-18:00 aras1nda hizmet verir.',
        },
        {
            q: 'Ne kadar s�rede yan1t al1r1m?',
            a: 'Canl1 destek ortalama 2 dakika, email destek ortalama 4 saat i�inde yan1t verir.',
        },
        {
            q: 'Hangi dillerde destek veriyorsunuz?',
            a: '^u anda sadece T�rk�e destek sunuyoruz. 0ngilizce destei yak1nda eklenecek.',
        },
        {
            q: '�cretsiz planda destek var m1?',
            a: 'Evet! T�m planlarda standart destek dahildir.',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 mb-6", children: [_jsx(UserGroupIcon, { className: "w-5 h-5 text-teal-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "7/24 Canl1 Destek" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "Size Yard1mc1 " }), _jsx("span", { className: "text-gradient-teal-blue", children: "Olmak 0\uFFFDin Buraday1z" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "Sorular1n1z i\uFFFDin en h1zl1 ileti_im kanal1n1 se\uFFFDin" }), _jsx("div", { className: "grid grid-cols-3 gap-6 max-w-2xl mx-auto", children: [
                                        { value: '2.1M+', label: 'Mutlu Kullan1c1' },
                                        { value: '2 dk', label: 'Ortalama Yan1t' },
                                        { value: '4.8/5', label: 'Memnuniyet' },
                                    ].map((stat, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 + index * 0.1 }, className: "glass-card p-4", children: [_jsx("div", { className: "text-3xl font-bold text-gradient-teal-blue mb-1", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "0leti_im " }), _jsx("span", { className: "text-gradient-teal-blue", children: "Kanallar1" })] }) }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: supportChannels.map((channel, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 relative", children: [channel.badge && (_jsx("div", { className: "absolute -top-3 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold", children: channel.badge })), _jsx("div", { className: `w-16 h-16 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center mb-6`, children: _jsx(channel.icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: channel.title }), _jsx("p", { className: "text-white/70 mb-6", children: channel.desc }), _jsxs("div", { className: "space-y-3 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-white/60 text-sm", children: [_jsx(ClockIcon, { className: "w-4 h-4" }), _jsx("span", { children: channel.availability })] }), _jsxs("div", { className: "flex items-center gap-2 text-white/60 text-sm", children: [_jsx(SparklesIcon, { className: "w-4 h-4" }), _jsx("span", { children: channel.responseTime })] })] }), _jsx(Link, { to: "/contact", className: "btn-primary w-full", children: channel.action })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Destek " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Paketleri" })] }), _jsx("p", { className: "text-xl text-white/70", children: "0htiyac1n1za g\uFFFDre destek seviyesi se\uFFFDin" })] }), _jsx("div", { className: "grid lg:grid-cols-3 gap-8", children: supportPlans.map((plan, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: `${plan.popular ? 'glass-card-premium ring-2 ring-amber-500/50' : 'glass-card'} p-8 relative`, children: [plan.popular && (_jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold", children: "En Pop\uFFFDler" })), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: plan.name }), _jsx("div", { className: "mb-6", children: _jsx("span", { className: "text-4xl font-bold text-gradient-teal-blue", children: plan.price }) }), _jsx("ul", { className: "space-y-3 mb-8", children: plan.features.map((feature, fIndex) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("svg", { className: "w-5 h-5 text-green-400 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), _jsx("span", { className: "text-white/80", children: feature })] }, fIndex))) }), _jsx(Link, { to: plan.included ? '/help' : '/contact', className: plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full', children: plan.included ? 'Zaten Dahil' : 'Sat1n Al' })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "H1zl1 " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Yan1tlar" })] }) }), _jsx("div", { className: "max-w-3xl mx-auto space-y-6", children: faqQuick.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-6", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-3", children: item.q }), _jsx("p", { className: "text-white/70", children: item.a })] }, index))) }), _jsx("div", { className: "text-center mt-12", children: _jsx(Link, { to: "/faq", className: "btn-secondary", children: "T\uFFFDm SSS'leri G\uFFFDr" }) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-teal-900/20 via-blue-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Hemen " }), _jsx("span", { className: "text-gradient-teal-blue", children: "Ba_lay1n" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Destek ekibimiz size yard1mc1 olmaya haz1r" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/contact", className: "btn-primary text-lg px-8", children: "Canl1 Destek" }), _jsx(Link, { to: "/help", className: "btn-secondary text-lg px-8", children: "Yard1m Merkezi" })] })] }) }) }), _jsx(Footer, {})] }));
}
