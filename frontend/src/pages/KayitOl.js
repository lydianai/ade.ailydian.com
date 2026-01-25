import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../contexts/useAuthStore';
export default function KayitOl() {
    const navigate = useNavigate();
    const { kayitOl, loading, error, clearError } = useAuthStore();
    const [localError, setLocalError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'ESNAF'
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        setLocalError('');
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setLocalError('Şifreler eşleşmiyor');
            return;
        }
        if (formData.password.length < 6) {
            setLocalError('Şifre en az 6 karakter olmalıdır');
            return;
        }
        try {
            await kayitOl({
                email: formData.email,
                sifre: formData.password,
                ad: formData.firstName,
                soyad: formData.lastName,
                telefon: formData.phone || undefined,
                rol: formData.role,
            });
            navigate('/panel');
        }
        catch (err) {
            // Error is already handled in the store
            console.error('Register error:', err);
        }
    };
    const displayError = error || localError;
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-4 py-12", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "glass-card p-8 md:p-12 w-full max-w-2xl", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-2 text-gradient-amber-teal", children: "ADE" }), _jsx("p", { className: "text-white/70", children: "Yeni hesap olu\u015Fturun" })] }), displayError && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm", children: displayError })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "Ad" }), _jsxs("div", { className: "relative", children: [_jsx(UserIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "text", required: true, value: formData.firstName, onChange: (e) => setFormData({ ...formData, firstName: e.target.value }), className: "input-modern pl-12", placeholder: "Ad\u0131n\u0131z" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "Soyad" }), _jsx("input", { type: "text", required: true, value: formData.lastName, onChange: (e) => setFormData({ ...formData, lastName: e.target.value }), className: "input-modern", placeholder: "Soyad\u0131n\u0131z" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(EnvelopeIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "input-modern pl-12", placeholder: "ornek@email.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "Telefon" }), _jsxs("div", { className: "relative", children: [_jsx(PhoneIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "tel", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), className: "input-modern pl-12", placeholder: "+90 (5xx) xxx xx xx" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "Kullan\u0131c\u0131 Tipi" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ['ESNAF', 'KOBI', 'VATANDAS', 'KAMU'].map((role) => (_jsxs("label", { className: `glass-card p-4 text-center cursor-pointer transition-all ${formData.role === role ? 'border-teal-500 bg-teal-500/10' : 'border-white/10'}`, children: [_jsx("input", { type: "radio", name: "role", value: role, checked: formData.role === role, onChange: (e) => setFormData({ ...formData, role: e.target.value }), className: "sr-only" }), _jsx("div", { className: "text-sm font-medium", children: role })] }, role))) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "\u015Eifre" }), _jsxs("div", { className: "relative", children: [_jsx(LockClosedIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "password", required: true, value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), className: "input-modern pl-12", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white/80 mb-2", children: "\u015Eifre Tekrar" }), _jsx("input", { type: "password", required: true, value: formData.confirmPassword, onChange: (e) => setFormData({ ...formData, confirmPassword: e.target.value }), className: "input-modern", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full", children: loading ? 'Kayıt Oluşturuluyor...' : 'Kayıt Ol' })] }), _jsxs("p", { className: "mt-8 text-center text-white/70", children: ["Zaten hesab\u0131n\u0131z var m\u0131?", ' ', _jsx(Link, { to: "/giris-yap", className: "text-teal-400 hover:text-teal-300 font-semibold", children: "Giri\u015F yap\u0131n" })] }), _jsx("div", { className: "mt-8 text-center", children: _jsx(Link, { to: "/", className: "text-sm text-white/60 hover:text-white/80", children: "\u2190 Ana Sayfaya D\u00F6n" }) })] }) }));
}
