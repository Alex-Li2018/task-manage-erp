<template>
    <section class="home_wrap">
        <div style="width: 256px">
            <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
            >
            <a-menu-item key="1">
                <a-icon type="pie-chart" />
                <span>Option 1</span>
            </a-menu-item>
            <a-menu-item key="2">
                <a-icon type="desktop" />
                <span>Option 2</span>
            </a-menu-item>
            <a-menu-item key="3">
                <a-icon type="inbox" />
                <span>Option 3</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
                <a-menu-item key="5">
                Option 5
                </a-menu-item>
                <a-menu-item key="6">
                Option 6
                </a-menu-item>
                <a-menu-item key="7">
                Option 7
                </a-menu-item>
                <a-menu-item key="8">
                Option 8
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
                <a-menu-item key="9">
                Option 9
                </a-menu-item>
                <a-menu-item key="10">
                Option 10
                </a-menu-item>
                <a-sub-menu key="sub3" title="Submenu">
                <a-menu-item key="11">
                    Option 11
                </a-menu-item>
                <a-menu-item key="12">
                    Option 12
                </a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
            </a-menu>
        </div>
    </section>
</template>

<script lang="ts">
    import {
        reactive,
        toRefs,
        onBeforeMount,
        onMounted,
        onBeforeUnmount,
        provide
    } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    export default {
        setup() {
            const state = reactive({
                inTheaters: [], // 正在热映
                comingSoon: [], // 即将上映
                top250: [] // top250
            });
        }
    };
</script>

<style lang="scss" scoped>

</style>