import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  onSnapshot,
  Query,
  QuerySnapshot,
  DocumentSnapshot,
  CollectionReference
} from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import { BaseRepository } from './base.repository'
import { QueryCondition, QueryOptions } from '@/types/firestore'

export class FirestoreRepository<T> extends BaseRepository<T> {
  private collectionRef: CollectionReference

  constructor(collectionName: string) {
    super(collectionName)
    this.collectionRef = collection(firestore, collectionName)
  }

  async findById(id: string): Promise<T | null> {
    try {
      const docRef = doc(this.collectionRef, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return this.transformTimestamps({
          id: docSnap.id,
          ...docSnap.data()
        }) as T
      }
      
      return null
    } catch (error) {
      console.error(`Error finding document by id ${id}:`, error)
      throw error
    }
  }

  async findAll(options?: QueryOptions): Promise<T[]> {
    try {
      let q: Query = this.collectionRef
      
      if (options?.conditions && options.conditions.length > 0) {
        q = this.buildQuery(q, options.conditions)
      }
      
      if (options?.orderBy) {
        q = query(q, orderBy(options.orderBy.field, options.orderBy.direction))
      }
      
      if (options?.limit) {
        q = query(q, limit(options.limit))
      }
      
      if (options?.startAfter) {
        q = query(q, startAfter(options.startAfter))
      }
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => 
        this.transformTimestamps({
          id: doc.id,
          ...doc.data()
        }) as T
      )
    } catch (error) {
      console.error('Error finding all documents:', error)
      throw error
    }
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      const preparedData = this.prepareData(data)
      const docRef = await addDoc(this.collectionRef, preparedData)
      
      return {
        id: docRef.id,
        ...preparedData
      } as T
    } catch (error) {
      console.error('Error creating document:', error)
      throw error
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const docRef = doc(this.collectionRef, id)
      const preparedData = this.prepareData(data)
      
      await updateDoc(docRef, preparedData)
      
      const updatedDoc = await getDoc(docRef)
      if (updatedDoc.exists()) {
        return this.transformTimestamps({
          id: updatedDoc.id,
          ...updatedDoc.data()
        }) as T
      }
      
      throw new Error('Document not found after update')
    } catch (error) {
      console.error(`Error updating document ${id}:`, error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(this.collectionRef, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error(`Error deleting document ${id}:`, error)
      throw error
    }
  }

  async query(conditions: QueryCondition[]): Promise<T[]> {
    try {
      let q: Query = this.buildQuery(this.collectionRef, conditions)
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => 
        this.transformTimestamps({
          id: doc.id,
          ...doc.data()
        }) as T
      )
    } catch (error) {
      console.error('Error querying documents:', error)
      throw error
    }
  }

  onSnapshot(callback: (data: T[]) => void): () => void {
    const unsubscribe = onSnapshot(this.collectionRef, (snapshot: QuerySnapshot) => {
      const data = snapshot.docs.map(doc => 
        this.transformTimestamps({
          id: doc.id,
          ...doc.data()
        }) as T
      )
      callback(data)
    })
    
    return unsubscribe
  }

  onDocumentSnapshot(id: string, callback: (data: T | null) => void): () => void {
    const docRef = doc(this.collectionRef, id)
    const unsubscribe = onSnapshot(docRef, (snapshot: DocumentSnapshot) => {
      if (snapshot.exists()) {
        callback(this.transformTimestamps({
          id: snapshot.id,
          ...snapshot.data()
        }) as T)
      } else {
        callback(null)
      }
    })
    
    return unsubscribe
  }

  private buildQuery(baseQuery: Query, conditions: QueryCondition[]): Query {
    let q: Query = baseQuery
    
    conditions.forEach(condition => {
      switch (condition.operator) {
        case '==':
          q = query(q, where(condition.field, '==', condition.value))
          break
        case '!=':
          q = query(q, where(condition.field, '!=', condition.value))
          break
        case '>':
          q = query(q, where(condition.field, '>', condition.value))
          break
        case '>=':
          q = query(q, where(condition.field, '>=', condition.value))
          break
        case '<':
          q = query(q, where(condition.field, '<', condition.value))
          break
        case '<=':
          q = query(q, where(condition.field, '<=', condition.value))
          break
        case 'array-contains':
          q = query(q, where(condition.field, 'array-contains', condition.value))
          break
        case 'array-contains-any':
          q = query(q, where(condition.field, 'array-contains-any', condition.value))
          break
        case 'in':
          q = query(q, where(condition.field, 'in', condition.value))
          break
        case 'not-in':
          q = query(q, where(condition.field, 'not-in', condition.value))
          break
        default:
          console.warn(`Unknown operator: ${condition.operator}`)
      }
    })
    
    return q
  }
}
