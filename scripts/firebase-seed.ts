
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { 
  UserRole, 
  GigCategory, 
  GigStatus, 
  SubscriptionTier, 
  VerificationStatus,
  BrooklynNeighborhood,
  User,
  UserProfile,
  ArtistProfile,
  ClientProfile,
  Gig
} from '../lib/firebase-types'

// Initialize Firebase for seeding
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

const db = getFirestore(app)
const auth = getAuth(app)

// Generate a unique ID
const generateId = () => doc(collection(db, 'temp')).id

// Sample Brooklyn neighborhoods
const neighborhoods: BrooklynNeighborhood[] = [
  { id: '1', name: 'Williamsburg', slug: 'williamsburg', latitude: 40.7081, longitude: -73.9571 },
  { id: '2', name: 'DUMBO', slug: 'dumbo', latitude: 40.7033, longitude: -73.9903 },
  { id: '3', name: 'Park Slope', slug: 'park-slope', latitude: 40.6782, longitude: -73.9742 },
  { id: '4', name: 'Brooklyn Heights', slug: 'brooklyn-heights', latitude: 40.6962, longitude: -73.9926 },
  { id: '5', name: 'Red Hook', slug: 'red-hook', latitude: 40.6743, longitude: -74.0049 },
  { id: '6', name: 'Greenpoint', slug: 'greenpoint', latitude: 40.7308, longitude: -73.9501 },
  { id: '7', name: 'Bushwick', slug: 'bushwick', latitude: 40.6943, longitude: -73.9249 },
  { id: '8', name: 'Crown Heights', slug: 'crown-heights', latitude: 40.6678, longitude: -73.9442 },
  { id: '9', name: 'Fort Greene', slug: 'fort-greene', latitude: 40.6906, longitude: -73.9744 },
  { id: '10', name: 'Carroll Gardens', slug: 'carroll-gardens', latitude: 40.6747, longitude: -73.9992 },
  { id: '11', name: 'Gowanus', slug: 'gowanus', latitude: 40.6725, longitude: -73.9963 },
  { id: '12', name: 'Prospect Heights', slug: 'prospect-heights', latitude: 40.6788, longitude: -73.9678 },
  { id: '13', name: 'Cobble Hill', slug: 'cobble-hill', latitude: 40.6856, longitude: -73.9962 },
  { id: '14', name: 'Boerum Hill', slug: 'boerum-hill', latitude: 40.6890, longitude: -73.9921 },
  { id: '15', name: 'Sunset Park', slug: 'sunset-park', latitude: 40.6531, longitude: -74.0081 }
]

async function seedNeighborhoods() {
  console.log('Seeding neighborhoods...')
  
  for (const neighborhood of neighborhoods) {
    await setDoc(doc(db, 'neighborhoods', neighborhood.id), neighborhood)
  }
  
  console.log(`Seeded ${neighborhoods.length} neighborhoods`)
}

