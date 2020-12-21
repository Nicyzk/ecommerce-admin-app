import { authActionTypes } from './actionTypes'
import axios from '../../helpers/axios'

const login = (user) => {
    return async dispatch => {
        dispatch({
            type: authActionTypes.LOGIN_REQUEST
        })
        const res = await axios.post('/auth/admin/signin', {
            ...user
        })
        if (res.status === 200) {
            const {token, user} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authActionTypes.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            //no logic yet
            dispatch({
                type: authActionTypes.LOGIN_FAILURE,
                payload: {
                    errorMessage: res.data.errorMessage
                }
            })
        }
    }
}

const isUserLoggedIn = () => {
    return dispatch => {
        const token = window.localStorage.getItem('token')
        const user = JSON.parse(window.localStorage.getItem('user'))
        if (token) {
            dispatch({
                type: authActionTypes.LOGIN_SUCCESS,
                payload: {
                    token, 
                    user
                }
            })
        } else {
            //no logic yet
            dispatch({
                type: authActionTypes.LOGIN_FAILURE,
                payload: {
                    message: "User needs to log in"
                }
            })
        }
    }
}

const logout = () => {
    return async dispatch => {
        dispatch({
            type: authActionTypes.LOGIN_REQUEST
        })
        const res = await axios.post('/auth/admin/signout')
        if (res.status === 200) {
            localStorage.clear()
            dispatch({
                type: authActionTypes.LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: authActionTypes.LOGOUT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}

export { login, isUserLoggedIn, logout }