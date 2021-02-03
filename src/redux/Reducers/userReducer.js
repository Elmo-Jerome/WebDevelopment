import { SIGN_IN_SUCCESS, PASSWORD_RESET_EMAIL_SENT, authActions } from '../Types'

const INITIAL_STATE = {
    currentUser: null,
    passwordResetEmailSent: false,
    authError: null,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SIGN_IN_SUCCESS: 
            return {
                ...state,
                authError: null,
                currentUser: action.payload,
            }
        case PASSWORD_RESET_EMAIL_SENT: 
            return {
                ...state,
                passwordResetEmailSent: action.payload,
                authError: null,
            }
        case authActions.AUTHENTICATION_ERROR: 
            return {
                ...state,
                authError: action.payload,
            }
        default: 
            return state
    }
}