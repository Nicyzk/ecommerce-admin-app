import axios from 'axios'
import { api } from '../urlConfig'

const instance = axios.create({
    baseURL: api
})

export default instance