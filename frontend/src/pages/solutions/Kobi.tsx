import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  CubeIcon,
  UsersIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Kobi() {
  const features = [
    {
      icon: BuildingStorefrontIcon,
      title: 'Çoklu Şube Yönetimi',
      desc: 'Tüm şubelerinizi tek panelden yönetin. Şube bazlı raporlama, stok transferi, merkezi fiyatlandırma',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: ChartBarIcon,
      title: 'Gelişmiş Analitik',
      desc: 'AI destekli satış tahminleme, müşteri segmentasyonu, karlılık analizi, trend tespiti',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: CubeIcon,
      title: 'Akıllı Stok Yönetimi',
      desc: 'Otomatik sipariş önerileri, barkod sistemi, seri/lot takibi, fire analizi, ABC sınıflandırma',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: UsersIcon,
      title: 'Çalışan Yönetimi',
      desc: 'Vardiya planı, performans takibi, komisyon hesaplama, SGK otomasyonu, bordro entegrasyonu',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: BanknotesIcon,
      title: 'Nakit Akışı Yönetimi',
      desc: 'Gelir-gider tahmini, vadeli çek-senet takibi, çoklu banka hesabı, otomatik mutabakat',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobil Uygulamalar',
      desc: 'iOS ve Android uygulamaları. Sahada satış, mobil fatura, hızlı rapor görüntüleme',
      gradient: 'from-rose-500 to-red-500',
    },
  ]

  const integrations = [
    {
      name: 'E-Ticaret',
      platforms: ['Trendyol', 'Hepsiburada', 'Amazon', 'N11', 'Çiçeksepeti'],
      desc: 'Siparişler otomatik aktarılır, stok senkronize olur',
    },
    {
      name: 'Muhasebe',
      platforms: ['Logo', 'Netsis', 'Mikro', 'Luca', 'Paraşüt'],
      desc: 'Fiş ve faturalar otomatik muhasebe yazılımına aktarılır',
    },
    {
      name: 'Kargo',
      platforms: ['MNG', 'Yurtiçi', 'Aras', 'PTT', 'Sürat'],
      desc: 'Toplu etiket basımı, kargo takibi, otomatik bildirim',
    },
    {
      name: 'Bankacılık',
      platforms: ['İş Bankası', 'Garanti', 'Akbank', 'Yapı Kredi', 'QNB'],
      desc: 'Açık Bankacılık ile canlı hesap hareketleri',
    },
  ]

  const useCases = [
    {
      title: 'Kafe Zinciri - 8 Şube - İstanbul',
      icon: '☕',
      challenge: 'Her şubenin ayrı kasası, hangi şubenin karlı olduğunu bilmiyorlar. Stok sayımı manuel yapılıyor.',
      solution: 'ADE ile tüm şubeler merkezi panelden izleniyor. AI her sabah şube performans raporu gönderiyor. Stok otomatik sayılıyor.',
      results: [
        { metric: 'Operasyonel Verimlilik', value: '%45 artış', color: 'text-green-400' },
        { metric: 'Stok Maliyeti', value: '%30 azalma', color: 'text-teal-400' },
        { metric: 'Zaman Tasarrufu', value: '25 saat/hafta', color: 'text-amber-400' },
      ],
    },
    {
      title: 'Giyim Mağazası - 5 Mağaza - Ankara',
      icon: '👔',
      challenge: 'Mevsimlik ürünlerde stok sıkışması yaşıyorlar. Hangi ürünün hangi şubede satıldığını bilmiyorlar.',
      solution: 'AI satış geçmişini analiz edip her şube için sipariş önerisi veriyor. Satışı düşük ürünler otomatik indirime giriyor.',
      results: [
        { metric: 'Stok Devir Hızı', value: '2.1x', color: 'text-purple-400' },
        { metric: 'Kar Marjı', value: '%18 artış', color: 'text-green-400' },
        { metric: 'Fire Oranı', value: '%65 azalma', color: 'text-teal-400' },
      ],
    },
    {
      title: 'Restoran Grubu - 12 Şube - İzmir',
      icon: '🍽️',
      challenge: 'Her şubenin mutfak maliyeti farklı. Tedarikçi faturaları manuel girilince hata oluyor.',
      solution: 'Tedarikçi faturaları otomatik sisteme düşüyor. AI her şubenin malzeme kullanımını analiz edip fire uyarısı veriyor.',
      results: [
        { metric: 'Malzeme Maliyeti', value: '%22 azalma', color: 'text-teal-400' },
        { metric: 'Fire Oranı', value: '%40 düşüş', color: 'text-green-400' },
        { metric: 'Fatura Giriş Hatası', value: 'Sıfıra indi', color: 'text-amber-400' },
      ],
    },
  ]

  const advancedFeatures = [
    {
      title: 'AI Satış Tahminleme',
      desc: 'Geçmiş satış verileri, mevsimsellik, kampanyalar, hava durumu analiz edilerek gelecek 90 gün için satış tahmini',
      icon: ArrowTrendingUpIcon,
      stats: ['%92 doğruluk oranı', '90 günlük tahmin', 'Ürün bazlı analiz'],
    },
    {
      title: 'Otomatik Sipariş Önerisi',
      desc: 'Stok seviyeleri, satış hızı ve tedarik süreleri göz önünde bulundurularak otomatik sipariş önerisi',
      icon: CubeIcon,
      stats: ['%30 stok tasarrufu', 'Sıfır stoksuzluk', 'ABC analiz destekli'],
    },
    {
      title: 'Müşteri Segmentasyonu',
      desc: 'RFM analizi ile müşteri segmentleri oluşturulur. Her segment için özel kampanya önerileri',
      icon: UsersIcon,
      stats: ['5 farklı segment', '%35 conversion artışı', 'Kişiselleştirilmiş kampanya'],
    },
    {
      title: 'Dinamik Fiyatlandırma',
      desc: 'Rakip fiyatları, stok durumu, talep yoğunluğuna göre AI fiyat önerileri',
      icon: BanknotesIcon,
      stats: ['Gerçek zamanlı', '%12 kar artışı', 'Rekabetçi analiz'],
    },
  ]

  const pricing = [
    {
      name: 'Business',
      price: '999',
      description: 'Küçük ve orta ölçekli işletmeler için',
      features: [
        '5 şubeye kadar',
        '10 kullanıcı',
        'Sınırsız fatura',
        'Gelişmiş raporlama',
        'Stok yönetimi',
        'E-ticaret entegrasyonu (2 platform)',
        'AI satış tahmini',
        'Email destek',
      ],
      highlighted: false,
    },
    {
      name: 'Business Pro',
      price: '2.499',
      description: 'Büyüyen işletmeler için tam özellikli',
      features: [
        '20 şubeye kadar',
        'Sınırsız kullanıcı',
        'Sınırsız fatura',
        'Tüm gelişmiş raporlar',
        'Çoklu depo yönetimi',
        'Tüm e-ticaret entegrasyonları',
        'AI tahminleme + Sipariş önerisi',
        'Müşteri segmentasyonu',
        'CRM entegrasyonu',
        'Öncelikli destek',
        'API erişimi',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Özel',
      description: 'Kurumsal çözümler',
      features: [
        'Sınırsız şube',
        'Sınırsız kullanıcı',
        'White-label çözüm',
        'Özel entegrasyonlar',
        'Özel AI modelleri',
        '99.95% SLA',
        'Hesap yöneticisi',
        '7/24 canlı destek',
        'Özel eğitim',
        'On-premise seçeneği',
      ],
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8"
            >
              <CpuChipIcon className="w-5 h-5 text-teal-400" />
              <span className="text-white/90 font-medium">AI Destekli Çoklu Şube Yönetimi</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">KOBİ'ler için</span>
              <br />
              <span className="text-gradient-amber-teal">Akıllı İşletme Yönetimi</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Tüm şubelerinizi tek panelden yönetin. AI ile satış tahmini, otomatik stok siparişi,
              gelişmiş analitik. Büyüyen işletmeniz için eksiksiz çözüm.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link to="/kayit-ol" className="btn-primary text-lg">
                14 Gün Ücretsiz Dene
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
                { value: '12.500+', label: 'KOBİ Kullanıcı' },
                { value: '3.400', label: 'Ortalama Şube Sayısı' },
                { value: '%45', label: 'Operasyonel Verimlilik Artışı' },
                { value: '4.9/5', label: 'Kullanıcı Memnuniyeti' },
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
              <span className="text-white">KOBİ'ler için </span>
              <span className="text-gradient-amber-teal">Özel Özellikler</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Büyüyen işletmenizin ihtiyaç duyduğu tüm araçlar tek platformda
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

      {/* Advanced Features */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Yapay Zeka </span>
              <span className="text-gradient-purple-pink">Yetenekleri</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              AI destekli akıllı özellikler işletmenizi bir adım öne taşır
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
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
                    <div className="flex flex-wrap gap-2">
                      {feature.stats.map((stat, sIndex) => (
                        <span
                          key={sIndex}
                          className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Güçlü </span>
              <span className="text-gradient-amber-teal">Entegrasyonlar</span>
            </h2>
            <p className="text-xl text-white/70">Kullandığınız tüm platformlarla sorunsuz çalışır</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{integration.name}</h3>
                <p className="text-white/60 mb-6">{integration.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {integration.platforms.map((platform, pIndex) => (
                    <span
                      key={pIndex}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-colors"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
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
            <p className="text-xl text-white/70">Gerçek KOBİ'lerden gerçek sonuçlar</p>
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
                    <div className="space-y-4">
                      <div className="glass-card p-6 border-l-4 border-red-500">
                        <span className="text-red-400 font-semibold mb-2 block">Zorluk</span>
                        <p className="text-white/80">{useCase.challenge}</p>
                      </div>
                      <div className="glass-card p-6 border-l-4 border-teal-500">
                        <span className="text-teal-400 font-semibold mb-2 block">ADE Çözümü</span>
                        <p className="text-white/80">{useCase.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {useCase.results.map((result, rIndex) => (
                    <div key={rIndex} className="glass-card p-6 text-center">
                      <div className={`text-4xl font-bold ${result.color} mb-2`}>
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

      {/* Pricing */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
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
            <p className="text-xl text-white/70">İşletmenizin büyümesine göre ölçeklenen planlar</p>
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
                  plan.highlighted ? 'border-2 border-teal-500 shadow-2xl shadow-teal-500/20' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white text-sm font-semibold">
                    En Popüler
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  {plan.price === 'Özel' ? (
                    <span className="text-5xl font-bold text-gradient-amber-teal">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold text-gradient-amber-teal">{plan.price}</span>
                      <span className="text-white/60 ml-2">TL / ay</span>
                    </>
                  )}
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
                  to={plan.price === 'Özel' ? '/contact' : '/kayit-ol'}
                  className={`block w-full text-center ${
                    plan.highlighted ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {plan.price === 'Özel' ? 'İletişime Geç' : '14 Gün Ücretsiz Dene'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-teal-900/20 via-purple-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">İşletmenizi </span>
              <span className="text-gradient-amber-teal">Dönüştürün</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              12.500+ KOBİ ADE ile büyüyor. Siz de işletmenizi bir sonraki seviyeye taşıyın.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/kayit-ol" className="btn-primary text-lg px-12 py-6">
                14 Gün Ücretsiz Dene
              </Link>
              <Link to="/contact" className="btn-secondary text-lg px-12 py-6">
                Demo Talep Et
              </Link>
            </div>
            <p className="text-sm text-white/50 mt-6">
              Kredi kartı gerekmez • İstediğin zaman iptal et • Kurulum desteği dahil
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
