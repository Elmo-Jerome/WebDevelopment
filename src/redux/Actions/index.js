import { 
    EMAIL_SIGN_IN_START, 
    SIGN_IN_SUCCESS, 
    SIGN_UP_USER_START, 
    SET_CURRENT_USER, 
    PASSWORD_RESET_EMAIL_SENT } from '../Types'
import { auth } from '../../firebase/utils'

// Saga Actions
export const emailSignInStart = userCreds => ({ 
    type: EMAIL_SIGN_IN_START,
    payload: userCreds,
})

export const signInSuccess = user => ({
    type: SIGN_IN_SUCCESS,
    payload: user
})

export const CreateUser = userCreds => ({
    type: SIGN_UP_USER_START,
    payload: userCreds,
})






// Thunk Actions
export const setCurrentUser = user => dispatch => {
    dispatch ({
        type: SET_CURRENT_USER,
        payload: user
    })
}

// export const signInUser = ({ email, password}) => async dispatch => {
//     try {
//         await auth.signInWithEmailAndPassword(email, password)  
//         dispatch({
//             type: SIGN_IN_SUCCESS,
//             payload: true,
//         }) 
//     } catch (err) { console.log(err) } 
// }

// export const createUser = ({email, password, displayName}) => async dispatch => {
//     try {
//         const { user } = await auth.createUserWithEmailAndPassword( email, password )
//         handleProfile(user, {displayName})
//         dispatch({
//             type: SIGN_IN_SUCCESS,
//             payload: true,
//         })

//     } catch (err) {
//         console.log(err)
//     }
// }

export const logoutUser = () => dispatch => {
    dispatch({
        type: SIGN_IN_SUCCESS,
        payload: false,
    })
}

export const EmailResetPassword = ({ email }) => async (dispatch) => {
    try {
        await auth.sendPasswordResetEmail(email)
        dispatch({
            type: PASSWORD_RESET_EMAIL_SENT,
            payload: true,
        })

    } catch(err) { console.log(err) }
} 