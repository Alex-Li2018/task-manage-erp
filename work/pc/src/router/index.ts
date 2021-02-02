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
        name: 'Main',
        component: Layout,
        redirect: '/home/index/',
        meta: {
            title: '任务管理',
        },
        children: [{
            path: 'index',
            name: 'TaskManage',
            component: () => import(/* webpackChunkName: "TaskManage" */ '../views/Home.vue'),
            meta: {
                title: '任务管理',
                group: 'main'
            }
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
