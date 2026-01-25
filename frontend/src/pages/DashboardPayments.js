import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon, BanknotesIcon, CheckCircleIcon, ClockIcon, XCircleIcon, ArrowPathIcon, CalendarIcon, CreditCardIcon, BuildingLibraryIcon, DocumentTextIcon, } from '@heroicons/react/24/outline';
import { useNotificationStore } from '../contexts/useNotificationStore';
import BackButton from '../components/BackButton';
export default function DashboardPayments() {
    const { addNotification } = useNotificationStore();
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterMethod, setFilterMethod] = useState('ALL');
    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: 0,
        currency: 'TRY',
        method: 'Havale',
        status: 'PENDING',
        paymentDate: new Date().toISOString().split('T')[0],
    });
    // Fetch payments
    useEffect(() => {
        fetchPayments();
    }, []);
    // Filter payments
    useEffect(() => {
        let filtered = payments;
        // Filter by status
        if (filterStatus !== 'ALL') {
            filtered = filtered.filter((p) => p.status === filterStatus);
        }
        // Filter by method
        if (filterMethod !== 'ALL') {
            filtered = filtered.filter((p) => p.method === filterMethod);
        }
        // Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((p) => {
                return (p.customerName.toLowerCase().includes(query) ||
                    p.invoiceNo?.toLowerCase().includes(query) ||
                    p.transactionId?.toLowerCase().includes(query) ||
                    p.bankName?.toLowerCase().includes(query));
            });
        }
        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
        setFilteredPayments(filtered);
    }, [payments, searchQuery, filterStatus, filterMethod]);
    const fetchPayments = async () => {
        setIsLoading(true);
        try {
            // Mock data for now - replace with real API call
            const mockPayments = [
                {
                    id: '1',
                    invoiceId: 'inv-001',
                    invoiceNo: 'FAT-2026-001',
                    customerName: 'ABC Teknoloji A.Ş.',
                    amount: 15000.00,
                    currency: 'TRY',
                    method: 'Havale',
                    status: 'COMPLETED',
                    bankName: 'Ziraat Bankası',
                    transactionId: 'TRX-2026-001234',
                    paymentDate: '2026-01-20',
                    valueDate: '2026-01-20',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '2',
                    invoiceId: 'inv-002',
                    invoiceNo: 'FAT-2026-002',
                    customerName: 'XYZ Ltd. Şti.',
                    amount: 10200.00,
                    currency: 'TRY',
                    method: 'Kredi Kartı',
                    status: 'PENDING',
                    transactionId: 'TRX-2026-009876',
                    paymentDate: '2026-01-23',
                    notes: 'Kredi kartı ödemesi onay bekliyor',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '3',
                    invoiceId: 'inv-003',
                    invoiceNo: 'FAT-2026-003',
                    customerName: 'DEF İnşaat',
                    amount: 51750.00,
                    currency: 'TRY',
                    method: 'EFT',
                    status: 'COMPLETED',
                    bankName: 'İş Bankası',
                    accountNo: 'TR12 0006 4000 0011 2345 6789 01',
                    transactionId: 'TRX-2026-005678',
                    paymentDate: '2026-01-22',
                    valueDate: '2026-01-22',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '4',
                    customerName: 'GHI Danışmanlık',
                    amount: 8500.00,
                    currency: 'TRY',
                    method: 'Nakit',
                    status: 'COMPLETED',
                    paymentDate: '2026-01-21',
                    notes: 'Nakit tahsilat',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '5',
                    invoiceId: 'inv-005',
                    invoiceNo: 'FAT-2026-005',
                    customerName: 'JKL Perakende',
                    amount: 12000.00,
                    currency: 'TRY',
                    method: 'Çek',
                    status: 'PENDING',
                    paymentDate: '2026-02-15',
                    valueDate: '2026-02-15',
                    notes: 'Vadeli çek - 15 Şubat 2026',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '6',
                    invoiceId: 'inv-006',
                    invoiceNo: 'FAT-2026-006',
                    customerName: 'MNO Lojistik',
                    amount: 5400.00,
                    currency: 'TRY',
                    method: 'Havale',
                    status: 'FAILED',
                    bankName: 'Garanti BBVA',
                    transactionId: 'TRX-2026-111222',
                    paymentDate: '2026-01-19',
                    notes: 'Yetersiz bakiye - işlem başarısız',
                    createdAt: new Date().toISOString(),
                },
            ];
            setPayments(mockPayments);
        }
        catch (error) {
            console.error('Error fetching payments:', error);
            addNotification({
                type: 'error',
                title: 'Hata',
                message: 'Ödemeler yüklenirken bir hata oluştu.',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCreate = async () => {
        try {
            // TODO: Replace with real API call
            // const response = await apiClient.post('/v1/payments', formData)
            const newPayment = {
                id: Date.now().toString(),
                ...formData,
                customerName: formData.customerName || 'Yeni Müşteri',
                amount: formData.amount || 0,
                currency: formData.currency || 'TRY',
                method: formData.method || 'Havale',
                status: formData.status || 'PENDING',
                paymentDate: formData.paymentDate || new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString(),
            };
            setPayments([newPayment, ...payments]);
            setIsCreateModalOpen(false);
            resetForm();
            addNotification({
                type: 'success',
                title: 'Ödeme Kaydedildi',
                message: `${newPayment.customerName} için ₺${newPayment.amount.toLocaleString('tr-TR')} ödeme kaydedildi.`,
            });
        }
        catch (error) {
            console.error('Error creating payment:', error);
            addNotification({
                type: 'error',
                title: 'Hata',
                message: 'Ödeme kaydedilirken bir hata oluştu.',
            });
        }
    };
    const resetForm = () => {
        setFormData({
            amount: 0,
            currency: 'TRY',
            method: 'Havale',
            status: 'PENDING',
            paymentDate: new Date().toISOString().split('T')[0],
        });
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'COMPLETED':
                return _jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400" });
            case 'PENDING':
                return _jsx(ClockIcon, { className: "w-5 h-5 text-amber-400" });
            case 'FAILED':
                return _jsx(XCircleIcon, { className: "w-5 h-5 text-red-400" });
            case 'CANCELLED':
                return _jsx(XCircleIcon, { className: "w-5 h-5 text-gray-400" });
            case 'REFUNDED':
                return _jsx(ArrowPathIcon, { className: "w-5 h-5 text-blue-400" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'PENDING':
                return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            case 'FAILED':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'CANCELLED':
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            case 'REFUNDED':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };
    const getMethodIcon = (method) => {
        switch (method) {
            case 'Nakit':
                return _jsx(BanknotesIcon, { className: "w-5 h-5" });
            case 'Kredi Kartı':
                return _jsx(CreditCardIcon, { className: "w-5 h-5" });
            case 'Havale':
            case 'EFT':
                return _jsx(BuildingLibraryIcon, { className: "w-5 h-5" });
            case 'Çek':
                return _jsx(DocumentTextIcon, { className: "w-5 h-5" });
        }
    };
    const getStats = () => {
        const total = payments.reduce((sum, p) => p.status === 'COMPLETED' ? sum + p.amount : sum, 0);
        const pending = payments.reduce((sum, p) => p.status === 'PENDING' ? sum + p.amount : sum, 0);
        const completed = payments.filter(p => p.status === 'COMPLETED').length;
        const pendingCount = payments.filter(p => p.status === 'PENDING').length;
        return { total, pending, completed, pendingCount };
    };
    const stats = getStats();
    return (_jsxs("div", { className: "min-h-screen p-8", children: [_jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "mb-4 px-8 pt-8", children: _jsx(BackButton, {}) }) }), _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "\u00D6demeler" }), _jsx("p", { className: "text-white/60", children: "\u00D6deme tahsilat ve takip" })] }), _jsxs("button", { onClick: () => {
                                    resetForm();
                                    setIsCreateModalOpen(true);
                                }, className: "btn-primary px-6 py-3 flex items-center gap-2", children: [_jsx(PlusIcon, { className: "w-5 h-5" }), "\u00D6deme Ekle"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Toplam Tahsilat" })] }), _jsxs("p", { className: "text-3xl font-bold text-green-400", children: ["\u20BA", stats.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(ClockIcon, { className: "w-5 h-5 text-amber-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Bekleyen" })] }), _jsxs("p", { className: "text-3xl font-bold text-amber-400", children: ["\u20BA", stats.pending.toLocaleString('tr-TR', { minimumFractionDigits: 2 })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(BanknotesIcon, { className: "w-5 h-5 text-teal-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Tamamlanan" })] }), _jsx("p", { className: "text-3xl font-bold text-white", children: stats.completed })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(DocumentTextIcon, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Bekleyen \u0130\u015Flem" })] }), _jsx("p", { className: "text-3xl font-bold text-white", children: stats.pendingCount })] })] }), _jsx("div", { className: "glass-card p-6 mb-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "\u00D6deme ara (m\u00FC\u015Fteri, fatura, i\u015Flem no...)", className: "w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Durum" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['ALL', 'COMPLETED', 'PENDING', 'FAILED', 'CANCELLED', 'REFUNDED'].map((status) => (_jsx("button", { onClick: () => setFilterStatus(status), className: `px-4 py-2 rounded-xl font-medium transition-all ${filterStatus === status
                                                    ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                                                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`, children: status === 'ALL' ? 'Tümü' :
                                                    status === 'COMPLETED' ? 'Tamamlandı' :
                                                        status === 'PENDING' ? 'Bekliyor' :
                                                            status === 'FAILED' ? 'Başarısız' :
                                                                status === 'CANCELLED' ? 'İptal' :
                                                                    'İade' }, status))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u00D6deme Y\u00F6ntemi" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['ALL', 'Nakit', 'Kredi Kartı', 'Havale', 'EFT', 'Çek'].map((method) => (_jsx("button", { onClick: () => setFilterMethod(method), className: `px-4 py-2 rounded-xl font-medium transition-all ${filterMethod === method
                                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                                                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`, children: method === 'ALL' ? 'Tümü' : method }, method))) })] })] }) }), _jsx("div", { className: "glass-card overflow-hidden", children: isLoading ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx("div", { className: "w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" }), _jsx("p", { className: "text-white/60 mt-4", children: "\u00D6demeler y\u00FCkleniyor..." })] })) : filteredPayments.length === 0 ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx(BanknotesIcon, { className: "w-16 h-16 text-white/20 mx-auto mb-4" }), _jsx("p", { className: "text-white/60", children: searchQuery || filterStatus !== 'ALL' || filterMethod !== 'ALL'
                                        ? 'Ödeme bulunamadı'
                                        : 'Henüz ödeme kaydı yok' })] })) : (_jsx("div", { className: "divide-y divide-white/5", children: filteredPayments.map((payment, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: idx * 0.05 }, className: "p-6 hover:bg-white/5 transition-colors", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center", children: getMethodIcon(payment.method) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-1", children: [_jsx("h3", { className: "text-lg font-bold text-white", children: payment.customerName }), payment.invoiceNo && (_jsx("span", { className: "px-2 py-1 text-xs rounded-lg bg-purple-500/20 text-purple-400", children: payment.invoiceNo }))] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-white/60", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(CalendarIcon, { className: "w-4 h-4" }), new Date(payment.paymentDate).toLocaleDateString('tr-TR')] }), _jsx("span", { children: payment.method }), payment.bankName && _jsx("span", { children: payment.bankName }), payment.transactionId && (_jsx("span", { className: "font-mono text-xs", children: payment.transactionId }))] })] })] }), payment.notes && (_jsx("p", { className: "text-sm text-white/60 mt-2 pl-15", children: payment.notes })), payment.valueDate && payment.valueDate !== payment.paymentDate && (_jsxs("p", { className: "text-sm text-white/60 mt-2 pl-15", children: ["Val\u00F6r Tarihi: ", new Date(payment.valueDate).toLocaleDateString('tr-TR')] }))] }), _jsxs("div", { className: "text-right ml-6", children: [_jsxs("p", { className: "text-3xl font-bold text-white mb-3", children: ["\u20BA", payment.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })] }), _jsxs("div", { className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getStatusColor(payment.status)}`, children: [getStatusIcon(payment.status), _jsx("span", { className: "text-sm font-medium", children: payment.status === 'COMPLETED' ? 'Tamamlandı' :
                                                                payment.status === 'PENDING' ? 'Bekliyor' :
                                                                    payment.status === 'FAILED' ? 'Başarısız' :
                                                                        payment.status === 'CANCELLED' ? 'İptal' :
                                                                            'İade' })] })] })] }) }, payment.id))) })) })] }), _jsx(AnimatePresence, { children: isCreateModalOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsCreateModalOpen(false), className: "fixed inset-0 bg-black/70 backdrop-blur-sm", style: { zIndex: 9999 } }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "glass-card p-4 sm:p-6 overflow-y-auto", style: {
                                position: 'fixed',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 10000,
                                width: 'calc(100% - 2rem)',
                                maxWidth: '600px',
                                maxHeight: '90vh',
                            }, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Yeni \u00D6deme" }), _jsx("button", { onClick: () => setIsCreateModalOpen(false), className: "p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: _jsx(XMarkIcon, { className: "w-6 h-6 text-white" }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "M\u00FC\u015Fteri Ad\u0131 *" }), _jsx("input", { type: "text", value: formData.customerName || '', onChange: (e) => setFormData({ ...formData, customerName: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", required: true })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Tutar (\u20BA) *" }), _jsx("input", { type: "number", value: formData.amount || '', onChange: (e) => setFormData({ ...formData, amount: Number(e.target.value) }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Para Birimi" }), _jsxs("select", { value: formData.currency || 'TRY', onChange: (e) => setFormData({ ...formData, currency: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "TRY", children: "TRY (\u20BA)" }), _jsx("option", { value: "USD", children: "USD ($)" }), _jsx("option", { value: "EUR", children: "EUR (\u20AC)" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u00D6deme Y\u00F6ntemi *" }), _jsxs("select", { value: formData.method || 'Havale', onChange: (e) => setFormData({ ...formData, method: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "Nakit", children: "Nakit" }), _jsx("option", { value: "Kredi Kart\u0131", children: "Kredi Kart\u0131" }), _jsx("option", { value: "Havale", children: "Havale" }), _jsx("option", { value: "EFT", children: "EFT" }), _jsx("option", { value: "\u00C7ek", children: "\u00C7ek" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Durum" }), _jsxs("select", { value: formData.status || 'PENDING', onChange: (e) => setFormData({ ...formData, status: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "PENDING", children: "Bekliyor" }), _jsx("option", { value: "COMPLETED", children: "Tamamland\u0131" }), _jsx("option", { value: "FAILED", children: "Ba\u015Far\u0131s\u0131z" }), _jsx("option", { value: "CANCELLED", children: "\u0130ptal" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u00D6deme Tarihi *" }), _jsx("input", { type: "date", value: formData.paymentDate || '', onChange: (e) => setFormData({ ...formData, paymentDate: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Val\u00F6r Tarihi" }), _jsx("input", { type: "date", value: formData.valueDate || '', onChange: (e) => setFormData({ ...formData, valueDate: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Fatura No" }), _jsx("input", { type: "text", value: formData.invoiceNo || '', onChange: (e) => setFormData({ ...formData, invoiceNo: e.target.value }), placeholder: "FAT-2026-001", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Banka Ad\u0131" }), _jsx("input", { type: "text", value: formData.bankName || '', onChange: (e) => setFormData({ ...formData, bankName: e.target.value }), placeholder: "Ziraat Bankas\u0131", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u0130\u015Flem No" }), _jsx("input", { type: "text", value: formData.transactionId || '', onChange: (e) => setFormData({ ...formData, transactionId: e.target.value }), placeholder: "TRX-2026-123456", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Notlar" }), _jsx("textarea", { value: formData.notes || '', onChange: (e) => setFormData({ ...formData, notes: e.target.value }), rows: 3, className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 resize-none" })] })] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx("button", { onClick: () => setIsCreateModalOpen(false), className: "flex-1 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors", children: "\u0130ptal" }), _jsx("button", { onClick: handleCreate, className: "flex-1 btn-primary px-6 py-3", children: "Kaydet" })] })] })] })) })] }));
}
