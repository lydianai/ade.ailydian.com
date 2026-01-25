import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckIcon,
  BuildingOffice2Icon,
  CloudArrowUpIcon,
  CpuChipIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AnaSayfa() {
  const [devText, setDevText] = useState('')
  const fullDevText = 'GELİŞTİRME AŞAMASINDA'

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullDevText.length) {
        setDevText(fullDevText.substring(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setDevText('')
          index = 0
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [devText])
  const features = [
    {
      icon: CpuChipIcon,
      title: 'Yapay Zeka Destekli',
      description: 'Son nesil yapay zeka teknolojisi ile güçlendirilmiş asistanınız. Türk hukuku ve mevzuatı üzerine özel eğitilmiş, proaktif öneriler sunar.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: ShoppingBagIcon,
      title: 'E-Ticaret Entegrasyonu',
      description: 'Hepsiburada, Trendyol, N11, Amazon TR. Tüm satış kanallarınızı tek yerden yönetin, AI önerileri ile satışları artırın.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Hukuken Geçerli İşlemler',
      description: 'e-İmza entegrasyonu ile kestiğiniz faturalar ve yaptığınız beyannameler hukuken geçerlidir.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: BoltIcon,
      title: 'Proaktif Bildirimler',
      description: 'Vergilerinizi, SGK primlerinizi unutmayın. ADE size hatırlatır ve onayınızla otomatik öder.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BuildingOffice2Icon,
      title: '18 Bakanlık Entegrasyonu',
      description: 'e-Devlet, GİB, SGK, MERSIS, UYAP ve daha fazlası. Tek platformdan tüm devlet işlemleri.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: DocumentTextIcon,
      title: 'Otomatik Muhasebe',
      description: 'e-Fatura, e-İrsaliye, yevmiye defteri otomatik oluşturulur. 10 yıl arşivleme dahil.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: ChartBarIcon,
      title: 'Tahminleme & Analiz',
      description: 'AI ile satış tahmini, stok optimizasyonu, nakit akışı analizi. Geleceği görün.',
      gradient: 'from-rose-500 to-red-500',
    },
  ]

  const integrations = [
    { name: 'Hepsiburada', logo: '🛍️', desc: 'E-Ticaret Yönetimi' },
    { name: 'Trendyol', logo: '🛒', desc: 'Sipariş & Satış' },
    { name: 'e-Devlet', logo: '🏛️', desc: '8.000+ hizmet' },
    { name: 'GİB', logo: '💼', desc: 'e-Fatura, e-Arşiv' },
    { name: 'SGK', logo: '🏥', desc: 'Sigorta, Prim' },
    { name: 'MERSIS', logo: '🏢', desc: 'Şirket Kuruluşu' },
    { name: 'UYAP', logo: '⚖️', desc: 'Dava Takibi' },
    { name: 'MHRS', logo: '🩺', desc: 'Sağlık Randevusu' },
    { name: 'e-İmza', logo: '✍️', desc: 'Dijital İmza' },
    { name: 'Açık Bankacılık', logo: '🏦', desc: 'Finansal Veri' },
    { name: 'N11', logo: '🏪', desc: 'Çoklu Platform' },
    { name: 'Amazon TR', logo: '📦', desc: 'FBA Yönetimi' },
  ]

  const useCases = [
    {
      type: 'E-Ticaret',
      icon: '🛍️',
      title: 'Ayşe - Ev Tekstili Satıcısı',
      problem: 'Hepsiburada, Trendyol, N11\'de 487 sipariş biriken, hangi ürün karlı bilmiyor, stok karmaşası',
      solution: 'AI: "Ayşe Hanım, bugün 127 yeni sipariş 🔥 Havlu setinizin fiyatını ₺89\'dan ₺79\'a düşürürseniz satışlar %42 artar. Trendyol\'da 3 adet kaldı, N11\'den 8 adet sipariş geldi. Hepsini tek tıkla kargoya hazırlıyorum, e-Faturalar oluşturuldu."',
      result: '✅ Tüm platformlar tek yerden, ✅ AI fiyat optimizasyonu, ✅ Otomatik stok senkronizasyonu, ✅ E-Fatura entegrasyonu',
    },
    {
      type: 'Esnaf',
      icon: '🏪',
      title: 'Bakkal Ahmet Amca',
      problem: 'e-Fatura sistemi çok karmaşık, SGK primini geç öder',
      solution: '"ADE, bugün ne satış yaptım?" → AI: "47 satış, 2.340 TL. Yarın KDV beyannamen var, vergini hesapladım: 1.850 TL. İstersen ödüyorum?"',
      result: '✅ Tüm satışlar otomatik e-Fatura, ✅ Vergi zamanında ödeniyor',
    },
    {
      type: 'KOBİ',
      icon: '☕',
      title: 'Kafe Sahibi Elif',
      problem: '3 şubesi var, hangi şube karlı bilmiyor',
      solution: 'AI sabah raporu: "Kadıköy: 8.450 TL ✅, Beşiktaş: 5.230 TL ⚠️ (%15 düşük), Beyoğlu: 11.900 TL 🔥 (rekor!)"',
      result: '✅ Şube bazlı kar/zarar, ✅ Stok uyarıları, ✅ AI önerileri',
    },
    {
      type: 'Vatandaş',
      icon: '👵',
      title: 'Emekli Fatma Teyze',
      problem: 'Elektrik faturasını geç ödüyor, hastane randevusu alamıyor',
      solution: 'AI sesli: "Fatma Teyze, elektrik faturanız 385 TL, son ödeme bugün. İstersen ödüyorum? Yarın kardiyoloji randevunuz var."',
      result: '✅ Tüm faturalar zamanında, ✅ Reçete takibi, ✅ Sesli asistan',
    },
  ]

  const pricingPlans = [
    {
      name: 'Ücretsiz',
      price: '0',
      period: 'süresiz',
      description: 'Bireysel kullanım ve küçük esnaflar için',
      features: [
        '10 fatura/ay',
        'Temel muhasebe',
        'e-Devlet entegrasyonu',
        'Vergi takibi',
        'Email destek',
      ],
      cta: 'Hemen Başla',
      popular: false,
    },
    {
      name: 'Pro',
      price: '299',
      period: 'aylık',
      description: 'Büyüyen işletmeler için tam özellikli paket',
      features: [
        'Sınırsız fatura',
        'Tam muhasebe (defter, mizan)',
        'Stok yönetimi',
        'AI tahminleme',
        '18 bakanlık entegrasyonu',
        'Marketplace (Trendyol, Hepsiburada)',
        'Öncelikli destek',
        'API erişimi',
      ],
      cta: '14 Gün Ücretsiz Dene',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '2.499',
      period: 'aylık',
      description: 'Kurumsal çözümler ve özel ihtiyaçlar',
      features: [
        'Pro\'daki her şey',
        'Çoklu kullanıcı yönetimi',
        'Özel API limitleri',
        'White-label çözüm',
        '99.95% SLA garantisi',
        'Özel eğitim',
        '7/24 canlı destek',
        'Hesap yöneticisi',
      ],
      cta: 'İletişime Geç',
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: 'Mehmet Yılmaz',
      role: 'Bakkal Sahibi, İstanbul',
      avatar: '👨‍💼',
      text: 'ADE olmadan önce muhasebeciye ayda 3.000 TL veriyordum. Şimdi sadece 299 TL. Hem daha hızlı, hem daha kolay. AI asistanım her şeyi anlatıyor.',
      rating: 5,
    },
    {
      name: 'Ayşe Demir',
      role: 'Kuaför, Ankara',
      text: 'Instagram\'dan gelen randevuları ADE otomatik alıyor. Müşteri geldi mi hatırlatma yapıyor. Fiyatları bile güncelliyor. İnanılmaz!',
      avatar: '👩‍💼',
      rating: 5,
    },
    {
      name: 'Can Öztürk',
      role: 'E-ticaret Girişimci, İzmir',
      text: 'Trendyol\'dan sipariş geldi mi, ADE otomatik fatura kesiyor, stoktan düşüyor, kargo etiketi hazırlıyor. 1 saatlik işi 10 saniyede yapıyor.',
      avatar: '👨‍💻',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        {/* Animated Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

        <div className="container-custom relative z-10">
          {/* DEVELOPMENT BANNER - EN ÜST SIRADA */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-orange-600 border-4 border-orange-400 shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
              />
              <span className="text-white font-black text-2xl md:text-4xl tracking-widest uppercase">
                {devText || 'GELİŞTİRME AŞAMASINDA'}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 mb-4"
            >
              <SparklesIcon className="w-5 h-5 text-amber-400" />
              <span className="text-white/90 font-medium">Türkiye'nin İlk Yapay Zeka Devlet Asistanı</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="text-white">Her Vatandaşın</span>
              <br />
              <span className="text-white">Cebinde</span>
              <br />
              <span className="text-gradient-amber-teal">Devlet Danışmanı</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              18 bakanlık ve kurumla entegre, yapay zeka destekli, hukuken geçerli işlemler yapabilen
              tek platform. Vergilerinizi, SGK primlerinizi, faturalarınızı otomatik yönetin.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {[
                { value: '18', label: 'Bakanlık Entegrasyonu' },
                { value: '7/24', label: 'Kesintisiz Hizmet' },
                { value: '%80', label: 'Zaman Tasarrufu' },
                { value: '99.95%', label: 'Uptime Garantisi' },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Neden </span>
              <span className="text-gradient-amber-teal">ADE?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Dünyada ilk ve tek: Proaktif devlet asistanı. Sadece bilgi vermez, sizin adınıza işlem yapar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Nasıl </span>
              <span className="text-gradient-purple-pink">Çalışır?</span>
            </h2>
            <p className="text-xl text-white/70">3 basit adımda başlayın</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Kayıt Ol',
                description: 'e-Devlet ile giriş yap veya email ile kaydol. 2 dakika sürer.',
                icon: UserGroupIcon,
              },
              {
                step: '2',
                title: 'Entegrasyonları Bağla',
                description: 'GİB, SGK, e-Devlet hesaplarını bağla. e-İmza ile onaylarsın, hepsi hazır.',
                icon: CloudArrowUpIcon,
              },
              {
                step: '3',
                title: 'AI Yönetsin',
                description: 'Artık rahat ol. ADE vergilerini öder, fatura keser, sana sadece haber verir.',
                icon: CpuChipIcon,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent" />
                )}
                <div className="glass-card p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                    {item.step}
                  </div>
                  <item.icon className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Assistant Section */}
      <section className="section-padding bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-transparent relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 font-medium text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400"></span>
              </span>
              Gelişmiş Yapay Zeka Altyapısı ile Güçlendirildi
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Sesli </span>
              <span className="text-gradient-amber-teal">ADE Asistan</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Türkçe konuşan, sizi tanıyan, 7/24 yanınızda olan yapay zeka asistanı.
              Tüm devlet işlemlerinizi sesli komutla yapın.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <div className="glass-card-premium overflow-hidden">
                {/* Phone Header */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    >
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-lg text-white">ADE Sesli Asistan</h4>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        <span>Çevrimiçi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversation */}
                <div className="p-6 space-y-6 min-h-[400px] bg-gradient-to-b from-slate-900/50 to-slate-800/50">
                  {/* User Message */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[80%]">
                      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl rounded-tr-sm p-4 shadow-xl">
                        <p className="text-white font-medium">ADE, Ahmet Yılmaz'a 10.000 TL fatura kes</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-2 text-xs text-white/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        Sesli Komut
                      </div>
                    </div>
                  </motion.div>

                  {/* Typing Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-orange-400 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/50">ADE düşünüyor...</span>
                  </motion.div>

                  {/* Assistant Response */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%]">
                      <div className="glass-card rounded-2xl rounded-tl-sm p-4 shadow-xl border border-orange-500/20">
                        <p className="text-white/90 leading-relaxed">
                          Tabii, Ahmet Yılmaz için 10.000 TL tutarında fatura hazırladım.
                          KDV %20 olarak 2.000 TL hesaplandı. Toplam <span className="font-bold text-orange-400">12.000 TL</span>.
                          GİB'e göndermemi ister misiniz?
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-white/50">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Yanıt süresi: 2.3 saniye
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Bar */}
                <div className="p-6 bg-slate-900/80 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-2xl transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Sesli Asistanı Dene
                  </motion.button>
                </div>
              </div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6 glass-card p-6"
              >
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <CpuChipIcon className="w-5 h-5 text-orange-400" />
                  Teknoloji Altyapısı
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-white/50 mb-1">Ses Tanıma</p>
                    <p className="font-semibold text-sm text-white">Kurumsal STT Motoru</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-white/50 mb-1">Yapay Zeka Çekirdeği</p>
                    <p className="font-semibold text-sm text-white">ADE Neural Engine</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-white/50 mb-1">Kişiselleştirme</p>
                    <p className="font-semibold text-sm text-white">ADE Persona AI</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-white/50 mb-1">Ses Sentezi</p>
                    <p className="font-semibold text-sm text-white">Kurumsal TTS Motoru</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Scenarios */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Örnek Senaryolar</h3>

              {[
                {
                  icon: DocumentTextIcon,
                  title: 'e-Fatura Kesimi',
                  desc: 'Sesli komutla saniyeler içinde fatura kesin, otomatik GİB gönderimi',
                  time: '2.3 saniye',
                  color: 'from-orange-500 to-amber-500',
                },
                {
                  icon: ChartBarIcon,
                  title: 'Vergi Hesaplama',
                  desc: '"Bu ay ne kadar vergi ödeyeceğim?" sorusuna anında detaylı yanıt',
                  time: '1.8 saniye',
                  color: 'from-amber-500 to-yellow-500',
                },
                {
                  icon: UserGroupIcon,
                  title: 'SGK İşlemleri',
                  desc: 'Yeni çalışan girişi, çıkışı ve prim bildirimi sesli komutla',
                  time: '2.1 saniye',
                  color: 'from-teal-500 to-cyan-500',
                },
                {
                  icon: BoltIcon,
                  title: 'Proaktif Uyarılar',
                  desc: 'Son ödeme tarihleri, eksik beyannameler için otomatik hatırlatma',
                  time: 'Otomatik',
                  color: 'from-purple-500 to-pink-500',
                },
              ].map((scenario, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass-card p-6 border-l-4 border-orange-500 hover:border-amber-400 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center flex-shrink-0`}>
                      <scenario.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-white mb-1">{scenario.title}</h4>
                      <p className="text-sm text-white/60 mb-3">{scenario.desc}</p>
                      <div className="inline-flex px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">
                        ⚡ {scenario.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Gerçek </span>
              <span className="text-gradient-amber-teal">Kullanıcı Hikayeleri</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative ${
                  index === 0
                    ? 'glass-card-premium p-8 md:p-12 border-2 border-orange-500/40 shadow-2xl shadow-orange-500/20 bg-gradient-to-br from-orange-500/10 to-pink-500/10'
                    : 'glass-card-premium p-8 md:p-12'
                }`}
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold"
                    >
                      🔥 YENİ
                    </motion.div>
                  </div>
                )}
                <div className="flex items-start gap-6">
                  <motion.div
                    className="text-6xl"
                    animate={
                      index === 0
                        ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={
                      index === 0
                        ? {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                  >
                    {useCase.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                        index === 0
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {useCase.type}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{useCase.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-red-400 font-semibold">❌ Sorun: </span>
                        <span className="text-white/70">{useCase.problem}</span>
                      </div>
                      <div
                        className={`glass-card p-4 border-l-4 ${
                          index === 0 ? 'border-orange-500 bg-orange-500/5' : 'border-teal-500'
                        }`}
                      >
                        <span
                          className={`font-semibold ${
                            index === 0 ? 'text-orange-400' : 'text-teal-400'
                          }`}
                        >
                          💬 ADE Çözümü:{' '}
                        </span>
                        <p className="text-white/90 mt-2 italic">{useCase.solution}</p>
                      </div>
                      <div>
                        <span className="text-green-400 font-semibold">✨ Sonuç: </span>
                        <span className="text-white/70">{useCase.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">18 Resmi </span>
              <span className="text-gradient-amber-teal">Entegrasyon</span>
            </h2>
            <p className="text-xl text-white/70">Tüm devlet kurumları tek platformda</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 text-center group hover:scale-105 transition-transform"
              >
                <div className="text-5xl mb-4">{integration.logo}</div>
                <h3 className="text-xl font-bold text-white mb-2">{integration.name}</h3>
                <p className="text-sm text-white/60">{integration.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Şeffaf </span>
              <span className="text-gradient-amber-teal">Fiyatlandırma</span>
            </h2>
            <p className="text-xl text-white/70">14 gün ücretsiz dene, istediğin zaman iptal et</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-8 relative ${
                  plan.popular ? 'border-2 border-amber-500 shadow-2xl shadow-amber-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-teal-500 text-white text-sm font-semibold">
                    En Popüler
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gradient-amber-teal">Planlanıyor</span>
                </div>
                <p className="text-white/70 mb-8">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/kayit-ol"
                  className={`block w-full text-center ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Kullanıcılarımız </span>
              <span className="text-gradient-purple-pink">Ne Diyor?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-white/80 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-br from-amber-500/10 via-teal-500/10 to-purple-500/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Hazır mısın? </span>
              <span className="text-gradient-amber-teal">Hemen başla!</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              18 bakanlık entegrasyonu, tek platform. Devlet hizmetlerinde yapay zeka devrimi başlıyor.
            </p>
            <Link to="/kayit-ol" className="btn-primary text-lg px-12 py-6 inline-flex items-center gap-3">
              14 Gün Ücretsiz Dene
              <ArrowRightIcon className="w-6 h-6" />
            </Link>
            <p className="text-sm text-white/50 mt-6">
              Kredi kartı gerekmez • İstediğin zaman iptal et • 24/7 destek
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
