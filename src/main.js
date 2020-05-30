// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
// 引入配置的http请求
import axios from 'axios'
import {post,fetch,patch,put} from '../config/http'

// 定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
// 引入element
import ElementUI, { Form } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 挂载到VUE
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
