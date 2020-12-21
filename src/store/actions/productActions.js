import axios from '../../helpers/axios'
import { productActionTypes } from './actionTypes'

const addProduct = form => {
    return async dispatch => {
        dispatch({
            type: productActionTypes.ADD_PRODUCT_REQUEST
        })
        const res = await axios.post('/product/create', form)
        const { product } = res.data
        if (res.status === 200) {
            dispatch({
                type: productActionTypes.ADD_PRODUCT_SUCCESS,
                payload: {
                    product
                }
            })    
        } else {
            dispatch({
                type: productActionTypes.ADD_PRODUCT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

export { addProduct }