import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Users,
  Calculator,
  Shield,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  Lock,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const AnaSayfa = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'e-Fatura Yönetimi',
      description: 'e-Fatura oluşturun, gönderin ve takip edin. GİB entegrasyonu ile otomatik raporlama.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Users,
      title: 'SGK İşlemleri',
      description: 'Çalışan bordroları, SGK bildirimleri ve ödemeleri tek platformda yönetin.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      icon: Calculator,
      title: 'Vergi Hesaplama',
      description: 'KDV, Stopaj ve Gelir Vergisi hesaplamalarını otomatik yapın, beyannamelerinizi hazırlayın.',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
  ];

  const benefits = [
    'Güvenli ve KVKK uyumlu veri saklama',
    'Otomatik muhasebe kayıtları',
    '7/24 teknik destek',
    'Ücretsiz güncellemeler',
    'Mobil uygulama desteği',
    'API entegrasyonu',
  ];

  const stats = [
    { value: '10.000+', label: 'Aktif Kullanıcı' },
    { value: '500.000+', label: 'İşlem' },
    { value: '%99.9', label: 'Uptime' },
    { value: '4.8/5', label: 'Memnuniyet' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ADE Muhasebe</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/giris-yap')}
              >
                Giriş Yap
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/kayit-ol')}
              >
                Ücretsiz Başla
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptNDggNDhoMTJ2MTJIODR6bS00OCAwaDEydjEySDB6bTQ4LTQ4aDEydjEySDg0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Muhasebenizi Dijitalleştirin,
              <span className="block text-accent-400">Zamandan Kazanın</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              e-Fatura, SGK, vergi hesaplama ve daha fazlası. İşletmeniz için eksiksiz muhasebe çözümü.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                rightIcon={ArrowRight}
                onClick={() => navigate('/kayit-ol')}
                className="text-lg shadow-xl"
              >
                Ücretsiz Deneyin
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/giris-yap')}
                className="text-lg border-white text-white hover:bg-white/10"
              >
                Giriş Yap
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>256-bit SSL Şifreleme</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>KVKK Uyumlu</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>GİB Onaylı</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              İhtiyacınız Olan Her Şey Tek Platformda
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Muhasebe süreçlerinizi kolaylaştıran profesyonel araçlar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover padding="lg" className="h-full">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Neden ADE Muhasebe?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                İşletmenizin büyümesine odaklanırken, muhasebe işlemlerinizi bize bırakın.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-primary-100">
                <TrendingUp className="h-10 w-10 text-primary-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Hızlı İşlem</h3>
                <p className="text-sm text-gray-600">Otomatik süreçlerle %70 zaman tasarrufu</p>
              </Card>

              <Card padding="lg" className="bg-gradient-to-br from-secondary-50 to-secondary-100">
                <Clock className="h-10 w-10 text-secondary-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">7/24 Erişim</h3>
                <p className="text-sm text-gray-600">İstediğiniz zaman, her yerden</p>
              </Card>

              <Card padding="lg" className="bg-gradient-to-br from-accent-50 to-accent-100">
                <Shield className="h-10 w-10 text-accent-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Güvenli</h3>
                <p className="text-sm text-gray-600">Bankacılık seviyesinde güvenlik</p>
              </Card>

              <Card padding="lg" className="bg-gradient-to-br from-purple-50 to-purple-100">
                <Award className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Ödüllü</h3>
                <p className="text-sm text-gray-600">En iyi muhasebe yazılımı 2025</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hemen Başlayın, 14 Gün Ücretsiz Deneyin
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Kredi kartı gerekmez. İstediğiniz zaman iptal edebilirsiniz.
            </p>
            <Button
              size="lg"
              variant="secondary"
              rightIcon={ArrowRight}
              onClick={() => navigate('/kayit-ol')}
              className="text-lg shadow-xl"
            >
              Ücretsiz Hesap Oluştur
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">ADE Muhasebe</span>
              </div>
              <p className="text-sm text-gray-400">
                İşletmeniz için modern muhasebe çözümleri.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Ürünler</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">e-Fatura</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SGK İşlemleri</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vergi Hesaplama</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Şirket</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Yasal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a></li>
                <li><a href="#" className="hover:text-white transition-colors">KVKK</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 ADE Muhasebe. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnaSayfa;
