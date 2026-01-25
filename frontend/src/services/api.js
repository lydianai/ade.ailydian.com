import axios from 'axios';
import { useAuthStore } from '../contexts/useAuthStore';
// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor - Add auth token
apiClient.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor - Handle token refresh
apiClient.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    // If 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { refreshToken } = useAuthStore.getState();
            if (refreshToken) {
                // Try to refresh token
                const response = await axios.post(`${API_BASE_URL}/v1/auth/token-yenile`, {
                    refreshToken,
                });
                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;
                // Update tokens in store
                useAuthStore.setState({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                });
                // Update localStorage
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            }
        }
        catch (refreshError) {
            // Refresh failed, logout user
            useAuthStore.getState().cikisYap();
            window.location.href = '/giris-yap';
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
export default apiClient;
