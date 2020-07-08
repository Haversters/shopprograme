import axios from "axios";
import store from '../../vuex/store'; //请求store数据
import http from '../../../config/http.js'
import routers from '../../router/index'

export default {
    checkLogins: async function(callback){
        let localStorageToken = localStorage.getItem("user_data").token;
        let token=store.state.user_data.token
        let urls="/admin/login/checktoken?token=" +token
         axios({
            method: "get",
            url: urls
          }).then(function(e) {
              // console.log(e.data)
              if(e.data.code!=0){
                routers.push('/login')
              } else{
                //   console.log(1212212)
              }
            //   return(e.data)
          })

        // console.log(http.fentchs())

        //  var lo=await http.fetchs(urls)
        //  if(lo){
        //      if(callback){
        //         callback(lo);
        //      }
        //  }



        // let loo=lo
        // //   console.log(e,22);
        // return loo
    }
}