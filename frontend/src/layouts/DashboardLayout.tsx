import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../contexts/useAuthStore'
import NotificationCenter from '../components/NotificationCenter'
import UserMenu from '../components/UserMenu'
import { useWebSocket } from '../hooks/useWebSocket'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { cikisYap } = useAuthStore()

  // Real-time WebSocket connection
  const { isConnected } = useWebSocket()

  const handleLogout = async () => {
    await cikisYap()
    navigate('/giris-yap')
  }

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/panel' },
    { icon: SparklesIcon, label: 'AI Asistan', path: '/panel/ai-asistan' },
    { icon: BuildingOffice2Icon, label: 'Entegrasyonlar', path: '/panel/entegrasyonlar' },
    { icon: ShoppingBagIcon, label: 'E-Ticaret', path: '/panel/e-ticaret' },
    { icon: DocumentTextIcon, label: 'Faturalar', path: '/panel/faturalar' },
    { icon: UserGroupIcon, label: 'Müşteriler', path: '/panel/musteriler' },
    { icon: BanknotesIcon, label: 'Ödemeler', path: '/panel/odemeler' },
    { icon: ChartBarIcon, label: 'Raporlar', path: '/panel/raporlar' },
    { icon: Cog6ToothIcon, label: 'Ayarlar', path: '/panel/ayarlar' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card m-4 mb-0 px-4 sm:px-6 py-4"
        style={{ zIndex: 100 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gradient-amber-teal">ADE</h1>
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Canlı' : 'Bağlantı Kesildi'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationCenter />
            <UserMenu />
          </div>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-16 sm:w-20 md:w-64 glass-card m-4 mt-0 p-2 md:p-6 flex flex-col overflow-y-auto"
        >
          <div className="mb-4 md:mb-6 hidden md:block">
            <div className="h-4" />
          </div>

          <nav className="space-y-1 md:space-y-2 flex-1">
            {menuItems.map((item, i) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="hidden md:block font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-white/10 pt-4 mt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
              title="Çıkış Yap"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:block font-medium">Çıkış Yap</span>
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
