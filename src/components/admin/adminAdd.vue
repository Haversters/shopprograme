<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="name"
      label="姓名"
      :rules="[
      {required: true, message: '请输入姓名', trigger: 'blur' },
      {message: '请输入姓名', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="number"
      label="账号"
      :rules="[
      {required: true, message: '请输入账号', trigger: 'blur' },
      {message: '请输入账号', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.number"></el-input>
    </el-form-item>
    <el-form-item
      prop="passwd"
      label="密码"
      :rules="[
      {required: true, message: '请输入密码', trigger: 'blur' },
      {message: '请输入密码', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.passwd"></el-input>
    </el-form-item>
    <el-form-item
      prop="level"
      label="级别"
      :rules="[
      {required: true, message: '请输入级别', trigger: 'blur' },
      {message: '请输入级别', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.level"></el-input>
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
    this.$store.state.adminleftnavnum = "5"; //设置左侧导航2-2 active
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
           editorInfo.levels=this.$store.state.user_data.level
          let params = { array: 111 };
          console.log(editorInfo);
          axios({
            method: 'post',
            url: '/api/admin/adminstor/save',
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
    