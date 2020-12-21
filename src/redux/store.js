import { createStore, applyMiddleware, compose } from 'redux'
import Logger from 'redux-thunk'
import Reducer from './Reducers'

const initialState = {}

export const middleware = [Logger]

export const store = createStore(Reducer, initialState, compose( 
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store