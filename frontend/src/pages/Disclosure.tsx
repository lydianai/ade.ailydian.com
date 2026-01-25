import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
      title: '2. Ki_isel Verilerin Hangi Amaçla 0_lenecei',
      content: `" Hizmet sunumu ve sözle_me yükümlülüklerinin yerine getirilmesi
" Yasal yükümlülüklerin yerine getirilmesi (G0B, SGK bildirimleri vb.)
" Mü_teri ili_kileri yönetimi ve mü_teri memnuniyetinin salanmas1
" Ürün ve hizmetlerin geli_tirilmesi, ki_iselle_tirilmesi
" Güvenlik, doland1r1c1l1k önleme ve risk yönetimi
" Pazarlama ve ileti_im faaliyetleri (aç1k r1zan1z dahilinde)
" 0statistiksel analiz ve raporlama`,
    },
    {
      title: '3. 0_lenen Ki_isel Veriler',
      content: `Kimlik Bilgileri: Ad, soyad, TC kimlik no, doum tarihi
0leti_im Bilgileri: Email, telefon, adres
Finansal Bilgiler: Banka hesap no, IBAN, vergi no, vergi dairesi
0_lem Bilgileri: Fatura, beyanname, ödeme kay1tlar1
Teknik Veriler: IP adresi, çerez bilgileri, cihaz bilgileri, kullan1m loglar1
Görsel/0_itsel: Profil fotoraf1, sesli görü_me kay1tlar1 (onayl1)`,
    },
    {
      title: '4. Ki_isel Verilerin Aktar1laca1 Taraflar',
      content: `Kamu Kurumlar1: G0B, SGK, MERSIS, e-Devlet, 0çi_leri Bakanl11
Hizmet Salay1c1lar: AWS (sunucu), Stripe (ödeme), Intercom (destek)
0_ Ortaklar1: Muhasebe yaz1l1mlar1, entegrasyon salay1c1lar1
Yurt D1_1 Aktar1m: Sadece yeterli koruma seviyesi olan ülkelere (AB, ABD)`,
    },
    {
      title: '5. Ki_isel Veri Toplaman1n Yöntemi ve Hukuki Sebebi',
      content: `Toplama Yöntemi: Web sitesi, mobil uygulama, email, telefon, API
Hukuki Sebepler:
" Sözle_menin kurulmas1 ve ifas1 (KVKK m.5/2-c)
" Yasal yükümlülüklerin yerine getirilmesi (KVKK m.5/2-ç)
" Me_ru menfaat (KVKK m.5/2-f)
" Aç1k r1za (KVKK m.5/1)`,
    },
    {
      title: '6. KVKK Kapsam1ndaki Haklar1n1z',
      content: `6698 say1l1 KVKK'n1n 11. maddesi uyar1nca haklar1n1z:
" Ki_isel verilerinizin i_lenip i_lenmediini örenme
" 0_lenmi_se bilgi talep etme
" 0_lenme amac1n1 ve amac1na uygun kullan1l1p kullan1lmad11n1 örenme
" Yurt içinde veya yurt d1_1nda aktar1ld11 üçüncü ki_ileri bilme
" Eksik veya yanl1_ i_lenmi_se düzeltilmesini isteme
" KVKK'da öngörülen _artlar çerçevesinde silinmesini veya yok edilmesini isteme
" Düzeltme, silme ve yok edilme i_lemlerinin aktar1ld11 üçüncü ki_ilere bildirilmesini isteme
" 0_lenen verilerin münhas1ran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonuç domas1 halinde itiraz etme
" Kanuna ayk1r1 i_leme nedeniyle zarara uraman1z halinde zarar1n giderilmesini talep etme`,
    },
  ]

  const rights = [
    {
      icon: UserIcon,
      title: 'Bilgi Alma Hakk1',
      desc: 'Verilerinizin i_lenip i_lenmediini örenme ve bilgi talep etme hakk1n1z vard1r.',
    },
    {
      icon: LockClosedIcon,
      title: 'Düzeltme Hakk1',
      desc: 'Yanl1_ veya eksik i_lenmi_ verilerinizin düzeltilmesini talep edebilirsiniz.',
    },
    {
      icon: EyeIcon,
      title: 'Eri_im Hakk1',
      desc: 'Ki_isel verilerinize eri_ebilir ve bunlar1n bir kopyas1n1 alabilirsiniz.',
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Silme Hakk1',
      desc: 'Yasal saklama süreleri d1_1nda verilerinizin silinmesini talep edebilirsiniz.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
              <DocumentTextIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">KVKK </span>
              <span className="text-gradient-blue-purple">Ayd1nlatma Metni</span>
            </h1>
            <p className="text-xl text-white/70 mb-4">
              6698 say1l1 Ki_isel Verilerin Korunmas1 Kanunu kapsam1nda bilgilendirme
            </p>
            <p className="text-sm text-white/50">
              Son güncelleme: 15 Ocak 2026
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12"
            >
              <div className="flex items-start gap-4 mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Giri_</h2>
                  <p className="text-white/80 leading-relaxed">
                    ADE Teknoloji A.^. olarak ki_isel verilerinizin korunmas1na önem veriyor ve 6698 say1l1
                    Ki_isel Verilerin Korunmas1 Kanunu ("KVKK") hükümlerine tam uyum sal1yoruz. Bu ayd1nlatma
                    metni, ki_isel verilerinizin nas1l topland11, i_lendii, korunduu ve haklar1n1z hakk1nda
                    sizi bilgilendirmek amac1yla haz1rlanm1_t1r.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card-premium p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{section.title}</h3>
                <div className="text-white/80 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-white">Haklar1n1z</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {rights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <right.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{right.title}</h3>
                  <p className="text-white/70">{right.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ba_vuru Yöntemi</h2>
            <div className="space-y-4 text-white/80 leading-relaxed mb-8">
              <p>
                KVKK kapsam1ndaki haklar1n1z1 kullanmak için a_a1daki yöntemlerle ba_vurabilirsiniz:
              </p>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="space-y-3">
                  <div>
                    <span className="text-amber-400 font-semibold">Email:</span>
                    <span className="ml-2">kvkk@ade.gov.tr</span>
                  </div>
                  <div>
                    <span className="text-teal-400 font-semibold">Posta:</span>
                    <span className="ml-2">Maslak Mah., Teknoloji Cd. No:12, 34398 Sar1yer/0stanbul</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">Yan1t Süresi:</span>
                    <span className="ml-2">En geç 30 gün içinde</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/60">
                Ba_vurunuzda kimliinizi tespit edici belgeler (TC kimlik fotokopisi, imza sirküleri vb.)
                eklemeniz gerekmektedir. Ba_vurular1n1z ücretsizdir, ancak i_lemin maliyet gerektirmesi
                halinde Kurul taraf1ndan belirlenen tarifedeki ücret al1nabilir.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Daha Fazla Bilgi</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Ki_isel veri i_leme politikalar1m1z hakk1nda detayl1 bilgi almak için
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/privacy" className="btn-primary">
                KVKK Politikas1
              </Link>
              <Link to="/contact" className="btn-secondary">
                0leti_ime Geç
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
