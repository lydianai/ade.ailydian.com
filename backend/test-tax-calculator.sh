#!/bin/bash

# 🧮 ADE Vergi Hesaplama Motoru Test Script
# Test all tax calculation endpoints

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="http://localhost:3000/api/v1/tax-returns"
# Note: Update this token with a valid JWT token from your login
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiNDFkZC1mZGE3LTQzNmYtYmU2ZC05OTJkYjdmNmMyOTUiLCJlbWFpbCI6ImludGVncmF0aW9udGVzdEBhZGUuY29tIiwiaWF0IjoxNzY5MTcwMTMxLCJleHAiOjE3NjkxNzEwMzF9.CbgLG3hdrw0shf6FQmJ_jTD-wCgaLJZfDCFKCtfmkMk"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   ADE VERGİ HESAPLAMA MOTORU TEST${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Function to test an endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local data=$3

    echo -e "${YELLOW}Testing: $name${NC}"
    response=$(curl -s -X POST "$BASE_URL$url" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d "$data")

    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ SUCCESS${NC}"
        echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    else
        echo -e "${RED}✗ FAILED${NC}"
        echo "$response"
    fi
    echo ""
}

# Test 1: KDV Hesaplama
test_endpoint "KDV Hesaplama (1000 TL, %20)" \
    "/calculate/kdv" \
    '{"tutar": 1000, "oran": 0.2}'

# Test 2: KDV Ayırma
test_endpoint "KDV Ayırma (1200 TL toplam)" \
    "/calculate/kdv-ayir" \
    '{"toplamTutar": 1200, "oran": 0.2}'

# Test 3: Gelir Vergisi
test_endpoint "Gelir Vergisi (500.000 TL yıllık)" \
    "/calculate/gelir-vergisi" \
    '{"yillikGelir": 500000}'

# Test 4: Net Maaş
test_endpoint "Net Maaş Hesaplama (50.000 TL brüt)" \
    "/calculate/net-maas" \
    '{"brutMaas": 50000}'

# Test 5: SGK İşveren Primi
test_endpoint "SGK İşveren Primi (50.000 TL)" \
    "/calculate/sgk-isveren" \
    '{"brutMaas": 50000}'

# Test 6: Stopaj - Serbest Meslek
test_endpoint "Stopaj - Serbest Meslek (10.000 TL)" \
    "/calculate/stopaj" \
    '{"tutar": 10000, "tur": "SERBEST_MESLEK"}'

# Test 7: Stopaj - Kira
test_endpoint "Stopaj - Kira (5.000 TL)" \
    "/calculate/stopaj" \
    '{"tutar": 5000, "tur": "KIRA"}'

# Test 8: Kurumlar Vergisi
test_endpoint "Kurumlar Vergisi (1.000.000 TL kazanç)" \
    "/calculate/kurumlar-vergisi" \
    '{"kurumKazanci": 1000000}'

# Test 9: Damga Vergisi
test_endpoint "Damga Vergisi (100.000 TL belge)" \
    "/calculate/damga-vergisi" \
    '{"belgeTutari": 100000}'

# Test 10: MTV
test_endpoint "MTV (Otomobil, 1600cc, 2020 model)" \
    "/calculate/mtv" \
    '{"aracTipi": "otomobil", "motorHacmi": 1600, "modelYili": 2020}'

# Test 11: Fatura Toplamı
test_endpoint "Fatura Toplamı (Çoklu ürün)" \
    "/calculate/fatura-toplam" \
    '{"urunler": [{"birimFiyat": 100, "miktar": 5, "kdvOrani": 0.2}, {"birimFiyat": 200, "miktar": 3, "kdvOrani": 0.1}]}'

# Test 12: Gecikme Zammı
test_endpoint "Gecikme Zammı (10.000 TL, 90 gün)" \
    "/calculate/gecikme-zammi" \
    '{"anaParas": 10000, "vadeGunSayisi": 90}'

# Test 13: Yıllık Vergi Yükü Analizi
test_endpoint "Yıllık Vergi Yükü Analizi (Kapsamlı)" \
    "/analyze/yillik-vergi-yuku" \
    '{"yillikGelir": 600000, "aylikKira": 5000, "aracSayisi": 1, "sirketKazanci": 500000}'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   TEST COMPLETED${NC}"
echo -e "${BLUE}========================================${NC}"
