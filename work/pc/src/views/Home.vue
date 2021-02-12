<template>
  <section class="task-manage_wrap">
    <BaseHeader header-name="任务管理" />
    <el-row
      type="flex"
      class="mar-top-20 mar-bottom-20"
      justify="space-between"
    >
      <el-col :span="12">
        <div class="tool-btn_wrap">
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
      </el-col>
      <el-col :span="6">
        <el-button
          type="primary"
          @click="createTaskHandler"
        >
          创建任务
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.lists"
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
      />
      <el-table-column
        prop="rebate_prize"
        label="返利"
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
            class="el-button--danger-important"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row)"
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
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
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

    const tableData = reactive({
        lists: []
    });
    const pagination = reactive(paginationData);
    // 请求数据
    const loadData = async () => {
        const { data } = await api.task.taskList(pagination);
        tableData.lists = data.lists.map(item => {
            item.platform = {
                1: '淘宝',
                2: '天猫',
                3: '京东',
                4: '拼多多'
            }[item.platform];
            return item;
        });
        pagination.total = data.total;
        // 分页数据
        pagination.page = data.page;
        pagination.page_size = data.page_size;
    };

    // 搜索
    const handlerSearch = () => {
        tableData.lists = [];
        loadData();
    };

    // 分页
    const handleSizeChange = () => {
        tableData.lists = [];
        loadData();
    };
    const handleCurrentChange = () => {
        tableData.lists = [];
        loadData();
    };
    // 操作
    const handleDelete = async ({ id }) => {
        await api.task.delTask(id);
        ElMessage.success({
            message: '删除成功',
            type: 'success'
        });
    };

    onMounted(loadData);

    return {
        tableData,
        pagination,
        loadData,
        handlerSearch,
        handleSizeChange,
        handleCurrentChange,
        handleDelete
    };
}

// 路由处理
function routerHandler() {
    const router = useRouter();
    // 创建任务跳转
    function createTaskHandler(): void {
        router.push({
            path: '/home/task-create'
        });
    }
    // 编辑页面
    function handleEdit({ id }): void {
        router.push({
            path: '/home/task-create',
            query: {
                id
            }
        });
    }

    return {
        createTaskHandler,
        handleEdit
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
            handleCurrentChange,
            handleDelete
        } = getTableData();

        const {
            createTaskHandler,
            handleEdit
        } = routerHandler();

        return {
            tableData,
            pagination,
            loadData,
            handlerSearch,
            handleSizeChange,
            handleCurrentChange,
            createTaskHandler,
            handleDelete,
            handleEdit
        };
    }
});
</script>

<style lang="scss" scoped>
.task-manage_wrap {
    .tool-btn_wrap {
        width: 300px;
    }
    .el-button--danger-important {
        color: #FFF;
        background-color: #F56C6C;
        border-color: #F56C6C;
    }
}

</style>