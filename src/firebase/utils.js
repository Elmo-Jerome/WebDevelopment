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

// Store User Credentials
export const handleProfile = async( userAuth, additionalData ) => {
    if(!userAuth) {
        return 
    } else {
        // Use UID to query user data from DB
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        // Check if user exists on DB 
        const user = await userRef.get()

        if (!user.exists) {
            // if user Doesn't exists Create a new instance from gmail given
            const { displayName, email } = userAuth
            const timestamp = new Date()

            try {
                // Instance Creation
                userRef.set({
                    displayName,
                    email,
                    createdAt: timestamp,
                    ...additionalData
                }) 
            } catch(err) {
                console.log(err)
            }
        } return userRef 
    }
}