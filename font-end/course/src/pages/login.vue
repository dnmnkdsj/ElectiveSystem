<template>
  <div>
    <el-card class="login-form">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="学号/工号">
          <el-input v-model="form.account" placeholder="请输入你的学号或工号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" :type="passVisible" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="visible" name="type">密码可视</el-checkbox>
            <el-checkbox label="admin" name="type">管理员登录</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.password" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <img :src="imgSrc" alt="" class="code-img">
        <div class="btn-group">
          <el-button type="primary" @click="login" class="login-btn">登录</el-button>
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
}
</style>


<script>
export default {
  data: () => ({
    form: {
      account: '',
      password: '',
      type: [],
    },
    // eslint-disable-next-line
    imgSrc: require('../assets/logo.png'),
  }),
  methods: {
    login() {},
    foundLost() {
      this.$router.push('/lost');
    },
  },
  computed: {
    passVisible() {
      return this.form.type.includes('visible') ? '' : 'password';
    },
  },
};
</script>
