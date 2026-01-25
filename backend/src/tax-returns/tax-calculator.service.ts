import { Injectable, Logger } from '@nestjs/common';

/**
 * 💰 VERGİ HESAPLAMA MOTORü
 *
 * Türkiye Cumhuriyeti vergi sistemine göre tüm vergi türlerini hesaplar
 *
 * Yasal Dayanak:
 * - 213 Sayılı VUK (Vergi Usul Kanunu)
 * - 193 Sayılı GVK (Gelir Vergisi Kanunu)
 * - 5520 Sayılı Kurumlar Vergisi Kanunu
 * - 3065 Sayılı KDV Kanunu
 *
 * Güncelleme: 2024 Yılı Oranları
 */

// Vergi türleri
export enum VergiTuru {
  KDV = 'KDV',
  GELIR_VERGISI = 'GELIR_VERGISI',
  KURUMLAR_VERGISI = 'KURUMLAR_VERGISI',
  STOPAJ = 'STOPAJ',
  DAMGA_VERGISI = 'DAMGA_VERGISI',
  MTV = 'MTV', // Motorlu Taşıtlar Vergisi
  VERASET_INTIKAL = 'VERASET_INTIKAL',
  OTV = 'OTV', // Özel Tüketim Vergisi
}

// KDV oranları (2024)
export enum KdvOrani {
  ORAN_1 = 0.01, // %1 (temel gıda, gazete, kitap)
  ORAN_10 = 0.10, // %10 (konut kira, elektrik, su, doğalgaz)
  ORAN_20 = 0.20, // %20 (genel oran)
}

// Gelir Vergisi dilimleri (2024)
export interface GelirVergisiDilimi {
  altSinir: number;
  ustSinir: number | null; // null = üst sınır yok
  oran: number;
  sabitTutar: number; // O dilime kadar ödenen toplam vergi
}

export const GELIR_VERGISI_DILIMLERI_2024: GelirVergisiDilimi[] = [
  { altSinir: 0, ustSinir: 110000, oran: 0.15, sabitTutar: 0 },
  { altSinir: 110000, ustSinir: 230000, oran: 0.20, sabitTutar: 16500 },
  { altSinir: 230000, ustSinir: 580000, oran: 0.27, sabitTutar: 40500 },
  { altSinir: 580000, ustSinir: 3000000, oran: 0.35, sabitTutar: 135000 },
  { altSinir: 3000000, ustSinir: null, oran: 0.40, sabitTutar: 982000 },
];

// Stopaj oranları (çeşitli gelir türleri için)
export enum StopajOrani {
  MAAS = 0.15, // Maaş için başlangıç dilimi (dilimlere göre değişir)
  KİRA = 0.20, // Kira geliri stopajı
  SERBEST_MESLEK = 0.20, // Serbest meslek kazancı
  MENKUL_KIYMET = 0.10, // Menkul kıymet alım satım kazancı
  REPO = 0.10, // Repo geliri
  FAIZ = 0.10, // Faiz geliri
  TEMETTÜ = 0.10, // Temettü geliri
}

// Kurumlar Vergisi oranı (2024)
export const KURUMLAR_VERGISI_ORANI = 0.25; // %25

// Damga Vergisi oranı
export const DAMGA_VERGISI_ORANI = 0.00948; // %0.948

// MTV katsayıları (motor hacmine göre)
export const MTV_KATSAYILARI = {
  otomobil: {
    '0-1300': 1627,
    '1301-1600': 2877,
    '1601-1800': 4351,
    '1801-2000': 5825,
    '2001-2500': 8773,
    '2501-3000': 13150,
    '3001-3500': 17527,
    '3501-4000': 21903,
    '4001+': 26280,
  },
  minibus: {
    '0-1800': 2877,
    '1801-2600': 5825,
    '2601+': 8773,
  },
  kamyonet: {
    '0-3500': 2436,
    '3501+': 4872,
  },
};

@Injectable()
export class TaxCalculatorService {
  private readonly logger = new Logger(TaxCalculatorService.name);

  constructor() {
    this.logger.log('✅ Tax Calculator Service initialized (2024 rates)');
  }

