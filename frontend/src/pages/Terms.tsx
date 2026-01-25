import { motion } from 'framer-motion'
import { DocumentTextIcon, ScaleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Terms() {
  const sections = [
    {
      title: '1. Hizmet Kapsamı',
      content: 'ADE, yapay zeka destekli devlet işlemleri otomasyonu platformudur. e-Fatura, e-Defter, beyanname hazırlama, GİB/SGK entegrasyonları, stok yönetimi ve muhasebe hizmetleri sunar. Hizmetler "olduğu gibi" sunulur, kullanıcı sorumluluğundadır.',
    },
    {
      title: '2. Kullanıcı Yükümlülükleri',
      content: 'Hesap güvenliğini sağlamak, doğru bilgi girmek, yasal düzenlemelere uymak, hizmeti kötüye kullanmamak, üçüncü kişi haklarını ihlal etmemek kullanıcının sorumluluğundadır. Hesap bilgilerinizi kimseyle paylaşmayın.',
    },
    {
      title: '3. Fiyatlandırma ve Ödeme',
      content: 'Ücretsiz plan sınırlı özelliklere sahiptir. Ücretli planlar aylık veya yıllık ödenebilir. Yıllık ödemede %20 indirim uygulanır. Fiyatlar KDV dahildir. Ödeme kredi kartı veya banka havalesi ile yapılır. Fiyat değişiklikleri 30 gün önceden bildirilir.',
    },
    {
      title: '4. İptal ve İade',
      content: '14 günlük deneme süresi içinde iptal tamamen ücretsizdir. Ücretli abonelikler ay sonunda iptal edilir, o ay için ücret iadesi yapılmaz. Yıllık ödemeler ilk 30 günde %50 iade, sonrasında iade yapılmaz. İptal işlemi panel üzerinden yapılabilir.',
    },
    {
      title: '5. Hizmet Kesintisi ve SLA',
      content: 'Hedef uptime %99.5\'tir. Planlanmış bakımlar önceden duyurulur. Planlanmamış kesintilerde telafi edilir. Enterprise planlar %99.95 SLA garantisi içerir. Veri kaybı durumunda son 7 günlük yedekten geri yükleme yapılır.',
    },
    {
      title: '6. Fikri Mülkiyet',
      content: 'ADE platformu, logosu, içeriği ve yazılımları ADE Teknoloji A.Ş.\'ye aittir. Kullanıcılar lisans hakkı alır, mülkiyet devredilmez. Ters mühendislik, kopyalama, çoğaltma yasaktır. Kullanıcı verileri kullanıcıya aittir, ADE sadece işleme yetkisine sahiptir.',
    },
    {
      title: '7. Gizlilik ve Veri Koruma',
      content: 'Kişisel veriler KVKK ve GDPR\'a uygun işlenir. Detaylar için KVKK Politikamızı okuyun. Veriler ISO 27001 sertifikalı veri merkezlerinde saklanır. Üçüncü taraflarla paylaşımlar açıkça bildirilir. Kullanıcı isterse verileri silinir veya export edilir.',
    },
    {
      title: '8. Sorumluluk Sınırları',
      content: 'ADE, kullanıcı hatalarından sorumlu değildir. Vergi/SGK cezaları kullanıcı sorumluluğundadır. Üçüncü parti entegrasyonların kesintisinden sorumlu değiliz. Force majeure durumlarında sorumluluk söz konusu değildir. Maksimum tazminat son 12 ayda ödenen ücret kadardır.',
    },
    {
      title: '9. Uyuşmazlık Çözümü',
      content: 'İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir. Türk Hukuku uygulanır. Önce dostane çözüm aranır, 30 gün içinde çözülmezse dava yoluna gidilir. Tüketici hakem heyetlerine başvuru hakkı saklıdır.',
    },
    {
      title: '10. Değişiklikler',
      content: 'Şartlar önceden bildirilmek kaydıyla değiştirilebilir. Önemli değişiklikler email ile bildirilir. 15 gün içinde itiraz edilmezse kabul edilmiş sayılır. Güncel versiyonu ade.gov.tr/terms adresinde bulabilirsiniz. Son güncelleme: 15 Ocak 2026.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Kullanım </span>
              <span className="text-gradient-amber-teal">Şartları</span>
            </h1>
            <p className="text-xl text-white/70">ADE platformunu kullanırken geçerli olan şartlar</p>
            <p className="text-sm text-white/50 mt-4">Son güncelleme: 15 Ocak 2026</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card-premium p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-white/80 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card-premium p-12 text-center max-w-3xl mx-auto mt-16">
            <ScaleIcon className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Sorularınız mı Var?</h2>
            <p className="text-xl text-white/70 mb-6">Kullanım şartları hakkında destek alın</p>
            <p className="text-white/80">Email: hukuk@ade.gov.tr</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
