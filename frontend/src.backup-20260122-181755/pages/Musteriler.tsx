import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Plus,
  Search,
  Menu,
  X,
  Home,
  FileText,
  Users,
  PieChart,
  Receipt,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  UserCircle,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building,
  MapPin,
  Filter,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Musteriler = () => {
  const navigate = useNavigate();
  const { kullanici, cikisYap } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock customers data
  const customers = [
    {
      id: 1,
      name: 'ABC Teknoloji A.Ş.',
      contactPerson: 'Ahmet Yılmaz',
      email: 'ahmet@abcteknoloji.com',
      phone: '0532 123 45 67',
      taxOffice: 'Kadıköy',
      taxNumber: '1234567890',
      address: 'İstanbul, Kadıköy',
      invoiceCount: 12,
      totalAmount: '₺185,750',
      status: 'active',
    },
    {
      id: 2,
      name: 'XYZ İnşaat Ltd. Şti.',
      contactPerson: 'Mehmet Demir',
      email: 'mehmet@xyzinsaat.com',
      phone: '0533 234 56 78',
      taxOffice: 'Beşiktaş',
      taxNumber: '9876543210',
      address: 'İstanbul, Beşiktaş',
      invoiceCount: 8,
      totalAmount: '₺128,500',
      status: 'active',
    },
    {
      id: 3,
      name: 'Yıldız Mobilya',
      contactPerson: 'Ayşe Kaya',
      email: 'ayse@yildizmobilya.com',
      phone: '0534 345 67 89',
      taxOffice: 'Ankara',
      taxNumber: '5432167890',
      address: 'Ankara, Çankaya',
      invoiceCount: 15,
      totalAmount: '₺95,200',
      status: 'active',
    },
    {
      id: 4,
      name: 'Güneş Tekstil',
      contactPerson: 'Fatma Öztürk',
      email: 'fatma@gunestekstil.com',
      phone: '0535 456 78 90',
      taxOffice: 'Bursa',
      taxNumber: '7654321098',
      address: 'Bursa, Osmangazi',
      invoiceCount: 6,
      totalAmount: '₺72,300',
      status: 'inactive',
    },
    {
      id: 5,
      name: 'Deniz Lojistik A.Ş.',
      contactPerson: 'Ali Şahin',
      email: 'ali@denizlojistik.com',
      phone: '0536 567 89 01',
      taxOffice: 'İzmir',
      taxNumber: '3456789012',
      address: 'İzmir, Konak',
      invoiceCount: 20,
      totalAmount: '₺245,680',
      status: 'active',
    },
  ];

  const navigation = [
    { name: 'Ana Sayfa', icon: Home, href: '/panel', current: false },
    { name: 'Faturalar', icon: FileText, href: '/panel/faturalar', current: false },
    { name: 'Müşteriler', icon: Users, href: '/panel/musteriler', current: true },
    { name: 'Raporlar', icon: PieChart, href: '/panel/raporlar', current: false },
    { name: 'Vergi Hesaplama', icon: Calculator, href: '/panel/vergi', current: false },
    { name: 'SGK İşlemleri', icon: Receipt, href: '/panel/sgk', current: false },
  ];

  const handleLogout = async () => {
    await cikisYap();
    navigate('/giris-yap');
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sidebar - Same as Dashboard */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ADE Muhasebe</span>
          </div>

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
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
              </button>

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
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Müşteriler
                </h1>
                <p className="text-gray-600">
                  Toplam {customers.length} müşteri
                </p>
              </div>

              <Button
                variant="primary"
                leftIcon={Plus}
                onClick={() => navigate('/panel/musteriler/yeni')}
              >
                Yeni Müşteri
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <Card padding="lg" className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Müşteri ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <Button variant="outline" leftIcon={Filter}>
                Filtrele
              </Button>
            </div>
          </Card>

          {/* Customers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card hover padding="lg" className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {customer.name}
                        </h3>
                        <Badge
                          variant={customer.status === 'active' ? 'success' : 'gray'}
                          size="sm"
                          dot
                        >
                          {customer.status === 'active' ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UserCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{customer.contactPerson}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{customer.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{customer.address}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Fatura Sayısı</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {customer.invoiceCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Toplam Tutar</p>
                        <p className="text-lg font-semibold text-primary-700">
                          {customer.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      leftIcon={Eye}
                      onClick={() => navigate(`/panel/musteriler/${customer.id}`)}
                    >
                      Görüntüle
                    </Button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <Card padding="lg" className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Müşteri Bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                Arama kriterlerine uygun müşteri bulunamadı
              </p>
              <Button
                variant="primary"
                leftIcon={Plus}
                onClick={() => navigate('/panel/musteriler/yeni')}
              >
                Yeni Müşteri Ekle
              </Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Musteriler;
