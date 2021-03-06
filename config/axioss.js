//axios-init.js
import axios from 'axios';

// 开发环境
axios.defaults.baseURL = env === 'development' ? '/api' : window.location.protocol + '//' + window.location.host; // 配置axios请求的地址
// 上线
// axios.defaults.baseURL =www.yangyisy.com // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
//配置发送请求前的拦截器 可以设置token信息
axios.interceptors.request.use(
	(config) => {
		// 这里配置全局loading
		if (!/\.json/.test(config.url)) {
			console.log(1111); //$('#screen').show() // 这个div控制loading动画，项目中有对json的请求，所以这里区分是否是json文件
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 配置响应拦截器
axios.interceptors.response.use(
	(res) => {
		console.log(222); //$('#screen').hide() // loading结束
		return Promise.resolve(res.data); // 这里直接返回data, 即接口返回的所有数据
	},
	(error) => {
		//   $('#screen').hide();
		console.log(2222);
		tooltip('', '连接错误！', 'error');
		// 判断是否登录失效，按照实际项目的接口返回状态来判断
		if (error.toString().includes('776')) {
			window.location.href = window.location.origin + '/#/login';
		}
		return Promise.reject(error);
	}
);
export default axios;
