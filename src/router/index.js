import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Shopcart = () => import('views/shopcart/Shopcart.vue')
const Profile = () => import('views/profile/Profile.vue')

// 1、导入插件
Vue.use(VueRouter)

// 2、创建路由实例

const routes = [
  {path: '', redirect: '/home'},
  {path: '/home', component: Home},
  {path: '/category', component: Category},
  {path: '/shopcart', component: Shopcart},
  {path: '/profile', component: Profile},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3、将路由对象导出
export default router