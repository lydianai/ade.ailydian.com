import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GirisYap from './pages/GirisYap';
import KayitOl from './pages/KayitOl';
import Panel from './pages/Panel';
import AIAsistan from './pages/AIAsistan';

function AnaSayfa() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px'
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Logo */}
      <div style={{
        width: '80px',
        height: '80px',
        background: '#06b6d4',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        <span style={{
          fontSize: '40px',
          fontWeight: '800',
          color: 'white'
        }}>ADE</span>
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          color: '#0891b2',
          margin: '0 0 16px 0',
          letterSpacing: '-0.03em',
          lineHeight: '1.1'
        }}>
          ADE
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#64748b',
          margin: '0 0 8px 0',
          fontWeight: '500'
        }}>
          Akıllı Dijital Ekosistem
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)',
          borderRadius: '50px',
          border: '1px solid rgba(6, 182, 212, 0.15)'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#10b981',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} />
          <span style={{
            fontSize: '15px',
            color: '#475569',
            fontWeight: '600'
          }}>Sistem Aktif</span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '16px',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <a
          href="/giris-yap"
          style={{
            padding: '16px 32px',
            background: '#06b6d4',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '16px',
            boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)',
            transition: 'all 0.3s',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.02em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0891b2';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(6, 182, 212, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#06b6d4';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(6, 182, 212, 0.3)';
          }}
        >
          Giriş Yap →
        </a>

        <a
          href="/kayit-ol"
          style={{
            padding: '16px 32px',
            background: '#f59e0b',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '16px',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.3s',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.02em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f97316';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(245, 158, 11, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f59e0b';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.3)';
          }}
        >
          Kayıt Ol
        </a>
      </div>

      <div style={{
        marginTop: '48px',
        padding: '32px',
        background: 'white',
        borderRadius: '20px',
        maxWidth: '700px',
        border: '1px solid rgba(6, 182, 212, 0.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '700' }}>
            Başarıyla Yüklendi
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          {['React 18', 'Vite 7', 'TypeScript', 'Tailwind CSS 4'].map((tech) => (
            <div key={tech} style={{
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(251, 191, 36, 0.03) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.08)',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '15px',
                color: '#475569',
                fontWeight: '600'
              }}>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/giris-yap" element={<GirisYap />} />
        <Route path="/kayit-ol" element={<KayitOl />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/ai-asistan" element={<AIAsistan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
