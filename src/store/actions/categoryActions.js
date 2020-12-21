import {} from './actionTypes'
import axios from '../../helpers/axios'
import { categoryActionTypes } from './actionTypes'

const getAllCategories = () => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.GET_ALL_CATEGORIES_REQUEST
        })
        const res = await axios.get('/category/getCategories')
        if (res.status === 200) {
            const { categoryList } = res.data
            dispatch({
                type: categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList}
            })
        } else {
            dispatch({
                type: categoryActionTypes.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

const addCategory = (form) => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.ADD_CATEGORY_REQUEST
        })
        const res = await axios.post('/category/create', form)
        if (res.status === 200) {
            const { category, message } = res.data
            dispatch({
                type: categoryActionTypes.ADD_CATEGORY_SUCCESS,
                payload: {
                    category: category,
                    message: message
                }
            })
        } else {
            dispatch({
                type: categoryActionTypes.ADD_CATEGORY_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

export { getAllCategories, addCategory }