import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BuildingOffice2Icon,
  ShieldCheckIcon,
  CpuChipIcon,
  UserGroupIcon,
  ServerIcon,
  ClockIcon,
  ChartBarIcon,
  CheckCircleIcon,
  PhoneIcon,
  CodeBracketIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Enterprise() {
  const features = [
    {
      icon: BuildingOffice2Icon,
      title: 'White-Label Çözüm',
      desc: 'ADE\'yi kendi markanız altında sunun. Logo, renk, domain tamamen sizin. Müşterileriniz sizin yazılımınızı kullanır.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: ShieldCheckIcon,
      title: '99.95% SLA Garantisi',
      desc: 'Kurumsal sözleşme, 7/24 izleme, otomatik yedekleme, disaster recovery planı dahil.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: CpuChipIcon,
      title: 'Özel AI Modelleri',
      desc: 'Sektörünüze özel eğitilmiş AI modelleri. Kendi verilerinizle fine-tuning yapılır.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: UserGroupIcon,
      title: 'Sınırsız Kullanıcı',
      desc: 'Tüm çalışanlarınız, şubeleriniz, bölümleriniz tek platformda. Rol bazlı yetkilendirme.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: ServerIcon,
      title: 'On-Premise Seçeneği',
      desc: 'İsterseniz sunucularınızda çalışır. Tüm veriler sizin altyapınızda kalır.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: CodeBracketIcon,
      title: 'Özel Entegrasyonlar',
      desc: 'ERP, CRM, WMS, BI araçlarınızla entegrasyon. Özel API endpointleri geliştiririz.',
      gradient: 'from-rose-500 to-red-500',
    },
  ]

  const enterpriseBenefits = [
    {
      title: 'Dedicated Account Manager',
      desc: 'Size özel hesap yöneticisi. 7/24 erişilebilir, ihtiyaçlarınızı önceden öngörür, çözüm sunar.',
      icon: PhoneIcon,
    },
    {
      title: 'Priority Support',
      desc: 'Destek taleplerinde öncelik. Ortalama yanıt süresi 15 dakika, çözüm süresi 4 saat.',
      icon: ClockIcon,
    },
    {
      title: 'Custom Training',
      desc: 'Ekibiniz için özel eğitim programları. Yüz yüze veya online, ihtiyaca göre tasarlanır.',
      icon: UserGroupIcon,
    },
    {
      title: 'Security Audits',
      desc: 'Yıllık penetrasyon testleri, güvenlik denetimleri, compliance raporları.',
      icon: LockClosedIcon,
    },
    {
      title: 'Custom Dashboards',
      desc: 'Yöneticileriniz için özel tasarlanmış dashboard\'lar. İstediğiniz metrikleri gösterir.',
      icon: ChartBarIcon,
    },
    {
      title: 'Multi-Region Support',
      desc: 'Birden fazla ülkede operasyon yapıyorsanız, multi-currency, multi-language destek.',
      icon: GlobeAltIcon,
    },
  ]

  const useCases = [
    {
      company: 'Holding A - 45 Grup Şirketi',
      industry: 'Konglomer',
      employees: '12.000+',
      challenge: 'Her şirketin farklı muhasebe yazılımı var. Konsolidasyon manuel yapılıyor. Raporlar 2 hafta geç geliyor.',
      solution: 'Tüm şirketler ADE Enterprise\'a geçirildi. Konsolide raporlar gerçek zamanlı hazırlanıyor. CFO tek dashboard\'dan her şeyi görüyor.',
      results: [
        { metric: 'Rapor Hazırlama Süresi', value: '15 gün → 2 saat', color: 'text-green-400' },
        { metric: 'Sistem Maliyeti', value: '%60 azalma', color: 'text-teal-400' },
        { metric: 'Operasyonel Verimlilik', value: '%40 artış', color: 'text-amber-400' },
      ],
    },
    {
      company: 'Franchise B - 280 Şube',
      industry: 'Restoran Zinciri',
      employees: '4.500+',
      challenge: 'Franchise\'lerin muhasebe kalitesi düşük. Merkez her şubeyi ayrı ayrı denetleyemiyor. Vergi riski yüksek.',
      solution: 'ADE White-Label çözümü franchise\'lere zorunlu tutuldu. Merkez her şubeyi canlı izliyor. AI denetim asistanı hataları önlüyor.',
      results: [
        { metric: 'Muhasebe Hatası', value: '%87 azalma', color: 'text-green-400' },
        { metric: 'Denetim Süresi', value: '%75 azalma', color: 'text-teal-400' },
        { metric: 'Franchise Memnuniyeti', value: '%92', color: 'text-amber-400' },
      ],
    },
  ]

  const securityCompliance = [
    {
      title: 'ISO 27001',
      desc: 'Bilgi güvenliği yönetim sistemi sertifikası',
      status: 'Sertifikalı',
    },
    {
      title: 'SOC 2 Type II',
      desc: 'Güvenlik, kullanılabilirlik, gizlilik denetimi',
      status: 'Sertifikalı',
    },
    {
      title: 'KVKK Uyumlu',
      desc: 'Türk kişisel veri koruma mevzuatına tam uyum',
      status: 'Uyumlu',
    },
    {
      title: 'PCI DSS',
      desc: 'Ödeme kartı veri güvenliği standardı',
      status: 'Level 1',
    },
    {
      title: 'GDPR',
      desc: 'Avrupa Genel Veri Koruma Tüzüğü',
      status: 'Uyumlu',
    },
    {
      title: 'ISO 9001',
      desc: 'Kalite yönetim sistemi',
      status: 'Sertifikalı',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/30 mb-8"
            >
              <BuildingOffice2Icon className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">Kurumsal Ölçekte AI Destekli Platform</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Kurumsal</span>
              <br />
              <span className="text-gradient-amber-teal">ADE Çözümleri</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              White-label, on-premise, özel entegrasyonlar, 99.95% SLA garantisi.
              Büyük organizasyonlar için kurumsal destek ve özellikler.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link to="/contact" className="btn-primary text-lg">
                Teklif Alın
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
                { value: '450+', label: 'Kurumsal Müşteri' },
                { value: '1.2M+', label: 'Aktif Kullanıcı' },
                { value: '99.95%', label: 'Uptime SLA' },
                { value: '15 dk', label: 'Ortalama Yanıt Süresi' },
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
              <span className="text-white">Enterprise </span>
              <span className="text-gradient-amber-teal">Özellikler</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Kurumsal ihtiyaçlarınız için özel geliştirilmiş yetenekler
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

      {/* Enterprise Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Premium </span>
              <span className="text-gradient-purple-pink">Destek</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Kurumsal müşterilerimize özel hizmetler
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Güvenlik ve </span>
              <span className="text-gradient-amber-teal">Uyumluluk</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Uluslararası standartlara tam uyum
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityCompliance.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <ShieldCheckIcon className="w-12 h-12 text-green-400" />
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
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
              <span className="text-white">Kurumsal </span>
              <span className="text-gradient-purple-pink">Referanslar</span>
            </h2>
            <p className="text-xl text-white/70">Büyük organizasyonlardan başarı hikayeleri</p>
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
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h3 className="text-3xl font-bold text-white">{useCase.company}</h3>
                    <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                      {useCase.industry}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                      {useCase.employees} çalışan
                    </span>
                  </div>
                  <div className="space-y-6">
                    <div className="glass-card p-6 border-l-4 border-red-500">
                      <span className="text-red-400 font-semibold mb-2 block">Zorluk</span>
                      <p className="text-white/80 text-lg">{useCase.challenge}</p>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-teal-500">
                      <span className="text-teal-400 font-semibold mb-2 block">ADE Enterprise Çözümü</span>
                      <p className="text-white/80 text-lg">{useCase.solution}</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
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

      {/* Pricing CTA */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Kurumsal </span>
              <span className="text-gradient-amber-teal">Fiyatlandırma</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Her kurumun ihtiyacı farklıdır. Size özel paket hazırlıyoruz.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12 text-center"
            >
              <BuildingOffice2Icon className="w-20 h-20 text-purple-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Özel Teklif</h3>
              <p className="text-xl text-white/70 mb-8">
                Kullanıcı sayısı, özellikler ve destek seviyesine göre özel fiyat hazırlıyoruz.
              </p>
              <ul className="space-y-3 mb-8 text-left max-w-xl mx-auto">
                {[
                  'Sınırsız kullanıcı ve şube',
                  'White-label seçeneği',
                  'On-premise kurulum',
                  'Özel entegrasyonlar',
                  '99.95% SLA garantisi',
                  'Dedicated account manager',
                  '7/24 premium destek',
                  'Özel eğitim programı',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary text-lg px-12 py-6 inline-flex items-center gap-3">
                Teklif Talep Et
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-purple-900/20 via-amber-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Şirketinizi </span>
              <span className="text-gradient-amber-teal">Geleceğe Taşıyın</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              450+ kurumsal müşteri ADE Enterprise kullanıyor. Siz de operasyonlarınızı dijitalleştirin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary text-lg px-12 py-6">
                İletişime Geçin
              </Link>
              <Link to="#features" className="btn-secondary text-lg px-12 py-6">
                Daha Fazla Bilgi
              </Link>
            </div>
            <p className="text-sm text-white/50 mt-6">
              Ücretsiz danışmanlık • Demo sunum • POC desteği
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
