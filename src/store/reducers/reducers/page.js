import { pageActionTypes } from '../../actions/actionTypes'

const initialState = {
    loading: false,
    message: '',
    error: null,
    page: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case pageActionTypes.CREATE_PAGE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case pageActionTypes.CREATE_PAGE_SUCCESS:
            return {
                ...state,
                page: action.payload.page,
                loading: false,
            }
        case pageActionTypes.CREATE_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}


export default reducer