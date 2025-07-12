
// Firebase Firestore data types
export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  id: string
  userId: string
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  bio?: string
  website?: string
  socialLinks?: Record<string, string>
}

export interface ArtistProfile {
  id: string
  userId: string
  businessName?: string
  skills: string[]
  experienceYears?: number
  hourlyRate?: number
  availability?: string
  portfolioTitle?: string
  portfolioDescription?: string
  verificationStatus: VerificationStatus
  neighborhoodId?: string
  location?: string
  latitude?: number
  longitude?: number
  isOpenToWork: boolean
  completedProjects: number
  averageRating?: number
}

export interface ClientProfile {
  id: string
  userId: string
  companyName?: string
  companySize?: string
  industry?: string
  description?: string
  website?: string
  neighborhoodId?: string
  location?: string
  latitude?: number
  longitude?: number
}

export interface Gig {
  id: string
  clientId: string
  title: string
  description: string
  category: GigCategory
  budget: number
  budgetType: 'fixed' | 'hourly'
  timeline: string
  location: string
  isRemote: boolean
  requirements: string[]
  skills: string[]
  deadline?: Date
  status: GigStatus
  createdAt: Date
  updatedAt: Date
}

export interface Portfolio {
  id: string
  artistId: string
  title: string
  description?: string
  isPublic: boolean
  coverImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface PortfolioItem {
  id: string
  portfolioId: string
  title: string
  description?: string
  imageUrl: string
  category?: GigCategory
  tags: string[]
  order: number
  createdAt: Date
}

export interface Project {
  id: string
  gigId: string
  title: string
  description: string
  budget: number
  status: ProjectStatus
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  userId: string
  projectId?: string
  amount: number
  fee: number
  netAmount: number
  status: PaymentStatus
  description?: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  projectId?: string
  content: string
  attachments?: string[]
  read: boolean
  createdAt: Date
}

export interface Review {
  id: string
  projectId: string
  giverId: string
  receiverId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface Subscription {
  id: string
  userId: string
  tier: SubscriptionTier
  currentPeriodStart?: Date
  currentPeriodEnd?: Date
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BrooklynNeighborhood {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
}

// Enums
export enum UserRole {
  ARTIST = 'ARTIST',
  CLIENT = 'CLIENT'
}

export enum GigCategory {
  MURALIST = 'MURALIST',
  GRAPHIC_DESIGNER = 'GRAPHIC_DESIGNER',
  PHOTOGRAPHER = 'PHOTOGRAPHER',
  WEB_DESIGNER = 'WEB_DESIGNER',
  ILLUSTRATOR = 'ILLUSTRATOR',
  VIDEO_EDITOR = 'VIDEO_EDITOR',
  OTHER = 'OTHER'
}

export enum GigStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO'
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}
