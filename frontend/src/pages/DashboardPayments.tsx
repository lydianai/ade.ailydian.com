import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  CalendarIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { useNotificationStore } from '../contexts/useNotificationStore'
import BackButton from '../components/BackButton'

type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
type PaymentMethod = 'Nakit' | 'Kredi Kartı' | 'Havale' | 'EFT' | 'Çek'

interface Payment {
  id: string
  invoiceId?: string
  invoiceNo?: string
  customerName: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  bankName?: string
  accountNo?: string
  transactionId?: string
  paymentDate: string
  valueDate?: string
  notes?: string
  createdAt: string
}

export default function DashboardPayments() {
  const { addNotification } = useNotificationStore()
  const [payments, setPayments] = useState<Payment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'ALL' | PaymentStatus>('ALL')
  const [filterMethod, setFilterMethod] = useState<'ALL' | PaymentMethod>('ALL')

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Payment>>({
    amount: 0,
    currency: 'TRY',
    method: 'Havale',
    status: 'PENDING',
    paymentDate: new Date().toISOString().split('T')[0],
  })

  // Fetch payments
  useEffect(() => {
    fetchPayments()
  }, [])

  // Filter payments
  useEffect(() => {
    let filtered = payments

    // Filter by status
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((p) => p.status === filterStatus)
    }

    // Filter by method
    if (filterMethod !== 'ALL') {
      filtered = filtered.filter((p) => p.method === filterMethod)
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((p) => {
        return (
          p.customerName.toLowerCase().includes(query) ||
          p.invoiceNo?.toLowerCase().includes(query) ||
          p.transactionId?.toLowerCase().includes(query) ||
          p.bankName?.toLowerCase().includes(query)
        )
      })
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())

    setFilteredPayments(filtered)
  }, [payments, searchQuery, filterStatus, filterMethod])

  const fetchPayments = async () => {
    setIsLoading(true)
    try {
      // Mock data for now - replace with real API call
      const mockPayments: Payment[] = [
        {
          id: '1',
          invoiceId: 'inv-001',
          invoiceNo: 'FAT-2026-001',
          customerName: 'ABC Teknoloji A.Ş.',
          amount: 15000.00,
          currency: 'TRY',
          method: 'Havale',
          status: 'COMPLETED',
          bankName: 'Ziraat Bankası',
          transactionId: 'TRX-2026-001234',
          paymentDate: '2026-01-20',
          valueDate: '2026-01-20',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          invoiceId: 'inv-002',
          invoiceNo: 'FAT-2026-002',
          customerName: 'XYZ Ltd. Şti.',
          amount: 10200.00,
          currency: 'TRY',
          method: 'Kredi Kartı',
          status: 'PENDING',
          transactionId: 'TRX-2026-009876',
          paymentDate: '2026-01-23',
          notes: 'Kredi kartı ödemesi onay bekliyor',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          invoiceId: 'inv-003',
          invoiceNo: 'FAT-2026-003',
          customerName: 'DEF İnşaat',
          amount: 51750.00,
          currency: 'TRY',
          method: 'EFT',
          status: 'COMPLETED',
          bankName: 'İş Bankası',
          accountNo: 'TR12 0006 4000 0011 2345 6789 01',
          transactionId: 'TRX-2026-005678',
          paymentDate: '2026-01-22',
          valueDate: '2026-01-22',
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          customerName: 'GHI Danışmanlık',
          amount: 8500.00,
          currency: 'TRY',
          method: 'Nakit',
          status: 'COMPLETED',
          paymentDate: '2026-01-21',
          notes: 'Nakit tahsilat',
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          invoiceId: 'inv-005',
          invoiceNo: 'FAT-2026-005',
          customerName: 'JKL Perakende',
          amount: 12000.00,
          currency: 'TRY',
          method: 'Çek',
          status: 'PENDING',
          paymentDate: '2026-02-15',
          valueDate: '2026-02-15',
          notes: 'Vadeli çek - 15 Şubat 2026',
          createdAt: new Date().toISOString(),
        },
        {
          id: '6',
          invoiceId: 'inv-006',
          invoiceNo: 'FAT-2026-006',
          customerName: 'MNO Lojistik',
          amount: 5400.00,
          currency: 'TRY',
          method: 'Havale',
          status: 'FAILED',
          bankName: 'Garanti BBVA',
          transactionId: 'TRX-2026-111222',
          paymentDate: '2026-01-19',
          notes: 'Yetersiz bakiye - işlem başarısız',
          createdAt: new Date().toISOString(),
        },
      ]
      setPayments(mockPayments)
    } catch (error) {
      console.error('Error fetching payments:', error)
      addNotification({
        type: 'error',
        title: 'Hata',
        message: 'Ödemeler yüklenirken bir hata oluştu.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      // TODO: Replace with real API call
      // const response = await apiClient.post('/v1/payments', formData)

      const newPayment: Payment = {
        id: Date.now().toString(),
        ...formData,
        customerName: formData.customerName || 'Yeni Müşteri',
        amount: formData.amount || 0,
        currency: formData.currency || 'TRY',
        method: formData.method || 'Havale',
        status: formData.status || 'PENDING',
        paymentDate: formData.paymentDate || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      } as Payment

      setPayments([newPayment, ...payments])
      setIsCreateModalOpen(false)
      resetForm()

      addNotification({
        type: 'success',
        title: 'Ödeme Kaydedildi',
        message: `${newPayment.customerName} için ₺${newPayment.amount.toLocaleString('tr-TR')} ödeme kaydedildi.`,
      })
    } catch (error) {
      console.error('Error creating payment:', error)
      addNotification({
        type: 'error',
        title: 'Hata',
        message: 'Ödeme kaydedilirken bir hata oluştu.',
      })
    }
  }

  const resetForm = () => {
    setFormData({
      amount: 0,
      currency: 'TRY',
      method: 'Havale',
      status: 'PENDING',
      paymentDate: new Date().toISOString().split('T')[0],
    })
  }

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />
      case 'PENDING':
        return <ClockIcon className="w-5 h-5 text-amber-400" />
      case 'FAILED':
        return <XCircleIcon className="w-5 h-5 text-red-400" />
      case 'CANCELLED':
        return <XCircleIcon className="w-5 h-5 text-gray-400" />
      case 'REFUNDED':
        return <ArrowPathIcon className="w-5 h-5 text-blue-400" />
    }
  }

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'PENDING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'FAILED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'CANCELLED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'REFUNDED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'Nakit':
        return <BanknotesIcon className="w-5 h-5" />
      case 'Kredi Kartı':
        return <CreditCardIcon className="w-5 h-5" />
      case 'Havale':
      case 'EFT':
        return <BuildingLibraryIcon className="w-5 h-5" />
      case 'Çek':
        return <DocumentTextIcon className="w-5 h-5" />
    }
  }

  const getStats = () => {
    const total = payments.reduce((sum, p) => p.status === 'COMPLETED' ? sum + p.amount : sum, 0)
    const pending = payments.reduce((sum, p) => p.status === 'PENDING' ? sum + p.amount : sum, 0)
    const completed = payments.filter(p => p.status === 'COMPLETED').length
    const pendingCount = payments.filter(p => p.status === 'PENDING').length

    return { total, pending, completed, pendingCount }
  }

  const stats = getStats()

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
            <h1 className="text-4xl font-bold text-white mb-2">Ödemeler</h1>
            <p className="text-white/60">Ödeme tahsilat ve takip</p>
          </div>

          <button
            onClick={() => {
              resetForm()
              setIsCreateModalOpen(true)
            }}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Ödeme Ekle
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span className="text-white/60 text-sm">Toplam Tahsilat</span>
            </div>
            <p className="text-3xl font-bold text-green-400">
              ₺{stats.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <ClockIcon className="w-5 h-5 text-amber-400" />
              <span className="text-white/60 text-sm">Bekleyen</span>
            </div>
            <p className="text-3xl font-bold text-amber-400">
              ₺{stats.pending.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <BanknotesIcon className="w-5 h-5 text-teal-400" />
              <span className="text-white/60 text-sm">Tamamlanan</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.completed}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-purple-400" />
              <span className="text-white/60 text-sm">Bekleyen İşlem</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.pendingCount}</p>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="glass-card p-6 mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ödeme ara (müşteri, fatura, işlem no...)"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Durum</label>
              <div className="flex flex-wrap gap-2">
                {(['ALL', 'COMPLETED', 'PENDING', 'FAILED', 'CANCELLED', 'REFUNDED'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {status === 'ALL' ? 'Tümü' :
                     status === 'COMPLETED' ? 'Tamamlandı' :
                     status === 'PENDING' ? 'Bekliyor' :
                     status === 'FAILED' ? 'Başarısız' :
                     status === 'CANCELLED' ? 'İptal' :
                     'İade'}
                  </button>
                ))}
              </div>
            </div>

            {/* Method Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Ödeme Yöntemi</label>
              <div className="flex flex-wrap gap-2">
                {(['ALL', 'Nakit', 'Kredi Kartı', 'Havale', 'EFT', 'Çek'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setFilterMethod(method)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filterMethod === method
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {method === 'ALL' ? 'Tümü' : method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payments List */}
        <div className="glass-card overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
              <p className="text-white/60 mt-4">Ödemeler yükleniyor...</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-12 text-center">
              <BanknotesIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">
                {searchQuery || filterStatus !== 'ALL' || filterMethod !== 'ALL'
                  ? 'Ödeme bulunamadı'
                  : 'Henüz ödeme kaydı yok'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredPayments.map((payment, idx) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    {/* Payment Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {/* Method Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                          {getMethodIcon(payment.method)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-white">{payment.customerName}</h3>
                            {payment.invoiceNo && (
                              <span className="px-2 py-1 text-xs rounded-lg bg-purple-500/20 text-purple-400">
                                {payment.invoiceNo}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                            </span>
                            <span>{payment.method}</span>
                            {payment.bankName && <span>{payment.bankName}</span>}
                            {payment.transactionId && (
                              <span className="font-mono text-xs">{payment.transactionId}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {payment.notes && (
                        <p className="text-sm text-white/60 mt-2 pl-15">{payment.notes}</p>
                      )}

                      {payment.valueDate && payment.valueDate !== payment.paymentDate && (
                        <p className="text-sm text-white/60 mt-2 pl-15">
                          Valör Tarihi: {new Date(payment.valueDate).toLocaleDateString('tr-TR')}
                        </p>
                      )}
                    </div>

                    {/* Amount & Status */}
                    <div className="text-right ml-6">
                      <p className="text-3xl font-bold text-white mb-3">
                        ₺{payment.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </p>

                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="text-sm font-medium">
                          {payment.status === 'COMPLETED' ? 'Tamamlandı' :
                           payment.status === 'PENDING' ? 'Bekliyor' :
                           payment.status === 'FAILED' ? 'Başarısız' :
                           payment.status === 'CANCELLED' ? 'İptal' :
                           'İade'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              style={{ zIndex: 9999 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-4 sm:p-6 overflow-y-auto"
              style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10000,
                width: 'calc(100% - 2rem)',
                maxWidth: '600px',
                maxHeight: '90vh',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Yeni Ödeme</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Müşteri Adı *</label>
                  <input
                    type="text"
                    value={formData.customerName || ''}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Tutar (₺) *</label>
                    <input
                      type="number"
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Para Birimi</label>
                    <select
                      value={formData.currency || 'TRY'}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="TRY">TRY (₺)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Ödeme Yöntemi *</label>
                    <select
                      value={formData.method || 'Havale'}
                      onChange={(e) => setFormData({ ...formData, method: e.target.value as PaymentMethod })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="Nakit">Nakit</option>
                      <option value="Kredi Kartı">Kredi Kartı</option>
                      <option value="Havale">Havale</option>
                      <option value="EFT">EFT</option>
                      <option value="Çek">Çek</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Durum</label>
                    <select
                      value={formData.status || 'PENDING'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as PaymentStatus })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="PENDING">Bekliyor</option>
                      <option value="COMPLETED">Tamamlandı</option>
                      <option value="FAILED">Başarısız</option>
                      <option value="CANCELLED">İptal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Ödeme Tarihi *</label>
                    <input
                      type="date"
                      value={formData.paymentDate || ''}
                      onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Valör Tarihi</label>
                    <input
                      type="date"
                      value={formData.valueDate || ''}
                      onChange={(e) => setFormData({ ...formData, valueDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Fatura No</label>
                  <input
                    type="text"
                    value={formData.invoiceNo || ''}
                    onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                    placeholder="FAT-2026-001"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Banka Adı</label>
                  <input
                    type="text"
                    value={formData.bankName || ''}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="Ziraat Bankası"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">İşlem No</label>
                  <input
                    type="text"
                    value={formData.transactionId || ''}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    placeholder="TRX-2026-123456"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Notlar</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  İptal
                </button>
                <button onClick={handleCreate} className="flex-1 btn-primary px-6 py-3">
                  Kaydet
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
