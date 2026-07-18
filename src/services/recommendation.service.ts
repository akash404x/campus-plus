import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Recommendation, QueryCondition } from '@/types/firestore'

export class RecommendationService {
  private repository: FirestoreRepository<Recommendation>

  constructor() {
    this.repository = new FirestoreRepository<Recommendation>('recommendations')
  }

  async getRecommendationById(id: string): Promise<Recommendation | null> {
    return this.repository.findById(id)
  }

  async getAllRecommendations(options?: any): Promise<Recommendation[]> {
    return this.repository.findAll(options)
  }

  async createRecommendation(recommendationData: Omit<Recommendation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recommendation> {
    return this.repository.create(recommendationData)
  }

  async updateRecommendation(id: string, recommendationData: Partial<Recommendation>): Promise<Recommendation> {
    return this.repository.update(id, recommendationData)
  }

  async deleteRecommendation(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.query(conditions)
  }

  async getRecommendationsByType(userId: string, type: Recommendation['type']): Promise<Recommendation[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'type', operator: '==', value: type }
    ]
    return this.repository.query(conditions)
  }

  async getRecommendationsByCategory(userId: string, category: string): Promise<Recommendation[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'category', operator: '==', value: category }
    ]
    return this.repository.query(conditions)
  }

  async getActiveRecommendations(userId: string): Promise<Recommendation[]> {
    const now = new Date()
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'isDismissed', operator: '==', value: false }
    ]
    const recommendations = await this.repository.query(conditions)
    return recommendations.filter(rec => 
      !rec.expiresAt || new Date(rec.expiresAt) > now
    )
  }

  async getSavedRecommendations(userId: string): Promise<Recommendation[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'isSaved', operator: '==', value: true }
    ]
    return this.repository.query(conditions)
  }

  async getTopRecommendations(userId: string, limit: number = 10): Promise<Recommendation[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'isDismissed', operator: '==', value: false }
    ]
    return this.repository.findAll({
      conditions,
      orderBy: { field: 'score', direction: 'desc' },
      limit
    })
  }

  async saveRecommendation(id: string): Promise<void> {
    await this.updateRecommendation(id, { isSaved: true })
  }

  async unsaveRecommendation(id: string): Promise<void> {
    await this.updateRecommendation(id, { isSaved: false })
  }

  async dismissRecommendation(id: string): Promise<void> {
    await this.updateRecommendation(id, { isDismissed: true })
  }

  async undismissRecommendation(id: string): Promise<void> {
    await this.updateRecommendation(id, { isDismissed: false })
  }

  async generateRecommendations(userId: string, userInterests: string[], userSkills: string[]): Promise<void> {
    // This would typically use an ML model or algorithm to generate recommendations
    // For now, we'll create placeholder recommendations based on interests and skills
    const types: Recommendation['type'][] = ['event', 'competition', 'scholarship', 'internship', 'club', 'volunteer']
    
    for (const type of types) {
      const recommendation: Omit<Recommendation, 'id' | 'createdAt' | 'updatedAt'> = {
        userId,
        type,
        itemId: `placeholder-${type}-${Date.now()}`,
        itemTitle: `${type.charAt(0).toUpperCase() + type.slice(1)} Recommendation`,
        reason: `Based on your interests: ${userInterests.slice(0, 2).join(', ')}`,
        score: Math.floor(Math.random() * 100),
        category: userInterests[0] || 'general',
        isSaved: false,
        isDismissed: false,
        metadata: {
          basedOn: userInterests
        },
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
      
      await this.createRecommendation(recommendation)
    }
  }

  onRecommendationsSnapshot(userId: string, callback: (recommendations: Recommendation[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.onSnapshot(callback)
  }

  onRecommendationSnapshot(id: string, callback: (recommendation: Recommendation | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const recommendationService = new RecommendationService()
