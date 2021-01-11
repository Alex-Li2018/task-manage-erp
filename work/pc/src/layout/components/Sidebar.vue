<template>
    <section class="sidebar_wrap">
        <el-menu
            :uniqueOpened="true"
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#304156"
            active-text-color="#d2525a"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-submenu index="1">
                <template #title>
                    <i class="el-icon-menu" />
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <template #title>
                        分组一
                    </template>
                    <el-menu-item index="1-1">
                        选项1
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        选项2
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">
                        选项3
                    </el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template #title>
                        选项4
                    </template>
                    <el-menu-item index="1-4-1">
                        选项1
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </section>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        onMounted,
    } from 'vue';

    export default defineComponent({
        name: 'Sidebar',
        props: {
            menu: {
                type: Array,
                default: () => [],
            },
        },
        setup() {

        },
    });
</script>

<style lang="scss" scoped>
.sidebar_wrap {
    height: 100vw;
    width: 200px !important;
    background-color: #fff;
}
</style>
