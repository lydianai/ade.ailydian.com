import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Blog() {
  const categories = ['Tümü', 'Yapay Zeka', 'Vergi & Mevzuat', 'Başarı Hikayeleri', 'Ürün Güncellemeleri', 'Teknoloji']

  const articles = [
    {
      title: 'Türkçe Dil İşleme: ADE Nasıl Çalışıyor?',
      excerpt: 'ADE\'nin arkasındaki AI teknolojisine derin bir bakış. Son nesil dil modelleri ile nasıl Türkçe anlama ve cevap verme yeteneklerini geliştirdik.',
      category: 'Yapay Zeka',
      date: '15 Ocak 2026',
      readTime: '8 dk',
      image: '🤖',
      featured: true,
    },
    {
      title: '2026 Vergi Değişiklikleri: Esnafı Neler Bekliyor?',
      excerpt: 'Yeni yılla birlikte gelen vergi mevzuatı değişikliklerini özetledik. KDV oranları, stopaj değişiklikleri ve e-fatura zorunluluğu.',
      category: 'Vergi & Mevzuat',
      date: '12 Ocak 2026',
      readTime: '6 dk',
      image: '📋',
      featured: true,
    },
    {
      title: 'Bakkal Ahmet Amca\'nın Dijital Dönüşüm Hikayesi',
      excerpt: '68 yaşında ADE kullanmaya başlayan Ahmet Amca\'nın muhasebe masrafını %90 azaltma hikayesi. Gerçek rakamlar, gerçek deneyim.',
      category: 'Başarı Hikayeleri',
      date: '10 Ocak 2026',
      readTime: '5 dk',
      image: '🏪',
      featured: false,
    },
    {
      title: 'Sesli Asistan Güncellemesi: 14 Yeni Komut',
      excerpt: 'ADE Sesli Asistan\'a eklenen yeni özellikler. Artık SGK primini, vergi borcunu ve stok durumunu sesli sorgulayabilirsiniz.',
      category: 'Ürün Güncellemeleri',
      date: '8 Ocak 2026',
      readTime: '4 dk',
      image: '🎤',
      featured: false,
    },
    {
      title: 'Çoklu Şube Yönetimi: KOBİ\'ler için En İyi Pratikler',
      excerpt: '5\'ten fazla şubesi olan işletmeler için merkezi yönetim, stok senkronizasyonu ve şube performans takibi ipuçları.',
      category: 'Teknoloji',
      date: '5 Ocak 2026',
      readTime: '10 dk',
      image: '🏢',
      featured: false,
    },
    {
      title: 'e-Devlet Entegrasyonu: 8.000 Hizmet Tek Platformda',
      excerpt: 'ADE\'nin 18 bakanlık ve kurumla nasıl entegre olduğunu ve hangi hizmetlere erişebildiğinizi detaylı anlattık.',
      category: 'Teknoloji',
      date: '3 Ocak 2026',
      readTime: '7 dk',
      image: '🏛️',
      featured: false,
    },
    {
      title: 'AI Tahminleme ile Stok Optimizasyonu: %30 Maliyet Düşüşü',
      excerpt: 'Machine learning algoritmalarımız satış geçmişinizi analiz ederek gelecekteki talebi tahmin ediyor. Nasıl mı? Açıklıyoruz.',
      category: 'Yapay Zeka',
      date: '28 Aralık 2025',
      readTime: '12 dk',
      image: '📊',
      featured: false,
    },
    {
      title: 'Muhasebeciler için ADE: 450 Müşteriyi Tek Başına Yönetmek',
      excerpt: 'SMMM Elif Hanım\'ın tek başına 450 müşteri yönetme deneyimi. Toplu beyanname, AI denetim asistanı ve daha fazlası.',
      category: 'Başarı Hikayeleri',
      date: '25 Aralık 2025',
      readTime: '6 dk',
      image: '👩‍💼',
      featured: false,
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">ADE </span>
              <span className="text-gradient-amber-teal">Blog</span>
            </h1>
            <p className="text-xl text-white/70 mb-12">
              Yapay zeka, vergi mevzuatı, başarı hikayeleri ve ürün güncellemeleri
            </p>

            {/* Search */}
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
                  placeholder="Blog yazılarında ara..."
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Featured Articles */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {articles
              .filter((article) => article.featured)
              .map((article, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card-premium group cursor-pointer"
                >
                  <div className="p-8">
                    <div className="text-6xl mb-6">{article.image}</div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-white/50 text-sm">
                        <ClockIcon className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-white/70 mb-6 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">{article.date}</span>
                      <Link
                        to={`/blog/${index + 1}`}
                        className="flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all"
                      >
                        Devamını Oku
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>

          {/* All Articles */}
          <div className="grid md:grid-cols-3 gap-8">
            {articles
              .filter((article) => !article.featured)
              .map((article, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card group cursor-pointer"
                >
                  <div className="p-6">
                    <div className="text-5xl mb-4">{article.image}</div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 rounded-lg bg-teal-500/20 text-teal-400 text-xs font-semibold">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-white/50 text-xs">
                        <ClockIcon className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">{article.date}</span>
                      <Link
                        to={`/blog/${index + 3}`}
                        className="text-teal-400 text-sm font-medium hover:underline"
                      >
                        Oku
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-gradient-to-br from-amber-900/20 via-teal-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Yeni Yazılardan </span>
              <span className="text-gradient-amber-teal">Haberdar Olun</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Haftada 1 email ile en yeni blog yazıları, ürün güncellemeleri ve özel içerikler
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Email adresiniz"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button className="btn-primary whitespace-nowrap">
                Abone Ol
              </button>
            </div>
            <p className="text-sm text-white/50 mt-4">
              İstediğiniz zaman abonelikten çıkabilirsiniz
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
