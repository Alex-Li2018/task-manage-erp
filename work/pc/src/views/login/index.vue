<template>
  <!-- 登录页面 -->
  <div class="login-bg">
    <div class="login-content">
      <img
        src="../../static/login/login.jpg"
        alt=""
      >
      <div class="login-form">
        <section class="title">
          <img
            src="../../static/login/icon.png"
            alt=""
          >
          <h4>管理系统登录</h4>
        </section>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="电话号码"
            prop="phone"
          >
            <el-input v-model.number="ruleForm.phone" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              立即登录
            </el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            ruleForm: {
                password: '',
                phone: ''
            },
            rules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
            }
        };
    },
    methods: {
        ...mapActions({
            loginHandler: 'user/login'
        }),
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.loginHandler(this.ruleForm);
                        // 页面跳转到首页
                        this.$router.replace({ path: '/home' });
                    } catch {
                        this.$message.error('登录失败,请检查手机号或密码');
                    }

                } else {
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
@import "../../style/mixin.scss";
.login-bg {
    width: 100vw;
    height: 100vh;
    background: url('../../static/login/bg.png') no-repeat center;
    position: relative;
}
.login-content {
    display: flex;
    height: 450px;
    @include center;
    padding: 20px;
    box-sizing: content-box;
    border-radius: 10px;
    background-color: #fff;
    img {
        height: 450px;
    }
}
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
        width: 100%;
        text-align: center;
        margin-bottom: 30px;
        img {
            height: 40px;
            width: 40px;
            margin-bottom: 10px;
        }
        h4 {
            font-weight: 600;
            font-size: 26px;
        }
    }
    button {
        background-color: #4067f4 !important;
    }
    ::v-deep .el-form-item__content {
        width: 300px;
    }
    ::v-deep .el-form-item__label {
        // color: #fff;
        font-weight: 600;
    }
    ::v-deep .el-form-item__content {
        text-align: center;
        span {
            // color: #fff;
        }
    }
    ::v-deep .el-button {
      span {
          font-weight: 600 !important;
      }
    }
}
</style>