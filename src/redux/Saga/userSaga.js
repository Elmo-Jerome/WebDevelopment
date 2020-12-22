import { EMAIL_SIGN_IN_START, SIGN_UP_USER_START } from '../Types'
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { auth, handleProfile } from '../../firebase/utils'
import { signInSuccess } from '../Actions'

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(handleProfile, { userAuth, additionalData })
        const user = yield userRef.get()
        yield put(
            signInSuccess({
                id: user.id,
                ...user.data()
            })
        )
    } catch (err) { console.log(err) }
}

export function* emailSignIn ({ payload: {email, password} }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (err) { console.log(err) }
}

export function* onEmailSignIn () {
    yield takeLatest(EMAIL_SIGN_IN_START, emailSignIn)
}

export function* createUser ({ payload: {email, password, displayName} }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user, { displayName })
    } catch (err) { console.log(err) }
}

export function* onUserSignUp () {
    yield takeLatest(SIGN_UP_USER_START, createUser)
}

export default  function* userSaga () {
    yield all([call(onEmailSignIn), call(onUserSignUp)])
}