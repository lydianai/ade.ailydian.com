import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const categories = [
        'T�m�',
        'Ba_lang1�',
        '�zellikler',
        'Faturalama',
        'G�venlik',
        'Teknik',
    ];
    const [selectedCategory, setSelectedCategory] = useState('T�m�');
    const faqs = [
        {
            category: 'Ba_lang1�',
            q: 'ADE nedir ve nas1l �al1_1r?',
            a: 'ADE (Ak1ll1 Devlet Ekosistemi), T�rkiye\'nin ilk yapay zeka destekli devlet asistan1d1r. e-Devlet, G0B, SGK gibi 18 bakanl1k ve kurumla entegre �al1_arak, t�m resmi i_lemlerinizi tek platformdan yapman1z1 salar. Gelişmiş yapay zeka teknolojisi AI modeli sayesinde doal dilde komut verebilir, fatura kesebilir, beyanname haz1rlayabilir ve t�m muhasebe i_lemlerinizi otomatik hale getirebilirsiniz.',
        },
        {
            category: 'Ba_lang1�',
            q: 'ADE\'ye nas1l �ye olurum?',
            a: 'ADE\'ye �ye olmak �ok basit: 1) ade.gov.tr adresinden "�cretsiz Ba_la" butonuna t1klay1n. 2) Email ve telefon numaran1z1 girin. 3) Gelen dorulama kodunu onaylay1n. 4) e-Devlet _ifrenizle hesab1n1z1 balay1n. T�m i_lem 2-3 dakika s�rer. Kurulum s1ras1nda video rehber e_lik eder.',
        },
        {
            category: 'Ba_lang1�',
            q: '�cretsiz plan ile neler yapabilirim?',
            a: '�cretsiz plan ile: Ayl1k 50 fatura kesebilir, temel muhasebe takibi yapabilir, e-Devlet i_lemlerinizi ger�ekle_tirebilir, SGK sorgulamalar1 yapabilirsiniz. Canl1 destek ve AI asistan �cretsiz planda 7/24 kullan1labilir. Kredi kart1 bilgisi gerekmez.',
        },
        {
            category: '�zellikler',
            q: 'e-Fatura nas1l kesilir?',
            a: 'e-Fatura kesmek i�in: 1) "Faturalar" b�l�m�ne gidin. 2) "Yeni Fatura" butonuna t1klay1n. 3) M�_teri bilgilerini se�in veya yeni ekleyin. 4) �r�n/hizmet bilgilerini girin. 5) "G�nder" butonuna t1klay1n. Fatura otomatik olarak G0B\'e iletilir ve m�_teriye e-posta/SMS g�nderilir. Toplu fatura kesmek i�in Excel\'den i�e aktar1m yapabilirsiniz.',
        },
        {
            category: '�zellikler',
            q: 'SGK bildirimleri nas1l yap1l1r?',
            a: 'SGK bildirimleri tamamen otomatiktir. Sistem her ay otomatik olarak �al1_anlar1n1z1n prim bildirimlerini haz1rlar ve SGK\'ya g�nderir. Manuel m�dahale gerekmez. Yeni i_e giri_, i_ten �1k1_ ve bordro dei_iklikleri i�in ilgili b�l�mlerden bilgi girdiinizde sistem otomatik olarak 4A, 4C formlar1n1 olu_turur ve g�nderir.',
        },
        {
            category: '�zellikler',
            q: 'Hangi entegrasyonlar mevcut?',
            a: 'ADE _u kurumlarla entegredir: e-Devlet, G0B (e-Fatura, e-Ar_iv, e-0rsaliye), SGK, MERSIS, MERN0S, MHRS, 0�i_leri Bakanl11, Tapu Kadastro, Noterler Birlii, 0lbank, t�m kamu bankalar1, Trendyol, Hepsiburada, N11, A�1k Bankac1l1k, Logo, Mikro, Netsis, Eta, Orka. API ile kendi yaz1l1m1n1z1 da balayabilirsiniz.',
        },
        {
            category: '�zellikler',
            q: '�oklu _ube y�netimi nas1l �al1_1r?',
            a: 'KOB0 ve Enterprise paketlerde �oklu _ube y�netimi vard1r. Her _ube i�in ayr1 stok, kasa, personel ve raporlama yapabilirsiniz. Merkezi panelden t�m _ubelerinizin canl1 verilerini g�rebilir, _ubeler aras1 transfer yapabilir, konsolide raporlar alabilirsiniz. Her _ube i�in farkl1 kullan1c1 yetkileri tan1mlayabilirsiniz.',
        },
        {
            category: 'Faturalama',
            q: 'Fiyatland1rma nas1l �al1_1r?',
            a: 'ADE d�rt ana plana sahiptir: �cretsiz (0 TL, bireysel kullan1m), Esnaf (199 TL/ay, tek i_letme), KOB0 Pro (799 TL/ay, �oklu _ube), Enterprise (�zel fiyat, kurumsal ��z�mler). T�m planlar ayl1k veya y1ll1k �denebilir. Y1ll1k �demede %20 indirim uygulan1r. Fatura adedi, kullan1c1 say1s1 ve �zellikler planlara g�re dei_ir.',
        },
        {
            category: 'Faturalama',
            q: 'Plan1m1 nas1l y�kseltebilirim?',
            a: 'Plan y�kseltmek i�in: 1) Ayarlar � Abonelik b�l�m�ne gidin. 2) Yeni plan1 se�in. 3) �deme bilgilerinizi girin (varsa g�ncellenmez). 4) "Y�kselt" butonuna t1klay1n. Plan dei_iklii an1nda ger�ekle_ir, kalan s�reniz yeni plana yans1t1l1r. D�_�rme talepleri d�nem sonunda ge�erli olur.',
        },
        {
            category: 'Faturalama',
            q: '0ptal etmek istersem ne olur?',
            a: '0stediiniz zaman iptal edebilirsiniz. Ayarlar � Abonelik � 0ptal Et. �dediiniz d�nemin sonuna kadar t�m �zellikleri kullanmaya devam edersiniz. 0ptal sonras1 verileriniz 90 g�n saklan1r, istediinizde yedekleme alabilirsiniz. Geri d�n�_ yapmak isterseniz ayn1 verilerle devam edebilirsiniz. 0ade politikas1: 0lk 14 g�n i�inde %100 iade.',
        },
        {
            category: 'Faturalama',
            q: 'Hangi �deme y�ntemleri kabul ediliyor?',
            a: 'Kredi kart1 (Visa, Mastercard, Troy), banka kart1 (debit), A�1k Bankac1l1k (t�m bankalar), havale/EFT. Kurumsal m�_teriler i�in fatura kar_1l11 �deme se�enei mevcuttur. Otomatik tahsilat i�in kredi kart1 veya A�1k Bankac1l1k balayabilirsiniz.',
        },
        {
            category: 'G�venlik',
            q: 'Verilerim g�vende mi?',
            a: 'Verileriniz banka standartlar1nda korunur: 256-bit AES _ifreleme (iletim ve depolama), ISO 27001 ve SOC 2 Type II sertifikal1 veri merkezleri, �oklu corafi yedekleme, 7/24 g�venlik izleme. Hassas bilgileriniz (banka hesap no, _ifreler) s1f1r-bilgi mimarisi ile _ifrelenir, ADE �al1_anlar1 bile g�remez. KVKK ve GDPR uyumlu.',
        },
        {
            category: 'G�venlik',
            q: '0ki fakt�rl� kimlik dorulama nas1l etkinle_tirilir?',
            a: 'Ayarlar � G�venlik � 0ki Fakt�rl� Kimlik Dorulama b�l�m�nden etkinle_tirebilirsiniz. SMS, email veya Google Authenticator se�enekleri mevcuttur. Kurulum 2 dakika s�rer. Aktifle_tirdikten sonra her giri_te ikinci bir dorulama istenir.',
        },
        {
            category: 'G�venlik',
            q: 'e-Devlet _ifremi ADE ile payla_mam gerekir mi?',
            a: 'Hay1r! ADE, e-Devlet entegrasyonu i�in OAuth 2.0 protokol�n� kullan1r. e-Devlet\'e kendi _ifrenizle giri_ yapars1n1z, _ifreniz ADE\'ye verilmez. Sadece belirli i_lemler i�in yetki verirsiniz. Bu yetkiyi istediiniz zaman iptal edebilirsiniz.',
        },
        {
            category: 'Teknik',
            q: 'Mobil uygulama var m1?',
            a: 'Evet! iOS (App Store) ve Android (Google Play) uygulamalar1m1z mevcuttur. T�m �zellikler mobilde de kullan1labilir. Ek olarak PWA (Progressive Web App) destei sayesinde taray1c1n1zdan da mobil deneyim ya_ayabilirsiniz.',
        },
        {
            category: 'Teknik',
            q: 'API dok�mantasyonu nerede?',
            a: 'API dok�mantasyonuna developers.ade.gov.tr adresinden ula_abilirsiniz. REST API, GraphQL ve WebSocket se�enekleri mevcuttur. Sandbox ortam1nda test edebilir, Postman koleksiyonlar1n1 indirebilirsiniz. Entegrasyon �rnekleri (Python, Node.js, PHP, Java) mevcuttur.',
        },
        {
            category: 'Teknik',
            q: 'Toplu veri i�e aktar1m1 yapabilir miyim?',
            a: 'Evet! Excel, CSV ve JSON formatlar1nda toplu i�e aktar1m yapabilirsiniz. M�_teriler, �r�nler, faturalar, stok hareketleri ve daha fazlas1 i�in _ablonlar haz1rlad1k. Ayarlar � 0�e Aktarma b�l�m�nden _ablonlar1 indirebilir, verilerinizi doldurabilir ve y�kleyebilirsiniz. B�y�k dosyalar i�in (10.000+ kay1t) destek ekibimizle ileti_ime ge�in.',
        },
        {
            category: 'Teknik',
            q: 'Offline �al1_1yor mu?',
            a: 'Mobil uygulamalar s1n1rl1 offline destei sunar. Fatura g�r�nt�leme, m�_teri listesi ve raporlar offline �al1_1r. Yeni fatura kesme, G0B bildirimleri gibi i_lemler i�in internet balant1s1 gerekir. Web uygulamas1 offline �al1_maz.',
        },
    ];
    const filteredFaqs = faqs.filter((faq) => {
        const categoryMatch = selectedCategory === 'T�m�' || faq.category === selectedCategory;
        const searchMatch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "container-custom relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "S1k\uFFFDa Sorulan " }), _jsx("span", { className: "text-gradient-purple-pink", children: "Sorular" })] }), _jsx("p", { className: "text-xl text-white/70 mb-12", children: "ADE hakk1nda merak etti\u001Finiz her _ey" }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" }), _jsx("input", { type: "text", placeholder: "Sorunuzu yaz1n...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" })] }) })] }) })] }), _jsx("section", { className: "section-padding bg-gradient-to-b from-transparent to-white/5", children: _jsxs("div", { className: "container-custom", children: [_jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-16", children: categories.map((category, index) => (_jsx(motion.button, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.05 }, onClick: () => setSelectedCategory(category), className: `px-6 py-3 rounded-xl font-medium transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`, children: category }, index))) }), _jsx("div", { className: "max-w-4xl mx-auto space-y-4", children: filteredFaqs.map((faq, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.05 }, className: "glass-card-premium overflow-hidden", children: [_jsxs("button", { onClick: () => setOpenIndex(openIndex === index ? null : index), className: "w-full p-6 flex items-center justify-between text-left group", children: [_jsxs("div", { className: "flex-1 pr-4", children: [_jsx("span", { className: "inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold mb-3", children: faq.category }), _jsx("h3", { className: "text-xl font-bold text-white group-hover:text-purple-400 transition-colors", children: faq.q })] }), _jsx("div", { className: "flex-shrink-0", children: openIndex === index ? (_jsx(ChevronUpIcon, { className: "w-6 h-6 text-purple-400" })) : (_jsx(ChevronDownIcon, { className: "w-6 h-6 text-white/60" })) })] }), _jsx(motion.div, { initial: false, animate: {
                                            height: openIndex === index ? 'auto' : 0,
                                            opacity: openIndex === index ? 1 : 0,
                                        }, transition: { duration: 0.3 }, className: "overflow-hidden", children: _jsx("div", { className: "px-6 pb-6", children: _jsx("p", { className: "text-white/80 leading-relaxed", children: faq.a }) }) })] }, index))) }), filteredFaqs.length === 0 && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-16", children: _jsxs("p", { className: "text-white/60 text-lg", children: ["Arad1\u001F1n1z soruyu bulamad1k. L\uFFFDtfen farkl1 bir arama yap1n veya", ' ', _jsx(Link, { to: "/support", className: "text-purple-400 hover:underline", children: "destek ekibimizle ileti_ime ge\uFFFDin" }), "."] }) }))] }) }), _jsx("section", { className: "section-padding bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-4xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "Cevap Bulamad1n1z m1?" }) }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Destek ekibimiz size yard1mc1 olmaya haz1r" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/support", className: "btn-primary text-lg px-8", children: "Canl1 Destek" }), _jsx(Link, { to: "/help", className: "btn-secondary text-lg px-8", children: "Yard1m Merkezi" })] })] }) }) }), _jsx(Footer, {})] }));
}
