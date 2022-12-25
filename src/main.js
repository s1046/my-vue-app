import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const c = window.cloud
Vue.prototype.cloud = c


new Vue({
  render: h => h(App),
}).$mount('#app')
