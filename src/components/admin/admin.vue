<template>
  <el-container v-loading="loading">
    <el-main>
      <div style class="topBtn">
        <div>
          <el-button type="info" plain @click="exportLog()">导出日志</el-button>
          <!-- <el-button type="warning" plain>警告按钮</el-button> -->
        </div>
        <div>
          <el-button
            type="primary"
            :disabled="levels!=1"
            plain
            @click="goAddPage('/admin/adminAdd')"
          >添加账户</el-button>
          <!-- <el-button type="success" plain>
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>-->
        </div>
      </div>
      <el-table
        :data="orderData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
        <el-table-column align="center" prop="number" label="账号" width></el-table-column>
        <el-table-column align="center" prop="passwd" label="密码"></el-table-column>
        <el-table-column align="center" prop="level" label="级别 "></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column width="160" align="center" prop label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="levels!=1"
              type="success"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              :disabled="levels!=1"
              type="danger"
              @click="handleDelete(scope.$index,scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="paginations">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="listTotal"
          :page-size="pageSize"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Chargeback",
  data() {
    return {
      orderData: [],
      tableData: [],
      isCollapse: true, //控制侧边栏的显示
      search: "",
      input3: "",
      loading: false, //控制加载状态
      deleteId: "", ///删除数据deleteId
      deleteIndex: "", ///删除数据index
      select: "po", //默认筛选类型
      listTotal: 0,
      pageSize: 7, //显示数据量
      levels: 3,
      isBtn: true
    };
  },
  watch: {
    level(level) {
      if (level == 1) {
        this.isBtn = false;
      } else {
        this.isBtn = true;
      }
    }
  },
  created() {
    this.$store.state.adminleftnavnum = "5"; //设置左侧导航2-2 active
    this.levels = this.$store.state.user_data.level; //获取用户等级
  },
  mounted() {
    this.levels = this.$store.state.user_data.level; //获取用户等级
    this.getTeamData();
  },
  methods: {
    // 控制编辑
    handleEdit(index) {
      console.log(index);
      index = JSON.stringify(index);
      let urls = "/admin/editor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 导出日志
    exportLog() {
      const _this = this;
      let urls =
        "/api/admin/index/delete?" 
      this.$confirm("是否导出日志?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          _this.$fetch(urls).then(e => {
            console.log(111);
            console.log(e);
            if (e.code == 0) {
              _this.orderData.splice(_this.deleteIndex, 1);
              this.$message({
                type: "success",
                message: "导出成功!"
              });
            } else {
              let messages = e.msg;
              this.$message.error(messages);
            }

            console.log(_this.$store.state.user_data);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 搜索选择
    searchselect(e) {
      console.log(e);
      this.select = e;
    },
    // 去往添加页面
    goAddPage(urls) {
      // let urls=''
      // console.log(urls)
      this.$router.push({ path: urls });
    },
    // 删除当前数据
    handleDelete(index, po) {
      this.deleteIndex = index;
      this.deleteId = po;
      this.open();
      console.log(index, po);
    },
    // 删除提示
    open() {
      const _this = this;
      let urls =
        "/api/admin/adminstor/delete?id=" +
        this.deleteId +
        "&level=" +
        this.$store.state.user_data.level;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          _this.$fetch(urls).then(e => {
            console.log(111);
            console.log(e);
            if (e.code == 0) {
              _this.orderData.splice(_this.deleteIndex, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              let messages = e.msg;
              this.$message.error(messages);
            }

            console.log(_this.$store.state.user_data);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取编辑列表的信息
    getTeamData() {
      const _this = this;
      this.$fetch("/api/admin/adminstor/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data.reverse();
          _this.tableData.forEach(function(item, index) {
            if (item.level == 2) {
              item.level = "财务";
            } else if (item.level == 1) {
              item.level = "超级管理员";
              _this.tableData.splice(index, 1);
              console.log(index);
            } else {
              item.level = "普通管理员";
            }
          });
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 搜索类型
    getSearch() {
      let _this = this;
      let urls =
        "/api/admin/index/select?type=" +
        this.select +
        "&content=" +
        this.input3;
      this.$fetch(urls).then(e => {
        console.log(urls);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data;
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 页数发生改变
    pageChange(e) {
      console.log(e);
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.orderData = this.tableData.slice(num1, num2);
      console.log(this.orderData);
    }
  }
};
</script>

<style>
/* 控制搜索栏 */
.input-with-select {
  width: 600px;
  margin-bottom: 20px;
}
/* 分页区域 */
.paginations {
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
}
/* 顶部区域 */
.topBtn {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  border: 1px solid red;
}
</style>