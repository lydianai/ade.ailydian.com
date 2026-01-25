import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { apiClient } from '../services/api'

interface Invoice {
  id: string
  faturaNo: string
  tarih: string
  alici: {
    ad: string
    vkn: string
  }
  tutar: number
  kdv: number
  toplam: number
  durum: 'TASLAK' | 'GONDERILDI' | 'ONAYLANDI' | 'REDDEDILDI'
  ettn?: string
}

export default function DashboardEFatura() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Form state for new invoice
  const [newInvoice, setNewInvoice] = useState({
    aliciAd: '',
    aliciVkn: '',
    aciklama: '',
    birimFiyat: '',
    miktar: '',
  })

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    setIsLoading(true)
    try {
      // Mock data for now - will be replaced with real API
      const mockInvoices: Invoice[] = [
        {
          id: '1',
          faturaNo: 'FAT-2026-001',
          tarih: '2026-01-23',
          alici: { ad: 'ABC Ltd. Şti.', vkn: '1234567890' },
          tutar: 10000,
          kdv: 2000,
          toplam: 12000,
          durum: 'GONDERILDI',
          ettn: 'ETTN-ABC-001',
        },
        {
          id: '2',
          faturaNo: 'FAT-2026-002',
          tarih: '2026-01-22',
          alici: { ad: 'XYZ A.Ş.', vkn: '9876543210' },
          tutar: 5000,
          kdv: 1000,
          toplam: 6000,
          durum: 'ONAYLANDI',
          ettn: 'ETTN-XYZ-002',
        },
        {
          id: '3',
          faturaNo: 'FAT-2026-003',
          tarih: '2026-01-23',
          alici: { ad: 'DEF Tic. Ltd.', vkn: '5555555555' },
          tutar: 8500,
          kdv: 1700,
          toplam: 10200,
          durum: 'TASLAK',
        },
      ]
      setInvoices(mockInvoices)
    } catch (error) {
      console.error('Faturalar yüklenemedi:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateInvoice = async () => {
    try {
      const tutar = parseFloat(newInvoice.birimFiyat) * parseFloat(newInvoice.miktar)
      const kdv = tutar * 0.2 // %20 KDV
      const toplam = tutar + kdv

      const invoiceData = {
        faturaNo: `FAT-${Date.now()}`,
        aliciAd: newInvoice.aliciAd,
        aliciVkn: newInvoice.aliciVkn,
        aciklama: newInvoice.aciklama,
        tutar,
        kdv,
        toplam,
      }

      // Call GİB API
      const response = await apiClient.post('/v1/integrations/gib/e-fatura', invoiceData)

      // Add to list
      const newInv: Invoice = {
        id: Date.now().toString(),
        faturaNo: invoiceData.faturaNo,
        tarih: new Date().toISOString().split('T')[0],
        alici: {
          ad: invoiceData.aliciAd,
          vkn: invoiceData.aliciVkn,
        },
        tutar: invoiceData.tutar,
        kdv: invoiceData.kdv,
        toplam: invoiceData.toplam,
        durum: 'TASLAK',
        ettn: response.data.ettn,
      }

      setInvoices([newInv, ...invoices])
      setShowCreateModal(false)
      setNewInvoice({
        aliciAd: '',
        aliciVkn: '',
        aciklama: '',
        birimFiyat: '',
        miktar: '',
      })
    } catch (error) {
      console.error('Fatura oluşturulamadı:', error)
      alert('Fatura oluşturulamadı. Lütfen tekrar deneyin.')
    }
  }

  const handleSendToGib = async (invoice: Invoice) => {
    try {
      // Update invoice status
      const updatedInvoices = invoices.map((inv) =>
        inv.id === invoice.id ? { ...inv, durum: 'GONDERILDI' as const } : inv
      )
      setInvoices(updatedInvoices)

      // Show success notification
      alert(`Fatura ${invoice.faturaNo} GİB'e gönderildi!`)
    } catch (error) {
      console.error('Fatura gönderilemedi:', error)
    }
  }

  const getStatusColor = (durum: string) => {
    switch (durum) {
      case 'TASLAK':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      case 'GONDERILDI':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
      case 'ONAYLANDI':
        return 'text-green-400 bg-green-500/10 border-green-500/30'
      case 'REDDEDILDI':
        return 'text-red-400 bg-red-500/10 border-red-500/30'
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
    }
  }

  const getStatusIcon = (durum: string) => {
    switch (durum) {
      case 'TASLAK':
        return <ClockIcon className="w-5 h-5" />
      case 'GONDERILDI':
        return <PaperAirplaneIcon className="w-5 h-5" />
      case 'ONAYLANDI':
        return <CheckCircleIcon className="w-5 h-5" />
      case 'REDDEDILDI':
        return <XCircleIcon className="w-5 h-5" />
      default:
        return null
    }
  }

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.faturaNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.alici.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.alici.vkn.includes(searchTerm)

    const matchesFilter = filterStatus === 'all' || inv.durum === filterStatus

    return matchesSearch && matchesFilter
  })

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient-amber-teal mb-3">e-Fatura</h1>
            <p className="text-white/60 text-lg">
              GİB entegrasyonu ile e-fatura oluştur, gönder ve yönet
            </p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <PlusIcon className="w-5 h-5 mr-2" />
            Yeni Fatura
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Toplam Fatura',
              value: invoices.length,
              color: 'from-amber-500 to-orange-500',
            },
            {
              label: 'Gönderildi',
              value: invoices.filter((i) => i.durum === 'GONDERILDI').length,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              label: 'Onaylandı',
              value: invoices.filter((i) => i.durum === 'ONAYLANDI').length,
              color: 'from-green-500 to-emerald-500',
            },
            {
              label: 'Taslak',
              value: invoices.filter((i) => i.durum === 'TASLAK').length,
              color: 'from-purple-500 to-pink-500',
            },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-6">
              <p className="text-white/60 text-sm mb-2">{stat.label}</p>
              <p className={`text-4xl font-bold text-gradient bg-gradient-to-r ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Fatura no, firma adı veya VKN ara..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-white/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="TASLAK">Taslak</option>
                <option value="GONDERILDI">Gönderildi</option>
                <option value="ONAYLANDI">Onaylandı</option>
                <option value="REDDEDILDI">Reddedildi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="glass-card p-12 text-center">
              <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/60">Faturalar yükleniyor...</p>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <DocumentTextIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Henüz fatura bulunmuyor</p>
            </div>
          ) : (
            filteredInvoices.map((invoice) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center justify-between">
                  {/* Left: Invoice Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-bold text-white">{invoice.faturaNo}</h3>
                      <span
                        className={`px-3 py-1 rounded-lg border text-sm flex items-center gap-2 ${getStatusColor(invoice.durum)}`}
                      >
                        {getStatusIcon(invoice.durum)}
                        {invoice.durum}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/40 mb-1">Alıcı</p>
                        <p className="text-white font-medium">{invoice.alici.ad}</p>
                        <p className="text-white/60 text-xs">VKN: {invoice.alici.vkn}</p>
                      </div>
                      <div>
                        <p className="text-white/40 mb-1">Tarih</p>
                        <p className="text-white">{invoice.tarih}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount & Actions */}
                  <div className="text-right">
                    <p className="text-white/40 text-sm mb-1">Toplam Tutar</p>
                    <p className="text-3xl font-bold text-gradient-amber-teal mb-4">
                      ₺{invoice.toplam.toLocaleString('tr-TR')}
                    </p>
                    <div className="flex gap-2">
                      {invoice.durum === 'TASLAK' && (
                        <button
                          onClick={() => handleSendToGib(invoice)}
                          className="btn-primary text-sm"
                        >
                          <PaperAirplaneIcon className="w-4 h-4 mr-1" />
                          GİB'e Gönder
                        </button>
                      )}
                      <button className="btn-secondary text-sm">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Görüntüle
                      </button>
                      <button className="btn-secondary text-sm">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Yeni e-Fatura Oluştur</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Alıcı Firma Adı</label>
                <input
                  type="text"
                  value={newInvoice.aliciAd}
                  onChange={(e) => setNewInvoice({ ...newInvoice, aliciAd: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  placeholder="ABC Ltd. Şti."
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">VKN / TCKN</label>
                <input
                  type="text"
                  value={newInvoice.aliciVkn}
                  onChange={(e) => setNewInvoice({ ...newInvoice, aliciVkn: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  placeholder="1234567890"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Açıklama</label>
                <textarea
                  value={newInvoice.aciklama}
                  onChange={(e) => setNewInvoice({ ...newInvoice, aciklama: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  placeholder="Hizmet/ürün açıklaması"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Birim Fiyat (₺)</label>
                  <input
                    type="number"
                    value={newInvoice.birimFiyat}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, birimFiyat: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Miktar</label>
                  <input
                    type="number"
                    value={newInvoice.miktar}
                    onChange={(e) => setNewInvoice({ ...newInvoice, miktar: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Preview */}
              {newInvoice.birimFiyat && newInvoice.miktar && (
                <div className="glass-card p-4 bg-amber-500/10 border border-amber-500/30">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Tutar:</span>
                    <span className="text-white">
                      ₺
                      {(
                        parseFloat(newInvoice.birimFiyat) * parseFloat(newInvoice.miktar)
                      ).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">KDV (%20):</span>
                    <span className="text-white">
                      ₺
                      {(
                        parseFloat(newInvoice.birimFiyat) *
                        parseFloat(newInvoice.miktar) *
                        0.2
                      ).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-amber-500/30 pt-2">
                    <span className="text-white">Toplam:</span>
                    <span className="text-amber-400 text-xl">
                      ₺
                      {(
                        parseFloat(newInvoice.birimFiyat) *
                        parseFloat(newInvoice.miktar) *
                        1.2
                      ).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleCreateInvoice} className="btn-primary flex-1">
                Fatura Oluştur
              </button>
              <button onClick={() => setShowCreateModal(false)} className="btn-secondary flex-1">
                İptal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
