import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
