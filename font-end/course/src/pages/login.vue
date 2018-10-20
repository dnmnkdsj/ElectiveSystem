<template>
  <div>
    <el-card class="login-form" v-loading="load">
      <el-form label-position="right" label-width="80px" :rules="rules" ref="loginForm" :model="form">
        <el-form-item label="学号/工号" prop="account">
          <el-input v-model="form.account" placeholder="请输入10位的学号或工号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :type="passVisible" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="type">
            <el-checkbox label="visible" name="type">密码可视</el-checkbox>
            <el-checkbox label="admin" name="type">管理员登录</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码" @keydown.enter.native="onLogin"></el-input>
        </el-form-item>
        <img :src="codeImg[codeIndex]" alt="验证码" class="code-img" title="点击换一张" @click="changeCode">
        <div class="btn-group">
          <el-button type="primary" @click="onLogin" class="login-btn">登录</el-button>
          <el-button type="text" @click="foundLost">找回密码</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variable";

.login-form {
  width: 100%;
  max-width: $response-width/2;
  margin: 30px auto 0;
}

.btn-group {
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
}
.login-btn {
  width:25%;
  margin-right: 15px;
}

.code-img {
  width: $response-width/6;
  height: $response-width/12;
  margin-left: 80px;
  cursor:pointer;
}
</style>


<script>
import { mapActions } from 'vuex';
import { postLogin } from '../api';
import { codeAnswer } from '../variable';

export default {
  data: () => {
    function validate(message) {
      return (rule, value, callback) => {
        if (value === '') {
          callback(new Error(message));
        } else {
          callback();
        }
      };
    }
    return {
      form: {
        account: '',
        password: '',
        code: '',
      },
      rules: {
        account: [{
          validator: validate('号码不能为空'), trigger: 'blur',
        }],
        password: [{
          validator: validate('密码不能为空'), trigger: 'blur',
        }],
        code: [{
          validator: validate('验证码不能为空'), trigger: 'blur',
        }],
      },
      type: [],
      load: false,
      codeIndex: 0,
      // eslint-disable-next-line
      codeImg: [require('../assets/code1.png'), require('../assets/code2.png')],
    };
  },
  methods: {
    ...mapActions(['login']),
    async onLogin() {
      const { account, password, code } = this.form;
      if (this.checkCode(code)) {
        this.load = true;
        try {
          const data = await postLogin(account, password);
          if (data.success) {
            this.login(data.user);
            this.$router.replace('/');
          } else {
            this.warningMessage('密码或用户名错误');
          }
          this.load = false;
        } catch (e) {
          this.warningMessage('系统错误，请稍后重试');
          this.load = false;
        }
      }
    },
    foundLost() {
      this.$router.replace('/lost');
    },
    checkCode(code) {
      if (code.toLowerCase() !== codeAnswer[this.codeIndex]) {
        this.$alert('验证码输入错误', '提示', {
          type: 'error',
          confirmButtonText: '确定',
          callback: () => {
            this.changeCode();
            this.form.code = '';
          },
        });
        return false;
      }
      return true;
    },
    warningMessage(msg) {
      this.form.password = '';
      this.$alert(msg, '提示', {
        type: 'error',
        confirmButtonText: '确定',
        callback: () => {
          this.changeCode();
          this.form.code = '';
        },
      });
    },
    changeCode() {
      this.codeIndex = this.codeIndex === 1 ? 0 : 1;
    },
  },
  computed: {
    passVisible() {
      return this.type.includes('visible') ? '' : 'password';
    },
  },
};
</script>
