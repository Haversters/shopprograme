<template>
  <div id="app" class="homeBox">
    <el-container :style="{height:fullHeight + 'px'}">
      <el-aside width="200px" style>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>-->
        <el-menu
          :style="{height:fullHeight + 'px'}"
          @select="selectItems"
          :default-active="navselected"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#33323b"
          text-color="#fff"
          active-text-color="rgb(87, 247, 5)"
          :router="true"
          :collapse="isCollapse"
        >
          <el-menu-item index="0" route="/order">
            <i class="el-icon-menu"></i>
            <span slot="title">PO</span>
          </el-menu-item>
          <el-menu-item index="1" route="/chargeback">
            <i class="el-icon-s-data"></i>
            <span slot="title">chargeback</span>
          </el-menu-item>
          <el-menu-item index="2" route="/product">
            <i class="el-icon-document"></i>
            <span slot="title">Product Return</span>
          </el-menu-item>
          <el-menu-item index="3" route="/logistics">
            <i class="el-icon-shopping-cart-2"></i>
            <span slot="title">物流管理</span>
          </el-menu-item>
          <el-menu-item index="4" route="/finance">
            <i class="el-icon-sell"></i>
            <span slot="title">财务管理</span>
          </el-menu-item>
          <el-menu-item v-if="level==1||level==2" index="5" route="/pay">
            <i class="el-icon-setting"></i>
            <span slot="title">财务支出管理</span>
          </el-menu-item>
          <el-menu-item v-if="level==1" index="6" route="/admin">
            <i class="el-icon-setting"></i>
            <span slot="title">admin管理</span>
          </el-menu-item>
          <el-menu-item v-if="level==1" index="7" route="/log">
            <i class="el-icon-setting"></i>
            <span slot="title">日志</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-header style="height:20px; text-align: right; font-size: 12px">
            <div style="display:flex;flex-direction:row-reverse;">
              <div style="padding:0 8px;padding-right:10px;">
                <i class="el-icon-user-solid"></i>
                <span style="color:#b90707;">{{userName}}</span>
              </div>
              <div @click="loginOut" style="display:flex;justify-content:center;align-items:center;cursor:pointer">
                <i style="color: #606266;font-size: 14px;" class="el-icon-warning"></i>
                <span style="color: #606266;font-size: 14px;padding:0 5px;">退出登录</span>
              </div>
              <!-- <el-button   @click="loginOut" style="margin-left: 5px"> -->
              <!-- </el-button> -->
            </div>
          </el-header>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false, //控制侧边栏的显示
      search: "",
      fullHeight: document.documentElement.clientHeight,
      navselected: "0",
      userName: "",
      level: 3
    };
  },
  mounted() {
    if (this.$store.state.user_data.name) {
      this.userName = this.$store.state.user_data.name;
      this.level = this.$store.state.user_data.level;
    } else {
      this.$router.push({ path: "/login" });
    }
    // this.selectItemss();
    // console.log(this.userName, this.$store.state.user_data.name);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getNavType() {
      this.navselected = this.$store.state.adminleftnavnum;
      // console.log(this.navselected);
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    },
    // 退出登录
    loginOut() {
      const _this = this;
      let urls =
        "/admin/login/checktoken?token=" + this.$store.state.user_data.token;
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          _this.$fetch(urls).then(e => {
            // console.log(e);
            if (e.code == 0) {
              localStorage.removeItem("user_data");
              this.$store.commit("changeLogin", "null");
              let localStorageToken = localStorage.getItem("user_data");
              _this.$message.success("退出登录成功!");
              _this.$router.push({ path: "/login" });
            } else if (e.code == 3) {
              localStorage.removeItem("user_data");
              this.$store.commit("changeLogin", "null");
              let localStorageToken = localStorage.getItem("user_data");
              _this.$message.success("退出登录成功!");
              _this.$router.push({ path: "/login" });
            } else {
              localStorage.removeItem("user_data");
              this.$store.commit("changeLogin", "null");
              let localStorageToken = localStorage.getItem("user_data");
              _this.$message.success("退出登录成功!");
              _this.$router.push({ path: "/login" });
            }
          });
        })
        .catch(() => {
          _this.$message.info("取消退出登录!");
        });
    },
    // 选中验证token
    selectItems(index) {
      // console.log(index);
      //按钮选中之后设置当前的index为store里的值。
      this.$store.state.adminleftnavnum = index;
      //本地token
      let localStorageToken = localStorage.getItem("user_data");
      //设置请求token是否过期
      const _this = this;
      if (
        _this.$store.state.user_data.token == null ||
        localStorageToken == null
      ) {
        this.$message.error("登录已过期，请重新登录");
        this.$router.push({ path: "/login" });
      }
      let tokens = JSON.parse(localStorageToken).token;
      this.$fetch("/admin/login/checktoken", {
        token: tokens
      }).then(e => {
        if (e.code != 0) {
          this.$message.error("登录已过期，请重新登录");
          this.$router.push({ path: "/login" });
        }
      });
    },
    // 刚开始验证
    // 选中验证token
    selectItemss() {
      //本地token
      let localStorageToken = localStorage.getItem("user_data");
      //设置请求token是否过期
      const _this = this;
      let tokens = JSON.parse(localStorageToken).token;
      this.$fetch("/admin/login/checktoken", {
        token: tokens
      }).then(e => {
        if (e.code != 0) {
          this.$message.error("登录已过期，请重新登录");
          localStorage.clear("user_data");
          // console.log(localStorage.getItem("user_data"));
          this.$router.push({ path: "/login" });
        }
      });
    }
  },
  watch: {
    // 监测store.state
    "$store.state.adminleftnavnum": "getNavType"
  }
};
</script>

<style>
.homeBox {
  width: 100%;
  height: 100%;
}
/* .el-container{
    padding-top:20px ;
    box-sizing: border-box;
} */
/* 控制头部字体大小 */
.el-header {
  font-size: 18px !important;
}
.el-icon-setting {
  font-size: 18px;
}
.el-aside {
  /* padding-top: 20px;
  box-sizing: border-box; */
  color: #333;
}
/* 控制侧边栏之间的距离 */
.el-menu-item {
  margin-top: 20px;
  font-size: 18px;
}
.el-menu-vertical-demo {
  /* background-color: #33323b; */
}
</style>
