import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  TableCellsIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import BackButton from '../components/BackButton'

// Muhasebe Türleri
type TransactionType = 'gelir' | 'gider' | 'alacak' | 'borc'

interface Transaction {
  id: string
  tarih: string
  aciklama: string
  hesapKodu: string
  hesapAdi: string
  borc: number
  alacak: number
  tur: TransactionType
  belgeNo?: string
}

interface HesapOzeti {
  hesapKodu: string
  hesapAdi: string
  toplamBorc: number
  toplamAlacak: number
  bakiye: number
}

export default function DashboardAccounting() {
  const [activeTab, setActiveTab] = useState<'yevmiye' | 'buyukDefter' | 'mizan'>('yevmiye')
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01')
  const [searchQuery, setSearchQuery] = useState('')

  // Demo veriler - Gerçek uygulamada API'den gelecek
  const yevmiyeKayitlari: Transaction[] = [
    {
      id: '1',
      tarih: '2024-01-15',
      aciklama: 'ABC Ltd. Fatura No: 2024/001',
      hesapKodu: '100',
      hesapAdi: 'Kasa',
      borc: 11800,
      alacak: 0,
      tur: 'gelir',
      belgeNo: 'FAT-2024/001',
    },
    {
      id: '2',
      tarih: '2024-01-15',
      aciklama: 'ABC Ltd. Fatura No: 2024/001',
      hesapKodu: '600',
      hesapAdi: 'Yurtiçi Satışlar',
      borc: 0,
      alacak: 10000,
      tur: 'gelir',
      belgeNo: 'FAT-2024/001',
    },
    {
      id: '3',
      tarih: '2024-01-15',
      aciklama: 'ABC Ltd. Fatura No: 2024/001 - KDV',
      hesapKodu: '391',
      hesapAdi: 'Hesaplanan KDV',
      borc: 0,
      alacak: 1800,
      tur: 'gelir',
      belgeNo: 'FAT-2024/001',
    },
    {
      id: '4',
      tarih: '2024-01-18',
      aciklama: 'Elektrik Faturası',
      hesapKodu: '770',
      hesapAdi: 'Genel Yönetim Giderleri',
      borc: 590,
      alacak: 0,
      tur: 'gider',
      belgeNo: 'GID-2024/015',
    },
    {
      id: '5',
      tarih: '2024-01-18',
      aciklama: 'Elektrik Faturası - KDV',
      hesapKodu: '191',
      hesapAdi: 'İndirilecek KDV',
      borc: 106.20,
      alacak: 0,
      tur: 'gider',
      belgeNo: 'GID-2024/015',
    },
    {
      id: '6',
      tarih: '2024-01-18',
      aciklama: 'Elektrik Faturası Ödemesi',
      hesapKodu: '100',
      hesapAdi: 'Kasa',
      borc: 0,
      alacak: 696.20,
      tur: 'gider',
      belgeNo: 'GID-2024/015',
    },
  ]

  const hesapOzetleri: HesapOzeti[] = [
    { hesapKodu: '100', hesapAdi: 'Kasa', toplamBorc: 11800, toplamAlacak: 696.20, bakiye: 11103.80 },
    { hesapKodu: '191', hesapAdi: 'İndirilecek KDV', toplamBorc: 106.20, toplamAlacak: 0, bakiye: 106.20 },
    { hesapKodu: '391', hesapAdi: 'Hesaplanan KDV', toplamBorc: 0, toplamAlacak: 1800, bakiye: -1800 },
    { hesapKodu: '600', hesapAdi: 'Yurtiçi Satışlar', toplamBorc: 0, toplamAlacak: 10000, bakiye: -10000 },
    { hesapKodu: '770', hesapAdi: 'Genel Yönetim Giderleri', toplamBorc: 590, toplamAlacak: 0, bakiye: 590 },
  ]

  const toplamBorc = yevmiyeKayitlari.reduce((sum, t) => sum + t.borc, 0)
  const toplamAlacak = yevmiyeKayitlari.reduce((sum, t) => sum + t.alacak, 0)

  const filteredTransactions = yevmiyeKayitlari.filter(t =>
    t.aciklama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.hesapAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.hesapKodu.includes(searchQuery)
  )

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
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
            Muhasebe
          </h1>
          <p className="text-white/60">Yevmiye defteri, büyük defter ve mizan raporlarınız</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/20">
                <ArrowDownTrayIcon className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white/60 text-sm">Toplam Borç</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <ArrowDownTrayIcon className="w-5 h-5 text-blue-400 rotate-180" />
              </div>
              <span className="text-white/60 text-sm">Toplam Alacak</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <ChartBarIcon className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-white/60 text-sm">Fark (Denge)</span>
            </div>
            <p className={`text-2xl font-bold ${toplamBorc === toplamAlacak ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(toplamBorc - toplamAlacak).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
              {toplamBorc === toplamAlacak && ' ✓'}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Hesap adı, kod veya açıklama ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Period Filter */}
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-white/40" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="2024-01">Ocak 2024</option>
                <option value="2023-12">Aralık 2023</option>
                <option value="2023-11">Kasım 2023</option>
              </select>
            </div>

            {/* Export */}
            <button className="btn-secondary">
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Dışa Aktar</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card mb-6"
        >
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('yevmiye')}
              className={`flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'yevmiye'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <DocumentTextIcon className="w-5 h-5" />
              Yevmiye Defteri
            </button>
            <button
              onClick={() => setActiveTab('buyukDefter')}
              className={`flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'buyukDefter'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <TableCellsIcon className="w-5 h-5" />
              Büyük Defter
            </button>
            <button
              onClick={() => setActiveTab('mizan')}
              className={`flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'mizan'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              Mizan
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card overflow-hidden"
        >
          {activeTab === 'yevmiye' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Tarih</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Hesap Kodu</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Hesap Adı</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Açıklama</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-white/80">Borç</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-white/80">Alacak</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Belge No</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm text-white/80">
                        {new Date(transaction.tarih).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-white">{transaction.hesapKodu}</td>
                      <td className="px-4 py-3 text-sm text-white">{transaction.hesapAdi}</td>
                      <td className="px-4 py-3 text-sm text-white/60">{transaction.aciklama}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-green-400">
                        {transaction.borc > 0
                          ? transaction.borc.toLocaleString('tr-TR', { minimumFractionDigits: 2 })
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-blue-400">
                        {transaction.alacak > 0
                          ? transaction.alacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-white/60">{transaction.belgeNo}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-white/5 font-bold">
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-sm text-white">
                      TOPLAM
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-400">
                      {toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-blue-400">
                      {toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {activeTab === 'buyukDefter' && (
            <div className="p-6">
              <p className="text-white/60 mb-4">Hesap bazlı detaylı kayıtlar</p>
              <div className="space-y-4">
                {hesapOzetleri.map((hesap) => (
                  <div key={hesap.hesapKodu} className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-mono text-amber-400">{hesap.hesapKodu}</span>
                        <span className="text-white ml-3">{hesap.hesapAdi}</span>
                      </div>
                      <span
                        className={`font-bold ${
                          hesap.bakiye >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {Math.abs(hesap.bakiye).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <span className="text-white/60">
                        Borç: <span className="text-green-400">{hesap.toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                      </span>
                      <span className="text-white/60">
                        Alacak: <span className="text-blue-400">{hesap.toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mizan' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Hesap Kodu</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/80">Hesap Adı</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-white/80">Borç Toplamı</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-white/80">Alacak Toplamı</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-white/80">Bakiye</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {hesapOzetleri.map((hesap) => (
                    <tr key={hesap.hesapKodu} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-amber-400">{hesap.hesapKodu}</td>
                      <td className="px-4 py-3 text-sm text-white">{hesap.hesapAdi}</td>
                      <td className="px-4 py-3 text-sm text-right text-green-400">
                        {hesap.toplamBorc.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-blue-400">
                        {hesap.toplamAlacak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </td>
                      <td className={`px-4 py-3 text-sm text-right font-bold ${hesap.bakiye >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {Math.abs(hesap.bakiye).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                        {hesap.bakiye < 0 && ' (A)'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-white/5 font-bold">
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm text-white">
                      GENEL TOPLAM
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-400">
                      {hesapOzetleri.reduce((sum, h) => sum + h.toplamBorc, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-blue-400">
                      {hesapOzetleri.reduce((sum, h) => sum + h.toplamAlacak, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      {toplamBorc === toplamAlacak ? (
                        <span className="text-green-400">Dengede ✓</span>
                      ) : (
                        <span className="text-red-400">Dengesiz ⚠️</span>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6 mt-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <ChartBarIcon className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">AI Muhasebe İçgörüleri</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Muhasebe kayıtlarınız dengede. Borç = Alacak ✅</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">⚠️</span>
                  <span>KDV beyannameniz bu ay 15'inde. Ödenecek KDV: 1.693,80 ₺</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">💡</span>
                  <span>Genel yönetim giderleriniz geçen aya göre %12 arttı. Elektrik ve kira ödemeleri yüksek.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
