// Firestore Type-safe Models

export interface User {
  uid: string
  displayName?: string
  email: string
  photoURL?: string
  provider: 'google' | 'email' | 'phone'
  role: 'student' | 'teacher' | 'organizer' | 'admin'
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
  isProfileComplete: boolean
  emailVerified?: boolean
  phone?: string
}

export interface Event {
  id: string
  title: string
  description: string
  organizerId: string
  organizerName: string
  organizerPhotoURL?: string
  category: string
  coverImage?: string
  location: {
    name: string
    address: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  date: Date
  endTime?: Date
  capacity: number
  registeredCount: number
  isVirtual: boolean
  meetingLink?: string
  requirements?: string[]
  timeline?: Array<{
    time: string
    activity: string
  }>
  gallery?: string[]
  faq?: Array<{
    question: string
    answer: string
  }>
  tags: string[]
  isFeatured: boolean
  isTrending: boolean
  isPopular: boolean
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface Club {
  id: string
  name: string
  description: string
  presidentId: string
  presidentName: string
  presidentPhotoURL?: string
  category: string
  coverImage?: string
  logo?: string
  memberCount: number
  maxMembers?: number
  location?: string
  meetingSchedule?: string
  requirements?: string[]
  tags: string[]
  isFeatured: boolean
  isVerified: boolean
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: 'event' | 'message' | 'achievement' | 'alert' | 'info' | 'club' | 'competition' | 'scholarship'
  title: string
  message: string
  data?: {
    eventId?: string
    clubId?: string
    competitionId?: string
    scholarshipId?: string
    userId?: string
    [key: string]: any
  }
  read: boolean
  important: boolean
  archived: boolean
  category: string
  createdAt: Date
}

export interface Achievement {
  id: string
  userId: string
  type: 'badge' | 'milestone' | 'recognition'
  title: string
  description: string
  icon: string
  category: string
  earnedAt: Date
  isPublic: boolean
  metadata?: {
    eventId?: string
    competitionId?: string
    volunteerHours?: number
    [key: string]: any
  }
}

export interface Certificate {
  id: string
  userId: string
  type: 'volunteer' | 'competition' | 'course' | 'achievement'
  title: string
  description: string
  issuer: string
  issuerLogo?: string
  issueDate: Date
  expiryDate?: Date
  certificateNumber: string
  verificationUrl?: string
  pdfUrl?: string
  metadata?: {
    eventId?: string
    competitionId?: string
    courseId?: string
    hours?: number
    [key: string]: any
  }
  isPublic: boolean
}

export interface Volunteer {
  id: string
  userId: string
  eventId?: string
  organizationId?: string
  organizationName?: string
  role: string
  hours: number
  date: Date
  description: string
  category: string
  isVerified: boolean
  verifiedBy?: string
  verifiedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Recommendation {
  id: string
  userId: string
  type: 'event' | 'competition' | 'scholarship' | 'internship' | 'club' | 'volunteer'
  itemId: string
  itemTitle: string
  itemImage?: string
  reason: string
  score: number
  category: string
  isSaved: boolean
  isDismissed: boolean
  metadata?: {
    basedOn: string[]
    [key: string]: any
  }
  createdAt: Date
  expiresAt?: Date
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderPhotoURL?: string
  content: string
  type: 'text' | 'image' | 'file' | 'system'
  attachments?: Array<{
    url: string
    name: string
    type: string
    size: number
  }>
  isRead: boolean
  readAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ChatConversation {
  id: string
  participants: string[]
  participantNames: string[]
  participantPhotos: string[]
  type: 'direct' | 'group'
  name?: string
  groupPhoto?: string
  lastMessage?: {
    content: string
    senderId: string
    createdAt: Date
  }
  unreadCount: number
  isArchived: boolean
  metadata?: {
    eventId?: string
    clubId?: string
    [key: string]: any
  }
  createdAt: Date
  updatedAt: Date
}

export interface Competition {
  id: string
  title: string
  description: string
  organizerId: string
  organizerName: string
  category: string
  coverImage?: string
  startDate: Date
  endDate: Date
  registrationDeadline: Date
  maxParticipants?: number
  currentParticipants: number
  prize?: string
  requirements?: string[]
  rules?: string[]
  tags: string[]
  isFeatured: boolean
  isTrending: boolean
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface Scholarship {
  id: string
  title: string
  description: string
  provider: string
  providerLogo?: string
  category: string
  amount: string
  deadline: Date
  eligibility: string[]
  requirements?: string[]
  applicationUrl?: string
  coverImage?: string
  tags: string[]
  isFeatured: boolean
  status: 'active' | 'expired' | 'closed'
  createdAt: Date
  updatedAt: Date
}

// Firestore Document Types
export type FirestoreDocument<T> = T & {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Query Types
export type QueryOperator = '==' | '!=' | '>' | '>=' | '<' | '<=' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in'

export interface QueryCondition {
  field: string
  operator: QueryOperator
  value: any
}

export interface QueryOptions {
  conditions?: QueryCondition[]
  orderBy?: {
    field: string
    direction: 'asc' | 'desc'
  }
  limit?: number
  startAfter?: any
}
