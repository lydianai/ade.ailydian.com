import apiClient from './client';

export interface KayitDto {
  email: string;
  sifre: string;
  ad: string;
  soyad: string;
  telefon?: string;
  rol?: 'ESNAF' | 'KOBI' | 'VATANDAS' | 'KAMU';
}

export interface GirisDto {
  email: string;
  sifre: string;
}

export interface AuthResponse {
  mesaj: string;
  kullanici: {
    id: string;
    email: string;
    ad: string;
    soyad: string;
    rol: string;
    isletmeAdi?: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  // Kayıt ol
  kayitOl: async (data: KayitDto): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/kayit-ol', data);
    return response.data;
  },

  // Giriş yap
  girisYap: async (data: GirisDto): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/giris-yap', data);
    return response.data;
  },

  // Çıkış yap
  cikisYap: async (): Promise<void> => {
    await apiClient.post('/auth/cikis-yap');
  },

  // Profil bilgisi al
  profil: async () => {
    const response = await apiClient.get('/auth/profil');
    return response.data.kullanici;
  },
};
