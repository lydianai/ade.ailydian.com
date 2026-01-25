import { create } from 'zustand'
import { authApi } from '../lib/api-client'

interface User {
  id: string
  email: string
  ad: string
  soyad: string
  rol: string
  telefon?: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null

  // Actions
  girisYap: (email: string, sifre: string) => Promise<void>
  demoGiris: () => void
  kayitOl: (data: {
    email: string
    sifre: string
    ad: string
    soyad: string
    telefon?: string
    rol?: string
  }) => Promise<void>
  cikisYap: () => Promise<void>
  profilYukle: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,

  girisYap: async (email: string, sifre: string) => {
    set({ loading: true, error: null })
    try {
      const { data } = await authApi.girisYap({ email, sifre })

      // Backend returns Turkish field names: kullanici, mesaj
      const user = data.kullanici || data.user
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      set({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      })
    } catch (err: any) {
      const errorMessage = err.response?.data?.mesaj || err.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
      set({
        loading: false,
        error: errorMessage,
        isAuthenticated: false,
      })
      throw new Error(errorMessage)
    }
  },

  demoGiris: () => {
    if (import.meta.env.DEV) {
      console.log('🔐 demoGiris() called')
    }

    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@ade.gov.tr',
      ad: 'Demo',
      soyad: 'Kullanıcı',
      rol: 'demo',
      telefon: '+90 555 000 0000',
    }

    const demoToken = 'demo-token-' + Date.now()

    if (import.meta.env.DEV) {
      console.log('💾 Saving to localStorage (dev only)')
    }

    localStorage.setItem('accessToken', demoToken)
    localStorage.setItem('refreshToken', demoToken)
    localStorage.setItem('user', JSON.stringify(demoUser))
    localStorage.setItem('demoMode', 'true')

    set({
      user: demoUser,
      accessToken: demoToken,
      refreshToken: demoToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    })

    if (import.meta.env.DEV) {
      console.log('✅ demoGiris() complete')
    }
  },

  kayitOl: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await authApi.kayitOl(data)

      // Backend returns Turkish field names: kullanici, mesaj
      const user = response.data.kullanici || response.data.user
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      set({
        user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      })
    } catch (err: any) {
      const errorMessage = err.response?.data?.mesaj || err.response?.data?.message || 'Kayıt olurken bir hata oluştu'
      set({
        loading: false,
        error: errorMessage,
        isAuthenticated: false,
      })
      throw new Error(errorMessage)
    }
  },

  cikisYap: async () => {
    set({ loading: true })
    try {
      await authApi.cikisYap()
    } catch (err) {
      console.error('Çıkış yapılırken hata:', err)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      })
    }
  },

  profilYukle: async () => {
    set({ loading: true })
    try {
      const { data } = await authApi.profil()
      set({
        user: data,
        loading: false,
        error: null,
      })
    } catch (err: any) {
      console.error('Profil yüklenirken hata:', err)
      set({ loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
