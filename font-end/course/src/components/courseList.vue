<template>
  <div class="wrap">
    <el-form :inline="true" class="find-form" :model="form" ref="retriveForm">
      <el-form-item label="地点" prop="location">
        <el-select v-model="form.location" placeholder="选择上课地点">
          <el-option v-for="item in locationOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-select v-model="form.time" placeholder="选择上课时间">
          <el-option v-for="item in timeOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-select v-model="form.credit" placeholder="选择学分">
          <el-option v-for="item in creditOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <el-select v-model="form.type" placeholder="选择学科地点">
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索课程" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入搜索关键词" clearable @keydown.enter.native="retriveCourses"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="retriveCourses">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" stripe v-loading="formLoading">
      <el-table-column prop="name" label="课程名称">
      </el-table-column>
      <el-table-column prop="credit" label="学分" sortable>
      </el-table-column>
      <el-table-column prop="teacher" label="任课老师">
      </el-table-column>
      <el-table-column prop="type" label="学科">
      </el-table-column>
      <el-table-column prop="course_time" label="上课时间">
      </el-table-column>
      <el-table-column prop="course_location" label="上课地点">
      </el-table-column>
      <el-table-column prop="addition" label="备注">
      </el-table-column>
      <el-table-column label="人数">
        <el-table-column prop="num_join" label="已选人数" sortable>
        </el-table-column>
        <el-table-column prop="limit" label="最大容量" sortable>
        </el-table-column>
      </el-table-column>
      <el-table-column label="选课">
        <template slot-scope="scope">
          <el-button size="mini" :type="checkAble?'info':'success'" @click="onClick(scope.$index, scope.row)">
            {{checkAble?'查看详情':'选课'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="pageSize" :pager-count="9" layout="prev, pager, next" :total="totalCount" @current-change="pageChange" class="pagination">
    </el-pagination>
    <el-dialog title="课程详情" :visible.sync="dialogTableVisible" width="75%">
      <div class="course-detail">
        <div class="detail-item">
          <ul>
            <li>课程名称：{{courseDetail.name||'无'}}</li>
            <li>学分：{{courseDetail.credit||'无'}}</li>
            <li>授课老师：{{courseDetail.teacher||'无'}}</li>
            <li>课程类型：{{courseDetail.type||'无'}}</li>
          </ul>
          <ul>
            <li>备注：{{courseDetail.teacher||'无'}}</li>
            <li>时间：{{courseDetail.course_time||'无'}}</li>
            <li>地址：{{courseDetail.course_location||'无'}}</li>
            <li>人数/容量：{{(courseDetail.num_join||'无')+' / '+(courseDetail.limit||'无')}}</li>
          </ul>
        </div>
      </div>
      <el-button type="danger" @click="delCourse"> 删除 </el-button>
      <el-table :data="studentsData" v-loading="listLoading" stripe>
        <el-table-column property="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column property="school_id" label="学号" min-width="100"></el-table-column>
        <el-table-column property="major" label="所在专业" min-width="100"></el-table-column>
        <el-table-column property="state" label="当前状态" min-width="100"></el-table-column>
        <el-table-column label="课程评定" min-width="100">
          <template slot-scope="scope">
            <div class="btn-group">
              <el-button size="mini" type="success"
              @click="setPass(scope.$index, scope.row,true)"
              :disabled="scope.row.state!=='待评定'">
                通过
              </el-button>
              <el-button size="mini" type="danger"
              @click="setPass(scope.$index, scope.row,false)"
              :disabled="scope.row.state!=='待评定'">
                不及格
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-input {
  width: 150%;
  max-width: 600px;
}
.find-form {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: flex-end;
}

.wrap {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ul {
    width: 50%;
    min-width: 160px;
    li {
      font-size: 15px;
      line-height: 1.5em;
    }
  }
}

.el-pagination {
  margin-top: 30px;
}
.btn-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .el-button {
    display: block;
    margin-bottom: 5px;
    margin-right: 10px;
    margin-left: 0;
  }
}
</style>


<script>

import { locationOptions, timeOptions, creditOptions, typeOptions, pageSize, passedState } from '../variable';
import { getCourses, getCourseDetail, postSelect, delCourse, postPass } from '../api';

export default {
  props: {
    checkAble: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    locationOptions,
    timeOptions,
    typeOptions,
    creditOptions,
    pageSize,
    totalCount: 0,
    dialogTableVisible: false,
    activeIndex: null,
    tableData: [],
    studentsData: [],
    form: {
      location: '',
      time: '',
      type: '',
      credit: '',
      keyword: '',
    },
    courseDetail: {},
    formLoading: false,
    listLoading: false,
  }),
  async mounted() {
    await this.getCoursesData();
  },
  methods: {
    async onClick(index, row) {
      if (this.checkAble) {
        this.dialogTableVisible = true;
        this.activeIndex = index;
        this.courseDetail = row;
        await this.getCourseDetail(row.id);
      } else {
        await this.postSelectCourse(row);
      }
    },
    reset() {
      this.$refs.retriveForm.resetFields();
    },
    async retriveCourses() {
      await this.getCoursesData(this.form);
    },
    async pageChange(page) {
      page -= 1;
      const offset = (page * pageSize) + 1;
      await this.getCoursesData({ offset });
    },
    async getCoursesData(options = {}) {
      this.formLoading = true;
      try {
        const data = await getCourses(options);
        this.tableData = data.courses;
        this.totalCount = parseInt(data.total, 10);
        this.formLoading = false;
      } catch (e) {
        this.formLoading = false;
        this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
      }
    },
    async getCourseDetail(id) {
      this.listLoading = true;
      try {
        const data = await getCourseDetail(id);
        this.studentsData = data;
        this.listLoading = false;
      } catch (e) {
        this.listLoading = false;
        this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
      }
    },
    async postSelectCourse(course) {
      try {
        await this.$confirm('你是否确定选修该节课堂?', '提示', { type: 'info' });
        this.formLoading = true;
        try {
          const message = await postSelect(course.id, true);
          this.formLoading = false;
          if (message.success) {
            this.$alert('选修成功，可在【已选课程】查看', '提示');
          } else {
            this.$alert('选修失败，可能当前不是选修时间或者您已选修过本课程', '提示');
          }
        } catch (e) {
          this.formLoading = false;
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消选课' });
      }
    },
    async delCourse() {
      const { id } = this.courseDetail;
      try {
        await this.$confirm('你是否确定删除该节课堂?', '提示', { type: 'error' });
        this.listLoading = true;
        try {
          const message = await delCourse(id);
          this.listLoading = false;
          if (message.success) {
            this.$alert('删除成功', '提示');
            this.dialogTableVisible = false;
            this.tableData.splice(this.activeIndex, 1);
          } else {
            this.$alert('删除失败，请重试', '提示');
          }
        } catch (e) {
          this.listLoading = false;
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消删除' });
      }
    },
    async setPass(index, row, passed) {
      const courseId = this.activeIndex;
      const studentId = row.id;
      passed = passed ? 1 : 2;
      try {
        await this.$confirm('你是否确定作如此评定?', '提示', { type: 'info' });
        this.listLoading = true;
        try {
          const message = await postPass(studentId, courseId, passed);
          this.listLoading = false;
          if (message.success) {
            this.$alert('评定成功', '提示');
            this.studentsData[index].state = passedState[passed];
          } else {
            this.$alert('评定失败，请重试', '提示');
          }
        } catch (e) {
          this.listLoading = false;
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消' });
      }
    },
  },
};
</script>
