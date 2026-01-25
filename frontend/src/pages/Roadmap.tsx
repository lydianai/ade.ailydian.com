import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
  SparklesIcon,
  CpuChipIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Roadmap() {
  const roadmapData = [
    {
      quarter: 'Q4 2025',
      status: 'completed',
      icon: CheckCircleIcon,
      color: 'from-green-500 to-emerald-500',
      items: [
        { title: 'ADE Platform Lansmanı', desc: '18 bakanlık entegrasyonu ile başlangıç' },
        { title: 'e-Fatura & e-İrsaliye', desc: 'GİB entegrasyonu ve otomatik fatura kesimi' },
        { title: 'Sesli Asistan v1', desc: 'Gelişmiş ses tanıma ve dil modeli entegrasyonu' },
        { title: 'Vergi Hesaplama Motoru', desc: '13 farklı vergi türü için otomatik hesaplama' },
        { title: 'iOS & Android Uygulamaları', desc: 'Native mobil deneyim' },
      ],
    },
    {
      quarter: 'Q1 2026',
      status: 'in-progress',
      icon: ClockIcon,
      color: 'from-orange-500 to-amber-500',
      items: [
        { title: 'AI Muhasebeci v2', desc: 'Tam otomatik defter tutma ve raporlama', status: 'progress' },
        { title: 'E-ticaret Entegrasyonları', desc: 'Trendyol, Hepsiburada, N11 otomatik senkronizasyon', status: 'progress' },
        { title: 'Çoklu Şirket Yönetimi', desc: 'Tek hesaptan birden fazla şirket yönetimi', status: 'testing' },
        { title: 'Gelişmiş Raporlama', desc: 'AI destekli tahminleme ve analiz araçları', status: 'planning' },
      ],
    },
    {
      quarter: 'Q2 2026',
      status: 'planned',
      icon: RocketLaunchIcon,
      color: 'from-purple-500 to-pink-500',
      items: [
        { title: 'Açık Bankacılık Entegrasyonu', desc: 'Otomatik banka mutabakatı ve nakit akışı yönetimi' },
        { title: 'White-Label Çözüm', desc: 'Bankalar ve muhasebe firmalar için beyaz etiket platform' },
        { title: 'Blockchain e-İmza', desc: 'NFT tabanlı dijital imza altyapısı' },
        { title: 'Proaktif Uyarılar v2', desc: 'Gelişmiş AI ile fırsat ve risk tespiti' },
      ],
    },
    {
      quarter: 'Q3 2026',
      status: 'planned',
      icon: SparklesIcon,
      color: 'from-blue-500 to-cyan-500',
      items: [
        { title: 'Multi-Language Support', desc: 'İngilizce, Almanca, Fransızca dil desteği' },
        { title: 'API Marketplace', desc: '3. parti geliştiriciler için uygulama mağazası' },
        { title: 'Enterprise SLA', desc: '99.99% uptime garantisi ve dedicated support' },
        { title: 'Advanced Analytics Dashboard', desc: 'Gerçek zamanlı BI ve veri görselleştirme' },
      ],
    },
    {
      quarter: 'Q4 2026',
      status: 'future',
      icon: GlobeAltIcon,
      color: 'from-teal-500 to-green-500',
      items: [
        { title: 'Uluslararası Genişleme', desc: 'Avrupa Birliği ülkelerine açılış (pilot: Almanya)' },
        { title: 'ADE Coin', desc: 'Blockchain tabanlı ödül ve ödeme sistemi' },
        { title: 'Quantum-Safe Encryption', desc: 'Post-quantum kriptografi altyapısı' },
        { title: 'AI CFO', desc: 'Tam otonom finansal yönetim asistanı' },
      ],
    },
  ]

  const statusLabels = {
    completed: { label: 'Tamamlandı', color: 'text-green-400' },
    'in-progress': { label: 'Geliştiriliyor', color: 'text-orange-400' },
    planned: { label: 'Planlandı', color: 'text-purple-400' },
    future: { label: 'Gelecek', color: 'text-teal-400' },
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 font-medium text-sm mb-6"
            >
              <RocketLaunchIcon className="w-4 h-4" />
              Son Güncelleme: 23 Ocak 2026
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Yol </span>
              <span className="text-gradient-purple-pink">Haritası</span>
            </h1>

            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              ADE'nin geleceği. Şeffaf, topluluk odaklı gelişim planımızı keşfedin.
              Önerilerinizi dinliyor, önceliklendiriyor ve hayata geçiriyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-orange-500 to-purple-500 opacity-30 hidden lg:block" />

            <div className="space-y-24">
              {roadmapData.map((quarter, qIndex) => (
                <motion.div
                  key={qIndex}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: qIndex * 0.1 }}
                  className="relative"
                >
                  {/* Quarter Badge */}
                  <div className="flex items-center justify-center mb-12">
                    <div className={`glass-card-premium px-8 py-4 inline-flex items-center gap-4 border-2 border-gradient-to-r ${quarter.color}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quarter.color} flex items-center justify-center`}>
                        <quarter.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{quarter.quarter}</h2>
                        <p className={`text-sm ${statusLabels[quarter.status].color} font-semibold`}>
                          {statusLabels[quarter.status].label}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {quarter.items.map((item, iIndex) => (
                      <motion.div
                        key={iIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: iIndex * 0.05 }}
                        className="glass-card p-6 hover:scale-105 transition-transform"
                      >
                        <div className="flex items-start gap-4">
                          {quarter.status === 'completed' && (
                            <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                          )}
                          {quarter.status === 'in-progress' && (
                            <div className="relative flex h-6 w-6 flex-shrink-0 mt-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-6 w-6 bg-orange-400"></span>
                            </div>
                          )}
                          {(quarter.status === 'planned' || quarter.status === 'future') && (
                            <div className="w-6 h-6 rounded-full border-2 border-purple-400/50 flex-shrink-0 mt-1" />
                          )}

                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.desc}</p>
                            {item.status && (
                              <div className="mt-3">
                                {item.status === 'progress' && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                                    Geliştiriliyor
                                  </span>
                                )}
                                {item.status === 'testing' && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    Test Aşamasında
                                  </span>
                                )}
                                {item.status === 'planning' && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    Planlanıyor
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Voting */}
      <section className="section-padding bg-gradient-to-br from-orange-900/20 via-purple-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 max-w-4xl mx-auto text-center"
          >
            <CpuChipIcon className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Öncelikler Sizi Dinleyerek Belirleniyor
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Hangi özelliklerin öncelikli geliştirilmesini istiyorsunuz? Topluluk oylaması
              ile birlikte roadmap'i şekillendirin. Her ayın başında en çok oy alan 3 özellik
              sprint planına eklenir.
            </p>
            <a
              href="https://feedback.ade.gov.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg"
            >
              <ChartBarIcon className="w-5 h-5" />
              Oy Ver & Öneri Gönder
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mobile Apps Teaser */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Yakında </span>
              <span className="text-gradient-amber-teal">Yeni Özellikler</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DevicePhoneMobileIcon,
                title: 'Offline Mode',
                desc: 'İnternet olmadan da fatura kesimi ve temel işlemler',
                eta: 'Q2 2026',
              },
              {
                icon: GlobeAltIcon,
                title: 'Multi-Currency',
                desc: 'Döviz kurları ve uluslararası fatura desteği',
                eta: 'Q3 2026',
              },
              {
                icon: CpuChipIcon,
                title: 'Smart Contracts',
                desc: 'Blockchain üzerinde otomatik ödeme ve sözleşme',
                eta: 'Q4 2026',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 mb-4">{feature.desc}</p>
                <span className="text-sm text-teal-400 font-semibold">{feature.eta}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
