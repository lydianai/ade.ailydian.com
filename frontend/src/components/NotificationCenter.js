import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BellIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon, } from '@heroicons/react/24/outline';
import { useNotificationStore } from '../contexts/useNotificationStore';
export default function NotificationCenter() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotificationStore();
    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return _jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400" });
            case 'error':
                return _jsx(XMarkIcon, { className: "w-5 h-5 text-red-400" });
            case 'warning':
                return _jsx(ExclamationTriangleIcon, { className: "w-5 h-5 text-amber-400" });
            case 'info':
                return _jsx(InformationCircleIcon, { className: "w-5 h-5 text-blue-400" });
        }
    };
    const getColor = (type) => {
        switch (type) {
            case 'success':
                return 'from-green-500/20 to-green-500/10 border-green-500/30';
            case 'error':
                return 'from-red-500/20 to-red-500/10 border-red-500/30';
            case 'warning':
                return 'from-amber-500/20 to-amber-500/10 border-amber-500/30';
            case 'info':
                return 'from-blue-500/20 to-blue-500/10 border-blue-500/30';
        }
    };
    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        if (notification.actionUrl) {
            navigate(notification.actionUrl);
            setIsOpen(false);
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: [_jsx(BellIcon, { className: "w-6 h-6 text-white" }), unreadCount > 0 && (_jsx(motion.span, { initial: { scale: 0 }, animate: { scale: 1 }, className: "absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white", children: unreadCount > 9 ? '9+' : unreadCount }))] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsOpen(false), className: "fixed inset-0 z-40" }), _jsxs(motion.div, { initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, className: "glass-card overflow-hidden shadow-2xl", style: {
                                position: 'absolute',
                                right: 0,
                                top: 'calc(100% + 0.5rem)',
                                width: 'min(calc(100vw - 2rem), 384px)',
                                maxHeight: 'min(80vh, 600px)',
                                zIndex: 9000,
                            }, children: [_jsx("div", { className: "p-4 border-b border-white/10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-bold text-white", children: ["Bildirimler ", unreadCount > 0 && `(${unreadCount})`] }), _jsx("div", { className: "flex items-center gap-2", children: notifications.length > 0 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: markAllAsRead, className: "text-sm text-teal-400 hover:text-teal-300 transition-colors", children: "T\u00FCm\u00FCn\u00FC okundu i\u015Faretle" }), _jsx("button", { onClick: clearAll, className: "text-sm text-red-400 hover:text-red-300 transition-colors", children: "Temizle" })] })) })] }) }), _jsx("div", { className: "max-h-[500px] overflow-y-auto", children: notifications.length === 0 ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(BellIcon, { className: "w-12 h-12 text-white/20 mx-auto mb-3" }), _jsx("p", { className: "text-white/60", children: "Hen\u00FCz bildirim yok" })] })) : (_jsx("div", { className: "divide-y divide-white/5", children: notifications.map((notification) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: `p-4 hover:bg-white/5 transition-colors cursor-pointer relative ${!notification.read ? 'bg-white/5' : ''}`, onClick: () => handleNotificationClick(notification), children: [!notification.read && (_jsx("div", { className: "absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full" })), _jsxs("div", { className: "flex gap-3 ml-2", children: [_jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${getColor(notification.type)} border flex-shrink-0`, children: getIcon(notification.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("h4", { className: "font-medium text-white text-sm", children: notification.title }), _jsx("button", { onClick: (e) => {
                                                                                e.stopPropagation();
                                                                                removeNotification(notification.id);
                                                                            }, className: "p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0", children: _jsx(XMarkIcon, { className: "w-4 h-4 text-white/60" }) })] }), _jsx("p", { className: "text-sm text-white/60 mt-1 line-clamp-2", children: notification.message }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsx("span", { className: "text-xs text-white/40", children: new Date(notification.timestamp).toLocaleString('tr-TR', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit',
                                                                                day: '2-digit',
                                                                                month: 'short',
                                                                            }) }), notification.actionLabel && (_jsx("span", { className: "text-xs text-teal-400 font-medium", children: notification.actionLabel }))] })] })] })] }, notification.id))) })) })] })] })) })] }));
}
