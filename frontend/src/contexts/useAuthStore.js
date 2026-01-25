import { create } from 'zustand';
import { authApi } from '../lib/api-client';
export const useAuthStore = create((set) => ({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,
    girisYap: async (email, sifre) => {
        set({ loading: true, error: null });
        try {
            const { data } = await authApi.girisYap({ email, sifre });
            // Backend returns Turkish field names: kullanici, mesaj
            const user = data.kullanici || data.user;
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            set({
                user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                isAuthenticated: true,
                loading: false,
                error: null,
            });
        }
        catch (err) {
            const errorMessage = err.response?.data?.mesaj || err.response?.data?.message || 'Giriş yapılırken bir hata oluştu';
            set({
                loading: false,
                error: errorMessage,
                isAuthenticated: false,
            });
            throw new Error(errorMessage);
        }
    },
    kayitOl: async (data) => {
        set({ loading: true, error: null });
        try {
            const response = await authApi.kayitOl(data);
            // Backend returns Turkish field names: kullanici, mesaj
            const user = response.data.kullanici || response.data.user;
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            set({
                user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                isAuthenticated: true,
                loading: false,
                error: null,
            });
        }
        catch (err) {
            const errorMessage = err.response?.data?.mesaj || err.response?.data?.message || 'Kayıt olurken bir hata oluştu';
            set({
                loading: false,
                error: errorMessage,
                isAuthenticated: false,
            });
            throw new Error(errorMessage);
        }
    },
    cikisYap: async () => {
        set({ loading: true });
        try {
            await authApi.cikisYap();
        }
        catch (err) {
            console.error('Çıkış yapılırken hata:', err);
        }
        finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            set({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            });
        }
    },
    profilYukle: async () => {
        set({ loading: true });
        try {
            const { data } = await authApi.profil();
            set({
                user: data,
                loading: false,
                error: null,
            });
        }
        catch (err) {
            console.error('Profil yüklenirken hata:', err);
            set({ loading: false });
        }
    },
    clearError: () => set({ error: null }),
}));
