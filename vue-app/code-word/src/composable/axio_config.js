import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

api.interceptors.request.use(
    (config) => {
        config.headers.authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc2OTE4MjM3LCJleHAiOjE3Nzc1MjMwMzd9.ZdOCMTlYBC_w3VxBKS_hqYjCykVlKfEQ8QN-Z2q_nGU'
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api