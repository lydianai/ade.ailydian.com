import { useState } from 'react'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  KeyIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../contexts/useAuthStore'
import { apiClient } from '../services/api'

interface SettingsTab {
  id: string
  label: string
  icon: any
}

export default function DashboardSettings() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<string>('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    ad: user?.ad || '',
    soyad: user?.soyad || '',
    email: user?.email || '',
    telefon: '',
    sirket: '',
    vkn: '',
    adres: '',
  })

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    fatura: true,
    odeme: true,
    vergi: false,
    guncellemeler: true,
  })

  const tabs: SettingsTab[] = [
    { id: 'profile', label: 'Profil Bilgileri', icon: UserCircleIcon },
    { id: 'security', label: 'Güvenlik', icon: ShieldCheckIcon },
    { id: 'notifications', label: 'Bildirimler', icon: BellIcon },
    { id: 'language', label: 'Dil & Bölge', icon: GlobeAltIcon },
    { id: 'billing', label: 'Faturalama', icon: CreditCardIcon },
  ]

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      await apiClient.put('/v1/auth/profil', profileForm)
      showSuccessMessage('Profil bilgileriniz başarıyla güncellendi!')
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor!')
      return
    }

    setIsLoading(true)
    try {
      await apiClient.put('/v1/auth/sifre-degistir', {
        eskiSifre: securityForm.currentPassword,
        yeniSifre: securityForm.newPassword,
      })
      showSuccessMessage('Şifreniz başarıyla değiştirildi!')
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Password change error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationsUpdate = async () => {
    setIsLoading(true)
    try {
      await apiClient.put('/v1/auth/bildirim-tercihleri', notifications)
      showSuccessMessage('Bildirim tercihleriniz kaydedildi!')
    } catch (error) {
      console.error('Notifications update error:', error)
    } finally {
      setIsLoading(false)
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ayarlar</h1>
          <p className="text-white/60">Hesap ve uygulama ayarlarınızı yönetin</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 glass-card p-4 flex items-center gap-3 bg-green-500/10 border border-green-500/30"
          >
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            <p className="text-white">{successMessage}</p>
          </motion.div>
        )}

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Profil Bilgileri</h2>

                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center">
                      <UserCircleIcon className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <button className="btn-primary px-4 py-2 mb-2">Fotoğraf Değiştir</button>
                      <p className="text-sm text-white/60">JPG, PNG veya GIF. Max 2MB.</p>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Ad</label>
                      <input
                        type="text"
                        value={profileForm.ad}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, ad: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Soyad</label>
                      <input
                        type="text"
                        value={profileForm.soyad}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, soyad: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">E-posta</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Telefon</label>
                      <input
                        type="tel"
                        value={profileForm.telefon}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, telefon: e.target.value })
                        }
                        placeholder="+90 5XX XXX XX XX"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Şirket Adı
                      </label>
                      <input
                        type="text"
                        value={profileForm.sirket}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, sirket: e.target.value })
                        }
                        placeholder="ABC Teknoloji A.Ş."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        VKN / TCKN
                      </label>
                      <input
                        type="text"
                        value={profileForm.vkn}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, vkn: e.target.value })
                        }
                        placeholder="1234567890"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Adres</label>
                    <textarea
                      value={profileForm.adres}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, adres: e.target.value })
                      }
                      rows={3}
                      placeholder="Şirket adresi..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 resize-none"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleProfileUpdate}
                      disabled={isLoading}
                      className="btn-primary px-6 py-3"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'Değişiklikleri Kaydet'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Password Change */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <KeyIcon className="w-6 h-6 text-amber-400" />
                    <h2 className="text-2xl font-bold text-white">Şifre Değiştir</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, currentPassword: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        value={securityForm.newPassword}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, newPassword: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Yeni Şifre (Tekrar)
                      </label>
                      <input
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, confirmPassword: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handlePasswordChange}
                        disabled={isLoading}
                        className="btn-primary px-6 py-3"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          'Şifreyi Güncelle'
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheckIcon className="w-6 h-6 text-teal-400" />
                    <h2 className="text-2xl font-bold text-white">İki Faktörlü Doğrulama</h2>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="font-medium text-white">2FA Durumu</p>
                      <p className="text-sm text-white/60 mt-1">
                        Hesabınızı ekstra güvenlik katmanı ile koruyun
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors">
                      Etkinleştir
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="glass-card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Aktif Oturumlar</h2>

                  <div className="space-y-3">
                    {[
                      {
                        device: 'Chrome on MacBook Pro',
                        location: 'İstanbul, Türkiye',
                        lastActive: '5 dakika önce',
                        current: true,
                      },
                      {
                        device: 'Safari on iPhone 15',
                        location: 'Ankara, Türkiye',
                        lastActive: '2 saat önce',
                        current: false,
                      },
                    ].map((session, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">{session.device}</p>
                            {session.current && (
                              <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-lg">
                                Mevcut
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/60 mt-1">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                        {!session.current && (
                          <button className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Bildirim Tercihleri</h2>

                <div className="space-y-6">
                  {/* Notification Channels */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Bildirim Kanalları</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'email', label: 'E-posta Bildirimleri', desc: 'Önemli güncellemeleri e-posta ile alın' },
                        { key: 'sms', label: 'SMS Bildirimleri', desc: 'Acil durumlar için SMS bildirimi' },
                        { key: 'push', label: 'Push Bildirimleri', desc: 'Tarayıcı üzerinden bildirim' },
                      ].map((channel) => (
                        <div
                          key={channel.key}
                          className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                        >
                          <div>
                            <p className="font-medium text-white">{channel.label}</p>
                            <p className="text-sm text-white/60 mt-1">{channel.desc}</p>
                          </div>
                          <button
                            onClick={() =>
                              setNotifications({
                                ...notifications,
                                [channel.key]: !notifications[channel.key as keyof typeof notifications],
                              })
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[channel.key as keyof typeof notifications]
                                ? 'bg-teal-500'
                                : 'bg-white/20'
                            }`}
                          >
                            <motion.div
                              animate={{
                                x: notifications[channel.key as keyof typeof notifications] ? 24 : 2,
                              }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Event Types */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Bildirim Türleri</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'fatura', label: 'Fatura Bildirimleri', desc: 'Yeni fatura ve güncellemeler' },
                        { key: 'odeme', label: 'Ödeme Bildirimleri', desc: 'Ödeme alındı, vadesi geçti' },
                        { key: 'vergi', label: 'Vergi Hatırlatmaları', desc: 'Vergi beyanı ve borç bildirimleri' },
                        { key: 'guncellemeler', label: 'Sistem Güncellemeleri', desc: 'Yeni özellikler ve iyileştirmeler' },
                      ].map((event) => (
                        <div
                          key={event.key}
                          className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                        >
                          <div>
                            <p className="font-medium text-white">{event.label}</p>
                            <p className="text-sm text-white/60 mt-1">{event.desc}</p>
                          </div>
                          <button
                            onClick={() =>
                              setNotifications({
                                ...notifications,
                                [event.key]: !notifications[event.key as keyof typeof notifications],
                              })
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[event.key as keyof typeof notifications]
                                ? 'bg-amber-500'
                                : 'bg-white/20'
                            }`}
                          >
                            <motion.div
                              animate={{
                                x: notifications[event.key as keyof typeof notifications] ? 24 : 2,
                              }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleNotificationsUpdate}
                      disabled={isLoading}
                      className="btn-primary px-6 py-3"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'Tercihleri Kaydet'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Language & Region Tab */}
            {activeTab === 'language' && (
              <motion.div
                key="language"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Dil & Bölge Ayarları</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Dil</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50">
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Zaman Dilimi</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50">
                      <option value="Europe/Istanbul">(GMT+3) İstanbul</option>
                      <option value="Europe/London">(GMT+0) Londra</option>
                      <option value="America/New_York">(GMT-5) New York</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Para Birimi</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50">
                      <option value="TRY">₺ Türk Lirası (TRY)</option>
                      <option value="USD">$ Amerikan Doları (USD)</option>
                      <option value="EUR">€ Euro (EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Tarih Formatı</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50">
                      <option value="DD/MM/YYYY">GG/AA/YYYY (ör: 23/01/2026)</option>
                      <option value="MM/DD/YYYY">AA/GG/YYYY (ör: 01/23/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-AA-GG (ör: 2026-01-23)</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button className="btn-primary px-6 py-3">Kaydet</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Current Plan */}
                <div className="glass-card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Mevcut Paket</h2>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-teal-500/10 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Pro Paket</h3>
                        <p className="text-white/60 mt-1">Aylık yenilenir</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">₺299</p>
                        <p className="text-white/60">/ay</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-sm text-white/60">Fatura Limiti</p>
                        <p className="text-lg font-bold text-white">Sınırsız</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-sm text-white/60">API İstekleri</p>
                        <p className="text-lg font-bold text-white">100,000/ay</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors">
                        Paketi Değiştir
                      </button>
                      <button className="flex-1 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                        İptal Et
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass-card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Ödeme Yöntemi</h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <CreditCardIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">•••• •••• •••• 4242</p>
                          <p className="text-sm text-white/60">Son kullanma: 12/28</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors">
                        Düzenle
                      </button>
                    </div>

                    <button className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors">
                      + Yeni Kart Ekle
                    </button>
                  </div>
                </div>

                {/* Billing History */}
                <div className="glass-card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Fatura Geçmişi</h2>

                  <div className="space-y-3">
                    {[
                      { date: '23 Ocak 2026', amount: '₺299', status: 'Ödendi' },
                      { date: '23 Aralık 2025', amount: '₺299', status: 'Ödendi' },
                      { date: '23 Kasım 2025', amount: '₺299', status: 'Ödendi' },
                    ].map((invoice, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                      >
                        <div>
                          <p className="font-medium text-white">{invoice.date}</p>
                          <p className="text-sm text-white/60">{invoice.status}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-white">{invoice.amount}</span>
                          <button className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors text-sm">
                            İndir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
