import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, DocumentTextIcon, UserGroupIcon, BanknotesIcon, ChartBarIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BuildingOffice2Icon, SparklesIcon, TableCellsIcon, } from '@heroicons/react/24/outline';
import { useAuthStore } from '../contexts/useAuthStore';
import NotificationCenter from '../components/NotificationCenter';
import UserMenu from '../components/UserMenu';
import { useWebSocket } from '../hooks/useWebSocket';
export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cikisYap } = useAuthStore();
    // Real-time WebSocket connection
    const { isConnected } = useWebSocket();
    const handleLogout = async () => {
        await cikisYap();
        navigate('/giris-yap');
    };
    const menuItems = [
        { icon: HomeIcon, label: 'Dashboard', path: '/panel' },
        { icon: SparklesIcon, label: 'AI Asistan', path: '/panel/ai-asistan' },
        { icon: BuildingOffice2Icon, label: 'Entegrasyonlar', path: '/panel/entegrasyonlar' },
        { icon: DocumentTextIcon, label: 'Faturalar', path: '/panel/faturalar' },
        { icon: TableCellsIcon, label: 'Muhasebe', path: '/panel/muhasebe' },
        { icon: UserGroupIcon, label: 'Müşteriler', path: '/panel/musteriler' },
        { icon: BanknotesIcon, label: 'Ödemeler', path: '/panel/odemeler' },
        { icon: ChartBarIcon, label: 'Raporlar', path: '/panel/raporlar' },
        { icon: Cog6ToothIcon, label: 'Ayarlar', path: '/panel/ayarlar' },
    ];
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(motion.header, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "glass-card m-4 mb-0 px-6 py-4", style: { zIndex: 100 }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h1", { className: "text-2xl font-bold text-gradient-amber-teal", children: "ADE" }), _jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}` }), _jsx("span", { className: `text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`, children: isConnected ? 'Canlı' : 'Bağlantı Kesildi' })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(NotificationCenter, {}), _jsx(UserMenu, {})] })] }) }), _jsxs("div", { className: "flex flex-1", children: [_jsxs(motion.aside, { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, className: "w-16 sm:w-20 md:w-64 glass-card m-4 mt-0 p-2 md:p-6 flex flex-col", children: [_jsx("div", { className: "mb-6 md:mb-8 hidden md:block", children: _jsx("div", { className: "h-8" }) }), _jsx("nav", { className: "space-y-1 md:space-y-2 flex-1", children: menuItems.map((item, i) => {
                                    const isActive = location.pathname === item.path;
                                    return (_jsxs("button", { onClick: () => navigate(item.path), className: `w-full flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-xl transition-all group ${isActive
                                            ? 'bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 text-white'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'}`, title: item.label, children: [_jsx(item.icon, { className: "w-5 h-5 md:w-5 md:h-5 flex-shrink-0" }), _jsx("span", { className: "hidden md:block font-medium", children: item.label })] }, i));
                                }) }), _jsx("div", { className: "border-t border-white/10 pt-4 mt-4", children: _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all", title: "\u00C7\u0131k\u0131\u015F Yap", children: [_jsx(ArrowRightOnRectangleIcon, { className: "w-5 h-5 flex-shrink-0" }), _jsx("span", { className: "hidden md:block font-medium", children: "\u00C7\u0131k\u0131\u015F Yap" })] }) })] }), _jsx("div", { className: "flex-1 p-4 md:p-6 lg:p-8 overflow-auto", children: _jsxs(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, children: [_jsx("h1", { className: "text-4xl font-bold mb-2", children: "Ho\u015F Geldiniz!" }), _jsx("p", { className: "text-white/70 mb-8", children: "\u0130\u015Fte bug\u00FCnk\u00FC \u00F6zet:" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
                                        { label: 'Toplam Gelir', value: '₺125,430', trend: '+12.5%', color: 'amber' },
                                        { label: 'Bekleyen Fatura', value: '23', trend: '-8.2%', color: 'teal' },
                                        { label: 'Aktif Müşteri', value: '156', trend: '+5.4%', color: 'purple' },
                                        { label: 'Bu Ay Ödeme', value: '₺8,450', trend: '+22%', color: 'pink' },
                                    ].map((stat, i) => (_jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: i * 0.1 }, className: "glass-card p-6", children: [_jsx("div", { className: "text-sm text-white/60 mb-1", children: stat.label }), _jsx("div", { className: `text-3xl font-bold mb-2 text-${stat.color}-400`, children: stat.value }), _jsx("div", { className: "text-sm text-green-400", children: stat.trend })] }, i))) }), _jsxs(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.4 }, className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Son \u0130\u015Flemler" }), _jsx("div", { className: "space-y-4", children: [
                                                { action: 'Fatura oluşturuldu', customer: 'ABC Ltd.', amount: '₺2,500', time: '5 dk önce' },
                                                { action: 'Ödeme alındı', customer: 'XYZ A.Ş.', amount: '₺8,200', time: '1 saat önce' },
                                                { action: 'Müşteri eklendi', customer: 'Ahmet Yılmaz', amount: '-', time: '3 saat önce' },
                                            ].map((activity, i) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: activity.action }), _jsx("div", { className: "text-sm text-white/60", children: activity.customer })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "font-bold text-teal-400", children: activity.amount }), _jsx("div", { className: "text-xs text-white/40", children: activity.time })] })] }, i))) })] })] }) })] })] }));
}