  /**
   * 🧮 KDV HESAPLAMA
   *
   * @param tutar - KDV hariç tutar
   * @param oran - KDV oranı (%1, %10, %20)
   * @returns { kdv, toplamTutar, kdvOrani }
   *
   * @example
   * hesaplaKDV(1000, KdvOrani.ORAN_20)
   * // { kdv: 200, toplamTutar: 1200, kdvOrani: 0.20 }
   */
  hesaplaKDV(tutar: number, oran: KdvOrani = KdvOrani.ORAN_20) {
    const kdv = tutar * oran;
    const toplamTutar = tutar + kdv;

    this.logger.debug(
      `KDV Hesaplandı: ${tutar} TL (oran: %${oran * 100}) → KDV: ${kdv} TL`,
    );

    return {
      araToplam: tutar,
      kdv: Math.round(kdv * 100) / 100,
      toplamTutar: Math.round(toplamTutar * 100) / 100,
      kdvOrani: oran,
      kdvYuzdesi: oran * 100,
    };
  }

  /**
   * 🔄 KDV DAHİL TUTARDAN KDV AYIRMA
   *
   * @param kdvDahilTutar - KDV dahil toplam tutar
   * @param oran - KDV oranı
   * @returns { kdvHaricTutar, kdv, kdvOrani }
   */
  kdvAyir(kdvDahilTutar: number, oran: KdvOrani = KdvOrani.ORAN_20) {
    const kdvHaricTutar = kdvDahilTutar / (1 + oran);
    const kdv = kdvDahilTutar - kdvHaricTutar;

    return {
      kdvDahilTutar,
      kdvHaricTutar: Math.round(kdvHaricTutar * 100) / 100,
      kdv: Math.round(kdv * 100) / 100,
      kdvOrani: oran,
      kdvYuzdesi: oran * 100,
    };
  }

  /**
   * 💼 GELİR VERGİSİ HESAPLAMA (Dilimli Tarife)
   *
   * 193 Sayılı GVK - 2024 dilimleri
   *
   * @param yillikGelir - Yıllık brüt gelir
   * @returns { vergi, netGelir, ortalamVergiOrani, dilimDetayi }
   *
   * @example
   * hesaplaGelirVergisi(500000)
   * // 0-110k: 16.500 TL (%15)
   * // 110k-230k: 24.000 TL (%20)
   * // 230k-500k: 72.900 TL (%27)
   * // Toplam: 113.400 TL
   */
  hesaplaGelirVergisi(yillikGelir: number) {
    let toplamVergi = 0;
    const dilimDetayi: Array<{
      dilim: string;
      tutar: number;
      oran: number;
      vergi: number;
    }> = [];

    for (const dilim of GELIR_VERGISI_DILIMLERI_2024) {
      if (yillikGelir <= dilim.altSinir) break;

      const dilimUstSinir = dilim.ustSinir || yillikGelir;
      const vergilendirilenTutar = Math.min(yillikGelir, dilimUstSinir) - dilim.altSinir;

      if (vergilendirilenTutar > 0) {
        const dilimVergisi = vergilendirilenTutar * dilim.oran;
        toplamVergi += dilimVergisi;

        dilimDetayi.push({
          dilim: `${dilim.altSinir.toLocaleString('tr-TR')} - ${
            dilim.ustSinir
              ? dilim.ustSinir.toLocaleString('tr-TR')
              : '∞'
          } TL`,
          tutar: vergilendirilenTutar,
          oran: dilim.oran * 100,
          vergi: Math.round(dilimVergisi * 100) / 100,
        });
      }
    }

    const netGelir = yillikGelir - toplamVergi;
    const ortalamVergiOrani = (toplamVergi / yillikGelir) * 100;

    this.logger.debug(
      `Gelir Vergisi: ${yillikGelir} TL → Vergi: ${toplamVergi} TL (ort. %${ortalamVergiOrani.toFixed(2)})`,
    );

    return {
      brutGelir: yillikGelir,
      vergi: Math.round(toplamVergi * 100) / 100,
      netGelir: Math.round(netGelir * 100) / 100,
      ortalamVergiOrani: Math.round(ortalamVergiOrani * 100) / 100,
      dilimDetayi,
    };
  }

