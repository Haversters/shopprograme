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
    <el-form-item prop="pay_state" label="是否已经付全款">
      <el-radio v-model="editorInfo.pay_state" label="1">是</el-radio>
      <el-radio v-model="editorInfo.pay_state" label="0">否</el-radio>
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
      prop="Vendor"
      label="Vendor "
      :rules="[
      {required: true, message: '请输入Vendor ', trigger: 'blur' },
      {message: '请输入Vendor ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Vendor"></el-input>
    </el-form-item>
    <el-form-item
      prop="Ship_to_location"
      label="Ship_to_location "
      :rules="[
      {required: true, message: '请输入Ship_to_location ', trigger: 'blur' },
      {message: '请输入Ship_to_location ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Ship_to_location"></el-input>
    </el-form-item>
    <el-form-item
      prop="External_ID"
      label="External_ID "
      :rules="[
      {required: true, message: '请输入External_ID ', trigger: 'blur' },
      {message: '请输入External_ID ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.External_ID"></el-input>
    </el-form-item>
    <el-form-item
      prop="Model_Number"
      label="Model_Number "
      :rules="[
      {required: true, message: '请输入Model_Number ', trigger: 'blur' },
      {message: '请输入Model_Number ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Model_Number"></el-input>
    </el-form-item>
    <el-form-item
      prop="Title"
      label="Title "
      :rules="[
      {required: true, message: '请输入Title ', trigger: 'blur' },
      {message: '请输入Title ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Title"></el-input>
    </el-form-item>
    <el-form-item
      prop="Availability"
      label="Availability "
      :rules="[
      {required: true, message: '请输入Availability ', trigger: 'blur' },
      {message: '请输入Availability ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Availability"></el-input>
    </el-form-item>
    <el-form-item
      prop="Window_Type"
      label="Window_Type "
      :rules="[
      {required: true, message: '请输入Window_Type ', trigger: 'blur' },
      {message: '请输入Window_Type ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Window_Type"></el-input>
    </el-form-item>
    <el-form-item
      prop="WindowStart"
      label="WindowStart "
      :rules="[
      {required: true, message: '请输入WindowStart ', trigger: 'blur' },
      {message: '请输入WindowStart ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.WindowStart"></el-input>
    </el-form-item>
    <el-form-item
      prop="WindowEnd"
      label="WindowEnd "
      :rules="[
      {required: true, message: '请输入WindowEnd ', trigger: 'blur' },
      {message: '请输入WindowEnd ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.WindowEnd"></el-input>
    </el-form-item>
    <el-form-item
      prop="ExpectedDate"
      label="ExpectedDate "
      :rules="[
      {required: true, message: '请输入ExpectedDate ', trigger: 'blur' },
      {message: '请输入ExpectedDate ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ExpectedDate"></el-input>
    </el-form-item>
    <el-form-item
      prop="QuantityRequested"
      label="QuantityRequested "
      :rules="[
      {required: true, message: '请输入QuantityRequested ', trigger: 'blur' },
      {message: '请输入QuantityRequested ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.QuantityRequested"></el-input>
    </el-form-item>
    <el-form-item
      prop="ExpectedQuantity"
      label="ExpectedQuantity "
      :rules="[
      {required: true, message: '请输入ExpectedQuantity ', trigger: 'blur' },
      {message: '请输入ExpectedQuantity ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ExpectedQuantity"></el-input>
    </el-form-item>
    <el-form-item
      prop="UnitCost"
      label="UnitCost "
      :rules="[
      {required: true, message: '请输入UnitCost ', trigger: 'blur' },
      {message: '请输入UnitCost ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.UnitCost"></el-input>
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
      <el-button type="success" :disabled="isBtn" plain @click="submitForm('editorInfo')">提交</el-button>
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
      editorInfo: {
        pay_state: "0"
      },
      editorIndex: "",
      deleatIndex: "",
      isBtn: false,
      levels: 3
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "0"; //设置左侧导航2-2 active
    this.levels = this.$store.state.user_data.level; //获取用户等级
  },
  mounted() {
    this.levels = this.$store.state.user_data.level; //获取用户等级
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          _this.isBtn = true;
          let editorInfo = _this.editorInfo;
          let params = { array: 111 };
          // console.log(editorInfo);
          axios({
            method: "post",
            url: "/admin/index/save",
            data: editorInfo
          }).then(function(res) {
            let e = JSON.parse(JSON.stringify(res.data));
            // console.log(e);
            if (e.code == 0) {
              let messages = e.msg;
              _this.$message.success(messages);
              _this.$router.push({ path: "/order" });
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
    