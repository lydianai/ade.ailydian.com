import { Routes, Route } from 'react-router-dom'
import DevelopmentBanner from './components/DevelopmentBanner'
import AnaSayfa from './pages/AnaSayfa'
import GirisYap from './pages/GirisYap'
import KayitOl from './pages/KayitOl'
import Dashboard from './pages/Dashboard'
import DashboardIntegrations from './pages/DashboardIntegrations'
import DashboardAI from './pages/DashboardAI'
import DashboardEFatura from './pages/DashboardEFatura'
import DashboardAnalytics from './pages/DashboardAnalytics'
import DashboardSettings from './pages/DashboardSettings'
import DashboardCustomers from './pages/DashboardCustomers'
import DashboardPayments from './pages/DashboardPayments'
import DashboardProfile from './pages/DashboardProfile'
import DashboardSecurity from './pages/DashboardSecurity'
import DashboardAccounting from './pages/DashboardAccounting'
import DashboardEcommerce from './pages/DashboardEcommerce'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

// Footer Pages
import ApiDocs from './pages/ApiDocs'
import Roadmap from './pages/Roadmap'
import Esnaf from './pages/solutions/Esnaf'
import Kobi from './pages/solutions/Kobi'
import Vatandas from './pages/solutions/Vatandas'
import Muhasebe from './pages/solutions/Muhasebe'
import Enterprise from './pages/solutions/Enterprise'
import About from './pages/About'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Press from './pages/Press'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'
import Disclosure from './pages/Disclosure'
import Security from './pages/Security'
import Help from './pages/Help'
import Support from './pages/Support'
import Faq from './pages/Faq'
import Tutorials from './pages/Tutorials'
import Community from './pages/Community'

function App() {
  return (
    <>
      {/* Development Banner */}
      <DevelopmentBanner />

      {/* Animated Gradient Background (Global) */}
      <div className="gradient-mesh-bg" aria-hidden="true" />

      {/* Routes */}
      <div className="relative z-10 pt-12">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AnaSayfa />} />
          <Route path="/giris-yap" element={<GirisYap />} />
          <Route path="/kayit-ol" element={<KayitOl />} />
          <Route
            path="/panel"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/entegrasyonlar"
            element={
              <ProtectedRoute>
                <DashboardIntegrations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/ai-asistan"
            element={
              <ProtectedRoute>
                <DashboardAI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/faturalar"
            element={
              <ProtectedRoute>
                <DashboardEFatura />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/raporlar"
            element={
              <ProtectedRoute>
                <DashboardAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/ayarlar"
            element={
              <ProtectedRoute>
                <DashboardSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/musteriler"
            element={
              <ProtectedRoute>
                <DashboardCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/odemeler"
            element={
              <ProtectedRoute>
                <DashboardPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/profil"
            element={
              <ProtectedRoute>
                <DashboardProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/guvenlik"
            element={
              <ProtectedRoute>
                <DashboardSecurity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/2fa"
            element={
              <ProtectedRoute>
                <DashboardSecurity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/muhasebe"
            element={
              <ProtectedRoute>
                <DashboardAccounting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/e-ticaret"
            element={
              <ProtectedRoute>
                <DashboardEcommerce />
              </ProtectedRoute>
            }
          />

          {/* Footer Pages - Ürün */}
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/roadmap" element={<Roadmap />} />

          {/* Footer Pages - Çözümler */}
          <Route path="/solutions/esnaf" element={<Esnaf />} />
          <Route path="/solutions/kobi" element={<Kobi />} />
          <Route path="/solutions/vatandas" element={<Vatandas />} />
          <Route path="/solutions/muhasebe" element={<Muhasebe />} />
          <Route path="/solutions/enterprise" element={<Enterprise />} />

          {/* Footer Pages - Şirket */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />

          {/* Footer Pages - Yasal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/disclosure" element={<Disclosure />} />
          <Route path="/security" element={<Security />} />

          {/* Footer Pages - Destek */}
          <Route path="/help" element={<Help />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </>
  )
}

export default App
