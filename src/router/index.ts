import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
const Table = () => import('@/views/table/index.vue');
const DbFile = () => import('@/views/db-file/index.vue');
const Excel = () => import('@/views/excel/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/table',
    component: Layout,
    children: [
      {
        path: '/table',
        name: 'table',
        component: Table,
        meta: {
          title: '表格',
        },
      },
      {
        path: '/db-file',
        name: 'dbFile',
        component: DbFile,
        meta: {
          title: 'db',
        },
      },
      {
        path: '/excel',
        name: 'excel',
        component: Excel,
        meta: {
          title: 'excel',
        },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
