<template>
  <el-container>
    <el-main>
      <div style>
        1111
        <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
          <template slot="prepend">筛选</template>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="chargeData" style="width: 100%" :border="true">
        <el-table-column align="center" sortable prop="ASIN" label="ASIN" width></el-table-column>
        <el-table-column align="center" prop="ChargebackID" label="Chargeback_ID" width></el-table-column>
        <el-table-column align="center" prop="Chargebacktype" label="Chargeback_type" width></el-table-column>
        <el-table-column align="center" prop="Creationdate" label="Creationdate"></el-table-column>
        <el-table-column align="center" prop="Financial_charge" label="Financial_charge "></el-table-column>
        <el-table-column align="center" prop="Financialcharge" label="Financialcharge "></el-table-column>
        <el-table-column align="center" prop="IssueID" label="Issue_ID"></el-table-column>
        <el-table-column align="center" prop="Purchaseorder" label="Purchase_Order"></el-table-column>
        <el-table-column align="center" prop="Quantity" label="Quantity "></el-table-column>
        <el-table-column align="center" prop="ShipmentID" label="ShipmentID"></el-table-column>
        <el-table-column align="center" prop="Vendorcode" label="Vendorcode"></el-table-column>
        <el-table-column align="center" prop="person_charge" label="person_charge"></el-table-column>
        <el-table-column align="center" prop="status" label="status"></el-table-column>
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
      chargeData: [],
      isCollapse: true, //控制侧边栏的显示
      search: "",
      input3: ""
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "1"; //设置左侧导航2-2 active
  },
  mounted() {
    this.getChargeData();
  },
  methods: {
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index);
      let urls = "/chargebackEditor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 获取chrgeback列表的信息
    getChargeData() {
      const _this = this;
      this.$fetch("/api/admin/chargeback/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 0) {
          _this.chargeData = e.data;
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

<style>
/* 控制搜索栏 */
.input-with-select {
  width: 600px;
  margin-bottom: 20px;
}
</style>