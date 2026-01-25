import { useEffect, useState } from 'react';

const Panel = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        window.location.href = '/giris-yap';
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/profil', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token geçersiz');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Auth hatası:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/giris-yap';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#64748b'
        }}>
          Yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#06b6d4',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)'
            }}>
              <span style={{
                fontSize: '24px',
                fontWeight: '900',
                color: 'white',
                letterSpacing: '-0.05em'
              }}>ADE</span>
            </div>
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#0891b2',
                margin: 0
              }}>ADE</h1>
              <p style={{
                fontSize: '11px',
                color: '#64748b',
                margin: 0,
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>Akıllı Dijital Ekosistem</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#0f172a',
                margin: 0
              }}>
                {user?.ad} {user?.soyad}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                margin: 0
              }}>
                {user?.email}
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/ai-asistan'}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(6, 182, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(6, 182, 212, 0.3)';
              }}
            >
              <span style={{ fontSize: '16px' }}>✨</span>
              AI Asistan
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f97316';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f59e0b';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.3)';
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '40px auto',
        padding: '0 24px'
      }}>
        {/* Welcome Card */}
        <div style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          borderRadius: '24px',
          padding: '48px',
          marginBottom: '32px',
          boxShadow: '0 12px 40px rgba(6, 182, 212, 0.3)',
          color: 'white'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: '0 0 12px 0'
          }}>
            Hoş Geldiniz! 🎉
          </h2>
          <p style={{
            fontSize: '18px',
            margin: 0,
            opacity: 0.95
          }}>
            ADE sistemine başarıyla giriş yaptınız.
          </p>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Account Info Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a',
              margin: '0 0 20px 0'
            }}>
              👤 Hesap Bilgileri
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  margin: '0 0 4px 0',
                  fontWeight: '600'
                }}>Ad Soyad</p>
                <p style={{
                  fontSize: '15px',
                  color: '#0f172a',
                  margin: 0,
                  fontWeight: '600'
                }}>
                  {user?.ad} {user?.soyad}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  margin: '0 0 4px 0',
                  fontWeight: '600'
                }}>E-posta</p>
                <p style={{
                  fontSize: '15px',
                  color: '#0f172a',
                  margin: 0,
                  fontWeight: '600'
                }}>
                  {user?.email}
                </p>
              </div>
              {user?.telefon && (
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    margin: '0 0 4px 0',
                    fontWeight: '600'
                  }}>Telefon</p>
                  <p style={{
                    fontSize: '15px',
                    color: '#0f172a',
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    {user?.telefon}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a',
              margin: '0 0 20px 0'
            }}>
              ✅ Sistem Durumu
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#10b981',
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#0f172a',
                  margin: 0
                }}>Aktif</p>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b',
                  margin: 0
                }}>Tüm sistemler çalışıyor</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a',
              margin: '0 0 20px 0'
            }}>
              ⚡ Hızlı Erişim
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Sistemdeki modüller yakında burada görünecek.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Panel;
