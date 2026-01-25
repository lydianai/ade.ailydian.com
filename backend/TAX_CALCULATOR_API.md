# 🧮 ADE Vergi Hesaplama Motoru API Dokümantasyonu

## 📋 İçindekiler
- [KDV Hesaplama](#kdv-hesaplama)
- [Gelir Vergisi Hesaplama](#gelir-vergisi-hesaplama)
- [Net Maaş Hesaplama](#net-maaş-hesaplama)
- [SGK İşveren Primi](#sgk-işveren-primi)
- [Stopaj Hesaplama](#stopaj-hesaplama)
- [Kurumlar Vergisi](#kurumlar-vergisi)
- [Damga Vergisi](#damga-vergisi)
- [MTV (Motorlu Taşıtlar Vergisi)](#mtv-motorlu-taşıtlar-vergisi)
- [Fatura Toplamı](#fatura-toplamı)
- [Gecikme Zammı](#gecikme-zammı)
- [Yıllık Vergi Yükü Analizi](#yıllık-vergi-yükü-analizi)

---

## 🔐 Kimlik Doğrulama
Tüm endpoint'ler JWT Bearer token gerektirir:
```bash
Authorization: Bearer <token>
```

---

## KDV Hesaplama

### POST `/api/v1/tax-returns/calculate/kdv`
KDV hesaplar (1%, 10%, 20% oranlarıyla).

**İstek Body:**
```json
{
  "tutar": 1000,
  "oran": 0.2
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "araToplam": 1000,
    "kdv": 200,
    "toplamTutar": 1200,
    "kdvOrani": 0.2
  }
}
```

**cURL Örneği:**
```bash
curl -X POST http://localhost:3000/api/v1/tax-returns/calculate/kdv \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"tutar": 1000, "oran": 0.2}'
```

---

## KDV Ayırma

### POST `/api/v1/tax-returns/calculate/kdv-ayir`
Toplam tutardan KDV'yi ayırır.

**İstek Body:**
```json
{
  "toplamTutar": 1200,
  "oran": 0.2
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "toplamTutar": 1200,
    "araToplam": 1000,
    "kdv": 200,
    "kdvOrani": 0.2
  }
}
```

---

## Gelir Vergisi Hesaplama

### POST `/api/v1/tax-returns/calculate/gelir-vergisi`
Dilimli gelir vergisi hesaplar (2024 dilimleri: %15, %20, %27, %35, %40).

**İstek Body:**
```json
{
  "yillikGelir": 500000
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "brutGelir": 500000,
    "vergi": 105000,
    "netGelir": 395000,
    "ortalamVergiOrani": 0.21,
    "dilimDetayi": [
      {
        "altSinir": 0,
        "ustSinir": 110000,
        "matrah": 110000,
        "oran": 0.15,
        "vergi": 16500
      },
      {
        "altSinir": 110000,
        "ustSinir": 230000,
        "matrah": 120000,
        "oran": 0.2,
        "vergi": 24000
      },
      {
        "altSinir": 230000,
        "ustSinir": 580000,
        "matrah": 270000,
        "oran": 0.27,
        "vergi": 72900
      }
    ]
  }
}
```

**2024 Gelir Vergisi Dilimleri:**
- 0 - 110.000 TL: %15
- 110.000 - 230.000 TL: %20
- 230.000 - 580.000 TL: %27
- 580.000 - 3.000.000 TL: %35
- 3.000.000 TL+: %40

---

## Net Maaş Hesaplama

### POST `/api/v1/tax-returns/calculate/net-maas`
Brüt maaştan tüm kesintilerle net maaş hesaplar.

**İstek Body:**
```json
{
  "brutMaas": 50000
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "brutMaas": 50000,
    "kesintiler": {
      "sgkIsci": {
        "emeklilik": 4500,
        "saglik": 750,
        "issizlik": 500,
        "toplam": 5750
      },
      "gelirVergisi": 5025,
      "damgaVergisi": 474,
      "toplamKesinti": 11249
    },
    "netMaas": 38751,
    "sgkMatrah": 50000,
    "gelirVergisiMatrahi": 44250
  }
}
```

**Kesinti Oranları:**
- SGK İşçi Emeklilik: %9
- SGK İşçi Sağlık: %1.5
- SGK İşçi İşsizlik: %1
- Gelir Vergisi: SGK sonrası matrah üzerinden dilimli
- Damga Vergisi: %0.948

---

## SGK İşveren Primi

### POST `/api/v1/tax-returns/calculate/sgk-isveren`
İşveren SGK primlerini hesaplar.

**İstek Body:**
```json
{
  "brutMaas": 50000
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "brutMaas": 50000,
    "isverenPrimleri": {
      "emeklilik": 5750,
      "saglik": 3750,
      "issizlik": 1000,
      "isvGuv": 1000,
      "toplam": 11500
    },
    "isciKesintisi": 5750,
    "toplamMaliyet": 61500
  }
}
```

**İşveren Prim Oranları:**
- Emeklilik: %11.5
- Sağlık: %7.5
- İşsizlik: %2
- İş Kazası ve Meslek Hastalığı: %2

---

## Stopaj Hesaplama

### POST `/api/v1/tax-returns/calculate/stopaj`
Çeşitli gelir türleri için stopaj hesaplar.

**İstek Body:**
```json
{
  "tutar": 10000,
  "tur": "SERBEST_MESLEK"
}
```

**Stopaj Türleri ve Oranları:**
- `MAAS`: %15
- `KIRA`: %20
- `SERBEST_MESLEK`: %20
- `MENKUL_KIYMET`: %10
- `HIZMET`: %20
- `YONETIM_KURULU`: %20
- `TEMETTÜ`: %10

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "brutTutar": 10000,
    "stopajOrani": 0.2,
    "stopajTutari": 2000,
    "netOdeme": 8000
  }
}
```

---

## Kurumlar Vergisi

### POST `/api/v1/tax-returns/calculate/kurumlar-vergisi`
Kurumlar vergisi hesaplar (%25 - 2024).

**İstek Body:**
```json
{
  "kurumKazanci": 1000000
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "brutKazanc": 1000000,
    "vergiOrani": 0.25,
    "vergi": 250000,
    "netKar": 750000
  }
}
```

---

## Damga Vergisi

### POST `/api/v1/tax-returns/calculate/damga-vergisi`
Belge damga vergisi hesaplar (%0.948 - 2024).

**İstek Body:**
```json
{
  "belgeTutari": 100000
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "belgeTutari": 100000,
    "vergiOrani": 0.00948,
    "vergi": 948,
    "toplamTutar": 100948
  }
}
```

---

## MTV (Motorlu Taşıtlar Vergisi)

### POST `/api/v1/tax-returns/calculate/mtv`
Araç tipi, motor hacmi ve model yılına göre MTV hesaplar.

**İstek Body:**
```json
{
  "aracTipi": "otomobil",
  "motorHacmi": 1600,
  "modelYili": 2020
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "aracTipi": "otomobil",
    "motorHacmi": 1600,
    "modelYili": 2020,
    "aracYasi": 4,
    "dilim": "1301-1600 cc",
    "temelTutar": 8500,
    "yasIndirimi": 0.1,
    "yillikMTV": 7650,
    "yillik1Taksit": 3825,
    "yillik2Taksit": 3825
  }
}
```

**Yaş İndirimleri:**
- 0-2 yaş: İndirim yok
- 3-5 yaş: %10 indirim
- 6-10 yaş: %20 indirim
- 11-15 yaş: %30 indirim
- 16-20 yaş: %40 indirim
- 21+ yaş: %50 indirim

---

## Fatura Toplamı

### POST `/api/v1/tax-returns/calculate/fatura-toplam`
Birden fazla ürün için KDV dahil fatura toplamı hesaplar.

**İstek Body:**
```json
{
  "urunler": [
    {
      "birimFiyat": 100,
      "miktar": 5,
      "kdvOrani": 0.2
    },
    {
      "birimFiyat": 200,
      "miktar": 3,
      "kdvOrani": 0.1
    }
  ]
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "araToplam": 1100,
    "kdvDetayi": {
      "oran_0.01": 0,
      "oran_0.1": 60,
      "oran_0.2": 100
    },
    "toplamKDV": 160,
    "genelToplam": 1260,
    "urunSayisi": 8
  }
}
```

---

## Gecikme Zammı

### POST `/api/v1/tax-returns/calculate/gecikme-zammi`
Vade geçmiş tutarlar için gecikme faizi hesaplar.

**İstek Body:**
```json
{
  "anaParas": 10000,
  "vadeGunSayisi": 90,
  "yillikFaizOrani": 0.55
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "anaParas": 10000,
    "vadeGunSayisi": 90,
    "yillikFaizOrani": 0.55,
    "gunlukFaizOrani": 0.0015068,
    "gecikmeZammi": 1356.12,
    "odenecekToplam": 11356.12
  }
}
```

**Varsayılan Yıllık Faiz Oranı:** %55 (2024)

---

## Yıllık Vergi Yükü Analizi

### POST `/api/v1/tax-returns/analyze/yillik-vergi-yuku`
Kapsamlı yıllık vergi yükü analizi yapar.

**İstek Body:**
```json
{
  "yillikGelir": 600000,
  "aylikKira": 5000,
  "aracSayisi": 1,
  "sirketKazanci": 500000
}
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "gelirVergisi": {
      "matrah": 600000,
      "vergi": 121500,
      "netGelir": 478500
    },
    "kiraStopaji": {
      "yillikKiraGeliri": 60000,
      "stopaj": 12000,
      "netKiraGeliri": 48000
    },
    "mtv": {
      "aracSayisi": 1,
      "toplamMTV": 8000
    },
    "kurumlarVergisi": {
      "kurumKazanci": 500000,
      "vergi": 125000,
      "netKar": 375000
    },
    "toplamVergiYuku": 266500,
    "toplamGelir": 1160000,
    "toplamVergiOrani": 0.2297,
    "netGelir": 893500
  }
}
```

---

## 📊 Örnekler

### Örnek 1: Serbest Meslek Makbuzu KDV Hesaplama
```bash
curl -X POST http://localhost:3000/api/v1/tax-returns/calculate/kdv \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "tutar": 5000,
    "oran": 0.2
  }'
```

### Örnek 2: Çalışan Maaş Hesaplama
```bash
curl -X POST http://localhost:3000/api/v1/tax-returns/calculate/net-maas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "brutMaas": 35000
  }'
