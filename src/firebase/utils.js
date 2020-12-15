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
export const handleProfile = async (userAuth, additionalData ) => {
    if (!userAuth) { return } 
    else {
        // Get UID from userAuth (Provided by Google Sign IN) use it to query DB
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        // check if User exist
        const user = await userRef.get()
        if(!user.exists) {
            // if user doesn't exist Use userAuth data to create anew one
            const { displayName, email } = userAuth
            const timestamp = new Date() 

            try {
                // User Creation 
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