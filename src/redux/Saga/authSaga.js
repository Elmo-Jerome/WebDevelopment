import { authActions } from '../Types'
import { takeLatest, all , call, put } from 'redux-saga/effects'
import { auth, handleProfile, getCurrentUser } from '../../firebase/utils'
import { signInSuccess, displayError } from '../Actions'

export function* getUserDataFromFirebaseDB (userAuth, additionalData) {
    try {
        const userRef = yield call(handleProfile, {userAuth, additionalData})
        const user = yield userRef.get()
        yield put( signInSuccess({
            id: user.id,
            ...user.data(),
        }))
    } catch (err) { console.log(err) } 
} 

// Email Sign
export function*emailSignIn ({ payload: {email, password} }) {
    try {
        console.log('authSaga/emailSignIn')
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getUserDataFromFirebaseDB(user)
    } catch (err) { 
       yield put( displayError({
           code:err.code,
           msg: err.message,
        }))
     }
}
export function* onEmailSignIn () {
    yield takeLatest(authActions.EMAIL_SIGN_IN_START, emailSignIn)
} 

// Sign Up / Register
export function* createUser ({ payload: {email, password, displayName} }) {
    try {
        console.log('authSaga/createUser')
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield getUserDataFromFirebaseDB(user, displayName)
    } catch (err) { console.log(err) }
}
export function* onUserSignUp () {
    yield takeLatest(authActions.SIGN_UP_USER_START, createUser)
}

// Check if user is logged in 
export function* isAuthenticated () {
    try {
        console.log('authSaga/isAuthenticated')
        const user = yield getCurrentUser() 
        if(!user) return 
        yield getUserDataFromFirebaseDB(user)

    } catch (err) { console.log(err) }
}
export function* onCheckUserSession () {
    yield takeLatest(authActions.CHECK_USER_SESSION, isAuthenticated)
} 

export default function* authSaga () {
    yield all([
        call(onEmailSignIn),
        call(onUserSignUp),
        call(onCheckUserSession),
    ])
}