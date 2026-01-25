import { useState, FormEvent } from 'react';

const GirisYap = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/giris-yap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      console.log('✅ Giriş başarılı!');
      window.location.href = '/panel';
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('❌ Giriş hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 25%, #14b8a6 50%, #f59e0b 75%, #f97316 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.3) 0%, transparent 50%, rgba(6, 182, 212, 0.3) 100%)',
        opacity: 0.6,
        animation: 'gradientShift 8s ease infinite',
        pointerEvents: 'none'
      }} />

      {/* Floating elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(251, 146, 60, 0.2)',
        padding: '64px 56px',
        position: 'relative',
        zIndex: 10,
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        {/* Premium ADE Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          {/* Özel ADE Logosu - Geometrik Tasarım */}
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 24px',
            position: 'relative'
          }}>
            {/* Arka plan halka - Kehribar */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
              borderRadius: '24px',
              opacity: 0.15,
              transform: 'rotate(45deg)'
            }} />
            {/* Ana logo kutusu - Turkuaz */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              background: '#06b6d4',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(6, 182, 212, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              <span style={{
                fontSize: '44px',
                fontWeight: '900',
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                letterSpacing: '-0.05em'
              }}>ADE</span>
            </div>
          </div>

          {/* Başlık */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#0891b2',
            margin: '0 0 12px 0',
            letterSpacing: '-0.03em'
          }}>
            ADE
          </h1>

          {/* Alt başlık - ADE açılımı */}
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 8px 0',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Akıllı Dijital Ekosistem
          </p>

          <p style={{
            fontSize: '15px',
            color: '#94a3b8',
            margin: 0,
            fontWeight: '500'
          }}>
            Hesabınıza güvenli giriş yapın
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
                fontSize: '15px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
                fontSize: '15px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'right', marginBottom: '28px' }}>
            <a href="#" style={{
              fontSize: '14px',
              color: '#06b6d4',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Şifremi unuttum?
            </a>
          </div>

          {/* Premium Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '17px',
              fontWeight: '700',
              color: 'white',
              background: loading ? '#94a3b8' : '#f59e0b',
              border: 'none',
              borderRadius: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading
                ? 'none'
                : '0 8px 24px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(245, 158, 11, 0.25)',
              transform: loading ? 'none' : 'translateY(0)',
              letterSpacing: '0.03em',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.5), 0 6px 16px rgba(245, 158, 11, 0.3)';
                e.currentTarget.style.background = '#f97316';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(245, 158, 11, 0.25)';
                e.currentTarget.style.background = '#f59e0b';
              }
            }}
          >
            {loading ? 'Giriş yapılıyor...' : '✨ Giriş Yap'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '36px 0',
          gap: '16px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.05em' }}>VEYA</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        {/* Premium Signup Link */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(6, 182, 212, 0.08)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid rgba(6, 182, 212, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Turkuaz glow efekti */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <span style={{ fontSize: '16px', color: '#334155', fontWeight: '600', position: 'relative', zIndex: 1 }}>
            Henüz hesabınız yok mu?{' '}
          </span>
          <br />
          <a href="/kayit-ol" style={{
            fontSize: '17px',
            color: '#06b6d4',
            textDecoration: 'none',
            fontWeight: '800',
            borderBottom: '3px solid transparent',
            transition: 'all 0.3s',
            position: 'relative',
            zIndex: 1,
            display: 'inline-block',
            marginTop: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(4px)';
            e.currentTarget.style.borderBottomColor = '#06b6d4';
            e.currentTarget.style.color = '#0891b2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.borderBottomColor = 'transparent';
            e.currentTarget.style.color = '#06b6d4';
          }}
          >
            ✨ Hemen Kayıt Olun →
          </a>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/" style={{
            fontSize: '14px',
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#06b6d4'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          >
            ← Ana sayfaya dön
          </a>
        </div>
      </div>
    </div>
  );
};

export default GirisYap;
