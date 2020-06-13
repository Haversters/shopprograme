<template>
  <div class="cms_login">
    <div class="cms_login_container">
      <div class="cms_login_text">欢迎登录沐瑾汐个人门户网站后台</div>
      <div class="cms_login_table">
        <form action>
          <div class="divBox">
            <span class="margin_right10">账号</span>
            <input type="number" placeholder="请输入账号" v-model="userName" class="cms_login_ipt" />
          </div>
          <div class="divBox">
            <span class="margin_right10">密码</span>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="userPassword"
              class="cms_login_ipt"
              maxlength="16"
            />
          </div>
          <div class="divBox margin_top60">
            <button class="login_btn" @click="clickLogin()">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPassword: "",
    };
  },
  mounted(){
 console.log(localStorage.getItem('user_data'))
  },
  methods: {
    clickLogin() {
      let _this = this;
      if (this.userName) {
        if (this.userPassword) {
          this.$fetch("/api/admin/login/userlogin", {
            number: _this.userName,
            passwd: _this.userPassword
          }).then(e => {
            console.log(e);
           localStorage.setItem("user_data",JSON.stringify(e.data));       
           this.$store.state.user_data=e.data   
            console.log(localStorage.getItem('user_data'))
            if(e.code==0){
              this.$router.push({path:'/order'})
            }else{
              _this.loginFalse();
            }
            // console.log(_this.$store.state.user_data);
          });
        } else {
          _this.loginInfo('请输入密码');
        }
      } else {
        _this.loginInfo('请输入账号');
      }

      // console.log(this.userName, this.userPassword);
      // // this.$router.push({path:'/'})
      // const _this=this
      // localStorage.setItem("user_datas",JSON.stringify({'userNamess':_this.userName,'userPasswordss':_this.userPassword}));
      //  console.log(JSON.parse(localStorage.getItem('user_datas')))
      //      this.$router.push({path:'/'})
    },
    // 登录提示信息
    loginInfo(message) {
      this.$message({
        message: message,
        type: "warning"
      });
    },
    // 登录报错
    loginFalse() {
      console.log(122121);
      this.$message.error("登录失败");
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

.cms_login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-image: url("/static/image/04.jpg");
  background-size: 100% 100%;
}

.cms_login_container {
  width: 600px;
  height: 360px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px #ccc;
  background-color: #fff;
  margin: auto;
  opacity: 0.8;
}

.cms_login_text {
  height: 100px;
  width: 100%;
  line-height: 80px;
  text-align: center;
  font-size: 30px;
}

.cms_login_table {
  font-size: 18px;
}

/* 统一盒子样式 */
.divBox {
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
}

.cms_login_ipt {
  height: 30px;
  width: 290px;
  padding-left: 5px;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-radius: 5px;
  outline: none;
  border: 2px solid #66afe9;
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.margin_right10 {
  margin-right: 10px;
}

.margin_top60 {
  margin-top: 60px;
}

.login_btn {
  width: 360px;
  height: 100%;
  background-color: #1360a7;
  border-radius: 10px;
  outline: none;
  font-size: 24px;
  color: white;
  letter-spacing: 24px;
}

.login_btn:hover {
  background-color: #1e5d5d;
}
</style>