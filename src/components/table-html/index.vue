<template>
  <div class="table-html">
    <div class="table-tool">
      <div class="table-tool-data">共【{{ excelData.length }}】条数据</div>
      <div class="table-tool-but">
        <el-button
          type="warning"
          v-if="type == 'json-excel'"
          @click="setExportForm"
          >导出表格</el-button
        >
        <el-button
          type="warning"
          v-if="type == 'excel-json'"
          @click="setDeriveJson"
          >导出JSON</el-button
        >
        <el-button type="danger" @click="setReset">重置</el-button>
      </div>
    </div>
    <div class="table" v-if="!isTableShow"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import meansJs from "meansjs";
import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Utils from "@/utils/index";

export default defineComponent({
  name: "table-html",
  props: {
    // 名称
    fileName: {
      type: String,
      default() {
        return "json-tool";
      },
    },
    // 类型
    type: {
      type: String,
      default() {
        return "json-excel";
      },
    },

    isTableShow:{
      type:Boolean,
      default() {
        return true;
      }
    }
  },
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({
      excelData: [] as [],
      html:`` as string
    });
    const { fileName } = toRefs(props);
    // let html = `<table style="border-collapse: collapse;">`;
    // 渲染页面模块
    const tableHtml = (listData: []) => {
      const table = document.querySelector(".table");

      data.html = `<table style="border-collapse: collapse;">`;

      let headerShow = true;

      // const list = listData.slice((data.page - 1) * data.pageSize,data.pageSize * data.page);
      const list = listData;

      for (const i in list) {
        const isObj = !!Object.keys(list[i]).length;

        // 标题头部
        if (isObj && headerShow) {
          const objectList: any = list[i] as {};
          data.html += `<tr>`;
          data.html +=
            `
          <td style="border: 1px solid #393e46; min-width: 40px;
          outline: none;padding: 10px; font-size: 16px;
          ">
          ` +
            "序号" +
            "</td>";
          for (const n in objectList) {
            if (i == "0" && headerShow) {
              data.html += `
              <th style="border: 1px solid #393e46; font-weight:700;
              outline: none;padding: 10px;
              ">${n}</th>
              `;
            }
          }
          data.html += "</tr>";
          headerShow = false;
        }

        data.html += `<tr>`;

        // 索引
        data.html += `
        <td style="border: 1px solid #393e46; min-width: 40px;
          color: #222831;outline: none;padding: 10px;
        "> ${Number(i) + 1} </td>
        `;

        if (isObj) {
          const objectList: any = list[i] as {};
          for (const n in objectList) {
            data.html += `<td
            style="border: 1px solid #393e46;min-width: 50px;
            color: #222831; font-size: 14px;outline: none;padding: 10px;
            ">${objectList[n]}</td>`;
          }
        }

        data.html += "</tr>";
      }
      data.html += "</table>";

      table && (table.innerHTML = data.html);
    };

    // 接收Excel文件
    ipcRenderer.on("reader-excel-file-data", (event, value) => {
      let list =
        meansJs.meJstype(value) === "string" ? JSON.parse(value) : value;

      let title = [] as any;
      let excel = [] as any;
      let isExcelShow = true;

      for (const i in list) {
        const listName = list[i];
        let fields = {} as any;

        for (const n in listName) {
          if (i == "0") {
            title.push(listName[n]);
            isExcelShow = false;
          } else {
            isExcelShow = true;
            const nameN = title[n];
            fields[nameN] = listName[n];
          }
        }

        if (!isExcelShow) continue;
        excel.push(fields);
      }
      data.excelData = JSON.parse(JSON.stringify(excel));

      tableHtml(data.excelData);
    });

    // 接收JSON数据
    ipcRenderer.on("reader-json-file-data", (event, value) => {
      let list =
        meansJs.meJstype(value) === "string" ? JSON.parse(value) : value;
      // 关闭上传
      // if (list.length) data.isTableShoww = false;
      data.excelData = list;

      tableHtml(list);
    });

    // 重置
    const setReset = () => {
      data.html = `<table style="border-collapse: collapse;">`;
      data.excelData = [];
      const table: any = document.querySelector("table");
      if (table) {
        table.remove();
      };
      
      emit("setTableUploadShow", true);
    };

    // 导出表格
    const setExportForm = () => {
      // xls、xlsx
      // console.log(document.querySelector('table'));
      if (!document.querySelector("table")) {
        return ElMessage.error("暂无表格，请导入JSON");
      }
      const wb = XLSX.utils.table_to_book(
        document.querySelector("table")
      ); /* #table 就是表格的id */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${fileName.value}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    };

    // 导出JSON
    const setDeriveJson = () => {
      Utils.dataToJSONFile(JSON.stringify(data.excelData), "12");
    };

    return {
      ...toRefs(data),
      setReset,
      setExportForm,
      setDeriveJson,
    };
  },
});
</script>

<style scoped lang='less'>
.table-html {
  .table-tool {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 0 0;
    height: 40px;
    color: #fff;
    background-color: #00adb5;
  }

  .table {
    height: calc(100vh - 100px);
    // overflow-y: overlay;
    overflow-y: auto;
    background-color: #fff;

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
}
</style>