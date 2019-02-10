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
import VueQuillEditor from 'vue-quill-editor'
import moment from 'moment'
import ElTreeGrid from 'element-tree-grid'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(Element)
Vue.use(myaxios)
Vue.use(VueQuillEditor)

//注册面包屑导航为全局组件
Vue.component(Mybread.name, Mybread)
Vue.component(ElTreeGrid.name,ElTreeGrid)
Vue.filter('dateformat', function(value) {
  return moment(value).format('YYYY-MM-DD hh:mm:ss')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
