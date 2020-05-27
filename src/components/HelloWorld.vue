<template>
  <div class="hello">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div style>
            <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
              <template slot="prepend">筛选</template>
              <el-button slot="append" icon="el-icon-search"></el-button>
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
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
            </el-table-column>
          </el-table>
          <!-- <erp-chargeback></erp-chargeback> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import erpChargeback from "./chargeback.vue";
export default {
  name: "HelloWorld",
  components: {
    erpChargeback
  },
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
      input3:"",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 控制搜索
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
/* 控制搜索栏 */
.input-with-select {
  width: 600px;
  margin-bottom: 20px;
}
</style>
