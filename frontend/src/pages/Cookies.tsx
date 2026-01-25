import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Cookies() {
  const cookieTypes = [
    {
      name: 'Zorunlu Çerezler',
      icon: CheckCircleIcon,
      required: true,
      description: 'Sitenin çal1_mas1 için gerekli çerezler. Devre d1_1 b1rak1lamaz.',
      examples: [
        'Oturum yönetimi (session)',
        'Güvenlik tokenlari',
        'Kullan1c1 tercihleri (dil, tema)',
        'Load balancer çerezleri',
      ],
      duration: 'Oturum süresi veya 30 gün',
    },
    {
      name: 'Performans Çerezleri',
      icon: Cog6ToothIcon,
      required: false,
      description: 'Sitenin performans1n1 ölçmek ve iyile_tirmek için kullan1l1r.',
      examples: [
        'Google Analytics',
        'Sayfa yüklenme süreleri',
        'Hata raporlama',
        'A/B test verileri',
      ],
      duration: '2 y1l',
    },
    {
      name: 'Fonksiyonel Çerezler',
      icon: CheckCircleIcon,
      required: false,
      description: 'Geli_mi_ özelliklerin çal1_mas1 için kullan1l1r.',
      examples: [
        'Canl1 destek widget',
        'Video oynat1c1 tercihleri',
        'Kay1tl1 formlar',
        'Harita konumu',
      ],
      duration: '1 y1l',
    },
    {
      name: 'Pazarlama Çerezleri',
      icon: XCircleIcon,
      required: false,
      description: 'Ki_iselle_tirilmi_ reklamlar için kullan1l1r. (ADE\'de kullan1lm1yor)',
      examples: [
        'Facebook Pixel',
        'Google Ads',
        'LinkedIn Insight',
        'Retargeting pixelleri',
      ],
      duration: 'Kullan1lm1yor',
    },
  ]

  const cookieList = [
    {
      name: 'ade_session',
      purpose: 'Kullan1c1 oturumu',
      type: 'Zorunlu',
      duration: 'Oturum',
    },
    {
      name: 'ade_auth',
      purpose: 'Kimlik dorulama token',
      type: 'Zorunlu',
      duration: '30 gün',
    },
    {
      name: 'ade_preferences',
      purpose: 'Kullan1c1 tercihleri',
      type: 'Zorunlu',
      duration: '1 y1l',
    },
    {
      name: '_ga',
      purpose: 'Google Analytics kullan1c1 ID',
      type: 'Performans',
      duration: '2 y1l',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Çerez </span>
              <span className="text-gradient-amber-teal">Politikas1</span>
            </h1>
            <p className="text-xl text-white/70 mb-4">
              ADE web sitesi ve uygulamalar1nda kulland11m1z çerezler hakk1nda bilgilendirme
            </p>
            <p className="text-sm text-white/50">
              Son güncelleme: 15 Ocak 2026
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12 mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Çerez Nedir?</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Çerezler, web sitelerini ziyaret ettiinizde cihaz1n1za kaydedilen küçük metin dosyalar1d1r.
                Çerezler, sitenin düzgün çal1_mas1, daha iyi kullan1c1 deneyimi sunmas1 ve site trafiini
                analiz etmesi için kullan1l1r.
              </p>
              <p className="text-white/80 leading-relaxed">
                ADE olarak, çerezleri yaln1zca hizmetlerimizi iyile_tirmek ve size daha iyi bir deneyim sunmak
                için kullan1yoruz. Ki_isel verilerinizi asla üçüncü taraflarla pazarlama amaçl1 payla_m1yoruz.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card-premium p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      type.required
                        ? 'bg-green-500/20'
                        : type.name.includes('Pazarlama')
                        ? 'bg-red-500/20'
                        : 'bg-blue-500/20'
                    }`}>
                      <type.icon className={`w-6 h-6 ${
                        type.required
                          ? 'text-green-400'
                          : type.name.includes('Pazarlama')
                          ? 'text-red-400'
                          : 'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        type.required
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {type.required ? 'Zorunlu' : '0stee Bal1'}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">{type.description}</p>
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-3">Örnekler:</h4>
                    <ul className="space-y-2">
                      {type.examples.map((example, eIndex) => (
                        <li key={eIndex} className="flex items-start gap-2 text-white/60 text-sm">
                          <span className="text-amber-400 mt-1">"</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-white/50 text-sm">Saklama Süresi: </span>
                    <span className="text-white font-medium text-sm">{type.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12 mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Kulland11m1z Çerezler</h2>
              <div className="space-y-4">
                {cookieList.map((cookie, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex-1">
                      <code className="text-amber-400 font-mono text-sm">{cookie.name}</code>
                      <p className="text-white/70 text-sm mt-1">{cookie.purpose}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-3 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cookie.type === 'Zorunlu'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {cookie.type}
                      </span>
                      <span className="text-white/50 text-sm">{cookie.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Çerezleri Nas1l Kontrol Ederim?</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Çou taray1c1 çerezleri otomatik olarak kabul eder, ancak taray1c1 ayarlar1n1zdan
                  çerezleri engelleyebilir veya silebilirsiniz. ADE hesab1n1zdan da çerez tercihlerinizi
                  yönetebilirsiniz.
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-amber-400 font-medium">
                    Önemli: Çerezleri tamamen devre d1_1 b1rak1rsan1z, ADE'nin baz1 özellikleri
                    düzgün çal1_mayabilir.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-amber-900/20 via-teal-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Sorular1n1z m1 Var?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Çerez politikam1z hakk1nda daha fazla bilgi almak için bizimle ileti_ime geçin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                0leti_ime Geç
              </Link>
              <Link to="/privacy" className="btn-secondary">
                KVKK Politikas1
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
