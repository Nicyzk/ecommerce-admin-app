import { productActionTypes, categoryActionTypes } from './actionTypes'
import axios from '../../helpers/axios'

const getInitialData = () => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.GET_ALL_CATEGORIES_REQUEST
        })
        const res = await axios.post('/admin/initialdata')
        if (res.status === 200) {
            const { categoryList, products } = res.data
            dispatch({
                type: categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
            dispatch({
                type: productActionTypes.GET_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })
        }
    }
}

export { getInitialData }