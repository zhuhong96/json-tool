import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
// const Mall = () => import('@/views/mall/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    // children: [
    //   {
    //     path: '/mall',
    //     name: 'mall',
    //     component: Mall,
    //     meta: {
    //       title: '设备列表',
    //     },
    //   }
    // ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
