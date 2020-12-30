import axios from '../../helpers/axios'
import { pageActionTypes } from './actionTypes'

const createPage = (form) => {
    return async dispatch => {
        dispatch({
            type: pageActionTypes.CREATE_PAGE_REQUEST
        })
        try {
            const res = await axios.post('/page/create', form)
            if (res.status === 201) {
                const { page } = res.data
                dispatch({
                    type: pageActionTypes.CREATE_PAGE_SUCCESS,
                    payload: {
                        page
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: pageActionTypes.CREATE_PAGE_FAILURE,
                payload: {
                    error
                }
            })
        }
    }
}

export { createPage }