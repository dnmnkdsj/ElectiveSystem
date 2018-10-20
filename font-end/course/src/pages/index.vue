<template>
  <div>
    <el-card class="card">
      <div class="count-down" v-if="state===0">距离选课开始<br/>还有
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
      <div class="count-down" v-show="state===2">选课已结束！</div>
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
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import { getTiming } from '../api';

export default {
  data: () => ({
    state: -1,
    countHour: 0,
    countMin: 0,
    countSec: 0,
  }),
  async mounted() {
    const data = await getTiming();
    this.changeState(data);
    this.state = data.courseState;
    const now = Date.now();
    const key = ['start_time', 'end_time'];
    const time = data.timeData[key[this.state]] - now;
    if (this.courseState !== 2) {
      const [countHour, countMin, countSec] = moment(time).format('hh:mm:ss').split(':');
      this.countHour = countHour;
      this.countMin = countMin;
      this.countSec = countSec;
    }
    this.countDown();
  },
  methods: {
    ...mapActions(['changeState']),
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
        if (this.countHour <= 0 && this.countMin <= 0 && this.countSec <= 0) {
          clearInterval(this.timer);
          this.nextSate();
        }
      }, 1000);
    },
    nextSate() {
      this.state += 1;
      if (this.state === 1) {
        const time = this.timeData.end_time - this.data.start_time;
        const [countHour, countMin, countSec] = moment(time).format('hh:mm:ss').split(':');
        this.countHour = countHour;
        this.countMin = countMin;
        this.countSec = countSec;
      } else {
        this.countHour = 0;
        this.countMin = 0;
        this.countSec = 0;
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  computed: {
    ...mapGetters(['courseState', 'timeData']),
  },
};
</script>
