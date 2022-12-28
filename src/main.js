import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueRouter)

// 第二步: 创建router文件夹 引入实例
import router from './router'

Vue.config.productionTip = false

const c = window.cloud
Vue.prototype.cloud = c


new Vue({
  // 指定容器
  el: '#app',
  // 解析App模板
  render: h => h(App),
  // 使用路由
  router
})