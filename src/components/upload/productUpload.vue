
<template>
  <div>
    <div class="header">上传product_Return文件</div>
    <div class="content">
      <div>
        <el-upload
          drag
          class="upload-demo"
          ref="upload"
          :limit="limitNum"
          action="/api/admin/productreturns/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept=".xls, .xlsx"
          :file-list="fileList"
          :on-change="fileChange"
          :auto-upload="false"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :on-error="handleError"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将product_Return文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div
            class="el-upload__tip"
            slot="tip"
            style="display: flex;justify-content: center;align-items: center;"
          >只能上传xls文件，且不超过10M</div>
        </el-upload>
        <br />
        <div style="display: flex;justify-content: center;align-items: center;">
          <el-button size="small" type="primary" :disabled="isBtn" @click="submitUpload">立即上传</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [],
      length: 0,
      isBtn: false,
    };
  },
  created() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
  },
  mounted() {
    this.$store.state.adminleftnavnum = "2"; //设置左侧导航2-2 active
  },
  methods: {
    submitUpload() {
      let _this = this;
      if (this.length === 0) {
        this.$message.warning("请上传文件");
      } else {
      this.$refs.upload.submit();
      this.isBtn = true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.length=0;
      console.log(this.length)
    },
    handlePreview(file) {
      console.log(file,111);
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.length=1;
      console.log(file.raw);
      // this.fileList.push(file.raw);
      console.log(this.fileList,this.length);
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
          fileList.length} 个`
      );
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
      this.$router.push({ path: "/product" });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
      this.isBtn = false;
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #652c11;
  letter-spacing: 2px;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
