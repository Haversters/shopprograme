import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import erpChargeback from '@/components/chargeback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chargeback',
      name: 'erpChargeback',
      component: erpChargeback
    }
  ]
})
