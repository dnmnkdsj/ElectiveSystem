<template>
  <div>
    <div>
      <el-table :data="tableData" style="width: 100%" stripe v-loading="loading">
        <el-table-column prop="name" label="课程名称">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable>
        </el-table-column>
        <el-table-column prop="teacher" label="任课老师">
        </el-table-column>
        <el-table-column prop="course_time" label="上课时间">
        </el-table-column>
        <el-table-column prop="course_location" label="上课地点">
        </el-table-column>
        <el-table-column prop="addition" label="备注">
        </el-table-column>
        <el-table-column label="人数">
          <el-table-column prop="num_join" label="已选人数">
          </el-table-column>
          <el-table-column prop="limit" label="最大容量">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="state" label="选课状态">
        </el-table-column>
        <el-table-column label="退选">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="postSelectCourse(scope.$index, scope.row)">退选</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
import { getSelectedCourses, postSelect } from '../api';

export default {
  data: () => ({
    tableData: [],
    loading: false,
  }),
  methods: {
    async postSelectCourse(index, course) {
      try {
        await this.$confirm('你是否退选该节课堂?', '提示', { type: 'info' });
        this.loading = true;
        try {
          const message = await postSelect(course.id, false);
          this.loading = false;
          if (message.success) {
            this.$alert('退选成功', '提示');
            this.removeCourse(index);
          } else {
            this.$alert('退选失败', '提示');
          }
        } catch (e) {
          this.loading = false;
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消' });
      }
    },
    removeCourse(index) {
      this.tableData.splice(index, 1);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const data = await getSelectedCourses();
      this.tableData = data;
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
