import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../contexts/useAuthStore'
import BackButton from '../components/BackButton'

export default function DashboardProfile() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    ad: user?.ad || '',
    soyad: user?.soyad || '',
    email: user?.email || '',
    telefon: '',
    adres: '',
    sirket: '',
  })

  const handleSave = () => {
    // TODO: API call to update profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      ad: user?.ad || '',
      soyad: user?.soyad || '',
      email: user?.email || '',
      telefon: '',
      adres: '',
      sirket: '',
    })
    setIsEditing(false)
  }

  const initials = `${user?.ad?.[0] || ''}${user?.soyad?.[0] || ''}`.toUpperCase()

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-amber-teal mb-2">
            Profilim
          </h1>
          <p className="text-white/60">Kişisel bilgilerinizi görüntüleyin ve düzenleyin</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 md:p-8"
        >
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center font-bold text-white text-3xl shadow-2xl shadow-amber-500/30">
              {initials}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {user?.ad} {user?.soyad}
              </h2>
              <p className="text-white/60 mb-3">{user?.email}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary text-sm"
              >
                {isEditing ? (
                  <>
                    <XMarkIcon className="w-4 h-4" />
                    İptal
                  </>
                ) : (
                  <>
                    <PencilIcon className="w-4 h-4" />
                    Profili Düzenle
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ad */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-4 h-4" />
                  Ad
                </div>
              </label>
              <input
                type="text"
                value={formData.ad}
                onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Soyad */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-4 h-4" />
                  Soyad
                </div>
              </label>
              <input
                type="text"
                value={formData.soyad}
                onChange={(e) => setFormData({ ...formData, soyad: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  E-posta
                </div>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  Telefon
                </div>
              </label>
              <input
                type="tel"
                value={formData.telefon}
                onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                disabled={!isEditing}
                placeholder="+90 (5XX) XXX XX XX"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Şirket */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <div className="flex items-center gap-2">
                  <BuildingOfficeIcon className="w-4 h-4" />
                  Şirket
                </div>
              </label>
              <input
                type="text"
                value={formData.sirket}
                onChange={(e) => setFormData({ ...formData, sirket: e.target.value })}
                disabled={!isEditing}
                placeholder="Şirket adınız"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Adres */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  Adres
                </div>
              </label>
              <textarea
                value={formData.adres}
                onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                disabled={!isEditing}
                placeholder="Tam adresiniz"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 mt-8 pt-6 border-t border-white/10"
            >
              <button onClick={handleSave} className="btn-primary flex-1 sm:flex-none">
                <CheckIcon className="w-5 h-5" />
                Değişiklikleri Kaydet
              </button>
              <button onClick={handleCancel} className="btn-secondary flex-1 sm:flex-none">
                <XMarkIcon className="w-5 h-5" />
                İptal
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 md:p-8 mt-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Hesap Bilgileri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-sm text-white/60 mb-1">Hesap Türü</p>
              <p className="font-medium text-white">Premium</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-sm text-white/60 mb-1">Üyelik Tarihi</p>
              <p className="font-medium text-white">15 Ocak 2024</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-sm text-white/60 mb-1">Son Giriş</p>
              <p className="font-medium text-white">Bugün, 14:30</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-sm text-white/60 mb-1">Durum</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="font-medium text-green-400">Aktif</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
