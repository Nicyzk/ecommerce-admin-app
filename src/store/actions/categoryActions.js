import axios from '../../helpers/axios'
import { categoryActionTypes } from './actionTypes'

const getAllCategories = () => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.GET_ALL_CATEGORIES_REQUEST
        })
        const res = await axios.get('/category/getcategories')
        if (res.status === 200) {
            const { categoryList } = res.data
            dispatch({
                type: categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
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
        try {
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
                console.log(res)
                // dispatch({
                //     type: categoryActionTypes.ADD_CATEGORY_FAILURE,
                //     payload: {
                //         error: res.data.error
                //     }
                // })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const updateCategories = (form) => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.UPDATE_CATEGORIES_REQUEST
        })
        const res = await axios.post('/category/updatecategories', form)
        if (res.status === 201) {
            dispatch({
                type: categoryActionTypes.UPDATE_CATEGORIES_SUCCESS
            })
            dispatch(getAllCategories())
        } else {
            const { error } = res.data
            dispatch({
                type: categoryActionTypes.UPDATE_CATEGORIES_FAILURE,
                payload: {
                    error
                }
            })
        }
    }
}


const deleteCategories = (checkedIds) => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.DELETE_CATEGORIES_REQUEST
        })
        const res = await axios.post('/category/delete', checkedIds)
        if (res.status === 200) {
            dispatch({
                type: categoryActionTypes.DELETE_CATEGORIES_SUCCESS
            })
            dispatch(getAllCategories())
        } else {
            const { error } = res.data
            dispatch({
                type: categoryActionTypes.DELETE_CATEGORIES_FAILURE,
                payload: {
                    error
                }
            })
        }
    }
}

export { getAllCategories, addCategory, updateCategories, deleteCategories }