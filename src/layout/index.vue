<template>
  <div class="layout">
    <div class="layout-header">
      <!-- 头部 -->
      <HeaderItem />
    </div>
    <aside class="layout-sidebar sidebar-none">
      <!-- 侧边栏 -->
      <Sidebar />
    </aside>
    <main class="page">
      <div class="layout-box">
        <!-- 主要内容 -->
        <!-- <router-view :key="key" /> -->
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"  v-if="$route.meta.keepAlive" :key="$route.name"/>
          </keep-alive>
          <component :is="Component"  v-if="!$route.meta.keepAlive" :key="$route.name"/>
        </router-view> 
      </div>
    </main>
    <HotUpdate/>
  </div>
</template>

<script lang='ts'>
import HeaderItem from "@/layout/common/header-item.vue";
import Sidebar from "@/layout/common/sidebar.vue";
import { defineComponent, reactive, toRefs } from "vue";
import { useRoute } from 'vue-router';
import HotUpdate from "@/components/jspatch/index.vue";

export default defineComponent({
  name: "",
  components: {
    HeaderItem,
    Sidebar,
    HotUpdate,
  },
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});
    const route = useRoute();
    const key = () => {
      return route.path;
    };
    return {
      ...toRefs(data),
      key
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
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 0;
    z-index: 10;
    margin: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
    width: 150px;
    font-size: 16px;
    background-color: #fff;
  }

  .page {
    margin-left: 150px;
    height: calc(100vh - 52px) !important;

    .layout-box {
      margin: 0 auto;
      height: 100%;
    }
  }
}
</style>