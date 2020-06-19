<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="ASIN"
      label="ASIN"
      :rules="[
      {required: true, message: '请输入ASIN', trigger: 'blur' },
      {message: '请输入ASIN', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ASIN"></el-input>
    </el-form-item>
    <el-form-item
      prop="ChargebackID"
      label="Chargeback_ID"
      :rules="[
      {required: true, message: '请输入Chargeback_ID', trigger: 'blur' },
      {message: '请输入Chargeback_ID', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ChargebackID"></el-input>
    </el-form-item>
    <el-form-item
      prop="Creationdate"
      label="Creationdate"
      :rules="[
      {required: true, message: '请输入Creationdate', trigger: 'blur' },
      {message: '请输入Creationdate', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Creationdate"></el-input>
    </el-form-item>
    <el-form-item
      prop="Financial_charge"
      label="Financial_charge"
      :rules="[
      {required: true, message: '请输入Financial_charge', trigger: 'blur' },
      {message: '请输入Financial_charge', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Financial_charge"></el-input>
    </el-form-item>
        <el-form-item
      prop="Financialcharge"
      label="Financialcharge"
      :rules="[
      {required: true, message: '请输入Financialcharge', trigger: 'blur' },
      {message: '请输入Financialcharge', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Financialcharge"></el-input>
    </el-form-item>
    <el-form-item
      prop="IssueID"
      label="IssueID "
      :rules="[
      {required: true, message: '请输入IssueID ', trigger: 'blur' },
      {message: '请输入IssueID ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.IssueID"></el-input>
    </el-form-item>
    <el-form-item
      prop="Purchaseorder"
      label="Purchase_Order"
      :rules="[
      {required: true, message: '请输入Purchase_order', trigger: 'blur' },
      {message: '请输入Purchase_order', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Purchaseorder"></el-input>
    </el-form-item>
    <el-form-item
      prop="Quantity"
      label="Quantity"
      :rules="[
      {required: true, message: '请输入Quantity', trigger: 'blur' },
      {message: '请输入sQuantity', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Quantity"></el-input>
    </el-form-item>
    <el-form-item
      prop="ShipmentID"
      label="ShipmentID"
      :rules="[
      {required: true, message: '请输入ShipmentID', trigger: 'blur' },
      {message: '请输入ShipmentID', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ShipmentID"></el-input>
    </el-form-item>
    <el-form-item
      prop="Vendorcode"
      label="Vendorcode "
      :rules="[
      {required: true, message: '请输入Vendorcode ', trigger: 'blur' },
      {message: '请输入Vendorcode ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Vendorcode"></el-input>
    </el-form-item>
    <el-form-item
      prop="person_charge"
      label="person_charge"
      :rules="[
      {required: true, message: '请输入person_charge', trigger: 'blur' },
      {message: '请输入person_charge', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.person_charge"></el-input>
    </el-form-item>
    <el-form-item
      prop="status"
      label="status"
      :rules="[
      {message: '请输入status', trigger: 'blur' },
      {message: '请输入status', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.status"></el-input>
    </el-form-item>

    <el-form-item
      prop="remarks"
      label="备注"
      :rules="[
      {message: '请输入备注', trigger: 'blur' },
      {message: '请输入备注', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.remarks"></el-input>
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in editorInfo.domains"
      :label="'Invoice' + index"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
      :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
    >
      <el-input v-model="domain.value"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" plain @click="submitForm('editorInfo')">提交</el-button>
      <el-button @click="addDomain" type="danger" plain>新增 Invoice</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";

import { post } from "../../../config/http";
export default {
  data() {
    return {
      // 编辑列表的信息
      editorInfo: {},
      editorIndex: ""
      //  editorInfo: {
      //   POnumber: "", //PO
      //   charge: "", //负责人
      //   purchasePrice: "", //采购价
      //   weight: "", //Financial_charge
      //   oceanShipping: "", //海运预估利润
      //   airTransport: "", //空运预估利润
      //   shipmentId: "", //shipmentId
      //   invoice: "", //invoice
      //   InvoiceAmount: "", //发票付款金额
      //   isPay: "", //是否已经付全款
      //   amazonNumber: "", //Amazon接收的到货数量
      //   remarks: "", //备注
      //   domains: [], //新增invioce
      //   // 编辑列表的信息
      //   editorInfo: {},
      //   editorIndex: ""
      // }
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
  },
  mounted() {
    this.index = this.$route.query.index;
    this.getTeamData(this.index);
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          let editorInfo=_this.editorInfo
          let params = { array: 111 };
          console.log(params);
          axios({
            method: 'post',
            url: '/api/admin/chargeback/update',
            data:editorInfo
          }).then(function(e){
            console.log(e)
          });
          // _this.$post("/api/admin/index/update", editorInfo).then(function(e) {
          //   console.log(e);
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除新增invioce
    removeDomain(item) {
      var index = this.editorInfo.domains.indexOf(item);
      if (index !== -1) {
        this.editorInfo.domains.splice(index, 1);
      }
    },
    //新增invioce
    addDomain() {
      var _this = this;
      console.log(this.editorInfo.domains);
      this.editorInfo.domains.push({
        value: "",
        key: "invoice" + _this.editorInfo.domains.length
      });
    },
    // 获取编辑列表的信息
    // 获取编辑列表的信息
    getTeamData(indexs) {
      const _this = this;
      this.$fetch("/api/admin/chargeback/index").then(e => {
          console.log(e)
        if (e.code == 0) {
          for (let key in e.data[indexs]) {
            console.log(key, e.data[indexs][key]);
            e.data[indexs][key] = String(e.data[indexs][key]);
          }
        }
        _this.editorInfo = e.data[indexs];
        console.log(_this.editorInfo);
      });
    }
  }
};
</script>
<style scoped>
.demo-dynamic {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
    