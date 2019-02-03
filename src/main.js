// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Mybread from '@/layout/mybread.vue'
import myaxios from '@/assets/js/myaxios.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'

Vue.use(Element)
Vue.use(myaxios)

//注册面包屑导航为全局组件
Vue.component(Mybread.name, Mybread)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
