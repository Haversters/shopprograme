<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="financeCharge"
      label="负责人"
      :rules="[
      {required: true, message: '请输入负责人', trigger: 'blur' },
      {message: '请输入负责人', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.financeCharge"></el-input>
    </el-form-item>
    <el-form-item
      prop="accountNumber"
      label="账号"
      :rules="[
      {required: true, message: '请输入账号', trigger: 'blur' },
      {message: '请输入账号', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.accountNumber"></el-input>
    </el-form-item>
    <el-form-item
      prop="transferDate"
      label="转款日"
      :rules="[
      {required: true, message: '请输入转款日', trigger: 'blur' },
      {message: '请输入转款日', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.transferDate"></el-input>
    </el-form-item>
    <el-form-item
      prop="transferAmount"
      label="转款金额 "
      :rules="[
      {required: true, message: '转款金额 ', trigger: 'blur' },
      {message: '转款金额', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.transferAmount"></el-input>
    </el-form-item>
    <el-form-item
      prop="isEntry"
      label="是否入账"
      :rules="[
      {required: true, message: '请输入是否入账', trigger: 'blur' },
      {message: '请输入是否入账', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.isEntry"></el-input>
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
      deleatIndex: "",
      level: 3
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "4"; //设置左侧导航2-2 active
    this.level = this.$store.state.user_data.level; //获取用户等级
  },
  mounted() {
    this.level = this.$store.state.user_data.level; //获取用户等级
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          let editorInfo = _this.editorInfo;
          editorInfo.levels=this.$store.state.user_data.level
          //   editorInfo.level=this.level;
          let params = { array: 111 };
          console.log(editorInfo);
          axios({
            method: "post",
            url: "/api/admin/finance/save",
            data: editorInfo
          }).then(function(e) {
            console.log(e);
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
    