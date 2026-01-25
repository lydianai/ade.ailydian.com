import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RocketLaunchIcon,
  HeartIcon,
  LightBulbIcon,
  UsersIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  HomeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Careers() {
  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Rekabetçi Maaş',
      desc: 'Sektörün üstünde maaş ve hisse senedi opsiyonu',
    },
    {
      icon: HomeIcon,
      title: 'Hibrit Çalışma',
      desc: 'Haftada 2 gün ofiste, 3 gün uzaktan çalışma',
    },
    {
      icon: AcademicCapIcon,
      title: 'Eğitim Bütçesi',
      desc: 'Yıllık 10.000 TL kişisel gelişim bütçesi',
    },
    {
      icon: HeartIcon,
      title: 'Özel Sağlık Sigortası',
      desc: 'Aile bireyleri dahil kapsamlı sağlık sigortası',
    },
    {
      icon: GlobeAltIcon,
      title: 'Yurt Dışı Fırsatları',
      desc: 'Konferans ve toplantılar için seyahat imkanı',
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation Time',
      desc: 'Haftada 4 saat kendi projenize ayırabilirsiniz',
    },
  ]

  const positions = [
    {
      title: 'Senior AI/ML Engineer',
      department: 'AI & Machine Learning',
      location: 'İstanbul (Hibrit)',
      type: 'Tam Zamanlı',
      description: 'Kurumsal seviye büyük dil modellerini Türkçe için fine-tune edecek, production\'da deploy edecek deneyimli AI Engineer arıyoruz.',
      requirements: [
        '5+ yıl AI/ML deneyimi',
        'LLM fine-tuning (LoRA, QLoRA)',
        'Python, PyTorch, HuggingFace',
        'Production ML sistemleri',
      ],
    },
    {
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'İstanbul (Hibrit)',
      type: 'Tam Zamanlı',
      description: 'Yüksek trafiği kaldırabilecek, ölçeklenebilir backend sistemleri tasarlayacak ve geliştirecek senior developer arıyoruz.',
      requirements: [
        '5+ yıl backend deneyimi',
        'Node.js veya Go',
        'PostgreSQL, Redis, RabbitMQ',
        'Microservices, Docker, Kubernetes',
      ],
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
      description: 'KOBİ ve esnaf segmentinde kullanıcı ihtiyaçlarını anlayıp ürün stratejisi belirleyecek PM arıyoruz.',
      requirements: [
        '3+ yıl PM deneyimi',
        'B2B SaaS deneyimi',
        'Veri odaklı karar verme',
        'Stakeholder yönetimi',
      ],
    },
    {
      title: 'Senior DevOps Engineer',
      department: 'Infrastructure',
      location: 'İstanbul (Hibrit)',
      type: 'Tam Zamanlı',
      description: '99.95% uptime hedefleyen, CI/CD pipeline\'ları kuracak, altyapıyı otomatikleştirecek DevOps Engineer arıyoruz.',
      requirements: [
        '4+ yıl DevOps deneyimi',
        'AWS veya GCP',
        'Terraform, Ansible',
        'Monitoring (Prometheus, Grafana)',
      ],
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'İstanbul (Hibrit)',
      type: 'Tam Zamanlı',
      description: 'Karmaşık enterprise sistemlerini basit, kullanıcı dostu arayüzlere dönüştürecek tasarımcı arıyoruz.',
      requirements: [
        '3+ yıl UX/UI deneyimi',
        'Figma, Adobe XD',
        'Design system oluşturma',
        'Kullanıcı araştırması',
      ],
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
      description: 'Kurumsal müşterilerimizle ilişkiler kurup onların başarısını sağlayacak CSM arıyoruz.',
      requirements: [
        '2+ yıl CSM deneyimi',
        'B2B SaaS background',
        'İleri düzey Excel, SQL',
        'Mükemmel iletişim becerileri',
      ],
    },
  ]

  const culture = [
    {
      value: 'Ownership',
      desc: 'Her takım üyesi kendi alanının sahibidir. Micromanagement yok, güven var.',
    },
    {
      value: 'Hız',
      desc: '2 haftada bir production\'a kod gönderiyoruz. Hızlı ilerlemek bizim DNA\'mızda.',
    },
    {
      value: 'Öğrenme',
      desc: 'Hata yapmak iyidir. Önemli olan öğrenmek ve tekrar etmemek.',
    },
    {
      value: 'Kullanıcı Obsesyonu',
      desc: 'Tüm kararlar kullanıcı geri bildirimleri ve data ile alınır.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
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
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/30 mb-8"
            >
              <RocketLaunchIcon className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">Biz Büyüyoruz, Siz de Büyüyün</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">ADE\'de </span>
              <span className="text-gradient-amber-teal">Kariyer</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Türkiye'nin dijital dönüşümünde rol al. Dünyanın en ileri AI teknolojileriyle çalış.
              2.1 milyon kullanıcının hayatını kolaylaştır.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '127', label: 'Çalışan' },
                { value: '15', label: 'Açık Pozisyon' },
                { value: '22', label: 'Ortalama Yaş' },
                { value: '4.8/5', label: 'Employee Rating' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-4"
                >
                  <div className="text-3xl font-bold text-gradient-amber-teal mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Yan </span>
              <span className="text-gradient-amber-teal">Haklar</span>
            </h2>
            <p className="text-xl text-white/70">Ekip üyelerimize sunduğumuz imkanlar</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <benefit.icon className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Şirket </span>
              <span className="text-gradient-purple-pink">Kültürü</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culture.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-gradient-amber-teal mb-4">{item.value}</h3>
                <p className="text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Açık </span>
              <span className="text-gradient-amber-teal">Pozisyonlar</span>
            </h2>
            <p className="text-xl text-white/70">Ekibimize katılın</p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-white">{position.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold">
                        {position.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/60">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                    <p className="text-white/80 mb-6 leading-relaxed">{position.description}</p>
                    <div className="space-y-2">
                      {position.requirements.map((req, rIndex) => (
                        <div key={rIndex} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white/70">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={`/careers/apply/${index + 1}`}
                    className="btn-primary whitespace-nowrap flex items-center gap-2"
                  >
                    Başvur
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
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
            className="glass-card-premium p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Aradığın Pozisyon </span>
              <span className="text-gradient-amber-teal">Yok mu?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              CV\'ni gönder, sana uygun bir pozisyon açıldığında ilk biz haber verelim
            </p>
            <Link to="/contact" className="btn-primary text-lg px-12 py-6">
              Genel Başvuru Yap
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
