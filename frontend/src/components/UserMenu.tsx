import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../contexts/useAuthStore'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user, cikisYap } = useAuthStore()

  const handleLogout = async () => {
    await cikisYap()
    navigate('/giris-yap')
  }

  const menuItems = [
    {
      icon: UserCircleIcon,
      label: 'Profilim',
      path: '/panel/profil',
      description: 'Kişisel bilgilerinizi görüntüleyin',
    },
    {
      icon: Cog6ToothIcon,
      label: 'Ayarlar',
      path: '/panel/ayarlar',
      description: 'Hesap ayarlarınızı yönetin',
    },
    {
      icon: ShieldCheckIcon,
      label: 'Güvenlik',
      path: '/panel/guvenlik',
      description: 'Güvenlik ayarları ve şifre',
    },
    {
      icon: KeyIcon,
      label: 'İki Faktörlü Doğrulama',
      path: '/panel/2fa',
      description: '2FA ayarlarını yapılandırın',
    },
  ]

  if (!user) return null

  // Get initials for avatar
  const initials = `${user.ad?.[0] || ''}${user.soyad?.[0] || ''}`.toUpperCase()

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20">
          {initials}
        </div>

        {/* User Info (hidden on mobile) */}
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-white leading-tight">
            {user.ad} {user.soyad}
          </p>
          <p className="text-xs text-white/50 leading-tight">{user.email}</p>
        </div>

        {/* Chevron */}
        <ChevronDownIcon
          className={`w-4 h-4 text-white/60 transition-transform hidden lg:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="glass-card overflow-hidden shadow-2xl"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 0.5rem)',
                width: 'min(calc(100vw - 2rem), 320px)',
                maxHeight: 'min(80vh, 600px)',
                zIndex: 9000,
              }}
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-teal-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {user.ad} {user.soyad}
                    </p>
                    <p className="text-sm text-white/60">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-white/60 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-xs text-white/50 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Logout */}
              <div className="p-2 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors group"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Çıkış Yap</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
