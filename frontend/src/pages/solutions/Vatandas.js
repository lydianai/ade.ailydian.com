import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BoltIcon, HeartIcon, HomeIcon, DocumentTextIcon, CalendarIcon, ShieldCheckIcon, PhoneIcon, BellAlertIcon, ClockIcon, CheckCircleIcon, UserCircleIcon, CreditCardIcon, } from '@heroicons/react/24/outline';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function Vatandas() {
    const features = [
        {
            icon: BoltIcon,
            title: 'Fatura Ödemeleri',
            desc: 'Elektrik, su, doğalgaz, telefon, internet faturalarınızı otomatik ödeyin. Son ödeme tarihini kaçırmayın.',
            gradient: 'from-amber-500 to-orange-500',
        },
        {
            icon: HeartIcon,
            title: 'Sağlık Takibi',
            desc: 'MHRS randevuları, reçete takibi, ilaç hatırlatmaları, aşı takviminiz hep yanınızda.',
            gradient: 'from-red-500 to-pink-500',
        },
        {
            icon: HomeIcon,
            title: 'e-Devlet İşlemleri',
            desc: '8.000+ e-Devlet hizmetine tek tıkla erişim. Nüfus, tapu, ehliyet, ikametgah ve daha fazlası.',
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            icon: DocumentTextIcon,
            title: 'Vergi ve SGK',
            desc: 'Motorlu taşıtlar vergisi, emlak vergisi, SGK prim borçları otomatik takip ve ödeme.',
            gradient: 'from-purple-500 to-indigo-500',
        },
        {
            icon: CalendarIcon,
            title: 'Randevu Yönetimi',
            desc: 'Hastane, noter, pasaport randevularınızı tek yerden yönetin. Hatırlatma almayı unutmayın.',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Güvenli ve Şifreli',
            desc: 'Tüm verileriniz 256-bit AES şifreleme ile korunur. Kimlik bilgileriniz bizde saklanmaz.',
            gradient: 'from-blue-500 to-indigo-500',
        },
    ];
    const voiceAssistant = [
        {
            scenario: 'Fatura Ödeme',
            userCommand: 'ADE, bugün hangi faturalarım var?',
            aiResponse: 'Bugün son ödeme tarihi olan 2 faturanız var: Elektrik faturası 385 TL ve internet faturası 150 TL. Toplam 535 TL. İstersen şimdi ödüyorum?',
            result: 'Sesli onayınızla faturalar anında ödenir',
        },
        {
            scenario: 'Sağlık Randevusu',
            userCommand: 'ADE, yarın randevum var mı?',
            aiResponse: 'Evet, yarın saat 14:30\'da Dr. Mehmet Yılmaz ile kardiyoloji randevunuz var. Ankara Şehir Hastanesi, 3. Blok, 2. Kat. Reçetelerinizi almayı unutmayın.',
            result: 'Randevu saatinden 1 saat önce hatırlatma',
        },
        {
            scenario: 'Vergi Takibi',
            userCommand: 'ADE, vergi borcum var mı?',
            aiResponse: 'Motorlu taşıtlar vergisi son ödeme tarihi 31 Ocak. 2.450 TL ödemeniz gerekiyor. Peşin öderseniz %5 indirim var, 2.327 TL olacak. Ödememi yapayım mı?',
            result: 'Otomatik ödeme ve indirim fırsatlarını kaçırmama',
        },
    ];
    const useCases = [
        {
            name: 'Fatma Teyze - Emekli - 68 Yaş',
            icon: '👵',
            problem: 'Elektrik, su, doğalgaz faturalarını geç ödüyor, gecikme faizi ödüyordu. MHRS\'den randevu alamıyor, ilaçlarını unutuyordu.',
            solution: 'ADE Sesli Asistan sayesinde tüm faturalar zamanında ödeniyor. Hastane randevuları otomatik alınıyor. İlaç saatlerinde sesli hatırlatma geliyor.',
            results: [
                'Sıfır gecikme faizi',
                'Tüm randevular zamanında',
                'İlaçları düzenli kullanıyor',
                'Aylık 200 TL tasarruf',
            ],
        },
        {
            name: 'Ahmet Bey - Memur - 45 Yaş',
            icon: '👨‍💼',
            problem: 'İş yoğunluğu nedeniyle kişisel işlerini halledemiyor. e-Devlet şifrelerini unutuyor, noter randevusu alamıyor.',
            solution: 'ADE tüm e-Devlet işlemlerini tek yerden yapıyor. Noter, pasaport randevuları otomatik alınıyor. Vergi ödemeleri zamanında yapılıyor.',
            results: [
                'Ayda 8 saat zaman tasarrufu',
                'Tüm işlemler tek yerden',
                'Hiçbir son tarihi kaçırmıyor',
                'Stres seviyesi düştü',
            ],
        },
        {
            name: 'Zeynep Hanım - Ev Hanımı - 38 Yaş',
            icon: '👩',
            problem: 'Çocukların aşı takvimleri, hastane randevuları, okul işleri karışıyor. Fatura ödeme günlerini unutuyor.',
            solution: 'ADE tüm aile bireylerinin takibini yapıyor. Çocukların aşı tarihleri, okul kayıt günleri hatırlatılıyor. Tüm faturalar otomatik ödeniyor.',
            results: [
                '3 çocuğun takibi zahmetsiz',
                'Tüm faturalar zamanında',
                'Aşı takvimleri düzenli',
                'Zihinsel yük azaldı',
            ],
        },
    ];
    const elderlyFeatures = [
        {
            title: 'Büyük Yazı ve Sesli Okuma',
            desc: 'Tüm metinler büyük puntolu gösterilir. İsterseniz ADE size sesli okur.',
            icon: PhoneIcon,
        },
        {
            title: 'Sesli Komut Desteği',
            desc: 'Ekrana dokunmadan, sadece konuşarak tüm işlemlerinizi yapabilirsiniz.',
            icon: BellAlertIcon,
        },
        {
            title: 'Basitleştirilmiş Arayüz',
            desc: 'Karmaşık menüler yok. Her şey tek ekranda, anlaşılır şekilde.',
            icon: UserCircleIcon,
        },
        {
            title: 'Akraba Bildirimi',
            desc: 'Önemli ödemelerde veya randevularda yakınlarınıza da bildirim gider.',
            icon: HeartIcon,
        },
    ];
    const pricing = {
        name: 'Vatandaş',
        price: '0',
        period: 'süresiz ücretsiz',
        description: 'Tüm vatandaşlar için tamamen ücretsiz',
        features: [
            'Sınırsız fatura ödeme',
            '8.000+ e-Devlet hizmeti',
            'MHRS entegrasyonu',
            'Vergi ve SGK takibi',
            'Sesli asistan',
            'Büyük yazı modu',
            'Akraba bildirimleri',
            'WhatsApp hatırlatmaları',
            'Email destek',
        ],
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl", style: { animationDelay: '2s' } }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-5xl mx-auto", children: [_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 }, className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/30 mb-8", children: [_jsx(HeartIcon, { className: "w-5 h-5 text-pink-400" }), _jsx("span", { className: "text-white/90 font-medium", children: "Her Ya\u015Ftan Vatanda\u015F \u0130\u00E7in \u00DCcretsiz" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8 leading-tight", children: [_jsx("span", { className: "text-white", children: "Devlet \u0130\u015Fleriniz" }), _jsx("br", {}), _jsx("span", { className: "text-gradient-amber-teal", children: "Art\u0131k \u00C7ok Kolay" })] }), _jsx("p", { className: "text-xl md:text-2xl text-white/70 mb-12 leading-relaxed", children: "Faturalar\u0131n\u0131z\u0131, sa\u011Fl\u0131k randevular\u0131n\u0131z\u0131, vergi \u00F6demelerinizi tek bir yerden y\u00F6netin. Sesli komutla, b\u00FCy\u00FCk yaz\u0131yla, sizin i\u00E7in tasarland\u0131." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 mb-16", children: [_jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg", children: "Hemen \u00DCcretsiz Ba\u015Fla" }), _jsx(Link, { to: "#features", className: "btn-secondary text-lg", children: "\u00D6zellikleri G\u00F6r" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                        { value: '2.1M+', label: 'Vatandaş Kullanıcı' },
                                        { value: '450K', label: '65+ Yaş Kullanıcı' },
                                        { value: '%100', label: 'Ücretsiz' },
                                        { value: '4.9/5', label: 'Memnuniyet' },
                                    ].map((stat, index) => (_jsxs("div", { className: "glass-card p-6", children: [_jsx("div", { className: "text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2", children: stat.value }), _jsx("div", { className: "text-white/60 text-sm", children: stat.label })] }, index))) })] }) })] }), _jsx("section", { id: "features", className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Neler " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Yapabilirsiniz?" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "T\u00FCm devlet i\u015Flemleriniz ve \u00F6demeleriniz tek platformda" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8 group", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`, children: _jsx(feature.icon, { className: "w-7 h-7 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed", children: feature.desc })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-amber-900/20 via-pink-900/10 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Sesli " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Asistan" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Konu\u015Farak her \u015Feyi yap\u0131n. Ya\u015Fl\u0131lar i\u00E7in \u00F6zel tasarland\u0131." })] }), _jsx("div", { className: "space-y-8", children: voiceAssistant.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-card-premium p-8", children: [_jsx("div", { className: "mb-6", children: _jsx("span", { className: "px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold", children: item.scenario }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0", children: _jsx(PhoneIcon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "text-amber-400 font-semibold mb-2", children: "Siz" }), _jsx("div", { className: "glass-card p-4 border-l-4 border-amber-500", children: _jsx("p", { className: "text-white/90 text-lg", children: item.userCommand }) })] })] }), _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0", children: _jsx(BellAlertIcon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "text-teal-400 font-semibold mb-2", children: "ADE Asistan" }), _jsx("div", { className: "glass-card p-4 border-l-4 border-teal-500", children: _jsx("p", { className: "text-white/90 text-lg", children: item.aiResponse }) })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-green-400", children: [_jsx(CheckCircleIcon, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: item.result })] })] })] }, index))) })] }) }), _jsx("section", { className: "section-padding", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ya\u015Fl\u0131lar i\u00E7in " }), _jsx("span", { className: "text-gradient-amber-teal", children: "\u00D6zel \u00D6zellikler" })] }), _jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "Teknolojiye yabanc\u0131 olanlar i\u00E7in kullan\u0131m\u0131 kolayla\u015Ft\u0131ran \u00F6zellikler" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: elderlyFeatures.map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card-premium p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0", children: _jsx(feature.icon, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: feature.title }), _jsx("p", { className: "text-white/70 leading-relaxed text-lg", children: feature.desc })] })] }) }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-white/5 to-transparent", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Ger\u00E7ek " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Hikayeler" })] }), _jsx("p", { className: "text-xl text-white/70", children: "ADE hayatlar\u0131 nas\u0131l kolayla\u015Ft\u0131r\u0131yor" })] }), _jsx("div", { className: "space-y-12", children: useCases.map((useCase, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-8 md:p-12", children: [_jsxs("div", { className: "flex items-start gap-6 mb-8", children: [_jsx("div", { className: "text-6xl", children: useCase.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-6", children: useCase.name }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-card p-6 border-l-4 border-red-500", children: [_jsx("span", { className: "text-red-400 font-semibold mb-2 block", children: "Sorun" }), _jsx("p", { className: "text-white/80 text-lg", children: useCase.problem })] }), _jsxs("div", { className: "glass-card p-6 border-l-4 border-teal-500", children: [_jsx("span", { className: "text-teal-400 font-semibold mb-2 block", children: "ADE \u00C7\u00F6z\u00FCm\u00FC" }), _jsx("p", { className: "text-white/80 text-lg", children: useCase.solution })] })] })] })] }), _jsx("div", { className: "grid md:grid-cols-4 gap-4", children: useCase.results.map((result, rIndex) => (_jsxs("div", { className: "glass-card p-4 text-center", children: [_jsx(CheckCircleIcon, { className: "w-8 h-8 text-green-400 mx-auto mb-2" }), _jsx("p", { className: "text-white/80 text-sm", children: result })] }, rIndex))) })] }, index))) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Tamamen " }), _jsx("span", { className: "text-gradient-amber-teal", children: "\u00DCcretsiz" })] }), _jsx("p", { className: "text-xl text-white/70", children: "T\u00FCm vatanda\u015Flar\u0131m\u0131z i\u00E7in hi\u00E7bir \u00FCcret yok" })] }), _jsx("div", { className: "max-w-2xl mx-auto", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 border-2 border-green-500 shadow-2xl shadow-green-500/20", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-2", children: pricing.name }), _jsxs("div", { className: "mb-4", children: [_jsxs("span", { className: "text-6xl font-bold text-gradient-amber-teal", children: [pricing.price, " TL"] }), _jsx("div", { className: "text-white/60 mt-2", children: pricing.period })] }), _jsx("p", { className: "text-white/70 text-lg", children: pricing.description })] }), _jsx("ul", { className: "space-y-4 mb-8", children: pricing.features.map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckCircleIcon, { className: "w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-white/80 text-lg", children: feature })] }, i))) }), _jsx(Link, { to: "/kayit-ol", className: "block w-full text-center btn-primary text-lg", children: "Hemen Ba\u015Fla" })] }) })] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-amber-900/20 via-pink-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-6", children: [_jsx("span", { className: "text-white", children: "Hayat\u0131n\u0131z\u0131 " }), _jsx("span", { className: "text-gradient-amber-teal", children: "Kolayla\u015Ft\u0131r\u0131n" })] }), _jsx("p", { className: "text-xl text-white/70 mb-8 max-w-2xl mx-auto", children: "2.1 milyon vatanda\u015F ADE kullan\u0131yor. Siz de devlet i\u015Flemlerinizi kolayla\u015Ft\u0131r\u0131n." }), _jsx(Link, { to: "/kayit-ol", className: "btn-primary text-lg px-12 py-6 inline-flex items-center gap-3", children: "Hemen \u00DCcretsiz Ba\u015Fla" }), _jsx("p", { className: "text-sm text-white/50 mt-6", children: "Kay\u0131t \u00FCcretsiz \u2022 Kredi kart\u0131 gerekmez \u2022 Diledi\u011Finiz zaman iptal edebilirsiniz" })] }) }) }), _jsx(Footer, {})] }));
}
