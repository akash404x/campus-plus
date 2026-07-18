import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut as firebaseSignOut, onAuthStateChanged, User, browserLocalPersistence, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth'
import { getFirestore, Firestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { getMessaging, Messaging } from 'firebase/messaging'
import { getDatabase, Database } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
)

const mockAuthStorageKey = 'campus-plus-demo-user'

const getStoredMockUser = (): Partial<User> | null => {
  if (typeof window === 'undefined') return null

  try {
    const storedValue = window.localStorage.getItem(mockAuthStorageKey)
    if (!storedValue) return null
    return JSON.parse(storedValue) as Partial<User>
  } catch {
    return null
  }
}

const persistMockUser = (user: Partial<User> | null) => {
  if (typeof window === 'undefined') return

  if (!user) {
    window.localStorage.removeItem(mockAuthStorageKey)
    return
  }

  window.localStorage.setItem(mockAuthStorageKey, JSON.stringify(user))
}

const createMockUser = (email: string, displayName?: string, provider: 'email' | 'google' = 'email') => {
  const uid = `mock-${Math.random().toString(36).slice(2, 10)}`
  return {
    uid,
    email,
    displayName: displayName || email.split('@')[0],
    photoURL: '',
    emailVerified: true,
    providerData: [{ providerId: provider === 'google' ? 'google.com' : 'password', uid: email }],
  } as unknown as User
}

const isOfflineOrNetworkError = (error: any) => {
  const message = typeof error?.message === 'string' ? error.message.toLowerCase() : ''

  return (
    error?.code === 'unavailable' ||
    message.includes('offline') ||
    message.includes('network') ||
    message.includes('failed to fetch') ||
    message.includes('client is offline')
  )
}

const isClientOffline = () => typeof navigator !== 'undefined' && navigator.onLine === false

// Initialize Firebase only once (client-side only)
let app: FirebaseApp | undefined
let auth: Auth
let firestore: Firestore
let storage: FirebaseStorage
let messaging: Messaging | null = null
let realtimeDb: Database | null = null

if (typeof window !== 'undefined') {
  if (isFirebaseConfigured) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    auth = getAuth(app)
    firestore = getFirestore(app)
    storage = getStorage(app)

    // Set auth persistence to local
    auth.setPersistence(browserLocalPersistence)

    // Initialize messaging (client-side only)
    if ('serviceWorker' in navigator) {
      try {
        messaging = getMessaging(app)
      } catch (error) {
        console.error('Firebase messaging initialization error:', error)
      }
    }

    // Initialize realtime database
    try {
      realtimeDb = getDatabase(app)
    } catch (error) {
      console.error('Firebase realtime database initialization error:', error)
    }
  } else {
    auth = {} as Auth
    firestore = {} as Firestore
    storage = {} as FirebaseStorage
  }
} else {
  auth = {} as Auth
  firestore = {} as Firestore
  storage = {} as FirebaseStorage
}

export { app, auth, firestore, storage, messaging, realtimeDb }

export type UserRole = 'student' | 'teacher' | 'organizer' | 'admin'

export const ADMIN_EMAILS = ['akashsingh404x@gmail.com']

export const resolveUserRole = (email?: string | null, fallbackRole: UserRole = 'student'): UserRole => {
  if (typeof email === 'string' && ADMIN_EMAILS.includes(email.toLowerCase())) {
    return 'admin'
  }

  return fallbackRole
}

export interface UserProfile {
  uid: string
  displayName?: string
  email: string
  photoURL?: string
  provider: 'google' | 'email' | 'phone'
  role: UserRole
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
  isProfileComplete: boolean
  emailVerified?: boolean
  phone?: string
}

