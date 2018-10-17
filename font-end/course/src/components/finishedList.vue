<template>
  <div>
    <el-table :data="tableData" style="width: 100%" stripe v-loading="loading">
      <el-table-column prop="name" label="课程名称">
      </el-table-column>
      <el-table-column prop="credit" label="学分" sortable>
      </el-table-column>
      <el-table-column prop="teacher" label="任课老师">
      </el-table-column>
      <el-table-column prop="type" label="学科">
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
import { getCourses } from '../api';

export default {
  data: () => ({
    loading: false,
    tableData: [],
  }),
  async mounted() {
    this.loading = true;
    try {
      const data = await getCourses({ finished: true });
      this.tableData = data.courses;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.$alert('服务器错误，请稍候刷新重试', '提示', {
        type: 'error',
        confirmButtonText: '确定',
      });
    }
  },
};
</script>
