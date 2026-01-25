import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShoppingBagIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BoltIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Esnaf() {
  const painPoints = [
    {
      icon: ClockIcon,
      title: 'Muhasebe Zamanı',
      problem: 'Ayda 40+ saat kağıt işiyle uğraşıyorsunuz',
      solution: 'ADE ile 5 dakika. %95 zaman tasarrufu',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Muhasebeci Maliyeti',
      problem: 'Ayda 2.000-5.000 TL muhasebe ücreti ödüyorsunuz',
      solution: 'Sadece 299 TL/ay. Yıllık 40.000 TL tasarruf',
    },
    {
      icon: DocumentTextIcon,
      title: 'e-Fatura Karmaşası',
      problem: 'GİB portalı karmaşık, her fatura 10 dakika alıyor',
      solution: 'Sesli komutla 30 saniyede fatura',
    },
    {
      icon: BoltIcon,
      title: 'Geç Ödeme Cezaları',
      problem: 'SGK ve vergi ödemelerini unutup gecikme faizi ödüyorsunuz',
      solution: 'Proaktif hatırlatma ve otomatik ödeme',
    },
  ]

  const features = [
    {
      icon: ShoppingBagIcon,
      title: 'Satış Noktası Entegrasyonu',
      desc: 'Yazar kasa, tablet kasa ve POS entegrasyonu. Her satış otomatik fatura',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: DocumentTextIcon,
      title: 'Otomatik e-Fatura',
      desc: 'e-Fatura, e-Arşiv, e-İrsaliye otomatik kesimi ve GİB gönderimi',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: ChartBarIcon,
      title: 'Günlük Raporlar',
      desc: 'Satışlar, gelir-gider, kar-zarar AI sesli rapor. Her sabah WhatsApp\'ta',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BoltIcon,
      title: 'Vergi & SGK Otomasyonu',
      desc: 'Stopaj, KDV, Muhtasar, 4A hesaplaması ve zamanında otomatik ödeme',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'e-İmza Dahil',
      desc: 'Mobil e-İmza (3.990 TL değerinde) ilk yıl ücretsiz',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Stok & Kasa Takibi',
      desc: 'Gerçek zamanlı stok, kasa ve banka hesap takibi. Eksikler bildirir',
      gradient: 'from-rose-500 to-red-500',
    },
  ]

  const useCases = [
    {
      title: 'Bakkal Ahmet Amca - İstanbul',
      avatar: '🏪',
      testimony: 'ADE olmadan önce muhasebeciye ayda 3.000 TL veriyordum. Şimdi 299 TL. AI asistanım her şeyi sesli anlatıyor, ben de anlıyorum artık.',
      results: ['Yıllık 32.400 TL tasarruf', 'Sıfır gecikme faizi', '40 saat/ay zaman kazancı'],
    },
    {
      title: 'Kuaför Elif - Ankara',
      avatar: '💇‍♀️',
      testimony: 'Instagram\'dan gelen randevuları ADE otomatik alıyor. Müşteri geldi mi hatırlatıyor. En çok satan hizmeti bile söylüyor!',
      results: ['%35 randevu artışı', 'Müşteri memnuniyeti %95', 'Stok fire %60 azaldı'],
    },
    {
      title: 'Kuru Temizlemeci Hasan - İzmir',
      avatar: '👔',
      testimony: '150 müşterim var. Kimlerin elbisesi hazır, kimlerin borclu kim, hepsini ADE takip ediyor. Tahsilat oranım %98\'e çıktı!',
      results: ['Tahsilat %40 arttı', 'Kayıp eşya sıfırlandı', 'WhatsApp hatırlatma otomatik'],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-7xl mb-6"
              >
                🏪
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="text-white">Esnaf için </span>
                <span className="text-gradient-amber-teal">Akıllı Asistan</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
                Muhasebeci masrafından kurtulun. Vergilerinizi, SGK'nızı, faturalarınızı
                yapay zeka yönetsin. Ayda sadece 299 TL.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/kayit-ol" className="btn-primary text-lg">
                  14 Gün Ücretsiz Dene
                </Link>
                <Link to="#features" className="btn-secondary text-lg">
                  Özellikleri Gör
                </Link>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: '87.000+', label: 'Esnaf Kullanıcı' },
                { value: '32.400 TL', label: 'Yıllık Ortalama Tasarruf' },
                { value: '%95', label: 'Zaman Tasarrufu' },
                { value: '4.8/5', label: 'Kullanıcı Puanı' },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-gradient-amber-teal mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Bildiğimiz </span>
              <span className="text-gradient-purple-pink">Sorunlar</span>
            </h2>
            <p className="text-xl text-white/70">ADE, esnafın gerçek problemlerini çözüyor</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <point.icon className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{point.title}</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-red-400 font-semibold text-sm">❌ Sorun:</span>
                    <p className="text-white/70 mt-1">{point.problem}</p>
                  </div>
                  <div className="glass-card p-4 border-l-4 border-green-500">
                    <span className="text-green-400 font-semibold text-sm">✓ ADE Çözümü:</span>
                    <p className="text-white/90 mt-1">{point.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Esnaf için </span>
              <span className="text-gradient-amber-teal">Özel Özellikler</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 hover:scale-105 transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </motion.div>
            ))}
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
              <span className="text-gradient-purple-pink">Hikayeler</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card-premium p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">{useCase.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                    <p className="text-white/80 italic mb-6 text-lg">"{useCase.testimony}"</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {useCase.results.map((result, rIndex) => (
                        <div key={rIndex} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white/80">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Hemen </span>
              <span className="text-gradient-amber-teal">Başla</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              14 gün ücretsiz dene. Kredi kartı gerekmez. İstediğin zaman iptal et.
            </p>
            <Link to="/kayit-ol" className="btn-primary text-lg">
              Ücretsiz Dene
            </Link>
            <p className="text-sm text-white/50 mt-6">
              87.000+ esnaf ADE kullanıyor • Ortalama %95 memnuniyet • 7/24 destek
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
