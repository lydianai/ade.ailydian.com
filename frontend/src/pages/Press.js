import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NewspaperIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Press() {
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsx("section", { className: "pt-32 pb-20 section-padding", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsx(NewspaperIcon, { className: "w-24 h-24 text-orange-400 mx-auto mb-8" }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "Bas\u0131n " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Kiti" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "ADE hakk\u0131nda bas\u0131n b\u00FCltenleri, medya kiti ve ileti\u015Fim bilgileri" }), _jsx(Link, { to: "/", className: "btn-primary", children: "Anasayfaya D\u00F6n" })] }) }) }), _jsx(Footer, {})] }));
}
