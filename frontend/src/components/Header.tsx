import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '../contexts/useAuthStore'
import Logo from './Logo'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Özellikler', href: '#features' },
    { name: 'Nasıl Çalışır', href: '#how-it-works' },
    { name: 'Entegrasyonlar', href: '#integrations' },
    { name: 'Fiyatlandırma', href: '#pricing' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-card py-3' : 'bg-transparent py-5'
      }`}
      style={{ marginTop: '0px' }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <Logo size="md" animated={false} showText={true} variant="white" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-teal-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/panel" className="btn-secondary">
                Panel
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                  {user?.ad}
                </span>
              </Link>
            ) : (
              <>
                <Link to="/giris-yap" className="btn-ghost">
                  Giriş Yap
                </Link>
                <Link to="/kayit-ol" className="btn-primary">
                  Ücretsiz Başla
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-4 pt-6 pb-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 px-4 pt-4 border-t border-white/10">
                  {isAuthenticated ? (
                    <Link
                      to="/panel"
                      className="btn-primary text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Panel
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/giris-yap"
                        className="btn-secondary text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        to="/kayit-ol"
                        className="btn-primary text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Ücretsiz Başla
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
