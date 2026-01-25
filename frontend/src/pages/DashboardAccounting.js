import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, TableCellsIcon, ChartBarIcon, CalendarIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, } from '@heroicons/react/24/outline';
import BackButton from '../components/BackButton';
export default function DashboardAccounting() {
    const [activeTab, setActiveTab] = useState('yevmiye');
    const [selectedPeriod, setSelectedPeriod] = useState('2024-01');
    const [searchQuery, setSearchQuery] = useState('');
    // Demo veriler - Gerçek uygulamada API'den gelecek
    const yevmiyeKayitlari = [
        {
            id: '1',
            tarih: '2024-01-15',
            aciklama: 'ABC Ltd. Fatura No: 2024/001',
            hesapKodu: '100',
            hesapAdi: 'Kasa',
            borc: 11800,
            alacak: 0,
            tur: 'gelir',
            belgeNo: 'FAT-2024/001',
        },
        {
            id: '2',
            tarih: '2024-01-15',
            aciklama: 'ABC Ltd. Fatura No: 2024/001',
            hesapKodu: '600',
            hesapAdi: 'Yurtiçi Satışlar',
            borc: 0,
            alacak: 10000,
            tur: 'gelir',
            belgeNo: 'FAT-2024/001',
        },
        {
            id: '3',
            tarih: '2024-01-15',
            aciklama: 'ABC Ltd. Fatura No: 2024/001 - KDV',
            hesapKodu: '391',
            hesapAdi: 'Hesaplanan KDV',
            borc: 0,
            alacak: 1800,
            tur: 'gelir',
            belgeNo: 'FAT-2024/001',
        },
        {
            id: '4',
            tarih: '2024-01-18',
            aciklama: 'Elektrik Faturası',
            hesapKodu: '770',
            hesapAdi: 'Genel Yönetim Giderleri',
            borc: 590,
            alacak: 0,
            tur: 'gider',
            belgeNo: 'GID-2024/015',
        },
        {
            id: '5',
            tarih: '2024-01-18',
            aciklama: 'Elektrik Faturası - KDV',
            hesapKodu: '191',
            hesapAdi: 'İndirilecek KDV',
            borc: 106.20,
            alacak: 0,
            tur: 'gider',
            belgeNo: 'GID-2024/015',
        },
        {
            id: '6',
            tarih: '2024-01-18',
            aciklama: 'Elektrik Faturası Ödemesi',
            hesapKodu: '100',
            hesapAdi: 'Kasa',
            borc: 0,
            alacak: 696.20,
            tur: 'gider',
            belgeNo: 'GID-2024/015',
        },
    ];
    const hesapOzetleri = [
        { hesapKodu: '100', hesapAdi: 'Kasa', toplamBorc: 11800, toplamAlacak: 696.20, bakiye: 11103.80 },
        { hesapKodu: '191', hesapAdi: 'İndirilecek KDV', toplamBorc: 106.20, toplamAlacak: 0, bakiye: 106.20 },
        { hesapKodu: '391', hesapAdi: 'Hesaplanan KDV', toplamBorc: 0, toplamAlacak: 1800, bakiye: -1800 },
        { hesapKodu: '600', hesapAdi: 'Yurtiçi Satışlar', toplamBorc: 0, toplamAlacak: 10000, bakiye: -10000 },
        { hesapKodu: '770', hesapAdi: 'Genel Yönetim Giderleri', toplamBorc: 590, toplamAlacak: 0, bakiye: 590 },
    ];
    const toplamBorc = yevmiyeKayitlari.reduce((sum, t) => sum + t.borc, 0);
    const toplamAlacak = yevmiyeKayitlari.reduce((sum, t) => sum + t.alacak, 0);
    const filteredTransactions = yevmiyeKayitlari.filter(t => t.aciklama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.hesapAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.hesapKodu.includes(searchQuery));
    return (_jsx("div", { className: "min-h-screen p-4 md:p-6 lg:p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "mb-6", children: _jsx(BackButton, {}) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2", children: "Muhasebe" }), _jsx("p", { className: "text-white/60", children: "Yevmiye defteri, b\u00FCy\u00FCk defter ve mizan raporlar\u0131n\u0131z" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.1 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "p-2 rounded-lg bg-green-500/20", children: _jsx(ArrowDownTrayIcon, { className: "w-5 h-5 text-green-400" }) }), _jsx("span", { className: "text-white/60 text-sm", children: "Toplam Bor\u00E7" })] }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "p-2 rounded-lg bg-blue-500/20", children: _jsx(ArrowDownTrayIcon, { className: "w-5 h-5 text-blue-400 rotate-180" }) }), _jsx("span", { className: "text-white/60 text-sm", children: "Toplam Alacak" })] }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "p-2 rounded-lg bg-purple-500/20", children: _jsx(ChartBarIcon, { className: "w-5 h-5 text-purple-400" }) }), _jsx("span", { className: "text-white/60 text-sm", children: "Fark (Denge)" })] }), _jsxs("p", { className: `text-2xl font-bold ${toplamBorc === toplamAlacak ? 'text-green-400' : 'text-red-400'}`, children: [Math.abs(toplamBorc - toplamAlacak).toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA", toplamBorc === toplamAlacak && ' ✓'] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "glass-card p-4 mb-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" }), _jsx("input", { type: "text", placeholder: "Hesap ad\u0131, kod veya a\u00E7\u0131klama ara...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "w-5 h-5 text-white/40" }), _jsxs("select", { value: selectedPeriod, onChange: (e) => setSelectedPeriod(e.target.value), className: "px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "2024-01", children: "Ocak 2024" }), _jsx("option", { value: "2023-12", children: "Aral\u0131k 2023" }), _jsx("option", { value: "2023-11", children: "Kas\u0131m 2023" })] })] }), _jsxs("button", { className: "btn-secondary", children: [_jsx(ArrowDownTrayIcon, { className: "w-5 h-5" }), _jsx("span", { className: "hidden sm:inline", children: "D\u0131\u015Fa Aktar" })] })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "glass-card mb-6", children: _jsxs("div", { className: "flex border-b border-white/10", children: [_jsxs("button", { onClick: () => setActiveTab('yevmiye'), className: `flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'yevmiye'
                                    ? 'text-amber-400 border-b-2 border-amber-400'
                                    : 'text-white/60 hover:text-white'}`, children: [_jsx(DocumentTextIcon, { className: "w-5 h-5" }), "Yevmiye Defteri"] }), _jsxs("button", { onClick: () => setActiveTab('buyukDefter'), className: `flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'buyukDefter'
                                    ? 'text-amber-400 border-b-2 border-amber-400'
                                    : 'text-white/60 hover:text-white'}`, children: [_jsx(TableCellsIcon, { className: "w-5 h-5" }), "B\u00FCy\u00FCk Defter"] }), _jsxs("button", { onClick: () => setActiveTab('mizan'), className: `flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'mizan'
                                    ? 'text-amber-400 border-b-2 border-amber-400'
                                    : 'text-white/60 hover:text-white'}`, children: [_jsx(ChartBarIcon, { className: "w-5 h-5" }), "Mizan"] })] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, className: "glass-card overflow-hidden", children: [activeTab === 'yevmiye' && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-white/5", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "Tarih" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "Hesap Kodu" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "Hesap Ad\u0131" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "A\u00E7\u0131klama" }), _jsx("th", { className: "px-4 py-3 text-right text-sm font-medium text-white/80", children: "Bor\u00E7" }), _jsx("th", { className: "px-4 py-3 text-right text-sm font-medium text-white/80", children: "Alacak" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "Belge No" })] }) }), _jsx("tbody", { className: "divide-y divide-white/10", children: filteredTransactions.map((transaction) => (_jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [_jsx("td", { className: "px-4 py-3 text-sm text-white/80", children: new Date(transaction.tarih).toLocaleDateString('tr-TR') }), _jsx("td", { className: "px-4 py-3 text-sm font-mono text-white", children: transaction.hesapKodu }), _jsx("td", { className: "px-4 py-3 text-sm text-white", children: transaction.hesapAdi }), _jsx("td", { className: "px-4 py-3 text-sm text-white/60", children: transaction.aciklama }), _jsx("td", { className: "px-4 py-3 text-sm text-right font-medium text-green-400", children: transaction.borc > 0
                                                        ? transaction.borc.toLocaleString('tr-TR', { minimumFractionDigits: 2 })
                                                        : '-' }), _jsx("td", { className: "px-4 py-3 text-sm text-right font-medium text-blue-400", children: transaction.alacak > 0
                                                        ? transaction.alacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })
                                                        : '-' }), _jsx("td", { className: "px-4 py-3 text-sm font-mono text-white/60", children: transaction.belgeNo })] }, transaction.id))) }), _jsx("tfoot", { className: "bg-white/5 font-bold", children: _jsxs("tr", { children: [_jsx("td", { colSpan: 4, className: "px-4 py-3 text-sm text-white", children: "TOPLAM" }), _jsxs("td", { className: "px-4 py-3 text-sm text-right text-green-400", children: [toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] }), _jsxs("td", { className: "px-4 py-3 text-sm text-right text-blue-400", children: [toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] }), _jsx("td", {})] }) })] }) })), activeTab === 'buyukDefter' && (_jsxs("div", { className: "p-6", children: [_jsx("p", { className: "text-white/60 mb-4", children: "Hesap bazl\u0131 detayl\u0131 kay\u0131tlar" }), _jsx("div", { className: "space-y-4", children: hesapOzetleri.map((hesap) => (_jsxs("div", { className: "p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsx("span", { className: "font-mono text-amber-400", children: hesap.hesapKodu }), _jsx("span", { className: "text-white ml-3", children: hesap.hesapAdi })] }), _jsxs("span", { className: `font-bold ${hesap.bakiye >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [Math.abs(hesap.bakiye).toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] })] }), _jsxs("div", { className: "flex gap-6 text-sm", children: [_jsxs("span", { className: "text-white/60", children: ["Bor\u00E7: ", _jsxs("span", { className: "text-green-400", children: [hesap.toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] })] }), _jsxs("span", { className: "text-white/60", children: ["Alacak: ", _jsxs("span", { className: "text-blue-400", children: [hesap.toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] })] })] })] }, hesap.hesapKodu))) })] })), activeTab === 'mizan' && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-white/5", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "Hesap Kodu" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-medium text-white/80", children: "Hesap Ad\u0131" }), _jsx("th", { className: "px-4 py-3 text-right text-sm font-medium text-white/80", children: "Bor\u00E7 Toplam\u0131" }), _jsx("th", { className: "px-4 py-3 text-right text-sm font-medium text-white/80", children: "Alacak Toplam\u0131" }), _jsx("th", { className: "px-4 py-3 text-right text-sm font-medium text-white/80", children: "Bakiye" })] }) }), _jsx("tbody", { className: "divide-y divide-white/10", children: hesapOzetleri.map((hesap) => (_jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [_jsx("td", { className: "px-4 py-3 text-sm font-mono text-amber-400", children: hesap.hesapKodu }), _jsx("td", { className: "px-4 py-3 text-sm text-white", children: hesap.hesapAdi }), _jsxs("td", { className: "px-4 py-3 text-sm text-right text-green-400", children: [hesap.toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] }), _jsxs("td", { className: "px-4 py-3 text-sm text-right text-blue-400", children: [hesap.toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] }), _jsxs("td", { className: `px-4 py-3 text-sm text-right font-bold ${hesap.bakiye >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [Math.abs(hesap.bakiye).toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA", hesap.bakiye < 0 && ' (A)'] })] }, hesap.hesapKodu))) }), _jsx("tfoot", { className: "bg-white/5 font-bold", children: _jsxs("tr", { children: [_jsx("td", { colSpan: 2, className: "px-4 py-3 text-sm text-white", children: "GENEL TOPLAM" }), _jsxs("td", { className: "px-4 py-3 text-sm text-right text-green-400", children: [hesapOzetleri.reduce((sum, h) => sum + h.toplamBorc, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] }), _jsxs("td", { className: "px-4 py-3 text-sm text-right text-blue-400", children: [hesapOzetleri.reduce((sum, h) => sum + h.toplamAlacak, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 }), " \u20BA"] }), _jsx("td", { className: "px-4 py-3 text-sm text-right", children: toplamBorc === toplamAlacak ? (_jsx("span", { className: "text-green-400", children: "Dengede \u2713" })) : (_jsx("span", { className: "text-red-400", children: "Dengesiz \u26A0\uFE0F" })) })] }) })] }) }))] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 }, className: "glass-card p-6 mt-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20", children: _jsx(ChartBarIcon, { className: "w-6 h-6 text-purple-400" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "AI Muhasebe \u0130\u00E7g\u00F6r\u00FCleri" }), _jsxs("ul", { className: "space-y-2 text-white/70", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-green-400 mt-1", children: "\u2713" }), _jsx("span", { children: "Muhasebe kay\u0131tlar\u0131n\u0131z dengede. Bor\u00E7 = Alacak \u2705" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-amber-400 mt-1", children: "\u26A0\uFE0F" }), _jsx("span", { children: "KDV beyannameniz bu ay 15'inde. \u00D6denecek KDV: 1.693,80 \u20BA" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-blue-400 mt-1", children: "\uD83D\uDCA1" }), _jsx("span", { children: "Genel y\u00F6netim giderleriniz ge\u00E7en aya g\u00F6re %12 artt\u0131. Elektrik ve kira \u00F6demeleri y\u00FCksek." })] })] })] })] }) })] }) }));
}
