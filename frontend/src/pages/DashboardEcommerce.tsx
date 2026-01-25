import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingBagIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  BellAlertIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import DashboardLayout from '../layouts/DashboardLayout'

export default function DashboardEcommerce() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  // E-ticaret platformları
  const platforms = [
    {
      id: 'hepsiburada',
      name: 'Hepsiburada',
      logo: '🛍️',
      color: 'from-orange-500 to-red-500',
      status: 'active',
      orders: 847,
      revenue: '₺2,847,500',
      growth: '+18%',
    },
    {
      id: 'trendyol',
      name: 'Trendyol',
      logo: '🛒',
      color: 'from-orange-600 to-amber-500',
      status: 'active',
      orders: 1243,
      revenue: '₺4,231,800',
      growth: '+24%',
    },
    {
      id: 'n11',
      name: 'N11',
      logo: '🏪',
      color: 'from-purple-500 to-pink-500',
      status: 'active',
      orders: 432,
      revenue: '₺1,147,200',
      growth: '+12%',
    },
    {
      id: 'amazon',
      name: 'Amazon TR',
      logo: '📦',
      color: 'from-yellow-600 to-orange-600',
      status: 'active',
      orders: 567,
      revenue: '₺1,892,300',
      growth: '+31%',
    },
  ]

  // Güncel siparişler
  const recentOrders = [
    {
      id: 'ORD-2024-8472',
      platform: 'hepsiburada',
      customer: 'Mehmet Yılmaz',
      product: 'Kablosuz Kulaklık Pro X',
      amount: '₺1,899',
      status: 'preparing',
      time: '5 dk önce',
    },
    {
      id: 'ORD-2024-8471',
      platform: 'trendyol',
      customer: 'Ayşe Kaya',
      product: 'Akıllı Saat Series 7',
      amount: '₺3,499',
      status: 'shipped',
      time: '12 dk önce',
    },
    {
      id: 'ORD-2024-8470',
      platform: 'n11',
      customer: 'Ali Demir',
      product: 'Gaming Mouse RGB',
      amount: '₺599',
      status: 'delivered',
      time: '18 dk önce',
    },
    {
      id: 'ORD-2024-8469',
      platform: 'amazon',
      customer: 'Zeynep Arslan',
      product: 'Mekanik Klavye',
      amount: '₺1,299',
      status: 'preparing',
      time: '25 dk önce',
    },
  ]

  // AI Öneriler
  const aiSuggestions = [
    {
      type: 'price',
      title: 'Fiyat Optimizasyonu',
      description: '"Kablosuz Kulaklık Pro X" ürününüzün fiyatını ₺1,899\'dan ₺1,749\'a düşürürseniz satışlar %34 artabilir.',
      impact: 'Yüksek',
      action: 'Fiyatı Güncelle',
    },
    {
      type: 'stock',
      title: 'Stok Uyarısı',
      description: '"Gaming Mouse RGB" stoku kritik seviyede (3 adet). Acil tedarik gerekli.',
      impact: 'Kritik',
      action: 'Stok Ekle',
    },
    {
      type: 'marketing',
      title: 'Kampanya Önerisi',
      description: 'Trendyol\'da "Elektronik" kategorisinde %20 indirim kampanyası başlatın. Tahmini ek gelir: ₺125,000',
      impact: 'Orta',
      action: 'Kampanya Başlat',
    },
    {
      type: 'shipping',
      title: 'Kargo Optimizasyonu',
      description: 'Hepsiburada siparişlerinizde "Aynı Gün Teslimat" aktif ederseniz dönüşüm %18 artabilir.',
      impact: 'Yüksek',
      action: 'Aktif Et',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Hazırlanıyor'
      case 'shipped':
        return 'Kargoda'
      case 'delivered':
        return 'Teslim Edildi'
      case 'cancelled':
        return 'İptal'
      default:
        return status
    }
  }

  const getPlatformLogo = (platformId: string) => {
    return platforms.find(p => p.id === platformId)?.logo || '🛍️'
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                <ShoppingBagIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">E-Ticaret Yönetimi</h1>
                <p className="text-white/60 text-sm">Tüm platformlarınızı tek yerden yönetin</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Senkronize Et
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <SparklesIcon className="w-5 h-5" />
              AI Analiz
            </motion.button>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 cursor-pointer"
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`text-4xl`}>{platform.logo}</div>
                <div className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                  <span className="text-green-400 text-xs font-medium">Aktif</span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{platform.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Sipariş</span>
                  <span className="text-white font-semibold">{platform.orders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Ciro</span>
                  <span className="text-white font-semibold">{platform.revenue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{platform.growth}</span>
                  <span className="text-white/60 text-xs">bu ay</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <ShoppingBagIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Toplam Sipariş</p>
                <p className="text-white text-2xl font-bold">3,089</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm font-medium">+28%</span>
              <span className="text-white/60 text-xs">Geçen aya göre</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Toplam Ciro</p>
                <p className="text-white text-2xl font-bold">₺10.1M</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm font-medium">+21%</span>
              <span className="text-white/60 text-xs">Geçen aya göre</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TruckIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Kargoda</p>
                <p className="text-white text-2xl font-bold">487</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Ortalama 2.3 gün</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Dönüşüm Oranı</p>
                <p className="text-white text-2xl font-bold">%12.8</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm font-medium">+3.2%</span>
              <span className="text-white/60 text-xs">Geçen aya göre</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Son Siparişler</h2>
              <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                Tümünü Gör
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getPlatformLogo(order.platform)}</span>
                      <div>
                        <p className="text-white font-medium">{order.id}</p>
                        <p className="text-white/60 text-sm">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{order.amount}</p>
                      <p className="text-white/60 text-xs">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/80 text-sm">{order.product}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white">AI Önerileri</h2>
            </div>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-sm">{suggestion.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      suggestion.impact === 'Kritik' ? 'bg-red-500/20 text-red-400' :
                      suggestion.impact === 'Yüksek' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {suggestion.impact}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs mb-3">{suggestion.description}</p>
                  <button className="w-full py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 text-sm font-medium transition-all">
                    {suggestion.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
