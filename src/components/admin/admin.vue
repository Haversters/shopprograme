<template>
  <el-container>
    <el-main>
      <el-table :data="adminData" style="width: 100%" :border="true">
        <el-table-column align="center" prop="date" label="账号" width></el-table-column>
        <el-table-column align="center" prop="name" label="登录ID" width></el-table-column>
        <el-table-column align="center" prop="address" label="密码"></el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, tableData)">删除</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, 22)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      adminData: [],
      isCollapse: true, //控制侧边栏的显示
      search: "",
      input3: "",
      loading: false //控制加载状态
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "5"; //设置左侧导航2-2 active
  },
  methods: {
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$router.push({ path: "/finance/editor" });
    },
    getfinanceData() {
      const _this = this;
      this.$fetch("/api/admin/finance/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 6) {
          _this.financeData = e.data;
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 删除当前
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }
};
</script>
<style scoped>
</style>