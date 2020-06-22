<template>
  <el-container v-loading="loading">
    <el-main>
      <div style class="topBtn">
        <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
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
        <div>
          <el-button type="primary" plain @click="goAddPage('/order/oderAdd')">添加数据</el-button>
          <!-- <el-button type="success" plain>
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button> -->
        </div>
      </div>
      <el-table
        :data="orderData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true"
      >
        <el-table-column align="center" prop="po" label="PO" width></el-table-column>
        <el-table-column align="center" prop="person_charge" label="负责人" width></el-table-column>
        <el-table-column align="center" prop="charge_price" label="采购价" width></el-table-column>
        <el-table-column align="center" prop="weight" label="重量"></el-table-column>
        <el-table-column align="center" prop="ocean_profit" label="海运预估利润 "></el-table-column>
        <el-table-column align="center" prop="air_profit" label="空运预估利润"></el-table-column>
        <el-table-column align="center" prop="shipment_id" label="shipment ID"></el-table-column>
        <el-table-column align="center" prop="invoice" label="invoice"></el-table-column>
        <el-table-column align="center" prop="AISN" label="AISN"></el-table-column>
        <el-table-column align="center" prop="Invoice_payment_amount" label="发票付款金额 "></el-table-column>
        <el-table-column align="center" prop="pay_state" label="是否已经付全款"></el-table-column>
        <el-table-column align="center" prop="received_quantity" label="Amazon接收的到货数量"></el-table-column>
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
      loading: false, //控制加载状态
      deleteId: "", ///删除数据deleteId
      deleteIndex: "", ///删除数据index
      select: "po", //默认筛选类型
      listTotal: 0,
      pageSize: 7 //显示数据量
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
      console.log(index);
      index = JSON.stringify(index);
      let urls = "/editor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 搜索选择
    searchselect(e) {
      console.log(e);
      this.select = e;
    },
        // 去往添加页面
    goAddPage(urls){
      // let urls=''
            // console.log(urls)
  this.$router.push({ path: urls });
    },
    // 删除当前数据
    handleDelete(index, po) {
      this.deleteIndex = index;
      this.deleteId = po;
      this.open();
      console.log(index, po);
    },
    // 删除提示
    open() {
      const _this = this;
      let urls = "/api/admin/index/delete?po=" + this.deleteId;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          _this.$fetch(urls).then(e => {
            console.log(111);
            console.log(e);
            if (e.code == 0) {
              _this.orderData.splice(_this.deleteIndex, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              let messages = e.msg;
              this.$message.error(messages);
            }

            console.log(_this.$store.state.user_data);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取编辑列表的信息
    getTeamData() {
      const _this = this;
      this.$fetch("/api/admin/index/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data;
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 搜索类型
    getSearch() {
      let _this = this;
      let urls =
        "/api/admin/index/select?type=" +
        this.select +
        "&content=" +
        this.input3;
      this.$fetch(urls).then(e => {
        console.log(urls);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data;
          _this.listTotal = e.data.length;
          _this.orderData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 页数发生改变
    pageChange(e) {
      console.log(e);
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.orderData = this.tableData.slice(num1, num2);
      console.log(this.orderData);
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
  border: 1px solid red;
}
/* 顶部区域 */
.topBtn {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  border: 1px solid red;
}
</style>