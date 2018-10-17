<template>
  <div class="wrap">
    <el-form :inline="true" class="find-form" :model="form" ref="retriveForm" >
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
    <el-dialog title="课程详情" :visible.sync="dialogTableVisible">
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
      <el-button type="danger"> 删除 </el-button>
      <el-table :data="studentsData">
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="id" label="学号"></el-table-column>
        <el-table-column property="class" label="学院班级"></el-table-column>
        <el-table-column label="课程评定">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handle(scope.$index, scope.row)">
              通过
            </el-button>
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
</style>


<script>

import { mapGetters } from 'vuex';
import { locationOptions, timeOptions, creditOptions, typeOptions, pageSize } from '../variable';
import { getCourses, postSelect } from '../api';

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
  }),
  async mounted() {
    await this.getCoursesData();
  },
  methods: {
    async onClick(index, row) {
      if (this.checkAble) {
        this.dialogTableVisible = true;
        this.courseDetail = row;
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
    async postSelectCourse(course) {
      try {
        await this.$confirm('你是否确定选修该节课堂?', '提示', { type: 'info' });
        this.formLoading = true;
        try {
          await postSelect(this.user.id, course.id, true);
          this.formLoading = false;
          this.$alert('选修成功', '提示');
        } catch (e) {
          this.formLoading = false;
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消选课' });
      }
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
