# 🚀 ADE - ÇALIŞAN SERVİSLER

**Tarih:** 21 Ocak 2025, 22:40
**Durum:** ✅ TÜM SİSTEMLER OPERASYONEL

---

## 📡 ÇALIŞAN SERVİSLER

### 1. Backend API (NestJS) ✅
- **URL:** http://localhost:3000
- **Status:** RUNNING
- **Port:** 3000
- **Framework:** NestJS 11.x
- **Test:** `curl http://localhost:3000` → "Hello World!"
- **Logs:** `~/Desktop/ADE/backend.log`
- **Process ID:** 72447

**Kullanım:**
```bash
# API'yi test et
curl http://localhost:3000

# Logları izle
tail -f ~/Desktop/ADE/backend.log

# Yeniden başlat
cd ~/Desktop/ADE/backend && pnpm dev
```

---

### 2. Frontend (Vite + React) ✅
- **URL:** http://localhost:5173
- **Status:** RUNNING
- **Port:** 5173
- **Framework:** Vite 7.3.1 + React 19
- **Test:** Tarayıcıda aç
- **Logs:** `~/Desktop/ADE/frontend.log`
- **Process ID:** 72821
- **HMR:** Aktif (Hot Module Replacement)

**Kullanım:**
```bash
# Frontend'i tarayıcıda aç
open http://localhost:5173

# Logları izle
tail -f ~/Desktop/ADE/frontend.log

# Yeniden başlat
cd ~/Desktop/ADE/frontend && pnpm dev
```

---

### 3. Prisma Studio (Database UI) ✅
- **URL:** http://localhost:5555
- **Status:** RUNNING
- **Port:** 5555
- **Purpose:** Database management UI
- **Tables:** 9 tablo görüntülenebilir
- **Logs:** `~/Desktop/ADE/prisma-studio.log`
- **Process ID:** 75510

**Kullanım:**
```bash
# Prisma Studio'yu aç
open http://localhost:5555

# CLI'dan başlat
cd ~/Desktop/ADE/backend
pnpm prisma studio

# Database yapısını görüntüle
# Tarayıcıda: Users, Sessions, Invoices, vb. tablolar
```

---

### 4. PostgreSQL Database ✅
- **Host:** localhost
- **Port:** 5432
- **Database:** ade_db
- **User:** ade_user
- **Password:** ade_password_change_in_production
- **Status:** HEALTHY
- **Tables:** 9 production-ready tablo
- **Container:** ade-postgres

**Tables:**
1. `users` - Kullanıcı yönetimi
2. `sessions` - JWT session tracking
3. `customers` - Müşteri yönetimi
4. `invoices` - e-Fatura sistemi
5. `invoice_items` - Fatura kalemleri
6. `payments` - Ödeme takibi
7. `tax_returns` - Vergi beyannameleri
8. `employees` - SGK işçi bildirimi
9. `audit_logs` - KVKK compliance

**Kullanım:**
```bash
# Database'e bağlan
docker exec -it ade-postgres psql -U ade_user -d ade_db

# Tabloları listele
docker exec ade-postgres psql -U ade_user -d ade_db -c "\dt"

# Query çalıştır
docker exec ade-postgres psql -U ade_user -d ade_db -c "SELECT * FROM users;"

# Connection string
postgresql://ade_user:ade_password_change_in_production@localhost:5432/ade_db
```

---

### 5. Redis Cache ✅
- **Host:** localhost
- **Port:** 6379
- **Password:** ade_redis_password_change_in_production
- **Status:** HEALTHY
- **Max Memory:** 512MB
- **Policy:** allkeys-lru
- **Container:** ade-redis

**Kullanım:**
```bash
# Redis'e bağlan
docker exec -it ade-redis redis-cli -a ade_redis_password_change_in_production

# PING test
docker exec ade-redis redis-cli -a ade_redis_password_change_in_production ping

# Key'leri listele
docker exec ade-redis redis-cli -a ade_redis_password_change_in_production KEYS '*'

# Info
docker exec ade-redis redis-cli -a ade_redis_password_change_in_production INFO
```

---

## 🧪 TEST SONUÇLARI

### Backend API ✅
```bash
$ curl http://localhost:3000
Hello World!
```

### Frontend ✅
```bash
$ curl http://localhost:5173 | head -5
<!doctype html>
<html lang="en">
  <head>
    <script type="module" src="/@vite/client"></script>
```

### Database ✅
```bash
$ docker exec ade-postgres psql -U ade_user -d ade_db -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';"
 count
-------
     9
```

