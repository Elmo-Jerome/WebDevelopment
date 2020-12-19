import { Store } from '@material-ui/icons'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Reducer from './Reducers'

const initialState = {}

export const middleware = [thunk]

export const store = createStore(Reducer, initialState, applyMiddleware(...middleware))

export default store