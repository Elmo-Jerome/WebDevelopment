import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import Reducer from './Reducers'
import Saga from './Saga'

const initialState = {}

const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk, sagaMiddleware]

const store = createStore(
        Reducer, 
        initialState, 
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
sagaMiddleware.run(Saga)

export default store 