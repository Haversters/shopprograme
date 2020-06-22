import axios from 'axios';
import { Message } from 'element-ui';
import store from '../src/vuex/store'; //请求store数据
import baseURLs from '../config/baseUrl'
import router from '../src/router/index'
import qs from 'qs'
axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseURLs.serverUrl;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
//http request 拦截器
// console.log(store.state.user_data,11111)
axios.interceptors.request.use(
  config => {
    // console.log(config)
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response,store.state.user_data)
    if(store.state.user_data==null){
      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
      })
    }
    // if (response.data.errCode == 2) {
    //   router.push({
    //     path: "/login",
    //     query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
    //   })
    // }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装公共请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
// export function http(url,methods,param={}){
//   return new Promise((resolve,reject)=>{
//     axios({
//       method:methods,

//     })
//   })
// }


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
//  封装所有请求


/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}