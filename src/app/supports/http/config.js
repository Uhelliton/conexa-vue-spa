import axios from 'axios'
import UserStorage from '@/app/domains/users//storage/user-storage'
import { HTTP_RESPONSE } from '../utils/context'
import { $router } from '../../../router/index'

const clientApi = axios.create({
  baseURL: process.env.API_URL
})

// interceptors request
clientApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${UserStorage.getToken()}`
  return config
}, (error) => {
  return Promise.reject(error)
})

// interceptors response
clientApi.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === HTTP_RESPONSE.UNAUTHORIZED) {
    UserStorage.clearSession().then(() => $router.push('/'))
  }
  return Promise.reject(error)
})

export default clientApi
