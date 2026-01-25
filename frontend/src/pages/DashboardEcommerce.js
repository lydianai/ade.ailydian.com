import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, ChartBarIcon, CurrencyDollarIcon, TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ArrowTrendingUpIcon, ArrowPathIcon, ExclamationTriangleIcon, BellAlertIcon, SparklesIcon, } from '@heroicons/react/24/outline';
import DashboardLayout from '../layouts/DashboardLayout';
export default function DashboardEcommerce() {
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    // E-ticaret platformları
    const platforms = [
        {
            id: 'hepsiburada',
            name: 'Hepsiburada',
            logo: '🛍️',
            color: 'from-orange-500 to-red-500',
            status: 'active',
            orders: 847,
            revenue: '₺2,847,500',
            growth: '+18%',
        },
        {
            id: 'trendyol',
            name: 'Trendyol',
            logo: '🛒',
            color: 'from-orange-600 to-amber-500',
            status: 'active',
            orders: 1243,
            revenue: '₺4,231,800',
            growth: '+24%',
        },
        {
            id: 'n11',
            name: 'N11',
            logo: '🏪',
            color: 'from-purple-500 to-pink-500',
            status: 'active',
            orders: 432,
            revenue: '₺1,147,200',
            growth: '+12%',
        },
        {
            id: 'amazon',
            name: 'Amazon TR',
            logo: '📦',
            color: 'from-yellow-600 to-orange-600',
            status: 'active',
            orders: 567,
            revenue: '₺1,892,300',
            growth: '+31%',
        },
    ];
    // Güncel siparişler
    const recentOrders = [
        {
            id: 'ORD-2024-8472',
            platform: 'hepsiburada',
            customer: 'Mehmet Yılmaz',
            product: 'Kablosuz Kulaklık Pro X',
            amount: '₺1,899',
            status: 'preparing',
            time: '5 dk önce',
        },
        {
            id: 'ORD-2024-8471',
            platform: 'trendyol',
            customer: 'Ayşe Kaya',
            product: 'Akıllı Saat Series 7',
            amount: '₺3,499',
            status: 'shipped',
            time: '12 dk önce',
        },
        {
            id: 'ORD-2024-8470',
            platform: 'n11',
            customer: 'Ali Demir',
            product: 'Gaming Mouse RGB',
            amount: '₺599',
            status: 'delivered',
            time: '18 dk önce',
        },
        {
            id: 'ORD-2024-8469',
            platform: 'amazon',
            customer: 'Zeynep Arslan',
            product: 'Mekanik Klavye',
            amount: '₺1,299',
            status: 'preparing',
            time: '25 dk önce',
        },
    ];
    // AI Öneriler
    const aiSuggestions = [
        {
            type: 'price',
            title: 'Fiyat Optimizasyonu',
            description: '"Kablosuz Kulaklık Pro X" ürününüzün fiyatını ₺1,899\'dan ₺1,749\'a düşürürseniz satışlar %34 artabilir.',
            impact: 'Yüksek',
            action: 'Fiyatı Güncelle',
        },
        {
            type: 'stock',
            title: 'Stok Uyarısı',
            description: '"Gaming Mouse RGB" stoku kritik seviyede (3 adet). Acil tedarik gerekli.',
            impact: 'Kritik',
            action: 'Stok Ekle',
        },
        {
            type: 'marketing',
            title: 'Kampanya Önerisi',
            description: 'Trendyol\'da "Elektronik" kategorisinde %20 indirim kampanyası başlatın. Tahmini ek gelir: ₺125,000',
            impact: 'Orta',
            action: 'Kampanya Başlat',
        },
        {
            type: 'shipping',
            title: 'Kargo Optimizasyonu',
            description: 'Hepsiburada siparişlerinizde "Aynı Gün Teslimat" aktif ederseniz dönüşüm %18 artabilir.',
            impact: 'Yüksek',
            action: 'Aktif Et',
        },
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'preparing':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'shipped':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'delivered':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'preparing':
                return 'Hazırlanıyor';
            case 'shipped':
                return 'Kargoda';
            case 'delivered':
                return 'Teslim Edildi';
            case 'cancelled':
                return 'İptal';
            default:
                return status;
        }
    };
    const getPlatformLogo = (platformId) => {
        return platforms.find(p => p.id === platformId)?.logo || '🛍️';
    };
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: _jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center", children: _jsx(ShoppingBagIcon, { className: "w-7 h-7 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "E-Ticaret Y\u00F6netimi" }), _jsx("p", { className: "text-white/60 text-sm", children: "T\u00FCm platformlar\u0131n\u0131z\u0131 tek yerden y\u00F6netin" })] })] }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "btn-secondary", children: [_jsx(ArrowPathIcon, { className: "w-5 h-5" }), "Senkronize Et"] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "btn-primary", children: [_jsx(SparklesIcon, { className: "w-5 h-5" }), "AI Analiz"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: platforms.map((platform, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -5 }, className: "glass-card p-6 cursor-pointer", onClick: () => setSelectedPlatform(platform.id), children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: `text-4xl`, children: platform.logo }), _jsx("div", { className: "px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30", children: _jsx("span", { className: "text-green-400 text-xs font-medium", children: "Aktif" }) })] }), _jsx("h3", { className: "text-white font-semibold text-lg mb-1", children: platform.name }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white/60 text-sm", children: "Sipari\u015F" }), _jsx("span", { className: "text-white font-semibold", children: platform.orders })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white/60 text-sm", children: "Ciro" }), _jsx("span", { className: "text-white font-semibold", children: platform.revenue })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ArrowTrendingUpIcon, { className: "w-4 h-4 text-green-400" }), _jsx("span", { className: "text-green-400 text-sm font-medium", children: platform.growth }), _jsx("span", { className: "text-white/60 text-xs", children: "bu ay" })] })] })] }, platform.id))) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center", children: _jsx(ShoppingBagIcon, { className: "w-5 h-5 text-blue-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-white/60 text-sm", children: "Toplam Sipari\u015F" }), _jsx("p", { className: "text-white text-2xl font-bold", children: "3,089" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-400 text-sm font-medium", children: "+28%" }), _jsx("span", { className: "text-white/60 text-xs", children: "Ge\u00E7en aya g\u00F6re" })] })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center", children: _jsx(CurrencyDollarIcon, { className: "w-5 h-5 text-green-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-white/60 text-sm", children: "Toplam Ciro" }), _jsx("p", { className: "text-white text-2xl font-bold", children: "\u20BA10.1M" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-400 text-sm font-medium", children: "+21%" }), _jsx("span", { className: "text-white/60 text-xs", children: "Ge\u00E7en aya g\u00F6re" })] })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center", children: _jsx(TruckIcon, { className: "w-5 h-5 text-purple-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-white/60 text-sm", children: "Kargoda" }), _jsx("p", { className: "text-white text-2xl font-bold", children: "487" })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { className: "text-white/60 text-sm", children: "Ortalama 2.3 g\u00FCn" }) })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center", children: _jsx(ChartBarIcon, { className: "w-5 h-5 text-orange-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-white/60 text-sm", children: "D\u00F6n\u00FC\u015F\u00FCm Oran\u0131" }), _jsx("p", { className: "text-white text-2xl font-bold", children: "%12.8" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-green-400 text-sm font-medium", children: "+3.2%" }), _jsx("span", { className: "text-white/60 text-xs", children: "Ge\u00E7en aya g\u00F6re" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 glass-card p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Son Sipari\u015Fler" }), _jsx("button", { className: "text-orange-400 hover:text-orange-300 text-sm font-medium", children: "T\u00FCm\u00FCn\u00FC G\u00F6r" })] }), _jsx("div", { className: "space-y-4", children: recentOrders.map((order) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: "p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-2xl", children: getPlatformLogo(order.platform) }), _jsxs("div", { children: [_jsx("p", { className: "text-white font-medium", children: order.id }), _jsx("p", { className: "text-white/60 text-sm", children: order.customer })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-white font-bold", children: order.amount }), _jsx("p", { className: "text-white/60 text-xs", children: order.time })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-white/80 text-sm", children: order.product }), _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`, children: getStatusText(order.status) })] })] }, order.id))) })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(SparklesIcon, { className: "w-6 h-6 text-orange-400" }), _jsx("h2", { className: "text-xl font-bold text-white", children: "AI \u00D6nerileri" })] }), _jsx("div", { className: "space-y-4", children: aiSuggestions.map((suggestion, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h3", { className: "text-white font-semibold text-sm", children: suggestion.title }), _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${suggestion.impact === 'Kritik' ? 'bg-red-500/20 text-red-400' :
                                                            suggestion.impact === 'Yüksek' ? 'bg-orange-500/20 text-orange-400' :
                                                                'bg-blue-500/20 text-blue-400'}`, children: suggestion.impact })] }), _jsx("p", { className: "text-white/70 text-xs mb-3", children: suggestion.description }), _jsx("button", { className: "w-full py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 text-sm font-medium transition-all", children: suggestion.action })] }, index))) })] })] })] }) }));
}
