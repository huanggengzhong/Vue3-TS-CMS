import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globelRegister } from './globel'

console.log(process.env.VUE_APP_BASE_URL, 'VUE_APP_BASE_URL')

createApp(App).use(globelRegister).use(store).use(router).mount('#app')
