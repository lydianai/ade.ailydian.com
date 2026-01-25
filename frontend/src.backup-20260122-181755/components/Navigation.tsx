import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
      boxShadow: '0 4px 20px rgba(30, 64, 175, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(251, 191, 36, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: '900',
              color: 'white',
              letterSpacing: '-0.05em'
            }}>ADE</span>
          </div>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '900',
              color: 'white',
              letterSpacing: '-0.02em'
            }}>ADE</div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>Akıllı Dijital Ekosistem</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{
          display: 'none',
          '@media (min-width: 768px)': { display: 'flex' },
          gap: '32px',
          alignItems: 'center'
        }} className="desktop-menu">
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s',
            opacity: 0.9
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Ana Sayfa
          </Link>
          <Link to="/ozellikler" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s',
            opacity: 0.9
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Özellikler
          </Link>
          <Link to="/fiyatlandirma" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s',
            opacity: 0.9
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Fiyatlandırma
          </Link>
          <Link to="/iletisim" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s',
            opacity: 0.9
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            İletişim
          </Link>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'none',
          '@media (min-width: 768px)': { display: 'flex' },
          gap: '12px',
          alignItems: 'center'
        }} className="desktop-cta">
          <Link to="/giris-yap" style={{
            padding: '10px 24px',
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '14px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Giriş Yap
          </Link>
          <Link to="/kayit-ol" style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '14px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(245, 158, 11, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.4)';
          }}>
            Ücretsiz Başla
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'block',
            '@media (min-width: 768px)': { display: 'none' },
            background: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '10px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px'
          }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            padding: '12px',
            borderRadius: '8px',
            transition: 'background 0.3s'
          }}
          onClick={() => setMobileMenuOpen(false)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            Ana Sayfa
          </Link>
          <Link to="/ozellikler" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            padding: '12px',
            borderRadius: '8px',
            transition: 'background 0.3s'
          }}
          onClick={() => setMobileMenuOpen(false)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            Özellikler
          </Link>
          <Link to="/fiyatlandirma" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            padding: '12px',
            borderRadius: '8px',
            transition: 'background 0.3s'
          }}
          onClick={() => setMobileMenuOpen(false)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            Fiyatlandırma
          </Link>
          <Link to="/iletisim" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            padding: '12px',
            borderRadius: '8px',
            transition: 'background 0.3s'
          }}
          onClick={() => setMobileMenuOpen(false)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            İletişim
          </Link>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '12px'
          }}>
            <Link to="/giris-yap" style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '15px',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
            onClick={() => setMobileMenuOpen(false)}>
              Giriş Yap
            </Link>
            <Link to="/kayit-ol" style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              color: 'white',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '15px',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)'
            }}
            onClick={() => setMobileMenuOpen(false)}>
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-menu, .desktop-cta {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
