
'use client'

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  updateProfile,
  User as FirebaseUser 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { User, UserRole } from './firebase-types'

export async function signUp(
  email: string, 
  password: string, 
  role: UserRole, 
  firstName?: string, 
  lastName?: string
): Promise<FirebaseUser> {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update display name if provided
    if (firstName && lastName) {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      })
    }

    // Create user document in Firestore
    const userData: Omit<User, 'id'> = {
      email: user.email!,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await setDoc(doc(db, 'users', user.uid), userData)

    // Create user profile document
    if (firstName || lastName) {
      const profileData = {
        userId: user.uid,
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await setDoc(doc(db, 'user_profiles', user.uid), profileData)
    }

    return user
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account')
  }
}

export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message || 'Invalid email or password')
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out')
  }
}

// Export signOut for backward compatibility
export const signOut = signOutUser

export async function getCurrentUser(): Promise<User | null> {
  const currentUser = auth.currentUser
  if (!currentUser) return null

  try {
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User
    }
    return null
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
