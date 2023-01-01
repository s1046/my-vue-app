// 该文件是专门用于创建整个应用的路由器
 
// 第一步引入插件(本质是一个构造函数)
import VueRouter from 'vue-router'
 
// 引入一下用到的组件 
import Table from '../components/Table'
import Login from '../components/Login'
import Edit from '../components/Edit'
import Daka from '../components/Daka.vue'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

 
// 第二步创建router实例对象并暴露
export default new VueRouter({
    routes: [
        {
            // path是路径
            path: "/",
            //跳转的组件
            component: Login
        },   
        {
            // path是路径
            path: "/table",
            //跳转的组件
            component: Table
        },
        {
            // path是路径
            path: "/edit",
            //跳转的组件
            component: Edit
        },
        {
            // path是路径
            path: "/daka",
            //跳转的组件
            component: Daka
        }        
    ]
})
// 然后去main.js中引入router实例