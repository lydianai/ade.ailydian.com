import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Help() {
  const categories = [
    {
      icon: RocketLaunchIcon,
      title: 'Ba_lang1ç Rehberi',
      desc: '0lk ad1mlar, hesap olu_turma, kurulum',
      articleCount: 12,
      color: 'from-amber-500 to-orange-500',
      link: '/help/getting-started',
    },
    {
      icon: Cog6ToothIcon,
      title: 'Özellikler',
      desc: 'e-Fatura, SGK bildirimleri, muhasebe',
      articleCount: 48,
      color: 'from-blue-500 to-cyan-500',
      link: '/help/features',
    },
    {
      icon: CreditCardIcon,
      title: 'Faturalama & Ödeme',
      desc: 'Planlar, ödeme yöntemleri, fatura',
      articleCount: 18,
      color: 'from-purple-500 to-pink-500',
      link: '/help/billing',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Güvenlik & Gizlilik',
      desc: 'KVKK, _ifre dei_imi, 2FA',
      articleCount: 24,
      color: 'from-green-500 to-emerald-500',
      link: '/help/security',
    },
  ]

  const popularArticles = [
    {
      title: 'ADE hesab1 nas1l olu_turulur?',
      category: 'Ba_lang1ç',
      views: '45.2K',
      time: '3 dk',
    },
    {
      title: 'e-Fatura nas1l kesilir?',
      category: 'Özellikler',
      views: '38.1K',
      time: '5 dk',
    },
    {
      title: 'SGK bildirimlerini nas1l yapar1m?',
      category: 'Özellikler',
      views: '32.4K',
      time: '7 dk',
    },
    {
      title: 'Plan1m1 nas1l yükseltebilirim?',
      category: 'Faturalama',
      views: '28.9K',
      time: '2 dk',
    },
    {
      title: '0ki faktörlü kimlik dorulama nas1l etkinle_tirilir?',
      category: 'Güvenlik',
      views: '24.5K',
      time: '4 dk',
    },
    {
      title: 'Çoklu _ube nas1l yönetilir?',
      category: 'Özellikler',
      views: '22.1K',
      time: '8 dk',
    },
  ]

  const quickLinks = [
    {
      icon: BookOpenIcon,
      title: 'Dokümantasyon',
      desc: 'Detayl1 kullan1m k1lavuzlar1',
      link: '/docs',
    },
    {
      icon: VideoCameraIcon,
      title: 'Video Eitimler',
      desc: 'Ad1m ad1m video anlat1mlar',
      link: '/tutorials',
    },
    {
      icon: QuestionMarkCircleIcon,
      title: 'S1kça Sorulan Sorular',
      desc: 'H1zl1 yan1tlar',
      link: '/faq',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Canl1 Destek',
      desc: 'An1nda yard1m',
      link: '/support',
    },
  ]

  const contactOptions = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Canl1 Sohbet',
      desc: 'Ortalama yan1t süresi: 2 dakika',
      availability: '7/24 aktif',
      action: 'Sohbet Ba_lat',
      color: 'text-teal-400',
    },
    {
      icon: PhoneIcon,
      title: 'Telefon Destei',
      desc: '0850 390 80 80',
      availability: 'Hafta içi 09:00-18:00',
      action: 'Ara',
      color: 'text-blue-400',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Yard1m </span>
              <span className="text-gradient-blue-purple">Merkezi</span>
            </h1>
            <p className="text-xl text-white/70 mb-12">
              ADE kullan1m1 hakk1nda arad11n1z her _ey burada
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
                  placeholder="Sorunuzu veya konuyu yaz1n..."
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </motion.div>
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
              <span className="text-white">Konular</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={category.link}
                  className="glass-card-premium p-8 block group hover:scale-105 transition-transform"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{category.title}</h3>
                  <p className="text-white/70 mb-4">{category.desc}</p>
                  <div className="text-sm text-white/50">
                    {category.articleCount} makale
                  </div>
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
              <span className="text-white">Popüler </span>
              <span className="text-gradient-amber-teal">Makaleler</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/help/article/${index + 1}`}
                  className="glass-card p-6 flex items-center justify-between group hover:bg-white/10 transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                        {article.category}
                      </span>
                      <span>{article.views} görüntülenme</span>
                      <span>{article.time} okuma</span>
                    </div>
                  </div>
                  <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
              <span className="text-gradient-purple-pink">Eri_im</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.link}
                  className="glass-card p-6 block text-center group hover:scale-105 transition-transform"
                >
                  <link.icon className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">{link.title}</h3>
                  <p className="text-white/60 text-sm">{link.desc}</p>
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
              <span className="text-white">Cevap Bulamad1n1z m1?</span>
            </h2>
            <p className="text-xl text-white/70">
              Destek ekibimiz size yard1mc1 olmak için haz1r
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <option.icon className={`w-12 h-12 ${option.color} mb-6`} />
                <h3 className="text-2xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-white/70 mb-2">{option.desc}</p>
                <p className="text-white/50 text-sm mb-6">{option.availability}</p>
                <Link
                  to="/support"
                  className="btn-primary w-full"
                >
                  {option.action}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
