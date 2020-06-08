import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login'; //登录页面
import home from '@/views/home/index';
import chargeback from '@/components/chargeback/chargeback';
import order from '@/components/order'; //PO订单页面
import editor from '@/components/editor/editor'; //PO订单编辑
import logistics from '@/components/logistics/logistics'; //物流管理版块
import logisticsEditor from '@/components/logistics/logisticsEditor'; //物流管理版块编辑
import finance from '@/components/finance/finance'; //物流管理版块
import financeEditor from '@/components/finance/financeEditor'; //物流管理版块编辑
import admin from '@/components/admin/admin'; //admin管理版块
import adminEditor from '@/components/admin/adminEditor'; //admin管理编辑
Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: home,
			redirect: '/order',
			children: [
				{
					path: '/order',
					name: 'order',
					component: order
				},
				// chargeback
				{
					path: '/chargeback',
					name: 'chargeback',
					component: chargeback
				},
				// po订单编辑
				{
					path: '/editor',
					name: 'editor',
					component: editor
				},
				// 物流管理版块
				{
					path: '/logistics',
					name: 'logistics',
					component: logistics
				},
				// 物流管理版块编辑
				{
					path: '/logistics/editor',
					name: 'logisticsEditor',
					component: logisticsEditor
				},
				// 财务管理版块
				{
					path: '/finance',
					name: 'finance',
					component: finance
				},
				// 财务管理版块编辑
				{
					path: '/finance/editor',
					name: 'financeEditor',
					component: financeEditor
				},
				// admin管理
				{
					path: '/admin',
					name: 'admin',
					component: admin
				},
				// admin管理编辑
				{
					path: '/admin/editor',
					name: 'adminEditor',
					component: adminEditor
				},
			]
		},
		{
			path: '/login',
			name: 'login',
			component: login
		}
	]
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
	console.log(to)
	if (to.path == '/login') {
	  next();
	} else {
	  let token = localStorage.getItem('user_data');
	  console.log(token)
	  if (token == null || token == '') {
		  console.log(token)
		next('/login');
	  } else {
		next();
	  }
	}
  });
   
  export default router;