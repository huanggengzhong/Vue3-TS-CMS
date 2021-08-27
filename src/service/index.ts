import HYRequest from '@/service/request'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //请求和响应拦截
    requestInterceptor: (config) => {
      const token = ''
      if (token) {
        config.headers.Authorization = `Bear ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hyRequest
