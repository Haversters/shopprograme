<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎5",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
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
    // 删除当前
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  }
};
</script>
<style scoped>
</style>