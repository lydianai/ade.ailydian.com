import { useState } from 'react'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentTextIcon,
  BanknotesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

interface TimeRange {
  label: string
  value: 'day' | 'week' | 'month' | 'year'
}

interface MetricCard {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: any
  color: string
}

export default function DashboardAnalytics() {
  const [selectedRange, setSelectedRange] = useState<'day' | 'week' | 'month' | 'year'>('month')

  const timeRanges: TimeRange[] = [
    { label: 'Günlük', value: 'day' },
    { label: 'Haftalık', value: 'week' },
    { label: 'Aylık', value: 'month' },
    { label: 'Yıllık', value: 'year' },
  ]

  const metrics: MetricCard[] = [
    {
      title: 'Toplam Gelir',
      value: '₺845,230',
      change: 12.5,
      trend: 'up',
      icon: BanknotesIcon,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Kesilen Fatura',
      value: '1,247',
      change: 8.2,
      trend: 'up',
      icon: DocumentTextIcon,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      title: 'Aktif Müşteri',
      value: '892',
      change: -3.1,
      trend: 'down',
      icon: UserGroupIcon,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Ortalama Fatura',
      value: '₺677',
      change: 15.8,
      trend: 'up',
      icon: ChartBarIcon,
      color: 'from-blue-500 to-indigo-500',
    },
  ]

  // Mock chart data for revenue
  const revenueData = [
    { month: 'Oca', value: 65000 },
    { month: 'Şub', value: 72000 },
    { month: 'Mar', value: 68000 },
    { month: 'Nis', value: 85000 },
    { month: 'May', value: 92000 },
    { month: 'Haz', value: 88000 },
    { month: 'Tem', value: 95000 },
    { month: 'Ağu', value: 102000 },
    { month: 'Eyl', value: 98000 },
    { month: 'Eki', value: 110000 },
    { month: 'Kas', value: 105000 },
    { month: 'Ara', value: 120000 },
  ]

  const maxRevenue = Math.max(...revenueData.map((d) => d.value))

  // Mock chart data for invoices
  const invoiceData = [
    { month: 'Oca', value: 95 },
    { month: 'Şub', value: 102 },
    { month: 'Mar', value: 98 },
    { month: 'Nis', value: 115 },
    { month: 'May', value: 122 },
    { month: 'Haz', value: 118 },
    { month: 'Tem', value: 125 },
    { month: 'Ağu', value: 132 },
    { month: 'Eyl', value: 128 },
    { month: 'Eki', value: 140 },
    { month: 'Kas', value: 135 },
    { month: 'Ara', value: 150 },
  ]

  const maxInvoices = Math.max(...invoiceData.map((d) => d.value))

  // Top customers
  const topCustomers = [
    { name: 'ABC Teknoloji A.Ş.', revenue: '₺125,430', invoices: 45, growth: 23 },
    { name: 'XYZ Ltd. Şti.', revenue: '₺98,250', invoices: 38, growth: 15 },
    { name: 'DEF İnşaat', revenue: '₺87,900', invoices: 32, growth: 31 },
    { name: 'GHI Danışmanlık', revenue: '₺76,540', invoices: 28, growth: -5 },
    { name: 'JKL Perakende', revenue: '₺65,320', invoices: 24, growth: 12 },
  ]

  // Invoice status distribution
  const invoiceStatus = [
    { status: 'Onaylandı', count: 856, percentage: 68.7, color: 'bg-green-500' },
    { status: 'Beklemede', count: 234, percentage: 18.8, color: 'bg-amber-500' },
    { status: 'Taslak', count: 102, percentage: 8.2, color: 'bg-blue-500' },
    { status: 'Reddedildi', count: 55, percentage: 4.4, color: 'bg-red-500' },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4 px-8 pt-8">
          <BackButton />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analitik Raporlar</h1>
            <p className="text-white/60">Detaylı iş performansı ve gelir analizi</p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 glass-card p-2 rounded-xl">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  selectedRange === range.value
                    ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10`}
              />

              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      metric.trend === 'up'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {metric.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                  </div>
                </div>

                <h3 className="text-white/60 text-sm mb-1">{metric.title}</h3>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Gelir Trendi</h2>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4" />
                <span>+18.2% bu ay</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-2 h-64">
              {revenueData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.5 + idx * 0.05, duration: 0.5 }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="relative w-full group">
                    <div className="w-full bg-gradient-to-t from-amber-500 to-teal-500 rounded-t-lg transition-all hover:opacity-80" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="glass-card px-3 py-2 whitespace-nowrap">
                        <p className="text-xs text-white/60">{item.month}</p>
                        <p className="text-sm font-bold text-white">
                          ₺{item.value.toLocaleString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex gap-2 mt-2">
              {revenueData.map((item, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <span className="text-xs text-white/40">{item.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Invoice Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Fatura Sayısı</h2>
              <div className="flex items-center gap-2 text-teal-400 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4" />
                <span>+12.5% bu ay</span>
              </div>
            </div>

            {/* Line Chart */}
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 600 256" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 64}
                    x2="600"
                    y2={i * 64}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                ))}

                {/* Area fill */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                  d={`
                    M 0 ${256 - (invoiceData[0].value / maxInvoices) * 256}
                    ${invoiceData
                      .slice(1)
                      .map(
                        (item, idx) =>
                          `L ${((idx + 1) * 600) / (invoiceData.length - 1)} ${
                            256 - (item.value / maxInvoices) * 256
                          }`
                      )
                      .join(' ')}
                    L 600 256
                    L 0 256
                    Z
                  `}
                  fill="url(#areaGradient)"
                />

                {/* Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                  d={`
                    M 0 ${256 - (invoiceData[0].value / maxInvoices) * 256}
                    ${invoiceData
                      .slice(1)
                      .map(
                        (item, idx) =>
                          `L ${((idx + 1) * 600) / (invoiceData.length - 1)} ${
                            256 - (item.value / maxInvoices) * 256
                          }`
                      )
                      .join(' ')}
                  `}
                  fill="none"
                  stroke="rgb(20, 184, 166)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points */}
                {invoiceData.map((item, idx) => (
                  <motion.circle
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    cx={(idx * 600) / (invoiceData.length - 1)}
                    cy={256 - (item.value / maxInvoices) * 256}
                    r="5"
                    fill="rgb(20, 184, 166)"
                    className="cursor-pointer hover:r-7 transition-all"
                  />
                ))}
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="flex gap-2 mt-2">
              {invoiceData.map((item, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <span className="text-xs text-white/40">{item.month}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">En İyi Müşteriler</h2>

            <div className="space-y-4">
              {topCustomers.map((customer, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">{customer.name}</p>
                      <p className="text-sm text-white/60">{customer.invoices} fatura</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-white">{customer.revenue}</p>
                    <div
                      className={`flex items-center gap-1 justify-end ${
                        customer.growth >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {customer.growth >= 0 ? (
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-3 h-3" />
                      )}
                      <span className="text-xs">{Math.abs(customer.growth)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Invoice Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Fatura Durum Dağılımı</h2>

            <div className="space-y-4">
              {invoiceStatus.map((status, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${status.color}`} />
                      <span className="text-white font-medium">{status.status}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/60 text-sm">{status.count} adet</span>
                      <span className="text-white font-bold">{status.percentage}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${status.percentage}%` }}
                      transition={{ delay: 0.9 + idx * 0.1, duration: 0.8 }}
                      className={`h-full ${status.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Toplam Fatura</span>
                <span className="text-2xl font-bold text-white">
                  {invoiceStatus.reduce((sum, s) => sum + s.count, 0).toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
