<template>
  <section class="task-create_wrap">
    <BaseHeader header-name="创建任务" />
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item
        label="平台"
        prop="region"
      >
        <el-select
          v-model="ruleForm.platform"
          placeholder="请选择活动平台"
        >
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="订单价"
        prop="order_prize"
      >
        <el-input v-model="ruleForm.order_prize" />
      </el-form-item>
      <el-form-item
        label="返利"
        prop="rebate_prize"
      >
        <el-input v-model="ruleForm.rebate_prize" />
      </el-form-item>
      <el-form-item
        label="实际价格"
        prop="actual_prize"
      >
        <el-input v-model="ruleForm.actual_prize" />
      </el-form-item>
      <el-form-item
        label="总份数"
        prop="total_copies"
      >
        <el-input v-model="ruleForm.total_copies" />
      </el-form-item>
      <el-form-item
        label="详情"
        prop="detail"
      >
        <el-input v-model="ruleForm.detail" />
      </el-form-item>
      <el-form-item
        label="活动时间"
        required
      >
        <el-col :span="11">
          <el-form-item prop="start_at">
            <el-date-picker
              v-model="ruleForm.start_at"
              type="date"
              placeholder="选择开始时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col
          class="line"
          :span="2"
        >
          -
        </el-col>
        <el-col :span="11">
          <el-form-item prop="end_at">
            <el-time-picker
              v-model="ruleForm.end_at"
              placeholder="选择结束时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >
          立即创建
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import api from '@/api';
import BaseHeader from '@/views/components/BaseHeader';
import {
 defineComponent, reactive, onMounted
} from 'vue';

export default {
    components: {
        BaseHeader
    },
    data() {
        return {
            ruleForm: {
                name: '',
                platform: '',
                order_prize: '',
                rebate_prize: '',
                actual_prize: '',
                total_copies: '',
                detail: '',
                start_at: '',
                end_at: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' }
                ],
                platform: [
                    { required: true, message: '请选择平台', trigger: 'change' }
                ],
                order_prize: [
                    { required: true, message: '请输入订单价', trigger: 'blur' }
                ],
                rebate_prize: [
                    { required: true, message: '请输入返利', trigger: 'blur' }
                ],
                actual_prize: [
                    { required: true, message: '请输入实际价格', trigger: 'blur' }
                ],
                total_copies: [
                    { required: true, message: '请输入总份数', trigger: 'blur' }
                ],
                detail: [
                    { required: true, message: '请输入详情', trigger: 'blur' }
                ],
                start_at: [
                    {
                        type: 'date', required: true, message: '请选择开始时间', trigger: 'change'
                    }
                ],
                end_at: [
                    {
                        type: 'date', required: true, message: '请选择结束时间', trigger: 'change'
                    }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.task-create_wrap {
    .demo-ruleForm {
        width: 700px;
    }
}
</style>
