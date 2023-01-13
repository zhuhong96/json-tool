<template>
  <div class="table-file">
    <TableHtml
    :fileName="fileName"
    :isTableShow="isTableShow"
    type="json-excel"
    @setTableUploadShow="setTableUploadShow"/>
    <div class="excel-upload" v-if="isTableShow">
      <UploadFile type="json-excel" @setUploadChange="setUploadChange"/>
    </div>
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
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
      console.log(fileName.substring(0,fileIndex));
      
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
.table-file {
  height: 100%;
  // padding: 0 16px;
  background-color: #fff;

  .table-tool {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 0 0;
    height: 40px;
    color: #fff;
    background-color: #00adb5;

    .table-tool-data {

    }
  }

  .table {
    height: calc(100vh - 100px);
    // overflow-y: overlay;
    overflow-y: auto;

    table,
    tr,
    td {
      border: 1px solid #393e46;
      box-sizing: border-box;
      vertical-align: center;
      text-align: center;
      border-collapse: collapse;
    }

    td {
      font-size: 14px;
      outline: none;
      padding: 10px;
      color: #222831;
    }
  }

  .table-pagination {
    position: relative;
    height: 48px;

    .table-pagination-item {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>