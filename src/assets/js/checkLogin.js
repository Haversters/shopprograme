import axios from "axios";
import store from '../../vuex/store'; //请求store数据

export default {
    checkLogins:function(){
        let localStorageToken = localStorage.getItem("user_data").token;
        let token=store.state.user_data.token
        let urls="/api/admin/login/checktoken?token="+token
        //  axios({
        //     method: "get",
        //     url: urls
        //   }).then(function(e) {
        //       console.log(e)
        //     //   return(e)
        //   })
         var lo= axios.get(urls).then(res=>{
            return res.data
          },err=>{
            return (err)
        })
        let loo=lo
        //   console.log(e,22);
        return loo
    }
}