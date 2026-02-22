# 🤖 ADE Android Studio Project Setup Guide

**Tarih:** 24 Ocak 2026
**Durum:** ✅ Kod Hazır - Android Studio Projesi Oluşturulacak
**Platform:** Android API 26+ (Android 8.0+)
**Android Studio:** Hedgehog 2023.1.1+

---

## 📋 İçindekiler

1. [Önkoşullar](#önkoşullar)
2. [Android Studio Projesi Oluşturma](#android-studio-projesi-oluşturma)
3. [Dosya Yapısı](#dosya-yapısı)
4. [Dependencies (Gradle)](#dependencies-gradle)
5. [AndroidManifest.xml Konfigürasyonu](#androidmanifestxml-konfigürasyonu)
6. [App Icon Ekleme](#app-icon-ekleme)
7. [Build Configuration](#build-configuration)
8. [Çalıştırma](#çalıştırma)

---

## 🔧 Önkoşullar

### Gereksinimler:

- [x] **Android Studio** Hedgehog 2023.1.1 veya üzeri
- [x] **JDK** 17 veya üzeri
- [x] **Kotlin** 2.0+
- [x] **Android SDK** API 26-34
- [x] **Gradle** 8.2+
- [x] Android emulator veya fiziksel cihaz (API 26+)

### Kontrol:

```bash
# Android Studio versiyonu
/Applications/Android\ Studio.app/Contents/MacOS/studio --version

# Java versiyonu
java -version

# Kotlin versiyonu
kotlin -version

# Android SDK
echo $ANDROID_HOME
```

### Kurulum (macOS):

```bash
# Java (eğer yoksa)
brew install openjdk@17

# Android Studio (eğer yoksa)
brew install --cask android-studio
```

---

## 📦 Android Studio Projesi Oluşturma

### Adım 1: Android Studio'yu Açın

```bash
open -a "Android Studio"
```

### Adım 2: Yeni Proje Oluşturun

1. **New Project** > **Empty Activity**
2. **Next** tıklayın

### Adım 3: Proje Ayarları

| Field | Value |
|-------|-------|
| **Name** | `ADE` |
| **Package name** | `tr.gov.ade` |
| **Save location** | `/Users/lydian/Desktop/ADE/mobile/android` |
| **Language** | `Kotlin` |
| **Minimum SDK** | `API 26 ("Oreo"; Android 8.0)` |
| **Build configuration language** | `Kotlin DSL (build.gradle.kts)` |

**Finish** tıklayın ve proje oluşmasını bekleyin (ilk sync 2-5 dakika sürebilir).

---

## 📁 Dosya Yapısı

Android Studio Project View'da aşağıdaki yapıyı oluşturun:

```
app/src/main/
├── java/tr/gov/ade/
│   ├── MainActivity.kt ✅ (Mevcut)
│   ├── ADEApplication.kt (Hilt için oluşturulacak)
│   ├── core/
│   │   ├── auth/
│   │   │   └── AuthenticationManager.kt ✅ (Mevcut)
│   │   ├── security/
│   │   │   └── EncryptedPrefsManager.kt (Oluşturulacak)
│   │   └── network/
│   │       └── APIClient.kt ✅ (Mevcut)
│   ├── data/
│   │   └── model/
│   │       └── APIModels.kt ✅ (Mevcut)
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── DashboardScreen.kt ✅ (Mevcut)
│   │   │   └── DashboardViewModel.kt ✅ (Mevcut)
│   │   ├── integrations/
│   │   │   └── IntegrationsScreen.kt
│   │   ├── ecommerce/
│   │   │   └── ECommerceScreen.kt
│   │   ├── ai/
│   │   │   └── AIAssistantScreen.kt
│   │   └── profile/
│   │       └── ProfileScreen.kt
│   └── ui/
│       └── theme/
│           ├── Color.kt
│           ├── Theme.kt
│           └── Type.kt
├── res/
│   ├── drawable/
│   ├── mipmap-mdpi/ ✅ (Icon hazır)
│   ├── mipmap-hdpi/ ✅ (Icon hazır)
│   ├── mipmap-xhdpi/ ✅ (Icon hazır)
│   ├── mipmap-xxhdpi/ ✅ (Icon hazır)
│   ├── mipmap-xxxhdpi/ ✅ (Icon hazır)
│   ├── values/
│   │   ├── strings.xml
│   │   ├── colors.xml
│   │   └── themes.xml
│   └── xml/
│       └── network_security_config.xml
└── AndroidManifest.xml
```

### Mevcut Dosyaları Kopyalayın

```bash
# Dosya yapısını oluştur
cd /Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade

# Core files
mkdir -p core/auth core/security core/network
cp /Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/core/auth/AuthenticationManager.kt core/auth/
cp /Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/core/network/APIClient.kt core/network/

# Data models
mkdir -p data/model
cp /Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/data/model/APIModels.kt data/model/

# Features
mkdir -p features/dashboard
cp /Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/features/dashboard/DashboardScreen.kt features/dashboard/
cp /Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/features/dashboard/DashboardViewModel.kt features/dashboard/
```

---

## 📚 Dependencies (Gradle)

### Adım 1: Project-level `build.gradle.kts`

Dosya yolu: `/Users/lydian/Desktop/ADE/mobile/android/build.gradle.kts`

```kotlin
// Top-level build file
plugins {
    id("com.android.application") version "8.2.0" apply false
    id("org.jetbrains.kotlin.android") version "2.0.0" apply false
    id("com.google.dagger.hilt.android") version "2.50" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.0" apply false
}
```

### Adım 2: Module-level `build.gradle.kts`

Dosya yolu: `/Users/lydian/Desktop/ADE/mobile/android/app/build.gradle.kts`

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.dagger.hilt.android")
    id("kotlin-kapt")
    id("kotlin-parcelize")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "tr.gov.ade"
    compileSdk = 34

    defaultConfig {
        applicationId = "tr.gov.ade"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        vectorDrawables {
            useSupportLibrary = true
        }

        // API Base URL
        buildConfigField("String", "BASE_URL_DEV", "\"http://10.0.2.2:3000/api/v1\"")
        buildConfigField("String", "BASE_URL_PROD", "\"https://api.ade.gov.tr/api/v1\"")
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Core Android
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")

    // Compose BOM
    implementation(platform("androidx.compose:compose-bom:2024.01.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3:1.2.0")
    implementation("androidx.compose.material:material-icons-extended")

    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.6")

    // Lifecycle & ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")

    // Hilt (Dependency Injection)
    implementation("com.google.dagger:hilt-android:2.50")
    kapt("com.google.dagger:hilt-android-compiler:2.50")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")

    // Retrofit (Network)
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Gson (JSON parsing)
    implementation("com.google.code.gson:gson:2.10.1")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    // Security (EncryptedSharedPreferences)
    implementation("androidx.security:security-crypto:1.1.0-alpha06")

    // Biometric
    implementation("androidx.biometric:biometric:1.2.0-alpha05")

    // Splash Screen
    implementation("androidx.core:core-splashscreen:1.0.1")

    // Charts (Vico)
    implementation("com.patrykandpatrick.vico:compose:1.13.1")
    implementation("com.patrykandpatrick.vico:compose-m3:1.13.1")
    implementation("com.patrykandpatrick.vico:core:1.13.1")

    // Coil (Image loading)
    implementation("io.coil-kt:coil-compose:2.5.0")

    // DataStore (Preferences)
    implementation("androidx.datastore:datastore-preferences:1.0.0")

    // Testing
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation(platform("androidx.compose:compose-bom:2024.01.00"))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}

// Hilt kapt config
kapt {
    correctErrorTypes = true
}
```

### Adım 3: Sync Project

```bash
# Android Studio'da
File > Sync Project with Gradle Files

# Veya Terminal'de
cd /Users/lydian/Desktop/ADE/mobile/android
./gradlew build
```

---

## ⚙️ AndroidManifest.xml Konfigürasyonu

Dosya yolu: `/Users/lydian/Desktop/ADE/mobile/android/app/src/main/AndroidManifest.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
        android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />

    <!-- Hardware Features -->
    <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.fingerprint"
        android:required="false" />

    <application
        android:name=".ADEApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ADE"
        android:networkSecurityConfig="@xml/network_security_config"
        android:usesCleartextTraffic="false"
        tools:targetApi="31">

        <!-- Main Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.ADE"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- FileProvider (for camera/file uploads) -->
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>

    </application>

</manifest>
```

### Network Security Config

Dosya: `/Users/lydian/Desktop/ADE/mobile/android/app/src/main/res/xml/network_security_config.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Development only - Allow localhost HTTP -->
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>

    <!-- Production - HTTPS only -->
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>

    <!-- Certificate Pinning (Production) -->
    <domain-config>
        <domain includeSubdomains="true">api.ade.gov.tr</domain>
        <pin-set expiration="2027-01-01">
            <pin digest="SHA-256">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=</pin>
            <!-- Backup pin -->
            <pin digest="SHA-256">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=</pin>
        </pin-set>
    </domain-config>
</network-security-config>
```

---

## 🎨 App Icon Ekleme

Icon'lar `/Users/lydian/Desktop/ADE/mobile/assets/android/` klasöründe hazır.

### Adım 1: Icon'ları Kopyalayın

```bash
# res/mipmap klasörlerine kopyala
cd /Users/lydian/Desktop/ADE/mobile/android/app/src/main/res

# Her density için ic_launcher.png
cp /Users/lydian/Desktop/ADE/mobile/assets/android/mipmap-mdpi/ic_launcher.png mipmap-mdpi/
cp /Users/lydian/Desktop/ADE/mobile/assets/android/mipmap-hdpi/ic_launcher.png mipmap-hdpi/
cp /Users/lydian/Desktop/ADE/mobile/assets/android/mipmap-xhdpi/ic_launcher.png mipmap-xhdpi/
cp /Users/lydian/Desktop/ADE/mobile/assets/android/mipmap-xxhdpi/ic_launcher.png mipmap-xxhdpi/
cp /Users/lydian/Desktop/ADE/mobile/assets/android/mipmap-xxxhdpi/ic_launcher.png mipmap-xxxhdpi/

# Adaptive icon için (opsiyonel)
cp /Users/lydian/Desktop/ADE/mobile/assets/android/ic_launcher_playstore.png mipmap-xxxhdpi/ic_launcher_round.png
```

### Adım 2: Image Asset Studio (Opsiyonel)

1. **res** klasörüne sağ tık
2. **New > Image Asset**
3. **Icon Type:** Launcher Icons (Adaptive and Legacy)
4. **Path:** `/Users/lydian/Desktop/ADE/mobile/assets/android/ic_launcher_playstore.png`
5. **Next** > **Finish**

---

## 🔨 Build Configuration

### Adım 1: Hilt Application Class

Dosya: `/Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/ADEApplication.kt`

```kotlin
package tr.gov.ade

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

/**
 * ADE Application Class
 *
 * Hilt dependency injection için gerekli
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */
@HiltAndroidApp
class ADEApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize analytics, crash reporting, etc.
    }
}
```

### Adım 2: EncryptedPrefsManager

Dosya: `/Users/lydian/Desktop/ADE/mobile/android/app/src/main/java/tr/gov/ade/core/security/EncryptedPrefsManager.kt`

```kotlin
package tr.gov.ade.core.security

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Encrypted SharedPreferences Manager
 *
 * AES-256-GCM encryption for secure local storage
 *
 * @author ADE Mobile Team
 * @since 2026-01-24
 */
@Singleton
class EncryptedPrefsManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)

    private val sharedPreferences: SharedPreferences = EncryptedSharedPreferences.create(
        "ade_secure_prefs",
        masterKeyAlias,
        context,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    fun saveAccessToken(token: String) {
        sharedPreferences.edit().putString(KEY_ACCESS_TOKEN, token).apply()
    }

    fun getAccessToken(): String? {
        return sharedPreferences.getString(KEY_ACCESS_TOKEN, null)
    }

    fun saveRefreshToken(token: String) {
        sharedPreferences.edit().putString(KEY_REFRESH_TOKEN, token).apply()
    }

    fun getRefreshToken(): String? {
        return sharedPreferences.getString(KEY_REFRESH_TOKEN, null)
    }

    fun clearAll() {
        sharedPreferences.edit().clear().apply()
    }

    companion object {
        private const val KEY_ACCESS_TOKEN = "access_token"
        private const val KEY_REFRESH_TOKEN = "refresh_token"
    }
}
```

### Adım 3: ProGuard Rules

Dosya: `/Users/lydian/Desktop/ADE/mobile/android/app/proguard-rules.pro`

```proguard
# Retrofit
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keepclassmembers class * {
    @retrofit2.http.* <methods>;
}

# Gson
-keep class com.google.gson.** { *; }
-keep class tr.gov.ade.data.model.** { *; }

# OkHttp
-dontwarn okhttp3.**
-keep class okhttp3.** { *; }

# Kotlin Coroutines
-keepclassmembernames class kotlinx.** {
    volatile <fields>;
}
```

---

## 🏃 Çalıştırma

### Adım 1: Backend'i Çalıştırın

```bash
# Terminal 1: Backend (NestJS)
cd /Users/lydian/Desktop/ADE/backend
pnpm run start:dev

# Backend: http://localhost:3000
# Android Emulator: http://10.0.2.2:3000
```

### Adım 2: Emulator Oluşturun (İlk Kez)

1. **Tools > Device Manager**
2. **Create Device**
3. **Phone > Pixel 8 Pro** seçin
4. **System Image:** Android 14 (API 34) - x86_64
5. **Finish**

### Adım 3: Uygulamayı Çalıştırın

```bash
# Android Studio'da
Run > Run 'app' (Shift + F10)

# Veya Terminal'de
cd /Users/lydian/Desktop/ADE/mobile/android
./gradlew installDebug

# Logları görmek için
./gradlew installDebug && adb logcat -s ADE:*
```

### Adım 4: Test Edin

1. **Splash Screen** görünmeli (2 saniye)
2. **Login Screen** açılmalı
3. Test credentials:
   - Email: `test@example.com`
   - Password: `Test1234!`
4. **Fingerprint/Face Unlock** prompt (emulatorda Settings > Security)
5. **Dashboard** yüklenmeli

---

## 🐛 Troubleshooting

### Problem 1: "Cannot resolve symbol 'R'"

**Çözüm:** Clean & Rebuild

```bash
./gradlew clean build
# Veya Android Studio'da: Build > Clean Project > Rebuild Project
```

### Problem 2: Hilt kapt errors

**Çözüm:** `@HiltAndroidApp` annotation'ı `ADEApplication.kt`'ye eklediğinizden emin olun.

### Problem 3: Network "Unable to resolve host"

**Çözüm:** Emulator için `10.0.2.2:3000` kullanın, `localhost` değil.

```kotlin
// APIClient.kt
val baseUrl = if (BuildConfig.DEBUG) {
    "http://10.0.2.2:3000/api/v1" // ✅ Emulator
} else {
    "https://api.ade.gov.tr/api/v1" // ✅ Production
}
```

### Problem 4: Biometric "Not available"

**Çözüm:** Emulator Settings > Security > Screen Lock > PIN oluşturun, sonra Fingerprint ekleyin.

```bash
# adb ile fingerprint test
adb -e emu finger touch 1
```

---

## ✅ Kontrol Listesi

- [x] Android Studio projesi oluşturuldu
- [x] Gradle dependencies sync edildi
- [x] Tüm Kotlin dosyaları projeye eklendi
- [x] App icon'lar res/mipmap'e kopyalandı
- [x] AndroidManifest.xml konfigüre edildi
- [x] Network security config eklendi
- [x] Hilt setup tamamlandı
- [x] Backend localhost:3000'de çalışıyor
- [x] Emulator oluşturuldu ve çalışıyor
- [x] Uygulama başarıyla çalışıyor
- [x] Login/Biometric test edildi
- [x] Dashboard yükleniyor

---

## 🚀 Sonraki Adımlar

1. ✅ **API Entegrasyonu Test Et**
2. ⏳ **Kalan Screen'leri Implement Et**
3. ⏳ **Unit Tests Ekle**
4. ⏳ **UI Tests (Espresso) Ekle**
5. ⏳ **Performance Profiling**

---

**Güncelleme:** 24 Ocak 2026, 01:10
**Durum:** ✅ Setup Guide Hazır
**Sonraki:** Feature Implementation
