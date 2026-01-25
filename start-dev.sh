#!/bin/bash

# ADE Development Startup Script
# Bu script tüm servisleri sırayla başlatır

set -e  # Hata durumunda dur

echo "🚀 ADE Development Environment Başlatılıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Docker kontrolü
echo -e "${BLUE}[1/6]${NC} Docker daemon kontrol ediliyor..."
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker çalışmıyor!${NC}"
    echo ""
    echo "Lütfen Docker Desktop'ı başlatın:"
    echo "  macOS: Applications → Docker.app"
    echo "  veya: open -a Docker"
    echo ""
    echo "Docker başladıktan sonra bu scripti tekrar çalıştırın:"
    echo "  ./start-dev.sh"
    exit 1
fi
echo -e "${GREEN}✓ Docker çalışıyor${NC}"
echo ""

# 2. Docker servisleri başlat
echo -e "${BLUE}[2/6]${NC} Docker servisleri başlatılıyor (PostgreSQL + Redis)..."
docker-compose up -d postgres redis
echo -e "${GREEN}✓ PostgreSQL ve Redis başlatıldı${NC}"
echo ""

# 3. Database bağlantısını bekle
echo -e "${BLUE}[3/6]${NC} PostgreSQL hazır olması bekleniyor..."
sleep 5
until docker exec ade-postgres pg_isready -U ade_user > /dev/null 2>&1; do
    echo -e "${YELLOW}  PostgreSQL henüz hazır değil, bekleniyor...${NC}"
    sleep 2
done
echo -e "${GREEN}✓ PostgreSQL hazır${NC}"
echo ""

# 4. Prisma migration
echo -e "${BLUE}[4/6]${NC} Database migration yapılıyor..."
cd backend
if [ ! -d "prisma/migrations" ]; then
    echo "  İlk migration oluşturuluyor..."
    pnpm prisma migrate dev --name init
else
    echo "  Mevcut migration'lar uygulanıyor..."
    pnpm prisma migrate deploy
fi
echo -e "${GREEN}✓ Database hazır${NC}"
cd ..
echo ""

# 5. Backend başlat (arka planda)
echo -e "${BLUE}[5/6]${NC} Backend server başlatılıyor..."
cd backend
pnpm dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend başlatıldı (PID: $BACKEND_PID)${NC}"
cd ..
echo ""

# 6. Frontend başlat (arka planda)
echo -e "${BLUE}[6/6]${NC} Frontend server başlatılıyor..."
cd frontend
pnpm dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend başlatıldı (PID: $FRONTEND_PID)${NC}"
cd ..
echo ""

# Başarı mesajı
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ ADE Development Environment Hazır!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📡 Servisler:"
echo "  Backend:  http://localhost:3000"
echo "  Frontend: http://localhost:5173"
echo "  Prisma:   pnpm prisma:studio (port 5555)"
echo "  Adminer:  http://localhost:8080"
echo ""
echo "📝 Loglar:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "🛑 Durdur:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo "  docker-compose down"
echo ""
echo "🎯 Test et:"
echo "  curl http://localhost:3000"
echo ""

# PID'leri kaydet
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid

echo -e "${YELLOW}Not: Serverlar arka planda çalışıyor. Durdurmak için:${NC}"
echo "  ./stop-dev.sh"
echo ""
