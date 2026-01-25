import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, ShieldCheckIcon, UserIcon, LockClosedIcon, EyeIcon, ClipboardDocumentCheckIcon, } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Disclosure() {
    const sections = [
        {
            title: '1. Veri Sorumlusu Kimlii',
            content: `ADE Teknoloji A.^. ("Veri Sorumlusu")
Adres: Maslak Mahallesi, Teknoloji Cd. No:12, 34398 Sar1yer/0stanbul
MERS0S No: 0123456789012345
Telefon: 0850 390 80 80
Email: kvkk@ade.gov.tr`,
        },
        {
            title: '2. Ki_isel Verilerin Hangi Ama�la 0_lenecei',
            content: `" Hizmet sunumu ve s�zle_me y�k�ml�l�klerinin yerine getirilmesi
" Yasal y�k�ml�l�klerin yerine getirilmesi (G0B, SGK bildirimleri vb.)
" M�_teri ili_kileri y�netimi ve m�_teri memnuniyetinin salanmas1
" �r�n ve hizmetlerin geli_tirilmesi, ki_iselle_tirilmesi
" G�venlik, doland1r1c1l1k �nleme ve risk y�netimi
" Pazarlama ve ileti_im faaliyetleri (a�1k r1zan1z dahilinde)
" 0statistiksel analiz ve raporlama`,
        },
        {
            title: '3. 0_lenen Ki_isel Veriler',
            content: `Kimlik Bilgileri: Ad, soyad, TC kimlik no, doum tarihi
0leti_im Bilgileri: Email, telefon, adres
Finansal Bilgiler: Banka hesap no, IBAN, vergi no, vergi dairesi
0_lem Bilgileri: Fatura, beyanname, �deme kay1tlar1
Teknik Veriler: IP adresi, �erez bilgileri, cihaz bilgileri, kullan1m loglar1
G�rsel/0_itsel: Profil fotoraf1, sesli g�r�_me kay1tlar1 (onayl1)`,
        },
        {
            title: '4. Ki_isel Verilerin Aktar1laca1 Taraflar',
            content: `Kamu Kurumlar1: G0B, SGK, MERSIS, e-Devlet, 0�i_leri Bakanl11
Hizmet Salay1c1lar: AWS (sunucu), Stripe (�deme), Intercom (destek)
0_ Ortaklar1: Muhasebe yaz1l1mlar1, entegrasyon salay1c1lar1
Yurt D1_1 Aktar1m: Sadece yeterli koruma seviyesi olan �lkelere (AB, ABD)`,
        },
        {
            title: '5. Ki_isel Veri Toplaman1n Y�ntemi ve Hukuki Sebebi',
            content: `Toplama Y�ntemi: Web sitesi, mobil uygulama, email, telefon, API
Hukuki Sebepler:
" S�zle_menin kurulmas1 ve ifas1 (KVKK m.5/2-c)
" Yasal y�k�ml�l�klerin yerine getirilmesi (KVKK m.5/2-�)
" Me_ru menfaat (KVKK m.5/2-f)
" A�1k r1za (KVKK m.5/1)`,
        },
        {
            title: '6. KVKK Kapsam1ndaki Haklar1n1z',
            content: `6698 say1l1 KVKK'n1n 11. maddesi uyar1nca haklar1n1z:
" Ki_isel verilerinizin i_lenip i_lenmediini �renme
" 0_lenmi_se bilgi talep etme
" 0_lenme amac1n1 ve amac1na uygun kullan1l1p kullan1lmad11n1 �renme
" Yurt i�inde veya yurt d1_1nda aktar1ld11 ���nc� ki_ileri bilme
" Eksik veya yanl1_ i_lenmi_se d�zeltilmesini isteme
" KVKK'da �ng�r�len _artlar �er�evesinde silinmesini veya yok edilmesini isteme
" D�zeltme, silme ve yok edilme i_lemlerinin aktar1ld11 ���nc� ki_ilere bildirilmesini isteme
" 0_lenen verilerin m�nhas1ran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonu� domas1 halinde itiraz etme
" Kanuna ayk1r1 i_leme nedeniyle zarara uraman1z halinde zarar1n giderilmesini talep etme`,
        },
    ];
    const rights = [
        {
            icon: UserIcon,
            title: 'Bilgi Alma Hakk1',
            desc: 'Verilerinizin i_lenip i_lenmediini �renme ve bilgi talep etme hakk1n1z vard1r.',
        },
        {
            icon: LockClosedIcon,
            title: 'D�zeltme Hakk1',
            desc: 'Yanl1_ veya eksik i_lenmi_ verilerinizin d�zeltilmesini talep edebilirsiniz.',
        },
        {
            icon: EyeIcon,
            title: 'Eri_im Hakk1',
            desc: 'Ki_isel verilerinize eri_ebilir ve bunlar1n bir kopyas1n1 alabilirsiniz.',
        },
        {
            icon: ClipboardDocumentCheckIcon,
            title: 'Silme Hakk1',
            desc: 'Yasal saklama s�releri d1_1nda verilerinizin silinmesini talep edebilirsiniz.',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("section", { className: "pt-32 pb-20 section-padding relative overflow-hidden", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" }), _jsxs("div", { className: "container-custom relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-4xl mx-auto mb-16", children: [_jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6", children: _jsx(DocumentTextIcon, { className: "w-10 h-10 text-white" }) }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-8", children: [_jsx("span", { className: "text-white", children: "KVKK " }), _jsx("span", { className: "text-gradient-blue-purple", children: "Ayd1nlatma Metni" })] }), _jsx("p", { className: "text-xl text-white/70 mb-4", children: "6698 say1l1 Ki_isel Verilerin Korunmas1 Kanunu kapsam1nda bilgilendirme" }), _jsx("p", { className: "text-sm text-white/50", children: "Son g\uFFFDncelleme: 15 Ocak 2026" })] }), _jsx("div", { className: "max-w-4xl mx-auto mb-16", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12", children: _jsxs("div", { className: "flex items-start gap-4 mb-6", children: [_jsx(ShieldCheckIcon, { className: "w-8 h-8 text-blue-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Giri_" }), _jsx("p", { className: "text-white/80 leading-relaxed", children: "ADE Teknoloji A.^. olarak ki_isel verilerinizin korunmas1na \uFFFDnem veriyor ve 6698 say1l1 Ki_isel Verilerin Korunmas1 Kanunu (\"KVKK\") h\uFFFDk\uFFFDmlerine tam uyum sa\u001Fl1yoruz. Bu ayd1nlatma metni, ki_isel verilerinizin nas1l topland1\u001F1, i_lendi\u001Fi, korundu\u001Fu ve haklar1n1z hakk1nda sizi bilgilendirmek amac1yla haz1rlanm1_t1r." })] })] }) }) }), _jsx("div", { className: "max-w-4xl mx-auto space-y-6 mb-16", children: sections.map((section, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.05 }, className: "glass-card-premium p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: section.title }), _jsx("div", { className: "text-white/80 leading-relaxed whitespace-pre-line", children: section.content })] }, index))) }), _jsxs("div", { className: "max-w-4xl mx-auto mb-16", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-12", children: _jsx("h2", { className: "text-4xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "Haklar1n1z" }) }) }), _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: rights.map((right, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-card p-6", children: [_jsx(right.icon, { className: "w-12 h-12 text-purple-400 mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: right.title }), _jsx("p", { className: "text-white/70", children: right.desc })] }, index))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "glass-card-premium p-12 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Ba_vuru Y\uFFFDntemi" }), _jsxs("div", { className: "space-y-4 text-white/80 leading-relaxed mb-8", children: [_jsx("p", { children: "KVKK kapsam1ndaki haklar1n1z1 kullanmak i\uFFFDin a_a\u001F1daki y\uFFFDntemlerle ba_vurabilirsiniz:" }), _jsx("div", { className: "bg-white/5 rounded-xl p-6 border border-white/10", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("span", { className: "text-amber-400 font-semibold", children: "Email:" }), _jsx("span", { className: "ml-2", children: "kvkk@ade.gov.tr" })] }), _jsxs("div", { children: [_jsx("span", { className: "text-teal-400 font-semibold", children: "Posta:" }), _jsx("span", { className: "ml-2", children: "Maslak Mah., Teknoloji Cd. No:12, 34398 Sar1yer/0stanbul" })] }), _jsxs("div", { children: [_jsx("span", { className: "text-purple-400 font-semibold", children: "Yan1t S\uFFFDresi:" }), _jsx("span", { className: "ml-2", children: "En ge\uFFFD 30 g\uFFFDn i\uFFFDinde" })] })] }) }), _jsx("p", { className: "text-sm text-white/60", children: "Ba_vurunuzda kimli\u001Finizi tespit edici belgeler (TC kimlik fotokopisi, imza sirk\uFFFDleri vb.) eklemeniz gerekmektedir. Ba_vurular1n1z \uFFFDcretsizdir, ancak i_lemin maliyet gerektirmesi halinde Kurul taraf1ndan belirlenen tarifedeki \uFFFDcret al1nabilir." })] })] })] })] }), _jsx("section", { className: "section-padding bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent", children: _jsx("div", { className: "container-custom", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, className: "glass-card-premium p-12 text-center max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-4xl font-bold mb-6", children: _jsx("span", { className: "text-white", children: "Daha Fazla Bilgi" }) }), _jsx("p", { className: "text-xl text-white/70 mb-8", children: "Ki_isel veri i_leme politikalar1m1z hakk1nda detayl1 bilgi almak i\uFFFDin" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/privacy", className: "btn-primary", children: "KVKK Politikas1" }), _jsx(Link, { to: "/contact", className: "btn-secondary", children: "0leti_ime Ge\uFFFD" })] })] }) }) }), _jsx(Footer, {})] }));
}
