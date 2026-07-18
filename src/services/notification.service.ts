import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Notification, QueryCondition } from '@/types/firestore'

export class NotificationService {
  private repository: FirestoreRepository<Notification>

  constructor() {
    this.repository = new FirestoreRepository<Notification>('notifications')
  }

  async getNotificationById(id: string): Promise<Notification | null> {
    return this.repository.findById(id)
  }

  async getAllNotifications(options?: any): Promise<Notification[]> {
    return this.repository.findAll(options)
  }

  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>): Promise<Notification> {
    return this.repository.create(notificationData)
  }

  async updateNotification(id: string, notificationData: Partial<Notification>): Promise<Notification> {
    return this.repository.update(id, notificationData)
  }

  async deleteNotification(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.query(conditions)
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'read', operator: '==', value: false },
      { field: 'archived', operator: '==', value: false }
    ]
    return this.repository.query(conditions)
  }

  async getImportantNotifications(userId: string): Promise<Notification[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'important', operator: '==', value: true },
      { field: 'archived', operator: '==', value: false }
    ]
    return this.repository.query(conditions)
  }

  async getArchivedNotifications(userId: string): Promise<Notification[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'archived', operator: '==', value: true }
    ]
    return this.repository.query(conditions)
  }

  async getNotificationsByType(userId: string, type: Notification['type']): Promise<Notification[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'type', operator: '==', value: type }
    ]
    return this.repository.query(conditions)
  }

  async getNotificationsByCategory(userId: string, category: string): Promise<Notification[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'category', operator: '==', value: category }
    ]
    return this.repository.query(conditions)
  }

  async markAsRead(id: string): Promise<void> {
    await this.updateNotification(id, { read: true })
  }

  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.getUserNotifications(userId)
    await Promise.all(
      notifications.map(notification => 
        this.markAsRead(notification.id)
      )
    )
  }

  async markAsImportant(id: string): Promise<void> {
    await this.updateNotification(id, { important: true })
  }

  async archiveNotification(id: string): Promise<void> {
    await this.updateNotification(id, { archived: true })
  }

  async unarchiveNotification(id: string): Promise<void> {
    await this.updateNotification(id, { archived: false })
  }

  async getUnreadCount(userId: string): Promise<number> {
    const notifications = await this.getUnreadNotifications(userId)
    return notifications.length
  }

  onNotificationsSnapshot(userId: string, callback: (notifications: Notification[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    // Note: This would need to be implemented in the repository to support conditions in snapshots
    return this.repository.onSnapshot(callback)
  }

  onNotificationSnapshot(id: string, callback: (notification: Notification | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const notificationService = new NotificationService()
