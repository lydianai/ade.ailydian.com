#!/bin/bash

# ADE Development Stop Script
# Tüm servisleri durdurur

echo "🛑 ADE Development Environment durduruluyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Backend durdur
if [ -f ".backend.pid" ]; then
    BACKEND_PID=$(cat .backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${YELLOW}Backend durduruluyor (PID: $BACKEND_PID)...${NC}"
        kill $BACKEND_PID
        echo -e "${GREEN}✓ Backend durduruldu${NC}"
    else
        echo -e "${YELLOW}Backend zaten çalışmıyor${NC}"
    fi
    rm .backend.pid
fi

# Frontend durdur
if [ -f ".frontend.pid" ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${YELLOW}Frontend durduruluyor (PID: $FRONTEND_PID)...${NC}"
        kill $FRONTEND_PID
        echo -e "${GREEN}✓ Frontend durduruldu${NC}"
    else
        echo -e "${YELLOW}Frontend zaten çalışmıyor${NC}"
    fi
    rm .frontend.pid
fi

# Docker servisleri durdur (opsiyonel)
echo ""
echo -e "${YELLOW}Docker servisleri durduruluyor...${NC}"
docker-compose down
echo -e "${GREEN}✓ Docker servisleri durduruldu${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Tüm servisler durduruldu${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Tekrar başlatmak için:"
echo "  ./start-dev.sh"
echo ""
