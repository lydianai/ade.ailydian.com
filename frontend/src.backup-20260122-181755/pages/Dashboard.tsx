import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Plus,
  Users,
  Menu,
  X,
  Home,
  Receipt,
  UserCircle,
  Settings,
  LogOut,
  Calendar,
  DollarSign,
  PieChart,
  Bell,
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Dashboard = () => {
  const navigate = useNavigate();
  const { kullanici, cikisYap } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mock data
  const stats = [
    {
      title: 'Bekleyen Faturalar',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: FileText,
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
    },
    {
      title: 'Bu Ay Gelir',
      value: '₺125,430',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'secondary',
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-600',
    },
    {
      title: 'Bu Ay Gider',
      value: '₺48,920',
      change: '-8.2%',
      trend: 'down',
      icon: TrendingDown,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Ödenecek Vergi',
      value: '₺18,450',
      change: 'Yaklaşan',
      trend: 'neutral',
      icon: AlertCircle,
      color: 'danger',
      bgColor: 'bg-danger-50',
      iconColor: 'text-danger-600',
    },
  ];

  const recentInvoices = [
    {
      id: 1,
      invoiceNo: 'FAT-2025-001',
      customer: 'ABC Teknoloji A.Ş.',
      date: '2025-01-20',
      amount: '₺15,750',
      status: 'paid',
      statusLabel: 'Ödendi',
    },
    {
      id: 2,
      invoiceNo: 'FAT-2025-002',
      customer: 'XYZ İnşaat Ltd.',
      date: '2025-01-18',
      amount: '₺28,500',
      status: 'pending',
      statusLabel: 'Bekliyor',
    },
    {
      id: 3,
      invoiceNo: 'FAT-2025-003',
      customer: 'Yıldız Mobilya',
      date: '2025-01-15',
      amount: '₺9,200',
      status: 'overdue',
      statusLabel: 'Gecikmiş',
    },
    {
      id: 4,
      invoiceNo: 'FAT-2025-004',
      customer: 'Güneş Tekstil',
      date: '2025-01-12',
      amount: '₺22,100',
      status: 'paid',
      statusLabel: 'Ödendi',
    },
    {
      id: 5,
      invoiceNo: 'FAT-2025-005',
      customer: 'Deniz Lojistik',
      date: '2025-01-10',
      amount: '₺31,450',
      status: 'pending',
      statusLabel: 'Bekliyor',
    },
  ];

  const taxCalendar = [
    { date: '25 Ocak', description: 'KDV Beyannamesi', type: 'kdv' },
    { date: '28 Ocak', description: 'Muhtasar Beyannamesi', type: 'muhtasar' },
    { date: '15 Şubat', description: 'SGK Ödemeleri', type: 'sgk' },
    { date: '25 Şubat', description: 'KDV Beyannamesi', type: 'kdv' },
  ];

  const navigation = [
    { name: 'Ana Sayfa', icon: Home, href: '/panel', current: true },
    { name: 'Faturalar', icon: FileText, href: '/panel/faturalar', current: false },
    { name: 'Müşteriler', icon: Users, href: '/panel/musteriler', current: false },
    { name: 'Raporlar', icon: PieChart, href: '/panel/raporlar', current: false },
    { name: 'Vergi Hesaplama', icon: Calculator, href: '/panel/vergi', current: false },
    { name: 'SGK İşlemleri', icon: Receipt, href: '/panel/sgk', current: false },
  ];

  const handleLogout = async () => {
    await cikisYap();
    navigate('/giris-yap');
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      paid: { variant: 'success' as const, label: 'Ödendi' },
      pending: { variant: 'warning' as const, label: 'Bekliyor' },
      overdue: { variant: 'danger' as const, label: 'Gecikmiş' },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ADE Muhasebe</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${item.current
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {kullanici?.ad?.[0]}{kullanici?.soyad?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {kullanici?.ad} {kullanici?.soyad}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {kullanici?.email}
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <button
                onClick={() => navigate('/panel/ayarlar')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                Ayarlar
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Search */}
              <div className="hidden sm:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Fatura, müşteri ara..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {kullanici?.ad?.[0]}{kullanici?.soyad?.[0]}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {kullanici?.ad} {kullanici?.soyad}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {kullanici?.email}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate('/panel/profil')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle className="h-4 w-4" />
                        Profil
                      </button>
                      <button
                        onClick={() => navigate('/panel/ayarlar')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Ayarlar
                      </button>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Çıkış Yap
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hoş Geldiniz, {kullanici?.ad}
            </h1>
            <p className="text-gray-600">
              İşletmenizin özeti ve güncel durumu
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover padding="lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant={
                            stat.trend === 'up' ? 'success' :
                            stat.trend === 'down' ? 'danger' :
                            'gray'
                          }
                          size="sm"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Invoices */}
            <div className="lg:col-span-2">
              <Card padding="none">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Son Faturalar
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/panel/faturalar')}
                  >
                    Tümünü Gör
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fatura No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Müşteri
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tutar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentInvoices.map((invoice) => {
                        const status = getStatusBadge(invoice.status);
                        return (
                          <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-900">
                                {invoice.invoiceNo}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-900">
                                {invoice.customer}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">
                                {invoice.date}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-900">
                                {invoice.amount}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={status.variant} size="sm">
                                {status.label}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-danger-600 transition-colors">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card padding="lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Hızlı İşlemler
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={Plus}
                    onClick={() => navigate('/panel/faturalar/yeni')}
                  >
                    Yeni Fatura
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={Users}
                    onClick={() => navigate('/panel/musteriler/yeni')}
                  >
                    Müşteri Ekle
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={Calculator}
                    onClick={() => navigate('/panel/vergi')}
                  >
                    Vergi Hesapla
                  </Button>
                </div>
              </Card>

              {/* Tax Calendar */}
              <Card padding="lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Vergi Takvimi
                  </h3>
                </div>

                <div className="space-y-3">
                  {taxCalendar.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        <DollarSign className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {event.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  fullWidth
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate('/panel/takvim')}
                >
                  Tüm Takvimi Görüntüle
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
