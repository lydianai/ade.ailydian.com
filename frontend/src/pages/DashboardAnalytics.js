import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';
import { ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, DocumentTextIcon, BanknotesIcon, UserGroupIcon, } from '@heroicons/react/24/outline';
export default function DashboardAnalytics() {
    const [selectedRange, setSelectedRange] = useState('month');
    const timeRanges = [
        { label: 'Günlük', value: 'day' },
        { label: 'Haftalık', value: 'week' },
        { label: 'Aylık', value: 'month' },
        { label: 'Yıllık', value: 'year' },
    ];
    const metrics = [
        {
            title: 'Toplam Gelir',
            value: '₺845,230',
            change: 12.5,
            trend: 'up',
            icon: BanknotesIcon,
            color: 'from-amber-500 to-orange-500',
        },
        {
            title: 'Kesilen Fatura',
            value: '1,247',
            change: 8.2,
            trend: 'up',
            icon: DocumentTextIcon,
            color: 'from-teal-500 to-cyan-500',
        },
        {
            title: 'Aktif Müşteri',
            value: '892',
            change: -3.1,
            trend: 'down',
            icon: UserGroupIcon,
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Ortalama Fatura',
            value: '₺677',
            change: 15.8,
            trend: 'up',
            icon: ChartBarIcon,
            color: 'from-blue-500 to-indigo-500',
        },
    ];
    // Mock chart data for revenue
    const revenueData = [
        { month: 'Oca', value: 65000 },
        { month: 'Şub', value: 72000 },
        { month: 'Mar', value: 68000 },
        { month: 'Nis', value: 85000 },
        { month: 'May', value: 92000 },
        { month: 'Haz', value: 88000 },
        { month: 'Tem', value: 95000 },
        { month: 'Ağu', value: 102000 },
        { month: 'Eyl', value: 98000 },
        { month: 'Eki', value: 110000 },
        { month: 'Kas', value: 105000 },
        { month: 'Ara', value: 120000 },
    ];
    const maxRevenue = Math.max(...revenueData.map((d) => d.value));
    // Mock chart data for invoices
    const invoiceData = [
        { month: 'Oca', value: 95 },
        { month: 'Şub', value: 102 },
        { month: 'Mar', value: 98 },
        { month: 'Nis', value: 115 },
        { month: 'May', value: 122 },
        { month: 'Haz', value: 118 },
        { month: 'Tem', value: 125 },
        { month: 'Ağu', value: 132 },
        { month: 'Eyl', value: 128 },
        { month: 'Eki', value: 140 },
        { month: 'Kas', value: 135 },
        { month: 'Ara', value: 150 },
    ];
    const maxInvoices = Math.max(...invoiceData.map((d) => d.value));
    // Top customers
    const topCustomers = [
        { name: 'ABC Teknoloji A.Ş.', revenue: '₺125,430', invoices: 45, growth: 23 },
        { name: 'XYZ Ltd. Şti.', revenue: '₺98,250', invoices: 38, growth: 15 },
        { name: 'DEF İnşaat', revenue: '₺87,900', invoices: 32, growth: 31 },
        { name: 'GHI Danışmanlık', revenue: '₺76,540', invoices: 28, growth: -5 },
        { name: 'JKL Perakende', revenue: '₺65,320', invoices: 24, growth: 12 },
    ];
    // Invoice status distribution
    const invoiceStatus = [
        { status: 'Onaylandı', count: 856, percentage: 68.7, color: 'bg-green-500' },
        { status: 'Beklemede', count: 234, percentage: 18.8, color: 'bg-amber-500' },
        { status: 'Taslak', count: 102, percentage: 8.2, color: 'bg-blue-500' },
        { status: 'Reddedildi', count: 55, percentage: 4.4, color: 'bg-red-500' },
    ];
    return (_jsxs("div", { className: "min-h-screen p-8", children: [_jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "mb-4 px-8 pt-8", children: _jsx(BackButton, {}) }) }), _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Analitik Raporlar" }), _jsx("p", { className: "text-white/60", children: "Detayl\u0131 i\u015F performans\u0131 ve gelir analizi" })] }), _jsx("div", { className: "flex gap-2 glass-card p-2 rounded-xl", children: timeRanges.map((range) => (_jsx("button", { onClick: () => setSelectedRange(range.value), className: `px-4 py-2 rounded-lg transition-all font-medium ${selectedRange === range.value
                                        ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'}`, children: range.label }, range.value))) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: metrics.map((metric, idx) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: idx * 0.1 }, className: "glass-card p-6 relative overflow-hidden", children: [_jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10` }), _jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`, children: _jsx(metric.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: `flex items-center gap-1 px-2 py-1 rounded-lg ${metric.trend === 'up'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-red-500/20 text-red-400'}`, children: [metric.trend === 'up' ? (_jsx(ArrowTrendingUpIcon, { className: "w-4 h-4" })) : (_jsx(ArrowTrendingDownIcon, { className: "w-4 h-4" })), _jsxs("span", { className: "text-sm font-medium", children: [Math.abs(metric.change), "%"] })] })] }), _jsx("h3", { className: "text-white/60 text-sm mb-1", children: metric.title }), _jsx("p", { className: "text-3xl font-bold text-white", children: metric.value })] })] }, idx))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Gelir Trendi" }), _jsxs("div", { className: "flex items-center gap-2 text-green-400 text-sm", children: [_jsx(ArrowTrendingUpIcon, { className: "w-4 h-4" }), _jsx("span", { children: "+18.2% bu ay" })] })] }), _jsx("div", { className: "flex items-end gap-2 h-64", children: revenueData.map((item, idx) => (_jsx(motion.div, { initial: { height: 0 }, animate: { height: `${(item.value / maxRevenue) * 100}%` }, transition: { delay: 0.5 + idx * 0.05, duration: 0.5 }, className: "flex-1 flex flex-col items-center gap-2", children: _jsxs("div", { className: "relative w-full group", children: [_jsx("div", { className: "w-full bg-gradient-to-t from-amber-500 to-teal-500 rounded-t-lg transition-all hover:opacity-80" }), _jsx("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: _jsxs("div", { className: "glass-card px-3 py-2 whitespace-nowrap", children: [_jsx("p", { className: "text-xs text-white/60", children: item.month }), _jsxs("p", { className: "text-sm font-bold text-white", children: ["\u20BA", item.value.toLocaleString('tr-TR')] })] }) })] }) }, idx))) }), _jsx("div", { className: "flex gap-2 mt-2", children: revenueData.map((item, idx) => (_jsx("div", { className: "flex-1 text-center", children: _jsx("span", { className: "text-xs text-white/40", children: item.month }) }, idx))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Fatura Say\u0131s\u0131" }), _jsxs("div", { className: "flex items-center gap-2 text-teal-400 text-sm", children: [_jsx(ArrowTrendingUpIcon, { className: "w-4 h-4" }), _jsx("span", { children: "+12.5% bu ay" })] })] }), _jsx("div", { className: "relative h-64", children: _jsxs("svg", { className: "w-full h-full", viewBox: "0 0 600 256", preserveAspectRatio: "none", children: [[0, 1, 2, 3, 4].map((i) => (_jsx("line", { x1: "0", y1: i * 64, x2: "600", y2: i * 64, stroke: "rgba(255, 255, 255, 0.05)", strokeWidth: "1" }, i))), _jsx("defs", { children: _jsxs("linearGradient", { id: "areaGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "rgb(20, 184, 166)", stopOpacity: "0.3" }), _jsx("stop", { offset: "100%", stopColor: "rgb(20, 184, 166)", stopOpacity: "0" })] }) }), _jsx(motion.path, { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay: 0.6, duration: 1.5 }, d: `
                    M 0 ${256 - (invoiceData[0].value / maxInvoices) * 256}
                    ${invoiceData
                                                        .slice(1)
                                                        .map((item, idx) => `L ${((idx + 1) * 600) / (invoiceData.length - 1)} ${256 - (item.value / maxInvoices) * 256}`)
                                                        .join(' ')}
                    L 600 256
                    L 0 256
                    Z
                  `, fill: "url(#areaGradient)" }), _jsx(motion.path, { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay: 0.6, duration: 1.5 }, d: `
                    M 0 ${256 - (invoiceData[0].value / maxInvoices) * 256}
                    ${invoiceData
                                                        .slice(1)
                                                        .map((item, idx) => `L ${((idx + 1) * 600) / (invoiceData.length - 1)} ${256 - (item.value / maxInvoices) * 256}`)
                                                        .join(' ')}
                  `, fill: "none", stroke: "rgb(20, 184, 166)", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }), invoiceData.map((item, idx) => (_jsx(motion.circle, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.6 + idx * 0.1 }, cx: (idx * 600) / (invoiceData.length - 1), cy: 256 - (item.value / maxInvoices) * 256, r: "5", fill: "rgb(20, 184, 166)", className: "cursor-pointer hover:r-7 transition-all" }, idx)))] }) }), _jsx("div", { className: "flex gap-2 mt-2", children: invoiceData.map((item, idx) => (_jsx("div", { className: "flex-1 text-center", children: _jsx("span", { className: "text-xs text-white/40", children: item.month }) }, idx))) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, className: "glass-card p-6", children: [_jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "En \u0130yi M\u00FC\u015Fteriler" }), _jsx("div", { className: "space-y-4", children: topCustomers.map((customer, idx) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.7 + idx * 0.1 }, className: "flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white", children: idx + 1 }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: customer.name }), _jsxs("p", { className: "text-sm text-white/60", children: [customer.invoices, " fatura"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-bold text-white", children: customer.revenue }), _jsxs("div", { className: `flex items-center gap-1 justify-end ${customer.growth >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [customer.growth >= 0 ? (_jsx(ArrowTrendingUpIcon, { className: "w-3 h-3" })) : (_jsx(ArrowTrendingDownIcon, { className: "w-3 h-3" })), _jsxs("span", { className: "text-xs", children: [Math.abs(customer.growth), "%"] })] })] })] }, idx))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 }, className: "glass-card p-6", children: [_jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Fatura Durum Da\u011F\u0131l\u0131m\u0131" }), _jsx("div", { className: "space-y-4", children: invoiceStatus.map((status, idx) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.8 + idx * 0.1 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${status.color}` }), _jsx("span", { className: "text-white font-medium", children: status.status })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-white/60 text-sm", children: [status.count, " adet"] }), _jsxs("span", { className: "text-white font-bold", children: [status.percentage, "%"] })] })] }), _jsx("div", { className: "h-2 bg-white/5 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${status.percentage}%` }, transition: { delay: 0.9 + idx * 0.1, duration: 0.8 }, className: `h-full ${status.color} rounded-full` }) })] }, idx))) }), _jsx("div", { className: "mt-6 pt-6 border-t border-white/10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white/60", children: "Toplam Fatura" }), _jsx("span", { className: "text-2xl font-bold text-white", children: invoiceStatus.reduce((sum, s) => sum + s.count, 0).toLocaleString('tr-TR') })] }) })] })] })] })] }));
}
