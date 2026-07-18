import { FirestoreRepository } from '@/repositories/firestore.repository'
import { Certificate, QueryCondition } from '@/types/firestore'

export class CertificateService {
  private repository: FirestoreRepository<Certificate>

  constructor() {
    this.repository = new FirestoreRepository<Certificate>('certificates')
  }

  async getCertificateById(id: string): Promise<Certificate | null> {
    return this.repository.findById(id)
  }

  async getAllCertificates(options?: any): Promise<Certificate[]> {
    return this.repository.findAll(options)
  }

  async createCertificate(certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certificate> {
    return this.repository.create(certificateData)
  }

  async updateCertificate(id: string, certificateData: Partial<Certificate>): Promise<Certificate> {
    return this.repository.update(id, certificateData)
  }

  async deleteCertificate(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async getUserCertificates(userId: string): Promise<Certificate[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.query(conditions)
  }

  async getPublicCertificates(userId: string): Promise<Certificate[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'isPublic', operator: '==', value: true }
    ]
    return this.repository.query(conditions)
  }

  async getCertificatesByType(userId: string, type: Certificate['type']): Promise<Certificate[]> {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'type', operator: '==', value: type }
    ]
    return this.repository.query(conditions)
  }

  async getCertificatesByIssuer(issuer: string): Promise<Certificate[]> {
    const conditions: QueryCondition[] = [
      { field: 'issuer', operator: '==', value: issuer }
    ]
    return this.repository.query(conditions)
  }

  async getValidCertificates(userId: string): Promise<Certificate[]> {
    const now = new Date()
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    const certificates = await this.repository.query(conditions)
    return certificates.filter(cert => 
      !cert.expiryDate || new Date(cert.expiryDate) > now
    )
  }

  async getExpiredCertificates(userId: string): Promise<Certificate[]> {
    const now = new Date()
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    const certificates = await this.repository.query(conditions)
    return certificates.filter(cert => 
      cert.expiryDate && new Date(cert.expiryDate) <= now
    )
  }

  async verifyCertificate(certificateNumber: string): Promise<Certificate | null> {
    const conditions: QueryCondition[] = [
      { field: 'certificateNumber', operator: '==', value: certificateNumber }
    ]
    const certificates = await this.repository.query(conditions)
    return certificates.length > 0 ? certificates[0] : null
  }

  async togglePublic(id: string): Promise<void> {
    const certificate = await this.getCertificateById(id)
    if (certificate) {
      await this.updateCertificate(id, { isPublic: !certificate.isPublic })
    }
  }

  async updatePdfUrl(id: string, pdfUrl: string): Promise<void> {
    await this.updateCertificate(id, { pdfUrl })
  }

  onCertificatesSnapshot(userId: string, callback: (certificates: Certificate[]) => void): () => void {
    const conditions: QueryCondition[] = [
      { field: 'userId', operator: '==', value: userId }
    ]
    return this.repository.onSnapshot(callback)
  }

  onCertificateSnapshot(id: string, callback: (certificate: Certificate | null) => void): () => void {
    return this.repository.onDocumentSnapshot(id, callback)
  }
}

export const certificateService = new CertificateService()
