import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import  createSagaMiddleware from 'redux-saga'
import Reducer from './Reducers'
import Saga from './Saga'

const initialState = {}
const sagaMiddleware = createSagaMiddleware()

export const middleware = [thunk, logger, sagaMiddleware]

export const store = createStore(Reducer, initialState, compose(applyMiddleware(...middleware)))
sagaMiddleware.run(Saga)

export default store