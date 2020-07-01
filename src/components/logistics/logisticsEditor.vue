<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="logisticsCharge"
      label="负责人"
      :rules="[
      {required: true, message: '请输入负责人', trigger: 'blur' },
      {message: '请输入负责人', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.logisticsCharge"></el-input>
    </el-form-item>
    <el-form-item
      prop="delivery"
      label="发货方式"
      :rules="[
      {required: true, message: '请输入发货方式', trigger: 'blur' },
      {message: '请输入发货方式', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.delivery"></el-input>
    </el-form-item>
    <el-form-item
      prop="trackingNumber"
      label="发货重量"
      :rules="[
      {required: true, message: '请输入发货重量', trigger: 'blur' },
      {message: '请输入v', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.trackingNumber"></el-input>
    </el-form-item>
    <el-form-item
      prop="transferNo"
      label="转单号"
      :rules="[
      {required: true, message: '请输入转单号', trigger: 'blur' },
      {message: '请输入转单号', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.transferNo"></el-input>
    </el-form-item>
    <el-form-item
      prop="deliveryWeight"
      label="发货重量"
      :rules="[
      {required: true, message: '请输入发货重量', trigger: 'blur' },
      {message: '请输入发货重量', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.deliveryWeight"></el-input>
    </el-form-item>
    <el-form-item
      prop="deliveryContent"
      label="发货内容"
      :rules="[
      {required: true, message: '请输入发货内容', trigger: 'blur' },
      {message: '请输入发货内容', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.deliveryContent"></el-input>
    </el-form-item>

    <el-form-item
      prop="freight"
      label="运费"
      :rules="[
      {required: true, message: '请输入运费', trigger: 'blur' },
      {message: '请输入运费', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.freight"></el-input>
    </el-form-item>
    <el-form-item
      label="是否妥投了 "
    >
            <el-radio v-model="editorInfo.isDelivered" label="0">是</el-radio>
        <el-radio v-model="editorInfo.isDelivered" label="1">否</el-radio>
    </el-form-item>
    <!-- <el-form-item
      prop="logisticsRemarks"
      label="logistics_Remarks"
      :rules="[
      {required: true, message: '请输入logistics_Remarks', trigger: 'blur' },
      {message: '请输入logistics_Remarks', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.logisticsRemarks"></el-input>
    </el-form-item>-->

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
      editorInfo: {},
      editorIndex: "",
      isBtn: false,
       levels: 3
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "3"; //设置左侧导航2-2 active
    this.levels = this.$store.state.user_data.level; //获取用户等级
  },
  mounted() {
    this.levels = this.$store.state.user_data.level; //获取用户等级
    let editorInfos = JSON.parse(this.$router.currentRoute.query.index);
    for (let key in editorInfos) {
      editorInfos[key] = String(editorInfos[key]);
    }
    if (editorInfos.isDelivered == "是") {
      editorInfos.isDelivered = "0";
    } else {
      editorInfos.isDelivered = "1";
    }
    this.editorInfo = editorInfos;
    // console.log(this.editorInfo);
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
          // if (editorInfoss.isDelivered == '1') {
          //   editorInfoss.isDelivered = "1";
          // } else {
          //   editorInfoss.isDelivered == "0";
          // }
          axios({
            method: "post",
            url: "/admin/logistics/update",
            data: editorInfoss
          }).then(function(res) {
            let e = JSON.parse(JSON.stringify(res.data));
            console.log(e);
            if (e.code == 0) {
              let messages = e.msg;
              _this.$message.success(messages);
              _this.$router.push({ path: "/logistics" });
            } else if (e.code == 7) {
              _this.$message.error("数据未更改");
            } else {
              let messages = e.msg;
              _this.$message.error(messages);
            }
            _this.isBtn = false;
          });
          // _this.$post("/admin/logistics/update", editorInfo).then(function(e) {
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
    // 获取编辑列表的信息
    // 获取编辑列表的信息
    getTeamData(indexs) {
      const _this = this;
      this.$fetch("/admin/logistics/index").then(e => {
        // console.log(e);
        if (e.code == 6) {
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
    