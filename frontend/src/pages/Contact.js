import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
    });
    const contactMethods = [
        {
            icon: PhoneIcon,
            title: 'Telefon',
            value: '0850 390 80 80',
            detail: 'Hafta içi 09:00 - 18:00',
            link: 'tel:+908503908080',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: EnvelopeIcon,
            title: 'Email',
            value: 'info@ade.gov.tr',
            detail: '24 saat içinde yanıt',
            link: 'mailto:info@ade.gov.tr',
            color: 'from-teal-500 to-cyan-500',
        },
        {
            icon: ChatBubbleLeftRightIcon,
            title: 'Canlı Destek',
            value: 'Hemen Başlat',
            detail: '7/24 aktif',
            link: '/support',
            color: 'from-purple-500 to-pink-500',
        },
    ];
    const offices = [
        {
            city: 'İstanbul (Merkez)',
            address: 'Maslak Mahallesi, Teknoloji Cd. No:12 ADE Plaza, 34398 Sarıyer / İstanbul',
            phone: '0850 390 80 80',
            email: 'istanbul@ade.gov.tr',
        },
        {
            city: 'Ankara',
            address: 'Mustafa Kemal Mahallesi, Dumlupınar Bulvarı No:266, 06800 Çankaya / Ankara',
            phone: '0850 390 80 81',
            email: 'ankara@ade.gov.tr',
        },
        {
            city: 'İzmir',
            address: 'Konak Mahallesi, Cumhuriyet Bulvarı No:142, 35250 Konak / İzmir',
            phone: '0850 390 80 82',
            email: 'izmir@ade.gov.tr',
        },
    ];
    const reasons = [
        {
            icon: '💼',
            title: 'Kurumsal Satış',
            desc: 'Enterprise çözümler ve özel teklifler için',
        },
        {
            icon: '🤝',
            title: 'İş Ortaklığı',
            desc: 'Entegrasyon ve partnership fırsatları',
        },
        {
            icon: '📰',
            title: 'Basın & Medya',
            desc: 'Röportaj talepleri ve basın kiti',
        },
        {
            icon: '🎓',
            title: 'Kariyer',
            desc: 'Açık pozisyonlar ve başvurular',
        },
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" }), _jsxs("div", { className: "container-custom relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "\u0130leti\u015Fime " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Ge\u00E7in" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "Sorular\u0131n\u0131z, \u00F6nerileriniz veya i\u015F birli\u011Fi teklifleriniz i\u00E7in bize ula\u015F\u0131n" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: contactMethods.map((method, index) => (_jsxs(motion.a, { href: method.link, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 + index * 0.1 }, className: "glass-card-premium p-8 text-center group hover:scale-105 transition-transform", children: [_jsx("div", { className: `w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`, children: _jsx(method.icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-lg font-bold text-white mb-2", children: method.title }), _jsx("p", { className: "text-teal-400 font-semibold mb-1", children: method.value }), _jsx("p", { className: "text-white/60 text-sm", children: method.detail })] }, index))) })] })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsx("div", { className: "container-custom", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Mesaj G\u00F6nderin" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white/80 mb-2 text-sm font-medium", children: "Ad Soyad" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "input-modern", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/80 mb-2 text-sm font-medium", children: "Email" }), _jsx("input", { type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "input-modern", required: true })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white/80 mb-2 text-sm font-medium", children: "Telefon" }), _jsx("input", { type: "tel", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), className: "input-modern" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/80 mb-2 text-sm font-medium", children: "\u015Eirket" }), _jsx("input", { type: "text", value: formData.company, onChange: (e) => setFormData({ ...formData, company: e.target.value }), className: "input-modern" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/80 mb-2 text-sm font-medium", children: "Konu" }), _jsxs("select", { value: formData.subject, onChange: (e) => setFormData({ ...formData, subject: e.target.value }), className: "input-modern", required: true, children: [_jsx("option", { value: "", children: "Se\u00E7iniz" }), _jsx("option", { value: "sales", children: "Sat\u0131\u015F & Demo Talebi" }), _jsx("option", { value: "support", children: "Teknik Destek" }), _jsx("option", { value: "partnership", children: "\u0130\u015F Ortakl\u0131\u011F\u0131" }), _jsx("option", { value: "press", children: "Bas\u0131n & Medya" }), _jsx("option", { value: "career", children: "Kariyer" }), _jsx("option", { value: "other", children: "Di\u011Fer" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white/80 mb-2 text-sm font-medium", children: "Mesaj\u0131n\u0131z" }), _jsx("textarea", { value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), rows: 6, className: "input-modern resize-none", required: true })] }), _jsx("button", { type: "submit", className: "btn-primary w-full", children: "G\u00F6nder" })] })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Neden Bize Ula\u015Fmal\u0131s\u0131n\u0131z?" }), _jsx("div", { className: "space-y-4", children: reasons.map((reason, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-6 flex items-start gap-4", children: [_jsx("div", { className: "text-4xl", children: reason.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white mb-1", children: reason.title }), _jsx("p", { className: "text-white/70 text-sm", children: reason.desc })] })] }, index))) })] }), _jsxs("div", { className: "glass-card-premium p-8", children: [_jsxs("h3", { className: "font-bold text-white mb-4 flex items-center gap-2", children: [_jsx(ClockIcon, { className: "w-5 h-5 text-amber-400" }), "\u00C7al\u0131\u015Fma Saatleri"] }), _jsxs("div", { className: "space-y-2 text-white/70", children: [_jsx("p", { children: "Pazartesi - Cuma: 09:00 - 18:00" }), _jsx("p", { children: "Cumartesi: 10:00 - 16:00" }), _jsx("p", { children: "Pazar: Kapal\u0131" }), _jsx("p", { className: "text-green-400 font-semibold mt-4", children: "Canl\u0131 destek 7/24 aktif" })] })] })] })] }) }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-12", children: _jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-4", children: _jsx("span", { className: "text-white", children: "Ofislerimiz" }) }) }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: offices.map((office, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: office.city }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(MapPinIcon, { className: "w-5 h-5 text-purple-400 flex-shrink-0 mt-1" }), _jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: office.address })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(PhoneIcon, { className: "w-5 h-5 text-teal-400 flex-shrink-0" }), _jsx("a", { href: `tel:${office.phone}`, className: "text-white/80 hover:text-teal-400 transition-colors", children: office.phone })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(EnvelopeIcon, { className: "w-5 h-5 text-amber-400 flex-shrink-0" }), _jsx("a", { href: `mailto:${office.email}`, className: "text-white/80 hover:text-amber-400 transition-colors", children: office.email })] })] })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsx("div", { className: "container-custom", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-8 text-center h-96 flex items-center justify-center", children: _jsxs("div", { children: [_jsx(MapPinIcon, { className: "w-16 h-16 text-amber-400 mx-auto mb-4" }), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Harita" }), _jsx("p", { className: "text-white/60", children: "\u0130stanbul Merkez Ofis Konumu" })] }) }) }) }), _jsx(Footer, {})] }));
}
