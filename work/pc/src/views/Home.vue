<template>
  <section class="task-manage_wrap">
    <BaseHeader header-name="任务管理" />
    <div class="mar-top-20 tool-btn_wrap mar-bottom-20">
      <el-input
        v-model="pagination.keyword"
        placeholder="请输入任务名称或id"
      >
        <template #append>
          <el-button
            type="primary"
            @click="handlerSearch"
          >
            搜索
          </el-button>
        </template>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="50"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="platform"
        label="平台"
        width="120"
      />
      <el-table-column
        prop="order_prize"
        label="订单价"
      >
        <template #default="scope">
          {{ scope.row.order_prize }}
        </template>
      </el-table-column>
      <el-table-column
        prop="rebate_prize"
        label="返利"
        width="300"
      />
      <el-table-column
        prop="actual_prize"
        label="实际价格"
      />
      <el-table-column
        prop="total_copies"
        label="总份数"
      />
      <el-table-column
        prop="apply_copies"
        label="已申请"
      />
      <el-table-column
        prop="left_copies"
        label="剩余"
      />
      <el-table-column
        prop="detail"
        label="详情"
      />
      <el-table-column
        prop="start_at"
        label="开始时间"
      />
      <el-table-column
        prop="end_at"
        label="结束时间"
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
      />
      <el-table-column
        prop="updated_at"
        label="更新时间"
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
        :current-page="pagination.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>

<script lang="ts">
import api from '@/api';
import BaseHeader from '@/views/components/BaseHeader';
import {
 defineComponent, reactive, onMounted
} from 'vue';

// 获取数据
function getTableData() {
    interface PaginationModel {
        page: Number;
        page_size: Number;
        total: null | Number;
        keyword: String;
    }

    const paginationData: PaginationModel = {
        page: 1,
        page_size: 10,
        keyword: '',
        total: null
    };

    const tableData = reactive([]);
    const pagination = reactive(paginationData);
    // 请求数据
    const loadData = async () => {
        const { data } = await api.task.taskList(pagination);
        data.lists.forEach(e => {
            tableData.push(e);
        });
        pagination.total = data.total;
        // 分页数据
        pagination.page = data.page;
        pagination.page_size = data.page_size;
    };

    // 搜索
    const handlerSearch = () => {
        loadData();
    };

    // 分页
    const handleSizeChange = () => {
        loadData();
    };
    const handleCurrentChange = () => {
        loadData();
    };

    onMounted(loadData);

    return {
        tableData,
        pagination,
        loadData,
        handlerSearch,
        handleSizeChange,
        handleCurrentChange
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
            loadData,
            handlerSearch,
            handleSizeChange,
            handleCurrentChange
        } = getTableData();

        return {
            tableData,
            pagination,
            loadData,
            handlerSearch,
            handleSizeChange,
            handleCurrentChange
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