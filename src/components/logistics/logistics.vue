<template>
  <el-container>
    <el-main>
      <div style class="topBtn">
        <div></div>
        <div style="min-width:110px">
          <el-button type="primary" plain @click="goAddPage('/logistics/logisticsAdd')">添加数据</el-button>
          <!-- <el-button type="success" plain>
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>-->
        </div>
      </div>
      <el-table  :stripe="true"  v-loading="loading" :data="logisticsData" style="width: 100%" :border="true">
        <el-table-column align="center" prop="logisticsCharge" label="负责人"></el-table-column>
        <el-table-column align="center" prop="delivery" label="发货方式" width></el-table-column>
        <el-table-column align="center" prop="trackingNumber" label="追踪号 "></el-table-column>
        <el-table-column align="center" prop="transferNo" label="转单号"></el-table-column>
        <el-table-column align="center" prop="deliveryWeight" label="发货重量"></el-table-column>
        <el-table-column align="center" prop="deliveryContent" label="发货内容" width></el-table-column>
        <el-table-column align="center" prop="freight" label="运费 "></el-table-column>
        <!-- <el-table-column align="center" prop="id" label="id"></el-table-column> -->
        <el-table-column align="center" prop="isDelivered" label="是否妥投了"></el-table-column>
        <!-- <el-table-column align="center" prop="logisticsRemarks" label="logistics_Remarks "></el-table-column> -->
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
  data() {
    return {
      logisticsData: [],
      tableData: [],
      isCollapse: true, //控制侧边栏的显示
      loading: true, //刷新状态
      search: "",
      input3: "",
      deleteId: "", ///删除数据deleteId
      deleteIndex: "", ///删除数据index
      select: "po", //默认筛选类型
      listTotal: 0,
      pageSize: 7 //显示数据量
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "3"; //设置左侧导航2-2 active
  },
  mounted() {
    this.getlogisticsData();
  },
  methods: {
    // 控制编辑
    handleEdit(index, row) {
      index = JSON.stringify(index);
      let urls = "/logistics/editor?index=" + index;
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
        "/admin/chargeback/index?type=" +
        this.select +
        "&content=" +
        this.input3;
      this.$fetch(urls).then(e => {
        // console.log(e);
        if (e.code == 0) {
    
          // e.data.forEach(function(item) {
          //   if (item.isDelivered == 1) {
          //     item.isDelivered = "是";
          //   } else {
          //     item.isDelivered = "否";
          //   }
          // });
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.logisticsData = _this.tableData.slice(0, 7);
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
      let urls = "/admin/logistics/delete?id=" + this.deleteId;
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
              _this.logisticsData.splice(_this.deleteIndex, 1);
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
    getlogisticsData() {
      const _this = this;
      this.$fetch("/admin/logistics/index").then(e => {
        // console.log(e);
        if (e.code == 0) {
          // e.data.forEach(function(item) {
          //   if (item.isDelivered == 1) {
          //     item.isDelivered = "是";
          //   } else {
          //     item.isDelivered = "否";
          //   }
          // });
          _this.tableData = e.data.reverse();
          _this.listTotal = e.data.length;
          _this.logisticsData = _this.tableData.slice(0, 7);
        } else {
          let messages = e.msg;
          _this.$message.error(messages);
        }
        _this.loading=false;
      });
    },
    // 页数发生改变
    pageChange(e) {
      console.log(e);
      let num1 = (e - 1) * this.pageSize;
      let num2 = e * this.pageSize;
      this.logisticsData = this.tableData.slice(num1, num2);
      // console.log(this.logisticsData);
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