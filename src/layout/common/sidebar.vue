<template>
  <div class="sidebar">
    <div class="sidebar-list"
    v-for="(side, index) in sideList" :key="index"
    @click="onSidebarOut(side)"
    >
      <el-icon size="36px" :color="side.path == $route.name ? '#00adb5' : sideColor" 
        v-if="side.path == 'table'" >
        <Grid /></el-icon>
      <el-icon size="36px" :color="side.path == $route.name ? '#00adb5' : sideColor"
      v-if="side.path == 'dbFile'"
      ><Folder /></el-icon>
      <div :class="['sidebar-list-title',side.path == $route.name ? '' : 'sidebar-list-title-active']">
        {{side.title}}</div>
    </div>
    {{$route.name}}
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: '',
  setup(props: any, { emit }: { emit: any }) {
    const Router = useRouter();
    const data = reactive({
      sideList:[
        {title:'JSON转excel',id:1,path:'table'},
        {title:'JSON转db文件',id:2,path:'dbFile'},
      ],
      sideColor:'#393e46',
    });

    // 切换侧边栏
    const onSidebarOut = (item:any) => {
      Router.push({name:item.path});
    };


    return {
      ...toRefs(data),
      onSidebarOut
    }
  },
})

</script>

<style scoped lang='less'>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .sidebar-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    border-radius: 6px;
    padding: 10px 8px;
    cursor: pointer;
    width: 100px;
    height: 80px;
    background-color: #eeeeee;

    &:nth-child(1) {
      margin-top: 8px;
    }

    .sidebar-list-title {
      font-size: 14px;
    }

    .sidebar-list-title-active {
      color: #393e46;
    }
  }
}
</style>