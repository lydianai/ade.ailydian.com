# 🚀 ADE Kurulum Rehberi

## ✅ ŞU AN TAMAMLANANLAR

### 1. Proje Yapısı Oluşturuldu ✅
```
ADE/
├── README.md               ✅ Ana dok
ümantasyon
├── package.json            ✅ Monorepo root config
├── pnpm-workspace.yaml     ✅ Workspace tanımı
├── docker-compose.yml      ✅ PostgreSQL + Redis + Elasticsearch
├── .gitignore              ✅ Git yapılandırması
├── .prettierrc             ✅ Code formatting
│
├── backend/                ✅ NestJS API
│   ├── prisma/
│   │   └── schema.prisma   ✅ Database schema (User, Invoice, Customer, Tax, Employee)
│   ├── .env.example        ✅ Environment template
│   └── package.json        ✅ Backend dependencies
│
└── frontend/               ✅ Vite + React + TypeScript
    └── (temel yapı hazır)
```

### 2. Database Schema Tasarlandı ✅
- ✅ User (Esnaf, KOBİ, Vatandaş, Kamu)
- ✅ Customer (Müşteri yönetimi)
- ✅ Invoice + InvoiceItem (e-Fatura sistemi)
- ✅ Payment (Ödeme takibi)
- ✅ TaxReturn (Vergi beyannamesi)
- ✅ Employee (SGK işçi bildirimi)
- ✅ AuditLog (KVKK uyumluluk)
- ✅ Session (JWT token yönetimi)

### 3. Docker Services Hazır ✅
- PostgreSQL 15 (port: 5432)
- Redis 7 (port: 6379)
- Elasticsearch 8 (port: 9200) - optional
- Adminer (database UI - port: 8080) - dev only
- Redis Commander (port: 8081) - dev only

---

## 📋 SONRAKİ ADIMLAR (Sırayla Yapılacaklar)

### ADIM 1: Dependencies Kurulumu (10 dakika)
```bash
cd ~/Desktop/ADE

# 1. Root dependencies
pnpm install

# 2. Backend dependencies
cd backend
pnpm install

# 3. Frontend dependencies
cd ../frontend
pnpm install

cd ..
```

### ADIM 2: Docker Servislerini Başlatma (2 dakika)
```bash
cd ~/Desktop/ADE

# PostgreSQL + Redis başlat
docker-compose up -d postgres redis

# Kontrol et (çalışıyor mu?)
docker ps

# Logları gör
docker-compose logs -f postgres redis
```

### ADIM 3: Database Migration (5 dakika)
```bash
cd ~/Desktop/ADE/backend

# Prisma generate (types oluştur)
pnpm prisma generate

# İlk migration (tablolar oluştur)
pnpm prisma migrate dev --name init

# Prisma Studio aç (database UI)
pnpm prisma studio
# → http://localhost:5555 açılacak
```

### ADIM 4: Backend Environment (.env dosyası)
```bash
cd ~/Desktop/ADE/backend

# Template'i kopyala
cp .env.example .env

# Düzenle (gerekli değişiklikleri yap)
nano .env
# veya VSCode ile aç:
code .env
```

**Minimum değiştirilmesi gerekenler:**
- `JWT_ACCESS_SECRET` → güçlü bir secret (32+ karakter)
- `JWT_REFRESH_SECRET` → farklı bir secret
- `ENCRYPTION_KEY` → 32 karakter AES key

### ADIM 5: Backend Başlatma (İlk Test)
```bash
cd ~/Desktop/ADE/backend

# Development mode (watch mode)
pnpm dev

# Terminal çıktısı:
# [Nest] INFO [NestFactory] Starting Nest application...
# [Nest] INFO [InstanceLoader] AppModule dependencies initialized
# [Nest] INFO [RoutesResolver] AppController {/}: +1ms
# [Nest] INFO [NestApplication] Nest application successfully started +2ms
# [Nest] INFO Listening on http://localhost:3000
```

**Test et:**
```bash
# Yeni terminal aç
curl http://localhost:3000

# Cevap: "Hello World!" (başarılı!)
```

### ADIM 6: Frontend Başlatma
```bash
cd ~/Desktop/ADE/frontend

# Development server
pnpm dev

# Terminal çıktısı:
# VITE v5.x ready in xxx ms
# ➜  Local:   http://localhost:5173/
```

**Tarayıcıda aç:** http://localhost:5173

---

## 🎯 ŞİMDİ NEREDEYIZ?

### ✅ TAMAMLANAN (Faz 1 - Gün 1-2)
1. Monorepo yapısı kuruldu
2. Backend NestJS boilerplate
3. Frontend Vite + React boilerplate
4. Production-grade database schema
5. Docker services (PostgreSQL + Redis)
6. Environment configuration
7. Git setup + .gitignore

