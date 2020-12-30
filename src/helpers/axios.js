import axios from 'axios'
import { api } from '../urlConfig'
import store from '../store/store'
import { logout } from '../store/actions/authActions'

const instance = axios.create({
    baseURL: api
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use(res => res, error => {
    const { status } = error.response
    if (status === 400) {
        store.dispatch(logout())
    }
    return Promise.reject(error)
}) 
export default instance