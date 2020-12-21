import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Reducer from './Reducers'

const initialState = {}

export const middleware = [thunk, logger]

export const store = createStore(Reducer, initialState, compose(applyMiddleware(...middleware)))

export default store