### 🔄 ŞU AN YAPILMASI GEREKEN (Faz 1 - Gün 3-5)
1. ✅ Dependencies yükle (yukarıdaki ADIM 1)
2. ✅ Docker servisleri başlat (ADIM 2)
3. ✅ Database migrate et (ADIM 3)
4. ✅ .env dosyasını yapılandır (ADIM 4)
5. ✅ Backend'i başlat ve test et (ADIM 5)
6. ✅ Frontend'i başlat (ADIM 6)

### 📅 SONRAKİ 7 GÜN (Faz 1 - Hafta 1)
1. **Backend Auth Module** (Gün 3-4):
   - JWT authentication
   - Login/Register endpoints
   - Password hashing (bcrypt)
   - Passport strategies

2. **Frontend Auth UI** (Gün 4-5):
   - Login sayfası
   - Register sayfası
   - Protected routes
   - Zustand auth store

3. **Dashboard Skeleton** (Gün 5-6):
   - Ana layout (header, sidebar)
   - Boş dashboard sayfası
   - Routing yapısı

4. **İlk API Endpoint** (Gün 6-7):
   - /api/v1/invoices (GET/POST)
   - Basit fatura listesi
   - Fatura oluşturma formu

---

## 🔥 PRODUCTION CHECKLIST (İleride)

### Güvenlik
- [ ] Rate limiting aktif
- [ ] Helmet.js headers
- [ ] CORS doğru yapılandırılmış
- [ ] Input validation (class-validator)
- [ ] SQL injection koruması (Prisma)
- [ ] XSS koruması
- [ ] CSRF tokens
- [ ] Secrets vault'ta (AWS Secrets Manager)
- [ ] 2FA implementasyonu
- [ ] Audit logging

### Performance
- [ ] Redis caching
- [ ] Database indexing
- [ ] Query optimization
- [ ] CDN (CloudFront)
- [ ] Gzip compression
- [ ] Image optimization

### Monitoring
- [ ] Sentry error tracking
- [ ] Prometheus metrics
- [ ] Grafana dashboards
- [ ] Health check endpoints
- [ ] Log aggregation

### Compliance
- [ ] KVKK veri envanteri
- [ ] Açık rıza metinleri
- [ ] VERBİS kaydı
- [ ] Veri silme prosedürü
- [ ] ISO 27001 hazırlığı
- [ ] Penetration testing

---

## 🆘 SORUN GİDERME

### Docker container başlamıyor
```bash
# Tüm containerları durdur
docker-compose down

# Volumeleri temizle
docker volume prune

# Tekrar başlat
docker-compose up -d
```

### PostgreSQL bağlantı hatası
```bash
# PostgreSQL çalışıyor mu?
docker ps | grep postgres

# Logları kontrol et
docker logs ade-postgres

# Manuel bağlan (test)
docker exec -it ade-postgres psql -U ade_user -d ade_db
```

### Prisma migration hatası
```bash
# Migration'ları sıfırla (DİKKAT: Tüm veriler silinir!)
cd backend
rm -rf prisma/migrations
pnpm prisma migrate reset

# Yeniden migrate
pnpm prisma migrate dev --name init
```

### pnpm install hatası
```bash
# pnpm cache temizle
pnpm store prune

# node_modules sil, tekrar yükle
rm -rf node_modules
pnpm install
```

---

## 📞 YARDIM

### Dokümantasyon
- **NestJS:** https://docs.nestjs.com
- **Prisma:** https://www.prisma.io/docs
- **Vite:** https://vitejs.dev
- **React:** https://react.dev

### Komutlar Özeti
```bash
# Development
pnpm dev                    # Tüm servisleri başlat
pnpm dev:backend            # Sadece backend
pnpm dev:frontend           # Sadece frontend

# Database
pnpm prisma:studio          # Database UI
pnpm prisma:migrate         # Migration çalıştır

# Docker
pnpm docker:up              # Servisleri başlat
pnpm docker:down            # Servisleri durdur
pnpm docker:logs            # Logları göster

# Testing
pnpm test                   # Tüm testler
pnpm test:e2e               # E2E testler

# Build
pnpm build                  # Production build

# Clean
pnpm clean                  # node_modules + dist sil
```

---

**🎯 ŞİMDİ NE YAPILMALI?**

1. **İLK ÖNCE:** Yukarıdaki ADIM 1-6'yı sırayla yap
2. **SONRA:** Backend'de auth module kodlamaya başla
3. **HEDEF:** 7 gün içinde login/register çalışır halde

**BAŞARILI KURULUM SONRASI GÖRECEKLER:**
- ✅ http://localhost:3000 → "Hello World!"
- ✅ http://localhost:5173 → Vite welcome screen
- ✅ http://localhost:5555 → Prisma Studio (database UI)
- ✅ http://localhost:8080 → Adminer (PostgreSQL UI)

---

Hazır mısın? Başlayalım! 🚀
