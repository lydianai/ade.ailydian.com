/**
 * ADE Türkçe Hata ve Bilgi Mesajları
 * Tüm kullanıcıya gösterilecek mesajlar Türkçe ve gramere uygun şekilde burada tanımlanır
 */

export const MESAJLAR = {
  // Genel Mesajlar
  GENEL: {
    BASARILI: 'İşlem başarıyla tamamlandı.',
    BASARISIZ: 'İşlem başarısız oldu.',
    SUNUCU_HATASI: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyiniz.',
    YETKISIZ: 'Bu işlem için yetkiniz bulunmamaktadır.',
    BULUNAMADI: 'Aradığınız kayıt bulunamadı.',
    GECERSIZ_VERI: 'Gönderilen veriler geçersizdir.',
  },

  // Kimlik Doğrulama (Auth)
  AUTH: {
    // Başarı Mesajları
    GIRIS_BASARILI: 'Giriş başarılı. Hoş geldiniz!',
    KAYIT_BASARILI: 'Hesabınız başarıyla oluşturuldu. Hoş geldiniz!',
    CIKIS_BASARILI: 'Çıkış yapıldı. Güle güle!',
    TOKEN_YENILENDI: 'Oturum süreniz uzatıldı.',

    // Hata Mesajları
    GIRIS_BASARISIZ: 'E-posta veya şifre hatalı.',
    KULLANICI_BULUNAMADI: 'Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.',
    YANLIS_SIFRE: 'Girdiğiniz şifre hatalı.',
    HESAP_ZATEN_MEVCUT: 'Bu e-posta adresi ile zaten kayıtlı bir hesap bulunmaktadır.',
    TOKEN_GECERSIZ: 'Oturum bilgileriniz geçersiz. Lütfen tekrar giriş yapınız.',
    TOKEN_SURESI_DOLMUS: 'Oturum süreniz dolmuştur. Lütfen tekrar giriş yapınız.',
    YETKISIZ_ERISIM: 'Bu sayfaya erişim yetkiniz bulunmamaktadır.',
    HESAP_ASKIYA_ALINMIS: 'Hesabınız askıya alınmıştır. Lütfen destek ekibiyle iletişime geçiniz.',
    EMAIL_DOGRULANMAMIS: 'E-posta adresiniz doğrulanmamış. Lütfen gelen kutunuzu kontrol ediniz.',

    // Validasyon Mesajları
    EMAIL_GECERSIZ: 'Geçerli bir e-posta adresi giriniz.',
    EMAIL_GEREKLI: 'E-posta adresi zorunludur.',
    SIFRE_GEREKLI: 'Şifre zorunludur.',
    SIFRE_KISA: 'Şifreniz en az 8 karakter olmalıdır.',
    SIFRE_ZAYIF: 'Şifreniz en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.',
    AD_GEREKLI: 'Ad zorunludur.',
    SOYAD_GEREKLI: 'Soyad zorunludur.',
    TC_GECERSIZ: 'Geçerli bir TC Kimlik Numarası giriniz.',
    TELEFON_GECERSIZ: 'Geçerli bir telefon numarası giriniz.',
  },

  // Kullanıcı İşlemleri
  KULLANICI: {
    PROFIL_GUNCELLENDI: 'Profiliniz başarıyla güncellendi.',
    SIFRE_DEGISTIRILDI: 'Şifreniz başarıyla değiştirildi.',
    HESAP_SILINDI: 'Hesabınız başarıyla silindi.',
    EMAIL_DOGRULANDI: 'E-posta adresiniz başarıyla doğrulandı.',
    TELEFON_DOGRULANDI: 'Telefon numaranız başarıyla doğrulandı.',
  },

  // Fatura İşlemleri
  FATURA: {
    OLUSTURULDU: 'Fatura başarıyla oluşturuldu.',
    GUNCELLENDI: 'Fatura başarıyla güncellendi.',
    SILINDI: 'Fatura başarıyla silindi.',
    GONDERILDI: 'Fatura GİB\'e başarıyla gönderildi.',
    IPTAL_EDILDI: 'Fatura başarıyla iptal edildi.',
    BULUNAMADI: 'Fatura bulunamadı.',
    GIB_HATASI: 'GİB bağlantısında hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
  },

  // Müşteri İşlemleri
  MUSTERI: {
    EKLENDI: 'Müşteri başarıyla eklendi.',
    GUNCELLENDI: 'Müşteri bilgileri güncellendi.',
    SILINDI: 'Müşteri başarıyla silindi.',
    BULUNAMADI: 'Müşteri bulunamadı.',
  },

  // Ödeme İşlemleri
  ODEME: {
    BASARILI: 'Ödeme başarıyla alındı.',
    BASARISIZ: 'Ödeme işlemi başarısız oldu.',
    IPTAL_EDILDI: 'Ödeme iptal edildi.',
    IADE_EDILDI: 'Ödeme iade edildi.',
  },

  // Vergi İşlemleri
  VERGI: {
    BEYANNAME_OLUSTURULDU: 'Vergi beyannamesi oluşturuldu.',
    BEYANNAME_GONDERILDI: 'Beyanname GİB\'e gönderildi.',
    BEYANNAME_HATASI: 'Beyanname gönderiminde hata oluştu.',
  },

  // SGK İşlemleri
  SGK: {
    ISCI_EKLENDI: 'İşçi SGK\'ya bildirildi.',
    ISCI_CIKARILDI: 'İşçi çıkış bildirimi yapıldı.',
    BILDIRIM_HATASI: 'SGK bildirimi sırasında hata oluştu.',
  },

  // KVKK
  KVKK: {
    ONAY_GEREKLI: 'KVKK aydınlatma metnini onaylamanız gerekmektedir.',
    ONAY_ALINDI: 'KVKK onayınız kaydedildi.',
    VERI_SILME_TALEBI: 'Veri silme talebiniz alınmıştır. 30 gün içinde işleme alınacaktır.',
  },

  // Validasyon Mesajları
  VALIDASYON: {
    ALAN_GEREKLI: (alan: string) => `${alan} alanı zorunludur.`,
    MIN_UZUNLUK: (alan: string, min: number) => `${alan} en az ${min} karakter olmalıdır.`,
    MAX_UZUNLUK: (alan: string, max: number) => `${alan} en fazla ${max} karakter olmalıdır.`,
    GECERSIZ_FORMAT: (alan: string) => `${alan} formatı geçersizdir.`,
    POZITIF_SAYI: (alan: string) => `${alan} pozitif bir sayı olmalıdır.`,
    TARIH_GECERSIZ: 'Geçersiz tarih formatı.',
    GELECEK_TARIH: 'Gelecek bir tarih seçilemez.',
    GECMIS_TARIH: 'Geçmiş bir tarih seçilemez.',
  },

  // Rate Limiting
  RATE_LIMIT: {
    ASIRI_ISTEK: 'Çok fazla istek gönderdiniz. Lütfen birkaç dakika bekleyiniz.',
  },
} as const;

// Tip güvenliği için export
export type MesajTipi = typeof MESAJLAR;
