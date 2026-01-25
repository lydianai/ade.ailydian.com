# 🇹🇷 ADE - Akıllı Devlet Ekosistemi

> **Türkiye'nin İlk AI-Powered Devlet Asistanı**
> Proaktif, hukuken geçerli işlemler yapabilen, 18 bakanlık entegrasyonlu dijital devlet platformu

## 📋 Proje Bilgileri

- **Versiyon:** 1.0.0-alpha
- **Başlangıç:** Ocak 2025
- **Durum:** Development (MVP)
- **Hedef:** Production Q2 2025

## 🏗️ Mimari

```
ADE/
├── backend/          # NestJS API (Port: 3000)
├── frontend/         # Vite + React (Port: 5173)
├── mobile/           # React Native + Expo (gelecek)
├── shared/           # Ortak tip ve utilityler
├── infrastructure/   # Terraform, Docker, CI/CD
└── docs/            # Teknik dokümantasyon
```

## 🚀 Teknoloji Stack

### Backend
- **Framework:** NestJS 10.x (TypeScript)
- **Database:** PostgreSQL 15 + Prisma ORM
- **Cache:** Redis 7
- **Auth:** JWT (access + refresh tokens)
- **Validation:** class-validator + class-transformer
- **API Docs:** Swagger/OpenAPI 3.0

### Frontend
- **Build Tool:** Vite 5.x
- **Framework:** React 19 + TypeScript
- **Routing:** React Router v6
- **State:** Zustand + TanStack Query v5
- **UI:** Tailwind CSS 4 + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts

### DevOps
- **Container:** Docker + Docker Compose
- **Cloud:** AWS (Frankfurt region - KVKK compliant)
- **CI/CD:** GitHub Actions
- **IaC:** Terraform
- **Monitoring:** Prometheus + Grafana

## 📦 Hızlı Başlangıç

### Gereksinimler
- Node.js 20.x LTS
- pnpm 8.x
- Docker Desktop
- PostgreSQL 15 (veya Docker ile)
- Redis 7 (veya Docker ile)

### Kurulum

```bash
# 1. Repoyu klonla
cd ~/Desktop/ADE

# 2. Bağımlılıkları yükle
pnpm install

# 3. Environment variables kopyala
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. Docker servisleri başlat (PostgreSQL + Redis)
docker-compose up -d

# 5. Database migration
cd backend && pnpm prisma migrate dev

# 6. Backend başlat
pnpm dev:backend

# 7. Frontend başlat (yeni terminal)
pnpm dev:frontend
```

### Erişim
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/docs
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379

## 📐 Kod Standartları

### Commit Konvansiyonları
```
feat: Yeni özellik
fix: Hata düzeltme
docs: Dokümantasyon
style: Kod formatı (logic değişmez)
refactor: Kod iyileştirme
test: Test ekleme/düzeltme
chore: Build, config değişiklikleri
```

### Branch Stratejisi
- `main` - Production-ready kod
- `develop` - Development branch
- `feature/*` - Yeni özellikler
- `bugfix/*` - Hata düzeltmeleri
- `hotfix/*` - Acil production düzeltmeleri

## 🔐 Güvenlik

- ✅ OWASP Top 10 2025 compliant
- ✅ KVKK (6698 Sayılı Kanun) uyumlu
- ✅ JWT authentication (RS256)
- ✅ Rate limiting (100 req/min)
- ✅ Input validation (Zod + class-validator)
- ✅ SQL injection koruması (Prisma ORM)
- ✅ XSS koruması (CSP headers)
- ✅ CSRF tokens
- ✅ Helmet.js security headers

## 📊 Proje Yol Haritası

### Faz 1: MVP (Ay 1-6) - ŞU AN BURDAYIZ
- [x] Proje setup
- [ ] Auth sistemi (login/register)
- [ ] e-Fatura kesme (basit)
- [ ] Dashboard (ana sayfa)
- [ ] Beta launch (50 kullanıcı)

### Faz 2: Core Features (Ay 7-12)
- [ ] GİB entegrasyonu (gerçek)
- [ ] SGK entegrasyonu
- [ ] Muhasebe modülü
- [ ] Public launch (10K kullanıcı)

### Faz 3: Scale (Ay 13-18)
- [ ] AI chatbot (Claude fine-tuned)
- [ ] 18 bakanlık entegrasyonu
- [ ] Mobile app (React Native)
- [ ] 100K kullanıcı

### Faz 4: Dominasyon (Ay 19-24)
- [ ] Sesli asistan (Alexa/Google Home)
- [ ] Predictive analytics
- [ ] Series A funding
- [ ] Market leader

## 👥 Ekip

- **Founder/CTO:** [İsim]
- **Backend Lead:** [İsim]
- **Frontend Lead:** [İsim]
- **DevOps Engineer:** [İsim]

## 📞 İletişim

- **Website:** https://ade.com.tr (yakında)
- **Email:** hello@ade.com.tr
- **GitHub:** https://github.com/ade-ecosystem

## 📄 Lisans

Proprietary - Tüm hakları saklıdır © 2025 ADE Teknoloji A.Ş.

---

**⚠️ ÖNEMLİ:** Bu proje gerçek bir production sistemidir. Güvenlik ve kalite standartları en üst seviyededir.
