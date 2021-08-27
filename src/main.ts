import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globelRegister } from './globel'
import hyRequest from '@/service'

createApp(App).use(globelRegister).use(store).use(router).mount('#app')

//接口测试
hyRequest.request({
  url: '/home/multidata',
  method: 'GET',
  headers: {},
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      config.headers['token'] = '123'
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独响应的response')
      return res
    }
  }
})
