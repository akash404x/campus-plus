import { 
  getToken, 
  onMessage, 
  deleteToken, 
  Messaging, 
  MessagePayload 
} from 'firebase/messaging'
import { messaging } from '@/lib/firebase'

export class MessagingService {
  private messaging: Messaging | null

  constructor() {
    this.messaging = messaging || null
  }

  async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  async getToken(): Promise<string | null> {
    try {
      if (!this.messaging) {
        console.warn('Firebase messaging is not supported')
        return null
      }

      const token = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      })
      
      return token
    } catch (error) {
      console.error('Error getting FCM token:', error)
      return null
    }
  }

  async deleteToken(): Promise<void> {
    try {
      if (!this.messaging) {
        console.warn('Firebase messaging is not supported')
        return
      }

      await deleteToken(this.messaging)
    } catch (error) {
      console.error('Error deleting FCM token:', error)
      throw error
    }
  }

  onMessage(callback: (payload: MessagePayload) => void): () => void {
    if (!this.messaging) {
      console.warn('Firebase messaging is not supported')
      return () => {}
    }

    return onMessage(this.messaging, callback)
  }

  async sendNotificationToUser(
    userId: string, 
    title: string, 
    body: string, 
    data?: Record<string, any>
  ): Promise<void> {
    // This would typically call a Cloud Function or backend API
    // For now, we'll implement a placeholder
    console.log('Sending notification to user:', userId, {
      title,
      body,
      data
    })
    
    // In production, this would be:
    // await fetch('/api/notifications/send', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, title, body, data })
    // })
  }

  async sendNotificationToTopic(
    topic: string, 
    title: string, 
    body: string, 
    data?: Record<string, any>
  ): Promise<void> {
    // This would typically call a Cloud Function or backend API
    console.log('Sending notification to topic:', topic, {
      title,
      body,
      data
    })
  }

  async subscribeToTopic(topic: string): Promise<void> {
    try {
      const token = await this.getToken()
      if (token) {
        // This would typically call a Cloud Function or backend API
        console.log('Subscribing to topic:', topic)
      }
    } catch (error) {
      console.error('Error subscribing to topic:', error)
      throw error
    }
  }

  async unsubscribeFromTopic(topic: string): Promise<void> {
    try {
      const token = await this.getToken()
      if (token) {
        // This would typically call a Cloud Function or backend API
        console.log('Unsubscribing from topic:', topic)
      }
    } catch (error) {
      console.error('Error unsubscribing from topic:', error)
      throw error
    }
  }

  // Helper methods for different notification types
  async sendEventNotification(
    userId: string, 
    eventId: string, 
    eventTitle: string, 
    type: 'reminder' | 'update' | 'cancelled'
  ): Promise<void> {
    const titles = {
      reminder: `Event Reminder: ${eventTitle}`,
      update: `Event Update: ${eventTitle}`,
      cancelled: `Event Cancelled: ${eventTitle}`
    }
    
    const bodies = {
      reminder: 'This event is starting soon!',
      update: 'There has been an update to this event.',
      cancelled: 'This event has been cancelled.'
    }

    await this.sendNotificationToUser(userId, titles[type], bodies[type], {
      type: 'event',
      eventId
    })
  }

  async sendClubNotification(
    userId: string, 
    clubId: string, 
    clubName: string, 
    type: 'invite' | 'update' | 'announcement'
  ): Promise<void> {
    const titles = {
      invite: `Club Invitation: ${clubName}`,
      update: `Club Update: ${clubName}`,
      announcement: `Club Announcement: ${clubName}`
    }
    
    const bodies = {
      invite: 'You have been invited to join this club.',
      update: 'There has been an update to this club.',
      announcement: 'New announcement from this club.'
    }

    await this.sendNotificationToUser(userId, titles[type], bodies[type], {
      type: 'club',
      clubId
    })
  }

  async sendAchievementNotification(
    userId: string, 
    achievementTitle: string
  ): Promise<void> {
    await this.sendNotificationToUser(
      userId, 
      'Achievement Unlocked!', 
      `Congratulations! You earned: ${achievementTitle}`,
      {
        type: 'achievement'
      }
    )
  }

  async sendCertificateNotification(
    userId: string, 
    certificateTitle: string
  ): Promise<void> {
    await this.sendNotificationToUser(
      userId, 
      'New Certificate!', 
      `You have been awarded: ${certificateTitle}`,
      {
        type: 'certificate'
      }
    )
  }

  async sendChatNotification(
    userId: string, 
    senderName: string, 
    message: string, 
    conversationId: string
  ): Promise<void> {
    await this.sendNotificationToUser(
      userId, 
      `New message from ${senderName}`, 
      message.substring(0, 100),
      {
        type: 'message',
        conversationId
      }
    )
  }

  async sendVolunteerNotification(
    userId: string, 
    hours: number, 
    organizationName: string
  ): Promise<void> {
    await this.sendNotificationToUser(
      userId, 
      'Volunteer Hours Verified!', 
      `${hours} hours have been verified by ${organizationName}`,
      {
        type: 'volunteer'
      }
    )
  }
}

export const messagingService = new MessagingService()
