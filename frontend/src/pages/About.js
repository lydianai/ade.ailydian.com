import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SparklesIcon, RocketLaunchIcon, HeartIcon, UsersIcon, LightBulbIcon, GlobeAltIcon, CheckCircleIcon, TrophyIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function About() {
    const milestones = [
        { year: '2024 Q1', event: 'ADE kuruluşu, ilk yatırım turu (12M TL)', icon: RocketLaunchIcon },
        { year: '2024 Q2', event: 'İlk 1.000 kullanıcı, GİB entegrasyonu tamamlandı', icon: UsersIcon },
        { year: '2024 Q3', event: '18 bakanlık entegrasyonu, gelişmiş AI altyapısı', icon: GlobeAltIcon },
        { year: '2024 Q4', event: '100.000 kullanıcı, Series A (85M TL)', icon: TrophyIcon },
        { year: '2025 Q1', event: '500.000 kullanıcı, KOBİ paketleri lansmanı', icon: SparklesIcon },
        { year: '2025 Q2', event: '2.1M kullanıcı, Sesli asistan lansman', icon: HeartIcon },
    ];
    const team = [
        {
            name: 'Dr. Mehmet Yılmaz',
            role: 'Kurucu & CEO',
            bio: 'Eski ODTÜ Bilgisayar Mühendisliği öğretim üyesi. 15 yıl AI araştırmaları. MIT Visiting Researcher.',
            avatar: '👨‍💼',
        },
        {
            name: 'Ayşe Demir',
            role: 'CTO',
            bio: 'Google Brain\'de 8 yıl. Türkçe NLP modelleri üzerine uzman. Stanford PhD.',
            avatar: '👩‍💻',
        },
        {
            name: 'Can Öztürk',
            role: 'CPO',
            bio: 'Trendyol\'da 6 yıl Product Lead. UX/UI tasarımı ve ürün stratejisi uzmanı.',
            avatar: '👨‍🎨',
        },
        {
            name: 'Elif Kaya',
            role: 'CFO & Legal',
            bio: 'Eski Maliye Müfettişi. 12 yıl vergi hukuku deneyimi. İstanbul Bilgi Üniversitesi Hukuk.',
            avatar: '👩‍⚖️',
        },
    ];
    const values = [
        {
            icon: HeartIcon,
            title: 'Kullanıcı Odaklı',
            desc: 'Her özellik gerçek kullanıcı ihtiyaçlarından doğar. Karmaşık teknolojiyi basit UX ile sunuyoruz.',
        },
        {
            icon: LightBulbIcon,
            title: 'İnovasyon',
            desc: 'Dünyada ilk ve tek proaktif devlet asistanı. AI sınırlarını zorluyoruz.',
        },
        {
            icon: CheckCircleIcon,
            title: 'Güven',
            desc: 'Verileriniz 256-bit şifreli, ISO 27001 sertifikalı sunucularımızda. Hiç kimseyle paylaşılmaz.',
        },
        {
            icon: UsersIcon,
            title: 'Şeffaflık',
            desc: 'Fiyatlandırma, SLA, veri kullanımı tamamen şeffaf. Gizli maddik yok.',
        },
    ];
    const stats = [
        { value: '2.1M+', label: 'Aktif Kullanıcı', icon: UsersIcon },
        { value: '18', label: 'Bakanlık Entegrasyonu', icon: GlobeAltIcon },
        { value: '127', label: 'Çalışan', icon: HeartIcon },
        { value: '97M TL', label: 'Toplam Yatırım', icon: TrophyIcon },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: _jsx("span", { className: "text-white", children: "Hakk\u0131m\u0131zda" }) }), _jsx("p", { className: "text-2xl text-white/70 leading-relaxed", children: "ADE, T\u00FCrkiye'nin ilk yapay zeka destekli devlet asistan\u0131d\u0131r. Misyonumuz: Her vatanda\u015F\u0131n, esnaf\u0131n ve KOB\u0130'nin devlet i\u015Flemlerini kolay, h\u0131zl\u0131 ve hatas\u0131z yapmas\u0131n\u0131 sa\u011Flamak." })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsx("div", { className: "container-custom", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card-premium p-12", children: [_jsx(RocketLaunchIcon, { className: "w-16 h-16 text-amber-400 mb-6" }), _jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: "Misyonumuz" }), _jsx("p", { className: "text-xl text-white/80 leading-relaxed", children: "T\u00FCrkiye'deki 4.7 milyon esnaf ve KOB\u0130'nin dijital d\u00F6n\u00FC\u015F\u00FCm\u00FCn\u00FC h\u0131zland\u0131rmak. Karma\u015F\u0131k devlet i\u015Flemlerini yapay zeka ile otomatikle\u015Ftirerek, herkesin zaman\u0131n\u0131 ve paras\u0131n\u0131 tasarruf etmesini sa\u011Flamak." })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card-premium p-12", children: [_jsx(LightBulbIcon, { className: "w-16 h-16 text-teal-400 mb-6" }), _jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: "Vizyonumuz" }), _jsx("p", { className: "text-xl text-white/80 leading-relaxed", children: "2030 y\u0131l\u0131na kadar T\u00FCrkiye'deki t\u00FCm esnaf ve KOB\u0130'lerin dijital asistan\u0131 olmak. B\u00F6lge \u00FClkelerine a\u00E7\u0131larak 50 milyon kullan\u0131c\u0131ya ula\u015Fmak. Devlet-vatanda\u015F etkile\u015Fimini AI ile yeniden tan\u0131mlamak." })] })] }) }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "ADE " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Rakamlarla" })] }) }), _jsx("div", { className: "grid md:grid-cols-4 gap-8", children: stats.map((stat, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 text-center", children: [_jsx(stat.icon, { className: "w-12 h-12 text-amber-400 mx-auto mb-4" }), _jsx("div", { className: "text-5xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60", children: stat.label })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ba\u015Far\u0131 " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Hikayemiz" })] }) }), _jsx("div", { className: "max-w-4xl mx-auto space-y-8", children: milestones.map((milestone, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card p-8 flex items-start gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center flex-shrink-0", children: _jsx(milestone.icon, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "text-amber-400 font-bold mb-2", children: milestone.year }), _jsx("p", { className: "text-white/90 text-lg", children: milestone.event })] })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Y\u00F6netim " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Ekibi" })] }), _jsx("p", { className: "text-xl text-white/70", children: "D\u00FCnya \u00E7ap\u0131nda deneyime sahip liderler" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: team.map((member, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "text-6xl", children: member.avatar }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-1", children: member.name }), _jsx("div", { className: "text-amber-400 font-semibold mb-4", children: member.role }), _jsx("p", { className: "text-white/70 leading-relaxed", children: member.bio })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsx("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "De\u011Ferlerimiz" }) }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: values.map((value, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8 text-center", children: [_jsx(value.icon, { className: "w-12 h-12 text-purple-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: value.title }), _jsx("p", { className: "text-white/70", children: value.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-amber-900/20 via-teal-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ekibe " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Kat\u0131l" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "T\u00FCrkiye'nin dijital d\u00F6n\u00FC\u015F\u00FCm\u00FCnde rol almak ister misin?" }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsx(Link, { to: "/careers", className: "btn-primary text-lg", children: "A\u00E7\u0131k Pozisyonlar" }), _jsx(Link, { to: "/contact", className: "btn-secondary text-lg", children: "\u0130leti\u015Fime Ge\u00E7" })] })] }) }) }), _jsx(Footer, {})] }));
}