```

### Örnek 3: Şirket Vergisi Hesaplama
```bash
curl -X POST http://localhost:3000/api/v1/tax-returns/calculate/kurumlar-vergisi \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "kurumKazanci": 2000000
  }'
```

---

## ⚖️ Yasal Dayanak

- **KDV Kanunu (3065)**: KDV oranları ve hesaplama yöntemleri
- **Gelir Vergisi Kanunu (193)**: Gelir vergisi dilimleri ve stopaj oranları
- **Kurumlar Vergisi Kanunu (5520)**: Kurumlar vergisi oranı
- **Damga Vergisi Kanunu (488)**: Damga vergisi oranları
- **Motorlu Taşıtlar Vergisi Kanunu (197)**: MTV hesaplama yöntemi
- **5510 Sayılı SGK Kanunu**: SGK prim oranları

**Not:** Tüm oranlar 2024 yılı için geçerlidir. Vergi oranları her yıl güncellenebilir.

---

## 🔧 Hata Kodları

| HTTP Kodu | Açıklama |
|-----------|----------|
| 200 | Başarılı |
| 400 | Geçersiz istek parametreleri |
| 401 | Kimlik doğrulama hatası |
| 500 | Sunucu hatası |

---

## 📝 Notlar

1. Tüm tutar değerleri **TL (Türk Lirası)** cinsindendir
2. Oran değerleri **ondalık** olarak girilmelidir (örn: %20 = 0.2)
3. API yanıtları her zaman `{ success: boolean, data: object }` formatındadır
4. Hesaplamalar 2024 yılı vergi oranlarına göredir
5. Gerçek beyanname süreçleri için GİB entegrasyonu kullanılmalıdır

---

## 🚀 Swagger Dokümantasyonu

API'nin interaktif Swagger dokümantasyonuna erişmek için:
```
http://localhost:3000/api/docs
```

---

**ADE - Akıllı Devlet Ekosistemi**
Version: 1.0.0-alpha
