# 🚀 ADE Vercel Deployment Guide

## 📋 Hazırlık Kontrol Listesi

### ✅ Tamamlanan Özellikler

1. **Premium Logo** - Animasyonlu, çoklu varyant SVG logo
2. **Landing Page** - Senaryolu, premium anasayfa
   - Hero section with 3D dashboard preview
   - Problem/Solution sections
   - Sesli asistan demo (interactive)
   - 8 özellik showcaseı
   - 18 kurum entegrasyon gösterimi
   - Animated statistics counters
   - Use case hikayeleri
   - Fiyatlandırma planları
   - CTA sections
   - Professional footer

3. **Backend Infrastructure**
   - ✅ Voice Assistant (Whisper + Claude + Personaplex-7B + TTS)
   - ✅ Tax Calculator Engine (13 endpoints)
   - ✅ Accounting Module (TTK compliant)
   - ✅ JWT Authentication
   - ✅ Database (PostgreSQL + Prisma)
   - ✅ 85+ REST API endpoints

---

## 🎯 Vercel Deployment Adımları

### 1. Frontend Deployment

#### A) Vercel CLI ile Deploy

```bash
cd /Users/lydian/Desktop/ADE/frontend

# Vercel CLI yükle (eğer yoksa)
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

**İlk deploy sırasında sorulan sorular:**
- Set up and deploy? → Yes
- Which scope? → (Kendi hesabınızı seçin)
- Link to existing project? → No
- Project name? → `ade-frontend`
- Directory? → `./`
- Override settings? → No

#### B) Environment Variables (Vercel Dashboard'dan)

```bash
# Vercel Dashboard → Settings → Environment Variables
VITE_API_URL=https://ade-backend.vercel.app
```

#### C) Domain Ayarları

Vercel otomatik domain verir: `ade-frontend.vercel.app`

Özel domain için:
1. Vercel Dashboard → Settings → Domains
2. `ade.com.tr` ekle
3. DNS kayıtlarını güncelle

---

### 2. Backend Deployment

#### A) Database Hazırlığı (Gerekli!)

Backend deploy edilmeden önce production database hazırlanmalı:

**Option 1: Neon.tech (Önerilen - Ücretsiz)**
```bash
# 1. neon.tech'e kaydol
# 2. Yeni PostgreSQL database oluştur
# 3. Connection string al

# Format:
postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require
```

**Option 2: Supabase**
```bash
# 1. supabase.com'a kaydol
# 2. New project oluştur
# 3. Database settings → Connection string
```

#### B) Backend Deploy

```bash
cd /Users/lydian/Desktop/ADE/backend

# Prisma generate (production için)
npx prisma generate

# Deploy
vercel
```

#### C) Environment Variables (Vercel Dashboard'dan)

```bash
# Database
DATABASE_URL=postgresql://[user]:[password]@[host]/[db]

# JWT
JWT_SECRET=super-secret-key-change-in-production-min-32-chars
JWT_EXPIRATION=15m
REFRESH_TOKEN_SECRET=refresh-secret-key-change-in-production
REFRESH_TOKEN_EXPIRATION=7d

# AI Services
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
HUGGINGFACE_API_KEY=hf_...

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# MinIO / S3 (Optional)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=ade-files
```

#### D) Database Migration

```bash
# Production database'e migration uygula
DATABASE_URL="postgresql://..." npx prisma migrate deploy

# Seed data (optional)
DATABASE_URL="postgresql://..." npx prisma db seed
```

---

## 🔄 Continuous Deployment

### GitHub Integration (Otomatik Deploy)

1. **GitHub Repo Oluştur**
```bash
cd /Users/lydian/Desktop/ADE
git init
git add .
git commit -m "Initial commit: ADE v1.0"
git branch -M main
git remote add origin https://github.com/[username]/ade.git
git push -u origin main
```

2. **Vercel'e Bağla**
- Vercel Dashboard → Import Project
- GitHub repo seç
- Frontend ve Backend için ayrı ayrı import et

3. **Otomatik Deploy Ayarları**
- `main` branch'e her push'ta otomatik deploy
- Pull request'lerde preview deployment

---

## 🌐 Domain Configuration

### Custom Domain Bağlama

#### Frontend
```
ade.com.tr         → ade-frontend.vercel.app
www.ade.com.tr     → ade-frontend.vercel.app
```

#### Backend (API)
```
api.ade.com.tr     → ade-backend.vercel.app
```

### DNS Records

```dns
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

