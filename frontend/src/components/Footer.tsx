import { Link } from 'react-router-dom'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Logo from './Logo'

export default function Footer() {
  const footerSections = [
    {
      title: 'Ürün',
      links: [
        { name: 'Özellikler', href: '#features' },
        { name: 'Fiyatlandırma', href: '#pricing' },
        { name: 'Entegrasyonlar', href: '#integrations' },
        { name: 'API Dokümantasyonu', href: '/api-docs' },
        { name: 'Yol Haritası', href: '/roadmap' },
      ],
    },
    {
      title: 'Çözümler',
      links: [
        { name: 'Esnaf için', href: '/solutions/esnaf' },
        { name: 'KOBİ için', href: '/solutions/kobi' },
        { name: 'Vatandaş için', href: '/solutions/vatandas' },
        { name: 'Muhasebeciler için', href: '/solutions/muhasebe' },
        { name: 'Kurumsal', href: '/solutions/enterprise' },
      ],
    },
    {
      title: 'Şirket',
      links: [
        { name: 'Hakkımızda', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Kariyer', href: '/careers' },
        { name: 'Basın Kiti', href: '/press' },
        { name: 'İletişim', href: '/contact' },
      ],
    },
    {
      title: 'Yasal',
      links: [
        { name: 'KVKK Politikası', href: '/privacy' },
        { name: 'Kullanım Şartları', href: '/terms' },
        { name: 'Çerez Politikası', href: '/cookies' },
        { name: 'Aydınlatma Metni', href: '/disclosure' },
        { name: 'Güvenlik', href: '/security' },
      ],
    },
    {
      title: 'Destek',
      links: [
        { name: 'Yardım Merkezi', href: '/help' },
        { name: 'Canlı Destek', href: '/support' },
        { name: 'SSS', href: '/faq' },
        { name: 'Video Eğitimler', href: '/tutorials' },
        { name: 'Topluluk', href: '/community' },
      ],
    },
  ]

  const integrations = [
    'e-Devlet', 'GİB', 'SGK', 'MERSIS', 'UYAP', 'MHRS',
    'e-İmza', 'Açık Bankacılık', 'Trendyol', 'Hepsiburada',
  ]

  return (
    <footer className="relative mt-32 border-t border-white/10">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />

      <div className="relative container-custom py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-6 inline-block">
              <Logo size="md" animated={false} showText={true} variant="white" />
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              Türkiye'nin ilk yapay zeka destekli devlet asistanı.
              18 bakanlık ve kurumla entegre, hukuken geçerli işlemler yapabilen tek platform.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@ade.gov.tr" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                <EnvelopeIcon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>info@ade.gov.tr</span>
              </a>
              <a href="tel:+908503908080" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                <PhoneIcon className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
                <span>0850 390 80 80</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPinIcon className="w-5 h-5 text-purple-500 mt-0.5" />
                <span>Maslak Mahallesi, Teknoloji Cd. No:12<br />Sarıyer / İstanbul</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-gradient-to-r from-amber-500 to-teal-500 group-hover:w-4 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integrations Section */}
        <div className="py-8 border-y border-white/10 mb-8">
          <h4 className="text-white/80 font-medium mb-4 text-center">
            Resmi Entegrasyonlar
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration) => (
              <span
                key={integration}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:border-amber-500/30 transition-all"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50">
          <div>
            © 2026 ADE - Akıllı Devlet Ekosistemi. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/adegovtr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com/company/ade" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/ade-gov-tr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://youtube.com/@adegovtr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              YouTube
            </a>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs text-white/40">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ISO 27001 Sertifikalı
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            KVKK Uyumlu
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            SOC 2 Type II
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            99.95% Uptime SLA
          </span>
        </div>
      </div>
    </footer>
  )
}
