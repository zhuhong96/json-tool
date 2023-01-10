<template>
  <header class="navber">
    <div class="navber-header">
      <div class="header-title">
        处理工具
      </div>
      <div class="header-tool">
        <el-icon size="20px" color="#000" @click="minsize">
          <Minus />
        </el-icon>
        <el-icon size="20px" color="#000" @click="maxsize">
          <FullScreen />
        </el-icon>
        <el-icon size="22px" color="#000" @click="onClose">
          <Close />
        </el-icon>
      </div>
    </div>
  </header>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'header',
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});
    // 最大化
    const maxsize = () => {
      ipcRenderer.send('window-maximize');
    };
    // 关闭
    const onClose = () => {
      ipcRenderer.send('window-close');
    };
    // 最小化
    const minsize = () =>{
      ipcRenderer.send('window-minimize');
    };
    return {
      ...toRefs(data),
      maxsize,
      onClose,
      minsize
    }
  },
})

</script>



<style scoped lang="less">
.navber {
  width: 100%;
  height: 50px;
  -webkit-app-region: drag;
  background: #F6F6F6;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;

  .navber-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;

    .header-title {
      font-weight: 700;
      font-size: 18px;
    }

    .header-tool {
      display: flex;
      align-items: center;
      -webkit-app-region: no-drag;

      .el-icon {
        cursor: pointer;
        margin-left: 16px;
      }
    }
  }
}
</style>
