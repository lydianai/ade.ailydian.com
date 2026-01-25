import { useState } from 'react'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'

interface Integration {
  id: string
  name: string
  icon: string
  category: 'devlet' | 'gib' | 'sgk' | 'eticaret' | 'diger'
  status: 'active' | 'inactive' | 'pending'
  description: string
  features: string[]
  roadmapPhase: number
}

export default function DashboardIntegrations() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const integrations: Integration[] = [
    // E-Ticaret Platformları (Aktif)
    {
      id: 'hepsiburada',
      name: 'Hepsiburada',
      icon: '🛍️',
      category: 'eticaret',
      status: 'pending',
      description: 'Sipariş yönetimi, ürün senkronizasyonu, stok takibi',
      features: ['Sipariş Yönetimi', 'Ürün Senkronizasyonu', 'Stok Takibi', 'Fatura Entegrasyonu'],
      roadmapPhase: 2,
    },
    {
      id: 'trendyol',
      name: 'Trendyol',
      icon: '🛒',
      category: 'eticaret',
      status: 'pending',
      description: 'Satış analizi, kampanya yönetimi, kargo takibi',
      features: ['Satış Analizi', 'Kampanya Yönetimi', 'Kargo Takibi', 'İade Süreçleri'],
      roadmapPhase: 2,
    },
    {
      id: 'n11',
      name: 'N11',
      icon: '🏪',
      category: 'eticaret',
      status: 'inactive',
      description: 'Çoklu platform yönetimi, otomatik fiyatlandırma',
      features: ['Çoklu Platform', 'Otomatik Fiyat', 'Stok Senkronizasyonu', 'Raporlama'],
      roadmapPhase: 3,
    },
    {
      id: 'amazon',
      name: 'Amazon TR',
      icon: '📦',
      category: 'eticaret',
      status: 'inactive',
      description: 'FBA entegrasyonu, global satış yönetimi',
      features: ['FBA Yönetimi', 'Global Satış', 'Envanter Takibi', 'Müşteri İletişimi'],
      roadmapPhase: 3,
    },

    // Faz 1 - Temel Altyapı (Tamamlandı)
    {
      id: 'edevlet',
      name: 'e-Devlet',
      icon: '🏛️',
      category: 'devlet',
      status: 'pending',
      description: 'Kimlik doğrulama, nüfus, adres, araç bilgileri',
      features: ['OAuth2 Giriş', 'Nüfus Bilgileri', 'Adres Sorgulama', 'Araç Bilgileri'],
      roadmapPhase: 2,
    },
    {
      id: 'gib',
      name: 'GİB (Gelir İdaresi)',
      icon: '💼',
      category: 'gib',
      status: 'pending',
      description: 'e-Fatura, e-Arşiv, e-Defter, vergi beyannameleri',
      features: ['e-Fatura Gönder/Al', 'e-Arşiv Oluştur', 'Vergi Borcu', 'Beyanname'],
      roadmapPhase: 2,
    },
    {
      id: 'sgk',
      name: 'SGK',
      icon: '🏥',
      category: 'sgk',
      status: 'pending',
      description: 'Sigorta gün sayısı, emeklilik, prim bildirimi',
      features: ['Sigorta Gün', 'Emeklilik Hesaplama', 'Prim Bildirimi', 'İşe Giriş/Çıkış'],
      roadmapPhase: 3,
    },

    // Faz 2-3 (Ay 3-9)
    {
      id: 'mersis',
      name: 'MERSİS',
      icon: '🏢',
      category: 'diger',
      status: 'inactive',
      description: 'Şirket kuruluşu, ticari sicil işlemleri',
      features: ['Şirket Kuruluşu', 'Ticari Sicil', 'İmza Sirküleri'],
      roadmapPhase: 3,
    },
    {
      id: 'uyap',
      name: 'UYAP',
      icon: '⚖️',
      category: 'diger',
      status: 'inactive',
      description: 'Dava takibi, icra dosyaları',
      features: ['Dava Sorgulama', 'İcra Dosyası', 'Duruşma Takvimi'],
      roadmapPhase: 3,
    },
    {
      id: 'eimza',
      name: 'e-İmza',
      icon: '✍️',
      category: 'diger',
      status: 'inactive',
      description: 'Dijital imza, belge onaylama',
      features: ['Belge İmzalama', 'Toplu İmza', 'İmza Doğrulama'],
      roadmapPhase: 2,
    },
    {
      id: 'mhrs',
      name: 'MHRS',
      icon: '🩺',
      category: 'diger',
      status: 'inactive',
      description: 'Sağlık randevusu, reçete sorgulama',
      features: ['Randevu Al', 'Reçete Sorgulama', 'Tahlil Sonuçları'],
      roadmapPhase: 3,
    },
    {
      id: 'acikveri',
      name: 'Açık Veri',
      icon: '📊',
      category: 'diger',
      status: 'inactive',
      description: 'Kamu veri setleri, istatistikler',
      features: ['Ekonomik Veriler', 'Nüfus İstatistikleri', 'İhale Verileri'],
      roadmapPhase: 4,
    },

    // Faz 4 (Ay 9-12)
    {
      id: 'tapu',
      name: 'Tapu Kadastro',
      icon: '🏠',
      category: 'diger',
      status: 'inactive',
      description: 'Tapu sorgulama, kadastro bilgileri',
      features: ['Tapu Sorgu', 'İmar Durumu', 'Arsa/Arazi Değeri'],
      roadmapPhase: 4,
    },
    {
      id: 'gumruk',
      name: 'Gümrükler',
      icon: '🚢',
      category: 'diger',
      status: 'inactive',
      description: 'İthalat/ihracat işlemleri',
      features: ['Beyanname', 'Antrepo Takibi', 'Gümrük Vergisi'],
      roadmapPhase: 4,
    },
  ]

  const categories = [
    { id: 'all', name: 'Tümü', icon: BuildingOffice2Icon },
    { id: 'eticaret', name: 'E-Ticaret', icon: ShoppingBagIcon },
    { id: 'devlet', name: 'e-Devlet', icon: ShieldCheckIcon },
    { id: 'gib', name: 'GİB', icon: DocumentTextIcon },
    { id: 'sgk', name: 'SGK', icon: UserGroupIcon },
    { id: 'diger', name: 'Diğer', icon: CheckCircleIcon },
  ]

  const filteredIntegrations =
    selectedCategory === 'all'
      ? integrations
      : integrations.filter((i) => i.category === selectedCategory)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'inactive':
        return <XCircleIcon className="w-5 h-5 text-gray-500" />
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-amber-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif'
      case 'inactive':
        return 'Gelecek'
      case 'pending':
        return 'Geliştiriliyor'
      default:
        return ''
    }
  }

  const getPhaseText = (phase: number) => {
    switch (phase) {
      case 1:
        return 'Faz 1 (Tamamlandı)'
      case 2:
        return 'Faz 2 (Ay 3-6)'
      case 3:
        return 'Faz 3 (Ay 6-9)'
      case 4:
        return 'Faz 4 (Ay 9-12)'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4 px-8 pt-8">
          <BackButton />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-amber-teal mb-3">
            Entegrasyonlar
          </h1>
          <p className="text-white/60 text-lg">
            18 bakanlık ve kurum entegrasyonu. Tek platformdan tüm devlet işlemleri.
          </p>
        </div>

        {/* Roadmap Progress */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Geliştirme Yol Haritası</h3>
            <div className="flex items-center gap-2 text-white/60">
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              <span>Faz 2 - Aktif Geliştirme</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { phase: 1, name: 'Altyapı', status: 'completed', progress: 100 },
              { phase: 2, name: 'e-Devlet + GİB', status: 'active', progress: 35 },
              { phase: 3, name: 'SGK + Diğer', status: 'planned', progress: 0 },
              { phase: 4, name: '18 Bakanlık', status: 'planned', progress: 0 },
            ].map((item) => (
              <div
                key={item.phase}
                className={`p-4 rounded-xl border ${
                  item.status === 'completed'
                    ? 'border-green-500/30 bg-green-500/10'
                    : item.status === 'active'
                      ? 'border-amber-500/30 bg-amber-500/10'
                      : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="text-sm text-white/60 mb-1">Faz {item.phase}</div>
                <div className="font-bold text-white mb-2">{item.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-white/60">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                  : 'glass-card text-white/60 hover:text-white'
              }`}
            >
              <category.icon className="w-5 h-5" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 hover:scale-105 transition-transform"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{integration.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                    <p className="text-sm text-white/60">{getPhaseText(integration.roadmapPhase)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(integration.status)}
                  <span className="text-sm text-white/60">{getStatusText(integration.status)}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4">{integration.description}</p>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-xs text-white/50 font-semibold uppercase mb-2">Özellikler:</p>
                {integration.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-teal-500" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              {integration.status === 'pending' && (
                <button className="w-full mt-4 btn-primary">
                  API Dokümanlarını İncele
                </button>
              )}
              {integration.status === 'active' && (
                <button className="w-full mt-4 btn-primary">
                  Kullanmaya Başla
                </button>
              )}
              {integration.status === 'inactive' && (
                <button className="w-full mt-4 btn-secondary cursor-not-allowed opacity-50">
                  Yakında Gelecek
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
