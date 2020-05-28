<template>
  <el-form
    :model="dynamicValidateForm"
    ref="dynamicValidateForm"
    label-width="140px"
    class="demo-dynamic"
  >
    <el-form-item
      prop="financeCharge"
      label="负责人"
      :rules="[
      {required: true, message: '请输入负责人', trigger: 'blur' },
      {message: '请输入负责人', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.financeCharge"></el-input>
    </el-form-item>
    <el-form-item
      prop="accountNumber"
      label="账号"
      :rules="[
      {required: true, message: '请输入账号', trigger: 'blur' },
      {message: '请输入账号', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.accountNumber"></el-input>
    </el-form-item>
    <el-form-item
      prop="transferDate"
      label="转款日"
      :rules="[
      {required: true, message: '请输入转款日', trigger: 'blur' },
      {message: '请输入转款日', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.transferDate"></el-input>
    </el-form-item>
    <el-form-item
      prop="transferAmount"
      label="转款金额"
      :rules="[
      {required: true, message: '请输入转款金额', trigger: 'blur' },
      {message: '请输入转款金额', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.transferAmount"></el-input>
    </el-form-item>
    <el-form-item
      prop="isEntry"
      label="是否入账"
      :rules="[
      {required: true, message: '请输入是或者否 ', trigger: 'blur' },
      {message: '请输入是或者否', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="dynamicValidateForm.isEntry"></el-input>
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
        financeCharge: "", //负责人
        accountNumber: "", //账号
        transferDate: "", //转款日
        transferAmount: "", //转款金额
        isEntry: "", //是否入账
      }
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "4"; //设置左侧导航2-2 active
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
    