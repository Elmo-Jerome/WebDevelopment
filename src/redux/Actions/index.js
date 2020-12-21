import { SET_CURRENT_USER, SIGN_IN_SUCCESS } from '../Types'
import { auth, handleProfile } from '../../firebase/utils'

export const setCurrentUser = user => dispatch => {
    dispatch ({
        type: SET_CURRENT_USER,
        payload: user
    })
}

export const signInUser = ({ email, password}) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password)  
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: true,
        }) 
    } catch (err) { console.log(err) } 
}

export const createUser = ({email, password, displayName}) => async dispatch => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword( email, password )
        handleProfile(user, {displayName})
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: true,
        })

    } catch (err) {
        console.log(err)
    }
}