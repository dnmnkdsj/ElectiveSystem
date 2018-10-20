<template>
  <div>
    <div class="tip-block">
      <h1>页面不存在或已经失效，请返回首页</h1>
      <el-button type="primary" @click="backIndex" icon="el-icon-arrow-left">返回首页</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../style/variable';
.tip-block {
  width: $response-width;
  margin: 15% auto 0;
  text-align: center;
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
}
</style>


<script>
export default {
  methods: {
    backIndex() {
      this.$router.push('/');
    },
  },
};
</script>