---

## 🔒 Güvenlik Kontrolleri

### Pre-Deployment Checklist

- [ ] `.env` dosyaları `.gitignore`'da
- [ ] Production API keys güncel
- [ ] CORS ayarları yapıldı (backend)
- [ ] JWT secret production için değiştirildi (min 32 karakter)
- [ ] Database connection SSL enabled
- [ ] Rate limiting aktif
- [ ] HTTPS enforced
- [ ] Security headers ayarlandı

### CORS Configuration (Backend)

`src/main.ts` dosyasında:

```typescript
app.enableCors({
  origin: [
    'https://ade.com.tr',
    'https://www.ade.com.tr',
    'https://ade-frontend.vercel.app',
  ],
  credentials: true,
});
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics

```bash
# Frontend package.json'a ekle
npm install @vercel/analytics

# _app.tsx veya main.tsx'e ekle:
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Error Tracking

**Option 1: Sentry**
```bash
npm install @sentry/react @sentry/tracing

# main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

---

## 🧪 Post-Deployment Testing

### Frontend Tests

```bash
# Homepage yüklenme
curl -I https://ade.com.tr

# API connection test
curl https://ade.com.tr/api/health
```

### Backend Tests

```bash
# Health check
curl https://api.ade.com.tr/api

# Auth test
curl -X POST https://api.ade.com.tr/api/v1/auth/kayit-ol \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ade.com","password":"Test123!"}'
```

### Voice Assistant Test

```bash
# Health check
curl https://api.ade.com.tr/api/v1/voice/health
```

---

## 🚨 Troubleshooting

### Build Failed

**Problem:** `npm ERR! code ELIFECYCLE`

**Çözüm:**
```bash
# Cache temizle
rm -rf node_modules package-lock.json
npm install

# Build test
npm run build
```

### Database Connection Failed

**Problem:** `Error: P1001: Can't reach database server`

**Çözüm:**
1. Database URL'i kontrol et
2. IP whitelist'e Vercel IP'leri ekle
3. SSL mode'u kontrol et: `?sslmode=require`

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` hatası

**Çözüm:**
```typescript
// backend/src/main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
});
```

---

## 📈 Performance Optimization

### Frontend

1. **Image Optimization**
```bash
# Vercel otomatik optimize eder
# next/image veya lazy loading kullan
```

2. **Code Splitting**
```typescript
// React.lazy ile route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

3. **Bundle Analysis**
```bash
npm run build -- --report
```

### Backend

1. **Database Connection Pooling**
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

2. **API Response Caching**
```typescript
@UseInterceptors(CacheInterceptor)
@CacheTTL(300) // 5 minutes
```

---

## 🎉 Deployment Tamamlandı!

### Erişim Adresleri

- **Frontend:** https://ade.com.tr
- **Backend API:** https://api.ade.com.tr
- **API Docs:** https://api.ade.com.tr/api/docs
- **Voice Assistant:** https://ade.com.tr/panel/sesli-asistan

### Sıradaki Adımlar

1. SSL sertifikaları otomatik yüklendi ✅
2. Production database çalışıyor ✅
3. AI servisleri aktif ✅
4. Monitoring kuruldu ✅

**ADE artık LIVE! 🚀**

---

## 📞 Destek

**Sorun mu yaşıyorsunuz?**

1. Vercel logs: `vercel logs [deployment-url]`
2. GitHub Issues
3. Email: support@ade.com.tr

---

**Not:** Bu deployment guide, ADE'nin production'a alınması için tüm adımları içerir. Her adımı sırasıyla takip ederseniz, sorunsuz bir şekilde deploy edilecektir.
