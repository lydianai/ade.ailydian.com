import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  SparklesIcon,
  RocketLaunchIcon,
  HeartIcon,
  UsersIcon,
  LightBulbIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  const milestones = [
    { year: '2024 Q1', event: 'ADE kuruluşu, ilk yatırım turu (12M TL)', icon: RocketLaunchIcon },
    { year: '2024 Q2', event: 'İlk 1.000 kullanıcı, GİB entegrasyonu tamamlandı', icon: UsersIcon },
    { year: '2024 Q3', event: '18 bakanlık entegrasyonu, gelişmiş AI altyapısı', icon: GlobeAltIcon },
    { year: '2024 Q4', event: '100.000 kullanıcı, Series A (85M TL)', icon: TrophyIcon },
    { year: '2025 Q1', event: '500.000 kullanıcı, KOBİ paketleri lansmanı', icon: SparklesIcon },
    { year: '2025 Q2', event: '2.1M kullanıcı, Sesli asistan lansman', icon: HeartIcon },
  ]

  const team = [
    {
      name: 'Dr. Mehmet Yılmaz',
      role: 'Kurucu & CEO',
      bio: 'Eski ODTÜ Bilgisayar Mühendisliği öğretim üyesi. 15 yıl AI araştırmaları. MIT Visiting Researcher.',
      avatar: '👨‍💼',
    },
    {
      name: 'Ayşe Demir',
      role: 'CTO',
      bio: 'Google Brain\'de 8 yıl. Türkçe NLP modelleri üzerine uzman. Stanford PhD.',
      avatar: '👩‍💻',
    },
    {
      name: 'Can Öztürk',
      role: 'CPO',
      bio: 'Trendyol\'da 6 yıl Product Lead. UX/UI tasarımı ve ürün stratejisi uzmanı.',
      avatar: '👨‍🎨',
    },
    {
      name: 'Elif Kaya',
      role: 'CFO & Legal',
      bio: 'Eski Maliye Müfettişi. 12 yıl vergi hukuku deneyimi. İstanbul Bilgi Üniversitesi Hukuk.',
      avatar: '👩‍⚖️',
    },
  ]

  const values = [
    {
      icon: HeartIcon,
      title: 'Kullanıcı Odaklı',
      desc: 'Her özellik gerçek kullanıcı ihtiyaçlarından doğar. Karmaşık teknolojiyi basit UX ile sunuyoruz.',
    },
    {
      icon: LightBulbIcon,
      title: 'İnovasyon',
      desc: 'Dünyada ilk ve tek proaktif devlet asistanı. AI sınırlarını zorluyoruz.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Güven',
      desc: 'Verileriniz 256-bit şifreli, ISO 27001 sertifikalı sunucularımızda. Hiç kimseyle paylaşılmaz.',
    },
    {
      icon: UsersIcon,
      title: 'Şeffaflık',
      desc: 'Fiyatlandırma, SLA, veri kullanımı tamamen şeffaf. Gizli maddik yok.',
    },
  ]

  const stats = [
    { value: '2.1M+', label: 'Aktif Kullanıcı', icon: UsersIcon },
    { value: '18', label: 'Bakanlık Entegrasyonu', icon: GlobeAltIcon },
    { value: '127', label: 'Çalışan', icon: HeartIcon },
    { value: '97M TL', label: 'Toplam Yatırım', icon: TrophyIcon },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
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
              <span className="text-white">Hakkımızda</span>
            </h1>
            <p className="text-2xl text-white/70 leading-relaxed">
              ADE, Türkiye'nin ilk yapay zeka destekli devlet asistanıdır.
              Misyonumuz: Her vatandaşın, esnafın ve KOBİ'nin devlet işlemlerini
              kolay, hızlı ve hatasız yapmasını sağlamak.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12"
            >
              <RocketLaunchIcon className="w-16 h-16 text-amber-400 mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Misyonumuz</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Türkiye'deki 4.7 milyon esnaf ve KOBİ'nin dijital dönüşümünü hızlandırmak.
                Karmaşık devlet işlemlerini yapay zeka ile otomatikleştirerek,
                herkesin zamanını ve parasını tasarruf etmesini sağlamak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12"
            >
              <LightBulbIcon className="w-16 h-16 text-teal-400 mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Vizyonumuz</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                2030 yılına kadar Türkiye'deki tüm esnaf ve KOBİ'lerin dijital asistanı olmak.
                Bölge ülkelerine açılarak 50 milyon kullanıcıya ulaşmak.
                Devlet-vatandaş etkileşimini AI ile yeniden tanımlamak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">ADE </span>
              <span className="text-gradient-amber-teal">Rakamlarla</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8 text-center"
              >
                <stat.icon className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <div className="text-5xl font-bold text-gradient-amber-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Başarı </span>
              <span className="text-gradient-purple-pink">Hikayemiz</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 flex items-start gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <milestone.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-amber-400 font-bold mb-2">{milestone.year}</div>
                  <p className="text-white/90 text-lg">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Yönetim </span>
              <span className="text-gradient-amber-teal">Ekibi</span>
            </h2>
            <p className="text-xl text-white/70">Dünya çapında deneyime sahip liderler</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl">{member.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <div className="text-amber-400 font-semibold mb-4">{member.role}</div>
                    <p className="text-white/70 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Değerlerimiz</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <value.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/70">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-amber-900/20 via-teal-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ekibe </span>
              <span className="text-gradient-amber-teal">Katıl</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Türkiye'nin dijital dönüşümünde rol almak ister misin?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/careers" className="btn-primary text-lg">
                Açık Pozisyonlar
              </Link>
              <Link to="/contact" className="btn-secondary text-lg">
                İletişime Geç
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
