import { showcaseActions } from '../Types'

const INITIAL_STATE = {
    selectedProduct: null,
}

export default  function ShowcaseReducer (state=INITIAL_STATE, action) {
    switch (action.type) {
        case showcaseActions.SELECT_PRODUCT: 
            console.log(action.payload)
            return {
                ...state,
                selectedProduct: action.payload,
            }
        case showcaseActions.CLEAR_SELECTED_PRODUCT: 
            return {
                ...state,
                selectedProduct: null,
            }
        default: return state
    }
}