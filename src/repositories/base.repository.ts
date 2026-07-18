import { QueryCondition, QueryOptions } from '@/types/firestore'

// Base Repository Interface
export interface IRepository<T> {
  findById(id: string): Promise<T | null>
  findAll(options?: QueryOptions): Promise<T[]>
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
  query(conditions: QueryCondition[]): Promise<T[]>
  onSnapshot(callback: (data: T[]) => void): () => void
  onDocumentSnapshot(id: string, callback: (data: T | null) => void): () => void
}

// Base Repository Abstract Class
export abstract class BaseRepository<T> implements IRepository<T> {
  protected collectionName: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  abstract findById(id: string): Promise<T | null>
  abstract findAll(options?: QueryOptions): Promise<T[]>
  abstract create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  abstract update(id: string, data: Partial<T>): Promise<T>
  abstract delete(id: string): Promise<void>
  abstract query(conditions: QueryCondition[]): Promise<T[]>
  abstract onSnapshot(callback: (data: T[]) => void): () => void
  abstract onDocumentSnapshot(id: string, callback: (data: T | null) => void): () => void

  protected transformTimestamps(data: any): any {
    if (!data) return data
    
    const transformed = { ...data }
    
    // Convert Firestore timestamps to Date objects
    Object.keys(transformed).forEach(key => {
      if (transformed[key] && typeof transformed[key].toDate === 'function') {
        transformed[key] = transformed[key].toDate()
      }
    })
    
    return transformed
  }

  protected prepareData(data: any): any {
    const prepared = { ...data }
    
    // Add timestamps
    const now = new Date()
    if (!prepared.createdAt) {
      prepared.createdAt = now
    }
    prepared.updatedAt = now
    
    return prepared
  }
}
