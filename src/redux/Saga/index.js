import { all, call } from 'redux-saga/effects'
import userSagas from './userSaga'
import authSagas from './authSaga'
import cartSagas from './cartSaga'

export default function* rootSaga() {
    yield all([
       call(authSagas),
       call(cartSagas),
     // call(userSagas),
    ])
}