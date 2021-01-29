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
            label="用户名"
            prop="username"
          >
            <el-input v-model.number="ruleForm.username" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pass"
          >
            <el-input
              v-model="ruleForm.pass"
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

<script>

export default {
    data() {
      return {
        ruleForm: {
          pass: '',
          username: ''
        },
        rules: {
          pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { pass, username } = this.ruleForm;
            const params = {
              username,
              password: pass
            };
            loginAPI(params).then(res => {
              const { code, data } = res;
              if (code == 200) {
                mutations.setName(data.username);
                // 同时将数据存入sessionStorage中
                sessionStorage.setItem('isLogin', true);
                // 判断是否带有重定向路径
                if (this.$route.query.redirect) {
                  this.$router.push({ path: decodeURI(this.$route.query.redirect) });
                } else {
                  this.$router.push({ path: '/admin/free-check' });
                }
              } else {
                sessionStorage.setItem('isLogin', false);
              }
            });
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