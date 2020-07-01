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
      <el-input v-model="editorInfo.po" :disabled="true"></el-input>
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
      prop="size"
      label="尺寸"
      :rules="[
      {required: true, message: '请输入尺寸', trigger: 'blur' },
      {message: '请输入尺寸', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.size"></el-input>
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
      {required: true, message: '请输入AISN', trigger: 'blur' },
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
    <el-form-item label="是否已经付全款">
      <el-radio v-model="editorInfo.pay_state" label="1">是</el-radio>
      <el-radio v-model="editorInfo.pay_state" label="0">否</el-radio>
    </el-form-item>
    <el-form-item
      prop="received_quantity"
      label="Amazon接收的到货数量 "
      :rules="[
      {required: true, message: '请输入Amazon接收的到货数量 ', trigger: 'blur' },
      {message: '请输入Amazon接收的到货数量 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.received_quantity"></el-input>
    </el-form-item>
    <el-form-item
      v-if="levels==1"
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
      v-if="editorInfo.invoice!=''&&editorInfo.invoice!='null'"
      prop="invoice0"
      label="invoice1"
      :rules="[
      {message: '请输入invoice1', trigger: 'blur' },
      {message: '请输入invoice1', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.invoice0"></el-input>
    </el-form-item>
    <el-form-item
      v-if="editorInfo.invoice0!=''&&editorInfo.invoice0!='null'"
      prop="invoice1"
      label="invoice2"
      :rules="[
      {message: '请输入invoice2', trigger: 'blur' },
      {message: '请输入invoice2', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.invoice1"></el-input>
    </el-form-item>
    <el-form-item
       v-if="editorInfo.invoice1!=''&&editorInfo.invoice1!='null'"
      prop="invoice2"
      label="invoice3"
      :rules="[
      { message: '请输入invoice3', trigger: 'blur' },
      {message: '请输入invoice3', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.invoice2"></el-input>
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
      <el-button type="success" plain :disabled="isBtn" @click="submitForm('editorInfo')">提交</el-button>
      <!-- <el-button @click="addDomain"  type="danger" plain>新增 Invoice</el-button> -->
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
      isBtn: false,
      levels: 3
    };
  },
  watch: {
    // editorInfo(editorInfo){
    //   if(editorInfo.pay_state=="是" || editorInfo.pay_state==1 || editorInfos.pay_state == true){
    //     editorInfos.pay_state = true;
    //   }
    // }
  },
  created() {
    this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
    this.levels = this.$store.state.user_data.level; //获取用户等级
  },
  mounted() {
    // console.log(this.$router.currentRoute.query);
    this.levels = this.$store.state.user_data.level;
    let editorInfos = JSON.parse(this.$router.currentRoute.query.index);
    for (let key in editorInfos) {
      editorInfos[key] = String(editorInfos[key]);
    }
    if (editorInfos.pay_state == "是") {
      editorInfos.pay_state = "1";
    } else {
      editorInfos.pay_state = "0";
    }
    this.editorInfo = editorInfos;
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.isBtn = true;
          // alert('submit!');
          let editorInfoss = _this.editorInfo;
          if (editorInfoss.pay_state == 1) {
            editorInfoss.pay_state = "1";
          } else {
            editorInfoss.pay_state == "0";
          }
          axios({
            method: "post",
            url: "/admin/index/update",
            data: editorInfoss
          }).then(function(res) {
            let e = JSON.parse(JSON.stringify(res.data));
            console.log(e);
            if (e.code == 0) {
              let messages = e.msg;
              _this.$message.success(messages);
              _this.$router.push({ path: "/order" });
            } else if (e.code == 14) {
              _this.$message.error("数据未更改");
            } else {
              let messages = e.msg;
              _this.$message.error(messages);
            }
            _this.isBtn = false;
          });
          // _this.$post("/admin/index/update", editorInfo).then(function(e) {
          //   console.log(e);
          // });
        } else {
          // console.log("error submit!!");
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
      // console.log(this.editorInfo.domains);
      this.editorInfo.domains.push({
        value: "",
        key: "invoice" + _this.editorInfo.domains.length
      });
    },
    // 获取编辑列表的信息
    // 获取编辑列表的信息
    getTeamData(indexs) {
      const _this = this;
      this.$fetch("/admin/index/index").then(e => {
        if (e.code == 0) {
          // _this.editorInfo =JSON.parse(JSON.stringify(e.data[index]));
          for (let key in e.data[indexs]) {
            // console.log(key, e.data[indexs][key]);
            e.data[indexs][key] = String(e.data[indexs][key]);
          }
        }
        _this.editorInfo = e.data[indexs];
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
    