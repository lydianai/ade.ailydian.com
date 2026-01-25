import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ClockIcon, TagIcon, ArrowRightIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Blog() {
    const categories = ['Tümü', 'Yapay Zeka', 'Vergi & Mevzuat', 'Başarı Hikayeleri', 'Ürün Güncellemeleri', 'Teknoloji'];
    const articles = [
        {
            title: 'Türkçe Dil İşleme: ADE Nasıl Çalışıyor?',
            excerpt: 'ADE\'nin arkasındaki AI teknolojisine derin bir bakış. Son nesil dil modelleri ile nasıl Türkçe anlama ve cevap verme yeteneklerini geliştirdik.',
            category: 'Yapay Zeka',
            date: '15 Ocak 2026',
            readTime: '8 dk',
            image: '🤖',
            featured: true,
        },
        {
            title: '2026 Vergi Değişiklikleri: Esnafı Neler Bekliyor?',
            excerpt: 'Yeni yılla birlikte gelen vergi mevzuatı değişikliklerini özetledik. KDV oranları, stopaj değişiklikleri ve e-fatura zorunluluğu.',
            category: 'Vergi & Mevzuat',
            date: '12 Ocak 2026',
            readTime: '6 dk',
            image: '📋',
            featured: true,
        },
        {
            title: 'Bakkal Ahmet Amca\'nın Dijital Dönüşüm Hikayesi',
            excerpt: '68 yaşında ADE kullanmaya başlayan Ahmet Amca\'nın muhasebe masrafını %90 azaltma hikayesi. Gerçek rakamlar, gerçek deneyim.',
            category: 'Başarı Hikayeleri',
            date: '10 Ocak 2026',
            readTime: '5 dk',
            image: '🏪',
            featured: false,
        },
        {
            title: 'Sesli Asistan Güncellemesi: 14 Yeni Komut',
            excerpt: 'ADE Sesli Asistan\'a eklenen yeni özellikler. Artık SGK primini, vergi borcunu ve stok durumunu sesli sorgulayabilirsiniz.',
            category: 'Ürün Güncellemeleri',
            date: '8 Ocak 2026',
            readTime: '4 dk',
            image: '🎤',
            featured: false,
        },
        {
            title: 'Çoklu Şube Yönetimi: KOBİ\'ler için En İyi Pratikler',
            excerpt: '5\'ten fazla şubesi olan işletmeler için merkezi yönetim, stok senkronizasyonu ve şube performans takibi ipuçları.',
            category: 'Teknoloji',
            date: '5 Ocak 2026',
            readTime: '10 dk',
            image: '🏢',
            featured: false,
        },
        {
            title: 'e-Devlet Entegrasyonu: 8.000 Hizmet Tek Platformda',
            excerpt: 'ADE\'nin 18 bakanlık ve kurumla nasıl entegre olduğunu ve hangi hizmetlere erişebildiğinizi detaylı anlattık.',
            category: 'Teknoloji',
            date: '3 Ocak 2026',
            readTime: '7 dk',
            image: '🏛️',
            featured: false,
        },
        {
            title: 'AI Tahminleme ile Stok Optimizasyonu: %30 Maliyet Düşüşü',
            excerpt: 'Machine learning algoritmalarımız satış geçmişinizi analiz ederek gelecekteki talebi tahmin ediyor. Nasıl mı? Açıklıyoruz.',
            category: 'Yapay Zeka',
            date: '28 Aralık 2025',
            readTime: '12 dk',
            image: '📊',
            featured: false,
        },
        {
            title: 'Muhasebeciler için ADE: 450 Müşteriyi Tek Başına Yönetmek',
            excerpt: 'SMMM Elif Hanım\'ın tek başına 450 müşteri yönetme deneyimi. Toplu beyanname, AI denetim asistanı ve daha fazlası.',
            category: 'Başarı Hikayeleri',
            date: '25 Aralık 2025',
            readTime: '6 dk',
            image: '👩‍💼',
            featured: false,
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "ADE " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Blog" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "Yapay zeka, vergi mevzuat\u0131, ba\u015Far\u0131 hikayeleri ve \u00FCr\u00FCn g\u00FCncellemeleri" }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" }), _jsx("input", { type: "text", placeholder: "Blog yaz\u0131lar\u0131nda ara...", className: "w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all" })] }) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 mb-16", children: categories.map((category, index) => (_jsx(motion.button, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.05 }, className: `px-6 py-3 rounded-xl font-medium transition-all ${index === 0
                                    ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white shadow-lg shadow-amber-500/30'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`, children: category }, index))) }), _jsx("div", { className: "grid md:grid-cols-2 gap-8 mb-16", children: articles
                                .filter((article) => article.featured)
                                .map((article, index) => (_jsx(motion.article, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium group cursor-pointer", children: _jsxs("div", { className: "p-8", children: [_jsx("div", { className: "text-6xl mb-6", children: article.image }), _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("span", { className: "px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold", children: article.category }), _jsxs("span", { className: "flex items-center gap-1 text-white/50 text-sm", children: [_jsx(ClockIcon, { className: "w-4 h-4" }), article.readTime] })] }), _jsx("h2", { className: "text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors", children: article.title }), _jsx("p", { className: "text-white/70 mb-6 leading-relaxed", children: article.excerpt }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white/50 text-sm", children: article.date }), _jsxs(Link, { to: `/blog/${index + 1}`, className: "flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all", children: ["Devam\u0131n\u0131 Oku", _jsx(ArrowRightIcon, { className: "w-4 h-4" })] })] })] }) }, index))) }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: articles
                                .filter((article) => !article.featured)
                                .map((article, index) => (_jsx(motion.article, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card group cursor-pointer", children: _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "text-5xl mb-4", children: article.image }), _jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("span", { className: "px-2 py-1 rounded-lg bg-teal-500/20 text-teal-400 text-xs font-semibold", children: article.category }), _jsxs("span", { className: "flex items-center gap-1 text-white/50 text-xs", children: [_jsx(ClockIcon, { className: "w-3 h-3" }), article.readTime] })] }), _jsx("h3", { className: "text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors", children: article.title }), _jsx("p", { className: "text-white/60 text-sm mb-4 leading-relaxed line-clamp-3", children: article.excerpt }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white/40 text-xs", children: article.date }), _jsx(Link, { to: `/blog/${index + 3}`, className: "text-teal-400 text-sm font-medium hover:underline", children: "Oku" })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-amber-900/20 via-teal-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Yeni Yaz\u0131lardan " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Haberdar Olun" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Haftada 1 email ile en yeni blog yaz\u0131lar\u0131, \u00FCr\u00FCn g\u00FCncellemeleri ve \u00F6zel i\u00E7erikler" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 max-w-xl mx-auto", children: [_jsx("input", { type: "email", placeholder: "Email adresiniz", className: "flex-1 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50" }), _jsx("button", { className: "btn-primary whitespace-nowrap", children: "Abone Ol" })] }), _jsx("p", { className: "text-sm text-white/50 mt-4", children: "\u0130stedi\u011Finiz zaman abonelikten \u00E7\u0131kabilirsiniz" })] }) }) }), _jsx(Footer, {})] }));
}
