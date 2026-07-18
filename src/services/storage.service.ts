import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
  getMetadata,
  updateMetadata 
} from 'firebase/storage'
import { storage } from '@/lib/firebase'

export class StorageService {
  private storage = storage

  async uploadFile(
    path: string, 
    file: File, 
    metadata?: { contentType?: string; customMetadata?: Record<string, string> }
  ): Promise<string> {
    try {
      const storageRef = ref(this.storage, path)
      const uploadResult = await uploadBytes(storageRef, file, metadata)
      const downloadURL = await getDownloadURL(uploadResult.ref)
      return downloadURL
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  async uploadBytes(
    path: string, 
    data: ArrayBuffer | Uint8Array | Blob, 
    metadata?: { contentType?: string; customMetadata?: Record<string, string> }
  ): Promise<string> {
    try {
      const storageRef = ref(this.storage, path)
      const uploadResult = await uploadBytes(storageRef, data, metadata)
      const downloadURL = await getDownloadURL(uploadResult.ref)
      return downloadURL
    } catch (error) {
      console.error('Error uploading bytes:', error)
      throw error
    }
  }

  async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, path)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('Error getting download URL:', error)
      throw error
    }
  }

  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(this.storage, path)
      await deleteObject(storageRef)
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }

  async listFiles(path: string): Promise<string[]> {
    try {
      const storageRef = ref(this.storage, path)
      const result = await listAll(storageRef)
      const urls = await Promise.all(
        result.items.map(item => getDownloadURL(item))
      )
      return urls
    } catch (error) {
      console.error('Error listing files:', error)
      throw error
    }
  }

  async getFileMetadata(path: string): Promise<any> {
    try {
      const storageRef = ref(this.storage, path)
      return await getMetadata(storageRef)
    } catch (error) {
      console.error('Error getting file metadata:', error)
      throw error
    }
  }

  async updateFileMetadata(
    path: string, 
    metadata: { contentType?: string; customMetadata?: Record<string, string> }
  ): Promise<void> {
    try {
      const storageRef = ref(this.storage, path)
      await updateMetadata(storageRef, metadata)
    } catch (error) {
      console.error('Error updating file metadata:', error)
      throw error
    }
  }

  // User-specific methods
  async uploadUserProfilePicture(userId: string, file: File): Promise<string> {
    const path = `users/${userId}/profile-picture/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  async uploadUserCoverImage(userId: string, file: File): Promise<string> {
    const path = `users/${userId}/cover-image/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  async deleteUserProfilePicture(userId: string, url: string): Promise<void> {
    // Extract path from URL and delete
    const path = this.extractPathFromURL(url)
    if (path) {
      await this.deleteFile(path)
    }
  }

  // Event-specific methods
  async uploadEventCoverImage(eventId: string, file: File): Promise<string> {
    const path = `events/${eventId}/cover/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  async uploadEventGalleryImage(eventId: string, file: File): Promise<string> {
    const path = `events/${eventId}/gallery/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  async deleteEventImage(eventId: string, url: string): Promise<void> {
    const path = this.extractPathFromURL(url)
    if (path) {
      await this.deleteFile(path)
    }
  }

  // Club-specific methods
  async uploadClubLogo(clubId: string, file: File): Promise<string> {
    const path = `clubs/${clubId}/logo/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  async uploadClubCoverImage(clubId: string, file: File): Promise<string> {
    const path = `clubs/${clubId}/cover/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  // Certificate-specific methods
  async uploadCertificatePDF(userId: string, certificateId: string, file: File): Promise<string> {
    const path = `certificates/${userId}/${certificateId}.pdf`
    return this.uploadFile(path, file, { contentType: 'application/pdf' })
  }

  // Chat-specific methods
  async uploadChatMessageImage(conversationId: string, messageId: string, file: File): Promise<string> {
    const path = `chat/${conversationId}/${messageId}/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  async uploadChatMessageFile(conversationId: string, messageId: string, file: File): Promise<string> {
    const path = `chat/${conversationId}/${messageId}/${Date.now()}-${file.name}`
    return this.uploadFile(path, file, { contentType: file.type })
  }

  // Helper method to extract path from Firebase Storage URL
  private extractPathFromURL(url: string): string | null {
    try {
      const urlObj = new URL(url)
      const path = urlObj.pathname
      // Remove leading / and any Firebase Storage specific prefixes
      return path.replace(/^\/[^\/]+\/[^\/]+\//, '')
    } catch {
      return null
    }
  }
}

export const storageService = new StorageService()
