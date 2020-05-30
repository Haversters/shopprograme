<template>
  <el-container v-loading="loading">
    <el-main>
      <div style>
        <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
          <template slot="prepend">筛选</template>
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" sortable prop="date" label="PO" width></el-table-column>
        <el-table-column align="center" prop="date" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="name" label="采购价" width></el-table-column>
        <el-table-column align="center" prop="address" label="重量"></el-table-column>
        <el-table-column align="center" prop="address" label="海运预估利润 "></el-table-column>
        <el-table-column align="center" prop="address" label="空运预估利润"></el-table-column>
        <el-table-column align="center" prop="address" label="shipment ID"></el-table-column>
        <el-table-column align="center" prop="address" label="invoice"></el-table-column>
        <el-table-column align="center" prop="address" label="发票付款金额 "></el-table-column>
        <el-table-column align="center" prop="address" label="是否已经付全款"></el-table-column>
        <el-table-column align="center" prop="address" label="Amazon接收的到货数量"></el-table-column>
        <el-table-column align="center" prop="address" label="备注"></el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <el-button size="mini" type="danger" @click="handleDelete(11, 111)">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Chargeback",
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
      imgsrc: require("../assets/logo.png")
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
  },
  mounted(){
    const _this=this;
       this.$fetch('/api/admin/index/index')
      .then((response) => {
        console.log(111)
        console.log(response)
        console.log(_this.$store.state.user_data)
      })
  },
  methods: {
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$router.push({ path: "/editor" });
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
</style>