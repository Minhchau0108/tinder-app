import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'app-id': '615f7dd4b1bb8cb943bf7861',
  },
})

api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request)
    return request
  },
  function (error) {
    console.log('REQUEST ERROR', error)
  },
)

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response)
    return response
  },
  function (error) {
    return Promise.reject()
  },
)

export default api
