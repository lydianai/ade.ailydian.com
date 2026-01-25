import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, LockClosedIcon, KeyIcon, ServerIcon, EyeSlashIcon, DocumentCheckIcon, CheckCircleIcon, ExclamationTriangleIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Security() {
    const securityFeatures = [
        {
            icon: LockClosedIcon,
            title: '256-bit AES ^ifreleme',
            desc: 'T�m verileriniz hem iletimde (TLS 1.3) hem de depolamada 256-bit AES ile _ifrelenir.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: KeyIcon,
            title: '0ki Fakt�rl� Kimlik Dorulama',
            desc: 'SMS, email veya Google Authenticator ile hesab1n1z1 ekstra koruma alt1na al1n.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: ServerIcon,
            title: 'ISO 27001 Sertifikal1',
            desc: 'Veri merkezlerimiz ISO 27001 ve SOC 2 Type II sertifikalar1na sahiptir.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: EyeSlashIcon,
            title: 'S1f1r Bilgi Mimarisi',
            desc: 'Hassas verileriniz _ifreli saklan1r. ADE �al1_anlar1 bile g�remez.',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: DocumentCheckIcon,
            title: 'KVKK & GDPR Uyumlu',
            desc: 'T�m veri i_leme s�re�lerimiz KVKK ve GDPR standartlar1na uygundur.',
            color: 'from-teal-500 to-cyan-500',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Penetrasyon Testleri',
            desc: 'Her 3 ayda bir ba1ms1z g�venlik uzmanlar1nca penetrasyon testi yap1l1r.',
            color: 'from-red-500 to-rose-500',
        },
    ];
    const infrastructure = [
        {
            title: 'Veri Merkezleri',
            items: [
                'AWS Frankfurt (Birincil)',
                'AWS 0stanbul (Yedek)',
                'ISO 27001, SOC 2 Type II sertifikal1',
                '7/24 fiziksel g�venlik',
                '�oklu biyometrik eri_im kontrol',
            ],
        },
        {
            title: 'Yedekleme',
            items: [
                'Ger�ek zamanl1 veritaban1 replikasyonu',
                'G�nl�k otomatik yedekleme',
                '30 g�n yedek saklama',
                'Corafi olarak da1t1k yedekler',
                '4 saat RTO, 15 dakika RPO',
            ],
        },
        {
            title: 'Eri_im Kontrol�',
            items: [
                'Rol bazl1 eri_im y�netimi (RBAC)',
                'En az yetki prensibi',
                'T�m eri_imler loglanan',
                'Anomali tespiti ve uyar1lar',
                '^�pheli aktivitelerde otomatik kilitleme',
            ],
        },
    ];
    const compliance = [
        {
            name: 'ISO 27001',
            desc: 'Bilgi g�venlii y�netim sistemi',
            status: 'Sertifikal1',
            color: 'text-green-400',
        },
        {
            name: 'SOC 2 Type II',
            desc: 'G�venlik, gizlilik ve eri_ilebilirlik',
            status: 'Sertifikal1',
            color: 'text-blue-400',
        },
        {
            name: 'KVKK',
            desc: 'Ki_isel verilerin korunmas1',
            status: 'Uyumlu',
            color: 'text-purple-400',
        },
        {
            name: 'GDPR',
            desc: 'Avrupa veri koruma standard1',
            status: 'Uyumlu',
            color: 'text-amber-400',
        },
    ];
    const bestPractices = [
        {
            title: 'G��l� Parola Kullan1n',
            desc: 'En az 12 karakter, b�y�k-k���k harf, say1 ve �zel karakter i�eren parolalar tercih edin.',
            icon: KeyIcon,
        },
        {
            title: '0ki Fakt�rl� Kimlik Dorulama',
            desc: 'Hesab1n1z1 ekstra koruma katman1 ile g�vence alt1na al1n.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Oturumlar1 D�zenli Kapat1n',
            desc: 'Ortak bilgisayarlarda i_iniz bittiinde mutlaka �1k1_ yap1n.',
            icon: LockClosedIcon,
        },
        {
            title: '^�pheli Aktiviteleri Bildirin',
            desc: 'Hesab1n1zda olaand1_1 bir _ey fark ederseniz hemen destek ekibimize bildirin.',
            icon: ExclamationTriangleIcon,
        },
    ];
    const incidentResponse = [
        {
            step: '1. Tespit',
            desc: 'Otomatik sistemler ve SOC ekibimiz 7/24 izleme yapar',
            time: '< 5 dakika',
        },
        {
            step: '2. Deerlendirme',
            desc: 'Olay1n ciddiyeti ve etki alan1 belirlenir',
            time: '< 15 dakika',
        },
        {
            step: '3. M�dahale',
            desc: 'G�venlik ekibi derhal m�dahale eder, tehdidi izole eder',
            time: '< 30 dakika',
        },
        {
            step: '4. Bildirim',
            desc: 'Etkilenen kullan1c1lar ve yetkili kurumlar bilgilendirilir',
            time: '< 2 saat',
        },
        {
            step: '5. K�k Neden Analizi',
            desc: 'Olay1n nedeni ara_t1r1l1r ve �nlemler al1n1r',
            time: '< 24 saat',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6", children: _jsx(ShieldCheckIcon, { className: "w-10 h-10 text-white" }) }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "G\uFFFDvenlik " }), _jsx("span", { className: "text-gradient-green-blue", children: "\uFFFDnceli\u001Fimiz" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Verileriniz banka standartlar1nda _ifreleme ve \uFFFDok katmanl1 g\uFFFDvenlik \uFFFDnlemleriyle korunur" }), _jsx("div", { className: "flex flex-wrap items-center justify-center gap-4", children: compliance.map((cert, index) => (_jsx(motion.span, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 + index * 0.1 }, className: "px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-semibold", children: cert.name }, index))) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "G\uFFFDvenlik " }), _jsx("span", { className: "text-gradient-green-blue", children: "\uFFFDzellikleri" })] }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: securityFeatures.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 group hover:scale-105 transition-transform", children: [_jsx("div", { className: `w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(feature.icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: feature.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: _jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Altyap1 " }), _jsx("span", { className: "text-gradient-purple-pink", children: "G\uFFFDvenli\u001Fi" })] }) }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: infrastructure.map((section, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: section.title }), _jsx("ul", { className: "space-y-3", children: section.items.map((item, iIndex) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" }), _jsx("span", { className: "text-white/80", children: item })] }, iIndex))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Olay M\uFFFDdahale " }), _jsx("span", { className: "text-gradient-amber-teal", children: "S\uFFFDreci" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Olas1 g\uFFFDvenlik olaylar1na nas1l yan1t veriyoruz" })] }), _jsx("div", { className: "max-w-4xl mx-auto space-y-6", children: incidentResponse.map((step, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8 flex items-center gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white", children: index + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-2", children: step.step }), _jsx("p", { className: "text-white/70", children: step.desc })] }), _jsxs("div", { className: "text-right flex-shrink-0", children: [_jsx("div", { className: "text-green-400 font-bold", children: step.time }), _jsx("div", { className: "text-white/50 text-sm", children: "hedef s\uFFFDre" })] })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "G\uFFFDvenlik " }), _jsx("span", { className: "text-gradient-blue-purple", children: "0pu\uFFFDlar1" })] }), _jsx("p", { className: "text-xl text-white/70", children: "Hesab1n1z1 g\uFFFDvende tutmak i\uFFFDin yapabilecekleriniz" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: bestPractices.map((practice, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-8", children: [_jsx(practice.icon, { className: "w-12 h-12 text-blue-400 mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: practice.title }), _jsx("p", { className: "text-white/70", children: practice.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-green-900/20 via-blue-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-4xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "G\uFFFDvenlik A\uFFFD1\u001F1 Bildirin" }) }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Sorumlu a\uFFFD1klama politikam1z kapsam1nda g\uFFFDvenlik a\uFFFD1\u001F1 bulursan1z l\uFFFDtfen bildirin" }), _jsx("div", { className: "glass-card p-6 mb-8 text-left", children: _jsxs("div", { className: "space-y-3 text-white/80", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-amber-400", children: "Email:" }), _jsx("span", { className: "ml-2", children: "security@ade.gov.tr" })] }), _jsxs("div", { children: [_jsx("span", { className: "font-semibold text-teal-400", children: "PGP Key:" }), _jsx("span", { className: "ml-2 font-mono text-sm", children: "4096R/ABCD1234" })] })] }) }), _jsx(Link, { to: "/contact", className: "btn-primary", children: "0leti_ime Ge\uFFFD" })] }) }) }), _jsx(Footer, {})] }));
}
