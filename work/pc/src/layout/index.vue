<template>
    <section class="layout_wrap">
        <div class="sidebar-container">
            <Sidebar />
        </div>
        <div class="main-container">
            <!-- <div class="fixed-header">
                <NavHeader />
            </div> -->
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
    import Sidebar from './components/Sidebar.vue';

    export default {
        components: {
            Sidebar,
        },
    };
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
