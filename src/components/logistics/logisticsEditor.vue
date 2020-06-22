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
      prop="isDelivered"
      label="是否妥投了 "
      :rules="[
      {required: true, message: '请输入是否妥投了 ', trigger: 'blur' },
      {message: '请输入是否妥投了 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.isDelivered"></el-input>
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
      editorIndex: ""
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "3"; //设置左侧导航2-2 active
    console.log(this.$store);
  },
  mounted() {
    console.log(this.$router.currentRoute.query);
    let editorInfos=JSON.parse(this.$router.currentRoute.query.index)
    for (let key in editorInfos) {
     editorInfos[key] = String(editorInfos[key]);
    }
    this.editorInfo = editorInfos;
    console.log(this.editorInfo);
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          let editorInfo = _this.editorInfo;
          let params = { array: 111 };
          console.log(params);
          axios({
            method: "post",
            url: "/api/admin/logistics/update",
            data: editorInfo
          }).then(function(e) {
            console.log(e);
          });
          // _this.$post("/api/admin/logistics/update", editorInfo).then(function(e) {
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
      this.$fetch("/api/admin/logistics/index").then(e => {
        console.log(e);
        if (e.code == 6) {
          for (let key in e.data[indexs]) {
            console.log(key, e.data[indexs][key]);
            e.data[indexs][key] = String(e.data[indexs][key]);
          }
        }
        _this.editorInfo = e.data[indexs];
        console.log(_this.editorInfo);
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
    