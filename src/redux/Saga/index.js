import { all, call } from 'redux-saga/effects'
import userSagas from './userSaga'
import authSagas from './authSaga'

export default function* rootSaga() {
    yield all([
       call(authSagas),
     // call(userSagas),
    ])
}