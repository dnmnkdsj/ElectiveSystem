<template>
  <el-card class="wrap">
    <router-view></router-view>
  </el-card>
</template>

<style lang="scss" scoped>
@import '../style/variable';
.wrap {
  width: 100%;
  max-width: $response-width*1.5;
  margin: 50px auto 0;
  overflow: auto;
  min-height: 600px;
}
</style>


<script>
export default {

};
</script>
