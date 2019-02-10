import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/pages/home.vue'
import User from '@/components/pages/users/users.vue'
import Roles from '@/components/pages/roles/roles.vue'
import Rights from '@/components/pages/rights/rights.vue'
import Goods from '@/components/pages/goods/good.vue'
import GoodsAdd from '@/components/pages/goods/add.vue'
import Categories from '@/components/pages/categories/categories.vue'
import Orders from '@/components/pages/orders/orders.vue'

import { Message } from 'element-ui'

Vue.use(Router) 

var router = new Router({
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
        { path: '/good', component: Goods},
        { path: '/goods/add', component: GoodsAdd },
        { path: '/categories', component: Categories },
        { path: '/orders', component: Orders }
      ]
    }
  ]
})

// 添加一个全局前置守卫(当路由发生改变时会执行)
router.beforeEach((to, from, next) => {
  // 当请求 login 时不应该验证
  if (to.path !== '/login') {
    // 验证 Localstorage 中是否存在 token
    var token = window.localStorage.getItem('token')
    if (!token) {
      // 跳转到登录页面
      router.push('/login')
      Message.error('您还没有登录，请登录')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router