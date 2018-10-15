<template>
  <div>
    <el-card class="wrap">
      <course-list check-able></course-list>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variable";
.wrap {
  width: 100%;
  max-width: $response-width * 1.5;
  margin: 50px auto 0;
}
</style>


<script>
import CourseList from '../components/courseList.vue';

export default {
  components: {
    CourseList,
  },
};
</script>
