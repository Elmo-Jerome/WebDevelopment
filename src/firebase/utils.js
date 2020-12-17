import firebase from 'firebase'
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
GoogleAPI.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(GoogleAPI)


// Store Credentials / Create New Users
export const handleProfile = async (userAuth, additionalData) => {
    if (!userAuth) { return }
    else {
        // Take UID from userAuth( from Google Sign-in) to query DB
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        // check if User exists
        const user = await userRef.get()

        if (!user.exists) {
            // If user doesn't exists create new one using data from userAuth(Google Sign in)
            const { displayName, email } = userAuth
            const timestamp = new Date()

            try {
                // user Creation 
                userRef.set({
                    displayName,
                    email,
                    createdAt: timestamp,
                    ...additionalData
                })
            } catch (err) {
                console.log(err)
            }
        } return userRef
    }
}

