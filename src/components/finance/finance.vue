<template>
  <el-container v-loading="loading">
    <el-main>
      <div style class="topBtn">
        <div></div>
        <div style="min-width:110px">
          <el-button
            type="primary"
            :disabled="isBtn"
            plain
            @click="goAddPage('/finance/financeAdd')"
          >添加数据</el-button>
        </div>
      </div>
      <el-table
       :stripe="true"
        v-loading="loading"
        :data="orderData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="financeCharge" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="accountNumber" label="账号" width></el-table-column>
        <el-table-column align="center" prop="transferDate" label="转款日"></el-table-column>
        <el-table-column align="center" prop="transferAmount" label="转款金额 "></el-table-column>
        <el-table-column align="center" prop="isEntry" label="是否入账"></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column width="160" align="center" prop label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="isBtn"
              type="success"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              :disabled="isBtn"
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
      loading: true, //控制加载状态
      deleteId: "", ///删除数据deleteId
      deleteIndex: "", ///删除数据index
      select: "po", //默认筛选类型
      listTotal: 0,
      pageSize: 7, //显示数据量
      level: 3,
      isBtn: true
    };
  },
  watch: {
    level(level) {
      if (level == 1 || level == 2) {
        this.isBtn = false;
      } else {
        this.isBtn = true;
      }
    }
  },
  created() {
    this.$store.state.adminleftnavnum = "4"; //设置左侧导航2-2 active
    this.level = this.$store.state.user_data.level;
  },
  mounted() {
    this.level = this.$store.state.user_data.level;
    this.getTeamData();
  },
  methods: {
    // 控制编辑
    handleEdit(index) {
      // console.log(index);
      index = JSON.stringify(index);
      let urls = "/finance/editor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 搜索选择
    searchselect(e) {
      // console.log(e);
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
      // console.log(index, po);
    },
    // 删除提示
    open() {
      const _this = this;
      let urls =
        "/admin/finance/delete?id=" +
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
            // console.log(e);
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
      this.$fetch("/admin/finance/index").then(e => {
        // console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          _this.$message.error(messages);
        }
        _this.loading=false;
      });
    },
    // 搜索类型
    getSearch() {
      let _this = this;
      let urls =
        "/admin/index/select?type=" +
        this.select +
        "&content=" +
        this.input3;
      this.$fetch(urls).then(e => {
        // console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data;
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

      });
    },
    // 页数发生改变
    pageChange(e) {
      // console.log(e);
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.orderData = this.tableData.slice(num1, num2);
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

}
/* 顶部区域 */
.topBtn {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */

}
</style>