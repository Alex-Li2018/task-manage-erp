<template>
  <section class="task-manage_wrap">
    <BaseHeader header-name="任务管理" />
    <div class="mar-top-20 tool-btn_wrap mar-bottom-20">
      <el-input
        v-model="keyword"
        placeholder="请输入任务名称或id"
      >
        <template #append>
          <el-button type="primary">
            搜索
          </el-button>
        </template>
      </el-input>
    </div>
    <el-table
      :data="tableData.list"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="province"
        label="省份"
        width="120"
      />
      <el-table-column
        prop="city"
        label="市区"
        width="120"
      />
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      />
      <el-table-column
        prop="zip"
        label="邮编"
        width="120"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="small"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mar-top-20">
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>

<script lang="ts">
import api from '@/api';
import BaseHeader from '@/views/components/BaseHeader';
import { defineComponent, reactive, onMounted } from 'vue';

// 获取数据
function getTableData() {
    interface TableModel<T> {
        list: Array<T>;
        total: null | Number;
    }

    interface PaginationModel {
        page: Number;
        page_size: Number;
    }

    const tData: TableModel<any> = {
        list: [],
        total: null
    };

    const paginationData: PaginationModel = {
        page: 1,
        page_size: 10,
    };

    const tableData = reactive(tData);
    const pagination = reactive(paginationData);
    // 请求数据
    const loadData = async () => {
        const { data } = await api.task.taskList(paginationData);
        console.log(data);
    };

    onMounted(loadData);

    return {
        tableData,
        pagination,
        loadData
    };
}

export default defineComponent({
    components: {
        BaseHeader
    },
    setup() {
        const {
            tableData,
            pagination,
            loadData
        } = getTableData();

        return {
            tableData,
            pagination,
            loadData
        };
    }
});
</script>

<style lang="scss" scoped>
.task-manage_wrap {
    .tool-btn_wrap {
        width: 300px;
    }
}
</style>