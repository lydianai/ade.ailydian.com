import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';
import { UserCircleIcon, ShieldCheckIcon, BellIcon, GlobeAltIcon, KeyIcon, CreditCardIcon, CheckCircleIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import { useAuthStore } from '../contexts/useAuthStore';
import { apiClient } from '../services/api';
export default function DashboardSettings() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    // Profile form state
    const [profileForm, setProfileForm] = useState({
        ad: user?.ad || '',
        soyad: user?.soyad || '',
        email: user?.email || '',
        telefon: '',
        sirket: '',
        vkn: '',
        adres: '',
    });
    // Security form state
    const [securityForm, setSecurityForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    // Notification settings
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
        fatura: true,
        odeme: true,
        vergi: false,
        guncellemeler: true,
    });
    const tabs = [
        { id: 'profile', label: 'Profil Bilgileri', icon: UserCircleIcon },
        { id: 'security', label: 'Güvenlik', icon: ShieldCheckIcon },
        { id: 'notifications', label: 'Bildirimler', icon: BellIcon },
        { id: 'language', label: 'Dil & Bölge', icon: GlobeAltIcon },
        { id: 'billing', label: 'Faturalama', icon: CreditCardIcon },
    ];
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };
    const handleProfileUpdate = async () => {
        setIsLoading(true);
        try {
            await apiClient.put('/v1/auth/profil', profileForm);
            showSuccessMessage('Profil bilgileriniz başarıyla güncellendi!');
        }
        catch (error) {
            console.error('Profile update error:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handlePasswordChange = async () => {
        if (securityForm.newPassword !== securityForm.confirmPassword) {
            alert('Yeni şifreler eşleşmiyor!');
            return;
        }
        setIsLoading(true);
        try {
            await apiClient.put('/v1/auth/sifre-degistir', {
                eskiSifre: securityForm.currentPassword,
                yeniSifre: securityForm.newPassword,
            });
            showSuccessMessage('Şifreniz başarıyla değiştirildi!');
            setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }
        catch (error) {
            console.error('Password change error:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleNotificationsUpdate = async () => {
        setIsLoading(true);
        try {
            await apiClient.put('/v1/auth/bildirim-tercihleri', notifications);
            showSuccessMessage('Bildirim tercihleriniz kaydedildi!');
        }
        catch (error) {
            console.error('Notifications update error:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen p-8", children: [_jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "mb-4 px-8 pt-8", children: _jsx(BackButton, {}) }) }), _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Ayarlar" }), _jsx("p", { className: "text-white/60", children: "Hesap ve uygulama ayarlar\u0131n\u0131z\u0131 y\u00F6netin" })] }), successMessage && (_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "mb-6 glass-card p-4 flex items-center gap-3 bg-green-500/10 border border-green-500/30", children: [_jsx(CheckCircleIcon, { className: "w-6 h-6 text-green-400" }), _jsx("p", { className: "text-white", children: successMessage })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx("div", { className: "glass-card p-4 space-y-2", children: tabs.map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 text-white'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'}`, children: [_jsx(tab.icon, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: tab.label })] }, tab.id))) }) }), _jsxs("div", { className: "lg:col-span-3", children: [activeTab === 'profile' && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Profil Bilgileri" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center", children: _jsx(UserCircleIcon, { className: "w-12 h-12 text-white" }) }), _jsxs("div", { children: [_jsx("button", { className: "btn-primary px-4 py-2 mb-2", children: "Foto\u011Fraf De\u011Fi\u015Ftir" }), _jsx("p", { className: "text-sm text-white/60", children: "JPG, PNG veya GIF. Max 2MB." })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Ad" }), _jsx("input", { type: "text", value: profileForm.ad, onChange: (e) => setProfileForm({ ...profileForm, ad: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Soyad" }), _jsx("input", { type: "text", value: profileForm.soyad, onChange: (e) => setProfileForm({ ...profileForm, soyad: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "E-posta" }), _jsx("input", { type: "email", value: profileForm.email, onChange: (e) => setProfileForm({ ...profileForm, email: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Telefon" }), _jsx("input", { type: "tel", value: profileForm.telefon, onChange: (e) => setProfileForm({ ...profileForm, telefon: e.target.value }), placeholder: "+90 5XX XXX XX XX", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "\u015Eirket Ad\u0131" }), _jsx("input", { type: "text", value: profileForm.sirket, onChange: (e) => setProfileForm({ ...profileForm, sirket: e.target.value }), placeholder: "ABC Teknoloji A.\u015E.", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "VKN / TCKN" }), _jsx("input", { type: "text", value: profileForm.vkn, onChange: (e) => setProfileForm({ ...profileForm, vkn: e.target.value }), placeholder: "1234567890", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Adres" }), _jsx("textarea", { value: profileForm.adres, onChange: (e) => setProfileForm({ ...profileForm, adres: e.target.value }), rows: 3, placeholder: "\u015Eirket adresi...", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 resize-none" })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: handleProfileUpdate, disabled: isLoading, className: "btn-primary px-6 py-3", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : ('Değişiklikleri Kaydet') }) })] })] }, "profile")), activeTab === 'security' && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(KeyIcon, { className: "w-6 h-6 text-amber-400" }), _jsx("h2", { className: "text-2xl font-bold text-white", children: "\u015Eifre De\u011Fi\u015Ftir" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Mevcut \u015Eifre" }), _jsx("input", { type: "password", value: securityForm.currentPassword, onChange: (e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Yeni \u015Eifre" }), _jsx("input", { type: "password", value: securityForm.newPassword, onChange: (e) => setSecurityForm({ ...securityForm, newPassword: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Yeni \u015Eifre (Tekrar)" }), _jsx("input", { type: "password", value: securityForm.confirmPassword, onChange: (e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value }), className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50" })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: handlePasswordChange, disabled: isLoading, className: "btn-primary px-6 py-3", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : ('Şifreyi Güncelle') }) })] })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(ShieldCheckIcon, { className: "w-6 h-6 text-teal-400" }), _jsx("h2", { className: "text-2xl font-bold text-white", children: "\u0130ki Fakt\u00F6rl\u00FC Do\u011Frulama" })] }), _jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "2FA Durumu" }), _jsx("p", { className: "text-sm text-white/60 mt-1", children: "Hesab\u0131n\u0131z\u0131 ekstra g\u00FCvenlik katman\u0131 ile koruyun" })] }), _jsx("button", { className: "px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors", children: "Etkinle\u015Ftir" })] })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Aktif Oturumlar" }), _jsx("div", { className: "space-y-3", children: [
                                                            {
                                                                device: 'Chrome on MacBook Pro',
                                                                location: 'İstanbul, Türkiye',
                                                                lastActive: '5 dakika önce',
                                                                current: true,
                                                            },
                                                            {
                                                                device: 'Safari on iPhone 15',
                                                                location: 'Ankara, Türkiye',
                                                                lastActive: '2 saat önce',
                                                                current: false,
                                                            },
                                                        ].map((session, idx) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "font-medium text-white", children: session.device }), session.current && (_jsx("span", { className: "px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-lg", children: "Mevcut" }))] }), _jsxs("p", { className: "text-sm text-white/60 mt-1", children: [session.location, " \u2022 ", session.lastActive] })] }), !session.current && (_jsx("button", { className: "p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors", children: _jsx(XMarkIcon, { className: "w-5 h-5" }) }))] }, idx))) })] })] }, "security")), activeTab === 'notifications' && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Bildirim Tercihleri" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Bildirim Kanallar\u0131" }), _jsx("div", { className: "space-y-3", children: [
                                                                    { key: 'email', label: 'E-posta Bildirimleri', desc: 'Önemli güncellemeleri e-posta ile alın' },
                                                                    { key: 'sms', label: 'SMS Bildirimleri', desc: 'Acil durumlar için SMS bildirimi' },
                                                                    { key: 'push', label: 'Push Bildirimleri', desc: 'Tarayıcı üzerinden bildirim' },
                                                                ].map((channel) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: channel.label }), _jsx("p", { className: "text-sm text-white/60 mt-1", children: channel.desc })] }), _jsx("button", { onClick: () => setNotifications({
                                                                                ...notifications,
                                                                                [channel.key]: !notifications[channel.key],
                                                                            }), className: `relative w-12 h-6 rounded-full transition-colors ${notifications[channel.key]
                                                                                ? 'bg-teal-500'
                                                                                : 'bg-white/20'}`, children: _jsx(motion.div, { animate: {
                                                                                    x: notifications[channel.key] ? 24 : 2,
                                                                                }, className: "absolute top-1 w-4 h-4 bg-white rounded-full" }) })] }, channel.key))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Bildirim T\u00FCrleri" }), _jsx("div", { className: "space-y-3", children: [
                                                                    { key: 'fatura', label: 'Fatura Bildirimleri', desc: 'Yeni fatura ve güncellemeler' },
                                                                    { key: 'odeme', label: 'Ödeme Bildirimleri', desc: 'Ödeme alındı, vadesi geçti' },
                                                                    { key: 'vergi', label: 'Vergi Hatırlatmaları', desc: 'Vergi beyanı ve borç bildirimleri' },
                                                                    { key: 'guncellemeler', label: 'Sistem Güncellemeleri', desc: 'Yeni özellikler ve iyileştirmeler' },
                                                                ].map((event) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: event.label }), _jsx("p", { className: "text-sm text-white/60 mt-1", children: event.desc })] }), _jsx("button", { onClick: () => setNotifications({
                                                                                ...notifications,
                                                                                [event.key]: !notifications[event.key],
                                                                            }), className: `relative w-12 h-6 rounded-full transition-colors ${notifications[event.key]
                                                                                ? 'bg-amber-500'
                                                                                : 'bg-white/20'}`, children: _jsx(motion.div, { animate: {
                                                                                    x: notifications[event.key] ? 24 : 2,
                                                                                }, className: "absolute top-1 w-4 h-4 bg-white rounded-full" }) })] }, event.key))) })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: handleNotificationsUpdate, disabled: isLoading, className: "btn-primary px-6 py-3", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : ('Tercihleri Kaydet') }) })] })] }, "notifications")), activeTab === 'language' && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Dil & B\u00F6lge Ayarlar\u0131" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Dil" }), _jsxs("select", { className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "tr", children: "T\u00FCrk\u00E7e" }), _jsx("option", { value: "en", children: "English" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Zaman Dilimi" }), _jsxs("select", { className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "Europe/Istanbul", children: "(GMT+3) \u0130stanbul" }), _jsx("option", { value: "Europe/London", children: "(GMT+0) Londra" }), _jsx("option", { value: "America/New_York", children: "(GMT-5) New York" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Para Birimi" }), _jsxs("select", { className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "TRY", children: "\u20BA T\u00FCrk Liras\u0131 (TRY)" }), _jsx("option", { value: "USD", children: "$ Amerikan Dolar\u0131 (USD)" }), _jsx("option", { value: "EUR", children: "\u20AC Euro (EUR)" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Tarih Format\u0131" }), _jsxs("select", { className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50", children: [_jsx("option", { value: "DD/MM/YYYY", children: "GG/AA/YYYY (\u00F6r: 23/01/2026)" }), _jsx("option", { value: "MM/DD/YYYY", children: "AA/GG/YYYY (\u00F6r: 01/23/2026)" }), _jsx("option", { value: "YYYY-MM-DD", children: "YYYY-AA-GG (\u00F6r: 2026-01-23)" })] })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { className: "btn-primary px-6 py-3", children: "Kaydet" }) })] })] }, "language")), activeTab === 'billing' && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Mevcut Paket" }), _jsxs("div", { className: "p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-teal-500/10 border border-amber-500/20", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-white", children: "Pro Paket" }), _jsx("p", { className: "text-white/60 mt-1", children: "Ayl\u0131k yenilenir" })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-3xl font-bold text-white", children: "\u20BA299" }), _jsx("p", { className: "text-white/60", children: "/ay" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { className: "p-3 rounded-xl bg-white/5", children: [_jsx("p", { className: "text-sm text-white/60", children: "Fatura Limiti" }), _jsx("p", { className: "text-lg font-bold text-white", children: "S\u0131n\u0131rs\u0131z" })] }), _jsxs("div", { className: "p-3 rounded-xl bg-white/5", children: [_jsx("p", { className: "text-sm text-white/60", children: "API \u0130stekleri" }), _jsx("p", { className: "text-lg font-bold text-white", children: "100,000/ay" })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { className: "flex-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors", children: "Paketi De\u011Fi\u015Ftir" }), _jsx("button", { className: "flex-1 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors", children: "\u0130ptal Et" })] })] })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "\u00D6deme Y\u00F6ntemi" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-8 rounded bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center", children: _jsx(CreditCardIcon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4242" }), _jsx("p", { className: "text-sm text-white/60", children: "Son kullanma: 12/28" })] })] }), _jsx("button", { className: "px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors", children: "D\u00FCzenle" })] }), _jsx("button", { className: "w-full p-4 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors", children: "+ Yeni Kart Ekle" })] })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Fatura Ge\u00E7mi\u015Fi" }), _jsx("div", { className: "space-y-3", children: [
                                                            { date: '23 Ocak 2026', amount: '₺299', status: 'Ödendi' },
                                                            { date: '23 Aralık 2025', amount: '₺299', status: 'Ödendi' },
                                                            { date: '23 Kasım 2025', amount: '₺299', status: 'Ödendi' },
                                                        ].map((invoice, idx) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-white/5", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: invoice.date }), _jsx("p", { className: "text-sm text-white/60", children: invoice.status })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "font-bold text-white", children: invoice.amount }), _jsx("button", { className: "px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors text-sm", children: "\u0130ndir" })] })] }, idx))) })] })] }, "billing"))] })] })] })] }));
}
