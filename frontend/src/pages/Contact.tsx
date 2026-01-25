import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: 'Telefon',
      value: '0850 390 80 80',
      detail: 'Hafta içi 09:00 - 18:00',
      link: 'tel:+908503908080',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'info@ade.gov.tr',
      detail: '24 saat içinde yanıt',
      link: 'mailto:info@ade.gov.tr',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Canlı Destek',
      value: 'Hemen Başlat',
      detail: '7/24 aktif',
      link: '/support',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  const offices = [
    {
      city: 'İstanbul (Merkez)',
      address: 'Maslak Mahallesi, Teknoloji Cd. No:12 ADE Plaza, 34398 Sarıyer / İstanbul',
      phone: '0850 390 80 80',
      email: 'istanbul@ade.gov.tr',
    },
    {
      city: 'Ankara',
      address: 'Mustafa Kemal Mahallesi, Dumlupınar Bulvarı No:266, 06800 Çankaya / Ankara',
      phone: '0850 390 80 81',
      email: 'ankara@ade.gov.tr',
    },
    {
      city: 'İzmir',
      address: 'Konak Mahallesi, Cumhuriyet Bulvarı No:142, 35250 Konak / İzmir',
      phone: '0850 390 80 82',
      email: 'izmir@ade.gov.tr',
    },
  ]

  const reasons = [
    {
      icon: '💼',
      title: 'Kurumsal Satış',
      desc: 'Enterprise çözümler ve özel teklifler için',
    },
    {
      icon: '🤝',
      title: 'İş Ortaklığı',
      desc: 'Entegrasyon ve partnership fırsatları',
    },
    {
      icon: '📰',
      title: 'Basın & Medya',
      desc: 'Röportaj talepleri ve basın kiti',
    },
    {
      icon: '🎓',
      title: 'Kariyer',
      desc: 'Açık pozisyonlar ve başvurular',
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">İletişime </span>
              <span className="text-gradient-amber-teal">Geçin</span>
            </h1>
            <p className="text-xl text-white/70 mb-12">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-card-premium p-8 text-center group hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                <p className="text-teal-400 font-semibold mb-1">{method.value}</p>
                <p className="text-white/60 text-sm">{method.detail}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-modern"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-modern"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-modern"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      Şirket
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="input-modern"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Konu
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-modern"
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="sales">Satış & Demo Talebi</option>
                    <option value="support">Teknik Destek</option>
                    <option value="partnership">İş Ortaklığı</option>
                    <option value="press">Basın & Medya</option>
                    <option value="career">Kariyer</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Mesajınız
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="input-modern resize-none"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Gönder
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Neden Bize Ulaşmalısınız?</h2>
                <div className="space-y-4">
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 flex items-start gap-4"
                    >
                      <div className="text-4xl">{reason.icon}</div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{reason.title}</h3>
                        <p className="text-white/70 text-sm">{reason.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass-card-premium p-8">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-amber-400" />
                  Çalışma Saatleri
                </h3>
                <div className="space-y-2 text-white/70">
                  <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p>Cumartesi: 10:00 - 16:00</p>
                  <p>Pazar: Kapalı</p>
                  <p className="text-green-400 font-semibold mt-4">
                    Canlı destek 7/24 aktif
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Ofislerimiz</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{office.city}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-sm leading-relaxed">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-white/80 hover:text-teal-400 transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-white/80 hover:text-amber-400 transition-colors">
                      {office.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-premium p-8 text-center h-96 flex items-center justify-center"
          >
            <div>
              <MapPinIcon className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Harita</h3>
              <p className="text-white/60">İstanbul Merkez Ofis Konumu</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
