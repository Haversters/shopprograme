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
            <i class="el-icon-sold-out"></i>
            <span slot="title">PO</span>
          </el-menu-item>
          <el-menu-item index="1" route="/chargeback">
            <i class="el-icon-document"></i>
            <span slot="title">chargeback</span>
          </el-menu-item>
          <el-menu-item index="2" route="/editor">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="3" route="/logistics">
            <i class="el-icon-setting"></i>
            <span slot="title">物流管理</span>
          </el-menu-item>
          <el-menu-item index="4" route="/finance">
            <i class="el-icon-setting"></i>
            <span slot="title">财务管理</span>
          </el-menu-item>
          <el-menu-item index="5" route="/admin">
            <i class="el-icon-setting"></i>
            <span slot="title">admin管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-header style="height:20px; text-align: right; font-size: 12px">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 5px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出</el-dropdown-item>
                <!-- <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{userName}}</span>
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
      userName:'',
    };
  },
  mounted(){
 this.userName=this.$store.state.user_data.name
 console.log(this.userName,this.$store.state.user_data.name)
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
      console.log(this.navselected);
      //store.state.adminleftnavnum里值变化的时候，设置navselected
    },
    selectItems(index) {
      console.log(index);
      //按钮选中之后设置当前的index为store里的值。
      this.$store.state.adminleftnavnum = index;
      //设置请求token是否过期
      const _this=this;
      console.log(_this.$store.state.user_data)
       this.$fetch('/api/admin/login/checktoken',{'token':_this.$store.state.user_data.token})
      .then((e) => {
        if(e.code!=4){
          this.$message.error('登录已过期，请重新登录');
          this.$router.push({ path: "/login" })
        }
      })
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
