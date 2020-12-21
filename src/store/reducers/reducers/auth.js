import { authActionTypes } from '../../actions/actionTypes'

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        picture: ''
    },
    authenticated: false,
    authenticating: false,
    loggingOut: false, 
    error: null,
    message: ''
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case authActionTypes.LOGIN_REQUEST: 
            return {
                ...state,
                authenticating: true
            }
        case authActionTypes.LOGIN_SUCCESS: 
            return {
                ...state,
                token: action.payload.token, 
                user: action.payload.user, 
                authenticating: false,
                authenticated: true
            }
        case authActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                authenticating: false
            }
        case authActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                loggingOut: true
            }
        case authActionTypes.LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        case authActionTypes.LOGOUT_FAILURE:
            return {
                ...state,
                loggingOut: false,
                error: action.payload.error
            }
        default: return state
    }
}

export default reducer