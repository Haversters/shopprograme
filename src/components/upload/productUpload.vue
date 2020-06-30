
<template>
  <el-upload
  class="upload-demo"
  ref="upload"
  :limit="1"
  action="/api/admin/productreturns/import"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  accept=".xls"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>