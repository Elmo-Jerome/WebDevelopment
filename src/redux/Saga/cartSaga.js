import { cartActions } from '../Types'
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { firestore } from '../../firebase/utils'


export function* addItem ({ payload: {product, currentUser} }) {
    try {
        yield console.log(product)
        const collectionRef = firestore.collection(`users/${currentUser.id}/cart`)
        collectionRef.add({...product})
    } catch (err) { console.log(err) }
}
export function* onAddItem () {
    yield takeLatest(cartActions.ADD_ITEM_START, addItem)
}

export default function* cartSaga () {
    yield all([
        call(onAddItem),
    ])
}
