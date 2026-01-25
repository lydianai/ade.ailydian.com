import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Support() {
  const supportChannels = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Canl1 Destek',
      desc: 'An1nda yard1m al1n',
      availability: '7/24 aktif',
      responseTime: 'Ortalama 2 dakika',
      color: 'from-teal-500 to-cyan-500',
      action: 'Sohbet Ba_lat',
      badge: 'En H1zl1',
    },
    {
      icon: PhoneIcon,
      title: 'Telefon Destei',
      desc: '0850 390 80 80',
      availability: 'Hafta içi 09:00-18:00',
      responseTime: 'An1nda balant1',
      color: 'from-blue-500 to-indigo-500',
      action: 'Hemen Ara',
      badge: '',
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Destei',
      desc: 'destek@ade.gov.tr',
      availability: 'Her zaman',
      responseTime: 'Ortalama 4 saat',
      color: 'from-purple-500 to-pink-500',
      action: 'Email Gönder',
      badge: '',
    },
  ]

  const supportPlans = [
    {
      name: 'Standart Destek',
      price: 'Dahil',
      features: [
        'Email destek (4 saat yan1t)',
        'Canl1 sohbet (09:00-18:00)',
        'Yard1m merkezi eri_imi',
        'Video eitimler',
        'Topluluk forumu',
      ],
      included: true,
    },
    {
      name: 'Öncelikli Destek',
      price: '299 TL/ay',
      features: [
        'Email destek (2 saat yan1t)',
        '7/24 canl1 sohbet',
        'Telefon destei',
        'Özel eitim oturumlar1',
        'Öncelik s1ras1',
        'Teknik hesap yöneticisi',
      ],
      included: false,
      popular: true,
    },
    {
      name: 'Premium Destek',
      price: '999 TL/ay',
      features: [
        'Email destek (30 dakika yan1t)',
        '7/24 özel hat',
        'WhatsApp destek',
        'Haftal1k dan1_manl1k',
        'SLA garantisi',
        'Dedicated hesap yöneticisi',
        'On-site destek',
      ],
      included: false,
    },
  ]

  const faqQuick = [
    {
      q: 'Destek saatleri nedir?',
      a: 'Canl1 destek 7/24 aktiftir. Telefon destei hafta içi 09:00-18:00 aras1nda hizmet verir.',
    },
    {
      q: 'Ne kadar sürede yan1t al1r1m?',
      a: 'Canl1 destek ortalama 2 dakika, email destek ortalama 4 saat içinde yan1t verir.',
    },
    {
      q: 'Hangi dillerde destek veriyorsunuz?',
      a: '^u anda sadece Türkçe destek sunuyoruz. 0ngilizce destei yak1nda eklenecek.',
    },
    {
      q: 'Ücretsiz planda destek var m1?',
      a: 'Evet! Tüm planlarda standart destek dahildir.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 mb-6"
            >
              <UserGroupIcon className="w-5 h-5 text-teal-400" />
              <span className="text-white/90 font-medium">7/24 Canl1 Destek</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Size Yard1mc1 </span>
              <span className="text-gradient-teal-blue">Olmak 0çin Buraday1z</span>
            </h1>

            <p className="text-xl text-white/70 mb-12">
              Sorular1n1z için en h1zl1 ileti_im kanal1n1 seçin
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { value: '2.1M+', label: 'Mutlu Kullan1c1' },
                { value: '2 dk', label: 'Ortalama Yan1t' },
                { value: '4.8/5', label: 'Memnuniyet' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-4"
                >
                  <div className="text-3xl font-bold text-gradient-teal-blue mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
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
              <span className="text-white">0leti_im </span>
              <span className="text-gradient-teal-blue">Kanallar1</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8 relative"
              >
                {channel.badge && (
                  <div className="absolute -top-3 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">
                    {channel.badge}
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center mb-6`}>
                  <channel.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{channel.title}</h3>
                <p className="text-white/70 mb-6">{channel.desc}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <ClockIcon className="w-4 h-4" />
                    <span>{channel.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <SparklesIcon className="w-4 h-4" />
                    <span>{channel.responseTime}</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="btn-primary w-full"
                >
                  {channel.action}
                </Link>
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
              <span className="text-white">Destek </span>
              <span className="text-gradient-purple-pink">Paketleri</span>
            </h2>
            <p className="text-xl text-white/70">
              0htiyac1n1za göre destek seviyesi seçin
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {supportPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  plan.popular ? 'glass-card-premium ring-2 ring-amber-500/50' : 'glass-card'
                } p-8 relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold">
                    En Popüler
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gradient-teal-blue">{plan.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.included ? '/help' : '/contact'}
                  className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  {plan.included ? 'Zaten Dahil' : 'Sat1n Al'}
                </Link>
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
              <span className="text-white">H1zl1 </span>
              <span className="text-gradient-amber-teal">Yan1tlar</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqQuick.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold text-white mb-3">{item.q}</h3>
                <p className="text-white/70">{item.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/faq" className="btn-secondary">
              Tüm SSS'leri Gör
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-teal-900/20 via-blue-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Hemen </span>
              <span className="text-gradient-teal-blue">Ba_lay1n</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Destek ekibimiz size yard1mc1 olmaya haz1r
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-lg px-8">
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
