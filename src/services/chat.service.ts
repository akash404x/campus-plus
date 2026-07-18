import { FirestoreRepository } from '@/repositories/firestore.repository'
import { ChatMessage, ChatConversation, QueryCondition } from '@/types/firestore'

export class ChatService {
  private messageRepository: FirestoreRepository<ChatMessage>
  private conversationRepository: FirestoreRepository<ChatConversation>

  constructor() {
    this.messageRepository = new FirestoreRepository<ChatMessage>('messages')
    this.conversationRepository = new FirestoreRepository<ChatConversation>('conversations')
  }

  // Message Methods
  async getMessageById(id: string): Promise<ChatMessage | null> {
    return this.messageRepository.findById(id)
  }

  async getAllMessages(options?: any): Promise<ChatMessage[]> {
    return this.messageRepository.findAll(options)
  }

  async createMessage(messageData: Omit<ChatMessage, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatMessage> {
    return this.messageRepository.create(messageData)
  }

  async updateMessage(id: string, messageData: Partial<ChatMessage>): Promise<ChatMessage> {
    return this.messageRepository.update(id, messageData)
  }

  async deleteMessage(id: string): Promise<void> {
    return this.messageRepository.delete(id)
  }

  async getConversationMessages(conversationId: string): Promise<ChatMessage[]> {
    const conditions: QueryCondition[] = [
      { field: 'conversationId', operator: '==', value: conversationId }
    ]
    return this.messageRepository.findAll({
      conditions,
      orderBy: { field: 'createdAt', direction: 'asc' }
    })
  }

  async markMessageAsRead(id: string): Promise<void> {
    await this.updateMessage(id, { 
      isRead: true,
      readAt: new Date()
    })
  }

  async markConversationMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    const messages = await this.getConversationMessages(conversationId)
    await Promise.all(
      messages
        .filter(msg => msg.senderId !== userId && !msg.isRead)
        .map(msg => this.markMessageAsRead(msg.id))
    )
  }

  // Conversation Methods
  async getConversationById(id: string): Promise<ChatConversation | null> {
    return this.conversationRepository.findById(id)
  }

  async getAllConversations(options?: any): Promise<ChatConversation[]> {
    return this.conversationRepository.findAll(options)
  }

  async createConversation(conversationData: Omit<ChatConversation, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatConversation> {
    return this.conversationRepository.create(conversationData)
  }

  async updateConversation(id: string, conversationData: Partial<ChatConversation>): Promise<ChatConversation> {
    return this.conversationRepository.update(id, conversationData)
  }

  async deleteConversation(id: string): Promise<void> {
    return this.conversationRepository.delete(id)
  }

  async getUserConversations(userId: string): Promise<ChatConversation[]> {
    const conditions: QueryCondition[] = [
      { field: 'participants', operator: 'array-contains', value: userId }
    ]
    return this.conversationRepository.findAll({
      conditions,
      orderBy: { field: 'updatedAt', direction: 'desc' }
    })
  }

  async getDirectConversation(userId1: string, userId2: string): Promise<ChatConversation | null> {
    const conversations = await this.getUserConversations(userId1)
    return conversations.find(conv => 
      conv.type === 'direct' && 
      conv.participants.includes(userId2) &&
      conv.participants.length === 2
    ) || null
  }

  async getGroupConversations(userId: string): Promise<ChatConversation[]> {
    const conditions: QueryCondition[] = [
      { field: 'participants', operator: 'array-contains', value: userId },
      { field: 'type', operator: '==', value: 'group' }
    ]
    return this.conversationRepository.query(conditions)
  }

  async createDirectConversation(userId1: string, userId2: string): Promise<ChatConversation> {
    const conversationData: Omit<ChatConversation, 'id' | 'createdAt' | 'updatedAt'> = {
      participants: [userId1, userId2],
      participantNames: [], // Would need to fetch user names
      participantPhotos: [], // Would need to fetch user photos
      type: 'direct',
      unreadCount: 0,
      isArchived: false
    }
    return this.createConversation(conversationData)
  }

  async updateLastMessage(conversationId: string, content: string, senderId: string): Promise<void> {
    await this.updateConversation(conversationId, {
      lastMessage: {
        content,
        senderId,
        createdAt: new Date()
      },
      updatedAt: new Date()
    })
  }

  async incrementUnreadCount(conversationId: string, userId: string): Promise<void> {
    const conversation = await this.getConversationById(conversationId)
    if (conversation && conversation.lastMessage?.senderId !== userId) {
      await this.updateConversation(conversationId, {
        unreadCount: conversation.unreadCount + 1
      })
    }
  }

  async resetUnreadCount(conversationId: string): Promise<void> {
    await this.updateConversation(conversationId, { unreadCount: 0 })
  }

  async archiveConversation(id: string): Promise<void> {
    await this.updateConversation(id, { isArchived: true })
  }

  async unarchiveConversation(id: string): Promise<void> {
    await this.updateConversation(id, { isArchived: false })
  }

  // Realtime Listeners
  onMessagesSnapshot(conversationId: string, callback: (messages: ChatMessage[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'conversationId', operator: '==', value: conversationId }
    ]
    return this.messageRepository.onSnapshot(callback)
  }

  onMessageSnapshot(id: string, callback: (message: ChatMessage | null) => void): () => void {
    return this.messageRepository.onDocumentSnapshot(id, callback)
  }

  onConversationsSnapshot(userId: string, callback: (conversations: ChatConversation[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'participants', operator: 'array-contains', value: userId }
    ]
    return this.conversationRepository.onSnapshot(callback)
  }

  onConversationSnapshot(id: string, callback: (conversation: ChatConversation | null) => void): () => void {
    return this.conversationRepository.onDocumentSnapshot(id, callback)
  }
}

export const chatService = new ChatService()
