import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Club, QueryCondition } from '@/types/firestore'

export class ClubService {
  private repository: FirestoreRepository<Club>

  constructor() {
    this.repository = new FirestoreRepository<Club>('clubs')
  }

  async getClubById(id: string): Promise<Club | null> {
    return this.repository.findById(id)
  }

  async getAllClubs(options?: any): Promise<Club[]> {
    return this.repository.findAll(options)
  }

  async createClub(clubData: Omit<Club, 'id' | 'createdAt' | 'updatedAt'>): Promise<Club> {
    return this.repository.create(clubData)
  }

  async updateClub(id: string, clubData: Partial<Club>): Promise<Club> {
    return this.repository.update(id, clubData)
  }

  async deleteClub(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getClubsByPresident(presidentId: string): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'presidentId', operator: '==', value: presidentId }
    ]
    return this.repository.query(conditions)
  }

  async getClubsByCategory(category: string): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'category', operator: '==', value: category }
    ]
    return this.repository.query(conditions)
  }

  async getFeaturedClubs(): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'isFeatured', operator: '==', value: true },
      { field: 'status', operator: '==', value: 'approved' }
    ]
    return this.repository.query(conditions)
  }

  async getVerifiedClubs(): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'isVerified', operator: '==', value: true },
      { field: 'status', operator: '==', value: 'approved' }
    ]
    return this.repository.query(conditions)
  }

  async getClubsByStatus(status: Club['status']): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'status', operator: '==', value: status }
    ]
    return this.repository.query(conditions)
  }

  async searchClubs(searchTerm: string): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'name', operator: '>=', value: searchTerm },
      { field: 'name', operator: '<=', value: searchTerm + '\uf8ff' }
    ]
    return this.repository.query(conditions)
  }

  async getClubsByTag(tag: string): Promise<Club[]> {
    const conditions: QueryCondition[] = [
      { field: 'tags', operator: 'array-contains', value: tag }
    ]
    return this.repository.query(conditions)
  }

  async incrementMemberCount(clubId: string): Promise<void> {
    const club = await this.getClubById(clubId)
    if (club) {
      await this.updateClub(clubId, {
        memberCount: club.memberCount + 1
      })
    }
  }

  async decrementMemberCount(clubId: string): Promise<void> {
    const club = await this.getClubById(clubId)
    if (club && club.memberCount > 0) {
      await this.updateClub(clubId, {
        memberCount: club.memberCount - 1
      })
    }
  }

  onClubsSnapshot(callback: (clubs: Club[]) => void): () => void {
    return this.repository.onSnapshot(callback)
  }

  onClubSnapshot(id: string, callback: (club: Club | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const clubService = new ClubService()
