#!/bin/bash

# ADE API Test Script

echo "🧪 ADE API Test Suite"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test 1: Backend root endpoint
echo -e "${BLUE}[TEST 1]${NC} Backend Root Endpoint"
echo -n "GET http://localhost:3000 ... "
RESPONSE=$(curl -s http://localhost:3000)
if [ "$RESPONSE" = "Hello World!" ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    echo "Response: $RESPONSE"
else
    echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 2: Frontend HTML
echo -e "${BLUE}[TEST 2]${NC} Frontend HTML Response"
echo -n "GET http://localhost:5173 ... "
RESPONSE=$(curl -s http://localhost:5173 | head -1)
if [[ "$RESPONSE" == *"<!doctype html>"* ]]; then
    echo -e "${GREEN}✅ PASS${NC}"
    echo "Response: Valid HTML document"
else
    echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 3: Prisma Studio
echo -e "${BLUE}[TEST 3]${NC} Prisma Studio UI"
echo -n "GET http://localhost:5555 ... "
RESPONSE=$(curl -s http://localhost:5555 | grep -c "Prisma Studio")
if [ $RESPONSE -gt 0 ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    echo "Response: Prisma Studio loaded"
else
    echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 4: Database connectivity
echo -e "${BLUE}[TEST 4]${NC} Database Connection"
echo -n "PostgreSQL connectivity ... "
if docker exec ade-postgres psql -U ade_user -d ade_db -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASS${NC}"
    echo "Response: Connection successful"
else
    echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 5: Database tables
echo -e "${BLUE}[TEST 5]${NC} Database Tables"
echo -n "Checking table count ... "
TABLE_COUNT=$(docker exec ade-postgres psql -U ade_user -d ade_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" 2>/dev/null | xargs)
if [ "$TABLE_COUNT" = "9" ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    echo "Found: $TABLE_COUNT tables (expected: 9)"
else
    echo -e "${RED}❌ FAIL${NC}"
    echo "Found: $TABLE_COUNT tables (expected: 9)"
fi
echo ""

# Test 6: Redis connectivity
echo -e "${BLUE}[TEST 6]${NC} Redis Connection"
echo -n "Redis PING ... "
RESPONSE=$(docker exec ade-redis redis-cli ping 2>/dev/null)
if [ "$RESPONSE" = "PONG" ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    echo "Response: $RESPONSE"
else
    echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ All API tests completed${NC}"
