// Government notifications service for Bharat-ID Shield
export interface GovNotification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'urgent' | 'update'
  category: 'aadhaar' | 'digital-india' | 'security' | 'policy' | 'system'
  date: string
  isRead: boolean
  actionUrl?: string
  priority: 'high' | 'medium' | 'low'
  source: string
}

export class NotificationsService {
  private static readonly STORAGE_KEY = 'bharat-id-notifications'

  // Sample government notifications data
  private static readonly sampleNotifications: GovNotification[] = [
    {
      id: 'not-001',
      title: 'New Aadhaar Security Update Available',
      message: 'Enhanced biometric authentication features have been rolled out. Update your security preferences to enable advanced protection.',
      type: 'update',
      category: 'aadhaar',
      date: '2024-01-15T10:30:00Z',
      isRead: false,
      priority: 'high',
      source: 'UIDAI',
      actionUrl: '/security'
    },
    {
      id: 'not-002',
      title: 'Digital India Initiative: New Services',
      message: 'Access to 15+ new government services now available through your digital identity. Explore healthcare, education, and financial services.',
      type: 'info',
      category: 'digital-india',
      date: '2024-01-14T14:20:00Z',
      isRead: false,
      priority: 'medium',
      source: 'Ministry of Electronics & IT',
      actionUrl: '/services'
    },
    {
      id: 'not-003',
      title: 'Security Alert: Phishing Attempts Detected',
      message: 'We have detected increased phishing attempts targeting digital identity users. Never share your credentials via email or SMS.',
      type: 'warning',
      category: 'security',
      date: '2024-01-13T09:15:00Z',
      isRead: true,
      priority: 'high',
      source: 'Cyber Security Division',
      actionUrl: '/security-tips'
    },
    {
      id: 'not-004',
      title: 'Policy Update: Data Privacy Enhancement',
      message: 'New data privacy regulations are now in effect. Your personal data is now protected with additional encryption layers.',
      type: 'info',
      category: 'policy',
      date: '2024-01-12T16:45:00Z',
      isRead: true,
      priority: 'medium',
      source: 'Data Protection Authority',
    },
    {
      id: 'not-005',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance on Jan 20, 2024 from 2:00 AM to 4:00 AM IST. Some services may be temporarily unavailable.',
      type: 'info',
      category: 'system',
      date: '2024-01-11T11:00:00Z',
      isRead: false,
      priority: 'low',
      source: 'Technical Operations',
    },
    {
      id: 'not-006',
      title: 'Urgent: Verify Your Mobile Number',
      message: 'Your registered mobile number needs verification within 7 days to maintain account security. Click to verify now.',
      type: 'urgent',
      category: 'aadhaar',
      date: '2024-01-10T08:30:00Z',
      isRead: false,
      priority: 'high',
      source: 'UIDAI',
      actionUrl: '/verify-mobile'
    },
    {
      id: 'not-007',
      title: 'New Education Certificates Available',
      message: 'Digital education certificates from recognized institutions can now be added to your credential wallet.',
      type: 'info',
      category: 'digital-india',
      date: '2024-01-09T13:20:00Z',
      isRead: true,
      priority: 'medium',
      source: 'Ministry of Education',
      actionUrl: '/add-credential'
    }
  ]

  static getNotifications(): GovNotification[] {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse stored notifications:', error)
      }
    }
    
    // Initialize with sample data
    this.saveNotifications(this.sampleNotifications)
    return this.sampleNotifications
  }

  static saveNotifications(notifications: GovNotification[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications))
  }

  static markAsRead(notificationId: string): void {
    const notifications = this.getNotifications()
    const notification = notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.isRead = true
      this.saveNotifications(notifications)
    }
  }

  static markAllAsRead(): void {
    const notifications = this.getNotifications()
    notifications.forEach(n => n.isRead = true)
    this.saveNotifications(notifications)
  }

  static getUnreadCount(): number {
    return this.getNotifications().filter(n => !n.isRead).length
  }

  static getNotificationsByCategory(category: GovNotification['category']): GovNotification[] {
    return this.getNotifications().filter(n => n.category === category)
  }

  static getNotificationsByPriority(priority: GovNotification['priority']): GovNotification[] {
    return this.getNotifications().filter(n => n.priority === priority)
  }

  static deleteNotification(notificationId: string): void {
    const notifications = this.getNotifications().filter(n => n.id !== notificationId)
    this.saveNotifications(notifications)
  }

  static formatRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return 'Just now'
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  }

  static getNotificationIcon(type: GovNotification['type']): string {
    switch (type) {
      case 'info': return '📢'
      case 'warning': return '⚠️'
      case 'urgent': return '🚨'
      case 'update': return '🔄'
      default: return '📢'
    }
  }

  static getCategoryIcon(category: GovNotification['category']): string {
    switch (category) {
      case 'aadhaar': return '🆔'
      case 'digital-india': return '🇮🇳'
      case 'security': return '🔒'
      case 'policy': return '📋'
      case 'system': return '⚙️'
      default: return '📢'
    }
  }
}
