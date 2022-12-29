// 该文件是专门用于创建整个应用的路由器
 
// 第一步引入插件(本质是一个构造函数)
import VueRouter from 'vue-router'
 
// 引入一下用到的组件 
import Table from '../components/Table'
import Login from '../components/Login'
import Edit from '../components/Edit'
 
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
        }     
    ]
})
// 然后去main.js中引入router实例