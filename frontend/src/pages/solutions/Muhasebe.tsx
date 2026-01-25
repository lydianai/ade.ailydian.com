import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  UsersIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Muhasebe() {
  const features = [
    {
      icon: UsersIcon,
      title: 'Çoklu Müşteri Yönetimi',
      desc: 'Tüm müşterilerinizi tek panelden yönetin. Müşteri bazlı dashboard, raporlar ve takip',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: DocumentDuplicateIcon,
      title: 'Toplu İşlem',
      desc: 'Tüm müşterileriniz için tek tıkla beyanname, mizan, bilanço oluşturma',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: ClockIcon,
      title: 'Otomasyon',
      desc: 'e-Fatura, e-Defter, muhtasar, stopaj otomatik hesaplama ve gönderim',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: CpuChipIcon,
      title: 'AI Denetim Asistanı',
      desc: 'Hatalı kayıtları, eksik belgeleri, vergi riski olan işlemleri otomatik tespit',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: ChartBarIcon,
      title: 'Gelişmiş Raporlama',
      desc: 'Müşteri karlılık analizi, iş yükü dağılımı, performans metrikleri',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Yetki Yönetimi',
      desc: 'Asistan muhasebecilere sınırlı yetki, müşterilere salt okunur erişim',
      gradient: 'from-rose-500 to-red-500',
    },
  ]

  const automationFeatures = [
    {
      title: 'Otomatik Fatura Entegrasyonu',
      desc: 'Müşterilerinizin e-Fatura, e-Arşiv, e-İrsaliye\'leri otomatik sisteme aktarılır. Manuel giriş sıfıra iner.',
      stat: '%95 zaman tasarrufu',
      icon: DocumentTextIcon,
    },
    {
      title: 'AI Yevmiye Önerisi',
      desc: 'Geçmiş kayıtlardan öğrenen AI, yeni faturalar için doğru hesap kodlarını önerir.',
      stat: '%98 doğruluk',
      icon: CpuChipIcon,
    },
    {
      title: 'Toplu Beyanname',
      desc: 'Tüm müşterilerinizin KDV, Muhtasar, Stopaj beyannamelerini tek tıkla hazırlayıp gönderin.',
      stat: '1000 müşteri/saat',
      icon: BoltIcon,
    },
    {
      title: 'Müşteri Self-Service',
      desc: 'Müşteriler kendi panellerinden raporlarını görür, belge yükler. Sizden sürekli rapor istemez.',
      stat: '%60 destek azalması',
      icon: UsersIcon,
    },
  ]

  const useCases = [
    {
      title: 'Ahmet Bey SMMM - 450 Müşteri - İstanbul',
      icon: '👨‍💼',
      challenge: '8 asistan muhasebeci ile çalışıyor. Her ay beyanname zamanı kaos yaşanıyor. Müşteri raporları geç hazırlanıyor.',
      solution: 'ADE ile tüm müşteriler sisteme entegre edildi. e-Faturalar otomatik düşüyor. AI yevmiye kayıtlarını öneriyor. Beyannameler toplu hazırlanıyor.',
      results: [
        { metric: 'İş Yükü', value: '%70 azalma', color: 'text-green-400' },
        { metric: 'Müşteri Kapasitesi', value: '450 → 850', color: 'text-teal-400' },
        { metric: 'Hata Oranı', value: '%85 düşüş', color: 'text-amber-400' },
        { metric: 'Müşteri Memnuniyeti', value: '%92', color: 'text-purple-400' },
      ],
    },
    {
      title: 'Elif Hanım SMMM - 120 Müşteri - Ankara',
      icon: '👩‍💼',
      challenge: 'Tek başına çalışıyor. Müşteri artırmak istiyor ama fiziksel olarak yetişemiyor. Raporlar manuel hazırlanıyor.',
      solution: 'ADE Muhasebe paketi ile tüm rutin işler otomatikleşti. Müşterilere self-service panel verildi. AI denetim asistanı hataları önlüyor.',
      results: [
        { metric: 'Çalışma Saati', value: '70 → 40 saat/hafta', color: 'text-green-400' },
        { metric: 'Müşteri Sayısı', value: '2x artış', color: 'text-teal-400' },
        { metric: 'Gelir', value: '%180 artış', color: 'text-amber-400' },
        { metric: 'İş-Yaşam Dengesi', value: 'İyileşti', color: 'text-purple-400' },
      ],
    },
  ]

  const pricing = [
    {
      name: 'Starter',
      price: '999',
      description: 'Küçük muhasebe büroları için',
      features: [
        '50 müşteriye kadar',
        '2 kullanıcı',
        'Otomatik e-Fatura entegrasyonu',
        'Temel raporlama',
        'AI yevmiye önerisi',
        'Müşteri self-service',
        'Email destek',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '2.999',
      description: 'Orta ölçekli bürolar için',
      features: [
        '200 müşteriye kadar',
        '10 kullanıcı',
        'Tüm otomasyonlar',
        'Gelişmiş raporlama',
        'AI denetim asistanı',
        'Toplu beyanname',
        'Müşteri karlılık analizi',
        'WhatsApp entegrasyonu',
        'Öncelikli destek',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '9.999',
      description: 'Büyük muhasebe firmaları için',
      features: [
        'Sınırsız müşteri',
        'Sınırsız kullanıcı',
        'Özel entegrasyonlar',
        'Özel AI modelleri',
        'White-label seçeneği',
        'API erişimi',
        'Çoklu şube yönetimi',
        'Hesap yöneticisi',
        '7/24 canlı destek',
      ],
      highlighted: false,
    },
  ]

  const integrations = [
    'Logo Tiger',
    'Netsis',
    'Mikro',
    'Luca',
    'Paraşüt',
    'e-Muhasebe.NET',
    'Zirve',
    'Eta',
  ]

  const benefits = [
    {
      title: 'Müşteri Kapasitesini Artırın',
      desc: 'Otomasyon sayesinde aynı ekiple 2-3 kat daha fazla müşteriye hizmet verin',
      value: '2-3x',
      icon: ArrowTrendingUpIcon,
    },
    {
      title: 'Gelirinizi Artırın',
      desc: 'Daha fazla müşteri, daha fazla gelir. Ek hizmetler (danışmanlık) için vakit kalır',
      value: '%150+',
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Hata Riskini Azaltın',
      desc: 'AI denetim asistanı hataları önceden tespit eder. Vergi riski minimize edilir',
      value: '%85',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Müşteri Memnuniyeti',
      desc: 'Daha hızlı hizmet, daha az hata, anlık raporlar. Müşteriler memnun kalır',
      value: '4.9/5',
      icon: UsersIcon,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8"
            >
              <BuildingOffice2Icon className="w-5 h-5 text-blue-400" />
              <span className="text-white/90 font-medium">SMMM ve YMM'ler için Özel Platform</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Muhasebeciler için</span>
              <br />
              <span className="text-gradient-amber-teal">AI Destekli Otomasyon</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Tüm müşterilerinizi tek panelden yönetin. AI ile yevmiye kaydı, toplu beyanname,
              otomatik denetim. Müşteri kapasitesini 3 katına çıkarın.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link to="/kayit-ol" className="btn-primary text-lg">
                30 Gün Ücretsiz Dene
              </Link>
              <Link to="#features" className="btn-secondary text-lg">
                Özellikleri İncele
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: '3.200+', label: 'Muhasebeci Kullanıcı' },
                { value: '127K', label: 'Yönetilen Müşteri' },
                { value: '%70', label: 'İş Yükü Azalması' },
                { value: '4.9/5', label: 'Memnuniyet' },
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

      {/* Features */}
      <section id="features" className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Muhasebe Büronuz için </span>
              <span className="text-gradient-amber-teal">Güçlü Araçlar</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Rutin işleri otomatikleştirin, değer yaratan danışmanlığa odaklanın
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
                <p className="text-white/70 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Features */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Otomasyon </span>
              <span className="text-gradient-purple-pink">Yetenekleri</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Manuel işlerden kurtulun, AI sizin yerinize çalışsın
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {automationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card-premium p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70 mb-4 leading-relaxed">{feature.desc}</p>
                    <div className="inline-flex px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                      {feature.stat}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">ADE ile </span>
              <span className="text-gradient-amber-teal">Kazanımlar</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gradient-amber-teal mb-3">
                  {benefit.value}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Başarı </span>
              <span className="text-gradient-purple-pink">Hikayeleri</span>
            </h2>
            <p className="text-xl text-white/70">Gerçek muhasebecilerden gerçek sonuçlar</p>
          </motion.div>

          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card-premium p-8 md:p-12"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="text-6xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-6">{useCase.title}</h3>
                    <div className="space-y-6">
                      <div className="glass-card p-6 border-l-4 border-red-500">
                        <span className="text-red-400 font-semibold mb-2 block">Zorluk</span>
                        <p className="text-white/80 text-lg">{useCase.challenge}</p>
                      </div>
                      <div className="glass-card p-6 border-l-4 border-teal-500">
                        <span className="text-teal-400 font-semibold mb-2 block">ADE Çözümü</span>
                        <p className="text-white/80 text-lg">{useCase.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  {useCase.results.map((result, rIndex) => (
                    <div key={rIndex} className="glass-card p-6 text-center">
                      <div className={`text-3xl font-bold ${result.color} mb-2`}>
                        {result.value}
                      </div>
                      <div className="text-white/60 text-sm">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Muhasebe Yazılımı </span>
              <span className="text-gradient-amber-teal">Entegrasyonları</span>
            </h2>
            <p className="text-xl text-white/70">Mevcut yazılımınızla sorunsuz çalışır</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-amber-500/30 transition-all"
              >
                {integration}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Ölçeklenebilir </span>
              <span className="text-gradient-amber-teal">Fiyatlandırma</span>
            </h2>
            <p className="text-xl text-white/70">Müşteri sayınıza göre esnek planlar</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-8 relative ${
                  plan.highlighted ? 'border-2 border-blue-500 shadow-2xl shadow-blue-500/20' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                    En Popüler
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gradient-amber-teal">{plan.price}</span>
                  <span className="text-white/60 ml-2">TL / ay</span>
                </div>
                <p className="text-white/70 mb-8">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/kayit-ol"
                  className={`block w-full text-center ${
                    plan.highlighted ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  30 Gün Ücretsiz Dene
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Büronuzu </span>
              <span className="text-gradient-amber-teal">Dönüştürün</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              3.200+ muhasebeci ADE kullanıyor. Siz de müşteri kapasitesizi artırın, gelirinizi yükseltin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/kayit-ol" className="btn-primary text-lg px-12 py-6">
                30 Gün Ücretsiz Dene
              </Link>
              <Link to="/contact" className="btn-secondary text-lg px-12 py-6">
                Demo Talep Et
              </Link>
            </div>
            <p className="text-sm text-white/50 mt-6">
              Kredi kartı gerekmez • İstediğin zaman iptal et • Ücretsiz eğitim dahil
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
