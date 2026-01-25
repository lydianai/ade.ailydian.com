import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '../contexts/useAuthStore'
import { useNotificationStore } from '../contexts/useNotificationStore'

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000'

export function useWebSocket() {
  const { accessToken } = useAuthStore()
  const { addNotification } = useNotificationStore()
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  useEffect(() => {
    if (!accessToken) {
      // Not authenticated, don't connect
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
      return
    }

    // Connect to WebSocket
    const socket = io(`${WEBSOCKET_URL}/ws`, {
      auth: {
        token: accessToken,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    // Connection successful
    socket.on('connect', () => {
      console.log('✅ WebSocket connected:', socket.id)
      setIsConnected(true)
      setConnectionError(null)

      // Subscribe to notifications
      socket.emit('notifications:subscribe')
      socket.emit('invoices:subscribe', {})
      socket.emit('payments:subscribe', {})
    })

    // Connection successful message from server
    socket.on('connection:success', (data) => {
      console.log('✅ WebSocket connection confirmed:', data)
    })

    // Connection error
    socket.on('connection:error', (error) => {
      console.error('❌ WebSocket connection error:', error)
      setConnectionError(error.message || 'Connection failed')
      setIsConnected(false)
    })

    // Disconnected
    socket.on('disconnect', (reason) => {
      console.log('⚠️ WebSocket disconnected:', reason)
      setIsConnected(false)
    })

    // Reconnecting
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`🔄 WebSocket reconnection attempt ${attemptNumber}...`)
    })

    // Reconnected
    socket.on('reconnect', (attemptNumber) => {
      console.log(`✅ WebSocket reconnected after ${attemptNumber} attempts`)
      setIsConnected(true)
      setConnectionError(null)

      // Re-subscribe
      socket.emit('notifications:subscribe')
      socket.emit('invoices:subscribe', {})
      socket.emit('payments:subscribe', {})
    })

    // Failed to reconnect
    socket.on('reconnect_failed', () => {
      console.error('❌ WebSocket reconnection failed')
      setConnectionError('Failed to reconnect to server')
    })

    // ==========================================
    // Event Listeners for Real-time Updates
    // ==========================================

    // New notification
    socket.on('notification:new', (notification) => {
      console.log('🔔 New notification received:', notification)
      addNotification({
        type: notification.type,
        title: notification.title,
        message: notification.message,
        actionUrl: notification.actionUrl,
        actionLabel: notification.actionLabel,
      })
    })

    // Invoice update
    socket.on('invoice:update', (update) => {
      console.log('📄 Invoice update:', update)
      // Can be handled by invoice-specific pages
    })

    // Invoice created
    socket.on('invoice:created', (invoice) => {
      console.log('📄 Invoice created:', invoice)
      addNotification({
        type: 'success',
        title: 'Fatura Oluşturuldu',
        message: `${invoice.invoiceNo} nolu fatura oluşturuldu.`,
        actionUrl: '/panel/faturalar',
        actionLabel: 'Görüntüle',
      })
    })

    // Payment update
    socket.on('payment:update', (update) => {
      console.log('💰 Payment update:', update)
      // Can be handled by payment-specific pages
    })

    // Payment received
    socket.on('payment:received', (payment) => {
      console.log('💰 Payment received:', payment)
      addNotification({
        type: 'success',
        title: 'Ödeme Alındı',
        message: `${payment.customerName} için ₺${payment.amount.toLocaleString('tr-TR')} ödeme tahsil edildi.`,
        actionUrl: '/panel/odemeler',
        actionLabel: 'Görüntüle',
      })
    })

    // Tax reminder
    socket.on('tax:reminder', (reminder) => {
      console.log('📝 Tax reminder:', reminder)
      addNotification({
        type: reminder.daysLeft <= 3 ? 'error' : reminder.daysLeft <= 7 ? 'warning' : 'info',
        title: 'Vergi Beyanı Hatırlatması',
        message: `${reminder.taxType} beyanınız ${reminder.daysLeft} gün içinde son bulacak.`,
        actionUrl: '/panel/vergi',
        actionLabel: 'Beyan Et',
      })
    })

    // GİB status update
    socket.on('gib:status', (update) => {
      console.log('🏛️ GİB status update:', update)
      addNotification({
        type: update.status === 'success' ? 'success' : 'error',
        title: update.status === 'success' ? 'GİB İşlemi Başarılı' : 'GİB İşlemi Başarısız',
        message: update.message,
        actionUrl: '/panel/entegrasyonlar',
        actionLabel: 'Detayları Gör',
      })
    })

    // Connection status
    socket.on('connection:status', (status) => {
      console.log('🔌 Connection status:', status)
    })

    // Cleanup
    return () => {
      console.log('🔌 Disconnecting WebSocket...')
      socket.off('connect')
      socket.off('disconnect')
      socket.off('connection:success')
      socket.off('connection:error')
      socket.off('reconnect')
      socket.off('reconnect_attempt')
      socket.off('reconnect_failed')
      socket.off('notification:new')
      socket.off('invoice:update')
      socket.off('invoice:created')
      socket.off('payment:update')
      socket.off('payment:received')
      socket.off('tax:reminder')
      socket.off('gib:status')
      socket.off('connection:status')
      socket.disconnect()
      socketRef.current = null
    }
  }, [accessToken, addNotification])

  // Ping server to check connection
  const ping = () => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('ping')
    }
  }

  // Subscribe to specific invoice
  const subscribeToInvoice = (invoiceId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('invoices:subscribe', { invoiceId })
    }
  }

  // Subscribe to specific payment
  const subscribeToPayment = (paymentId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('payments:subscribe', { paymentId })
    }
  }

  return {
    isConnected,
    connectionError,
    socket: socketRef.current,
    ping,
    subscribeToInvoice,
    subscribeToPayment,
  }
}
