
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
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from './firebase'
import { 
  User, 
  UserProfile, 
  ArtistProfile, 
  ClientProfile, 
  Gig, 
  Portfolio, 
  PortfolioItem,
  Project,
  Payment,
  Message,
  Review,
  Subscription,
  BrooklynNeighborhood,
  UserRole,
  GigCategory,
  GigStatus,
  ProjectStatus,
  PaymentStatus,
  SubscriptionTier,
  VerificationStatus
} from './firebase-types'

// Generic CRUD operations
export async function createDocument<T>(
  collectionName: string, 
  data: Omit<T, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
  return docRef.id
}

export async function getDocument<T>(
  collectionName: string, 
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T
  }
  return null
}

export async function updateDocument<T>(
  collectionName: string, 
  id: string, 
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now()
  })
}

export async function deleteDocument(
  collectionName: string, 
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id)
  await deleteDoc(docRef)
}

// User operations
export async function createUser(userData: Omit<User, 'id'>): Promise<string> {
  return createDocument<User>('users', userData)
}

export async function getUser(id: string): Promise<User | null> {
  return getDocument<User>('users', id)
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const q = query(collection(db, 'users'), where('email', '==', email))
  const querySnapshot = await getDocs(q)
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as User
  }
  return null
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
  return updateDocument<User>('users', id, data)
}

// Profile operations
export async function createUserProfile(profileData: Omit<UserProfile, 'id'>): Promise<string> {
  return createDocument<UserProfile>('user_profiles', profileData)
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const q = query(collection(db, 'user_profiles'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as UserProfile
  }
  return null
}

export async function createArtistProfile(profileData: Omit<ArtistProfile, 'id'>): Promise<string> {
  return createDocument<ArtistProfile>('artist_profiles', profileData)
}

export async function getArtistProfile(userId: string): Promise<ArtistProfile | null> {
  const q = query(collection(db, 'artist_profiles'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as ArtistProfile
  }
  return null
}

export async function createClientProfile(profileData: Omit<ClientProfile, 'id'>): Promise<string> {
  return createDocument<ClientProfile>('client_profiles', profileData)
}

export async function getClientProfile(userId: string): Promise<ClientProfile | null> {
  const q = query(collection(db, 'client_profiles'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as ClientProfile
  }
  return null
}

// Gig operations
export async function createGig(gigData: Omit<Gig, 'id'>): Promise<string> {
  return createDocument<Gig>('gigs', gigData)
}

export async function getGig(id: string): Promise<Gig | null> {
  return getDocument<Gig>('gigs', id)
}

export async function getGigs(filters?: {
  category?: GigCategory
  status?: GigStatus
  location?: string
  limit?: number
}): Promise<Gig[]> {
  let q = query(collection(db, 'gigs'), orderBy('createdAt', 'desc'))
  
  if (filters?.category) {
    q = query(q, where('category', '==', filters.category))
  }
  
  if (filters?.status) {
    q = query(q, where('status', '==', filters.status))
  }
  
  if (filters?.location) {
    q = query(q, where('location', '==', filters.location))
  }
  
  if (filters?.limit) {
    q = query(q, limit(filters.limit))
  }
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gig))
}

export async function updateGig(id: string, data: Partial<Gig>): Promise<void> {
  return updateDocument<Gig>('gigs', id, data)
}

export async function deleteGig(id: string): Promise<void> {
  return deleteDocument('gigs', id)
}

// Portfolio operations
export async function createPortfolio(portfolioData: Omit<Portfolio, 'id'>): Promise<string> {
  return createDocument<Portfolio>('portfolios', portfolioData)
}

export async function getPortfolio(id: string): Promise<Portfolio | null> {
  return getDocument<Portfolio>('portfolios', id)
}

export async function getArtistPortfolios(artistId: string): Promise<Portfolio[]> {
  const q = query(
    collection(db, 'portfolios'), 
    where('artistId', '==', artistId),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Portfolio))
}

export async function createPortfolioItem(itemData: Omit<PortfolioItem, 'id'>): Promise<string> {
  return createDocument<PortfolioItem>('portfolio_items', itemData)
}

