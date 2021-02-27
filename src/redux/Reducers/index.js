import { combineReducers } from 'redux'
import userReducer from './userReducer'
import showcaseReducer from './showcaseReducer'

export default combineReducers ({
    user: userReducer,
    product: showcaseReducer,
})