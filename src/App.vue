<template>
  <router-view />
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "",
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});

    // process.env.NODE_ENV == "production"
    if (process.env.NODE_ENV == "production") {
      const win:any = window;
      // 禁止生成环境打开app
      document.onkeydown = () => {
        //禁用F12
        if (window.event && (win.event.keyCode == 123)) {
          return false;
          //禁用ctrl+shift+i,
        } else if (
          win.event.ctrlKey &&
          win.event.shiftKey &&
          win.event.keyCode == 73
        ) {
          return false;
          //屏蔽Shift+F10
        } else if (win.event.shiftKey && win.event.keyCode == 121) {
          return false;
          // 禁用ctrl + R 刷新
        }
        // else if (window.event.ctrlKey && window.event.keyCode == 82) {
        //   return false;
        // }
      };
    }

    return {
      ...toRefs(data),
    };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00adb5;
  background-color: #eeeeee;
}
body,
html {
  margin: 0;
  padding: 0;
}
</style>
