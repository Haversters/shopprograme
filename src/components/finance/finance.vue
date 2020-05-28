<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="date" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="name" label="账号" width></el-table-column>
        <el-table-column align="center" prop="address" label="转款日"></el-table-column>
        <el-table-column align="center" prop="address" label="转单号 "></el-table-column>
        <el-table-column align="center" prop="address" label="转款金额"></el-table-column>
        <el-table-column align="center" prop="address" label="是否入账"></el-table-column>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
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
    this.$store.state.adminleftnavnum = "4"; //设置左侧导航2-2 active
  },
    methods: {
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$router.push({path:'/finance/editor'})
    }
  },
};
</script>
<style scoped>
</style>