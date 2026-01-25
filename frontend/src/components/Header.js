import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../contexts/useAuthStore';
import Logo from './Logo';
export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAuthStore();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navItems = [
        { name: 'Özellikler', href: '#features' },
        { name: 'Nasıl Çalışır', href: '#how-it-works' },
        { name: 'Entegrasyonlar', href: '#integrations' },
        { name: 'Fiyatlandırma', href: '#pricing' },
    ];
    return (_jsx(motion.header, { initial: { y: -100 }, animate: { y: 0 }, className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-3' : 'bg-transparent py-5'}`, children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Link, { to: "/", className: "group", children: _jsx(Logo, { size: "md", animated: false, showText: true, variant: "white" }) }), _jsx("nav", { className: "hidden lg:flex items-center gap-8", children: navItems.map((item) => (_jsxs("a", { href: item.href, className: "text-white/80 hover:text-white font-medium transition-colors relative group", children: [item.name, _jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-teal-500 transition-all group-hover:w-full" })] }, item.name))) }), _jsx("div", { className: "hidden lg:flex items-center gap-4", children: isAuthenticated ? (_jsxs(Link, { to: "/panel", className: "btn-secondary", children: ["Panel", _jsx("span", { className: "ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400", children: user?.ad })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/giris-yap", className: "btn-ghost", children: "Giri\u015F Yap" }), _jsx(Link, { to: "/kayit-ol", className: "btn-primary", children: "\u00DCcretsiz Ba\u015Fla" })] })) }), _jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: isMobileMenuOpen ? (_jsx(XMarkIcon, { className: "w-6 h-6 text-white" })) : (_jsx(Bars3Icon, { className: "w-6 h-6 text-white" })) })] }), _jsx(AnimatePresence, { children: isMobileMenuOpen && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "lg:hidden overflow-hidden", children: _jsxs("nav", { className: "flex flex-col gap-4 pt-6 pb-4", children: [navItems.map((item) => (_jsx("a", { href: item.href, onClick: () => setIsMobileMenuOpen(false), className: "text-white/80 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/5", children: item.name }, item.name))), _jsx("div", { className: "flex flex-col gap-3 px-4 pt-4 border-t border-white/10", children: isAuthenticated ? (_jsx(Link, { to: "/panel", className: "btn-primary text-center", onClick: () => setIsMobileMenuOpen(false), children: "Panel" })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/giris-yap", className: "btn-secondary text-center", onClick: () => setIsMobileMenuOpen(false), children: "Giri\u015F Yap" }), _jsx(Link, { to: "/kayit-ol", className: "btn-primary text-center", onClick: () => setIsMobileMenuOpen(false), children: "\u00DCcretsiz Ba\u015Fla" })] })) })] }) })) })] }) }));
}
