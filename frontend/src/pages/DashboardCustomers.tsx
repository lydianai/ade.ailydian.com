import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CreditCardIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useNotificationStore } from '../contexts/useNotificationStore'
import BackButton from '../components/BackButton'

type CustomerType = 'INDIVIDUAL' | 'CORPORATE'

interface Customer {
  id: string
  type: CustomerType
  // Individual
  firstName?: string
  lastName?: string
  tcNo?: string
  // Corporate
  companyName?: string
  taxOffice?: string
  taxNumber?: string
  mersisNo?: string
  // Contact
  email?: string
  phone?: string
  address?: string
  city?: string
  district?: string
  postalCode?: string
  // Financial
  creditLimit?: number
  balance: number
  // Meta
  createdAt: string
  updatedAt: string
}

export default function DashboardCustomers() {
  const { addNotification } = useNotificationStore()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'ALL' | CustomerType>('ALL')

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<Customer>>({
    type: 'CORPORATE',
    balance: 0,
  })

  // Fetch customers
  useEffect(() => {
    fetchCustomers()
  }, [])

  // Filter customers
  useEffect(() => {
    let filtered = customers

    // Filter by type
    if (filterType !== 'ALL') {
      filtered = filtered.filter((c) => c.type === filterType)
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((c) => {
        const name = c.type === 'CORPORATE'
          ? c.companyName?.toLowerCase()
          : `${c.firstName} ${c.lastName}`.toLowerCase()
        const email = c.email?.toLowerCase() || ''
        const phone = c.phone?.toLowerCase() || ''
        const taxNumber = c.taxNumber?.toLowerCase() || ''

        return name?.includes(query) ||
               email.includes(query) ||
               phone.includes(query) ||
               taxNumber.includes(query)
      })
    }

    setFilteredCustomers(filtered)
  }, [customers, searchQuery, filterType])

  const fetchCustomers = async () => {
    setIsLoading(true)
    try {
      // Mock data for now - replace with real API call
      const mockCustomers: Customer[] = [
        {
          id: '1',
          type: 'CORPORATE',
          companyName: 'ABC Teknoloji A.Ş.',
          taxOffice: 'İstanbul Vergi Dairesi',
          taxNumber: '1111222233',
          email: 'info@abcteknoloji.com',
          phone: '+90 212 123 45 67',
          address: 'Maslak Mah. Büyükdere Cad. No:123',
          city: 'İstanbul',
          district: 'Sarıyer',
          postalCode: '34398',
          creditLimit: 100000,
          balance: 15250.50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'CORPORATE',
          companyName: 'XYZ Ltd. Şti.',
          taxOffice: 'Ankara Vergi Dairesi',
          taxNumber: '4444555566',
          email: 'muhasebe@xyz.com',
          phone: '+90 312 123 45 67',
          address: 'Çankaya Mah. Atatürk Bulvarı No:456',
          city: 'Ankara',
          district: 'Çankaya',
          postalCode: '06420',
          creditLimit: 75000,
          balance: -8900.00,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'CORPORATE',
          companyName: 'DEF İnşaat',
          taxOffice: 'İzmir Vergi Dairesi',
          taxNumber: '7777888899',
          email: 'mali@definsaat.com',
          phone: '+90 232 123 45 67',
          address: 'Alsancak Mah. Cumhuriyet Bulvarı No:789',
          city: 'İzmir',
          district: 'Konak',
          postalCode: '35220',
          creditLimit: 250000,
          balance: 45600.00,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          type: 'INDIVIDUAL',
          firstName: 'Ali',
          lastName: 'Kaya',
          tcNo: '12345678901',
          email: 'ali.kaya@email.com',
          phone: '+90 544 123 45 67',
          address: 'Ataşehir Mah. Barbaros Cad. No:45 Daire:8',
          city: 'İstanbul',
          district: 'Ataşehir',
          postalCode: '34758',
          balance: 2500.00,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          type: 'INDIVIDUAL',
          firstName: 'Ayşe',
          lastName: 'Demir',
          tcNo: '98765432109',
          email: 'ayse.demir@email.com',
          phone: '+90 533 987 65 43',
          address: 'Kadıköy Mah. Bağdat Cad. No:234',
          city: 'İstanbul',
          district: 'Kadıköy',
          postalCode: '34710',
          balance: -1200.00,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      setCustomers(mockCustomers)
    } catch (error) {
      console.error('Error fetching customers:', error)
      addNotification({
        type: 'error',
        title: 'Hata',
        message: 'Müşteriler yüklenirken bir hata oluştu.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      // TODO: Replace with real API call
      // const response = await apiClient.post('/v1/customers', formData)

      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        balance: formData.balance || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Customer

      setCustomers([newCustomer, ...customers])
      setIsCreateModalOpen(false)
      resetForm()

      addNotification({
        type: 'success',
        title: 'Müşteri Eklendi',
        message: `${getCustomerName(newCustomer)} başarıyla eklendi.`,
      })
    } catch (error) {
      console.error('Error creating customer:', error)
      addNotification({
        type: 'error',
        title: 'Hata',
        message: 'Müşteri eklenirken bir hata oluştu.',
      })
    }
  }

  const handleUpdate = async () => {
    if (!selectedCustomer) return

    try {
      // TODO: Replace with real API call
      // await apiClient.put(`/v1/customers/${selectedCustomer.id}`, formData)

      const updatedCustomer = {
        ...selectedCustomer,
        ...formData,
        updatedAt: new Date().toISOString(),
      }

      setCustomers(customers.map(c => c.id === selectedCustomer.id ? updatedCustomer : c))
      setIsEditModalOpen(false)
      setSelectedCustomer(null)
      resetForm()

      addNotification({
        type: 'success',
        title: 'Müşteri Güncellendi',
        message: `${getCustomerName(updatedCustomer)} başarıyla güncellendi.`,
      })
    } catch (error) {
      console.error('Error updating customer:', error)
      addNotification({
        type: 'error',
        title: 'Hata',
        message: 'Müşteri güncellenirken bir hata oluştu.',
      })
    }
  }

  const handleDelete = async (customer: Customer) => {
    if (!confirm(`${getCustomerName(customer)} müşterisini silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      // TODO: Replace with real API call
      // await apiClient.delete(`/v1/customers/${customer.id}`)

      setCustomers(customers.filter(c => c.id !== customer.id))

      addNotification({
        type: 'success',
        title: 'Müşteri Silindi',
        message: `${getCustomerName(customer)} başarıyla silindi.`,
      })
    } catch (error) {
      console.error('Error deleting customer:', error)
      addNotification({
        type: 'error',
        title: 'Hata',
        message: 'Müşteri silinirken bir hata oluştu.',
      })
    }
  }

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer)
    setFormData(customer)
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      type: 'CORPORATE',
      balance: 0,
    })
  }

  const getCustomerName = (customer: Customer) => {
    return customer.type === 'CORPORATE'
      ? customer.companyName
      : `${customer.firstName} ${customer.lastName}`
  }

  const getStats = () => {
    const total = customers.length
    const corporate = customers.filter(c => c.type === 'CORPORATE').length
    const individual = customers.filter(c => c.type === 'INDIVIDUAL').length
    const totalBalance = customers.reduce((sum, c) => sum + c.balance, 0)

    return { total, corporate, individual, totalBalance }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Müşteriler</h1>
            <p className="text-white/60">Müşteri portföyünüzü yönetin</p>
          </div>

          <button
            onClick={() => {
              resetForm()
              setIsCreateModalOpen(true)
            }}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Yeni Müşteri
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
              <UserIcon className="w-5 h-5 text-amber-400" />
              <span className="text-white/60 text-sm">Toplam Müşteri</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <BuildingOfficeIcon className="w-5 h-5 text-teal-400" />
              <span className="text-white/60 text-sm">Kurumsal</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.corporate}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <UserIcon className="w-5 h-5 text-purple-400" />
              <span className="text-white/60 text-sm">Bireysel</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.individual}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <CreditCardIcon className="w-5 h-5 text-green-400" />
              <span className="text-white/60 text-sm">Toplam Bakiye</span>
            </div>
            <p className={`text-3xl font-bold ${stats.totalBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₺{stats.totalBalance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </p>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Müşteri ara (ad, e-posta, telefon, VKN...)"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  filterType === 'ALL'
                    ? 'bg-gradient-to-r from-amber-500 to-teal-500 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setFilterType('CORPORATE')}
                className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  filterType === 'CORPORATE'
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <BuildingOfficeIcon className="w-5 h-5" />
                Kurumsal
              </button>
              <button
                onClick={() => setFilterType('INDIVIDUAL')}
                className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  filterType === 'INDIVIDUAL'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                Bireysel
              </button>
            </div>
          </div>
        </div>

        {/* Customers List */}
        <div className="glass-card overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
              <p className="text-white/60 mt-4">Müşteriler yükleniyor...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-12 text-center">
              <UserIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">
                {searchQuery || filterType !== 'ALL' ? 'Müşteri bulunamadı' : 'Henüz müşteri eklenmemiş'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredCustomers.map((customer, idx) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    {/* Customer Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          customer.type === 'CORPORATE'
                            ? 'bg-gradient-to-br from-teal-500 to-cyan-500'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}>
                          {customer.type === 'CORPORATE' ? (
                            <BuildingOfficeIcon className="w-6 h-6 text-white" />
                          ) : (
                            <UserIcon className="w-6 h-6 text-white" />
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">{getCustomerName(customer)}</h3>
                          <p className="text-sm text-white/60">
                            {customer.type === 'CORPORATE' ? customer.taxNumber : customer.tcNo}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {customer.email && (
                          <div className="flex items-center gap-2 text-white/60">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span className="text-sm">{customer.email}</span>
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-white/60">
                            <PhoneIcon className="w-4 h-4" />
                            <span className="text-sm">{customer.phone}</span>
                          </div>
                        )}
                        {customer.city && (
                          <div className="flex items-center gap-2 text-white/60">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="text-sm">{customer.city}, {customer.district}</span>
                          </div>
                        )}
                      </div>

                      {customer.type === 'CORPORATE' && customer.taxOffice && (
                        <p className="text-sm text-white/60 mt-2">Vergi Dairesi: {customer.taxOffice}</p>
                      )}
                    </div>

                    {/* Balance & Actions */}
                    <div className="text-right ml-6">
                      <div className="mb-4">
                        <p className="text-sm text-white/60 mb-1">Bakiye</p>
                        <p className={`text-2xl font-bold ${
                          customer.balance >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          ₺{customer.balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(customer)}
                          className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
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
          <CustomerModal
            title="Yeni Müşteri Ekle"
            formData={formData}
            setFormData={setFormData}
            onSave={handleCreate}
            onClose={() => {
              setIsCreateModalOpen(false)
              resetForm()
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedCustomer && (
          <CustomerModal
            title="Müşteri Düzenle"
            formData={formData}
            setFormData={setFormData}
            onSave={handleUpdate}
            onClose={() => {
              setIsEditModalOpen(false)
              setSelectedCustomer(null)
              resetForm()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Customer Modal Component
interface CustomerModalProps {
  title: string
  formData: Partial<Customer>
  setFormData: (data: Partial<Customer>) => void
  onSave: () => void
  onClose: () => void
}

function CustomerModal({ title, formData, setFormData, onSave, onClose }: CustomerModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Müşteri Tipi</label>
            <div className="flex gap-4">
              <button
                onClick={() => setFormData({ ...formData, type: 'CORPORATE' })}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  formData.type === 'CORPORATE'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <BuildingOfficeIcon className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-medium">Kurumsal</p>
              </button>
              <button
                onClick={() => setFormData({ ...formData, type: 'INDIVIDUAL' })}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  formData.type === 'INDIVIDUAL'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <UserIcon className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-medium">Bireysel</p>
              </button>
            </div>
          </div>

          {/* Corporate Fields */}
          {formData.type === 'CORPORATE' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Şirket Adı *</label>
                <input
                  type="text"
                  value={formData.companyName || ''}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Vergi Dairesi</label>
                  <input
                    type="text"
                    value={formData.taxOffice || ''}
                    onChange={(e) => setFormData({ ...formData, taxOffice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">VKN</label>
                  <input
                    type="text"
                    value={formData.taxNumber || ''}
                    onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">MERSİS No</label>
                <input
                  type="text"
                  value={formData.mersisNo || ''}
                  onChange={(e) => setFormData({ ...formData, mersisNo: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </>
          )}

          {/* Individual Fields */}
          {formData.type === 'INDIVIDUAL' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Ad *</label>
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Soyad *</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">TC Kimlik No</label>
                <input
                  type="text"
                  value={formData.tcNo || ''}
                  onChange={(e) => setFormData({ ...formData, tcNo: e.target.value })}
                  maxLength={11}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </>
          )}

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">E-posta</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Telefon</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+90 5XX XXX XX XX"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Adres</label>
            <textarea
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">İl</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">İlçe</label>
              <input
                type="text"
                value={formData.district || ''}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Posta Kodu</label>
              <input
                type="text"
                value={formData.postalCode || ''}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Financial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Kredi Limiti (₺)</label>
              <input
                type="number"
                value={formData.creditLimit || ''}
                onChange={(e) => setFormData({ ...formData, creditLimit: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Başlangıç Bakiyesi (₺)</label>
              <input
                type="number"
                value={formData.balance || 0}
                onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">
            İptal
          </button>
          <button onClick={onSave} className="flex-1 btn-primary px-6 py-3">
            Kaydet
          </button>
        </div>
      </motion.div>
    </>
  )
}
