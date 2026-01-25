import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, } from '@heroicons/react/24/outline';
import Logo from './Logo';
export default function Footer() {
    const footerSections = [
        {
            title: 'Ürün',
            links: [
                { name: 'Özellikler', href: '#features' },
                { name: 'Fiyatlandırma', href: '#pricing' },
                { name: 'Entegrasyonlar', href: '#integrations' },
                { name: 'API Dokümantasyonu', href: '/api-docs' },
                { name: 'Yol Haritası', href: '/roadmap' },
            ],
        },
        {
            title: 'Çözümler',
            links: [
                { name: 'Esnaf için', href: '/solutions/esnaf' },
                { name: 'KOBİ için', href: '/solutions/kobi' },
                { name: 'Vatandaş için', href: '/solutions/vatandas' },
                { name: 'Muhasebeciler için', href: '/solutions/muhasebe' },
                { name: 'Kurumsal', href: '/solutions/enterprise' },
            ],
        },
        {
            title: 'Şirket',
            links: [
                { name: 'Hakkımızda', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Kariyer', href: '/careers' },
                { name: 'Basın Kiti', href: '/press' },
                { name: 'İletişim', href: '/contact' },
            ],
        },
        {
            title: 'Yasal',
            links: [
                { name: 'KVKK Politikası', href: '/privacy' },
                { name: 'Kullanım Şartları', href: '/terms' },
                { name: 'Çerez Politikası', href: '/cookies' },
                { name: 'Aydınlatma Metni', href: '/disclosure' },
                { name: 'Güvenlik', href: '/security' },
            ],
        },
        {
            title: 'Destek',
            links: [
                { name: 'Yardım Merkezi', href: '/help' },
                { name: 'Canlı Destek', href: '/support' },
                { name: 'SSS', href: '/faq' },
                { name: 'Video Eğitimler', href: '/tutorials' },
                { name: 'Topluluk', href: '/community' },
            ],
        },
    ];
    const integrations = [
        'e-Devlet', 'GİB', 'SGK', 'MERSIS', 'UYAP', 'MHRS',
        'e-İmza', 'Açık Bankacılık', 'Trendyol', 'Hepsiburada',
    ];
    return (_jsxs("footer", { className: "relative mt-32 border-t border-white/10", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" }), _jsxs("div", { className: "relative container-custom py-16", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx(Link, { to: "/", className: "mb-6 inline-block", children: _jsx(Logo, { size: "md", animated: false, showText: true, variant: "white" }) }), _jsx("p", { className: "text-white/70 mb-6 leading-relaxed", children: "T\u00FCrkiye'nin ilk yapay zeka destekli devlet asistan\u0131. 18 bakanl\u0131k ve kurumla entegre, hukuken ge\u00E7erli i\u015Flemler yapabilen tek platform." }), _jsxs("div", { className: "space-y-3", children: [_jsxs("a", { href: "mailto:info@ade.gov.tr", className: "flex items-center gap-3 text-white/60 hover:text-white transition-colors group", children: [_jsx(EnvelopeIcon, { className: "w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" }), _jsx("span", { children: "info@ade.gov.tr" })] }), _jsxs("a", { href: "tel:+908503908080", className: "flex items-center gap-3 text-white/60 hover:text-white transition-colors group", children: [_jsx(PhoneIcon, { className: "w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" }), _jsx("span", { children: "0850 390 80 80" })] }), _jsxs("div", { className: "flex items-start gap-3 text-white/60", children: [_jsx(MapPinIcon, { className: "w-5 h-5 text-purple-500 mt-0.5" }), _jsxs("span", { children: ["Maslak Mahallesi, Teknoloji Cd. No:12", _jsx("br", {}), "Sar\u0131yer / \u0130stanbul"] })] })] })] }), footerSections.map((section) => (_jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold mb-4", children: section.title }), _jsx("ul", { className: "space-y-3", children: section.links.map((link) => (_jsx("li", { children: _jsxs(Link, { to: link.href, className: "text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group", children: [_jsx("span", { className: "w-0 h-px bg-gradient-to-r from-amber-500 to-teal-500 group-hover:w-4 transition-all" }), link.name] }) }, link.name))) })] }, section.title)))] }), _jsxs("div", { className: "py-8 border-y border-white/10 mb-8", children: [_jsx("h4", { className: "text-white/80 font-medium mb-4 text-center", children: "Resmi Entegrasyonlar" }), _jsx("div", { className: "flex flex-wrap justify-center gap-4", children: integrations.map((integration) => (_jsx("span", { className: "px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:border-amber-500/30 transition-all", children: integration }, integration))) })] }), _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50", children: [_jsx("div", { children: "\u00A9 2026 ADE - Ak\u0131ll\u0131 Devlet Ekosistemi. T\u00FCm haklar\u0131 sakl\u0131d\u0131r." }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("a", { href: "https://twitter.com/adegovtr", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", children: "Twitter" }), _jsx("a", { href: "https://linkedin.com/company/ade", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", children: "LinkedIn" }), _jsx("a", { href: "https://github.com/ade-gov-tr", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", children: "GitHub" }), _jsx("a", { href: "https://youtube.com/@adegovtr", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", children: "YouTube" })] })] }), _jsxs("div", { className: "mt-8 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs text-white/40", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-4 h-4 text-green-500", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), "ISO 27001 Sertifikal\u0131"] }), _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-4 h-4 text-blue-500", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), "KVKK Uyumlu"] }), _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-4 h-4 text-purple-500", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), "SOC 2 Type II"] }), _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-4 h-4 text-amber-500", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), "99.95% Uptime SLA"] })] })] })] }));
}
