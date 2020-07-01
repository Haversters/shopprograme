import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let user_datas=JSON.parse(localStorage.getItem('user_data'));
const state = {
    count: 0,
    adminleftnavnum:"/",  //管理后台左侧导航
    user_data:user_datas,  //存取本地信息到vuex
}
const mutations = {
    increment (state) {
        state.count++
    },
    changeLogin(state,user_datas){
        state.user_data=user_datas;
    }
}
// const actions = {...}
//注册Store
export default new Vuex.Store({
    state,
    mutations
});
