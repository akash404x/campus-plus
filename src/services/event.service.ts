import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Event, QueryCondition } from '@/types/firestore'

export class EventService {
  private repository: FirestoreRepository<Event>

  constructor() {
    this.repository = new FirestoreRepository<Event>('events')
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.repository.findById(id)
  }

  async getAllEvents(options?: any): Promise<Event[]> {
    return this.repository.findAll(options)
  }

  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    return this.repository.create(eventData)
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    return this.repository.update(id, eventData)
  }

  async deleteEvent(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'organizerId', operator: '==', value: organizerId }
    ]
    return this.repository.query(conditions)
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'category', operator: '==', value: category }
    ]
    return this.repository.query(conditions)
  }

  async getFeaturedEvents(): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'isFeatured', operator: '==', value: true },
      { field: 'status', operator: '==', value: 'approved' }
    ]
    return this.repository.query(conditions)
  }

  async getTrendingEvents(): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'isTrending', operator: '==', value: true },
      { field: 'status', operator: '==', value: 'approved' }
    ]
    return this.repository.query(conditions)
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'date', operator: '>=', value: new Date() },
      { field: 'status', operator: '==', value: 'approved' }
    ]
    return this.repository.query(conditions)
  }

  async getEventsByStatus(status: Event['status']): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'status', operator: '==', value: status }
    ]
    return this.repository.query(conditions)
  }

  async searchEvents(searchTerm: string): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'title', operator: '>=', value: searchTerm },
      { field: 'title', operator: '<=', value: searchTerm + '\uf8ff' }
    ]
    return this.repository.query(conditions)
  }

  async getEventsByTag(tag: string): Promise<Event[]> {
    const conditions: QueryCondition[] = [
      { field: 'tags', operator: 'array-contains', value: tag }
    ]
    return this.repository.query(conditions)
  }

  async incrementRegisteredCount(eventId: string): Promise<void> {
    const event = await this.getEventById(eventId)
    if (event) {
      await this.updateEvent(eventId, {
        registeredCount: event.registeredCount + 1
      })
    }
  }

  async decrementRegisteredCount(eventId: string): Promise<void> {
    const event = await this.getEventById(eventId)
    if (event && event.registeredCount > 0) {
      await this.updateEvent(eventId, {
        registeredCount: event.registeredCount - 1
      })
    }
  }

  onEventsSnapshot(callback: (events: Event[]) => void): () => void {
    return this.repository.onSnapshot(callback)
  }

  onEventSnapshot(id: string, callback: (event: Event | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const eventService = new EventService()
