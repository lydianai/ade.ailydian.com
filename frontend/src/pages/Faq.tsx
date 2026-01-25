import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'Tümü',
    'Ba_lang1ç',
    'Özellikler',
    'Faturalama',
    'Güvenlik',
    'Teknik',
  ]

  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const faqs = [
    {
      category: 'Ba_lang1ç',
      q: 'ADE nedir ve nas1l çal1_1r?',
      a: 'ADE (Ak1ll1 Devlet Ekosistemi), Türkiye\'nin ilk yapay zeka destekli devlet asistan1d1r. e-Devlet, G0B, SGK gibi 18 bakanl1k ve kurumla entegre çal1_arak, tüm resmi i_lemlerinizi tek platformdan yapman1z1 salar. GeliÅŸmiÅŸ yapay zeka teknolojisi AI modeli sayesinde doal dilde komut verebilir, fatura kesebilir, beyanname haz1rlayabilir ve tüm muhasebe i_lemlerinizi otomatik hale getirebilirsiniz.',
    },
    {
      category: 'Ba_lang1ç',
      q: 'ADE\'ye nas1l üye olurum?',
      a: 'ADE\'ye üye olmak çok basit: 1) ade.gov.tr adresinden "Ücretsiz Ba_la" butonuna t1klay1n. 2) Email ve telefon numaran1z1 girin. 3) Gelen dorulama kodunu onaylay1n. 4) e-Devlet _ifrenizle hesab1n1z1 balay1n. Tüm i_lem 2-3 dakika sürer. Kurulum s1ras1nda video rehber e_lik eder.',
    },
    {
      category: 'Ba_lang1ç',
      q: 'Ücretsiz plan ile neler yapabilirim?',
      a: 'Ücretsiz plan ile: Ayl1k 50 fatura kesebilir, temel muhasebe takibi yapabilir, e-Devlet i_lemlerinizi gerçekle_tirebilir, SGK sorgulamalar1 yapabilirsiniz. Canl1 destek ve AI asistan ücretsiz planda 7/24 kullan1labilir. Kredi kart1 bilgisi gerekmez.',
    },
    {
      category: 'Özellikler',
      q: 'e-Fatura nas1l kesilir?',
      a: 'e-Fatura kesmek için: 1) "Faturalar" bölümüne gidin. 2) "Yeni Fatura" butonuna t1klay1n. 3) Mü_teri bilgilerini seçin veya yeni ekleyin. 4) Ürün/hizmet bilgilerini girin. 5) "Gönder" butonuna t1klay1n. Fatura otomatik olarak G0B\'e iletilir ve mü_teriye e-posta/SMS gönderilir. Toplu fatura kesmek için Excel\'den içe aktar1m yapabilirsiniz.',
    },
    {
      category: 'Özellikler',
      q: 'SGK bildirimleri nas1l yap1l1r?',
      a: 'SGK bildirimleri tamamen otomatiktir. Sistem her ay otomatik olarak çal1_anlar1n1z1n prim bildirimlerini haz1rlar ve SGK\'ya gönderir. Manuel müdahale gerekmez. Yeni i_e giri_, i_ten ç1k1_ ve bordro dei_iklikleri için ilgili bölümlerden bilgi girdiinizde sistem otomatik olarak 4A, 4C formlar1n1 olu_turur ve gönderir.',
    },
    {
      category: 'Özellikler',
      q: 'Hangi entegrasyonlar mevcut?',
      a: 'ADE _u kurumlarla entegredir: e-Devlet, G0B (e-Fatura, e-Ar_iv, e-0rsaliye), SGK, MERSIS, MERN0S, MHRS, 0çi_leri Bakanl11, Tapu Kadastro, Noterler Birlii, 0lbank, tüm kamu bankalar1, Trendyol, Hepsiburada, N11, Aç1k Bankac1l1k, Logo, Mikro, Netsis, Eta, Orka. API ile kendi yaz1l1m1n1z1 da balayabilirsiniz.',
    },
    {
      category: 'Özellikler',
      q: 'Çoklu _ube yönetimi nas1l çal1_1r?',
      a: 'KOB0 ve Enterprise paketlerde çoklu _ube yönetimi vard1r. Her _ube için ayr1 stok, kasa, personel ve raporlama yapabilirsiniz. Merkezi panelden tüm _ubelerinizin canl1 verilerini görebilir, _ubeler aras1 transfer yapabilir, konsolide raporlar alabilirsiniz. Her _ube için farkl1 kullan1c1 yetkileri tan1mlayabilirsiniz.',
    },
    {
      category: 'Faturalama',
      q: 'Fiyatland1rma nas1l çal1_1r?',
      a: 'ADE dört ana plana sahiptir: Ücretsiz (0 TL, bireysel kullan1m), Esnaf (199 TL/ay, tek i_letme), KOB0 Pro (799 TL/ay, çoklu _ube), Enterprise (özel fiyat, kurumsal çözümler). Tüm planlar ayl1k veya y1ll1k ödenebilir. Y1ll1k ödemede %20 indirim uygulan1r. Fatura adedi, kullan1c1 say1s1 ve özellikler planlara göre dei_ir.',
    },
    {
      category: 'Faturalama',
      q: 'Plan1m1 nas1l yükseltebilirim?',
      a: 'Plan yükseltmek için: 1) Ayarlar ’ Abonelik bölümüne gidin. 2) Yeni plan1 seçin. 3) Ödeme bilgilerinizi girin (varsa güncellenmez). 4) "Yükselt" butonuna t1klay1n. Plan dei_iklii an1nda gerçekle_ir, kalan süreniz yeni plana yans1t1l1r. Dü_ürme talepleri dönem sonunda geçerli olur.',
    },
    {
      category: 'Faturalama',
      q: '0ptal etmek istersem ne olur?',
      a: '0stediiniz zaman iptal edebilirsiniz. Ayarlar ’ Abonelik ’ 0ptal Et. Ödediiniz dönemin sonuna kadar tüm özellikleri kullanmaya devam edersiniz. 0ptal sonras1 verileriniz 90 gün saklan1r, istediinizde yedekleme alabilirsiniz. Geri dönü_ yapmak isterseniz ayn1 verilerle devam edebilirsiniz. 0ade politikas1: 0lk 14 gün içinde %100 iade.',
    },
    {
      category: 'Faturalama',
      q: 'Hangi ödeme yöntemleri kabul ediliyor?',
      a: 'Kredi kart1 (Visa, Mastercard, Troy), banka kart1 (debit), Aç1k Bankac1l1k (tüm bankalar), havale/EFT. Kurumsal mü_teriler için fatura kar_1l11 ödeme seçenei mevcuttur. Otomatik tahsilat için kredi kart1 veya Aç1k Bankac1l1k balayabilirsiniz.',
    },
    {
      category: 'Güvenlik',
      q: 'Verilerim güvende mi?',
      a: 'Verileriniz banka standartlar1nda korunur: 256-bit AES _ifreleme (iletim ve depolama), ISO 27001 ve SOC 2 Type II sertifikal1 veri merkezleri, çoklu corafi yedekleme, 7/24 güvenlik izleme. Hassas bilgileriniz (banka hesap no, _ifreler) s1f1r-bilgi mimarisi ile _ifrelenir, ADE çal1_anlar1 bile göremez. KVKK ve GDPR uyumlu.',
    },
    {
      category: 'Güvenlik',
      q: '0ki faktörlü kimlik dorulama nas1l etkinle_tirilir?',
      a: 'Ayarlar ’ Güvenlik ’ 0ki Faktörlü Kimlik Dorulama bölümünden etkinle_tirebilirsiniz. SMS, email veya Google Authenticator seçenekleri mevcuttur. Kurulum 2 dakika sürer. Aktifle_tirdikten sonra her giri_te ikinci bir dorulama istenir.',
    },
    {
      category: 'Güvenlik',
      q: 'e-Devlet _ifremi ADE ile payla_mam gerekir mi?',
      a: 'Hay1r! ADE, e-Devlet entegrasyonu için OAuth 2.0 protokolünü kullan1r. e-Devlet\'e kendi _ifrenizle giri_ yapars1n1z, _ifreniz ADE\'ye verilmez. Sadece belirli i_lemler için yetki verirsiniz. Bu yetkiyi istediiniz zaman iptal edebilirsiniz.',
    },
    {
      category: 'Teknik',
      q: 'Mobil uygulama var m1?',
      a: 'Evet! iOS (App Store) ve Android (Google Play) uygulamalar1m1z mevcuttur. Tüm özellikler mobilde de kullan1labilir. Ek olarak PWA (Progressive Web App) destei sayesinde taray1c1n1zdan da mobil deneyim ya_ayabilirsiniz.',
    },
    {
      category: 'Teknik',
      q: 'API dokümantasyonu nerede?',
      a: 'API dokümantasyonuna developers.ade.gov.tr adresinden ula_abilirsiniz. REST API, GraphQL ve WebSocket seçenekleri mevcuttur. Sandbox ortam1nda test edebilir, Postman koleksiyonlar1n1 indirebilirsiniz. Entegrasyon örnekleri (Python, Node.js, PHP, Java) mevcuttur.',
    },
    {
      category: 'Teknik',
      q: 'Toplu veri içe aktar1m1 yapabilir miyim?',
      a: 'Evet! Excel, CSV ve JSON formatlar1nda toplu içe aktar1m yapabilirsiniz. Mü_teriler, ürünler, faturalar, stok hareketleri ve daha fazlas1 için _ablonlar haz1rlad1k. Ayarlar ’ 0çe Aktarma bölümünden _ablonlar1 indirebilir, verilerinizi doldurabilir ve yükleyebilirsiniz. Büyük dosyalar için (10.000+ kay1t) destek ekibimizle ileti_ime geçin.',
    },
    {
      category: 'Teknik',
      q: 'Offline çal1_1yor mu?',
      a: 'Mobil uygulamalar s1n1rl1 offline destei sunar. Fatura görüntüleme, mü_teri listesi ve raporlar offline çal1_1r. Yeni fatura kesme, G0B bildirimleri gibi i_lemler için internet balant1s1 gerekir. Web uygulamas1 offline çal1_maz.',
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const categoryMatch = selectedCategory === 'Tümü' || faq.category === selectedCategory
    const searchMatch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">S1kça Sorulan </span>
              <span className="text-gradient-purple-pink">Sorular</span>
            </h1>
            <p className="text-xl text-white/70 mb-12">
              ADE hakk1nda merak ettiiniz her _ey
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
                <input
                  type="text"
                  placeholder="Sorunuzu yaz1n..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card-premium overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
                      {faq.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {faq.q}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUpIcon className="w-6 h-6 text-purple-400" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6 text-white/60" />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-white/80 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-white/60 text-lg">
                Arad11n1z soruyu bulamad1k. Lütfen farkl1 bir arama yap1n veya{' '}
                <Link to="/support" className="text-purple-400 hover:underline">
                  destek ekibimizle ileti_ime geçin
                </Link>
                .
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Cevap Bulamad1n1z m1?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Destek ekibimiz size yard1mc1 olmaya haz1r
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support" className="btn-primary text-lg px-8">
                Canl1 Destek
              </Link>
              <Link to="/help" className="btn-secondary text-lg px-8">
                Yard1m Merkezi
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
