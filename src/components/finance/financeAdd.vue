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
    <el-form-item label="是否入账">
      <el-radio v-model="editorInfo.isEntry" label="1">是</el-radio>
      <el-radio v-model="editorInfo.isEntry" label="0">否</el-radio>
    </el-form-item>

    <el-form-item
    v-if="level==1"
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
        isEntry: "0"
      },
      editorIndex: "",
      deleatIndex: "",
      level: 3,
      isBtn: false
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
          _this.isBtn = true;
          // alert('submit!');
          let editorInfo = _this.editorInfo;
          editorInfo.levels = this.$store.state.user_data.level;
          //   editorInfo.level=this.level;
          let params = { array: 111 };
          console.log(editorInfo);
          axios({
            method: "post",
            url: "/admin/finance/save",
            data: editorInfo
          }).then(function(res) {
            let e = JSON.parse(JSON.stringify(res.data));
            console.log(e);
            if (e.code == 0) {
              console.log(121);
              let messages = e.msg;
              _this.$message.success(messages);
              _this.$router.push({ path: "/finance" });
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
          _this.$message.error(e.messages);
          console.log("error submit!!");
          _this.isBtn = false;
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
    