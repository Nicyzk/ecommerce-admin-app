import { authActionTypes } from '../../actions/actionTypes'

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        picture: ''
    },
    authenticated: false,
    authenticating: false
}

const reducer = (state = initialState, action) => {
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

            }
        case authActionTypes.LOGOUT_REQUEST:
            return {
                ...initialState    
            }
        default: return state
    }
}

export default reducer