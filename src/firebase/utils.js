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
export const GoogleAPI = new firebase.auth.GoogleAuthProvider()
GoogleAPI.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = async() => auth.signInWithPopup(GoogleAPI)

// Store User Credentials / Create New User
export const handleProfile = async ({userAuth, additionalData}) => {
    if (!userAuth) { return } else {
        // Take UI from userAuth ( Google Sign In ) 
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        // Check if user exists
        const user = await userRef.get()
        if(!user.exists) {
            // Create user if user doesn't exist
            const { displayName, email } = userAuth
            const timestamp = new Date() 
            try {
                // Create user 
                userRef.set({
                    displayName,
                    email,
                    createdAt: timestamp,
                    ...additionalData
                })
            } catch (err) { console.log(err) }
        } return userRef
    }
}

export const getCurrentUser = () => {
    return new Promise ((resolve, reject) => {
        const unsub = auth.onAuthStateChanged(user => {
            unsub()
            resolve(user)
        }, reject)
    })
}
