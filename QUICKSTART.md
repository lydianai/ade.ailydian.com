# ⚡ ADE Quick Start Guide

**5 dakikada development ortamını başlat!**

---

## ✅ Şu An Hazır Olanlar

- ✅ Tüm dependencies yüklü (backend + frontend)
- ✅ Database schema tasarlandı (8 tablo)
- ✅ .env yapılandırıldı (güçlü secrets ile)
- ✅ Prisma Client generated
- ✅ Otomatik startup scriptleri hazır

**Sadece Docker başlatman yeterli!** 🚀

---

## 🚀 3 Adımda Başlat

### 1️⃣ Docker Desktop Başlat

```bash
# macOS
open -a Docker

# Docker çalışıyor mu kontrol et
docker info
```

### 2️⃣ Tüm Servisleri Başlat

```bash
cd ~/Desktop/ADE
./start-dev.sh
```

**Bu script otomatik olarak:**
- PostgreSQL + Redis başlatır
- Database migration yapar (tablolar oluşturulur)
- Backend server başlatır (http://localhost:3000)
- Frontend server başlatır (http://localhost:5173)

### 3️⃣ Test Et

```bash
# Terminal'de backend test
curl http://localhost:3000
# Beklenen: "Hello World!"

# Tarayıcıda frontend test
open http://localhost:5173
```

---

## 📡 Servisler

| Servis | URL | Kullanım |
|--------|-----|----------|
| Backend API | http://localhost:3000 | NestJS REST API |
| Frontend | http://localhost:5173 | Vite + React |
| Prisma Studio | `pnpm prisma:studio` | Database UI (port 5555) |
| Adminer | http://localhost:8080 | PostgreSQL UI |
| Redis Commander | http://localhost:8081 | Redis UI |

---

## 🛑 Servisleri Durdur

```bash
cd ~/Desktop/ADE
./stop-dev.sh
```

---

## 📝 Manuel Komutlar (Gerekirse)

### Backend Başlat
```bash
cd ~/Desktop/ADE/backend
pnpm dev
```

### Frontend Başlat
```bash
cd ~/Desktop/ADE/frontend
pnpm dev
```

### Database UI Aç (Prisma Studio)
```bash
cd ~/Desktop/ADE/backend
pnpm prisma studio
# → http://localhost:5555
```

### Migration Çalıştır
```bash
cd ~/Desktop/ADE/backend
pnpm prisma migrate dev --name migration_name
```

### Sadece Docker Başlat
```bash
cd ~/Desktop/ADE
docker-compose up -d postgres redis
```

---

## 🔍 Logları Görüntüle

```bash
# Backend logs
tail -f ~/Desktop/ADE/backend.log

# Frontend logs
tail -f ~/Desktop/ADE/frontend.log

# Docker logs
docker-compose logs -f postgres redis
```

---

## 🐛 Sorun Giderme

### Docker çalışmıyor
```bash
# Docker Desktop'ı başlat
open -a Docker

# Docker daemon'ın başlamasını bekle (10-15 saniye)
docker info
```

### PostgreSQL bağlanamıyor
```bash
# PostgreSQL hazır mı kontrol et
docker exec ade-postgres pg_isready -U ade_user

# Logları kontrol et
docker logs ade-postgres
```

### Port zaten kullanımda
```bash
# 3000 portunu kullanan process'i bul
lsof -i :3000

# Öldür
kill -9 <PID>

# Veya tüm node process'lerini durdur
pkill node
```

### Migration hatası
```bash
# Migration'ları sıfırla (DİKKAT: Tüm veriler silinir!)
cd backend
pnpm prisma migrate reset

# Yeniden migrate
pnpm prisma migrate dev --name init
```

### Temiz başlangıç (her şeyi sıfırla)
```bash
cd ~/Desktop/ADE

# Servisleri durdur
./stop-dev.sh

# Docker'ı tamamen temizle
docker-compose down -v

# node_modules sil
rm -rf node_modules backend/node_modules frontend/node_modules

# Yeniden yükle
pnpm install
cd backend && pnpm install
cd ../frontend && pnpm install
cd ..

# Tekrar başlat
./start-dev.sh
```

---

## 📚 Daha Fazla Bilgi

- **Detaylı Kurulum:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Proje Durumu:** [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Anlık Durum:** [CURRENT_STATUS.md](./CURRENT_STATUS.md)
- **Ana README:** [README.md](./README.md)

---

## 🎯 İlk Görevler (Serverlar Çalıştıktan Sonra)

### 1. Database'i Keşfet
```bash
cd ~/Desktop/ADE/backend
pnpm prisma studio
# http://localhost:5555'te tablları görüntüle
```

### 2. API Dokümantasyonu (İleride)
```bash
# Swagger kurulumu sonrası
open http://localhost:3000/api/docs
```

### 3. İlk Kullanıcı Oluştur (Manuel - Database)
Prisma Studio'da `User` tablosuna gir ve test kullanıcısı ekle.

### 4. Backend Kod Yazmaya Başla
```bash
cd ~/Desktop/ADE/backend/src

# Auth module oluştur
nest g module auth
nest g service auth
nest g controller auth
```

---

## 🚨 ÖNEMLİ NOTLAR

- ⚠️ .env dosyasını ASLA commit etme (zaten .gitignore'da)
- ⚠️ Production'da secrets'ları değiştir
- ⚠️ PostgreSQL password'ünü production'da değiştir
- ⚠️ Redis password'ünü production'da değiştir

---

## ✅ Başarı Kriterleri

Aşağıdaki tüm komutlar çalışıyorsa ortam hazır:

```bash
# 1. Backend health check
curl http://localhost:3000
# Sonuç: "Hello World!"

# 2. Frontend çalışıyor
curl http://localhost:5173
# Sonuç: HTML sayfası

# 3. PostgreSQL çalışıyor
docker exec ade-postgres pg_isready
# Sonuç: accepting connections

# 4. Redis çalışıyor
docker exec ade-redis redis-cli ping
# Sonuç: PONG

# 5. Prisma Client çalışıyor
cd backend && node -e "const { PrismaClient } = require('@prisma/client'); console.log('OK')"
# Sonuç: OK
```

---

**Hazırsın! Kodlamaya başla! 🎉**

Sonraki adım: [Auth Module Development](./docs/auth-development.md) (ileride oluşturulacak)
