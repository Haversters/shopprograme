<template>
  <el-form :model="editorInfo" ref="editorInfo" label-width="140px" class="demo-dynamic">
    <el-form-item
      prop="id"
      label="PO"
      :rules="[
      {required: true, message: '请输入PO', trigger: 'blur' },
      {message: '请输入PO', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.id"></el-input>
    </el-form-item>
    <el-form-item
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
      prop="size"
      label="采购价"
      :rules="[
      {required: true, message: '请输入采购价', trigger: 'blur' },
      {message: '请输入采购价', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.size"></el-input>
    </el-form-item>
    <el-form-item
      prop="weight"
      label="重量"
      :rules="[
      {required: true, message: '请输入重量', trigger: 'blur' },
      {message: '请输入重量', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.weight"></el-input>
    </el-form-item>
    <el-form-item
      prop="ocean_profit"
      label="海运预估利润 "
      :rules="[
      {required: true, message: '请输入海运预估利润 ', trigger: 'blur' },
      {message: '请输入海运预估利润 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.ocean_profit"></el-input>
    </el-form-item>
    <el-form-item
      prop="air_profit"
      label="空运预估利润"
      :rules="[
      {required: true, message: '请输入空运预估利润', trigger: 'blur' },
      {message: '请输入空运预估利润', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.air_profit"></el-input>
    </el-form-item>
    <el-form-item
      prop="shipment_id"
      label="shipmentId"
      :rules="[
      {required: true, message: '请输入shipmentId', trigger: 'blur' },
      {message: '请输入shipmentId', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.shipment_id"></el-input>
    </el-form-item>
    <el-form-item
      prop="invoice"
      label="invoice"
      :rules="[
      {required: true, message: '请输入invoice', trigger: 'blur' },
      {message: '请输入invoice', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.invoice"></el-input>
    </el-form-item>
    <el-form-item
      prop="Invoice_payment_amount"
      label="发票付款金额 "
      :rules="[
      {required: true, message: '请输入发票付款金额 ', trigger: 'blur' },
      {message: '请输入发票付款金额 ', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.Invoice_payment_amount"></el-input>
    </el-form-item>
    <el-form-item
      prop="pay_state"
      label="是否已经付全款"
      :rules="[
      {required: true, message: '请输入是否已经付全款', trigger: 'blur' },
      {message: '请输入是否已经付全款', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.pay_state"></el-input>
    </el-form-item>
    <el-form-item
      prop="AISN"
      label="备注"
      :rules="[
      {message: '请输入备注', trigger: 'blur' },
      {message: '请输入备注', trigger: ['blur'] }
    ]"
    >
      <el-input v-model="editorInfo.AISN"></el-input>
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
      <el-button @click="addDomain" type="danger" plain>新增 Invoice</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      // 编辑列表的信息
      editorInfo: {},
      editorIndex: ""
      //  editorInfo: {
      //   POnumber: "", //PO
      //   charge: "", //负责人
      //   purchasePrice: "", //采购价
      //   weight: "", //重量
      //   oceanShipping: "", //海运预估利润
      //   airTransport: "", //空运预估利润
      //   shipmentId: "", //shipmentId
      //   invoice: "", //invoice
      //   InvoiceAmount: "", //发票付款金额
      //   isPay: "", //是否已经付全款
      //   amazonNumber: "", //Amazon接收的到货数量
      //   remarks: "", //备注
      //   domains: [], //新增invioce
      //   // 编辑列表的信息
      //   editorInfo: {},
      //   editorIndex: ""
      // }
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
  },
  mounted() {
    this.index = this.$route.query.index;
    this.getTeamData(this.index);
  },
  methods: {
    //点击提交按钮
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(_this.editorInfo);
          // alert('submit!');
          // let editorInfo=String(_this.editorInfo)
          let params={array:_this.editorInfo}
          _this.$post("/api/admin/index/update",params).then(function(e){
            console.log(e);
          })
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
    // 获取编辑列表的信息
    // 获取编辑列表的信息
    getTeamData(indexs) {
      const _this = this;
      this.$fetch("/api/admin/index/index").then(e => {
        if (e.code == 0) {
          // _this.editorInfo =JSON.parse(JSON.stringify(e.data[index]));
          for(let key in e.data[indexs]){
            console.log(key,e.data[indexs][key])
            e.data[indexs][key]=String(e.data[indexs][key])
          }
        }
                  _this.editorInfo =e.data[indexs];
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
    