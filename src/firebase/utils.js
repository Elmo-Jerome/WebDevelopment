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

// Store User Credentials / Create New User
export const handleProfile = async (userAuth, additionalData) => {
    if(!userAuth) { return } else {
        // Take UID from userAuth(Google Sign in) to query Firestore DB
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        // check if user exists
        const user = await userRef.get()
        // If user doesn't exist, create one using Google Sign in Data
        if(!user.exists) {
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