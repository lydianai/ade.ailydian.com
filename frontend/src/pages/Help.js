import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, QuestionMarkCircleIcon, BookOpenIcon, VideoCameraIcon, ChatBubbleLeftRightIcon, PhoneIcon, RocketLaunchIcon, Cog6ToothIcon, CreditCardIcon, ShieldCheckIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Help() {
    const categories = [
        {
            icon: RocketLaunchIcon,
            title: 'Ba_lang1� Rehberi',
            desc: '0lk ad1mlar, hesap olu_turma, kurulum',
            articleCount: 12,
            color: 'from-amber-500 to-orange-500',
            link: '/help/getting-started',
        },
        {
            icon: Cog6ToothIcon,
            title: '�zellikler',
            desc: 'e-Fatura, SGK bildirimleri, muhasebe',
            articleCount: 48,
            color: 'from-blue-500 to-cyan-500',
            link: '/help/features',
        },
        {
            icon: CreditCardIcon,
            title: 'Faturalama & �deme',
            desc: 'Planlar, �deme y�ntemleri, fatura',
            articleCount: 18,
            color: 'from-purple-500 to-pink-500',
            link: '/help/billing',
        },
        {
            icon: ShieldCheckIcon,
            title: 'G�venlik & Gizlilik',
            desc: 'KVKK, _ifre dei_imi, 2FA',
            articleCount: 24,
            color: 'from-green-500 to-emerald-500',
            link: '/help/security',
        },
    ];
    const popularArticles = [
        {
            title: 'ADE hesab1 nas1l olu_turulur?',
            category: 'Ba_lang1�',
            views: '45.2K',
            time: '3 dk',
        },
        {
            title: 'e-Fatura nas1l kesilir?',
            category: '�zellikler',
            views: '38.1K',
            time: '5 dk',
        },
        {
            title: 'SGK bildirimlerini nas1l yapar1m?',
            category: '�zellikler',
            views: '32.4K',
            time: '7 dk',
        },
        {
            title: 'Plan1m1 nas1l y�kseltebilirim?',
            category: 'Faturalama',
            views: '28.9K',
            time: '2 dk',
        },
        {
            title: '0ki fakt�rl� kimlik dorulama nas1l etkinle_tirilir?',
            category: 'G�venlik',
            views: '24.5K',
            time: '4 dk',
        },
        {
            title: '�oklu _ube nas1l y�netilir?',
            category: '�zellikler',
            views: '22.1K',
            time: '8 dk',
        },
    ];
    const quickLinks = [
        {
            icon: BookOpenIcon,
            title: 'Dok�mantasyon',
            desc: 'Detayl1 kullan1m k1lavuzlar1',
            link: '/docs',
        },
        {
            icon: VideoCameraIcon,
            title: 'Video Eitimler',
            desc: 'Ad1m ad1m video anlat1mlar',
            link: '/tutorials',
        },
        {
            icon: QuestionMarkCircleIcon,
            title: 'S1k�a Sorulan Sorular',
            desc: 'H1zl1 yan1tlar',
            link: '/faq',
        },
        {
            icon: ChatBubbleLeftRightIcon,
            title: 'Canl1 Destek',
            desc: 'An1nda yard1m',
            link: '/support',
        },
    ];
    const contactOptions = [
        {
            icon: ChatBubbleLeftRightIcon,
            title: 'Canl1 Sohbet',
            desc: 'Ortalama yan1t s�resi: 2 dakika',
            availability: '7/24 aktif',
            action: 'Sohbet Ba_lat',
            color: 'text-teal-400',
        },
        {
            icon: PhoneIcon,
            title: 'Telefon Destei',
            desc: '0850 390 80 80',
            availability: 'Hafta i�i 09:00-18:00',
            action: 'Ara',
            color: 'text-blue-400',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "Yard1m " }), _jsx("span", { className: "text-gradient-blue-purple", children: "Merkezi" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "ADE kullan1m1 hakk1nda arad1\u001F1n1z her _ey burada" }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" }), _jsx("input", { type: "text", placeholder: "Sorunuzu veya konuyu yaz1n...", className: "w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all" })] }) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsx("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "Konular" }) }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: categories.map((category, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, children: _jsxs(Link, { to: category.link, className: "glass-card-premium p-8 block group hover:scale-105 transition-transform", children: [_jsx("div", { className: `w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(category.icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: category.title }), _jsx("p", { className: "text-white/70 mb-4", children: category.desc }), _jsxs("div", { className: "text-sm text-white/50", children: [category.articleCount, " makale"] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Pop\uFFFDler " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Makaleler" })] }) }), _jsx("div", { className: "max-w-4xl mx-auto space-y-4", children: popularArticles.map((article, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: index * 0.05 }, children: _jsxs(Link, { to: `/help/article/${index + 1}`, className: "glass-card p-6 flex items-center justify-between group hover:bg-white/10 transition-all", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors", children: article.title }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-white/50", children: [_jsx("span", { className: "px-3 py-1 rounded-full bg-blue-500/20 text-blue-400", children: article.category }), _jsxs("span", { children: [article.views, " g\uFFFDr\uFFFDnt\uFFFDlenme"] }), _jsxs("span", { children: [article.time, " okuma"] })] })] }), _jsx("div", { className: "ml-6 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx("svg", { className: "w-6 h-6 text-blue-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "H1zl1 " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Eri_im" })] }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: quickLinks.map((link, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, children: _jsxs(Link, { to: link.link, className: "glass-card p-6 block text-center group hover:scale-105 transition-transform", children: [_jsx(link.icon, { className: "w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: link.title }), _jsx("p", { className: "text-white/60 text-sm", children: link.desc })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "Cevap Bulamad1n1z m1?" }) }), _jsx("p", { className: "text-xl text-white/70", children: "Destek ekibimiz size yard1mc1 olmak i\uFFFDin haz1r" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: contactOptions.map((option, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: [_jsx(option.icon, { className: `w-12 h-12 ${option.color} mb-6` }), _jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: option.title }), _jsx("p", { className: "text-white/70 mb-2", children: option.desc }), _jsx("p", { className: "text-white/50 text-sm mb-6", children: option.availability }), _jsx(Link, { to: "/support", className: "btn-primary w-full", children: option.action })] }, index))) })] }) }), _jsx(Footer, {})] }));
}
