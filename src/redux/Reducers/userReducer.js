import { SIGN_IN_SUCCESS } from '../Types'

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    passwordResetEmailSent: false,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case SIGN_IN_SUCCESS: 
        return {
            ...state,
            currentUser: action.payload
        }
        default: 
            return state
    }
}