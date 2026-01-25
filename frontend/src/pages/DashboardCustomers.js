import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon, BuildingOfficeIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, CreditCardIcon, PencilIcon, TrashIcon, } from '@heroicons/react/24/outline';
import { useNotificationStore } from '../contexts/useNotificationStore';
import BackButton from '../components/BackButton';
export default function DashboardCustomers() {
    const { addNotification } = useNotificationStore();
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    // Form state
    const [formData, setFormData] = useState({
        type: 'CORPORATE',
        balance: 0,
    });
    // Fetch customers
    useEffect(() => {
        fetchCustomers();
    }, []);
    // Filter customers
    useEffect(() => {
        let filtered = customers;
        // Filter by type
        if (filterType !== 'ALL') {
            filtered = filtered.filter((c) => c.type === filterType);
        }
        // Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((c) => {
                const name = c.type === 'CORPORATE'
                    ? c.companyName?.toLowerCase()
                    : `${c.firstName} ${c.lastName}`.toLowerCase();
                const email = c.email?.toLowerCase() || '';
                const phone = c.phone?.toLowerCase() || '';
                const taxNumber = c.taxNumber?.toLowerCase() || '';
                return name?.includes(query) ||
                    email.includes(query) ||
                    phone.includes(query) ||
                    taxNumber.includes(query);
            });
        }
        setFilteredCustomers(filtered);
    }, [customers, searchQuery, filterType]);
    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            // Mock data for now - replace with real API call
            const mockCustomers = [
                {
                    id: '1',
                    type: 'CORPORATE',
                    companyName: 'ABC Teknoloji A.Ş.',
                    taxOffice: 'İstanbul Vergi Dairesi',
                    taxNumber: '1111222233',
                    email: 'info@abcteknoloji.com',
                    phone: '+90 212 123 45 67',
                    address: 'Maslak Mah. Büyükdere Cad. No:123',
                    city: 'İstanbul',
                    district: 'Sarıyer',
                    postalCode: '34398',
                    creditLimit: 100000,
                    balance: 15250.50,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: '2',
                    type: 'CORPORATE',
                    companyName: 'XYZ Ltd. Şti.',
                    taxOffice: 'Ankara Vergi Dairesi',
                    taxNumber: '4444555566',
                    email: 'muhasebe@xyz.com',
                    phone: '+90 312 123 45 67',
                    address: 'Çankaya Mah. Atatürk Bulvarı No:456',
                    city: 'Ankara',
                    district: 'Çankaya',
                    postalCode: '06420',
                    creditLimit: 75000,
                    balance: -8900.00,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: '3',
                    type: 'CORPORATE',
                    companyName: 'DEF İnşaat',
                    taxOffice: 'İzmir Vergi Dairesi',
                    taxNumber: '7777888899',
                    email: 'mali@definsaat.com',
                    phone: '+90 232 123 45 67',
                    address: 'Alsancak Mah. Cumhuriyet Bulvarı No:789',
                    city: 'İzmir',
                    district: 'Konak',
                    postalCode: '35220',
                    creditLimit: 250000,
                    balance: 45600.00,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: '4',
                    type: 'INDIVIDUAL',
                    firstName: 'Ali',
                    lastName: 'Kaya',
                    tcNo: '12345678901',
                    email: 'ali.kaya@email.com',
                    phone: '+90 544 123 45 67',
                    address: 'Ataşehir Mah. Barbaros Cad. No:45 Daire:8',
                    city: 'İstanbul',
                    district: 'Ataşehir',
                    postalCode: '34758',
                    balance: 2500.00,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: '5',
                    type: 'INDIVIDUAL',
                    firstName: 'Ayşe',
                    lastName: 'Demir',
                    tcNo: '98765432109',
                    email: 'ayse.demir@email.com',
                    phone: '+90 533 987 65 43',
                    address: 'Kadıköy Mah. Bağdat Cad. No:234',
                    city: 'İstanbul',
                    district: 'Kadıköy',
                    postalCode: '34710',
                    balance: -1200.00,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];
            setCustomers(mockCustomers);
        }
        catch (error) {
            console.error('Error fetching customers:', error);
            addNotification({
                type: 'error',
                title: 'Hata',
                message: 'Müşteriler yüklenirken bir hata oluştu.',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCreate = async () => {
        try {
            // TODO: Replace with real API call
            // const response = await apiClient.post('/v1/customers', formData)
            const newCustomer = {
                id: Date.now().toString(),
                ...formData,
                balance: formData.balance || 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setCustomers([newCustomer, ...customers]);
            setIsCreateModalOpen(false);
            resetForm();
            addNotification({
                type: 'success',
                title: 'Müşteri Eklendi',
                message: `${getCustomerName(newCustomer)} başarıyla eklendi.`,
            });
        }
        catch (error) {
            console.error('Error creating customer:', error);
            addNotification({
                type: 'error',
                title: 'Hata',
                message: 'Müşteri eklenirken bir hata oluştu.',
            });
        }
    };
    const handleUpdate = async () => {
        if (!selectedCustomer)
            return;
        try {
            // TODO: Replace with real API call
            // await apiClient.put(`/v1/customers/${selectedCustomer.id}`, formData)
            const updatedCustomer = {
                ...selectedCustomer,
                ...formData,
                updatedAt: new Date().toISOString(),
            };
            setCustomers(customers.map(c => c.id === selectedCustomer.id ? updatedCustomer : c));
            setIsEditModalOpen(false);
            setSelectedCustomer(null);
            resetForm();
            addNotification({
                type: 'success',
                title: 'Müşteri Güncellendi',
                message: `${getCustomerName(updatedCustomer)} başarıyla güncellendi.`,
            });
        }
        catch (error) {
            console.error('Error updating customer:', error);
            addNotification({
                type: 'error',
                title: 'Hata',
                message: 'Müşteri güncellenirken bir hata oluştu.',
            });
        }
    };
    const handleDelete = async (customer) => {
        if (!confirm(`${getCustomerName(customer)} müşterisini silmek istediğinizden emin misiniz?`)) {
            return;
        }
        try {
            // TODO: Replace with real API call
            // await apiClient.delete(`/v1/customers/${customer.id}`)
            setCustomers(customers.filter(c => c.id !== customer.id));
            addNotification({
                type: 'success',
                title: 'Müşteri Silindi',
                message: `${getCustomerName(customer)} başarıyla silindi.`,
            });
        }
        catch (error) {
            console.error('Error deleting customer:', error);
            addNotification({
                type: 'error',
                title: 'Hata',
                message: 'Müşteri silinirken bir hata oluştu.',
            });
        }
    };
    const openEditModal = (customer) => {
        setSelectedCustomer(customer);
        setFormData(customer);
        setIsEditModalOpen(true);
    };
    const resetForm = () => {
        setFormData({
            type: 'CORPORATE',
            balance: 0,
        });
    };
    const getCustomerName = (customer) => {
        return customer.type === 'CORPORATE'
            ? customer.companyName
            : `${customer.firstName} ${customer.lastName}`;
    };
    const getStats = () => {
        const total = customers.length;
        const corporate = customers.filter(c => c.type === 'CORPORATE').length;
        const individual = customers.filter(c => c.type === 'INDIVIDUAL').length;
        const totalBalance = customers.reduce((sum, c) => sum + c.balance, 0);
        return { total, corporate, individual, totalBalance };
    };
    const stats = getStats();
    return (_jsxs("div", { className: "min-h-screen p-8", children: [_jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "mb-4", children: _jsx(BackButton, {}) }), _jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "M\u00FC\u015Fteriler" }), _jsx("p", { className: "text-white/60", children: "M\u00FC\u015Fteri portf\u00F6y\u00FCn\u00FCz\u00FC y\u00F6netin" })] }), _jsxs("button", { onClick: () => {
                                    resetForm();
                                    setIsCreateModalOpen(true);
                                }, className: "btn-primary px-6 py-3 flex items-center gap-2", children: [_jsx(PlusIcon, { className: "w-5 h-5" }), "Yeni M\u00FC\u015Fteri"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(UserIcon, { className: "w-5 h-5 text-amber-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Toplam M\u00FC\u015Fteri" })] }), _jsx("p", { className: "text-3xl font-bold text-white", children: stats.total })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(BuildingOfficeIcon, { className: "w-5 h-5 text-teal-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Kurumsal" })] }), _jsx("p", { className: "text-3xl font-bold text-white", children: stats.corporate })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(UserIcon, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Bireysel" })] }), _jsx("p", { className: "text-3xl font-bold text-white", children: stats.individual })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(CreditCardIcon, { className: "w-5 h-5 text-green-400" }), _jsx("span", { className: "text-white/60 text-sm", children: "Toplam Bakiye" })] }), _jsxs("p", { className: `text-3xl font-bold ${stats.totalBalance >= 0 ? 'text-green-400' : 'text-red-400'}`, children: ["\u20BA", stats.totalBalance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })] })] })] }), _jsx("div", { className: "glass-card p-6 mb-6", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "M\u00FC\u015Fteri ara (ad, e-posta, telefon, VKN...)", className: "w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setFilterType('ALL'), className: `px-4 py-3 rounded-xl font-medium transition-all ${filterType === 'ALL'
                                                ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                                                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`, children: "T\u00FCm\u00FC" }), _jsxs("button", { onClick: () => setFilterType('CORPORATE'), className: `px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${filterType === 'CORPORATE'
                                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                                                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`, children: [_jsx(BuildingOfficeIcon, { className: "w-5 h-5" }), "Kurumsal"] }), _jsxs("button", { onClick: () => setFilterType('INDIVIDUAL'), className: `px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${filterType === 'INDIVIDUAL'
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`, children: [_jsx(UserIcon, { className: "w-5 h-5" }), "Bireysel"] })] })] }) }), _jsx("div", { className: "glass-card overflow-hidden", children: isLoading ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx("div", { className: "w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" }), _jsx("p", { className: "text-white/60 mt-4", children: "M\u00FC\u015Fteriler y\u00FCkleniyor..." })] })) : filteredCustomers.length === 0 ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx(UserIcon, { className: "w-16 h-16 text-white/20 mx-auto mb-4" }), _jsx("p", { className: "text-white/60", children: searchQuery || filterType !== 'ALL' ? 'Müşteri bulunamadı' : 'Henüz müşteri eklenmemiş' })] })) : (_jsx("div", { className: "divide-y divide-white/5", children: filteredCustomers.map((customer, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: idx * 0.05 }, className: "p-6 hover:bg-white/5 transition-colors", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center ${customer.type === 'CORPORATE'
                                                                ? 'bg-gradient-to-br from-teal-500 to-cyan-500'
                                                                : 'bg-gradient-to-br from-purple-500 to-pink-500'}`, children: customer.type === 'CORPORATE' ? (_jsx(BuildingOfficeIcon, { className: "w-6 h-6 text-white" })) : (_jsx(UserIcon, { className: "w-6 h-6 text-white" })) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white", children: getCustomerName(customer) }), _jsx("p", { className: "text-sm text-white/60", children: customer.type === 'CORPORATE' ? customer.taxNumber : customer.tcNo })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [customer.email && (_jsxs("div", { className: "flex items-center gap-2 text-white/60", children: [_jsx(EnvelopeIcon, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: customer.email })] })), customer.phone && (_jsxs("div", { className: "flex items-center gap-2 text-white/60", children: [_jsx(PhoneIcon, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: customer.phone })] })), customer.city && (_jsxs("div", { className: "flex items-center gap-2 text-white/60", children: [_jsx(MapPinIcon, { className: "w-4 h-4" }), _jsxs("span", { className: "text-sm", children: [customer.city, ", ", customer.district] })] }))] }), customer.type === 'CORPORATE' && customer.taxOffice && (_jsxs("p", { className: "text-sm text-white/60 mt-2", children: ["Vergi Dairesi: ", customer.taxOffice] }))] }), _jsxs("div", { className: "text-right ml-6", children: [_jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-sm text-white/60 mb-1", children: "Bakiye" }), _jsxs("p", { className: `text-2xl font-bold ${customer.balance >= 0 ? 'text-green-400' : 'text-red-400'}`, children: ["\u20BA", customer.balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => openEditModal(customer), className: "p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors", children: _jsx(PencilIcon, { className: "w-5 h-5" }) }), _jsx("button", { onClick: () => handleDelete(customer), className: "p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors", children: _jsx(TrashIcon, { className: "w-5 h-5" }) })] })] })] }) }, customer.id))) })) })] }), _jsx(AnimatePresence, { children: isCreateModalOpen && (_jsx(CustomerModal, { title: "Yeni M\u00FC\u015Fteri Ekle", formData: formData, setFormData: setFormData, onSave: handleCreate, onClose: () => {
                        setIsCreateModalOpen(false);
                        resetForm();
                    } })) }), _jsx(AnimatePresence, { children: isEditModalOpen && selectedCustomer && (_jsx(CustomerModal, { title: "M\u00FC\u015Fteri D\u00FCzenle", formData: formData, setFormData: setFormData, onSave: handleUpdate, onClose: () => {
                        setIsEditModalOpen(false);
                        setSelectedCustomer(null);
                        resetForm();
                    } })) })] }));
}
function CustomerModal({ title, formData, setFormData, onSave, onClose }) {
    return (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, className: "fixed inset-0 bg-black/70 backdrop-blur-sm", style: { zIndex: 9999 } }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "glass-card p-4 sm:p-6 overflow-y-auto", style: {
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10000,
                    width: 'calc(100% - 2rem)',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                }, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: title }), _jsx("button", { onClick: onClose, className: "p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors", children: _jsx(XMarkIcon, { className: "w-6 h-6 text-white" }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "M\u00FC\u015Fteri Tipi" }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("button", { onClick: () => setFormData({ ...formData, type: 'CORPORATE' }), className: `flex-1 p-4 rounded-xl border-2 transition-all ${formData.type === 'CORPORATE'
                                                    ? 'border-teal-500 bg-teal-500/10'
                                                    : 'border-white/10 bg-white/5 hover:bg-white/10'}`, children: [_jsx(BuildingOfficeIcon, { className: "w-6 h-6 text-white mx-auto mb-2" }), _jsx("p", { className: "text-white font-medium", children: "Kurumsal" })] }), _jsxs("button", { onClick: () => setFormData({ ...formData, type: 'INDIVIDUAL' }), className: `flex-1 p-4 rounded-xl border-2 transition-all ${formData.type === 'INDIVIDUAL'
                                                    ? 'border-purple-500 bg-purple-500/10'
                                                    : 'border-white/10 bg-white/5 hover:bg-white/10'}`, children: [_jsx(UserIcon, { className: "w-6 h-6 text-white mx-auto mb-2" }), _jsx("p", { className: "text-white font-medium", children: "Bireysel" })] })] })] }), formData.type === 'CORPORATE' && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u015Eirket Ad\u0131 *" }), _jsx("input", { type: "text", value: formData.companyName || '', onChange: (e) => setFormData({ ...formData, companyName: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", required: true })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Vergi Dairesi" }), _jsx("input", { type: "text", value: formData.taxOffice || '', onChange: (e) => setFormData({ ...formData, taxOffice: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "VKN" }), _jsx("input", { type: "text", value: formData.taxNumber || '', onChange: (e) => setFormData({ ...formData, taxNumber: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "MERS\u0130S No" }), _jsx("input", { type: "text", value: formData.mersisNo || '', onChange: (e) => setFormData({ ...formData, mersisNo: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] })), formData.type === 'INDIVIDUAL' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Ad *" }), _jsx("input", { type: "text", value: formData.firstName || '', onChange: (e) => setFormData({ ...formData, firstName: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Soyad *" }), _jsx("input", { type: "text", value: formData.lastName || '', onChange: (e) => setFormData({ ...formData, lastName: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "TC Kimlik No" }), _jsx("input", { type: "text", value: formData.tcNo || '', onChange: (e) => setFormData({ ...formData, tcNo: e.target.value }), maxLength: 11, className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] })), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "E-posta" }), _jsx("input", { type: "email", value: formData.email || '', onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Telefon" }), _jsx("input", { type: "tel", value: formData.phone || '', onChange: (e) => setFormData({ ...formData, phone: e.target.value }), placeholder: "+90 5XX XXX XX XX", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Adres" }), _jsx("textarea", { value: formData.address || '', onChange: (e) => setFormData({ ...formData, address: e.target.value }), rows: 3, className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 resize-none" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u0130l" }), _jsx("input", { type: "text", value: formData.city || '', onChange: (e) => setFormData({ ...formData, city: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u0130l\u00E7e" }), _jsx("input", { type: "text", value: formData.district || '', onChange: (e) => setFormData({ ...formData, district: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Posta Kodu" }), _jsx("input", { type: "text", value: formData.postalCode || '', onChange: (e) => setFormData({ ...formData, postalCode: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Kredi Limiti (\u20BA)" }), _jsx("input", { type: "number", value: formData.creditLimit || '', onChange: (e) => setFormData({ ...formData, creditLimit: Number(e.target.value) }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Ba\u015Flang\u0131\u00E7 Bakiyesi (\u20BA)" }), _jsx("input", { type: "number", value: formData.balance || 0, onChange: (e) => setFormData({ ...formData, balance: Number(e.target.value) }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] })] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx("button", { onClick: onClose, className: "flex-1 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors", children: "\u0130ptal" }), _jsx("button", { onClick: onSave, className: "flex-1 btn-primary px-6 py-3", children: "Kaydet" })] })] })] }));
}
