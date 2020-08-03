import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/login/login.vue'
import Main from '@/views/main/main.vue'
import { sessionKeys } from '@/utils/config'
import { SessionService } from '@/utils/storage.service'

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

function isInSession () {
  return SessionService.get(sessionKeys.username) && SessionService.get(sessionKeys.password)
}

router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) < 0 && !isInSession()) {
    return next('/login')
  }
  return next()
})

export default router