export const googleProvider = new GoogleAuthProvider()

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email: string, password: string, role: UserRole, displayName?: string): Promise<{ user: User | null; error: string | null }> => {
  const effectiveRole = resolveUserRole(email, role)

  if (!isFirebaseConfigured || typeof window === 'undefined') {
    const mockUser = createMockUser(email, displayName, 'email')
    persistMockUser(mockUser)
    return { user: mockUser, error: null }
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user
    
    if (!user) {
      return { user: null, error: 'Failed to create account' }
    }

    if (!isClientOffline()) {
      const userDocRef = doc(firestore, 'users', user.uid)
      try {
        const userDoc = await getDoc(userDocRef)
        
        if (!userDoc.exists()) {
          // Create new user document
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName: displayName || '',
            email: user.email || '',
            photoURL: '',
            provider: 'email' as const,
            role: effectiveRole,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isProfileComplete: false,
            emailVerified: user.emailVerified,
          })
        }
      } catch (firestoreError) {
        if (!isOfflineOrNetworkError(firestoreError)) {
          console.error('User profile sync error:', firestoreError)
        }
      }
    }
    
    return { user, error: null }
  } catch (error: any) {
    console.error('Email sign-up error:', error)
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-in-use') {
      return { user: null, error: 'An account with this email already exists' }
    }
    if (error.code === 'auth/weak-password') {
      return { user: null, error: 'Password should be at least 6 characters' }
    }
    if (error.code === 'auth/invalid-email') {
      return { user: null, error: 'Invalid email address' }
    }
    
    return { user: null, error: error.message || 'Failed to create account' }
  }
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
  const effectiveRole = resolveUserRole(email, 'student')

  if (!isFirebaseConfigured || typeof window === 'undefined') {
    const mockUser = createMockUser(email, email.split('@')[0], 'email')
    persistMockUser(mockUser)
    return { user: mockUser, error: null }
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = result.user
    
    if (!user) {
      return { user: null, error: 'Failed to sign in' }
    }

    if (!isClientOffline()) {
      try {
        // Update last login
        const userDocRef = doc(firestore, 'users', user.uid)
        await updateDoc(userDocRef, {
          role: effectiveRole,
          lastLogin: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      } catch (firestoreError) {
        if (!isOfflineOrNetworkError(firestoreError)) {
          console.error('User profile sync error:', firestoreError)
        }
      }
    }
    
    return { user, error: null }
  } catch (error: any) {
    console.error('Email sign-in error:', error)
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/user-not-found') {
      return { user: null, error: 'No account found with this email' }
    }
    if (error.code === 'auth/wrong-password') {
      return { user: null, error: 'Incorrect password' }
    }
    if (error.code === 'auth/invalid-email') {
      return { user: null, error: 'Invalid email address' }
    }
    
    return { user: null, error: error.message || 'Failed to sign in' }
  }
}

/**
 * Sign in with Google using popup
 * Creates or updates user document in Firestore
 */
export const signInWithGoogle = async (): Promise<{ user: User | null; error: string | null }> => {
  if (!isFirebaseConfigured || typeof window === 'undefined') {
    const mockUser = createMockUser('demo.user@campusplus.dev', 'Demo User', 'google')
    persistMockUser(mockUser)
    return { user: mockUser, error: null }
  }

  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    if (!user) {
      return { user: null, error: 'Failed to sign in with Google' }
    }

    if (!isClientOffline()) {
      const userDocRef = doc(firestore, 'users', user.uid)
      try {
        const userDoc = await getDoc(userDocRef)
        
        if (!userDoc.exists()) {
          // Create new user document
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            provider: 'google' as const,
            role: resolveUserRole(user.email, 'student') as UserRole,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isProfileComplete: false,
            emailVerified: user.emailVerified,
          })
        } else {
          // Update existing user document - only update lastLogin and updatedAt
          await updateDoc(userDocRef, {
            role: resolveUserRole(user.email, 'student') as UserRole,
            lastLogin: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
        }
      } catch (firestoreError) {
        if (!isOfflineOrNetworkError(firestoreError)) {
          console.error('User profile sync error:', firestoreError)
        }
      }
    }
    
    return { user, error: null }
  } catch (error: any) {
    console.error('Google sign-in error:', error)
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/popup-closed-by-user') {
      return { user: null, error: 'Sign-in popup was closed' }
    }
    if (error.code === 'auth/popup-blocked') {
      return { user: null, error: 'Sign-in popup was blocked. Please allow popups for this site.' }
    }
    if (error.code === 'auth/account-exists-with-different-credential') {
      return { user: null, error: 'An account already exists with the same email but different sign-in credentials.' }
    }
    if (error.code === 'auth/cancelled-popup-request') {
      return { user: null, error: 'Sign-in was cancelled' }
    }
    
    return { user: null, error: error.message || 'Failed to sign in with Google' }
  }
}


