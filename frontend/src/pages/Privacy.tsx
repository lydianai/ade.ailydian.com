import { motion } from 'framer-motion'
import { ShieldCheckIcon, LockClosedIcon, EyeSlashIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
  const sections = [
    {
      title: '1. Veri Sorumlusu',
      content: 'ADE Teknoloji A.Ş. ("ADE", "Biz"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusudur. Merkez adresimiz: Maslak Mahallesi, Teknoloji Cd. No:12, 34398 Sarıyer/İstanbul. İletişim: kvkk@ade.gov.tr',
    },
    {
      title: '2. Toplanan Kişisel Veriler',
      content: 'Kimlik bilgileri (ad, soyad, TC kimlik no), iletişim bilgileri (email, telefon, adres), finansal bilgiler (banka hesap no, vergi no), işlem bilgileri (fatura, beyanname verileri), teknik veriler (IP adresi, çerez bilgileri, cihaz bilgileri), konum bilgileri.',
    },
    {
      title: '3. Kişisel Verilerin İşlenme Amaçları',
      content: 'Hizmet sunumu ve sözleşme yükümlülüklerinin yerine getirilmesi, yasal yükümlülüklerin yerine getirilmesi (GİB, SGK bildirimleri), güvenlik ve dolandırıcılık önleme, müşteri ilişkileri yönetimi, ürün geliştirme ve analiz, pazarlama faaliyetleri (açık rıza ile).',
    },
    {
      title: '4. Kişisel Verilerin Aktarımı',
      content: 'Verileriniz yalnızca gerekli durumlarda aktarılır: Kamu kurumları (GİB, SGK, MERSIS, e-Devlet), hizmet sağlayıcılar (bulut altyapı, ödeme sistemleri), iş ortakları (entegrasyon sağlayıcıları), yurt dışı aktarım sadece KVKK\'ya uygun şekilde yapılır.',
    },
    {
      title: '5. Veri Güvenliği',
      content: '256-bit AES şifreleme, ISO 27001 sertifikalı veri merkezleri, düzenli güvenlik denetimleri ve penetrasyon testleri, erişim kontrolü ve yetkilendirme sistemi, otomatik yedekleme ve felaket kurtarma planı, çalışan eğitimleri ve gizlilik sözleşmeleri.',
    },
    {
      title: '6. Veri Saklama Süreleri',
      content: 'Muhasebe kayıtları: 10 yıl (Vergi Usul Kanunu), kimlik ve iletişim bilgileri: sözleşme süresi + 10 yıl, pazarlama verileri: rıza geri alınana kadar, log kayıtları: 2 yıl, diğer veriler: işleme amacının gerekli kıldığı süre.',
    },
    {
      title: '7. KVKK Haklar',
      content: 'Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK\'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme.',
    },
    {
      title: '8. Başvuru Yöntemi',
      content: 'KVKK haklarınızı kullanmak için kvkk@ade.gov.tr adresine veya Maslak Mahallesi, Teknoloji Cd. No:12, 34398 Sarıyer/İstanbul adresine kimliğinizi tespit edici belgelerle başvurabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanır.',
    },
    {
      title: '9. Çerez Politikası',
      content: 'Web sitemizde zorunlu çerezler, performans çerezleri, fonksiyonel çerezler ve reklam çerezleri kullanılmaktadır. Detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.',
    },
    {
      title: '10. Politika Güncellemeleri',
      content: 'Bu politika mevzuat değişiklikleri veya hizmet geliştirmelerine bağlı olarak güncellenebilir. Önemli değişiklikler email ile bildirilir. Son güncelleme: 15 Ocak 2026.',
    },
  ]

  const principles = [
    {
      icon: LockClosedIcon,
      title: 'Hukuka ve Dürüstlük Kuralına Uygun İşleme',
      desc: 'Tüm veri işleme faaliyetlerimiz KVKK ve ilgili mevzuata tam uyumludur.',
    },
    {
      icon: DocumentTextIcon,
      title: 'Doğru ve Güncel Tutma',
      desc: 'Kişisel verilerinizin doğru ve güncel olmasını sağlıyoruz.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Belirli, Açık ve Meşru Amaçlar',
      desc: 'Verileriniz sadece belirtilen amaçlar için işlenir.',
    },
    {
      icon: EyeSlashIcon,
      title: 'Sınırlı ve Ölçülü İşleme',
      desc: 'Sadece gerekli veriler toplanır ve işlenir.',
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
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">KVKK </span>
              <span className="text-gradient-amber-teal">Gizlilik Politikası</span>
            </h1>
            <p className="text-xl text-white/70">
              Kişisel verilerinizin korunması bizim için önceliktir
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                KVKK Uyumlu
              </span>
              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold">
                ISO 27001
              </span>
              <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold">
                GDPR Uyumlu
              </span>
            </div>
          </motion.div>

          {/* Principles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <principle.icon className="w-10 h-10 text-teal-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2 text-sm">{principle.title}</h3>
                <p className="text-white/60 text-xs">{principle.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card-premium p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-premium p-12 text-center max-w-3xl mx-auto mt-16"
          >
            <ShieldCheckIcon className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">KVKK Başvuruları</h2>
            <p className="text-xl text-white/70 mb-6">
              Kişisel verilerinizle ilgili sorularınız için
            </p>
            <div className="space-y-2 text-white/80">
              <p>Email: kvkk@ade.gov.tr</p>
              <p>Adres: Maslak Mah., Teknoloji Cd. No:12, 34398 Sarıyer/İstanbul</p>
              <p className="text-sm text-white/50 mt-4">Başvurular 30 gün içinde yanıtlanır</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
