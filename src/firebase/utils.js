import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './config'

// Initialize App
firebase.initializeApp(firebaseConfig)

// Export Auth & Firestore
export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google Auth API
const GoogleAPI = new firebase.auth.GoogleAuthProvider()
GoogleAPI.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(GoogleAPI)

// Store User Credentials / Create User 
export const handleProfile = async (userAuth, additionalData) => {
    if (!userAuth) { return } else {
        // Take uid from userAuth(Google Sign In) to query firestore DB
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        // check if user already exist
        const user = userRef.get()
        // if user doesn't exist, create one using data from google sign in
        if (!user.exist) {
            const { displayName, email } = userAuth
            const timestamp = new Date()
            try {
                // User Creation
                userRef.set({
                    displayName,
                    email,
                    createdAt: timestamp,
                    ...additionalData,
                })
            } catch (err) { console.log(err) }
        } return userRef
    }
}