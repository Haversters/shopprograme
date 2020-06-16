<template>
  <el-container v-loading="loading">
    <el-main>
      <div style>
        <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
          <template slot="prepend">筛选</template>
          <el-button slot="append" icon="el-icon-search" @click="getSearch()">搜索</el-button>
        </el-input>
      </div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" sortable prop="id" label="PO" width></el-table-column>
        <el-table-column align="center" prop="person_charge" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="charge_price" label="采购价" width></el-table-column>
        <el-table-column align="center" prop="weight" label="重量"></el-table-column>
        <el-table-column align="center" prop="ocean_profit" label="海运预估利润 "></el-table-column>
        <el-table-column align="center" prop="air_profit" label="空运预估利润"></el-table-column>
        <el-table-column align="center" prop="shipment_id" label="shipment ID"></el-table-column>
        <el-table-column align="center" prop="invoice" label="invoice"></el-table-column>
        <el-table-column align="center" prop="Invoice_payment_amount" label="发票付款金额 "></el-table-column>
        <el-table-column align="center" prop="pay_state" label="是否已经付全款"></el-table-column>
        <el-table-column align="center" prop="received_quantity" label="Amazon接收的到货数量"></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column align="center" prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">编辑</el-button>
          </template>
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
      tableData: [],
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
  mounted() {
    this.getTeamData();
  },
  methods: {
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      console.log(index);
      let urls = "/editor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 获取编辑列表的信息
    getTeamData() {
      const _this = this;
      this.$fetch("/api/admin/index/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data;
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 搜索类型
    getSearch() {
      let urls='/api/admin/index/select?type=po&content='+this.input3
      this.$fetch(urls).then(e => {
        console.log(111);
        console.log(e);
        // if (e.code == 0) {
        //   _this.tableData = e.data;
        // } else {
        //   let messages = e.msg;
        //   this.$message.error(messages);
        // }

        console.log(_this.$store.state.user_data);
      });
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