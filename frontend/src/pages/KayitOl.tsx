import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '../contexts/useAuthStore'

export default function KayitOl() {
  const navigate = useNavigate()
  const { kayitOl, loading, error, clearError } = useAuthStore()
  const [localError, setLocalError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'ESNAF'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setLocalError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Şifreler eşleşmiyor')
      return
    }

    if (formData.password.length < 6) {
      setLocalError('Şifre en az 6 karakter olmalıdır')
      return
    }

    try {
      await kayitOl({
        email: formData.email,
        sifre: formData.password,
        ad: formData.firstName,
        soyad: formData.lastName,
        telefon: formData.phone || undefined,
        rol: formData.role,
      })
      navigate('/panel')
    } catch (err) {
      // Error is already handled in the store
      console.error('Register error:', err)
    }
  }

  const displayError = error || localError

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 md:p-12 w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient-amber-teal">ADE</h1>
          <p className="text-white/70">Yeni hesap oluşturun</p>
        </div>

        {/* Error Message */}
        {displayError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            {displayError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Ad</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input-modern pl-12"
                  placeholder="Adınız"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Soyad</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="input-modern"
                placeholder="Soyadınız"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-modern pl-12"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Telefon</label>
            <div className="relative">
              <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-modern pl-12"
                placeholder="+90 (5xx) xxx xx xx"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Kullanıcı Tipi</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['ESNAF', 'KOBI', 'VATANDAS', 'KAMU'].map((role) => (
                <label
                  key={role}
                  className={`glass-card p-4 text-center cursor-pointer transition-all ${
                    formData.role === role ? 'border-teal-500 bg-teal-500/10' : 'border-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="sr-only"
                  />
                  <div className="text-sm font-medium">{role}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Şifre</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-modern pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Şifre Tekrar</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-modern"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Kayıt Oluşturuluyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="mt-8 text-center text-white/70">
          Zaten hesabınız var mı?{' '}
          <Link to="/giris-yap" className="text-teal-400 hover:text-teal-300 font-semibold">
            Giriş yapın
          </Link>
        </p>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-white/60 hover:text-white/80">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
