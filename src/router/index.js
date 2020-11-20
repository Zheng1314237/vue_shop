import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/home',
      name: Home,
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome',
          name: Welcome,
          component: Welcome},
        {
          path: '/users',
          name: Welcome,
          component: Users
        }
      ]
    }
  ]
})

/*
// 挂载结构路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从哪一个路径访问而来
  // next 是否放行('/login') 转向强制登录页面
  if (to.path === '/login') return next
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
*/
export default router
