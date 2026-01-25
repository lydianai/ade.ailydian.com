import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, HeartIcon, LightBulbIcon, UsersIcon, GlobeAltIcon, AcademicCapIcon, CurrencyDollarIcon, HomeIcon, CheckCircleIcon, ArrowRightIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Careers() {
    const benefits = [
        {
            icon: CurrencyDollarIcon,
            title: 'Rekabetçi Maaş',
            desc: 'Sektörün üstünde maaş ve hisse senedi opsiyonu',
        },
        {
            icon: HomeIcon,
            title: 'Hibrit Çalışma',
            desc: 'Haftada 2 gün ofiste, 3 gün uzaktan çalışma',
        },
        {
            icon: AcademicCapIcon,
            title: 'Eğitim Bütçesi',
            desc: 'Yıllık 10.000 TL kişisel gelişim bütçesi',
        },
        {
            icon: HeartIcon,
            title: 'Özel Sağlık Sigortası',
            desc: 'Aile bireyleri dahil kapsamlı sağlık sigortası',
        },
        {
            icon: GlobeAltIcon,
            title: 'Yurt Dışı Fırsatları',
            desc: 'Konferans ve toplantılar için seyahat imkanı',
        },
        {
            icon: LightBulbIcon,
            title: 'Innovation Time',
            desc: 'Haftada 4 saat kendi projenize ayırabilirsiniz',
        },
    ];
    const positions = [
        {
            title: 'Senior AI/ML Engineer',
            department: 'AI & Machine Learning',
            location: 'İstanbul (Hibrit)',
            type: 'Tam Zamanlı',
            description: 'Kurumsal seviye büyük dil modellerini Türkçe için fine-tune edecek, production\'da deploy edecek deneyimli AI Engineer arıyoruz.',
            requirements: [
                '5+ yıl AI/ML deneyimi',
                'LLM fine-tuning (LoRA, QLoRA)',
                'Python, PyTorch, HuggingFace',
                'Production ML sistemleri',
            ],
        },
        {
            title: 'Senior Backend Engineer',
            department: 'Engineering',
            location: 'İstanbul (Hibrit)',
            type: 'Tam Zamanlı',
            description: 'Yüksek trafiği kaldırabilecek, ölçeklenebilir backend sistemleri tasarlayacak ve geliştirecek senior developer arıyoruz.',
            requirements: [
                '5+ yıl backend deneyimi',
                'Node.js veya Go',
                'PostgreSQL, Redis, RabbitMQ',
                'Microservices, Docker, Kubernetes',
            ],
        },
        {
            title: 'Product Manager',
            department: 'Product',
            location: 'İstanbul',
            type: 'Tam Zamanlı',
            description: 'KOBİ ve esnaf segmentinde kullanıcı ihtiyaçlarını anlayıp ürün stratejisi belirleyecek PM arıyoruz.',
            requirements: [
                '3+ yıl PM deneyimi',
                'B2B SaaS deneyimi',
                'Veri odaklı karar verme',
                'Stakeholder yönetimi',
            ],
        },
        {
            title: 'Senior DevOps Engineer',
            department: 'Infrastructure',
            location: 'İstanbul (Hibrit)',
            type: 'Tam Zamanlı',
            description: '99.95% uptime hedefleyen, CI/CD pipeline\'ları kuracak, altyapıyı otomatikleştirecek DevOps Engineer arıyoruz.',
            requirements: [
                '4+ yıl DevOps deneyimi',
                'AWS veya GCP',
                'Terraform, Ansible',
                'Monitoring (Prometheus, Grafana)',
            ],
        },
        {
            title: 'UX/UI Designer',
            department: 'Design',
            location: 'İstanbul (Hibrit)',
            type: 'Tam Zamanlı',
            description: 'Karmaşık enterprise sistemlerini basit, kullanıcı dostu arayüzlere dönüştürecek tasarımcı arıyoruz.',
            requirements: [
                '3+ yıl UX/UI deneyimi',
                'Figma, Adobe XD',
                'Design system oluşturma',
                'Kullanıcı araştırması',
            ],
        },
        {
            title: 'Customer Success Manager',
            department: 'Customer Success',
            location: 'İstanbul',
            type: 'Tam Zamanlı',
            description: 'Kurumsal müşterilerimizle ilişkiler kurup onların başarısını sağlayacak CSM arıyoruz.',
            requirements: [
                '2+ yıl CSM deneyimi',
                'B2B SaaS background',
                'İleri düzey Excel, SQL',
                'Mükemmel iletişim becerileri',
            ],
        },
    ];
    const culture = [
        {
            value: 'Ownership',
            desc: 'Her takım üyesi kendi alanının sahibidir. Micromanagement yok, güven var.',
        },
        {
            value: 'Hız',
            desc: '2 haftada bir production\'a kod gönderiyoruz. Hızlı ilerlemek bizim DNA\'mızda.',
        },
        {
            value: 'Öğrenme',
            desc: 'Hata yapmak iyidir. Önemli olan öğrenmek ve tekrar etmemek.',
        },
        {
            value: 'Kullanıcı Obsesyonu',
            desc: 'Tüm kararlar kullanıcı geri bildirimleri ve data ile alınır.',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/30 mb-8", children: [_jsx(RocketLaunchIcon, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "Biz B\u00FCy\u00FCyoruz, Siz de B\u00FCy\u00FCy\u00FCn" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "ADE\\'de " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Kariyer" })] }), _jsx("p", { className: "text-xl md:text-2xl text-white/70 mb-12 leading-relaxed", children: "T\u00FCrkiye'nin dijital d\u00F6n\u00FC\u015F\u00FCm\u00FCnde rol al. D\u00FCnyan\u0131n en ileri AI teknolojileriyle \u00E7al\u0131\u015F. 2.1 milyon kullan\u0131c\u0131n\u0131n hayat\u0131n\u0131 kolayla\u015Ft\u0131r." }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                        { value: '127', label: 'Çalışan' },
                                        { value: '15', label: 'Açık Pozisyon' },
                                        { value: '22', label: 'Ortalama Yaş' },
                                        { value: '4.8/5', label: 'Employee Rating' },
                                    ].map((stat, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 + index * 0.1 }, className: "glass-card p-4", children: [_jsx("div", { className: "text-3xl font-bold text-gradient-amber-teal mb-1", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Yan " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Haklar" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Ekip \u00FCyelerimize sundu\u011Fumuz imkanlar" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: benefits.map((benefit, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8", children: [_jsx(benefit.icon, { className: "w-12 h-12 text-amber-400 mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: benefit.title }), _jsx("p", { className: "text-white/70", children: benefit.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "\u015Eirket " }), _jsx("span", { className: "text-gradient-purple-pink", children: "K\u00FClt\u00FCr\u00FC" })] }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: culture.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 text-center", children: [_jsx("h3", { className: "text-2xl font-bold text-gradient-amber-teal mb-4", children: item.value }), _jsx("p", { className: "text-white/70", children: item.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "A\u00E7\u0131k " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Pozisyonlar" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Ekibimize kat\u0131l\u0131n" })] }), _jsx("div", { className: "space-y-6", children: positions.map((position, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [_jsx("h3", { className: "text-2xl font-bold text-white", children: position.title }), _jsx("span", { className: "px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold", children: position.department })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-4 text-sm text-white/60", children: [_jsx("span", { children: position.location }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: position.type })] }), _jsx("p", { className: "text-white/80 mb-6 leading-relaxed", children: position.description }), _jsx("div", { className: "space-y-2", children: position.requirements.map((req, rIndex) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400 flex-shrink-0" }), _jsx("span", { className: "text-white/70", children: req })] }, rIndex))) })] }), _jsxs(Link, { to: `/careers/apply/${index + 1}`, className: "btn-primary whitespace-nowrap flex items-center gap-2", children: ["Ba\u015Fvur", _jsx(ArrowRightIcon, { className: "w-5 h-5" })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-purple-900/20 via-amber-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Arad\u0131\u011F\u0131n Pozisyon " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Yok mu?" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "CV\\'ni g\u00F6nder, sana uygun bir pozisyon a\u00E7\u0131ld\u0131\u011F\u0131nda ilk biz haber verelim" }), _jsx(Link, { to: "/contact", className: "btn-primary text-lg px-12 py-6", children: "Genel Ba\u015Fvuru Yap" })] }) }) }), _jsx(Footer, {})] }));
}
