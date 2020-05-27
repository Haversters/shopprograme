<template>
  <el-container>
        <el-main>
          <div style v-if="false">
            <el-input placeholder="请输入PO/负责人" v-model="input3" class="input-with-select">
              <template slot="prepend">筛选</template>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :border="true"
            v-if="false"
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
          <erp-chargeback></erp-chargeback>
        </el-main>
      </el-container>
</template>

<script>
export default {
name:'erpChargeback',
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
      search: ""
    };
 }
}
</script>

<style>

</style>