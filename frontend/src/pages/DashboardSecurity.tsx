import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  KeyIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import BackButton from '../components/BackButton'

export default function DashboardSecurity() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleEnable2FA = () => {
    setShowQR(true)
  }

  const handleComplete2FA = () => {
    setIs2FAEnabled(true)
    setShowQR(false)
  }

  const loginHistory = [
    { device: 'MacBook Pro', location: 'İstanbul, Türkiye', time: '5 dakika önce', status: 'success' },
    { device: 'iPhone 14', location: 'İstanbul, Türkiye', time: '2 saat önce', status: 'success' },
    { device: 'Windows PC', location: 'Ankara, Türkiye', time: 'Dün, 18:30', status: 'success' },
    { device: 'iPad', location: 'İzmir, Türkiye', time: '3 gün önce', status: 'failed' },
  ]

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
            Güvenlik
          </h1>
          <p className="text-white/60">Hesabınızı koruyun ve güvenliğini artırın</p>
        </motion.div>

        {/* 2FA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 md:p-8 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
              <KeyIcon className="w-6 h-6 text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">İki Faktörlü Doğrulama (2FA)</h3>
              <p className="text-white/60 mb-4">
                Hesabınıza ekstra bir güvenlik katmanı ekleyin. Giriş yaparken telefonunuzdan bir kod gerekecektir.
              </p>
              <div className="flex items-center gap-2 mb-4">
                {is2FAEnabled ? (
                  <>
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">2FA Aktif</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">2FA Pasif</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {!is2FAEnabled && !showQR && (
            <button onClick={handleEnable2FA} className="btn-primary">
              <ShieldCheckIcon className="w-5 h-5" />
              2FA'yı Etkinleştir
            </button>
          )}

          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-white/10 pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-4">Adım 1: QR Kodu Tarayın</h4>
                  <div className="aspect-square bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
                    <QrCodeIcon className="w-full h-full text-gray-800" />
                  </div>
                  <p className="text-sm text-white/60 text-center">
                    Google Authenticator veya benzeri bir uygulama ile tarayın
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-4">Adım 2: Kodu Girin</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Manuel Giriş Kodu</label>
                      <input
                        type="text"
                        readOnly
                        value="JBSWY3DPEHPK3PXP"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Doğrulama Kodu</label>
                      <input
                        type="text"
                        placeholder="6 haneli kod"
                        maxLength={6}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500/50"
                      />
                    </div>
                    <button onClick={handleComplete2FA} className="btn-primary w-full">
                      <CheckCircleIcon className="w-5 h-5" />
                      Etkinleştir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {is2FAEnabled && (
            <div className="border-t border-white/10 pt-6">
              <button
                onClick={() => setIs2FAEnabled(false)}
                className="btn-secondary text-red-400 hover:bg-red-500/10"
              >
                <XCircleIcon className="w-5 h-5" />
                2FA'yı Devre Dışı Bırak
              </button>
            </div>
          )}
        </motion.div>

        {/* Password Change */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 md:p-8 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <LockClosedIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Şifre Değiştir</h3>
              <p className="text-white/60">Hesabınızın güvenliği için düzenli olarak şifrenizi değiştirin</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Mevcut Şifre</label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Yeni Şifre</label>
              <input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <button className="btn-primary">
              <CheckCircleIcon className="w-5 h-5" />
              Şifreyi Güncelle
            </button>
          </div>
        </motion.div>

        {/* Login History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 md:p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <DevicePhoneMobileIcon className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Giriş Geçmişi</h3>
              <p className="text-white/60">Son giriş yapılan cihazlar ve konumlar</p>
            </div>
          </div>

          <div className="space-y-3">
            {loginHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <DevicePhoneMobileIcon className={`w-5 h-5 ${item.status === 'success' ? 'text-green-400' : 'text-red-400'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.device}</p>
                    <p className="text-sm text-white/50">{item.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    {item.status === 'success' ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm ${item.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {item.status === 'success' ? 'Başarılı' : 'Başarısız'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <ClockIcon className="w-3 h-3" />
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
