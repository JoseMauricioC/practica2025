// import Axios, { type AxiosInstance } from 'axios'

// // const axios = Axios.create({
// //   baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
// //   headers: { 'Content-type': 'application/json' },
// // })

// // export default axios
// const axios: AxiosInstance = Axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
//   headers: {
//     'Content-type': 'application/json',
//     Authorization: 'Bearer token',
//   },
// })

import Axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/index'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
})

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (config.headers) {
    config.headers['Content-type'] = 'application/json'
    config.headers['Authorization'] = 'Bearer ' + authStore.token
  }
  return config
})

export default axios
