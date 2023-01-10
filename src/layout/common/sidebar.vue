<template>
  <div>我是侧边栏
    <el-button type="primary" @click="test">测试</el-button>
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: '',
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});

    const test = () =>{
      ipcRenderer.send('get-read',{id:45});
    };
    return {
      ...toRefs(data),
      test
    }
  },
})

</script>

<style scoped lang='less'>
</style>