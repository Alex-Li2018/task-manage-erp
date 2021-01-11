<template>
    <section class="sidebar_wrap">
        <div class="block">
            <el-avatar 
                :size="50" 
                :src="avatarUrl">
            </el-avatar>
        </div>
        <div class="menu-container">
            <el-menu
                :uniqueOpened="true"
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#f7f7f7"
                text-color="#304156"
                active-text-color="#1b9aee"
            >
                <el-menu-item 
                    v-for="(item, index) in menus"
                    :key="index">
                    <i 
                        :class="{
                            'el-icon-setting': item.meta.title === '用户中心',
                            'el-icon-menu': item.meta.title !== '用户中心'
                        }"
                    />
                    <template #title>{{ item.meta.title }}</template>
                </el-menu-item>
            </el-menu>
        </div>
    </section>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        ref,
        onMounted,
    } from 'vue';

    export default defineComponent({
        name: 'Sidebar',
        props: {
            menus: {
                type: Array,
                default: () => [],
            }
        },
        setup(props) {
            const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
            console.log(props);
            return {
                avatarUrl
            };
        },
    });
</script>

<style lang="scss" scoped>
.sidebar_wrap {
    height: 100vw;
    width: 200px !important;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    .block {
        width: 100%;
        height: 110px;
        text-align: center;
        padding: 30px 0 30px;
        border-right: solid 1px #e6e6e6;
        box-sizing: border-box;
    }
    .menu-container {
        flex: 1;
    }
    .el-menu  {
        height: 100%;
    }
}
</style>
