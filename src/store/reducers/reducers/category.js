import { categoryActionTypes } from '../../actions/actionTypes'

const initialState = {
    loading: false,
    message: '',
    error: null,
    categories: []
}

const updateCategories = (categories, category) => {
    let list = []

    if (!category.parentId) {
        return [
            ...categories,
            category
        ]
    }

    for (let cat of categories) {
        if (cat.id === category.parentId) {
            const newCategory = {
                id: category.id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                parentId: category.parentId,
                children: []
            }
            list.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            list.push({
                ...cat,
                children: cat.children.length > 0 ? updateCategories(cat.children, category) : []
            })
        }
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
        case categoryActionTypes.UPDATE_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryActionTypes.UPDATE_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case categoryActionTypes.UPDATE_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case categoryActionTypes.DELETE_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryActionTypes.DELETE_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case categoryActionTypes.DELETE_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}

export default reducer