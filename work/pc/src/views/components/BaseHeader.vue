<template>
  <section class="base-header_wrap">
    <div class="page-title-txt">
      {{ headerName }}
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        headerName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    },
    methods: {

    }
});
</script>

<style lang="scss" scoped>
.base-header_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 15px;
    margin-bottom: 15px;
    .page-title-txt {
        font-size: 24px;
        font-weight: bold;
    }
}
</style>