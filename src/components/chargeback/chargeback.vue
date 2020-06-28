<template>
  <el-container>
    <el-main>
      <div style class="topBtn">
        <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="purchase_order"
            @change="searchselect"
            style="width:150px"
          >
            <el-option label="purchase_order" value="purchase_order"></el-option>
            <el-option label="issueID" value="issueID"></el-option>
            <el-option label="creation_date" value="creation_date"></el-option>
            <el-option label="ASIN" value="ASIN"></el-option>
            <el-option label="person_charge" value="person_charge"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getSearch()">搜索</el-button>
        </el-input>
          <div style="min-width:220px">
          <el-button type="primary" plain @click="goAddPage('/chargeback/chargebackAdd')">添加数据</el-button>
          <el-button type="success" plain>上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
      </div>
      <el-table :data="chargeData" style="width: 100%" :border="true">
        <el-table-column align="center" prop="ASIN" label="ASIN" width></el-table-column>
        <el-table-column align="center" prop="chargebackID" label="Chargeback_ID" width></el-table-column>
        <el-table-column align="center" prop="chargeback_type" label="Chargeback_type" width></el-table-column>
        <el-table-column align="center" prop="creation_date" label="Creationdate"></el-table-column>
        <el-table-column align="center" prop="financial_charge" label="Financial_charge "></el-table-column>
        <el-table-column align="center" prop="Financialcharge" label="Financialcharge "></el-table-column>
        <el-table-column align="center" prop="issueID" label="Issue_ID"></el-table-column>
        <el-table-column align="center" prop="purchase_order" label="Purchase_Order"></el-table-column>
        <el-table-column align="center" prop="quantity" label="Quantity "></el-table-column>
        <el-table-column align="center" prop="shipmentID" label="ShipmentID"></el-table-column>
        <el-table-column align="center" prop="vendor_code" label="Vendorcode"></el-table-column>
        <el-table-column align="center" prop="person_charge" label="person_charge"></el-table-column>
        <el-table-column align="center" prop="Status" label="status"></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column width="160" align="center" prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.issueID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      chargeData: [],
      tableData: [],
      isCollapse: true, //控制侧边栏的显示
      loading: false, //刷新状态
      search: "",
      input3: "",
      deleteId: "", ///删除数据deleteId
      deleteIndex: "", ///删除数据index
      select: "purchase_order", //默认筛选类型
      listTotal: 0,
      pageSize: 7 //显示数据量
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "1"; //设置左侧导航2-2 active
  },
  mounted() {
    this.getChargeData();
  },
  methods: {
    // 控制编辑
    handleEdit(index, row) {
      index = JSON.stringify(index);
      let urls = "/chargebackEditor?index=" + index;
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
      // 搜索类型
    getSearch() {
      let _this = this;
      let urls =
        "/api/admin/chargeback/select?type=" +
        this.select +
        "&content=" +
        this.input3;
      this.$fetch(urls).then(e => {
        console.log(urls);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data;
          _this.listTotal=e.data.length;
          _this.chargeData =  _this.tableData.slice(0,7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

        console.log(_this.$store.state.user_data);
      });
    },
    // 删除当前数据
    handleDelete(index, id) {
      this.deleteIndex = index;
      this.deleteId = id;
      this.open();
    },
    // 删除提示
    open() {
      const _this = this;
      let urls = "/api/admin/chargeback/delete?issueID=" + this.deleteId;
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
              _this.chargeData.splice(_this.deleteIndex, 1);
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
    // 获取chrgeback列表的信息
    getChargeData() {
      const _this = this;
      this.$fetch("/api/admin/chargeback/index").then(e => {
        console.log(111);
        console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.chargeData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }
        console.log(_this.chargeData, _this.tableData);
      });
    },
    // 页数发生改变
    pageChange(e) {
      console.log(e);
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.chargeData = this.tableData.slice(num1, num2);
      console.log(this.chargeData);
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
.topBtn{
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  border: 1px solid red;
}
</style>