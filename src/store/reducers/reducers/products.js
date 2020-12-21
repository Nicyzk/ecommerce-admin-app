import { productActionTypes } from '../../actions/actionTypes'

const initialState = {
    laoding: false,
    products: [],
    message: '',
    error: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case productActionTypes.ADD_PRODUCT_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case productActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state, 
                loading: false
            }
        case productActionTypes.ADD_PRODUCT_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}

export default reducer