export async function getPortfolioItems(portfolioId: string): Promise<PortfolioItem[]> {
  const q = query(
    collection(db, 'portfolio_items'), 
    where('portfolioId', '==', portfolioId),
    orderBy('order', 'asc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem))
}

// Project operations
export async function createProject(projectData: Omit<Project, 'id'>): Promise<string> {
  return createDocument<Project>('projects', projectData)
}

export async function getProject(id: string): Promise<Project | null> {
  return getDocument<Project>('projects', id)
}

export async function getUserProjects(userId: string, role: UserRole): Promise<Project[]> {
  const q = query(
    collection(db, 'projects'), 
    where(role === UserRole.ARTIST ? 'artistIds' : 'clientIds', 'array-contains', userId),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project))
}

// Payment operations
export async function createPayment(paymentData: Omit<Payment, 'id'>): Promise<string> {
  return createDocument<Payment>('payments', paymentData)
}

export async function getPayment(id: string): Promise<Payment | null> {
  return getDocument<Payment>('payments', id)
}

export async function getUserPayments(userId: string): Promise<Payment[]> {
  const q = query(
    collection(db, 'payments'), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment))
}

// Message operations
export async function createMessage(messageData: Omit<Message, 'id'>): Promise<string> {
  return createDocument<Message>('messages', messageData)
}

export async function getMessage(id: string): Promise<Message | null> {
  return getDocument<Message>('messages', id)
}

export async function getConversation(userId1: string, userId2: string): Promise<Message[]> {
  const q = query(
    collection(db, 'messages'),
    where('senderId', 'in', [userId1, userId2]),
    where('receiverId', 'in', [userId1, userId2]),
    orderBy('createdAt', 'asc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message))
}

// Review operations
export async function createReview(reviewData: Omit<Review, 'id'>): Promise<string> {
  return createDocument<Review>('reviews', reviewData)
}

export async function getReview(id: string): Promise<Review | null> {
  return getDocument<Review>('reviews', id)
}

export async function getUserReviews(userId: string): Promise<Review[]> {
  const q = query(
    collection(db, 'reviews'), 
    where('receiverId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review))
}

// Subscription operations
export async function createSubscription(subscriptionData: Omit<Subscription, 'id'>): Promise<string> {
  return createDocument<Subscription>('subscriptions', subscriptionData)
}

export async function getSubscription(id: string): Promise<Subscription | null> {
  return getDocument<Subscription>('subscriptions', id)
}

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  const q = query(collection(db, 'subscriptions'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Subscription
  }
  return null
}

// Neighborhood operations
export async function createNeighborhood(neighborhoodData: Omit<BrooklynNeighborhood, 'id'>): Promise<string> {
  return createDocument<BrooklynNeighborhood>('brooklyn_neighborhoods', neighborhoodData)
}

export async function getNeighborhood(id: string): Promise<BrooklynNeighborhood | null> {
  return getDocument<BrooklynNeighborhood>('brooklyn_neighborhoods', id)
}

export async function getAllNeighborhoods(): Promise<BrooklynNeighborhood[]> {
  const q = query(collection(db, 'brooklyn_neighborhoods'), orderBy('name', 'asc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BrooklynNeighborhood))
}

// Batch operations
export async function batchCreateDocuments<T>(
  collectionName: string, 
  documents: Omit<T, 'id'>[]
): Promise<string[]> {
  const batch = writeBatch(db)
  const ids: string[] = []
  
  documents.forEach((docData) => {
    const docRef = doc(collection(db, collectionName))
    batch.set(docRef, {
      ...docData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
    ids.push(docRef.id)
  })
  
  await batch.commit()
  return ids
}

// Additional functions for backward compatibility
export async function findArtistProfile(userId: string): Promise<ArtistProfile | null> {
  return getArtistProfile(userId)
}

export async function findOpenGigs(): Promise<Gig[]> {
  return getGigs({ status: GigStatus.OPEN })
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return getUserByEmail(email)
}

export async function findUserById(id: string): Promise<User | null> {
  return getUser(id);
}
