<template>
  <div>
    <el-card class="card">
      <div class="count-down" v-if="state===0">距离选课<br/>还有
        <span>{{countHour}}</span>
        小时
        <span>{{countMin}}</span>
        分钟
        <span>{{countSec}}</span>
        秒</div>
      <div class="count-down" v-if="state===1">距离选课结束<br/>还有
        <span>{{countHour}}</span>
        小时
        <span>{{countMin}}</span>
        分钟
        <span>{{countSec}}</span>
        秒</div>
      <el-button type="primary" class="start-button"
      @click="start" v-if="state===1">开始选课</el-button>
      <div class="count-down" v-show="state===-1">选课已结束！</div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variable";
.card {
  width: 100%;
  max-width: $response-width;
  margin: 20px auto;
  padding: 80px 0;
}
.start-button {
  display: block;
  margin: 20px auto 0;
  width: 33%;
}

.count-down {
  text-align: center;
  margin-bottom: 60px;
  span {
    display: inline-block;
    width: 35px;
    color: $color-theme;
  }
}
</style>


<script>
export default {
  data: () => ({
    state: -1,
    countHour: 0,
    countMin: 0,
    countSec: 0,
  }),
  mounted() {
    // TODO: 选课状态切换
    this.countDown();
  },
  methods: {
    start() {
      this.$router.push('/course');
    },
    countDown() {
      this.timer = setInterval(() => {
        this.countSec -= 1;
        if (this.countSec === 0 && this.countMin > 0) {
          this.countMin -= 1;
          this.countSec = 60;
        }
        if (this.countMin === 0 && this.countHour > 0) {
          this.countHour -= 1;
          this.countMin = 60;
        }
        if (this.countHour === 0 && this.countMin === 0 && this.countSec === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
