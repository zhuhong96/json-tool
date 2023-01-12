<template>
  <div>
    <div class="table-file-upload">
      <UploadFile type="excel"/>
    </div>
    <button @click="setDeriveJson">导出json</button>
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from "vue";
import Utils from "@/utils/index";
import meansJs from "meansjs";
import UploadFile from '@/components/upload/index.vue';

export default defineComponent({
  name: "",
  components:{
    UploadFile
  },
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

    return {
      ...toRefs(data),
      setDeriveJson,
      
    };
  },
});
</script>

<style scoped lang='less'>
</style>