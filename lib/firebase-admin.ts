
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Only initialize Firebase Admin if we have valid credentials
let app: any = null
let adminAuth: any = null
let adminDb: any = null

const hasValidCredentials = process.env.FIREBASE_PRIVATE_KEY && 
  process.env.FIREBASE_CLIENT_EMAIL && 
  !process.env.FIREBASE_PRIVATE_KEY.includes('your-private-key') && 
  !process.env.FIREBASE_CLIENT_EMAIL.includes('your-service-account-email')

if (hasValidCredentials && getApps().length === 0) {
  try {
    const firebaseAdminConfig = {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    }
    
    app = initializeApp(firebaseAdminConfig)
    adminAuth = getAuth(app)
    adminDb = getFirestore(app)
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error)
  }
}

// Create mock functions for build time
const createMockAuth = () => ({
  verifyIdToken: async () => {
    throw new Error('Firebase Admin not configured. Please provide valid Firebase credentials.')
  }
})

const createMockDb = () => ({
  collection: () => {
    throw new Error('Firebase Admin not configured. Please provide valid Firebase credentials.')
  }
})

export const exportedAdminAuth = adminAuth || createMockAuth()
export const exportedAdminDb = adminDb || createMockDb()

// For compatibility with existing imports
export { exportedAdminAuth as adminAuth }
export { exportedAdminDb as adminDb }

export default app
