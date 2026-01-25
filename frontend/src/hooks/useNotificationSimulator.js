import { useEffect } from 'react';
import { useNotificationStore } from '../contexts/useNotificationStore';
// Simulates real-time notifications for demo purposes
// In production, this would be replaced with WebSocket or Server-Sent Events
export function useNotificationSimulator() {
    const { addNotification } = useNotificationStore();
    useEffect(() => {
        // Demo: Add sample notifications after 5 seconds
        const timer = setTimeout(() => {
            addNotification({
                type: 'success',
                title: 'Fatura Onaylandı',
                message: 'ABC Teknoloji A.Ş. için kesilen #FAT-2026-001 nolu fatura GİB tarafından onaylandı.',
                actionUrl: '/panel/faturalar',
                actionLabel: 'Görüntüle',
            });
        }, 5000);
        const timer2 = setTimeout(() => {
            addNotification({
                type: 'warning',
                title: 'Ödeme Vadesi Yaklaşıyor',
                message: 'XYZ Ltd. Şti. için 15,250 TL tutarındaki ödeme 3 gün sonra vadesi dolacak.',
                actionUrl: '/panel/odemeler',
                actionLabel: 'Ödemeleri Gör',
            });
        }, 10000);
        const timer3 = setTimeout(() => {
            addNotification({
                type: 'info',
                title: 'Yeni Entegrasyon Hazır',
                message: 'SGK entegrasyonu aktif! Artık prim bildirimleri otomatik yapılabilir.',
                actionUrl: '/panel/entegrasyonlar',
                actionLabel: 'Keşfet',
            });
        }, 15000);
        const timer4 = setTimeout(() => {
            addNotification({
                type: 'error',
                title: 'e-Fatura Gönderilemedi',
                message: 'DEF İnşaat için #FAT-2026-005 nolu fatura GİB sisteminde hata aldı. Lütfen kontrol edin.',
                actionUrl: '/panel/faturalar',
                actionLabel: 'Düzelt',
            });
        }, 20000);
        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [addNotification]);
}
