import axios from 'axios'
import { api } from '../urlConfig'

const token = localStorage.getItem('token')
const instance = axios.create({
    baseURL: api
})

instance.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    console.log(error)
    return Promise.reject(error)
})

export default instance