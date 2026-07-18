import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Achievement, QueryCondition } from '@/types/firestore'

export class AchievementService {
  private repository: FirestoreRepository<Achievement>

  constructor() {
    this.repository = new FirestoreRepository<Achievement>('achievements')
  }

  async getAchievementById(id: string): Promise<Achievement | null> {
    return this.repository.findById(id)
  }

  async getAllAchievements(options?: any): Promise<Achievement[]> {
    return this.repository.findAll(options)
  }

  async createAchievement(achievementData: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Achievement> {
    return this.repository.create(achievementData)
  }

  async updateAchievement(id: string, achievementData: Partial<Achievement>): Promise<Achievement> {
    return this.repository.update(id, achievementData)
  }

  async deleteAchievement(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.query(conditions)
  }

  async getPublicAchievements(userId: string): Promise<Achievement[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'isPublic', operator: '==', value: true }
    ]
    return this.repository.query(conditions)
  }

  async getAchievementsByType(userId: string, type: Achievement['type']): Promise<Achievement[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'type', operator: '==', value: type }
    ]
    return this.repository.query(conditions)
  }

  async getAchievementsByCategory(userId: string, category: string): Promise<Achievement[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'category', operator: '==', value: category }
    ]
    return this.repository.query(conditions)
  }

  async getRecentAchievements(userId: string, limit: number = 10): Promise<Achievement[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.findAll({
      conditions,
      orderBy: { field: 'earnedAt', direction: 'desc' },
      limit
    })
  }

  async togglePublic(id: string): Promise<void> {
    const achievement = await this.getAchievementById(id)
    if (achievement) {
      await this.updateAchievement(id, { isPublic: !achievement.isPublic })
    }
  }

  onAchievementsSnapshot(userId: string, callback: (achievements: Achievement[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.onSnapshot(callback)
  }

  onAchievementSnapshot(id: string, callback: (achievement: Achievement | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const achievementService = new AchievementService()
