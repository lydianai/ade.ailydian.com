import { create } from 'zustand';
export const useNotificationStore = create((set) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (notification) => {
        const newNotification = {
            ...notification,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
            read: false,
        };
        set((state) => ({
            notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
            unreadCount: state.unreadCount + 1,
        }));
    },
    markAsRead: (id) => {
        set((state) => ({
            notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
            unreadCount: Math.max(0, state.unreadCount - 1),
        }));
    },
    markAllAsRead: () => {
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
            unreadCount: 0,
        }));
    },
    removeNotification: (id) => {
        set((state) => {
            const notification = state.notifications.find((n) => n.id === id);
            return {
                notifications: state.notifications.filter((n) => n.id !== id),
                unreadCount: notification && !notification.read
                    ? Math.max(0, state.unreadCount - 1)
                    : state.unreadCount,
            };
        });
    },
    clearAll: () => {
        set({
            notifications: [],
            unreadCount: 0,
        });
    },
}));
