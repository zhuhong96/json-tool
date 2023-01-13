<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      multiple
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">json file that is smaller than 1 MB</div>
      </template>
    </el-upload>
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { ElMessage } from 'element-plus';
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "upload",
  props: {
    // 类型
    type: {
      type: String,
      default() {
        return 'json';
      },
    },
  },
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});
    const p = toRefs(props);

    const onChange = (file: any, fileList: any) => {
      console.log(p.type.value == "excel-json");
            if (file.size >= '1048576') {
        return ElMessage.error('JSON文件不得大于1M');
      };

      const name = file.name;

      const fileIndex = name.lastIndexOf('.');
      const fileType = name.substring(fileIndex+1);

      console.log(fileType === 'xlsx');

      if (p.type.value == "excel-json") { // 表格转josn
      if (!['xls','xlsx'].includes(fileType.toString())) return ElMessage.error('请上传xls、xlsx格式表格');

        ipcRenderer.send("reader-excel-file", file.raw.path);
      }else if (p.type.value == "json-excel") { // json转表格
        if (!['json'].includes(fileType.toString())) return ElMessage.error('请上传JSON单文件');
        ipcRenderer.send("reader-json-file", file.raw.path);
      }
      
      emit('setUploadChange',file.name);
    };
    return {
      ...toRefs(data),
      onChange,
    };
  },
});
</script>

<style scoped lang='less'>
.upload {

}
</style>