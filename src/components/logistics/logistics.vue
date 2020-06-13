<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="date" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="name" label="发货方式" width></el-table-column>
        <el-table-column align="center" prop="address" label="追踪号"></el-table-column>
        <el-table-column align="center" prop="address" label="转单号 "></el-table-column>
        <el-table-column align="center" prop="address" label="发货重量"></el-table-column>
        <el-table-column align="center" prop="address" label="发货内容"></el-table-column>
        <el-table-column align="center" prop="address" label="运费"></el-table-column>
        <el-table-column align="center" prop="address" label="是否妥投了 "></el-table-column>
        <el-table-column align="center" prop="address" label="备注"></el-table-column>
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
      loading: false, //控制加载状态
      logisticsData:[],//页面数据列表
    };
  },
 created() {
    this.$store.state.adminleftnavnum = "3"; //设置左侧导航2-2 active
  },
  mounted(){
this.getlogisticsData();
  },
    methods: {
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$router.push({path:'/logistics/editor'})
    },
        // 获取chrgeback列表的信息
    getlogisticsData() {
      const _this = this;
      this.$fetch("/api/admin/chargeback/index").then(e => {
        console.log(111);
        console.log(e);
        // if (e.code == 0) {
        //   _this.chargeData = e.data;
        // } else {
        //   let messages = e.msg;
        //   this.$message.error(messages);
        // }

        console.log(_this.$store.state.user_data);
      });
    },
  },
};
</script>
<style scoped>
</style>