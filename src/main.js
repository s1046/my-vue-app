import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import global from './Global.vue'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueRouter)

// 第二步: 创建router文件夹 引入实例
import router from './router'

Vue.config.productionTip = false
Vue.prototype.cloud = window.cloud
Vue.prototype.APPID = global.APPID
Vue.prototype.ENVID = global.ENVID



new Vue({
  // 指定容器
  el: '#app',
  // 解析App模板
  render: h => h(App),
  // 使用路由
  router
})