<template>
  <el-form
    :model="dynamicValidateForm"
    ref="dynamicValidateForm"
    label-width="140px"
    class="demo-dynamic"
  >
    <el-form-item
      prop="logisticsCharge"
      label="负责人"
      :rules="[
      {required: true, message: '请输入负责人', trigger: 'blur' },
      {message: '请输入负责人', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.logisticsCharge"></el-input>
    </el-form-item>
    <el-form-item
      prop="delivery"
      label="发货方式"
      :rules="[
      {required: true, message: '请输入发货方式', trigger: 'blur' },
      {message: '请输入发货方式', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.delivery"></el-input>
    </el-form-item>
    <el-form-item
      prop="trackingNumber"
      label="追踪号"
      :rules="[
      {required: true, message: '请输入追踪号', trigger: 'blur' },
      {message: '请输入追踪号', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.trackingNumber"></el-input>
    </el-form-item>
    <el-form-item
      prop="transferNo"
      label="转单号"
      :rules="[
      {required: true, message: '请输入转单号', trigger: 'blur' },
      {message: '请输入转单号', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.transferNo"></el-input>
    </el-form-item>
    <el-form-item
      prop="deliveryWeight"
      label="发货重量 "
      :rules="[
      {required: true, message: '请输入发货重量 ', trigger: 'blur' },
      {message: '请输入发货重量 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.deliveryWeight"></el-input>
    </el-form-item>
    <el-form-item
      prop="deliveryContent"
      label="发货内容"
      :rules="[
      {required: true, message: '请输入发货内容', trigger: 'blur' },
      {message: '请输入发货内容', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.deliveryContent"></el-input>
    </el-form-item>
    <el-form-item
      prop="freight"
      label="运费"
      :rules="[
      {required: true, message: '请输入运费', trigger: 'blur' },
      {message: '请输入运费', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.freight"></el-input>
    </el-form-item>
    <el-form-item
      prop="isDelivered"
      label="是否妥投了"
      :rules="[
      {required: true, message: '请输入是或者否', trigger: 'blur' },
      {message: '请输入是或者否', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.isDelivered"></el-input>
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
    <el-form-item>
      <el-button type="success" plain @click="submitForm('dynamicValidateForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        logisticsCharge: "", //负责人
        delivery: "", //发货方式
        trackingNumber: "", //追踪号
        transferNo: "", //转单号
        deliveryWeight: "", //发货重量
        deliveryContent: "", //发货内容
        freight: "", //运费
        isDelivered: "", //是否妥投了
        isPay: "", //是否已经付全款
        logisticsRemarks: "", //备注
      }
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "3"; //设置左侧导航2-2 active
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
  },
};
</script>
<style scoped>
.demo-dynamic {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
    