import axios from '../../helpers/axios'
import { productActionTypes } from './actionTypes'

const addProduct = form => {
    return async dispatch => {
        dispatch({
            type: productActionTypes.ADD_PRODUCT_REQUEST
        })
        const res = await axios.post('/product/create', form)
        if (res.status === 200) {
            dispatch({
                type: productActionTypes.ADD_PRODUCT_SUCCESS
            })    
        } else {
            dispatch({
                type: productActionTypes.ADD_PRODUCT_FAILURE,
                error: res.data.error
            })
        }
    }
}

export { addProduct }