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
      prop="chargebackID"
      label="chargebackID"
      :rules="[
      {required: true, message: '请输入chargebackID', trigger: 'blur' },
      {message: '请输入chargebackID', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.chargebackID"></el-input>
    </el-form-item>
    <el-form-item
      prop="chargeback_type"
      label="chargeback_type"
      :rules="[
      {required: true, message: '请输入chargeback_type', trigger: 'blur' },
      {message: '请输入chargeback_type', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.chargeback_type"></el-input>
    </el-form-item>
    <el-form-item
      prop="creation_date"
      label="creation_date"
      :rules="[
      {required: true, message: '请输入creation_date', trigger: 'blur' },
      {message: '请输入creation_date', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.creation_date"></el-input>
    </el-form-item>
    <el-form-item
      prop="financial_charge"
      label="financial_charge "
      :rules="[
      {required: true, message: '请输入financial_charge ', trigger: 'blur' },
      {message: '请输入financial_charge ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.financial_charge"></el-input>
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
      prop="issueID"
      label="issueID"
      :rules="[
      {required: true, message: '请输入issueID', trigger: 'blur' },
      {message: '请输入issueID', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.issueID"></el-input>
    </el-form-item>
    <el-form-item
      prop="purchase_order"
      label="purchase_order"
      :rules="[
      {required: true, message: '请输入purchase_order', trigger: 'blur' },
      {message: '请输入purchase_order', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.purchase_order"></el-input>
    </el-form-item>
        <el-form-item
      prop="quantity"
      label="quantity"
      :rules="[
      {required: true, message: '请输入quantity', trigger: 'blur' },
      {message: '请输入quantity', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.quantity"></el-input>
    </el-form-item>
    <el-form-item
      prop="shipmentID"
      label="shipmentID "
      :rules="[
      {required: true, message: '请输入shipmentID ', trigger: 'blur' },
      {message: '请输入shipmentID ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.shipmentID"></el-input>
    </el-form-item>
    <el-form-item
      prop="vendor_code"
      label="vendor_code"
      :rules="[
      {required: true, message: '请输入vendor_code', trigger: 'blur' },
      {message: '请输入vendor_code', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.vendor_code"></el-input>
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
      prop="Status"
      label="Status"
      :rules="[
      {required: true, message: '请输入Status', trigger: 'blur' },
      {message: '请输入Status', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Status"></el-input>
    </el-form-item>
    <el-form-item
      prop="remarks"
      label="remarks"
      :rules="[
      {message: '请输入remarks', trigger: 'blur' },
      {message: '请输入remarks', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.remarks"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" plain @click="submitForm('editorInfo')">提交</el-button>
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
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "1"; //设置左侧导航2-2 active
  },
  mounted() {

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
            url: '/api/admin/chargeback/save',
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
        key: "purchase_order" + _this.editorInfo.domains.length
      });
    },
    // 获取编辑列表的信息
    // 获取编辑列表的信息
    getTeamData(indexs) {
      const _this = this;
      this.$fetch("/api/admin/index/index").then(e => {
        if (e.code == 0) {
          // _this.editorInfo =JSON.parse(JSON.stringify(e.data[index]));
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
    