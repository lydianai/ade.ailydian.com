import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UseGuards, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

/**
 * WebSocket Gateway for Real-time Communications
 * - Notifications (invoices, payments, tax deadlines)
 * - Live updates (invoice status, payment status)
 * - Chat support
 * - System alerts
 */
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  },
  namespace: '/ws',
})
export class WebSocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger = new Logger(WebSocketsGateway.name)
  private connectedClients = new Map<string, { socket: Socket; userId: string }>()

  constructor(private jwtService: JwtService) {}

  /**
   * Handle new client connections
   */
  async handleConnection(client: Socket) {
    try {
      // Extract JWT token from handshake
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1]

      if (!token) {
        this.logger.warn(`Client ${client.id} attempted connection without token`)
        client.disconnect()
        return
      }

      // Verify JWT
      const payload = await this.jwtService.verifyAsync(token)
      const userId = payload.sub

      // Store connected client
      this.connectedClients.set(client.id, { socket: client, userId })

      // Join user's personal room
      client.join(`user:${userId}`)

      this.logger.log(`Client connected: ${client.id} (User: ${userId})`)
      this.logger.log(`Total connected clients: ${this.connectedClients.size}`)

      // Send welcome message
      client.emit('connection:success', {
        message: 'Successfully connected to ADE WebSocket',
        timestamp: new Date().toISOString(),
      })

      // Notify about connection status
      this.server.to(`user:${userId}`).emit('connection:status', {
        status: 'online',
        clientId: client.id,
      })
    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}:`, error.message)
      client.emit('connection:error', { message: 'Authentication failed' })
      client.disconnect()
    }
  }

  /**
   * Handle client disconnections
   */
  handleDisconnect(client: Socket) {
    const clientData = this.connectedClients.get(client.id)
    if (clientData) {
      this.logger.log(`Client disconnected: ${client.id} (User: ${clientData.userId})`)
      this.connectedClients.delete(client.id)
    }
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`)
  }

  /**
   * Subscribe to notifications
   */
  @SubscribeMessage('notifications:subscribe')
  handleSubscribeNotifications(@ConnectedSocket() client: Socket) {
    const clientData = this.connectedClients.get(client.id)
    if (clientData) {
      client.join(`notifications:${clientData.userId}`)
      return { status: 'subscribed', channel: 'notifications' }
    }
    return { status: 'error', message: 'Not authenticated' }
  }

  /**
   * Subscribe to invoice updates
   */
  @SubscribeMessage('invoices:subscribe')
  handleSubscribeInvoices(@ConnectedSocket() client: Socket, @MessageBody() data: { invoiceId?: string }) {
    const clientData = this.connectedClients.get(client.id)
    if (clientData) {
      if (data.invoiceId) {
        client.join(`invoice:${data.invoiceId}`)
        return { status: 'subscribed', channel: `invoice:${data.invoiceId}` }
      } else {
        client.join(`invoices:${clientData.userId}`)
        return { status: 'subscribed', channel: 'invoices' }
      }
    }
    return { status: 'error', message: 'Not authenticated' }
  }

  /**
   * Subscribe to payment updates
   */
  @SubscribeMessage('payments:subscribe')
  handleSubscribePayments(@ConnectedSocket() client: Socket, @MessageBody() data: { paymentId?: string }) {
    const clientData = this.connectedClients.get(client.id)
    if (clientData) {
      if (data.paymentId) {
        client.join(`payment:${data.paymentId}`)
        return { status: 'subscribed', channel: `payment:${data.paymentId}` }
      } else {
        client.join(`payments:${clientData.userId}`)
        return { status: 'subscribed', channel: 'payments' }
      }
    }
    return { status: 'error', message: 'Not authenticated' }
  }

  /**
   * Ping/Pong for connection health check
   */
  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    return { event: 'pong', data: { timestamp: new Date().toISOString() } }
  }

  // =====================================
  // Public methods for emitting events
  // =====================================

  /**
   * Send notification to a specific user
   */
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification:new', notification)
    this.logger.log(`Sent notification to user ${userId}: ${notification.title}`)
  }

  /**
   * Broadcast notification to all connected users
   */
  broadcastNotification(notification: any) {
    this.server.emit('notification:new', notification)
    this.logger.log(`Broadcasted notification: ${notification.title}`)
  }

  /**
   * Send invoice update
   */
  sendInvoiceUpdate(invoiceId: string, update: any) {
    this.server.to(`invoice:${invoiceId}`).emit('invoice:update', update)
    this.logger.log(`Sent invoice update for ${invoiceId}`)
  }

  /**
   * Send invoice created notification to user
   */
  sendInvoiceCreated(userId: string, invoice: any) {
    this.server.to(`user:${userId}`).emit('invoice:created', invoice)
    this.logger.log(`Sent invoice created to user ${userId}`)
  }

  /**
   * Send payment update
   */
  sendPaymentUpdate(paymentId: string, update: any) {
    this.server.to(`payment:${paymentId}`).emit('payment:update', update)
    this.logger.log(`Sent payment update for ${paymentId}`)
  }

  /**
   * Send payment received notification to user
   */
  sendPaymentReceived(userId: string, payment: any) {
    this.server.to(`user:${userId}`).emit('payment:received', payment)
    this.logger.log(`Sent payment received to user ${userId}`)
  }

  /**
   * Send tax deadline reminder
   */
  sendTaxDeadlineReminder(userId: string, reminder: any) {
    this.server.to(`user:${userId}`).emit('tax:reminder', reminder)
    this.logger.log(`Sent tax reminder to user ${userId}`)
  }

  /**
   * Send GİB status update (e-Fatura acceptance/rejection)
   */
  sendGibStatusUpdate(userId: string, update: any) {
    this.server.to(`user:${userId}`).emit('gib:status', update)
    this.logger.log(`Sent GİB status update to user ${userId}`)
  }

  /**
   * Get connected users count
   */
  getConnectedUsersCount(): number {
    return this.connectedClients.size
  }

  /**
   * Check if user is connected
   */
  isUserConnected(userId: string): boolean {
    for (const [_, clientData] of this.connectedClients) {
      if (clientData.userId === userId) {
        return true
      }
    }
    return false
  }

  /**
   * Get all connected user IDs
   */
  getConnectedUserIds(): string[] {
    const userIds = new Set<string>()
    for (const [_, clientData] of this.connectedClients) {
      userIds.add(clientData.userId)
    }
    return Array.from(userIds)
  }
}
