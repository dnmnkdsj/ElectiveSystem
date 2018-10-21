<template>
  <div>
    <el-card class="wrap">
      <div class="btn-group">
        <el-button type="primary" @click="setTime">设置选课时间</el-button>
        <el-button type="danger" @click="handleBreak">中断选课</el-button>
        <el-button type="success" @click="addCourse">添加课程</el-button>
      </div>
      <course-list check-able></course-list>
    </el-card>
    <el-dialog title="选课时间" :visible.sync="timeVisible">
      <el-form label-position="right" :inline="true" ref="timeForm" v-loading="timeloading" :rules="timeRules" :model="timeForm">
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker v-model="timeForm.start_time" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker v-model="timeForm.end_time" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="抽签时间" prop="select_time">
          <el-date-picker v-model="timeForm.select_time" type="datetime"></el-date-picker>
        </el-form-item>
        <el-button type="primary" class="btn" @click="handleSet">确定</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="formVisible" width="75%">
      <el-form label-position="right" :rules="newCourseRules" :model="form" ref="courseForm">
        <el-form-item label="课程名称" prop="name">
          <el-input placeholder="请输入名称" v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="授课老师" prop="teacher">
          <el-input placeholder="请输入名称" v-model="form.teacher" clearable />
        </el-form-item>
        <el-form-item label="地点" prop="course_location">
          <el-select v-model="form.course_location" placeholder="选择上课地点">
            <el-option v-for="(item,index) in locationOptions" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="course_time">
          <el-select v-model="form.course_time" placeholder="选择上课时间">
            <el-option v-for="(item,index) in timeOptions" :key="item" :label="item" :value="index">
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
          <el-select v-model="form.type" placeholder="选择学科">
            <el-option v-for="(item,index) in typeOptions" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容量" prop="limit">
          <el-input-number v-model="form.limit" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="addition">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.addition">
          </el-input>
        </el-form-item>
        <el-button type="primary" class="btn" @click="submitForm">确定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variable";
.wrap {
  width: 100%;
  max-width: $response-width * 1.5;
  margin: 50px auto 0;
}

.btn-group {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .el-button {
    margin-top: 10px;
    display: block;
  }
}
.btn {
  display: block;
  margin: 0 auto;
}
</style>


<script>
import CourseList from '../components/courseList.vue';
import { timeRules, newCourseRules, locationOptions, timeOptions, creditOptions, typeOptions } from '../variable';
import { postNewCourse, postBreak, putTiming } from '../api';

export default {
  data: () => ({
    locationOptions,
    timeOptions,
    typeOptions,
    creditOptions,
    newCourseRules,
    timeRules,
    form: {
      course_time: '',
      type: '',
      credit: '',
      course_location: '',
      name: '',
      teacher: '',
      limit: 20,
      addition: '',
    },
    timeForm: {
      start_time: null,
      end_time: null,
      select_time: null,
    },
    timeloading: false,
    timeVisible: false,
    formVisible: false,
  }),
  methods: {
    setTime() {
      this.timeVisible = true;
    },
    addCourse() {
      this.formVisible = true;
    },
    async submitForm() {
      this.$refs.courseForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '提交中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
          try {
            const res = await postNewCourse(this.form);
            if (res.success) {
              loading.close();
              this.formVisible = false;
              this.$router.go(0);
            } else {
              loading.close();
              this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
            }
          } catch (e) {
            loading.close();
            this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
          }
        } else {
          this.$alert('请确认所有必选项已填,并完成后重新提交', '提示');
        }
      });
    },
    async handleBreak() {
      try {
        await this.$confirm('你是否确定现在终止选课?', '提示', { type: 'error' });
        try {
          const message = await postBreak();
          if (message.success) {
            this.$alert('终止成功', '提示');
          } else {
            this.$alert('终止失败，请重试', '提示');
          }
        } catch (e) {
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消' });
      }
    },
    async postTime(payload) {
      try {
        await this.$confirm('你确定如此设置时间?', '提示', { type: 'success' });
        this.timeloading = true;
        try {
          const message = await putTiming(payload);
          this.timeloading = false;
          if (message.success) {
            this.$alert('设置成功', '提示');
            this.timeVisible = false;
          } else {
            this.$alert('设置失败，请重试', '提示');
          }
        } catch (e) {
          this.timeloading = false;
          this.$alert('服务器错误，请稍候刷新重试', '提示', { type: 'error' });
        }
      } catch (e) {
        this.$message({ type: 'info', message: '已取消' });
      }
    },
    handleSet() {
      this.$refs.timeForm.validate(async (valid) => {
        if (valid) {
          const payload = this.process(this.timeForm);
          if (payload) {
            await this.postTime(payload);
          } else {
            this.$alert('请确认时间输入是否合理后,重新提交', '提示');
          }
        } else {
          this.$alert('请确认所有必选项已填,并完成后重新提交', '提示');
        }
      });
    },
    process(form) {
      let result = Object.assign({}, this.timeForm);
      Object.entries(form).forEach(([key, value]) => {
        result = Object.assign(result, { [key]: Date.parse(value) });
      });
      // eslint-disable-next-line
      const { start_time, end_time, select_time } = result;
      // eslint-disable-next-line
      if (start_time < end_time && select_time > end_time) {
        return result;
      }
      return false;
    },
  },
  components: {
    CourseList,
  },
};
</script>
