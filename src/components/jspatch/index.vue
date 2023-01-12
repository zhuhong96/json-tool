<template>
  <div class="home">
    <el-dialog
      title="应用更新......"
      v-model="showUpdater"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :show-close="false"
      width="620px"
      top="26vh"
      center
    >
      <template v-if="downloadProcess">
        <p>
          {{
            "当前:" +
            downloadProcess.transferred +
            "   /   共" +
            downloadProcess.total
          }}
        </p>
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          status="warning"
          :percentage="downloadProcess.percent"
        ></el-progress>
        <p>正在下载({{ downloadProcess.speed }})......</p>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { ipcRenderer } from "electron";
import { ElMessage ,ElMessageBox } from 'element-plus';

export default defineComponent({
  name: "",
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({
      showUpdater: false,
      downloadProcess: {
        percent:0,
        speed:0,
        transferred:'1kb',
        total:"2M"
      },
    });
    // 发现新版本 once
    ipcRenderer.on("autoUpdater-canUpdate", (event, info) => {
      console.log(info);
      /*
       * 这儿会监听，如果info.version比现在版本小；就会触发；反之，不会触发
       */
      ElMessageBox.confirm(`发现有新版本【v${info.version}】，是否更新?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        ipcRenderer.send("autoUpdater-toDownload");
      });
    });
    // 下载进度
    ipcRenderer.on("autoUpdater-progress", (event, process) => {
      if (process.transferred >= 1024 * 1024) {
        process.transferred =
          (process.transferred / 1024 / 1024).toFixed(2) + "M";
      } else {
        process.transferred = (process.transferred / 1024).toFixed(2) + "K";
      }
      if (process.total >= 1024 * 1024) {
        process.total = (process.total / 1024 / 1024).toFixed(2) + "M";
      } else {
        process.total = (process.total / 1024).toFixed(2) + "K";
      }
      if (process.bytesPerSecond >= 1024 * 1024) {
        process.speed =
          (process.bytesPerSecond / 1024 / 1024).toFixed(2) + "M/s";
      } else if (process.bytesPerSecond >= 1024) {
        process.speed = (process.bytesPerSecond / 1024).toFixed(2) + "K/s";
      } else {
        process.speed = process.bytesPerSecond + "B/s";
      }
      process.percent = process.percent.toFixed(2);
      data.downloadProcess = process;
      data.showUpdater = true;
    });
    // 下载更新失败
    ipcRenderer.once("autoUpdater-error", () => {
      ElMessage.error("更新失败！");
      data.showUpdater = false;
    });
    // 下载完成
    ipcRenderer.once("autoUpdater-downloaded", () => {
      ElMessageBox.confirm(`更新完成，是否关闭应用程序安装新版本?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        ipcRenderer.send("exit-app");
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='less'>
</style>