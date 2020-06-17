<template>
  <el-container>
    <el-main>
      <el-table
        :data="logisticsData"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="delivery" label="delivery" width></el-table-column>
        <el-table-column align="center" prop="deliveryContent" label="delivery_Content" width></el-table-column>
        <el-table-column align="center" prop="deliveryWeight" label="delivery_Weight"></el-table-column>
        <el-table-column align="center" prop="freight" label="freight "></el-table-column>
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="isDelivered" label="isDelivered"></el-table-column>
        <el-table-column align="center" prop="logisticsCharge" label="logistics_Charge"></el-table-column>
        <!-- <el-table-column align="center" prop="logisticsRemarks" label="logistics_Remarks "></el-table-column> -->
        <el-table-column align="center" prop="trackingNumber" label="tracking_Number"></el-table-column>
         <el-table-column align="center" prop="transferNo" label="transfer_No"></el-table-column>
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
  data() {
    return {
      tableData: [
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
      console.log(index);
      let urls = "/logistics/editor?index=" + index;
      this.$router.push({ path: urls });
    },
        // 获取chrgeback列表的信息
    getlogisticsData() {
      const _this = this;
      this.$fetch("/api/admin/logistics/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 6) {
          _this.logisticsData = e.data;
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
  },
};
</script>
<style scoped>
</style>