/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<{ error: string | null }> => {
  if (!isFirebaseConfigured || typeof window === 'undefined') {
    persistMockUser(null)
    return { error: null }
  }

  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    console.error('Sign-out error:', error)
    return { error: error.message || 'Failed to sign out' }
  }
}

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  if (!isFirebaseConfigured || typeof window === 'undefined') {
    return getStoredMockUser() as User | null
  }

  return auth.currentUser
}

/**
 * Listen to auth state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  if (!isFirebaseConfigured || typeof window === 'undefined') {
    const initialUser = getStoredMockUser() as User | null
    callback(initialUser)
    return () => undefined
  }

  return onAuthStateChanged(auth, callback)
}

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!isFirebaseConfigured || typeof window === 'undefined') {
    const cachedUser = getStoredMockUser() as Partial<User> | null
    if (!cachedUser?.email) return null

    return {
      uid,
      displayName: cachedUser.displayName || cachedUser.email?.split('@')[0] || 'Demo User',
      email: cachedUser.email || 'demo.user@campusplus.dev',
      photoURL: cachedUser.photoURL || '',
      provider: 'google',
      role: resolveUserRole(cachedUser.email, 'student'),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
      isProfileComplete: true,
      emailVerified: true,
    }
  }

  try {
    if (isClientOffline()) {
      return null
    }

    const userDoc = await getDoc(doc(firestore, 'users', uid))
    if (userDoc.exists()) {
      const data = userDoc.data() as UserProfile
      return {
        ...data,
        role: resolveUserRole(data.email, data.role),
      }
    }
    return null
  } catch (error) {
    if (!isOfflineOrNetworkError(error)) {
      console.error('Error fetching user profile:', error)
    }
    return null
  }
}

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<{ error: string | null }> => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { error: null }
  } catch (error: any) {
    console.error('Password reset error:', error)
    return { error: error.message || 'Failed to send password reset email' }
  }
}

/**
 * Send OTP for phone authentication
 */
export const sendOtp = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<{ confirmationResult: any; error: string | null }> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    return { confirmationResult, error: null }
  } catch (error: any) {
    console.error('Send OTP error:', error)
    return { confirmationResult: null, error: error.message || 'Failed to send OTP' }
  }
}

/**
 * Verify OTP and create user
 */
export const verifyOtp = async (confirmationResult: any, otp: string, role: UserRole, displayName?: string): Promise<{ user: User | null; error: string | null }> => {
  try {
    const result = await confirmationResult.confirm(otp)
    const user = result.user
    
    if (!user) {
      return { user: null, error: 'Failed to verify OTP' }
    }

    const userDocRef = doc(firestore, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: displayName || '',
        email: user.phoneNumber || '',
        photoURL: '',
        provider: 'phone' as const,
        role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isProfileComplete: false,
        phone: user.phoneNumber,
      })
    } else {
      // Update existing user document
      await updateDoc(userDocRef, {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
    
    return { user, error: null }
  } catch (error: any) {
    console.error('Verify OTP error:', error)
    return { user: null, error: error.message || 'Failed to verify OTP' }
  }
}

