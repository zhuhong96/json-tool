<template>
  <div>
    <div class="table-file-upload">
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
    <button @click="setDeriveJson">导出json</button>
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from "vue";
import Utils from "@/utils/index";
import meansJs from "meansjs";

export default defineComponent({
  name: "",
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({
      excelData:''
    });

    ipcRenderer.on("reader-excel-file-data", (event, value) => {
      let list =
        meansJs.meJstype(value) === "string" ? JSON.parse(value) : value;

      let title = [] as any;
      let excel = [] as any;
      let isExcelShow = true;
      
      for(const i in list) {
        const listName = list[i];
        let fields = {} as any;

        for(const n in listName) {
          if (i == '0') {
            title.push(listName[n]);
            isExcelShow = false;
          }else {
            isExcelShow = true;
            const nameN = title[n];
            fields[nameN] = listName[n];
          }
        };

        if(!isExcelShow) continue;
        excel.push(fields);
      }
      data.excelData = JSON.stringify(excel);
    });

    const setDeriveJson = () => {
      Utils.dataToJSONFile(data.excelData,'12');
    };
    const onChange = (file: any, fileList: any) => {
      console.log(file);
      ipcRenderer.send("reader-excel-file", file.raw.path);
    };
    return {
      ...toRefs(data),
      setDeriveJson,
      onChange,
    };
  },
});
</script>

<style scoped lang='less'>
</style>