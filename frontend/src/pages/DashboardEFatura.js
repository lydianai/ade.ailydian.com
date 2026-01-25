import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';
import { DocumentTextIcon, PlusIcon, MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon, PaperAirplaneIcon, CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon, } from '@heroicons/react/24/outline';
import { apiClient } from '../services/api';
export default function DashboardEFatura() {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    // Form state for new invoice
    const [newInvoice, setNewInvoice] = useState({
        aliciAd: '',
        aliciVkn: '',
        aciklama: '',
        birimFiyat: '',
        miktar: '',
    });
    useEffect(() => {
        fetchInvoices();
    }, []);
    const fetchInvoices = async () => {
        setIsLoading(true);
        try {
            // Mock data for now - will be replaced with real API
            const mockInvoices = [
                {
                    id: '1',
                    faturaNo: 'FAT-2026-001',
                    tarih: '2026-01-23',
                    alici: { ad: 'ABC Ltd. Şti.', vkn: '1234567890' },
                    tutar: 10000,
                    kdv: 2000,
                    toplam: 12000,
                    durum: 'GONDERILDI',
                    ettn: 'ETTN-ABC-001',
                },
                {
                    id: '2',
                    faturaNo: 'FAT-2026-002',
                    tarih: '2026-01-22',
                    alici: { ad: 'XYZ A.Ş.', vkn: '9876543210' },
                    tutar: 5000,
                    kdv: 1000,
                    toplam: 6000,
                    durum: 'ONAYLANDI',
                    ettn: 'ETTN-XYZ-002',
                },
                {
                    id: '3',
                    faturaNo: 'FAT-2026-003',
                    tarih: '2026-01-23',
                    alici: { ad: 'DEF Tic. Ltd.', vkn: '5555555555' },
                    tutar: 8500,
                    kdv: 1700,
                    toplam: 10200,
                    durum: 'TASLAK',
                },
            ];
            setInvoices(mockInvoices);
        }
        catch (error) {
            console.error('Faturalar yüklenemedi:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCreateInvoice = async () => {
        try {
            const tutar = parseFloat(newInvoice.birimFiyat) * parseFloat(newInvoice.miktar);
            const kdv = tutar * 0.2; // %20 KDV
            const toplam = tutar + kdv;
            const invoiceData = {
                faturaNo: `FAT-${Date.now()}`,
                aliciAd: newInvoice.aliciAd,
                aliciVkn: newInvoice.aliciVkn,
                aciklama: newInvoice.aciklama,
                tutar,
                kdv,
                toplam,
            };
            // Call GİB API
            const response = await apiClient.post('/v1/integrations/gib/e-fatura', invoiceData);
            // Add to list
            const newInv = {
                id: Date.now().toString(),
                faturaNo: invoiceData.faturaNo,
                tarih: new Date().toISOString().split('T')[0],
                alici: {
                    ad: invoiceData.aliciAd,
                    vkn: invoiceData.aliciVkn,
                },
                tutar: invoiceData.tutar,
                kdv: invoiceData.kdv,
                toplam: invoiceData.toplam,
                durum: 'TASLAK',
                ettn: response.data.ettn,
            };
            setInvoices([newInv, ...invoices]);
            setShowCreateModal(false);
            setNewInvoice({
                aliciAd: '',
                aliciVkn: '',
                aciklama: '',
                birimFiyat: '',
                miktar: '',
            });
        }
        catch (error) {
            console.error('Fatura oluşturulamadı:', error);
            alert('Fatura oluşturulamadı. Lütfen tekrar deneyin.');
        }
    };
    const handleSendToGib = async (invoice) => {
        try {
            // Update invoice status
            const updatedInvoices = invoices.map((inv) => inv.id === invoice.id ? { ...inv, durum: 'GONDERILDI' } : inv);
            setInvoices(updatedInvoices);
            // Show success notification
            alert(`Fatura ${invoice.faturaNo} GİB'e gönderildi!`);
        }
        catch (error) {
            console.error('Fatura gönderilemedi:', error);
        }
    };
    const getStatusColor = (durum) => {
        switch (durum) {
            case 'TASLAK':
                return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
            case 'GONDERILDI':
                return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
            case 'ONAYLANDI':
                return 'text-green-400 bg-green-500/10 border-green-500/30';
            case 'REDDEDILDI':
                return 'text-red-400 bg-red-500/10 border-red-500/30';
            default:
                return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        }
    };
    const getStatusIcon = (durum) => {
        switch (durum) {
            case 'TASLAK':
                return _jsx(ClockIcon, { className: "w-5 h-5" });
            case 'GONDERILDI':
                return _jsx(PaperAirplaneIcon, { className: "w-5 h-5" });
            case 'ONAYLANDI':
                return _jsx(CheckCircleIcon, { className: "w-5 h-5" });
            case 'REDDEDILDI':
                return _jsx(XCircleIcon, { className: "w-5 h-5" });
            default:
                return null;
        }
    };
    const filteredInvoices = invoices.filter((inv) => {
        const matchesSearch = inv.faturaNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.alici.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.alici.vkn.includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || inv.durum === filterStatus;
        return matchesSearch && matchesFilter;
    });
    return (_jsxs("div", { className: "min-h-screen p-8", children: [_jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "mb-4 px-8 pt-8", children: _jsx(BackButton, {}) }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-gradient-amber-teal mb-3", children: "e-Fatura" }), _jsx("p", { className: "text-white/60 text-lg", children: "G\u0130B entegrasyonu ile e-fatura olu\u015Ftur, g\u00F6nder ve y\u00F6net" })] }), _jsxs("button", { onClick: () => setShowCreateModal(true), className: "btn-primary", children: [_jsx(PlusIcon, { className: "w-5 h-5 mr-2" }), "Yeni Fatura"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
                            {
                                label: 'Toplam Fatura',
                                value: invoices.length,
                                color: 'from-amber-500 to-orange-500',
                            },
                            {
                                label: 'Gönderildi',
                                value: invoices.filter((i) => i.durum === 'GONDERILDI').length,
                                color: 'from-blue-500 to-cyan-500',
                            },
                            {
                                label: 'Onaylandı',
                                value: invoices.filter((i) => i.durum === 'ONAYLANDI').length,
                                color: 'from-green-500 to-emerald-500',
                            },
                            {
                                label: 'Taslak',
                                value: invoices.filter((i) => i.durum === 'TASLAK').length,
                                color: 'from-purple-500 to-pink-500',
                            },
                        ].map((stat, idx) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("p", { className: "text-white/60 text-sm mb-2", children: stat.label }), _jsx("p", { className: `text-4xl font-bold text-gradient bg-gradient-to-r ${stat.color}`, children: stat.value })] }, idx))) }), _jsx("div", { className: "glass-card p-6 mb-6", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" }), _jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Fatura no, firma ad\u0131 veya VKN ara...", className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FunnelIcon, { className: "w-5 h-5 text-white/40" }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "all", children: "T\u00FCm Durumlar" }), _jsx("option", { value: "TASLAK", children: "Taslak" }), _jsx("option", { value: "GONDERILDI", children: "G\u00F6nderildi" }), _jsx("option", { value: "ONAYLANDI", children: "Onayland\u0131" }), _jsx("option", { value: "REDDEDILDI", children: "Reddedildi" })] })] })] }) }), _jsx("div", { className: "space-y-4", children: isLoading ? (_jsxs("div", { className: "glass-card p-12 text-center", children: [_jsx("div", { className: "w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-white/60", children: "Faturalar y\u00FCkleniyor..." })] })) : filteredInvoices.length === 0 ? (_jsxs("div", { className: "glass-card p-12 text-center", children: [_jsx(DocumentTextIcon, { className: "w-16 h-16 text-white/20 mx-auto mb-4" }), _jsx("p", { className: "text-white/60", children: "Hen\u00FCz fatura bulunmuyor" })] })) : (filteredInvoices.map((invoice) => (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "glass-card p-6 hover:scale-[1.01] transition-transform", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-4 mb-3", children: [_jsx("h3", { className: "text-xl font-bold text-white", children: invoice.faturaNo }), _jsxs("span", { className: `px-3 py-1 rounded-lg border text-sm flex items-center gap-2 ${getStatusColor(invoice.durum)}`, children: [getStatusIcon(invoice.durum), invoice.durum] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white/40 mb-1", children: "Al\u0131c\u0131" }), _jsx("p", { className: "text-white font-medium", children: invoice.alici.ad }), _jsxs("p", { className: "text-white/60 text-xs", children: ["VKN: ", invoice.alici.vkn] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-white/40 mb-1", children: "Tarih" }), _jsx("p", { className: "text-white", children: invoice.tarih })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-white/40 text-sm mb-1", children: "Toplam Tutar" }), _jsxs("p", { className: "text-3xl font-bold text-gradient-amber-teal mb-4", children: ["\u20BA", invoice.toplam.toLocaleString('tr-TR')] }), _jsxs("div", { className: "flex gap-2", children: [invoice.durum === 'TASLAK' && (_jsxs("button", { onClick: () => handleSendToGib(invoice), className: "btn-primary text-sm", children: [_jsx(PaperAirplaneIcon, { className: "w-4 h-4 mr-1" }), "G\u0130B'e G\u00F6nder"] })), _jsxs("button", { className: "btn-secondary text-sm", children: [_jsx(EyeIcon, { className: "w-4 h-4 mr-1" }), "G\u00F6r\u00FCnt\u00FCle"] }), _jsx("button", { className: "btn-secondary text-sm", children: _jsx(ArrowDownTrayIcon, { className: "w-4 h-4" }) })] })] })] }) }, invoice.id)))) })] }), showCreateModal && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Yeni e-Fatura Olu\u015Ftur" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white/60 text-sm mb-2", children: "Al\u0131c\u0131 Firma Ad\u0131" }), _jsx("input", { type: "text", value: newInvoice.aliciAd, onChange: (e) => setNewInvoice({ ...newInvoice, aliciAd: e.target.value }), className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", placeholder: "ABC Ltd. \u015Eti." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/60 text-sm mb-2", children: "VKN / TCKN" }), _jsx("input", { type: "text", value: newInvoice.aliciVkn, onChange: (e) => setNewInvoice({ ...newInvoice, aliciVkn: e.target.value }), className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", placeholder: "1234567890" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/60 text-sm mb-2", children: "A\u00E7\u0131klama" }), _jsx("textarea", { value: newInvoice.aciklama, onChange: (e) => setNewInvoice({ ...newInvoice, aciklama: e.target.value }), rows: 3, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", placeholder: "Hizmet/\u00FCr\u00FCn a\u00E7\u0131klamas\u0131" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white/60 text-sm mb-2", children: "Birim Fiyat (\u20BA)" }), _jsx("input", { type: "number", value: newInvoice.birimFiyat, onChange: (e) => setNewInvoice({ ...newInvoice, birimFiyat: e.target.value }), className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", placeholder: "1000" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/60 text-sm mb-2", children: "Miktar" }), _jsx("input", { type: "number", value: newInvoice.miktar, onChange: (e) => setNewInvoice({ ...newInvoice, miktar: e.target.value }), className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", placeholder: "1" })] })] }), newInvoice.birimFiyat && newInvoice.miktar && (_jsxs("div", { className: "glass-card p-4 bg-amber-500/10 border border-amber-500/30", children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-white/60", children: "Tutar:" }), _jsxs("span", { className: "text-white", children: ["\u20BA", (parseFloat(newInvoice.birimFiyat) * parseFloat(newInvoice.miktar)).toLocaleString('tr-TR')] })] }), _jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-white/60", children: "KDV (%20):" }), _jsxs("span", { className: "text-white", children: ["\u20BA", (parseFloat(newInvoice.birimFiyat) *
                                                            parseFloat(newInvoice.miktar) *
                                                            0.2).toLocaleString('tr-TR')] })] }), _jsxs("div", { className: "flex justify-between font-bold border-t border-amber-500/30 pt-2", children: [_jsx("span", { className: "text-white", children: "Toplam:" }), _jsxs("span", { className: "text-amber-400 text-xl", children: ["\u20BA", (parseFloat(newInvoice.birimFiyat) *
                                                            parseFloat(newInvoice.miktar) *
                                                            1.2).toLocaleString('tr-TR')] })] })] }))] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx("button", { onClick: handleCreateInvoice, className: "btn-primary flex-1", children: "Fatura Olu\u015Ftur" }), _jsx("button", { onClick: () => setShowCreateModal(false), className: "btn-secondary flex-1", children: "\u0130ptal" })] })] }) }))] }));
}
