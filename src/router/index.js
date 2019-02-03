import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/pages/home.vue'
import User from '@/components/pages/users/users.vue'
import Roles from '@/components/pages/roles/roles.vue'
import Rights from '@/components/pages/rights/rights.vue'

Vue.use(Router) 

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path : '/users' , component: User},
        { path : '/roles' , component: Roles},
        { path : '/rights' , component: Rights},
      ]
    }
  ]
})
