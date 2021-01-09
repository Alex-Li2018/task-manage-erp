import { 
  createRouter, 
  createWebHashHistory, 
  RouteRecordRaw 
} from 'vue-router';

import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'main',
    component: Layout,
    redirect: '/home/index/',
    meta: {
        title: '首页',
    },
    children: [{
        path: 'index',
        name: 'taskManage',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
        meta: {
          title: '任务配置'
        }
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
