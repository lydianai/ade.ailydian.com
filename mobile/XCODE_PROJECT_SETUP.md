# 📱 ADE iOS Xcode Project Setup Guide

**Tarih:** 24 Ocak 2026
**Durum:** ✅ Kod Hazır - Xcode Projesi Oluşturulacak
**Platform:** iOS 17.0+
**Xcode:** 15.0+

---

## 📋 İçindekiler

1. [Önkoşullar](#önkoşullar)
2. [Xcode Projesi Oluşturma](#xcode-projesi-oluşturma)
3. [Dosya Yapısı](#dosya-yapısı)
4. [Dependencies (SPM)](#dependencies-spm)
5. [Info.plist Konfigürasyonu](#infoplist-konfigürasyonu)
6. [App Icon Ekleme](#app-icon-ekleme)
7. [Build Settings](#build-settings)
8. [Çalıştırma](#çalıştırma)

---

## 🔧 Önkoşullar

### Gereksinimler:

- [x] macOS 14.0 (Sonoma) veya üzeri
- [x] Xcode 15.0 veya üzeri
- [x] Swift 6.0
- [x] Apple Developer hesabı (Simulator için gerekli değil)
- [x] iOS 17.0+ test cihazı veya Simulator

### Kontrol:

```bash
# Xcode versiyonu
xcodebuild -version

# Swift versiyonu
swift --version

# Komut satırı araçları
xcode-select --print-path
```

---

## 📦 Xcode Projesi Oluşturma

### Adım 1: Xcode'u Açın

```bash
cd /Users/sardag/Desktop/ADE/mobile/ios
open -a Xcode
```

### Adım 2: Yeni Proje Oluşturun

1. **File > New > Project...**
2. **iOS > App** seçin
3. **Next** tıklayın

### Adım 3: Proje Ayarları

**Product Name:** ADE
**Team:** Apple Development (veya kendi team'iniz)
**Organization Identifier:** tr.gov.ade
**Bundle Identifier:** tr.gov.ade.app
**Interface:** SwiftUI
**Language:** Swift
**Storage:** None (manuel Core Data ekleyeceğiz)
**Include Tests:** ✅ Seçili

**Location:** `/Users/sardag/Desktop/ADE/mobile/ios`

### Adım 4: Dosya Yapısını Oluşturun

Xcode Project Navigator'da sağ tık > **New Group** ile aşağıdaki klasörleri oluşturun:

```
ADE/
├── App/
│   ├── ADEApp.swift (Mevcut)
│   └── ContentView.swift
├── Core/
│   ├── Authentication/
│   │   └── AuthenticationManager.swift ✅ (Mevcut)
│   ├── Security/
│   │   └── KeychainManager.swift ✅ (Mevcut)
│   └── Network/
│       └── APIClient.swift ✅ (Mevcut)
├── Data/
│   └── Models/
│       └── APIModels.swift ✅ (Mevcut)
├── Features/
│   ├── Dashboard/
│   │   ├── DashboardView.swift ✅ (Mevcut)
│   │   └── DashboardViewModel.swift ✅ (Mevcut)
│   ├── Integrations/
│   │   └── IntegrationsView.swift
│   ├── ECommerce/
│   │   └── ECommerceView.swift
│   ├── AI/
│   │   └── AIAssistantView.swift
│   └── Profile/
│       └── ProfileView.swift
└── Resources/
    ├── Assets.xcassets
    └── Info.plist
```

### Adım 5: Mevcut Dosyaları Ekleyin

1. Project Navigator'da **ADE** klasörüne sağ tık
2. **Add Files to "ADE"...** seçin
3. Aşağıdaki dosyaları seçin (⌘+Click ile çoklu seçim):

```bash
/Users/sardag/Desktop/ADE/mobile/ios/ADE/ADEApp.swift
/Users/sardag/Desktop/ADE/mobile/ios/ADE/Core/Authentication/AuthenticationManager.swift
/Users/sardag/Desktop/ADE/mobile/ios/ADE/Core/Security/KeychainManager.swift
/Users/sardag/Desktop/ADE/mobile/ios/ADE/Core/Network/APIClient.swift
/Users/sardag/Desktop/ADE/mobile/ios/ADE/Data/Models/APIModels.swift
/Users/sardag/Desktop/ADE/mobile/ios/ADE/Features/Dashboard/DashboardView.swift
/Users/sardag/Desktop/ADE/mobile/ios/ADE/Features/Dashboard/DashboardViewModel.swift
```

4. **Options:**
   - ✅ Copy items if needed
   - ✅ Create groups
   - ✅ Add to targets: ADE

---

## 📚 Dependencies (Swift Package Manager)

### Adım 1: Package Dependencies Ekleyin

1. **File > Add Package Dependencies...**
2. Aşağıdaki paketleri ekleyin:

#### 1. **Alamofire** (Optional - URLSession yerine kullanılabilir)
```
https://github.com/Alamofire/Alamofire.git
```
Version: 5.9.0

#### 2. **KeychainAccess** (Optional - KeychainManager zaten var)
```
https://github.com/kishikawakatsumi/KeychainAccess.git
```
Version: 4.2.2

#### 3. **Charts** (SwiftUI Charts - iOS 16+ için built-in)
> **Not:** iOS 17+ kullanıyorsunuz, bu yüzden harici paket gerekmez.
> SwiftUI'nin built-in `Charts` framework'ünü kullanıyoruz.

### Adım 2: Import Framework'ler

Her dosyanın başına gerekli import'ları ekleyin:

```swift
// ADEApp.swift
import SwiftUI

// AuthenticationManager.swift
import Foundation
import LocalAuthentication
import Security

// APIClient.swift
import Foundation
import Combine

// DashboardView.swift
import SwiftUI
import Charts
```

---

## ⚙️ Info.plist Konfigürasyonu

### Adım 1: Info.plist Dosyasını Açın

Project Navigator > **Info.plist** > **Open As > Source Code**

### Adım 2: Aşağıdaki Key'leri Ekleyin

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- App Display Name -->
    <key>CFBundleDisplayName</key>
    <string>ADE</string>

    <!-- App Version -->
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>

    <!-- Bundle Version -->
    <key>CFBundleVersion</key>
    <string>1</string>

    <!-- Face ID / Touch ID Usage -->
    <key>NSFaceIDUsageDescription</key>
    <string>ADE, hızlı ve güvenli giriş için Face ID kullanır.</string>

    <!-- Camera Usage (Avatar upload için) -->
    <key>NSCameraUsageDescription</key>
    <string>Profil fotoğrafı çekmek için kamera erişimi gereklidir.</string>

    <!-- Photo Library Usage -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Profil fotoğrafı seçmek için fotoğraf kütüphanesi erişimi gereklidir.</string>

    <!-- Internet Usage (iOS 14+) -->
    <key>NSAllowsArbitraryLoads</key>
    <false/>

    <!-- App Transport Security -->
    <key>NSAppTransportSecurity</key>
    <dict>
        <!-- Development için localhost -->
        <key>NSExceptionDomains</key>
        <dict>
            <key>localhost</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
            <key>10.0.2.2</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
        </dict>
    </dict>

    <!-- Background Modes -->
    <key>UIBackgroundModes</key>
    <array>
        <string>fetch</string>
        <string>remote-notification</string>
    </array>

    <!-- Supported Interface Orientations (iPhone) -->
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>

    <!-- Supported Interface Orientations (iPad) -->
    <key>UISupportedInterfaceOrientations~ipad</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>

    <!-- Status Bar Style -->
    <key>UIStatusBarStyle</key>
    <string>UIStatusBarStyleDefault</string>

    <!-- Launch Screen -->
    <key>UILaunchScreen</key>
    <dict>
        <key>UIImageName</key>
        <string>LaunchImage</string>
    </dict>
</dict>
</plist>
```

---

## 🎨 App Icon Ekleme

### Adım 1: Assets Catalog'u Açın

1. Project Navigator > **Assets.xcassets**
2. **AppIcon** > **Inspector** (sağ panel)

### Adım 2: Icon'ları Ekleyin

Icon'lar `/Users/sardag/Desktop/ADE/mobile/assets/ios/` klasöründe hazır:

| Boyut | Dosya | Hedef |
|-------|-------|-------|
| 1024x1024 | `app-icon-1024.png` | App Store |
| 180x180 | `app-icon-180.png` | iPhone (3x) |
| 167x167 | `app-icon-167.png` | iPad Pro |
| 152x152 | `app-icon-152.png` | iPad (2x) |
| 120x120 | `app-icon-120.png` | iPhone (2x) |
| 87x87 | `app-icon-87.png` | iPhone (3x) Settings |
| 80x80 | `app-icon-80.png` | iPhone (2x) Settings |
| 76x76 | `app-icon-76.png` | iPad |
| 60x60 | `app-icon-60.png` | iPhone |
| 58x58 | `app-icon-58.png` | Settings (2x) |
| 40x40 | `app-icon-40.png` | Spotlight |

### Adım 3: Drag & Drop

Her boyutu Assets Catalog'daki ilgili slot'a sürükleyin.

**Alternatif (Otomatik):**

```bash
# Assets.xcassets klasörüne icon'ları kopyala
cp /Users/sardag/Desktop/ADE/mobile/assets/ios/*.png \
   /Users/sardag/Desktop/ADE/mobile/ios/ADE/Assets.xcassets/AppIcon.appiconset/
```

---

## ⚙️ Build Settings

### Adım 1: Project Settings

1. Project Navigator > **ADE (proje)** > **TARGETS > ADE**
2. **General** tab:

| Setting | Value |
|---------|-------|
| **Bundle Identifier** | `tr.gov.ade.app` |
| **Version** | `1.0.0` |
| **Build** | `1` |
| **Deployment Target** | `iOS 17.0` |
| **Devices** | `iPhone, iPad` |
| **Supported Destinations** | `iPhone, iPad, Mac (Designed for iPad)` |

### Adım 2: Signing & Capabilities

1. **Signing & Capabilities** tab
2. **Team:** Apple Development (veya kendi team'iniz)
3. **Automatically manage signing:** ✅ Seçili

**Capabilities to Add:**

- [x] **Push Notifications** (+ Capability)
- [x] **Background Modes** (+ Capability)
  - ✅ Background fetch
  - ✅ Remote notifications
- [x] **Keychain Sharing** (+ Capability)
  - Keychain Group: `$(AppIdentifierPrefix)tr.gov.ade.app`

### Adım 3: Build Settings

1. **Build Settings** tab
2. **Swift Compiler - Language:**

| Setting | Value |
|---------|-------|
| **Swift Language Version** | `Swift 6` |
| **Swift Strict Concurrency Checking** | `Complete` |

3. **Linking:**

| Setting | Value |
|---------|-------|
| **Other Linker Flags** | `-ObjC` |

---

## 🏃 Çalıştırma

### Adım 1: Scheme Seçin

1. Toolbar > **Scheme dropdown** > **ADE**
2. **Destination:** iPhone 15 Pro Simulator (veya fiziksel cihaz)

### Adım 2: Build & Run

```bash
# Komut satırından (opsiyonel)
cd /Users/sardag/Desktop/ADE/mobile/ios
xcodebuild -project ADE.xcodeproj -scheme ADE -destination 'platform=iOS Simulator,name=iPhone 15 Pro' build

# Veya Xcode'da
⌘ + R
```

### Adım 3: Backend'i Çalıştırın

```bash
# Terminal 1: Backend (NestJS)
cd /Users/sardag/Desktop/ADE/backend
pnpm run start:dev

# Backend: http://localhost:3000
```

### Adım 4: Uygulamayı Test Edin

1. **Login Screen** açılmalı
2. Test credentials:
   - Email: `test@example.com`
   - Password: `Test1234!`

3. **Face ID Prompt** (Simulator'da Features > Face ID > Enrolled)
4. **Dashboard** görüntülenmeli

---

## 🐛 Troubleshooting

### Problem 1: "No such module 'Charts'"

**Çözüm:** iOS 17+ için SwiftUI Charts built-in. Import'u kontrol edin:

```swift
import Charts // ✅ SwiftUI.Charts değil
```

### Problem 2: Keychain Access Denied

**Çözüm:** Signing & Capabilities > Keychain Sharing ekleyin.

### Problem 3: Face ID Not Working

**Çözüm:** Simulator'da **Features > Face ID > Enrolled** seçin.

### Problem 4: Network Error (localhost)

**Çözüm:** Info.plist'te App Transport Security ayarlarını kontrol edin.

```bash
# Backend'in çalıştığını kontrol edin
curl http://localhost:3000/api/v1/health
```

---

## 📱 Test Cihazları

### Desteklenen Cihazlar:

- **iPhone:** 11, 12, 13, 14, 15 Pro (iOS 17+)
- **iPad:** Air 5, Pro 11", Pro 12.9" (iPadOS 17+)
- **Mac:** Apple Silicon (M1+) - Mac Catalyst

### Simulator Önerileri:

1. **iPhone 15 Pro** (Default)
2. **iPad Pro 12.9"** (Tablet UI test)
3. **iPhone SE (3rd gen)** (Küçük ekran test)

---

## ✅ Kontrol Listesi

Proje oluşturduktan sonra kontrol edin:

- [x] Xcode projesi başarıyla oluşturuldu
- [x] Tüm Swift dosyaları projeye eklendi
- [x] App icon'lar Assets Catalog'a eklendi
- [x] Info.plist doğru konfigüre edildi
- [x] Signing & Capabilities ayarlandı
- [x] Backend localhost:3000'de çalışıyor
- [x] Simulator'da uygulama çalışıyor
- [x] Face ID test edildi
- [x] Dashboard yükleniyor

---

## 🚀 Sonraki Adımlar

1. ✅ **API Entegrasyonu Test Et**
   - Login/Logout
   - Dashboard verilerini çek
   - E-Devlet entegrasyonlarını test et

2. ⏳ **Kalan View'ları Implement Et**
   - IntegrationsView.swift
   - ECommerceView.swift
   - AIAssistantView.swift
   - ProfileView.swift

3. ⏳ **Unit Tests Ekle**
   - AuthenticationManager tests
   - APIClient tests
   - ViewModel tests

4. ⏳ **UI Tests Ekle**
   - Login flow
   - Dashboard navigation
   - Order management

5. ⏳ **Performance Optimization**
   - Image caching
   - API response caching
   - Background data sync

---

## 📞 Destek

Sorun yaşarsanız:

- **Dokümantasyon:** `/Users/sardag/Desktop/ADE/mobile/IMPLEMENTATION_COMPLETE.md`
- **Proje Durumu:** `/Users/sardag/Desktop/ADE/FINAL_PROJECT_STATUS.md`
- **GitHub Issues:** (Eğer varsa)

---

**Güncelleme:** 24 Ocak 2026, 01:10
**Durum:** ✅ Setup Guide Hazır
**Sonraki:** Android Studio Project Setup
