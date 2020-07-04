import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login'; //登录页面
import home from '@/views/home/index';
import chargeback from '@/components/chargeback/chargeback'; //chargeback
import chargebackEditor from '@/components/chargeback/chargebackEditor'; //chargeback编辑页面
import chargebackAdd from '@/components/chargeback/chargebackAdd'; //chargeback新增
import order from '@/components/order'; //PO订单页面
import editor from '@/components/editor/editor'; //PO订单编辑
import orderAdd from '@/components/orderAdds/oraderAdds'; //PO订单新增
import orderUpload from '@/components/upload/orderUpload'; //PO订单上传
import logistics from '@/components/logistics/logistics'; //物流管理版块
import logisticsEditor from '@/components/logistics/logisticsEditor'; //物流管理版块编辑
import logisticsAdd from '@/components/logistics/logisticsAdd'; //物流管理版块新增
import finance from '@/components/finance/finance'; //财务管理版块
import financeEditor from '@/components/finance/financeEditor'; ////财务管理版块编辑
import financeAdd from '@/components/finance/financeAdd'; ////财务管理版块新增
import admin from '@/components/admin/admin'; //admin管理版块
import adminEditor from '@/components/admin/adminEditor'; //admin管理编辑
import adminAdd from '@/components/admin/adminAdd'; //admin管理新增
import pay from '@/components/pay/pay'; //pay管理版块
import payEditor from '@/components/pay/payEditor'; //pay管理编辑
import payAdd from '@/components/pay/payAdd'; //pay管理新增
import product from '@/components/product/product'; //product return模块
import productAdd from '@/components/product/productAdd'; //product return模块
import productEditor from '@/components/product/productEditor'; //product return模块
import productUpload from '@/components/upload/productUpload'; //product return模块
import chargebackUpload from '@/components/upload/chargebackUpload'; ////chargeback上传文件
import payUpload from '@/components/upload/payUpload'; ////pay上传文件
import log from '@/components/log/log'; ////log日志
import { Upload } from 'element-ui';
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
				{
					path: '/order/oderAdd',
					name: 'orderAdd',
					component: orderAdd
				},
				// chargeback
				{
					path: '/chargeback',
					name: 'chargeback',
					component: chargeback
				},
				// chargeback编辑
				{
					path: '/chargebackEditor',
					name: 'chargebackEditor',
					component: chargebackEditor
				},
				// chargeback新增
				{
					path: '/chargeback/chargebackAdd',
					name: 'chargebackAdd',
					component: chargebackAdd
				},
				// product
				{
					path: '/product',
					name: 'product',
					component: product
				},
				// product新增
				{
					path: '/product/productAdd',
					name: 'productAdd',
					component: productAdd
				},
				// product编辑
				{
					path: '/product/productEditor',
					name: 'productEditor',
					component: productEditor
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
				// 物流管理版块新增
				{
					path: '/logistics/logisticsAdd',
					name: 'logisticsAdd',
					component: logisticsAdd
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
				// 财务管理版块新增
				{
					path: '/finance/financeAdd',
					name: 'financeAdd',
					component: financeAdd
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
				// admin管理新增
				{
					path: '/admin/adminAdd',
					name: 'adminAdd',
					component: adminAdd
				},
				// 财务支出管理
				{
					path: '/pay',
					name: 'pay',
					component: pay
				},
				// 财务支出管理编辑
				{
					path: '/pay/payEditor',
					name: 'payEditor',
					component: payEditor
				},
				// 财务支出管理新增
				{
					path: '/pay/payAdd',
					name: 'payAdd',
					component: payAdd
				},
				// 财务支出管理上传
				{
					path: '/pay/payUpload',
					name: 'payUpload',
					component: payUpload
				},
				//product文件上传测试
				{
					path: '/product/productUpload',
					name: 'productUpload',
					component: productUpload
				},
				//chargeback文件上传测试
				{
					path: '/chargeback/chargebackUpload',
					name: 'chargebackUpload',
					component: chargebackUpload
				},
				//PO文件上传测试
				{
					path: '/order/orderUpload',
					name: 'orderUpload',
					component: orderUpload
				},
				//Log日志
				{
					path: '/log',
					name: 'log',
					component: log
				}
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
	// console.log(to)
	if (to.path == '/login') {
		next();
	} else {
		let token = localStorage.getItem('user_data');
		//   console.log(token)
		if (token == null || token == '') {
			//   console.log(token)
			next('/login');
		} else {
			next();
		}
	}
});

export default router;
