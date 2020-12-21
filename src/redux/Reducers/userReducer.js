import { SET_CURRENT_USER, SIGN_IN_SUCCESS } from '../Types'

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case SIGN_IN_SUCCESS: 
            return {
                ...state,
                signInSuccess: action.payload,
            }
        default: 
            return state
    }
}