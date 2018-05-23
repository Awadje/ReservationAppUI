import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tables from '@/components/tables/Tables'
import TableForm from '@/components/tables/TableForm'
import EditTableForm from '@/components/tables/EditTableForm'
import Reservation from '@/components/reservations/Reservation'
import ReservationOverview from '@/components/reservations/ReservationOverview'
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
      path: '/tableform',
      name: 'TableForm',
      component: TableForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/table/edit/:_id',
      name: 'EditTableForm',
      component: EditTableForm
    },
    {
      path: '/reservation/table/:_id',
      name: 'Reservation',
      component: Reservation,
      meta: { requiresAuth: true }
    },
    {
      path: '/reservations',
      name: 'ReservationOverview',
      component: ReservationOverview,
      meta: { requiresAuth: true }
    }
  ]
})
