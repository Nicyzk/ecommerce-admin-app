import { signupActionTypes } from './actionTypes'
import axios from '../../helpers/axios'

const signup = (user) => {
    return async dispatch => {
        dispatch({
            type: signupActionTypes.SIGNUP_REQUEST
        })
        const res = await axios.post('/admin/auth/signup', {
            ...user
        })
        if (res.status === 200) {
            const { message } = res.data
            dispatch({
                type: signupActionTypes.SIGNUP_SUCCESS,
                payload: { message }
            })
        } else {
            //no logic yet
            console.log('failed')
            dispatch({
                type: signupActionTypes.SIGNUP_FAILURE,
                payload: {
                    errorMessage: res.data.errorMessage
                }
            })
        }
    }
}

export { signup }