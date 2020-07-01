<template>
  <el-container>
    <el-main>
      <div style class="topBtn">
        <el-input placeholder="请输入搜索数据" v-model="input3" class="input-with-select" style="max-width:600px;">
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="PO"
            @change="searchselect"
            style="width:100px"
          >
            <el-option label="PO" value="PO"></el-option>
            <el-option label="returnID" value="returnID"></el-option>
            <el-option label="Invoice_Number" value="Invoice_Number"></el-option>
            <el-option label="ASIN" value="ASIN"></el-option>
            <el-option label="负责人" value="person_charge"></el-option>
            <el-option label="日期" value="Transaction_date"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getSearch()">搜索</el-button>
        </el-input>
        <div style="min-width:220px;">
          <el-button type="primary" plain @click="goAddPage('/product/productAdd')">添加数据</el-button>
          <el-button type="success" plain @click="goAddPage('/product/productUpload')">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
      </div>
      <el-table  :stripe="true"  v-loading="loading" :data="productData" style="width: 100%" :border="true">
        <el-table-column align="center" prop="Vendor_code" label="Vendor_code" width></el-table-column>
        <el-table-column align="center" prop="Transaction_number" label="Transaction_number" width></el-table-column>
        <el-table-column align="center" prop="Transaction_date" label="日期" width></el-table-column>
        <el-table-column align="center" prop="Transaction_type" label="Transaction_type"></el-table-column>
        <el-table-column align="center" prop="Invoice_amount" label="Invoice_amount "></el-table-column>
        <el-table-column align="center" prop="Deducted_amount" label="Deducted_amount "></el-table-column>
        <el-table-column align="center" prop="Balance_amount" label="Balance_amount"></el-table-column>
        <el-table-column align="center" prop="PO" label="PO"></el-table-column>
        <el-table-column align="center" prop="ASIN" label="ASIN "></el-table-column>
        <el-table-column align="center" prop="Invoice_Number" label="Invoice_Number"></el-table-column>
        <el-table-column align="center" prop="returnID" label="returnID"></el-table-column>
        <el-table-column align="center" prop="person_charge" label="负责人"></el-table-column>
        <el-table-column align="center" prop="return_goods_amount" label="return_goods_amount"></el-table-column>
        <el-table-column align="center" prop="return_money" label="return_money"></el-table-column>
        <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
        <el-table-column width="160" align="center" prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.id)">删除</el-button>
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
      productData: [],
      tableData: [],
      isCollapse: true, //控制侧边栏的显示
      loading: true, //刷新状态
      search: "",
      input3: "",
      deleteId: "", ///删除数据deleteId
      deleteIndex: "", ///删除数据index
      select: "PO", //默认筛选类型
      listTotal: 0,
      pageSize: 7, //显示数据量
      fileList: [], //上传数据列表
      // 用户等级
      levels:'',
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
     this.levels = this.$store.state.user_data.level; //获取用户等级
  },
  mounted() {
    this.levels = this.$store.state.user_data.level; //获取用户等级
    this.getproductData();
  },
  methods: {
    // 控制编辑
    handleEdit(index, row) {
      index = JSON.stringify(index);
      let urls = "/product/productEditor?index=" + index;
      this.$router.push({ path: urls });
    },
    // 搜索选择
    searchselect(e) {
      // console.log(e);
      this.select = e;
    },
    // 去往添加页面
    goAddPage(urls) {
      // let urls=''
      // console.log(urls)
      this.$router.push({ path: urls });
    },
    // 搜索类型
    getSearch() {
      let _this = this;
      let urls =
        "/admin/productreturns/select?type=" +
        this.select +
        "&content=" +
        this.input3;
      this.$fetch(urls).then(e => {
        // console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.productData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }

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
      let urls =
        "/admin/productreturns/delete?id=" +
        this.deleteId +
        "&level=" +
        this.$store.state.user_data.level;
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
              _this.productData.splice(_this.deleteIndex, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              let messages = e.msg;
              this.$message.error(messages);
            }

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
    getproductData() {
      const _this = this;
      this.$fetch("/admin/productreturns/index").then(e => {
        // console.log(e);
        if (e.code == 0) {
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.productData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          this.$message.error(messages);
        }
        _this.loading=false
      });
    },
    // 页数发生改变
    pageChange(e) {
      console.log(e);
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.productData = this.tableData.slice(num1, num2);
      // console.log(this.productData);
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