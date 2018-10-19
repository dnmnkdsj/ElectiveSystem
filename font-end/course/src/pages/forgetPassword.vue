<template>
  <div>
    <el-steps :active="active" class="steps-bar">
      <el-step title="验证身份信息"></el-step>
      <el-step title="重新设置密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form label-position="right" class="login-form" label-width="100px" v-show="active==0" :model="form" :rules="rules">
      <el-form-item label="学号/工号" prop="account" >
        <el-input v-model="form.account" placeholder="请输入你的学号或工号"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName" >
        <el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificate">
        <el-select v-model="form.certificate" placeholder="请选择你的证件类型" style="margin">
          <el-option v-for="(item,index) in certificateType" :key="item"
          :label="item" :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件信息" prop="identity" >
        <el-input v-model="form.identity" placeholder="请输入真实证件号码"></el-input>
      </el-form-item>
      <div class="btn-group">
        <el-button @click="next">下一步</el-button>
      </div>
    </el-form>
    <el-form label-position="right" class="login-form" label-width="80px" v-show="active==1">
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.rePassword" placeholder="请重新输入密码"></el-input>
      </el-form-item>
      <div class="btn-group">
        <el-button @click="pre">上一步</el-button>
        <el-button>完成</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variable";

.steps-bar {
  width: $response-width;
  margin: 30px auto 0;
}
.login-form {
  width: $response-width/2;
  margin: 30px auto 0;
}

.btn-group {
  justify-content: space-around;
  display: flex;
}
</style>


<script>
import { certificateType } from '../variable';

export default {
  data: () => ({
    active: 0,
    form: {
      account: '',
      identity: '',
      realName: '',
      certificate: '',
    },
    certificateType,
    rules: {
      account: [
        { required: true, message: '该项不能为空', trigger: 'blur' },
      ],
      identity: [
        { required: true, message: '该项不能为空', trigger: 'blur' },
      ],
      realName: [
        { required: true, message: '该项不能为空', trigger: 'blur' },
      ],
      certificate: [
        { required: true, message: '该项不能为空', trigger: 'blur' },
      ],
    },
  }),
  methods: {
    next() {
      const { form } = this;
      if (form.realName && form.identity && form.account && form.certificate) { this.active += 1; }
    },
    pre() {
      this.active -= 1;
    },
  },
  computed: {
  },
};
</script>
