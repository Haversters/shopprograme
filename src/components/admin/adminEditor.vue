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
    <el-form-item label="级别">
      <el-radio v-model="editorInfo.level" label="3">普通管理员</el-radio>
      <el-radio v-model="editorInfo.level" label="2">财务</el-radio>
    </el-form-item>
    <el-form-item
      v-if="level==3"
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
      level: 3
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "6"; //设置左侧导航2-2 active
    this.level = this.$store.state.user_data.level;
  },
  mounted() {
    this.level = this.$store.state.user_data.level;
    // console.log(this.$router.currentRoute.query);
    let editorInfos = JSON.parse(this.$router.currentRoute.query.index);
    for (let key in editorInfos) {
      editorInfos[key] = String(editorInfos[key]);
    }
    if (editorInfos.level == "财务") {
      editorInfos.level = "2";
    } else {
      editorInfos.level = "3";
    }
    this.editorInfo = editorInfos;
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          let editorInfo = _this.editorInfo;
          editorInfo.levels = this.$store.state.user_data.level;
          axios({
            method: "post",
            url: "/admin/adminstor/update",
            data: editorInfo
          }).then(function(e) {
            // console.log(e.data);
            if (e.data.code == 0) {
              _this.$message.success("修改成功");
              _this.$router.push({ path: "/admin" });
            } else if (e.data.code == 7) {
              _this.$message.error("未编辑数据");
            } else {
              let messages = e.data.msg;
              _this.$message.error(messages);
            }
          });
          // _this.$post("/admin/index/update", editorInfo).then(function(e) {
          //   console.log(e);
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
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
    