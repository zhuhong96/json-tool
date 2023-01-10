<template>
  <div>我是侧边栏
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: '',
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({});
    return {
      ...toRefs(data),
    }
  },
})

</script>

<style scoped lang='less'>
</style>