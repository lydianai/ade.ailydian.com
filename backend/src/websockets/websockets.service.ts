import { Injectable, Logger } from '@nestjs/common'
import { WebSocketsGateway } from './websockets.gateway'

export interface NotificationPayload {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  actionUrl?: string
  actionLabel?: string
  data?: any
}

/**
 * WebSocket Service for managing real-time communications
 */
@Injectable()
export class WebSocketsService {
  private readonly logger = new Logger(WebSocketsService.name)

  constructor(private websocketsGateway: WebSocketsGateway) {}

  /**
   * Send notification to a specific user
   */
  async sendNotification(userId: string, notification: NotificationPayload) {
    try {
      const payload = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...notification,
        timestamp: new Date().toISOString(),
        read: false,
      }

      this.websocketsGateway.sendNotificationToUser(userId, payload)
      this.logger.log(`Sent notification to user ${userId}: ${notification.title}`)
    } catch (error) {
      this.logger.error(`Error sending notification to user ${userId}:`, error.message)
    }
  }

  /**
   * Broadcast system-wide notification
   */
  async broadcastSystemNotification(notification: NotificationPayload) {
    try {
      const payload = {
        id: `sys-notif-${Date.now()}`,
        ...notification,
        timestamp: new Date().toISOString(),
        read: false,
      }

      this.websocketsGateway.broadcastNotification(payload)
      this.logger.log(`Broadcasted system notification: ${notification.title}`)
    } catch (error) {
      this.logger.error('Error broadcasting system notification:', error.message)
    }
  }

  /**
   * Notify user about invoice status change
   */
  async notifyInvoiceStatusChange(userId: string, invoiceId: string, status: string, invoiceNo: string) {
    const statusMessages = {
      SENT: { type: 'info' as const, title: 'Fatura Gönderildi', message: `${invoiceNo} nolu fatura GİB'e gönderildi.` },
      ACCEPTED: { type: 'success' as const, title: 'Fatura Onaylandı', message: `${invoiceNo} nolu fatura GİB tarafından onaylandı.` },
      REJECTED: { type: 'error' as const, title: 'Fatura Reddedildi', message: `${invoiceNo} nolu fatura GİB tarafından reddedildi.` },
      PAID: { type: 'success' as const, title: 'Fatura Ödendi', message: `${invoiceNo} nolu fatura ödeme aldı.` },
      CANCELLED: { type: 'warning' as const, title: 'Fatura İptal Edildi', message: `${invoiceNo} nolu fatura iptal edildi.` },
    }

    const notificationData = statusMessages[status] || {
      type: 'info' as const,
      title: 'Fatura Durumu Değişti',
      message: `${invoiceNo} nolu fatura durumu: ${status}`,
    }

    await this.sendNotification(userId, {
      ...notificationData,
      actionUrl: '/panel/faturalar',
      actionLabel: 'Görüntüle',
      data: { invoiceId, invoiceNo, status },
    })

    // Also send invoice-specific update
    this.websocketsGateway.sendInvoiceUpdate(invoiceId, {
      invoiceId,
      invoiceNo,
      status,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Notify user about payment received
   */
  async notifyPaymentReceived(userId: string, paymentId: string, amount: number, customerName: string) {
    await this.sendNotification(userId, {
      type: 'success',
      title: 'Ödeme Alındı',
      message: `${customerName} için ₺${amount.toLocaleString('tr-TR')} ödeme tahsil edildi.`,
      actionUrl: '/panel/odemeler',
      actionLabel: 'Görüntüle',
      data: { paymentId, amount, customerName },
    })

    this.websocketsGateway.sendPaymentReceived(userId, {
      paymentId,
      amount,
      customerName,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Notify user about payment status change
   */
  async notifyPaymentStatusChange(userId: string, paymentId: string, status: string, amount: number) {
    const statusMessages = {
      COMPLETED: { type: 'success' as const, title: 'Ödeme Tamamlandı', message: `₺${amount.toLocaleString('tr-TR')} ödeme başarıyla tamamlandı.` },
      FAILED: { type: 'error' as const, title: 'Ödeme Başarısız', message: `₺${amount.toLocaleString('tr-TR')} ödeme işlemi başarısız oldu.` },
      REFUNDED: { type: 'info' as const, title: 'Ödeme İade Edildi', message: `₺${amount.toLocaleString('tr-TR')} ödeme iade edildi.` },
      CANCELLED: { type: 'warning' as const, title: 'Ödeme İptal Edildi', message: `₺${amount.toLocaleString('tr-TR')} ödeme iptal edildi.` },
    }

    const notificationData = statusMessages[status] || {
      type: 'info' as const,
      title: 'Ödeme Durumu Değişti',
      message: `₺${amount.toLocaleString('tr-TR')} ödeme durumu: ${status}`,
    }

    await this.sendNotification(userId, {
      ...notificationData,
      actionUrl: '/panel/odemeler',
      actionLabel: 'Görüntüle',
      data: { paymentId, status, amount },
    })

    this.websocketsGateway.sendPaymentUpdate(paymentId, {
      paymentId,
      status,
      amount,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Notify user about tax deadline
   */
  async notifyTaxDeadline(userId: string, taxType: string, dueDate: string, daysLeft: number) {
    const urgency = daysLeft <= 3 ? 'error' : daysLeft <= 7 ? 'warning' : 'info'

    await this.sendNotification(userId, {
      type: urgency,
      title: 'Vergi Beyanı Hatırlatması',
      message: `${taxType} beyanınız ${daysLeft} gün içinde son bulacak (${new Date(dueDate).toLocaleDateString('tr-TR')}).`,
      actionUrl: '/panel/vergi',
      actionLabel: 'Beyan Et',
      data: { taxType, dueDate, daysLeft },
    })

    this.websocketsGateway.sendTaxDeadlineReminder(userId, {
      taxType,
      dueDate,
      daysLeft,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Notify user about GİB integration status
   */
  async notifyGibStatus(userId: string, status: 'success' | 'error', message: string, reference?: string) {
    await this.sendNotification(userId, {
      type: status === 'success' ? 'success' : 'error',
      title: status === 'success' ? 'GİB İşlemi Başarılı' : 'GİB İşlemi Başarısız',
      message,
      actionUrl: '/panel/entegrasyonlar',
      actionLabel: 'Detayları Gör',
      data: { status, reference },
    })

    this.websocketsGateway.sendGibStatusUpdate(userId, {
      status,
      message,
      reference,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Notify user about new customer
   */
  async notifyNewCustomer(userId: string, customerName: string, customerId: string) {
    await this.sendNotification(userId, {
      type: 'info',
      title: 'Yeni Müşteri Eklendi',
      message: `${customerName} sisteme eklendi.`,
      actionUrl: '/panel/musteriler',
      actionLabel: 'Görüntüle',
      data: { customerId, customerName },
    })
  }

  /**
   * Get WebSocket connection statistics
   */
  getConnectionStats() {
    return {
      connectedUsers: this.websocketsGateway.getConnectedUsersCount(),
      connectedUserIds: this.websocketsGateway.getConnectedUserIds(),
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Check if user is online
   */
  isUserOnline(userId: string): boolean {
    return this.websocketsGateway.isUserConnected(userId)
  }
}