async function seedUsers() {
  console.log('Seeding users...')
  
  const users = [
    // Test admin user
    {
      email: 'john@doe.com',
      password: 'johndoe123',
      role: UserRole.ARTIST,
      profile: {
        firstName: 'John',
        lastName: 'Doe'
      },
      artistProfile: {
        skills: ['Photography', 'Digital Art', 'Branding'],
        experienceYears: 8,
        hourlyRate: 75,
        businessName: 'John Doe Creative',
        verificationStatus: VerificationStatus.VERIFIED
      }
    },
    // Sample artist
    {
      email: 'sophia.martinez@example.com',
      password: 'password123',
      role: UserRole.ARTIST,
      profile: {
        firstName: 'Sophia',
        lastName: 'Martinez'
      },
      artistProfile: {
        skills: ['Murals', 'Street Art', 'Custom Paintings'],
        experienceYears: 5,
        hourlyRate: 85,
        businessName: 'Sophia Martinez Art',
        location: 'Williamsburg, Brooklyn',
        neighborhoodId: '1',
        verificationStatus: VerificationStatus.VERIFIED
      }
    },
    // Sample client
    {
      email: 'alex.chen@techstartup.com',
      password: 'password123',
      role: UserRole.CLIENT,
      profile: {
        firstName: 'Alex',
        lastName: 'Chen'
      },
      clientProfile: {
        companyName: 'TechFlow Innovations',
        companySize: '11-50',
        industry: 'Technology',
        location: 'DUMBO, Brooklyn',
        neighborhoodId: '2'
      }
    },
    // Another artist
    {
      email: 'marcus.johnson@example.com',
      password: 'password123',
      role: UserRole.ARTIST,
      profile: {
        firstName: 'Marcus',
        lastName: 'Johnson'
      },
      artistProfile: {
        skills: ['Web Design', 'UI/UX', 'Branding'],
        experienceYears: 6,
        hourlyRate: 95,
        businessName: 'MJ Digital Design',
        location: 'Park Slope, Brooklyn',
        neighborhoodId: '3',
        verificationStatus: VerificationStatus.VERIFIED
      }
    }
  ]

  for (const userData of users) {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      const firebaseUser = userCredential.user
      
      // Create user document
      const userId = firebaseUser.uid
      const now = Timestamp.now()
      
      const user: User = {
        id: userId,
        email: userData.email,
        role: userData.role,
        createdAt: now.toDate(),
        updatedAt: now.toDate()
      }
      
      await setDoc(doc(db, 'users', userId), user)
      
      // Create user profile
      const profileId = generateId()
      const profile: UserProfile = {
        id: profileId,
        userId,
        firstName: userData.profile.firstName,
        lastName: userData.profile.lastName
      }
      
      await setDoc(doc(db, 'users', userId, 'profile', profileId), profile)
      
      // Create role-specific profile
      if (userData.role === UserRole.ARTIST && userData.artistProfile) {
        const artistProfileId = generateId()
        const artistProfile: ArtistProfile = {
          id: artistProfileId,
          userId,
          skills: userData.artistProfile.skills || [],
          experienceYears: userData.artistProfile.experienceYears,
          hourlyRate: userData.artistProfile.hourlyRate,
          businessName: userData.artistProfile.businessName,
          location: userData.artistProfile.location,
          neighborhoodId: userData.artistProfile.neighborhoodId,
          verificationStatus: userData.artistProfile.verificationStatus || VerificationStatus.UNVERIFIED,
          isOpenToWork: true,
          completedProjects: 0
        }
        
        await setDoc(doc(db, 'users', userId, 'artistProfile', artistProfileId), artistProfile)
      }
      
      if (userData.role === UserRole.CLIENT && userData.clientProfile) {
        const clientProfileId = generateId()
        const clientProfile: ClientProfile = {
          id: clientProfileId,
          userId,
          companyName: userData.clientProfile.companyName,
          companySize: userData.clientProfile.companySize,
          industry: userData.clientProfile.industry,
          location: userData.clientProfile.location,
          neighborhoodId: userData.clientProfile.neighborhoodId
        }
        
        await setDoc(doc(db, 'users', userId, 'clientProfile', clientProfileId), clientProfile)
      }
      
      console.log(`Created user: ${userData.email}`)
    } catch (error) {
      console.error(`Error creating user ${userData.email}:`, error)
    }
  }
}

async function seedGigs() {
  console.log('Seeding gigs...')
  
  // Get a client ID (we'll use the third user we created)
  const clientId = 'sample-client-id' // This would be replaced with actual client ID from created users
  
  const gigs = [
    {
      id: generateId(),
      clientId: clientId,
      title: 'Custom Mural for Tech Office',
      description: 'Looking for a talented muralist to create an inspiring 20x8 foot mural in our DUMBO office space. The design should reflect innovation, collaboration, and Brooklyn\'s creative spirit.',
      category: GigCategory.MURALIST,
      budget: 5000,
      budgetType: 'fixed',
      timeline: '2-3 weeks',
      requirements: ['Portfolio of large-scale murals', 'Experience with office environments', 'Ability to work during business hours'],
      skills: ['Mural Painting', 'Wall Art', 'Color Theory', 'Concept Development'],
      location: 'DUMBO, Brooklyn',
      isRemote: false,
      neighborhoodId: '2',
      status: GigStatus.OPEN,
      featured: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      deadline: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // 30 days from now
    },
    {
      id: generateId(),
      clientId: clientId,
      title: 'Brand Identity Design',
      description: 'Seeking a graphic designer to create a complete brand identity for our sustainable fashion startup. Need logo, business cards, and brand guidelines.',
      category: GigCategory.GRAPHIC_DESIGNER,
      budget: 2500,
      budgetType: 'fixed',
      timeline: '2 weeks',
      requirements: ['Strong portfolio in brand identity', 'Experience with sustainable/eco brands preferred'],
      skills: ['Logo Design', 'Brand Identity', 'Adobe Creative Suite', 'Typography'],
      location: 'Brooklyn (Remote OK)',
      isRemote: true,
      neighborhoodId: '3',
      status: GigStatus.OPEN,
      featured: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      deadline: Timestamp.fromDate(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)) // 21 days from now
    }
  ]
  
  for (const gigData of gigs) {
    await setDoc(doc(db, 'gigs', gigData.id), gigData)
  }
  
  console.log(`Seeded ${gigs.length} gigs`)
}

async function main() {
  try {
    console.log('Starting Firebase seed...')
    
    await seedNeighborhoods()
    await seedUsers()
    await seedGigs()
    
    console.log('Firebase seed completed successfully!')
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

main()
