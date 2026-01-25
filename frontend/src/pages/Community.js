import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UsersIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Community() {
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsx("section", { className: "pt-32 pb-20 section-padding", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsx(UsersIcon, { className: "w-24 h-24 text-purple-400 mx-auto mb-8" }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "ADE " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Toplulu\u011Fu" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "Discord, GitHub ve Forum \u00FCzerinden binlerce ADE kullan\u0131c\u0131s\u0131yla bulu\u015Fun" }), _jsx(Link, { to: "/", className: "btn-primary", children: "Anasayfaya D\u00F6n" })] }) }) }), _jsx(Footer, {})] }));
}
