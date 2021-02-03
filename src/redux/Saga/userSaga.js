import { CHECK_USER_SESSION, EMAIL_SIGN_IN_START, SIGN_UP_USER_START }  from '../Types'
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { auth,  handleProfile, getCurrentUser } from '../../firebase/utils'
import { signInSuccess } from '../Actions'

export function* getUserDataFromFirestoreDB(userAuth, additionalData) {
    try {
        const userRef = yield call(handleProfile, {userAuth, additionalData})
        const user = yield userRef.get()
        yield put(
            signInSuccess({
                id: user.id,
                ...user.data(),
            })
        )
    } catch (err) { console.log(err) }
}

export function* emailSignIn ({ payload: {email, password} }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
}
export function* onEmailSignIn() {
    yield takeLatest(EMAIL_SIGN_IN_START, emailSignIn)
}

export function* createUser({ payload: {email, password} }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
}
export function* onUserSignUp() {
    yield takeLatest(SIGN_UP_USER_START, createUser)
}

export function* isAuthenticated () {
    try {
        const user = yield getCurrentUser()
        if(!user) return 
        yield getUserDataFromFirestoreDB(user)
    } catch (err) { console.log(err) }
} 
export function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION, isAuthenticated)
}

export default function* userSaga() {
    yield all([
        call(onEmailSignIn),
        call(onUserSignUp),
        call(onCheckUserSession)
    ])
}