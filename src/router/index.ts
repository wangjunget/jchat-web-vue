import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/login/login.vue'
import Main from '@/views/main/main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) < 0 && !store.getters.isLogin) {
    return next('/login')
  }
  return next()
})

export default router