  /**
   * 📊 ÜCRET GELİRİ İÇİN NET MAAŞ HESAPLAMA
   *
   * SGK primleri + Gelir Vergisi + Damga Vergisi
   *
   * @param brutMaas - Brüt maaş
   * @returns { netMaas, sgkIsci, gelirVergisi, damgaVergisi }
   */
  hesaplaNetMaas(brutMaas: number) {
    // SGK işçi payı kesintileri
    const sgkIsciEmeklilik = brutMaas * 0.09; // %9
    const sgkIsciSaglik = brutMaas * 0.015; // %1.5
    const sgkIsciIssizlik = brutMaas * 0.01; // %1
    const sgkToplamIsci = sgkIsciEmeklilik + sgkIsciSaglik + sgkIsciIssizlik;

    // Gelir Vergisi Matrahı (Brüt - SGK işçi payı)
    const gelirVergisiMatrahi = brutMaas - sgkToplamIsci;

    // Aylık geliri yıllığa çevir, vergi hesapla, tekrar aylığa böl
    const yillikMatrah = gelirVergisiMatrahi * 12;
    const yillikVergi = this.hesaplaGelirVergisi(yillikMatrah).vergi;
    const aylikGelirVergisi = yillikVergi / 12;

    // Damga Vergisi (brüt maaş üzerinden)
    const damgaVergisi = brutMaas * DAMGA_VERGISI_ORANI;

    // Net Maaş = Brüt - SGK İşçi - Gelir Vergisi - Damga Vergisi
    const netMaas =
      brutMaas - sgkToplamIsci - aylikGelirVergisi - damgaVergisi;

    return {
      brutMaas,
      sgkIsci: {
        emeklilik: Math.round(sgkIsciEmeklilik * 100) / 100,
        saglik: Math.round(sgkIsciSaglik * 100) / 100,
        issizlik: Math.round(sgkIsciIssizlik * 100) / 100,
        toplam: Math.round(sgkToplamIsci * 100) / 100,
      },
      gelirVergisi: Math.round(aylikGelirVergisi * 100) / 100,
      damgaVergisi: Math.round(damgaVergisi * 100) / 100,
      toplamKesinti:
        Math.round((sgkToplamIsci + aylikGelirVergisi + damgaVergisi) * 100) /
        100,
      netMaas: Math.round(netMaas * 100) / 100,
      netOrani: Math.round((netMaas / brutMaas) * 10000) / 100, // %
    };
  }

  /**
   * 🏢 SGK İŞVEREN PRİMİ HESAPLAMA
   *
   * @param brutMaas - İşçinin brüt maaşı
   * @returns { primleri, toplamMaliyet }
   */
  hesaplaSGKIsverenPrimi(brutMaas: number) {
    const emeklilik = brutMaas * 0.115; // %11.5
    const saglik = brutMaas * 0.075; // %7.5
    const issizlik = brutMaas * 0.02; // %2
    const isTigoriKazasi = brutMaas * 0.015; // %1.5 (ortalama, sektöre göre değişir)
    const genelSaglikSigortasi = brutMaas * 0.075; // %7.5

    const toplamPrim =
      emeklilik + saglik + issizlik + isTigoriKazasi + genelSaglikSigortasi;
    const toplamMaliyet = brutMaas + toplamPrim;

    return {
      brutMaas,
      isverenPrimleri: {
        emeklilik: Math.round(emeklilik * 100) / 100,
        saglik: Math.round(saglik * 100) / 100,
        issizlik: Math.round(issizlik * 100) / 100,
        isTigoriKazasi: Math.round(isTigoriKazasi * 100) / 100,
        genelSaglikSigortasi: Math.round(genelSaglikSigortasi * 100) / 100,
        toplam: Math.round(toplamPrim * 100) / 100,
      },
      toplamMaliyet: Math.round(toplamMaliyet * 100) / 100,
      isverenMaliyetOrani: Math.round((toplamPrim / brutMaas) * 10000) / 100, // %
    };
  }

  /**
   * 💰 STOPAJ HESAPLAMA
   *
   * @param tutar - Stopaj matrahı
   * @param tur - Gelir türü (kira, serbest meslek, vs.)
   * @returns { stopaj, netTutar, stopajOrani }
   */
  hesaplaStopaj(tutar: number, tur: StopajOrani) {
    const stopaj = tutar * tur;
    const netTutar = tutar - stopaj;

    return {
      brutTutar: tutar,
      stopaj: Math.round(stopaj * 100) / 100,
      netTutar: Math.round(netTutar * 100) / 100,
      stopajOrani: tur,
      stopajYuzdesi: tur * 100,
    };
  }

  /**
   * 🏢 KURUMLAR VERGİSİ HESAPLAMA
   *
   * 5520 Sayılı Kanun - %25 (2024)
   *
   * @param kurumKazanci - Kurumun yıllık kazancı
   * @returns { vergi, netKar }
   */
  hesaplaKurumlarVergisi(kurumKazanci: number) {
    const vergi = kurumKazanci * KURUMLAR_VERGISI_ORANI;
    const netKar = kurumKazanci - vergi;

    return {
      brutKazanc: kurumKazanci,
      vergi: Math.round(vergi * 100) / 100,
      netKar: Math.round(netKar * 100) / 100,
      vergiOrani: KURUMLAR_VERGISI_ORANI * 100,
    };
  }

