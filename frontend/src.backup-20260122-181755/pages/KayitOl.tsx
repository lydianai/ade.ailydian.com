import { useState, FormEvent } from 'react';

const KayitOl = () => {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    sifre: '',
    sifreTekrar: '',
    isletmeAdi: '',
    kvkkOnay: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ad.trim()) newErrors.ad = 'Ad gereklidir';
    if (!formData.soyad.trim()) newErrors.soyad = 'Soyad gereklidir';
    if (!formData.email) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta giriniz';
    }
    if (!formData.sifre) {
      newErrors.sifre = 'Şifre gereklidir';
    } else if (formData.sifre.length < 6) {
      newErrors.sifre = 'Şifre en az 6 karakter olmalıdır';
    }
    if (formData.sifre !== formData.sifreTekrar) {
      newErrors.sifreTekrar = 'Şifreler eşleşmiyor';
    }
    if (!formData.kvkkOnay) {
      newErrors.kvkkOnay = 'KVKK metnini onaylamanız gerekmektedir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/kayit-ol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ad: formData.ad,
          soyad: formData.soyad,
          email: formData.email,
          telefon: formData.telefon || undefined,
          sifre: formData.sifre,
          isletmeAdi: formData.isletmeAdi || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setErrors({ email: data.message });
        } else {
          throw new Error('Kayıt işlemi başarısız oldu');
        }
        setLoading(false);
        return;
      }

      console.log('✅ Kayıt başarılı!');
      setSuccess(true);
    } catch (err: any) {
      console.error('❌ Kayıt hatası:', err);
      setErrors({ email: err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 25%, #14b8a6 50%, #f59e0b 75%, #f97316 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          padding: '64px 48px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)'
          }}>
            <span style={{ fontSize: '48px' }}>✓</span>
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#0f172a',
            margin: '0 0 16px 0'
          }}>
            Kayıt Başarılı!
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            margin: '0 0 32px 0'
          }}>
            Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.
          </p>
          <a href="/giris-yap" style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: '#06b6d4',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '16px',
            transition: 'all 0.3s',
            boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(6, 182, 212, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(6, 182, 212, 0.3)';
          }}
          >
            Giriş Yap →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 25%, #14b8a6 50%, #f59e0b 75%, #f97316 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
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
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(251, 146, 60, 0.2)',
        padding: '48px 40px',
        position: 'relative',
        zIndex: 10,
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          {/* ADE Logo */}
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            position: 'relative'
          }}>
            {/* Arka plan halka - Kehribar */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
              borderRadius: '20px',
              opacity: 0.15,
              transform: 'rotate(45deg)'
            }} />
            {/* Ana logo kutusu - Turkuaz */}
            <div style={{
              position: 'absolute',
              inset: '6px',
              background: '#06b6d4',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(6, 182, 212, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              <span style={{
                fontSize: '36px',
                fontWeight: '900',
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                letterSpacing: '-0.05em'
              }}>ADE</span>
            </div>
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#0891b2',
            margin: '0 0 8px 0'
          }}>
            Hesap Oluştur
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 6px 0',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Akıllı Dijital Ekosistem
          </p>
          <p style={{
            fontSize: '15px',
            color: '#94a3b8',
            margin: 0
          }}>
            Ücretsiz hesabınızı oluşturun
          </p>
        </div>

        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            Lütfen tüm gerekli alanları doldurun
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Ad Soyad - İki Sütun */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Ad */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Ad *
              </label>
              <input
                type="text"
                value={formData.ad}
                onChange={(e) => handleChange('ad', e.target.value)}
                placeholder="Adınız"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '15px',
                  border: errors.ad ? '2px solid #dc2626' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.ad) {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.ad ? '#dc2626' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.ad && (
                <p style={{ fontSize: '13px', color: '#dc2626', margin: '4px 0 0 0' }}>
                  {errors.ad}
                </p>
              )}
            </div>

            {/* Soyad */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Soyad *
              </label>
              <input
                type="text"
                value={formData.soyad}
                onChange={(e) => handleChange('soyad', e.target.value)}
                placeholder="Soyadınız"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '15px',
                  border: errors.soyad ? '2px solid #dc2626' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.soyad) {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.soyad ? '#dc2626' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.soyad && (
                <p style={{ fontSize: '13px', color: '#dc2626', margin: '4px 0 0 0' }}>
                  {errors.soyad}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              E-posta *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ornek@email.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '15px',
                border: errors.email ? '2px solid #dc2626' : '2px solid #e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#06b6d4';
                  e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#dc2626' : '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && (
              <p style={{ fontSize: '13px', color: '#dc2626', margin: '4px 0 0 0' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Telefon (Opsiyonel) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Telefon <span style={{ color: '#94a3b8', fontWeight: '400' }}>(opsiyonel)</span>
            </label>
            <input
              type="tel"
              value={formData.telefon}
              onChange={(e) => handleChange('telefon', e.target.value)}
              placeholder="0532 123 45 67"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
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

          {/* İşletme Adı (Opsiyonel) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              İşletme Adı <span style={{ color: '#94a3b8', fontWeight: '400' }}>(opsiyonel)</span>
            </label>
            <input
              type="text"
              value={formData.isletmeAdi}
              onChange={(e) => handleChange('isletmeAdi', e.target.value)}
              placeholder="İşletmenizin adı"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
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

          {/* Şifre ve Şifre Tekrar - İki Sütun */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Şifre */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Şifre *
              </label>
              <input
                type="password"
                value={formData.sifre}
                onChange={(e) => handleChange('sifre', e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '15px',
                  border: errors.sifre ? '2px solid #dc2626' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.sifre) {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.sifre ? '#dc2626' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.sifre && (
                <p style={{ fontSize: '12px', color: '#dc2626', margin: '4px 0 0 0' }}>
                  {errors.sifre}
                </p>
              )}
            </div>

            {/* Şifre Tekrar */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Şifre Tekrar *
              </label>
              <input
                type="password"
                value={formData.sifreTekrar}
                onChange={(e) => handleChange('sifreTekrar', e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '15px',
                  border: errors.sifreTekrar ? '2px solid #dc2626' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!errors.sifreTekrar) {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.sifreTekrar ? '#dc2626' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.sifreTekrar && (
                <p style={{ fontSize: '12px', color: '#dc2626', margin: '4px 0 0 0' }}>
                  {errors.sifreTekrar}
                </p>
              )}
            </div>
          </div>

          {/* KVKK Onay */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.kvkkOnay}
                onChange={(e) => handleChange('kvkkOnay', e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  marginTop: '2px',
                  cursor: 'pointer',
                  accentColor: '#06b6d4'
                }}
              />
              <span style={{
                fontSize: '14px',
                color: '#374151',
                lineHeight: '1.5'
              }}>
                <a href="#" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: '600' }}>
                  KVKK Aydınlatma Metni
                </a>
                'ni okudum ve kabul ediyorum *
              </span>
            </label>
            {errors.kvkkOnay && (
              <p style={{ fontSize: '13px', color: '#dc2626', margin: '4px 0 0 28px' }}>
                {errors.kvkkOnay}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '17px',
              fontWeight: '700',
              color: 'white',
              background: loading ? '#94a3b8' : '#f59e0b',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading
                ? 'none'
                : '0 8px 24px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(245, 158, 11, 0.25)',
              transform: loading ? 'none' : 'translateY(0)',
              letterSpacing: '0.03em',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
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
            {loading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '32px 0',
          gap: '16px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.05em' }}>VEYA</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(6, 182, 212, 0.08)',
          padding: '20px',
          borderRadius: '14px',
          border: '2px solid rgba(6, 182, 212, 0.25)'
        }}>
          <span style={{ fontSize: '15px', color: '#334155', fontWeight: '600' }}>
            Zaten hesabınız var mı?{' '}
          </span>
          <a href="/giris-yap" style={{
            fontSize: '15px',
            color: '#06b6d4',
            textDecoration: 'none',
            fontWeight: '800',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0891b2';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#06b6d4';
            e.currentTarget.style.textDecoration = 'none';
          }}
          >
            Giriş Yapın →
          </a>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
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

export default KayitOl;
