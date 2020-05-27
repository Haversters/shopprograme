import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login'; //登录页面
import home from '@/views/home/index';
import chargeback from '@/components/chargeback';
import order from '@/components/order';//PO订单页面
import editor from '@/components/editor/editor'; //登录页面

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect:"/order",
      children:[{
        path: '/order',
        name: 'order',
        component: order
      },{
        path: '/chargeback',
        name: 'chargeback',
        component: chargeback
      },
      {
        path: '/editor',
        name: 'editor',
        component: editor
      },
    ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/chargeback',
      name: 'chargeback',
      component: chargeback
    },

  ]
})
