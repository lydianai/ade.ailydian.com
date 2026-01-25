import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../contexts/useAuthStore';
export default function GirisYap() {
    const navigate = useNavigate();
    const { girisYap, loading, error, clearError } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        try {
            // Backend uses Turkish field names (sifre not password)
            await girisYap(formData.email, formData.password);
            navigate('/panel');
        }
        catch (err) {
            // Error is already handled in the store
            console.error('Login error:', err);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-4", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "glass-card p-8 md:p-12 w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-2 text-gradient-amber-teal", children: "ADE" }), _jsx("p", { className: "text-white/70", children: "Hesab\u0131n\u0131za giri\u015F yap\u0131n" })] }), error && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-white/80 mb-2", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(EnvelopeIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { id: "email", type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "input-modern pl-12", placeholder: "ornek@email.com" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-white/80 mb-2", children: "\u015Eifre" }), _jsxs("div", { className: "relative", children: [_jsx(LockClosedIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { id: "password", type: showPassword ? 'text' : 'password', required: true, value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), className: "input-modern pl-12 pr-12", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors", children: showPassword ? _jsx(EyeSlashIcon, { className: "w-5 h-5" }) : _jsx(EyeIcon, { className: "w-5 h-5" }) })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("label", { className: "flex items-center gap-2 text-white/70", children: [_jsx("input", { type: "checkbox", className: "rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500/50" }), "Beni hat\u0131rla"] }), _jsx(Link, { to: "/sifremi-unuttum", className: "text-teal-400 hover:text-teal-300 transition-colors", children: "\u015Eifremi unuttum" })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full", children: loading ? 'Giriş yapılıyor...' : 'Giriş Yap' })] }), _jsxs("div", { className: "relative my-8", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-white/10" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-4 bg-dark-900 text-white/60", children: "veya" }) })] }), _jsxs("p", { className: "text-center text-white/70", children: ["Hesab\u0131n\u0131z yok mu?", ' ', _jsx(Link, { to: "/kayit-ol", className: "text-teal-400 hover:text-teal-300 font-semibold transition-colors", children: "Kay\u0131t olun" })] }), _jsx("div", { className: "mt-8 text-center", children: _jsx(Link, { to: "/", className: "text-sm text-white/60 hover:text-white/80 transition-colors", children: "\u2190 Ana Sayfaya D\u00F6n" }) })] }) }));
}
