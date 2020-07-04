<template>
  <el-container v-loading="loading">
    <el-main>
      <div style class="topBtn">
        <el-input
          placeholder="请输入PO/负责人"
          v-model="input3"
          class="input-with-select"
          style="max-width:600px;"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="PO"
            @change="searchselect"
            style="width:100px"
          >
            <el-option label="PO" value="po"></el-option>
            <el-option label="负责人" value="name"></el-option>
            <!-- <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>-->
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getSearch()">搜索</el-button>
        </el-input>
        <div style="min-width:350px">
          <el-button type="info" plain v-if="isAll" @click="isShowAll()">展示部分数据</el-button>
          <el-button type="info" plain v-else @click="isShowAll()">展示所有数据</el-button>
          <el-button type="primary" plain @click="goAddPage('/order/oderAdd')">添加数据</el-button>
          <el-button type="success" plain @click="goAddPage('/order/orderUpload')">
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
      <el-table
        :data="orderData"
        v-loading="loading"
        :stripe="true"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="po" label="PO" width></el-table-column>
        <el-table-column align="center" prop="person_charge" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="charge_price" label="采购价" width></el-table-column>
        <el-table-column align="center" prop="weight" label="重量"></el-table-column>
        <el-table-column align="center" prop="size" label="尺寸"></el-table-column>
        <el-table-column align="center" prop="ocean_profit" label="海运预估利润 "></el-table-column>
        <el-table-column align="center" prop="air_profit" label="空运预估利润"></el-table-column>
        <el-table-column align="center" prop="shipment_id" label="shipment ID"></el-table-column>
        <el-table-column align="center" prop="invoice" label="invoice"></el-table-column>
        <el-table-column align="center" prop="AISN" label="AISN"></el-table-column>
        <el-table-column align="center" prop="Invoice_payment_amount" label="发票付款金额 "></el-table-column>
        <el-table-column align="center" prop="pay_state" label="是否已经付全款"></el-table-column>
        <el-table-column align="center" prop="received_quantity" label="Amazon接收的到货数量"></el-table-column>
        <el-table-column align="center" prop="Vendor" v-if="isAll" label="Vendor"></el-table-column>
        <el-table-column align="center" prop="Ship_to_location" v-if="isAll" label="Ship_to_location"></el-table-column>
        <el-table-column align="center" prop="External_ID" v-if="isAll" label="External_ID"></el-table-column>
        <el-table-column align="center" prop="Model_Number" v-if="isAll" label="Model_Number"></el-table-column>
        <el-table-column align="center" prop="Title" v-if="isAll" label="Title"></el-table-column>
        <el-table-column align="center" prop="Availability" v-if="isAll" label="Availability"></el-table-column>
        <el-table-column align="center" prop="Window_Type" v-if="isAll" label="Window_Type"></el-table-column>
        <el-table-column align="center" prop="WindowStart" v-if="isAll" label="WindowStart"></el-table-column>
        <el-table-column align="center" prop="WindowEnd" v-if="isAll" label="WindowEnd"></el-table-column>
        <el-table-column align="center" prop="ExpectedDate" v-if="isAll" label="ExpectedDate"></el-table-column>
        <el-table-column align="center" prop="QuantityRequested" v-if="isAll" label="QuantityRequested"></el-table-column>
        <el-table-column align="center" prop="ExpectedQuantity" v-if="isAll" label="ExpectedQuantity"></el-table-column>
        <el-table-column align="center" prop="UnitCost" v-if="isAll" label="UnitCost"></el-table-column>
        <el-table-column align="center" prop="invoice0" label="invoice1"></el-table-column>
        <el-table-column align="center" prop="invoice1" label="invoice2"></el-table-column>
        <el-table-column align="center" prop="invoice2" label="invoice3"></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column width="160" align="center" prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.po)">删除</el-button>
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
      isShowT: true,
      isAll:false, //是否显示所有数据

    };
  },
  created() {
    this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
  },
  mounted() {
    this.getTeamData();
  },
  methods: {
    // 控制编辑
    handleEdit(index) {
      index = JSON.stringify(index);
      let urls = "/editor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 是否显示所有数据
    isShowAll(){
      this.isAll=!this.isAll;
    },
    // 搜索选择
    searchselect(e) {
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
    },
    // 删除提示
    open() {
      const _this = this;
      let urls = "/admin/index/delete?po=" + this.deleteId;
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
              _this.$message.success("删除成功!");
            } else {
              let messages = e.msg;
              this.$message.error(messages);
            }
          });
        })
        .catch(() => {
          _this.$message.error("已取消删除");
        });
    },
    // 获取编辑列表的信息
    getTeamData() {
      const _this = this;
      this.$fetch("/admin/index/index").then(e => {
        console.log(e);
        if (e.code == 0) {
          e.data.forEach(function(item) {
            if (item.pay_state == 1 ||item.pay_state == "是") {
              item.pay_state = "是";
            } else {
              item.pay_state = "否";
            }
          });
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          _this.$message.error(messages);
        }
        _this.loading = false;
      });
    },
    // 搜索类型
    getSearch() {
      let _this = this;
      let urls =
        "/admin/index/select?type=" + this.select + "&content=" + this.input3;
      this.$fetch(urls).then(e => {
        // console.log(e);
        if (e.code == 0) {
          e.data.forEach(function(item) {
            if (item.pay_state == 1) {
              item.pay_state = "是";
            } else {
              item.pay_state = "否";
            }
          });
          _this.tableData = e.data.reverse();
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
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.orderData = this.tableData.slice(num1, num2);
      // console.log(this.orderData);
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
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
</style>