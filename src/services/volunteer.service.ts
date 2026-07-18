import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Volunteer, QueryCondition } from '@/types/firestore'

export class VolunteerService {
  private repository: FirestoreRepository<Volunteer>

  constructor() {
    this.repository = new FirestoreRepository<Volunteer>('volunteer')
  }

  async getVolunteerById(id: string): Promise<Volunteer | null> {
    return this.repository.findById(id)
  }

  async getAllVolunteers(options?: any): Promise<Volunteer[]> {
    return this.repository.findAll(options)
  }

  async createVolunteer(volunteerData: Omit<Volunteer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Volunteer> {
    return this.repository.create(volunteerData)
  }

  async updateVolunteer(id: string, volunteerData: Partial<Volunteer>): Promise<Volunteer> {
    return this.repository.update(id, volunteerData)
  }

  async deleteVolunteer(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getUserVolunteers(userId: string): Promise<Volunteer[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.query(conditions)
  }

  async getEventVolunteers(eventId: string): Promise<Volunteer[]> {
    const conditions: QueryCondition[] = [
      { field: 'eventId', operator: '==', value: eventId }
    ]
    return this.repository.query(conditions)
  }

  async getOrganizationVolunteers(organizationId: string): Promise<Volunteer[]> {
    const conditions: QueryCondition[] = [
      { field: 'organizationId', operator: '==', value: organizationId }
    ]
    return this.repository.query(conditions)
  }

  async getVerifiedVolunteers(userId?: string): Promise<Volunteer[]> {
    const conditions: QueryCondition[] = [
      { field: 'isVerified', operator: '==', value: true }
    ]
    if (userId) {
      conditions.push({ field: 'userId', operator: '==', value: userId })
    }
    return this.repository.query(conditions)
  }

  async getVolunteersByCategory(category: string): Promise<Volunteer[]> {
    const conditions: QueryCondition[] = [
      { field: 'category', operator: '==', value: category }
    ]
    return this.repository.query(conditions)
  }

  async getTotalVolunteerHours(userId: string): Promise<number> {
    const volunteers = await this.getUserVolunteers(userId)
    const verifiedVolunteers = volunteers.filter(v => v.isVerified)
    return verifiedVolunteers.reduce((total, v) => total + v.hours, 0)
  }

  async verifyVolunteer(id: string, verifiedBy: string): Promise<void> {
    await this.updateVolunteer(id, {
      isVerified: true,
      verifiedBy,
      verifiedAt: new Date()
    })
  }

  async getRecentVolunteers(userId: string, limit: number = 10): Promise<Volunteer[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.findAll({
      conditions,
      orderBy: { field: 'date', direction: 'desc' },
      limit
    })
  }

  onVolunteersSnapshot(userId: string, callback: (volunteers: Volunteer[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.onSnapshot(callback)
  }

  onVolunteerSnapshot(id: string, callback: (volunteer: Volunteer | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const volunteerService = new VolunteerService()
