import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CodeBracketIcon,
  CommandLineIcon,
  CubeIcon,
  DocumentTextIcon,
  KeyIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ApiDocs() {
  const apiSections = [
    {
      icon: KeyIcon,
      title: 'Kimlik Doğrulama',
      endpoint: '/api/v1/auth',
      methods: ['POST'],
      description: 'JWT tabanlı güvenli kimlik doğrulama sistemi',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: DocumentTextIcon,
      title: 'e-Fatura API',
      endpoint: '/api/v1/invoices',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      description: 'e-Fatura oluşturma, sorgulama ve GİB entegrasyonu',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: CodeBracketIcon,
      title: 'Vergi Hesaplama',
      endpoint: '/api/v1/tax-calculator',
      methods: ['POST'],
      description: '13 farklı vergi türü için otomatik hesaplama motoru',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: CubeIcon,
      title: 'SGK İşlemleri',
      endpoint: '/api/v1/sgk',
      methods: ['GET', 'POST'],
      description: 'Sigorta primleri ve 4A/4B/4C işlemleri',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: CommandLineIcon,
      title: 'AI Asistan',
      endpoint: '/api/v1/voice',
      methods: ['POST'],
      description: 'Sesli komut işleme ve yapay zeka yanıtları',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Webhooks',
      endpoint: '/api/v1/webhooks',
      methods: ['POST'],
      description: 'Gerçek zamanlı bildirimler ve olay tetikleyicileri',
      gradient: 'from-rose-500 to-red-500',
    },
  ]

  const quickStart = [
    {
      step: '1',
      title: 'API Key Al',
      description: 'Panel üzerinden ücretsiz API anahtarınızı oluşturun',
      code: 'Dashboard → Ayarlar → API Keys',
    },
    {
      step: '2',
      title: 'İlk İstek',
      description: 'cURL veya tercih ettiğiniz HTTP istemcisiyle bağlanın',
      code: `curl -X POST https://api.ade.gov.tr/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"***"}'`,
    },
    {
      step: '3',
      title: 'Token Kullan',
      description: 'Bearer token ile korumalı endpointlere erişin',
      code: `curl https://api.ade.gov.tr/v1/invoices \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
    },
  ]

  const sdks = [
    { name: 'JavaScript / TypeScript', version: 'v2.1.0', downloads: '145K', icon: '📦' },
    { name: 'Python', version: 'v1.8.3', downloads: '98K', icon: '🐍' },
    { name: 'PHP', version: 'v1.5.2', downloads: '67K', icon: '🐘' },
    { name: 'Java', version: 'v2.0.1', downloads: '52K', icon: '☕' },
    { name: 'Go', version: 'v1.4.0', downloads: '41K', icon: '🔷' },
    { name: 'Ruby', version: 'v1.3.5', downloads: '28K', icon: '💎' },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 font-medium text-sm mb-6"
            >
              <ShieldCheckIcon className="w-4 h-4" />
              RESTful API • OpenAPI 3.0 Spec • 99.95% Uptime
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">API </span>
              <span className="text-gradient-amber-teal">Dokümantasyonu</span>
            </h1>

            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              ADE'nin tüm özelliklerini kendi uygulamanızda kullanın.
              85+ endpoint, 6 resmi SDK, detaylı örnekler ve 7/24 destek.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/kayit-ol" className="btn-primary">
                <KeyIcon className="w-5 h-5" />
                API Key Al
              </Link>
              <a
                href="https://api.ade.gov.tr/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <CodeBracketIcon className="w-5 h-5" />
                OpenAPI Spec
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { value: '85+', label: 'API Endpoints' },
              { value: '6', label: 'Resmi SDK' },
              { value: '99.95%', label: 'API Uptime' },
              { value: '<200ms', label: 'Avg Response' },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-gradient-amber-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Hızlı </span>
              <span className="text-gradient-amber-teal">Başlangıç</span>
            </h2>
            <p className="text-xl text-white/70">3 adımda API entegrasyonu</p>
          </motion.div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {quickStart.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 mb-4">{item.description}</p>
                    <div className="bg-slate-900/80 rounded-xl p-4 border border-orange-500/20">
                      <code className="text-sm text-orange-300 font-mono break-all whitespace-pre-wrap">
                        {item.code}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Sections */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">API </span>
              <span className="text-gradient-purple-pink">Kategorileri</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apiSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 hover:scale-105 transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6`}>
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                <code className="text-sm text-orange-400 mb-4 block">{section.endpoint}</code>
                <p className="text-white/70 mb-4">{section.description}</p>
                <div className="flex flex-wrap gap-2">
                  {section.methods.map((method) => (
                    <span
                      key={method}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-white/80"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Resmi </span>
              <span className="text-gradient-amber-teal">SDK'lar</span>
            </h2>
            <p className="text-xl text-white/70">Her dil için hazır kütüphaneler</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="text-4xl mb-4">{sdk.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{sdk.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{sdk.version}</span>
                  <span className="text-teal-400">{sdk.downloads} indirme</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-6 mb-8">
              <BoltIcon className="w-12 h-12 text-amber-400 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Rate Limits</h2>
                <p className="text-white/70 leading-relaxed">
                  API istekleriniz plan bazında limitlere tabidir. Ücretsiz plan: 1.000 istek/saat,
                  Pro plan: 10.000 istek/saat, Enterprise plan: Sınırsız.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { plan: 'Ücretsiz', limit: '1,000/saat', burst: '100/dakika' },
                { plan: 'Pro', limit: '10,000/saat', burst: '500/dakika' },
                { plan: 'Enterprise', limit: 'Sınırsız', burst: 'Sınırsız' },
              ].map((item, index) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="font-bold text-white mb-4">{item.plan}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Saatlik:</span>
                      <span className="text-orange-400 font-semibold">{item.limit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Burst:</span>
                      <span className="text-teal-400 font-semibold">{item.burst}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Geliştirmeye </span>
              <span className="text-gradient-amber-teal">Başla</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Ücretsiz API anahtarınızı alın ve dakikalar içinde entegre edin
            </p>
            <Link to="/kayit-ol" className="btn-primary text-lg">
              <KeyIcon className="w-5 h-5" />
              Ücretsiz API Key Al
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