  /**
   * 📄 DAMGA VERGİSİ HESAPLAMA
   *
   * Sözleşme, makbuz, vb. belgeler için
   *
   * @param belgeMatrahi - Belge tutarı
   * @returns { damgaVergisi }
   */
  hesaplaDamgaVergisi(belgeMatrahi: number) {
    const damgaVergisi = belgeMatrahi * DAMGA_VERGISI_ORANI;

    return {
      belgeMatrahi,
      damgaVergisi: Math.round(damgaVergisi * 100) / 100,
      vergiOrani: DAMGA_VERGISI_ORANI * 100,
    };
  }

  /**
   * 🚗 MOTORLU TAŞITLAR VERGİSİ (MTV) HESAPLAMA
   *
   * @param aracTipi - otomobil, minibus, kamyonet
   * @param motorHacmi - cc cinsinden
   * @param modelYili - Aracın model yılı
   * @returns { yillikVergi, 6aylikVergi }
   */
  hesaplaMTV(
    aracTipi: 'otomobil' | 'minibus' | 'kamyonet',
    motorHacmi: number,
    modelYili: number,
  ) {
    let katsayi = 0;
    const katsayiTablosu = MTV_KATSAYILARI[aracTipi];

    // Motor hacmine göre katsayı belirle
    if (aracTipi === 'otomobil') {
      if (motorHacmi <= 1300) katsayi = katsayiTablosu['0-1300'];
      else if (motorHacmi <= 1600) katsayi = katsayiTablosu['1301-1600'];
      else if (motorHacmi <= 1800) katsayi = katsayiTablosu['1601-1800'];
      else if (motorHacmi <= 2000) katsayi = katsayiTablosu['1801-2000'];
      else if (motorHacmi <= 2500) katsayi = katsayiTablosu['2001-2500'];
      else if (motorHacmi <= 3000) katsayi = katsayiTablosu['2501-3000'];
      else if (motorHacmi <= 3500) katsayi = katsayiTablosu['3001-3500'];
      else if (motorHacmi <= 4000) katsayi = katsayiTablosu['3501-4000'];
      else katsayi = katsayiTablosu['4001+'];
    } else if (aracTipi === 'minibus') {
      if (motorHacmi <= 1800) katsayi = katsayiTablosu['0-1800'];
      else if (motorHacmi <= 2600) katsayi = katsayiTablosu['1801-2600'];
      else katsayi = katsayiTablosu['2601+'];
    } else {
      // kamyonet
      if (motorHacmi <= 3500) katsayi = katsayiTablosu['0-3500'];
      else katsayi = katsayiTablosu['3501+'];
    }

    // Yaş indirimi (15 yaşından büyük araçlara %10 indirim)
    const aracYasi = new Date().getFullYear() - modelYili;
    const yasIndirimi = aracYasi > 15 ? 0.90 : 1.0;

    const yillikVergi = katsayi * yasIndirimi;
    const altiAylikVergi = yillikVergi / 2;

    return {
      aracTipi,
      motorHacmi,
      modelYili,
      aracYasi,
      yasIndirimi: yasIndirimi < 1,
      yillikVergi: Math.round(yillikVergi * 100) / 100,
      altiAylikVergi: Math.round(altiAylikVergi * 100) / 100,
      ocakOdemesi: Math.round(altiAylikVergi * 100) / 100,
      temmuzOdemesi: Math.round(altiAylikVergi * 100) / 100,
    };
  }

  /**
   * 🧾 FATURA TOPLAM HESAPLAMA (KDV DAHİL)
   *
   * E-fatura için kullanılır
   *
   * @param kalemler - Fatura kalemleri
   * @returns { araToplam, toplamKDV, genelToplam }
   */
  hesaplaFaturaToplam(
    kalemler: Array<{
      aciklama: string;
      miktar: number;
      birimFiyat: number;
      kdvOrani: KdvOrani;
    }>,
  ) {
    let araToplam = 0;
    let toplamKDV = 0;

    const kalemDetaylari = kalemler.map((kalem) => {
      const tutarKDVHaric = kalem.miktar * kalem.birimFiyat;
      const kdvTutari = tutarKDVHaric * kalem.kdvOrani;
      const tutarKDVDahil = tutarKDVHaric + kdvTutari;

      araToplam += tutarKDVHaric;
      toplamKDV += kdvTutari;

      return {
        aciklama: kalem.aciklama,
        miktar: kalem.miktar,
        birimFiyat: kalem.birimFiyat,
        tutarKDVHaric: Math.round(tutarKDVHaric * 100) / 100,
        kdvOrani: kalem.kdvOrani * 100,
        kdvTutari: Math.round(kdvTutari * 100) / 100,
        tutarKDVDahil: Math.round(tutarKDVDahil * 100) / 100,
      };
    });

    const genelToplam = araToplam + toplamKDV;

    return {
      kalemler: kalemDetaylari,
      araToplam: Math.round(araToplam * 100) / 100,
      toplamKDV: Math.round(toplamKDV * 100) / 100,
      genelToplam: Math.round(genelToplam * 100) / 100,
    };
  }

