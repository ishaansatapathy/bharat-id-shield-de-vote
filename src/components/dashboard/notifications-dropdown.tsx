import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, X, ExternalLink, AlertTriangle, Info, RefreshCw, Zap } from "lucide-react"
import { NotificationsService, GovNotification } from "@/lib/notifications-service"
import { useTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<GovNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    const allNotifications = NotificationsService.getNotifications()
    setNotifications(allNotifications.slice(0, 10)) // Show latest 10
    setUnreadCount(NotificationsService.getUnreadCount())
  }

  const handleMarkAsRead = (notificationId: string) => {
    NotificationsService.markAsRead(notificationId)
    loadNotifications()
  }

  const handleMarkAllAsRead = () => {
    NotificationsService.markAllAsRead()
    loadNotifications()
  }

  const handleDeleteNotification = (notificationId: string) => {
    NotificationsService.deleteNotification(notificationId)
    loadNotifications()
  }

  const getNotificationIcon = (type: GovNotification['type']) => {
    switch (type) {
      case 'urgent':
        return <Zap className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'update':
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: GovNotification['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-300'
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-base font-semibold">
            🇮🇳 Government Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 border-l-4 hover:bg-accent/50 transition-colors",
                    getPriorityColor(notification.priority),
                    !notification.isRead && "bg-accent/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn(
                            "text-sm font-medium truncate",
                            !notification.isRead && "font-semibold"
                          )}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span>{NotificationsService.getCategoryIcon(notification.category)}</span>
                            <span>{notification.source}</span>
                          </div>
                          <span>{NotificationsService.formatRelativeTime(notification.date)}</span>
                        </div>
                        
                        {notification.actionUrl && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 mt-1 text-xs"
                            onClick={() => {
                              handleMarkAsRead(notification.id)
                              // In a real app, this would navigate to the URL
                              console.log('Navigate to:', notification.actionUrl)
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="w-full">
            View All Notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
