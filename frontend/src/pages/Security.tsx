import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShieldCheckIcon,
  LockClosedIcon,
  KeyIcon,
  ServerIcon,
  EyeSlashIcon,
  DocumentCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Security() {
  const securityFeatures = [
    {
      icon: LockClosedIcon,
      title: '256-bit AES ^ifreleme',
      desc: 'Tüm verileriniz hem iletimde (TLS 1.3) hem de depolamada 256-bit AES ile _ifrelenir.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: KeyIcon,
      title: '0ki Faktörlü Kimlik Dorulama',
      desc: 'SMS, email veya Google Authenticator ile hesab1n1z1 ekstra koruma alt1na al1n.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ServerIcon,
      title: 'ISO 27001 Sertifikal1',
      desc: 'Veri merkezlerimiz ISO 27001 ve SOC 2 Type II sertifikalar1na sahiptir.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: EyeSlashIcon,
      title: 'S1f1r Bilgi Mimarisi',
      desc: 'Hassas verileriniz _ifreli saklan1r. ADE çal1_anlar1 bile göremez.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: DocumentCheckIcon,
      title: 'KVKK & GDPR Uyumlu',
      desc: 'Tüm veri i_leme süreçlerimiz KVKK ve GDPR standartlar1na uygundur.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Penetrasyon Testleri',
      desc: 'Her 3 ayda bir ba1ms1z güvenlik uzmanlar1nca penetrasyon testi yap1l1r.',
      color: 'from-red-500 to-rose-500',
    },
  ]

  const infrastructure = [
    {
      title: 'Veri Merkezleri',
      items: [
        'AWS Frankfurt (Birincil)',
        'AWS 0stanbul (Yedek)',
        'ISO 27001, SOC 2 Type II sertifikal1',
        '7/24 fiziksel güvenlik',
        'Çoklu biyometrik eri_im kontrol',
      ],
    },
    {
      title: 'Yedekleme',
      items: [
        'Gerçek zamanl1 veritaban1 replikasyonu',
        'Günlük otomatik yedekleme',
        '30 gün yedek saklama',
        'Corafi olarak da1t1k yedekler',
        '4 saat RTO, 15 dakika RPO',
      ],
    },
    {
      title: 'Eri_im Kontrolü',
      items: [
        'Rol bazl1 eri_im yönetimi (RBAC)',
        'En az yetki prensibi',
        'Tüm eri_imler loglanan',
        'Anomali tespiti ve uyar1lar',
        '^üpheli aktivitelerde otomatik kilitleme',
      ],
    },
  ]

  const compliance = [
    {
      name: 'ISO 27001',
      desc: 'Bilgi güvenlii yönetim sistemi',
      status: 'Sertifikal1',
      color: 'text-green-400',
    },
    {
      name: 'SOC 2 Type II',
      desc: 'Güvenlik, gizlilik ve eri_ilebilirlik',
      status: 'Sertifikal1',
      color: 'text-blue-400',
    },
    {
      name: 'KVKK',
      desc: 'Ki_isel verilerin korunmas1',
      status: 'Uyumlu',
      color: 'text-purple-400',
    },
    {
      name: 'GDPR',
      desc: 'Avrupa veri koruma standard1',
      status: 'Uyumlu',
      color: 'text-amber-400',
    },
  ]

  const bestPractices = [
    {
      title: 'Güçlü Parola Kullan1n',
      desc: 'En az 12 karakter, büyük-küçük harf, say1 ve özel karakter içeren parolalar tercih edin.',
      icon: KeyIcon,
    },
    {
      title: '0ki Faktörlü Kimlik Dorulama',
      desc: 'Hesab1n1z1 ekstra koruma katman1 ile güvence alt1na al1n.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Oturumlar1 Düzenli Kapat1n',
      desc: 'Ortak bilgisayarlarda i_iniz bittiinde mutlaka ç1k1_ yap1n.',
      icon: LockClosedIcon,
    },
    {
      title: '^üpheli Aktiviteleri Bildirin',
      desc: 'Hesab1n1zda olaand1_1 bir _ey fark ederseniz hemen destek ekibimize bildirin.',
      icon: ExclamationTriangleIcon,
    },
  ]

  const incidentResponse = [
    {
      step: '1. Tespit',
      desc: 'Otomatik sistemler ve SOC ekibimiz 7/24 izleme yapar',
      time: '< 5 dakika',
    },
    {
      step: '2. Deerlendirme',
      desc: 'Olay1n ciddiyeti ve etki alan1 belirlenir',
      time: '< 15 dakika',
    },
    {
      step: '3. Müdahale',
      desc: 'Güvenlik ekibi derhal müdahale eder, tehdidi izole eder',
      time: '< 30 dakika',
    },
    {
      step: '4. Bildirim',
      desc: 'Etkilenen kullan1c1lar ve yetkili kurumlar bilgilendirilir',
      time: '< 2 saat',
    },
    {
      step: '5. Kök Neden Analizi',
      desc: 'Olay1n nedeni ara_t1r1l1r ve önlemler al1n1r',
      time: '< 24 saat',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Güvenlik </span>
              <span className="text-gradient-green-blue">Önceliimiz</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Verileriniz banka standartlar1nda _ifreleme ve çok katmanl1 güvenlik önlemleriyle korunur
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {compliance.map((cert, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-semibold"
                >
                  {cert.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Güvenlik </span>
              <span className="text-gradient-green-blue">Özellikleri</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8 group hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Altyap1 </span>
              <span className="text-gradient-purple-pink">Güvenlii</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {infrastructure.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, iIndex) => (
                    <li key={iIndex} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Olay Müdahale </span>
              <span className="text-gradient-amber-teal">Süreci</span>
            </h2>
            <p className="text-xl text-white/70">
              Olas1 güvenlik olaylar1na nas1l yan1t veriyoruz
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {incidentResponse.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.step}</h3>
                  <p className="text-white/70">{step.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-green-400 font-bold">{step.time}</div>
                  <div className="text-white/50 text-sm">hedef süre</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Güvenlik </span>
              <span className="text-gradient-blue-purple">0puçlar1</span>
            </h2>
            <p className="text-xl text-white/70">
              Hesab1n1z1 güvende tutmak için yapabilecekleriniz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {bestPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <practice.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{practice.title}</h3>
                <p className="text-white/70">{practice.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-green-900/20 via-blue-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Güvenlik Aç11 Bildirin</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Sorumlu aç1klama politikam1z kapsam1nda güvenlik aç11 bulursan1z lütfen bildirin
            </p>
            <div className="glass-card p-6 mb-8 text-left">
              <div className="space-y-3 text-white/80">
                <div>
                  <span className="font-semibold text-amber-400">Email:</span>
                  <span className="ml-2">security@ade.gov.tr</span>
                </div>
                <div>
                  <span className="font-semibold text-teal-400">PGP Key:</span>
                  <span className="ml-2 font-mono text-sm">4096R/ABCD1234</span>
                </div>
              </div>
            </div>
            <Link to="/contact" className="btn-primary">
              0leti_ime Geç
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
