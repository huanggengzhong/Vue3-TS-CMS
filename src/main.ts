import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globelRegister } from './globel'

createApp(App).use(globelRegister).use(store).use(router).mount('#app')
