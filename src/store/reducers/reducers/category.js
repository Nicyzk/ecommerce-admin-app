import { categoryActionTypes } from '../../actions/actionTypes'

const initialState = {
    loading: false,
    message: '',
    error: null,
    categories: []
}

const updateCategories = (categories, category) => {
    let list = []
    for (let cat of categories) {
        list.push({
            ...cat,
            children: cat.children.length > 0 ? updateCategories(cat.children, category) : []
        })
    }
    if (categories[0].parentId && categories[0].parentId === category.parentId) {
        list.push({
            ...category
        })
    }
    return list
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryActionTypes.GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
        case categoryActionTypes.GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case categoryActionTypes.ADD_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryActionTypes.ADD_CATEGORY_SUCCESS:
            const updatedCategory = updateCategories(state.categories, action.payload.category)
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                categories: updatedCategory
            }
        case categoryActionTypes.ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}

export default reducer