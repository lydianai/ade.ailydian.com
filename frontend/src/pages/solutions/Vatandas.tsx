import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BoltIcon,
  HeartIcon,
  HomeIcon,
  DocumentTextIcon,
  CalendarIcon,
  ShieldCheckIcon,
  PhoneIcon,
  BellAlertIcon,
  ClockIcon,
  CheckCircleIcon,
  UserCircleIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Vatandas() {
  const features = [
    {
      icon: BoltIcon,
      title: 'Fatura Ödemeleri',
      desc: 'Elektrik, su, doğalgaz, telefon, internet faturalarınızı otomatik ödeyin. Son ödeme tarihini kaçırmayın.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: HeartIcon,
      title: 'Sağlık Takibi',
      desc: 'MHRS randevuları, reçete takibi, ilaç hatırlatmaları, aşı takviminiz hep yanınızda.',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: HomeIcon,
      title: 'e-Devlet İşlemleri',
      desc: '8.000+ e-Devlet hizmetine tek tıkla erişim. Nüfus, tapu, ehliyet, ikametgah ve daha fazlası.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: DocumentTextIcon,
      title: 'Vergi ve SGK',
      desc: 'Motorlu taşıtlar vergisi, emlak vergisi, SGK prim borçları otomatik takip ve ödeme.',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      icon: CalendarIcon,
      title: 'Randevu Yönetimi',
      desc: 'Hastane, noter, pasaport randevularınızı tek yerden yönetin. Hatırlatma almayı unutmayın.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Güvenli ve Şifreli',
      desc: 'Tüm verileriniz 256-bit AES şifreleme ile korunur. Kimlik bilgileriniz bizde saklanmaz.',
      gradient: 'from-blue-500 to-indigo-500',
    },
  ]

  const voiceAssistant = [
    {
      scenario: 'Fatura Ödeme',
      userCommand: 'ADE, bugün hangi faturalarım var?',
      aiResponse: 'Bugün son ödeme tarihi olan 2 faturanız var: Elektrik faturası 385 TL ve internet faturası 150 TL. Toplam 535 TL. İstersen şimdi ödüyorum?',
      result: 'Sesli onayınızla faturalar anında ödenir',
    },
    {
      scenario: 'Sağlık Randevusu',
      userCommand: 'ADE, yarın randevum var mı?',
      aiResponse: 'Evet, yarın saat 14:30\'da Dr. Mehmet Yılmaz ile kardiyoloji randevunuz var. Ankara Şehir Hastanesi, 3. Blok, 2. Kat. Reçetelerinizi almayı unutmayın.',
      result: 'Randevu saatinden 1 saat önce hatırlatma',
    },
    {
      scenario: 'Vergi Takibi',
      userCommand: 'ADE, vergi borcum var mı?',
      aiResponse: 'Motorlu taşıtlar vergisi son ödeme tarihi 31 Ocak. 2.450 TL ödemeniz gerekiyor. Peşin öderseniz %5 indirim var, 2.327 TL olacak. Ödememi yapayım mı?',
      result: 'Otomatik ödeme ve indirim fırsatlarını kaçırmama',
    },
  ]

  const useCases = [
    {
      name: 'Fatma Teyze - Emekli - 68 Yaş',
      icon: '👵',
      problem: 'Elektrik, su, doğalgaz faturalarını geç ödüyor, gecikme faizi ödüyordu. MHRS\'den randevu alamıyor, ilaçlarını unutuyordu.',
      solution: 'ADE Sesli Asistan sayesinde tüm faturalar zamanında ödeniyor. Hastane randevuları otomatik alınıyor. İlaç saatlerinde sesli hatırlatma geliyor.',
      results: [
        'Sıfır gecikme faizi',
        'Tüm randevular zamanında',
        'İlaçları düzenli kullanıyor',
        'Aylık 200 TL tasarruf',
      ],
    },
    {
      name: 'Ahmet Bey - Memur - 45 Yaş',
      icon: '👨‍💼',
      problem: 'İş yoğunluğu nedeniyle kişisel işlerini halledemiyor. e-Devlet şifrelerini unutuyor, noter randevusu alamıyor.',
      solution: 'ADE tüm e-Devlet işlemlerini tek yerden yapıyor. Noter, pasaport randevuları otomatik alınıyor. Vergi ödemeleri zamanında yapılıyor.',
      results: [
        'Ayda 8 saat zaman tasarrufu',
        'Tüm işlemler tek yerden',
        'Hiçbir son tarihi kaçırmıyor',
        'Stres seviyesi düştü',
      ],
    },
    {
      name: 'Zeynep Hanım - Ev Hanımı - 38 Yaş',
      icon: '👩',
      problem: 'Çocukların aşı takvimleri, hastane randevuları, okul işleri karışıyor. Fatura ödeme günlerini unutuyor.',
      solution: 'ADE tüm aile bireylerinin takibini yapıyor. Çocukların aşı tarihleri, okul kayıt günleri hatırlatılıyor. Tüm faturalar otomatik ödeniyor.',
      results: [
        '3 çocuğun takibi zahmetsiz',
        'Tüm faturalar zamanında',
        'Aşı takvimleri düzenli',
        'Zihinsel yük azaldı',
      ],
    },
  ]

  const elderlyFeatures = [
    {
      title: 'Büyük Yazı ve Sesli Okuma',
      desc: 'Tüm metinler büyük puntolu gösterilir. İsterseniz ADE size sesli okur.',
      icon: PhoneIcon,
    },
    {
      title: 'Sesli Komut Desteği',
      desc: 'Ekrana dokunmadan, sadece konuşarak tüm işlemlerinizi yapabilirsiniz.',
      icon: BellAlertIcon,
    },
    {
      title: 'Basitleştirilmiş Arayüz',
      desc: 'Karmaşık menüler yok. Her şey tek ekranda, anlaşılır şekilde.',
      icon: UserCircleIcon,
    },
    {
      title: 'Akraba Bildirimi',
      desc: 'Önemli ödemelerde veya randevularda yakınlarınıza da bildirim gider.',
      icon: HeartIcon,
    },
  ]

  const pricing = {
    name: 'Vatandaş',
    price: '0',
    period: 'süresiz ücretsiz',
    description: 'Tüm vatandaşlar için tamamen ücretsiz',
    features: [
      'Sınırsız fatura ödeme',
      '8.000+ e-Devlet hizmeti',
      'MHRS entegrasyonu',
      'Vergi ve SGK takibi',
      'Sesli asistan',
      'Büyük yazı modu',
      'Akraba bildirimleri',
      'WhatsApp hatırlatmaları',
      'Email destek',
    ],
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/30 mb-8"
            >
              <HeartIcon className="w-5 h-5 text-pink-400" />
              <span className="text-white/90 font-medium">Her Yaştan Vatandaş İçin Ücretsiz</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Devlet İşleriniz</span>
              <br />
              <span className="text-gradient-amber-teal">Artık Çok Kolay</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Faturalarınızı, sağlık randevularınızı, vergi ödemelerinizi tek bir yerden yönetin.
              Sesli komutla, büyük yazıyla, sizin için tasarlandı.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link to="/kayit-ol" className="btn-primary text-lg">
                Hemen Ücretsiz Başla
              </Link>
              <Link to="#features" className="btn-secondary text-lg">
                Özellikleri Gör
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
                { value: '2.1M+', label: 'Vatandaş Kullanıcı' },
                { value: '450K', label: '65+ Yaş Kullanıcı' },
                { value: '%100', label: 'Ücretsiz' },
                { value: '4.9/5', label: 'Memnuniyet' },
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
              <span className="text-white">Neler </span>
              <span className="text-gradient-amber-teal">Yapabilirsiniz?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Tüm devlet işlemleriniz ve ödemeleriniz tek platformda
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

      {/* Voice Assistant */}
      <section className="section-padding bg-gradient-to-br from-amber-900/20 via-pink-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Sesli </span>
              <span className="text-gradient-purple-pink">Asistan</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Konuşarak her şeyi yapın. Yaşlılar için özel tasarlandı.
            </p>
          </motion.div>

          <div className="space-y-8">
            {voiceAssistant.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card-premium p-8"
              >
                <div className="mb-6">
                  <span className="px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold">
                    {item.scenario}
                  </span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-amber-400 font-semibold mb-2">Siz</div>
                      <div className="glass-card p-4 border-l-4 border-amber-500">
                        <p className="text-white/90 text-lg">{item.userCommand}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <BellAlertIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-teal-400 font-semibold mb-2">ADE Asistan</div>
                      <div className="glass-card p-4 border-l-4 border-teal-500">
                        <p className="text-white/90 text-lg">{item.aiResponse}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="font-medium">{item.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elderly Features */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Yaşlılar için </span>
              <span className="text-gradient-amber-teal">Özel Özellikler</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Teknolojiye yabancı olanlar için kullanımı kolaylaştıran özellikler
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {elderlyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-premium p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed text-lg">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Gerçek </span>
              <span className="text-gradient-purple-pink">Hikayeler</span>
            </h2>
            <p className="text-xl text-white/70">ADE hayatları nasıl kolaylaştırıyor</p>
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
                <div className="flex items-start gap-6 mb-8">
                  <div className="text-6xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-6">{useCase.name}</h3>
                    <div className="space-y-6">
                      <div className="glass-card p-6 border-l-4 border-red-500">
                        <span className="text-red-400 font-semibold mb-2 block">Sorun</span>
                        <p className="text-white/80 text-lg">{useCase.problem}</p>
                      </div>
                      <div className="glass-card p-6 border-l-4 border-teal-500">
                        <span className="text-teal-400 font-semibold mb-2 block">ADE Çözümü</span>
                        <p className="text-white/80 text-lg">{useCase.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  {useCase.results.map((result, rIndex) => (
                    <div key={rIndex} className="glass-card p-4 text-center">
                      <CheckCircleIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-white/80 text-sm">{result}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Tamamen </span>
              <span className="text-gradient-amber-teal">Ücretsiz</span>
            </h2>
            <p className="text-xl text-white/70">Tüm vatandaşlarımız için hiçbir ücret yok</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-premium p-12 border-2 border-green-500 shadow-2xl shadow-green-500/20"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">{pricing.name}</h3>
                <div className="mb-4">
                  <span className="text-6xl font-bold text-gradient-amber-teal">{pricing.price} TL</span>
                  <div className="text-white/60 mt-2">{pricing.period}</div>
                </div>
                <p className="text-white/70 text-lg">{pricing.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {pricing.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/kayit-ol" className="block w-full text-center btn-primary text-lg">
                Hemen Başla
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-amber-900/20 via-pink-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Hayatınızı </span>
              <span className="text-gradient-amber-teal">Kolaylaştırın</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              2.1 milyon vatandaş ADE kullanıyor. Siz de devlet işlemlerinizi kolaylaştırın.
            </p>
            <Link to="/kayit-ol" className="btn-primary text-lg px-12 py-6 inline-flex items-center gap-3">
              Hemen Ücretsiz Başla
            </Link>
            <p className="text-sm text-white/50 mt-6">
              Kayıt ücretsiz • Kredi kartı gerekmez • Dilediğiniz zaman iptal edebilirsiniz
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
