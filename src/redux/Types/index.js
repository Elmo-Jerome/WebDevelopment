export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const PASSWORD_RESET_EMAIL_SENT = 'PASSWORD_RESET_EMAIL_SENT'

// Saga types
export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START'
export const SIGN_UP_USER_START = 'SIGN_UP_USER_START'
export const CHECK_USER_SESSION = 'CHECK_USER_SESSION'

export const authActions = {
    EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START', // Initiates firebase auth sign-in
    SIGN_UP_USER_START: 'SIGN_UP_USER_START', // Initiates firebase auth sign-up
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS', // Carries user object from db
    CHECK_USER_SESSION: 'CHECK_USER_SESSION', // Checks auth state from firebase Db
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR', // Carries Error from authentication
}