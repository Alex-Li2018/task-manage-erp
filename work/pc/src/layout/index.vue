<template>
    <section class="layout_wrap">
        <div class="sidebar-container">
            <Sidebar :menu="routesArr" />
        </div>
        <div class="main-container">
            <!-- 顶部导航 -->
            <!-- <NavHeader /> -->
            <section class="app-main">
                <transition
                    name="fade-transform"
                    mode="out-in"
                >
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                </transition>
            </section>
        </div>
    </section>
</template>

<script>
    import {
        defineComponent,
        reactive,
        onMounted,
    } from 'vue';
    import { routes } from '@/router';
    import Sidebar from './components/Sidebar.vue';

    export default defineComponent({
        components: {
            Sidebar,
        },
        setup() {
            let routesArr: Array<T> = reactive([]);
            onMounted(() => {
                routesArr = routes;
            });

            return {
                routesArr,
            };
        },
    });
</script>

<style lang="scss" scoped>
.layout_wrap {
    display: flex;
    .sidebar-container {
        position: fixed;
        left: 0;
        top: 0;
    }
    .main-container {
        width: calc(100vw - 200px);
        min-height: 100vh;
        margin-left: 200px;
    }
    .app-main {
        padding: 25px;
        width: 100%;
        min-height: 100vh;
        box-sizing: border-box;
    }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all .5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
