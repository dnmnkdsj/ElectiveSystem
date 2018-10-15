<template>
  <div>
    <el-card class="wrap">
      <div class="btn-group">
        <el-button type="primary" @click="setTime">设置选课时间</el-button>
        <el-button type="primary">抽签</el-button>
        <el-button type="danger">中断选课</el-button>
        <el-button type="success" @click="addCourse">添加课程</el-button>
      </div>
      <course-list check-able></course-list>
    </el-card>
    <el-dialog title="选课时间" :visible.sync="timeVisible">
      <el-form label-position="right">
        <el-form-item label="开始时间">
          <el-date-picker v-model="startTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="endTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-button type="primary" class="btn">确定</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="选课时间" :visible.sync="formVisible">
      <el-form label-position="right">
        <el-form-item label="课程名称">
          <el-input placeholder="请输入名称" v-model="input10" clearable />
        </el-form-item>
        <el-form-item label="授课老师">
          <el-input placeholder="请输入名称" v-model="input10" clearable />
        </el-form-item>
        <el-form-item label="地点">
          <el-select v-model="location" placeholder="选择上课地点">
            <el-option v-for="(item,index) in locationOptions" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-select v-model="location" placeholder="选择上课时间">
            <el-option v-for="(item,index) in locationOptions" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学分">
          <el-select v-model="credit" placeholder="选择学分">
            <el-option v-for="item in creditOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="type" placeholder="选择学科地点">
            <el-option v-for="(item,index) in typeOptions" :key="item" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容量">
          <el-input-number v-model="num1" :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-button type="primary" class="btn">确定</el-button>
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
}
.btn {
  display: block;
  margin: 0 auto;
}
</style>


<script>
import CourseList from '../components/courseList.vue';

export default {
  data: () => ({
    timeVisible: false,
    formVisible: false,
    startTime: null,
    endTime: null,
  }),
  methods: {
    setTime() {
      this.timeVisible = true;
    },
    addCourse() {
      this.formVisible = true;
    },
  },
  components: {
    CourseList,
  },
};
</script>