### Redis ✅
```bash
$ docker exec ade-redis redis-cli -a ade_redis_password_change_in_production ping
PONG
```

### Prisma Studio ✅
```bash
$ curl -s http://localhost:5555 | grep -c "Prisma Studio"
1
```

---

## 🛠️ YÖNETİM KOMUTLARI

### Tüm Servisleri Başlat
```bash
cd ~/Desktop/ADE
./start-dev.sh
```

### Tüm Servisleri Durdur
```bash
cd ~/Desktop/ADE
./stop-dev.sh
```

### Health Check
```bash
cd ~/Desktop/ADE
./health-check.sh
```

### API Testleri
```bash
cd ~/Desktop/ADE
./test-api.sh
```

### Manuel Başlatma
```bash
# Backend
cd ~/Desktop/ADE/backend && pnpm dev

# Frontend
cd ~/Desktop/ADE/frontend && pnpm dev

# Prisma Studio
cd ~/Desktop/ADE/backend && pnpm prisma studio

# Docker
cd ~/Desktop/ADE && docker-compose up -d postgres redis
```

---

## 📊 PROCESS BİLGİLERİ

| Servis | Port | PID | Status |
|--------|------|-----|--------|
| Backend | 3000 | 72447 | ✅ RUNNING |
| Frontend | 5173 | 72821 | ✅ RUNNING |
| Prisma Studio | 5555 | 75510 | ✅ RUNNING |
| PostgreSQL | 5432 | (Docker) | ✅ HEALTHY |
| Redis | 6379 | (Docker) | ✅ HEALTHY |

**Process'leri Durdur:**
```bash
# Backend
kill 72447

# Frontend  
kill 72821

# Prisma Studio
kill 75510

# Docker
docker-compose down
```

---

## 🌐 TARAYICI LİNKLERİ

Tek komutla tüm servisleri tarayıcıda aç:
```bash
open http://localhost:3000 && open http://localhost:5173 && open http://localhost:5555
```

**Ayrı ayrı:**
- Backend API: http://localhost:3000
- Frontend: http://localhost:5173
- Prisma Studio: http://localhost:5555

---

## 📝 LOG DOSYALARI

```bash
# Backend logs
tail -f ~/Desktop/ADE/backend.log

# Frontend logs
tail -f ~/Desktop/ADE/frontend.log

# Prisma Studio logs
tail -f ~/Desktop/ADE/prisma-studio.log

# Docker logs
docker-compose logs -f postgres redis
```

---

## 🔧 SORUN GİDERME

### Port zaten kullanımda
```bash
# Portları kontrol et
lsof -i :3000
lsof -i :5173
lsof -i :5555

# Process'leri öldür
kill $(lsof -ti:3000)
kill $(lsof -ti:5173)
kill $(lsof -ti:5555)
```

### Docker servisleri başlamıyor
```bash
# Docker durumunu kontrol et
docker ps

# Logları kontrol et
docker-compose logs postgres redis

# Yeniden başlat
docker-compose down
docker-compose up -d postgres redis
```

### Database bağlantı hatası
```bash
# PostgreSQL sağlık kontrolü
docker exec ade-postgres pg_isready -U ade_user -d ade_db

# Manuel bağlantı testi
docker exec ade-postgres psql -U ade_user -d ade_db -c "SELECT 1;"
```

---

## ✅ SİSTEM DURUMU

```
✅ Backend:       RUNNING (port 3000)
✅ Frontend:      RUNNING (port 5173)
✅ Prisma Studio: RUNNING (port 5555)
✅ PostgreSQL:    HEALTHY (port 5432, 9 tables)
✅ Redis:         HEALTHY (port 6379)

🎉 TÜM SİSTEMLER OPERASYONEL!
```

---

## 🎯 SONRAKİ ADIMLAR

Sistem hazır! Şimdi yapabileceklerin:

1. **Backend'de Auth Module Geliştir:**
   ```bash
   cd ~/Desktop/ADE/backend/src
   npx nest g module auth
   npx nest g service auth
   npx nest g controller auth
   ```

2. **Frontend'de Routing Ekle:**
   ```bash
   cd ~/Desktop/ADE/frontend
   pnpm add react-router-dom
   ```

3. **Database'i Keşfet:**
   - Prisma Studio'yu aç: http://localhost:5555
   - Tabloları incele, test verisi ekle

4. **İlk API Endpoint'i Yaz:**
   - `POST /api/v1/auth/register`
   - `POST /api/v1/auth/login`

---

**Sistem %100 çalışır durumda. Kodlamaya başlayabilirsin! 🚀**

**Updated:** 21 Ocak 2025, 22:40
