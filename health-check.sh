#!/bin/bash

# ADE Health Check Script
# Tüm servislerin durumunu kontrol eder

echo "🏥 ADE Health Check - $(date '+%Y-%m-%d %H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Backend check
echo -n "Backend (port 3000):      "
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ RUNNING${NC}"
    BACKEND_STATUS="UP"
else
    echo -e "${RED}❌ DOWN${NC}"
    BACKEND_STATUS="DOWN"
fi

# Frontend check
echo -n "Frontend (port 5173):     "
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ RUNNING${NC}"
    FRONTEND_STATUS="UP"
else
    echo -e "${RED}❌ DOWN${NC}"
    FRONTEND_STATUS="DOWN"
fi

# Prisma Studio check
echo -n "Prisma Studio (port 5555): "
if curl -s http://localhost:5555 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ RUNNING${NC}"
    PRISMA_STATUS="UP"
else
    echo -e "${YELLOW}⚠️  NOT RUNNING${NC}"
    PRISMA_STATUS="DOWN"
fi

# PostgreSQL check
echo -n "PostgreSQL (port 5432):   "
if docker exec ade-postgres pg_isready -U ade_user -d ade_db > /dev/null 2>&1; then
    echo -e "${GREEN}✅ HEALTHY${NC}"
    PG_STATUS="UP"
else
    echo -e "${RED}❌ DOWN${NC}"
    PG_STATUS="DOWN"
fi

# Redis check
echo -n "Redis (port 6379):        "
if docker exec ade-redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ HEALTHY${NC}"
    REDIS_STATUS="UP"
else
    echo -e "${RED}❌ DOWN${NC}"
    REDIS_STATUS="DOWN"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Database stats
echo ""
echo "📊 Database Statistics:"
TABLE_COUNT=$(docker exec ade-postgres psql -U ade_user -d ade_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" 2>/dev/null | xargs)
echo "   Tables: $TABLE_COUNT"

# Process info
echo ""
echo "🔧 Process Information:"
BACKEND_PID=$(lsof -ti:3000 2>/dev/null)
FRONTEND_PID=$(lsof -ti:5173 2>/dev/null)
PRISMA_PID=$(lsof -ti:5555 2>/dev/null)

if [ ! -z "$BACKEND_PID" ]; then
    echo "   Backend PID:  $BACKEND_PID"
fi
if [ ! -z "$FRONTEND_PID" ]; then
    echo "   Frontend PID: $FRONTEND_PID"
fi
if [ ! -z "$PRISMA_PID" ]; then
    echo "   Prisma PID:   $PRISMA_PID"
fi

# Overall status
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$BACKEND_STATUS" = "UP" ] && [ "$FRONTEND_STATUS" = "UP" ] && [ "$PG_STATUS" = "UP" ] && [ "$REDIS_STATUS" = "UP" ]; then
    echo -e "${GREEN}✅ ALL SYSTEMS OPERATIONAL${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  SOME SERVICES ARE DOWN${NC}"
    exit 1
fi
