import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  BellIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { useNotificationStore } from '../contexts/useNotificationStore'
import type { NotificationType } from '../contexts/useNotificationStore'

export default function NotificationCenter() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } =
    useNotificationStore()

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />
      case 'error':
        return <XMarkIcon className="w-5 h-5 text-red-400" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />
    }
  }

  const getColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'from-green-500/20 to-green-500/10 border-green-500/30'
      case 'error':
        return 'from-red-500/20 to-red-500/10 border-red-500/30'
      case 'warning':
        return 'from-amber-500/20 to-amber-500/10 border-amber-500/30'
      case 'info':
        return 'from-blue-500/20 to-blue-500/10 border-blue-500/30'
    }
  }

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id)
    if (notification.actionUrl) {
      navigate(notification.actionUrl)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
      >
        <BellIcon className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="glass-card overflow-hidden shadow-2xl"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 0.5rem)',
                width: 'min(calc(100vw - 2rem), 384px)',
                maxHeight: 'min(80vh, 600px)',
                zIndex: 9000,
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    Bildirimler {unreadCount > 0 && `(${unreadCount})`}
                  </h3>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <>
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                        >
                          Tümünü okundu işaretle
                        </button>
                        <button
                          onClick={clearAll}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          Temizle
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-[500px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <BellIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/60">Henüz bildirim yok</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 hover:bg-white/5 transition-colors cursor-pointer relative ${
                          !notification.read ? 'bg-white/5' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full" />
                        )}

                        <div className="flex gap-3 ml-2">
                          {/* Icon */}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${getColor(
                              notification.type
                            )} border flex-shrink-0`}
                          >
                            {getIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-white text-sm">
                                {notification.title}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                                className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                              >
                                <XMarkIcon className="w-4 h-4 text-white/60" />
                              </button>
                            </div>

                            <p className="text-sm text-white/60 mt-1 line-clamp-2">
                              {notification.message}
                            </p>

                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-white/40">
                                {new Date(notification.timestamp).toLocaleString('tr-TR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  day: '2-digit',
                                  month: 'short',
                                })}
                              </span>

                              {notification.actionLabel && (
                                <span className="text-xs text-teal-400 font-medium">
                                  {notification.actionLabel}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
