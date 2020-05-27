<template>
  <el-form
    :model="dynamicValidateForm"
    ref="dynamicValidateForm"
    label-width="140px"
    class="demo-dynamic"
  >
    <el-form-item
      prop="POnumber"
      label="PO"
      :rules="[
      {required: true, message: '请输入PO', trigger: 'blur' },
      {message: '请输入PO', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.POnumber"></el-input>
    </el-form-item>
    <el-form-item
      prop="charge"
      label="负责人"
      :rules="[
      {required: true, message: '请输入负责人', trigger: 'blur' },
      {message: '请输入负责人', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.charge"></el-input>
    </el-form-item>
    <el-form-item
      prop="purchasePrice"
      label="采购价"
      :rules="[
      {required: true, message: '请输入采购价', trigger: 'blur' },
      {message: '请输入采购价', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.purchasePrice"></el-input>
    </el-form-item>
    <el-form-item
      prop="weight"
      label="重量"
      :rules="[
      {required: true, message: '请输入重量', trigger: 'blur' },
      {message: '请输入重量', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.weight"></el-input>
    </el-form-item>
    <el-form-item
      prop="oceanShipping"
      label="海运预估利润 "
      :rules="[
      {required: true, message: '请输入海运预估利润 ', trigger: 'blur' },
      {message: '请输入海运预估利润 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.oceanShipping"></el-input>
    </el-form-item>
    <el-form-item
      prop="airTransport"
      label="空运预估利润"
      :rules="[
      {required: true, message: '请输入空运预估利润', trigger: 'blur' },
      {message: '请输入空运预估利润', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.airTransport"></el-input>
    </el-form-item>
    <el-form-item
      prop="shipmentId"
      label="shipmentId"
      :rules="[
      {required: true, message: '请输入shipmentId', trigger: 'blur' },
      {message: '请输入shipmentId', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.shipmentId"></el-input>
    </el-form-item>
    <el-form-item
      prop="invoice"
      label="invoice"
      :rules="[
      {required: true, message: '请输入invoice', trigger: 'blur' },
      {message: '请输入invoice', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.invoice"></el-input>
    </el-form-item>
    <el-form-item
      prop="InvoiceAmount"
      label="发票付款金额 "
      :rules="[
      {required: true, message: '请输入发票付款金额 ', trigger: 'blur' },
      {message: '请输入发票付款金额 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.InvoiceAmount"></el-input>
    </el-form-item>
    <el-form-item
      prop="isPay"
      label="是否已经付全款"
      :rules="[
      {required: true, message: '请输入是否已经付全款', trigger: 'blur' },
      {message: '请输入是否已经付全款', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.isPay"></el-input>
    </el-form-item>
    <el-form-item
      prop="remarks"
      label="备注"
      :rules="[
      {message: '请输入备注', trigger: 'blur' },
      {message: '请输入备注', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>

    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
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
      <el-button type="success" plain @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="addDomain" type="danger" plain>新增 Invoice</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        POnumber: "", //PO
        charge: "", //负责人
        purchasePrice: "", //采购价
        weight: "", //重量
        oceanShipping: "", //海运预估利润
        airTransport: "", //空运预估利润
        shipmentId: "", //shipmentId
        invoice: "", //invoice
        InvoiceAmount: "", //发票付款金额
        isPay: "", //是否已经付全款
        amazonNumber: "", //Amazon接收的到货数量
        remarks: "", //备注
        domains: [] //新增invioce
      }
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
    console.log(this.$store)
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(_this.dynamicValidateForm);
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除新增invioce
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    //新增invioce
    addDomain() {
      var _this = this;
      console.log(this.dynamicValidateForm.domains);
      this.dynamicValidateForm.domains.push({
        value: "",
        key: "invoice" + _this.dynamicValidateForm.domains.length
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
    