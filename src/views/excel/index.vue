<template>
  <div class="excel">
    <TableHtml
    :fileName="fileName"
    :isTableShow="isTableShow"
    type="excel-json"
    @setTableUploadShow="setTableUploadShow"/>
    <div class="excel-upload" v-if="isTableShow">
      <UploadFile type="excel-json" @setUploadChange="setUploadChange"/>
    </div>
    <!-- <button @click="setDeriveJson">导出json</button> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import UploadFile from '@/components/upload/index.vue';
import TableHtml from '@/components/table-html/index.vue';

export default defineComponent({
  name: "",
  components:{
    UploadFile,TableHtml
  },
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({
      isTableShow: true,
      fileName:""
    });

    // 切换上传我表格显示
    const setTableUploadShow = (show:boolean) => {
      data.isTableShow = show;
    };

    // 监听上传文件
    const setUploadChange = (fileName:string) =>{
      const fileIndex = fileName.lastIndexOf('.');
      data.fileName = fileName.substring(0,fileIndex);
      setTableUploadShow(false);
    };

    return {
      ...toRefs(data),
      setUploadChange,
      setTableUploadShow
    };
  },
});
</script>

<style scoped lang='less'>
.excel {
  height: 100%;
  background-color: #fff;

}
</style>