<template>
  <div>
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
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "upload",
  props: {
    type: {
      type: String,
    },
  },
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});
    const p = toRefs(props);
    
    const onChange = (file: any, fileList: any) => {
      console.log(p.type.value == 'excel');
      if (p.type.value == 'excel') {
        ipcRenderer.send("reader-excel-file", file.raw.path);
      };
      
    };
    return {
      ...toRefs(data),
      onChange,
    };
  },
});
</script>

<style scoped lang='less'>
</style>