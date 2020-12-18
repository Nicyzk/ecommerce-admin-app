import { signupActionTypes } from '../../actions/actionTypes'

const initialState = {
    errorMessage: '',
    message: '',
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case signupActionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case signupActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false, 
                message: action.payload.message
            }
        case signupActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.errorMessage
            }
        default: return state
    }
}

export default reducer