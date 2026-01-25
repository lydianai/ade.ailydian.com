import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircleIcon, Cog6ToothIcon, ShieldCheckIcon, KeyIcon, ArrowRightOnRectangleIcon, ChevronDownIcon, } from '@heroicons/react/24/outline';
import { useAuthStore } from '../contexts/useAuthStore';
export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, cikisYap } = useAuthStore();
    const handleLogout = async () => {
        await cikisYap();
        navigate('/giris-yap');
    };
    const menuItems = [
        {
            icon: UserCircleIcon,
            label: 'Profilim',
            path: '/panel/profil',
            description: 'Kişisel bilgilerinizi görüntüleyin',
        },
        {
            icon: Cog6ToothIcon,
            label: 'Ayarlar',
            path: '/panel/ayarlar',
            description: 'Hesap ayarlarınızı yönetin',
        },
        {
            icon: ShieldCheckIcon,
            label: 'Güvenlik',
            path: '/panel/guvenlik',
            description: 'Güvenlik ayarları ve şifre',
        },
        {
            icon: KeyIcon,
            label: 'İki Faktörlü Doğrulama',
            path: '/panel/2fa',
            description: '2FA ayarlarını yapılandırın',
        },
    ];
    if (!user)
        return null;
    // Get initials for avatar
    const initials = `${user.ad?.[0] || ''}${user.soyad?.[0] || ''}`.toUpperCase();
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20", children: initials }), _jsxs("div", { className: "hidden lg:block text-left", children: [_jsxs("p", { className: "text-sm font-medium text-white leading-tight", children: [user.ad, " ", user.soyad] }), _jsx("p", { className: "text-xs text-white/50 leading-tight", children: user.email })] }), _jsx(ChevronDownIcon, { className: `w-4 h-4 text-white/60 transition-transform hidden lg:block ${isOpen ? 'rotate-180' : ''}` })] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsOpen(false), className: "fixed inset-0 z-40" }), _jsxs(motion.div, { initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, className: "glass-card overflow-hidden shadow-2xl", style: {
                                position: 'absolute',
                                right: 0,
                                top: 'calc(100% + 0.5rem)',
                                width: 'min(calc(100vw - 2rem), 320px)',
                                maxHeight: 'min(80vh, 600px)',
                                zIndex: 9000,
                            }, children: [_jsx("div", { className: "p-4 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-teal-500/10", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center font-bold text-white text-lg shadow-lg", children: initials }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium text-white", children: [user.ad, " ", user.soyad] }), _jsx("p", { className: "text-sm text-white/60", children: user.email })] })] }) }), _jsx("div", { className: "p-2", children: menuItems.map((item, index) => (_jsxs("button", { onClick: () => {
                                            navigate(item.path);
                                            setIsOpen(false);
                                        }, className: "w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group", children: [_jsx(item.icon, { className: "w-5 h-5 text-white/60 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-0.5" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-sm font-medium text-white group-hover:text-amber-400 transition-colors", children: item.label }), _jsx("div", { className: "text-xs text-white/50 mt-0.5", children: item.description })] })] }, index))) }), _jsx("div", { className: "p-2 border-t border-white/10", children: _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors group", children: [_jsx(ArrowRightOnRectangleIcon, { className: "w-5 h-5 flex-shrink-0" }), _jsx("span", { className: "text-sm font-medium", children: "\u00C7\u0131k\u0131\u015F Yap" })] }) })] })] })) })] }));
}
