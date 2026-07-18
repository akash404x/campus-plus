import { FirestoreRepository } from '@/repositories/firestore.repository'
import { User, QueryCondition } from '@/types/firestore'

export class UserService {
  private repository: FirestoreRepository<User>

  constructor() {
    this.repository = new FirestoreRepository<User>('users')
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repository.findById(id)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const conditions: QueryCondition[] = [
      { field: 'email', operator: '==', value: email }
    ]
    const users = await this.repository.query(conditions)
    return users.length > 0 ? users[0] : null
  }

  async getAllUsers(options?: any): Promise<User[]> {
    return this.repository.findAll(options)
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.repository.create(userData)
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return this.repository.update(id, userData)
  }

  async deleteUser(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    const conditions: QueryCondition[] = [
      { field: 'displayName', operator: '>=', value: searchTerm },
      { field: 'displayName', operator: '<=', value: searchTerm + '\uf8ff' }
    ]
    return this.repository.query(conditions)
  }

  async getUsersByRole(role: User['role']): Promise<User[]> {
    const conditions: QueryCondition[] = [
      { field: 'role', operator: '==', value: role }
    ]
    return this.repository.query(conditions)
  }

  async getUsersByInterest(interest: string): Promise<User[]> {
    const conditions: QueryCondition[] = [
      { field: 'interests', operator: 'array-contains', value: interest }
    ]
    return this.repository.query(conditions)
  }

  async getVerifiedUsers(): Promise<User[]> {
    const conditions: QueryCondition[] = [
      { field: 'isVerified', operator: '==', value: true }
    ]
    return this.repository.query(conditions)
  }

  async updateLastActive(id: string): Promise<void> {
    await this.updateUser(id, { lastLogin: new Date() })
  }

  onUsersSnapshot(callback: (users: User[]) => void): () => void {
    return this.repository.onSnapshot(callback)
  }

  onUserSnapshot(id: string, callback: (user: User | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

// Singleton instance
export const userService = new UserService()
