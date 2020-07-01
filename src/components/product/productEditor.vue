<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="Vendor_code"
      label="Vendor_code"
      :rules="[
      {required: true, message: '请输入Vendor_code', trigger: 'blur' },
      {message: '请输入Vendor_code', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Vendor_code"></el-input>
    </el-form-item>
    <el-form-item
      prop="Transaction_number"
      label="Transaction_number"
      :rules="[
      {required: true, message: '请输入Transaction_number', trigger: 'blur' },
      {message: '请输入Transaction_number', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Transaction_number"></el-input>
    </el-form-item>
    <el-form-item
      prop="Transaction_date"
      label="日期"
      :rules="[
      {required: true, message: '请输入日期', trigger: 'blur' },
      {message: '请输入日期', trigger: ['blur'] }
    ]"
    >
      <el-input placeholder="请输入yyyy-mm-dd格式" v-model="editorInfo.Transaction_date"></el-input>
    </el-form-item>
    <el-form-item
      prop="Transaction_type"
      label="Transaction_type"
      :rules="[
      {required: true, message: '请输入Transaction_type', trigger: 'blur' },
      {message: '请输入Transaction_type', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Transaction_type"></el-input>
    </el-form-item>
    <el-form-item
      prop="Invoice_amount"
      label="Invoice_amount"
      :rules="[
      {required: true, message: '请输入Invoice_amount', trigger: 'blur' },
      {message: '请输入Invoice_amount', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Invoice_amount"></el-input>
    </el-form-item>
    <el-form-item
      prop="Deducted_amount"
      label="Deducted_amount"
      :rules="[
      {required: true, message: '请输入Deducted_amount', trigger: 'blur' },
      {message: '请输入Deducted_amount', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Deducted_amount"></el-input>
    </el-form-item>
    <el-form-item
      prop="Balance_amount"
      label="Balance_amount "
      :rules="[
      {required: true, message: '请输入Balance_amount ', trigger: 'blur' },
      {message: '请输入Balance_amount', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Balance_amount"></el-input>
    </el-form-item>
    <el-form-item
      v-if="level==1||level==2"
      prop="PO"
      label="PO"
      :rules="[
      {required: true, message: '请输入PO', trigger: 'blur' },
      {message: '请输入PO', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.PO"></el-input>
    </el-form-item>
    <el-form-item
      v-if="level==1||level==2"
      prop="ASIN"
      label="ASIN"
      :rules="[
      {required: true, message: '请输入ASIN', trigger: 'blur' },
      {message: '请输入ASIN', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ASIN"></el-input>
    </el-form-item>
    <el-form-item
      v-if="level==1||level==2"
      prop="Invoice_Number"
      label="Invoice_Number"
      :rules="[
      {required: true, message: '请输入Invoice_Number', trigger: 'blur' },
      {message: '请输入Invoice_Number', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Invoice_Number"></el-input>
    </el-form-item>
    <el-form-item
      v-if="level==1||level==2"
      prop="returnID"
      label="returnID "
      :rules="[
      {required: true, message: '请输入returnID', trigger: 'blur' },
      {message: '请输入returnID', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.returnID"></el-input>
    </el-form-item>
    <el-form-item
      v-if="level==1||level==2"
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
      v-if="level==1||level==2"
      prop="return_goods_amount"
      label="return_goods_amount"
      :rules="[
      {message: '请输入return_goods_amount', trigger: 'blur' },
      {message: '请输入return_goods_amount', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.return_goods_amount"></el-input>
    </el-form-item>
    <el-form-item
      v-if="level==1||level==2"
      prop="return_money"
      label="return_money"
      :rules="[
      {message: '请输入return_money', trigger: 'blur' },
      {message: '请输入return_money', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.return_money"></el-input>
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
      level: 3,
       isBtn:false,
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
    this.level = this.$store.state.user_data.level;
  },
  mounted() {
    this.level = this.$store.state.user_data.level;
    // console.log(this.$store.state.user_data.level);
    // console.log(this.$router.currentRoute.query);
    let editorInfos = JSON.parse(this.$router.currentRoute.query.index);
    for (let key in editorInfos) {
      editorInfos[key] = String(editorInfos[key]);
    }
    this.editorInfo = editorInfos;
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isBtn=true
          // alert('submit!');
          let editorInfo = _this.editorInfo;
          editorInfo.level = this.$store.state.user_data.level;
          axios({
            method: "post",
            url: "//admin/productreturns/update",
            data: editorInfo
          }).then(function(res) {
            let e = JSON.parse(JSON.stringify(res.data));
            // console.log(e);
            if (e.code == 0) {
              let messages = e.msg;
              _this.$message.success(messages);
              _this.$router.push({ path: "/product" });
            } else if (e.code == 7) {
              _this.$message.error("数据未更改");
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
      // console.log(this.editorInfo.domains);
      this.editorInfo.domains.push({
        value: "",
        key: "invoice" + _this.editorInfo.domains.length
      });
    }
    // 获取编辑列表的信息
    // 获取编辑列表的信息
    // getTeamData(indexs) {
    //   const _this = this;
    //   this.$fetch("/admin/chargeback/index").then(e => {
    //       console.log(e)
    //     if (e.code == 0) {
    //       for (let key in e.data[indexs]) {
    //         console.log(key, e.data[indexs][key]);
    //         e.data[indexs][key] = String(e.data[indexs][key]);
    //       }
    //     }
    //     _this.editorInfo = e.data[indexs];
    //     console.log(_this.editorInfo);
    //   });
    // },
  }
};
</script>
<style scoped>
.demo-dynamic {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
    