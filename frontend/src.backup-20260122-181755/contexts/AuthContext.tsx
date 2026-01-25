import { create } from 'zustand';
import { authApi, type KayitDto, type GirisDto } from '../api/auth';

interface Kullanici {
  id: string;
  email: string;
  ad: string;
  soyad: string;
  rol: string;
  isletmeAdi?: string;
}

interface AuthStore {
  kullanici: Kullanici | null;
  yukleniyor: boolean;
  hata: string | null;

  // Actions
  kayitOl: (data: KayitDto) => Promise<void>;
  girisYap: (data: GirisDto) => Promise<void>;
  cikisYap: () => Promise<void>;
  profilYukle: () => Promise<void>;
  hatayiTemizle: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  kullanici: null,
  yukleniyor: false,
  hata: null,

  kayitOl: async (data: KayitDto) => {
    try {
      set({ yukleniyor: true, hata: null });
      const response = await authApi.kayitOl(data);

      // Token'ları kaydet
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      set({ kullanici: response.kullanici, yukleniyor: false });
    } catch (error: any) {
      const mesaj = error.response?.data?.message || 'Kayıt başarısız oldu';
      set({ hata: mesaj, yukleniyor: false });
      throw error;
    }
  },

  girisYap: async (data: GirisDto) => {
    try {
      set({ yukleniyor: true, hata: null });
      const response = await authApi.girisYap(data);

      // Token'ları kaydet
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      set({ kullanici: response.kullanici, yukleniyor: false });
    } catch (error: any) {
      const mesaj = error.response?.data?.message || 'Giriş başarısız oldu';
      set({ hata: mesaj, yukleniyor: false });
      throw error;
    }
  },

  cikisYap: async () => {
    try {
      await authApi.cikisYap();
    } catch (error) {
      console.error('Çıkış hatası:', error);
    } finally {
      // Token'ları temizle
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ kullanici: null });
    }
  },

  profilYukle: async () => {
    try {
      set({ yukleniyor: true });
      const kullanici = await authApi.profil();
      set({ kullanici, yukleniyor: false });
    } catch (error) {
      set({ yukleniyor: false });
      // Token geçersiz, çıkış yap
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  hatayiTemizle: () => set({ hata: null }),
}));