  /**
   * 📅 GECİKME FAİZİ HESAPLAMA
   *
   * Vergi/prim ödemelerinde gecikme faizi
   *
   * @param anaParas - Ödenecek tutar
   * @param vadeGunSayisi - Vade tarihinden bugüne kaç gün geçti
   * @param yillikFaizOrani - Yıllık faiz oranı (TCMB + 5 puan, örn: 0.55)
   * @returns { gecikmeZammi, toplamBorc }
   */
  hesaplaGecikmeZammi(
    anaParas: number,
    vadeGunSayisi: number,
    yillikFaizOrani: number = 0.55, // %55 (2024 örnek)
  ) {
    const gunlukFaizOrani = yillikFaizOrani / 365;
    const gecikmeZammi = anaParas * gunlukFaizOrani * vadeGunSayisi;
    const toplamBorc = anaParas + gecikmeZammi;

    return {
      anaParas,
      vadeGunSayisi,
      yillikFaizOrani: yillikFaizOrani * 100,
      gecikmeZammi: Math.round(gecikmeZammi * 100) / 100,
      toplamBorc: Math.round(toplamBorc * 100) / 100,
    };
  }

  /**
   * 🎯 KAPSAMLI VERGİ ANALİZİ
   *
   * Bir şirket veya kişi için yıllık vergi yükünü analiz eder
   */
  analizYillikVergiYuku(params: {
    yillikCiro: number;
    giderler: number;
    maaslar: number;
    calisanSayisi: number;
    tip: 'sahis' | 'limited' | 'anonim';
  }) {
    const { yillikCiro, giderler, maaslar, calisanSayisi, tip } = params;
    const netKazanc = yillikCiro - giderler - maaslar;

    let kurumVergi = 0;
    let gelirVergisi = 0;

    if (tip === 'sahis') {
      // Şahıs şirketi - Gelir Vergisi öder
      const sonuc = this.hesaplaGelirVergisi(netKazanc);
      gelirVergisi = sonuc.vergi;
    } else {
      // Limited/Anonim - Kurumlar Vergisi öder
      const sonuc = this.hesaplaKurumlarVergisi(netKazanc);
      kurumVergi = sonuc.vergi;
    }

    // Cirodan hesaplanan KDV (sadece gösterim, gerçekte indirilecek KDV de var)
    const ciroKDV = this.hesaplaKDV(yillikCiro, KdvOrani.ORAN_20).kdv;

    // Çalışan başına ortalama SGK primi (işveren payı)
    const ortalamaBrutMaas = maaslar / calisanSayisi / 12;
    const isverenPrimi = this.hesaplaSGKIsverenPrimi(ortalamaBrutMaas);
    const yillikSGKMaliyeti = isverenPrimi.isverenPrimleri.toplam * 12 * calisanSayisi;

    const toplamVergiYuku = gelirVergisi + kurumVergi + yillikSGKMaliyeti;

    return {
      firma: {
        tip,
        yillikCiro,
        giderler,
        maaslar,
        calisanSayisi,
        netKazanc: Math.round(netKazanc * 100) / 100,
      },
      vergiler: {
        gelirVergisi: Math.round(gelirVergisi * 100) / 100,
        kurumlarVergisi: Math.round(kurumVergi * 100) / 100,
        sgkIsverenPayi: Math.round(yillikSGKMaliyeti * 100) / 100,
        toplamVergiYuku: Math.round(toplamVergiYuku * 100) / 100,
      },
      oranlar: {
        vergiYukuOrani: Math.round((toplamVergiYuku / yillikCiro) * 10000) / 100,
        netKarOrani: Math.round(((netKazanc - gelirVergisi - kurumVergi) / yillikCiro) * 10000) / 100,
      },
    };
  }
}
