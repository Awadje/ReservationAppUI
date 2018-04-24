import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tables from '@/components/tables/Tables'
import Reservation from '@/components/reservations/Reservation'
import Login from '@/components/Login'
import AuthBase from '@/components/AuthBase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'AuthBase',
      component: AuthBase,
      children: [
        {
          name: 'Login',
          path: 'login',
          meta: { requiresAuth: false },
          component: Login
        }
      ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { requiresAuth: true }
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
      meta: { requiresAuth: true }
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation,
      meta: { requiresAuth: true }
    }
  ]
})
