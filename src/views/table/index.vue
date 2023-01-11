<template>
  <div class="table-file">
    <div class="table-tool">
      <div class="table-tool-data">
        共【{{table.length}}】条数据
      </div>
      <div class="table-tool-but">
        <el-button type="warning">导出表格</el-button>
        <el-button type="danger" @click="setReset">重置</el-button>
      </div>
    </div>
    <div class="table-file-upload" v-if="isTableShoww">
      <el-upload
        class="upload-demo"
        drag
        multiple
        action=""
        :auto-upload="false"
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
    <div class="table" v-if="!isTableShoww"></div>
    <!-- <div class="table-pagination" v-if="false">
      <div class="table-pagination-item">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="table.length"
          @size-change="tableSizeChange"
          @current-change="tableCurrentChange"
        />
      </div>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from "vue";
import meansJs from "meansjs";
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "",
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({
      isTableShoww: true,
      // 数组
      table: [] as [],
      pageSize:10 as number,
      page:1 as number,
    });

    let html = `<table style="border-collapse: collapse;">`;
    // 渲染页面模块
    const tableHtml = (listData: []) => {
      const table = document.querySelector(".table");

      let headerShow = true;

      // const list = listData.slice((data.page - 1) * data.pageSize,data.pageSize * data.page);
      const list = listData;

      for (const i in list) {
        const isObj = !!Object.keys(list[i]).length;

        // 标题头部
        if (isObj && headerShow) {
          const objectList: any = list[i] as {};
          html += `<tr>`;
          html +=
            `
          <td style="border: 1px solid #393e46; min-width: 40px;
          outline: none;padding: 10px;
          ">
          ` +
            "序号" +
            "</td>";
          for (const n in objectList) {
            if (i == "0" && headerShow) {
              html += `
              <th style="border: 1px solid #393e46; font-weight:700;
              outline: none;padding: 10px;
              ">${n}</th>
              `;
            }
          }
          html += "</tr>";
          headerShow = false;
        }

        html += `<tr>`;

        // 索引
        html +=
          `
        <td style="border: 1px solid #393e46; min-width: 40px;
          color: #222831;outline: none;padding: 10px;
        "> ${Number(i) + 1} </td>
        `;

        if (isObj) {
          const objectList: any = list[i] as {};
          for (const n in objectList) {
            html += `<td
            style="border: 1px solid #393e46;min-width: 50px;
            color: #222831; font-size: 14px;outline: none;padding: 10px;
            ">${objectList[n]}</td>`;
          }
        }

        html += "</tr>";
      }
      html += "</table>";

      // console.log(html);

      table && (table.innerHTML = html);
    };

    ipcRenderer.on("reader-json-file-data", (event, value) => {
      let list =
        meansJs.meJstype(value) === "string" ? JSON.parse(value) : value;
      // 关闭上传
      // if (list.length) data.isTableShoww = false;
      data.table = list;

      tableHtml(list);
    });

    // 重置
    const setReset = () => {
      data.isTableShoww = true;
      data.table = [];
    }

    // 每页条数
    const tableSizeChange =(val:number) =>{
      data.pageSize = val;
      tableHtml(data.table);
    };
    // 当前页
    const tableCurrentChange = (val:number)=>{
      data.page = val;
      tableHtml(data.table);
    };

    // 监听上传文件
    const onChange = (file: any, fileList: any) => {
      if (file.size >= '1048576') {
        return ElMessage.error('JSON文件不得大于1M')
      };
      // data.path = file.raw.path;
      ipcRenderer.send("reader-json-file", file.raw.path);
      data.isTableShoww = false;
    };
    return {
      ...toRefs(data),
      onChange,
      tableSizeChange,
      tableCurrentChange,
      setReset
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