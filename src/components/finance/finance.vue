<template>
  <el-container>
    <el-main>
      <el-table :data="financeData" style="width: 100%" :border="true">
        <el-table-column align="center" prop="accountNumber" label="accountNumber" width></el-table-column>
        <el-table-column align="center" prop="financeCharge" label="financeCharge" width></el-table-column>
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="isEntry" label="isEntry "></el-table-column>
        <el-table-column align="center" prop="transferAmount" label="transferAmount"></el-table-column>
        <el-table-column align="center" prop="transferDate" label="transferDate"></el-table-column>
                  <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <el-button size="mini" type="danger" @click="handleDelete(11, 1211)">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      financeData: [],
      isCollapse: true, //控制侧边栏的显示
      search: "",
      input3: "",
      loading: false //控制加载状态
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "4"; //设置左侧导航2-2 active
  },
  mounted() {
    this.getfinanceData();
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
    // 获取chrgeback列表的信息
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
    }
  }
};
</script>
<style scoped>
</style>