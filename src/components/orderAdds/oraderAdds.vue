<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="po"
      label="PO"
      :rules="[
      {required: true, message: '请输入PO', trigger: 'blur' },
      {message: '请输入PO', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.po"></el-input>
    </el-form-item>
    <el-form-item
      prop="person_charge"
      label="负责人"
      :rules="[
      {required: true, message: '请输入负责人', trigger: 'blur' },
      {message: '请输入负责人', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.person_charge"></el-input>
    </el-form-item>
    <el-form-item
      prop="charge_price"
      label="采购价"
      :rules="[
      {required: true, message: '请输入采购价', trigger: 'blur' },
      {message: '请输入采购价', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.charge_price"></el-input>
    </el-form-item>
    <el-form-item
      prop="weight"
      label="重量"
      :rules="[
      {required: true, message: '请输入重量', trigger: 'blur' },
      {message: '请输入重量', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.weight"></el-input>
    </el-form-item>
    <el-form-item
      prop="ocean_profit"
      label="海运预估利润 "
      :rules="[
      {required: true, message: '请输入海运预估利润 ', trigger: 'blur' },
      {message: '请输入海运预估利润 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ocean_profit"></el-input>
    </el-form-item>
    <el-form-item
      prop="air_profit"
      label="空运预估利润"
      :rules="[
      {required: true, message: '请输入空运预估利润', trigger: 'blur' },
      {message: '请输入空运预估利润', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.air_profit"></el-input>
    </el-form-item>
    <el-form-item
      prop="shipment_id"
      label="shipmentId"
      :rules="[
      {required: true, message: '请输入shipmentId', trigger: 'blur' },
      {message: '请输入shipmentId', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.shipment_id"></el-input>
    </el-form-item>
    <el-form-item
      prop="invoice"
      label="invoice"
      :rules="[
      {required: true, message: '请输入invoice', trigger: 'blur' },
      {message: '请输入invoice', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.invoice"></el-input>
    </el-form-item>
        <el-form-item
      prop="AISN"
      label="AISN"
      :rules="[
      {required: true, message: '请输入AISN ', trigger: 'blur' },
      {message: '请输入AISN', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.AISN"></el-input>
    </el-form-item>
    <el-form-item
      prop="Invoice_payment_amount"
      label="发票付款金额 "
      :rules="[
      {required: true, message: '请输入发票付款金额 ', trigger: 'blur' },
      {message: '请输入发票付款金额 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Invoice_payment_amount"></el-input>
    </el-form-item>
    <el-form-item
      prop="pay_state"
      label="是否已经付全款"
      :rules="[
      {required: true, message: '请输入是否已经付全款', trigger: 'blur' },
      {message: '请输入是否已经付全款', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.pay_state"></el-input>
    </el-form-item>
        <el-form-item
      prop="received_quantity"
      label="Amazon接收的到货数量"
      :rules="[
      {required: true, message: '请输入Amazon接收的到货数量', trigger: 'blur' },
      {message: '请输入Amazon接收的到货数量', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.received_quantity"></el-input>
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
      editorIndex: "",
      deleatIndex:'',
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
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
          console.log(editorInfo);
          axios({
            method: 'post',
            url: '/api/admin/index/save',
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

  }
};
</script>
<style scoped>
.demo-dynamic {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
    