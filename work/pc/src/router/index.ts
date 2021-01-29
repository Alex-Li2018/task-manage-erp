import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router';

import Layout from '@/layout/index.vue';

export const routes: Array<RouteRecordRaw> = [
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
            title: '任务管理',
        },
        children: [{
            path: 'index',
            name: 'taskManage',
            component: () => import(/* webpackChunkName: "TaskManage" */ '../views/Home.vue'),
            meta: {
                title: '任务管理',
                group: 'main'
            }
        }]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
