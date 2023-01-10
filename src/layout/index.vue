<template>
  <div class="layout">
    <div class="layout-header">
      <!-- 头部 -->
      <Header />
    </div>
    <aside class="layout-sidebar sidebar-none">
      <!-- 侧边栏 -->
      <Sidebar />
    </aside>
    <main class="page">
      <div class="layout-box">
        <!-- 主要内容 -->456
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
import Header from "@/layout/common/header.vue";
import Sidebar from "@/layout/common/sidebar.vue";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "",
  components: {
    Header,
    Sidebar,
  },
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="less">
.layout {
  .layout-header {
    width: 100%;
    background-color: #cdcdcd;
  }

  .layout-sidebar {
    font-size: 16px;
    background-color: #fff;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 50px;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
    width: 250px;
  }

  .page {
    margin-left: 250px;

    .layout-box {
      height: auto !important;
      margin: 0 auto;
    }
  }
}
</style>