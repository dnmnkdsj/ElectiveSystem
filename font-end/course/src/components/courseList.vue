<template>
  <div class="wrap">
    <el-form :inline="true" class="find-form">
      <el-form-item label="地点">
        <el-select v-model="location" placeholder="选择上课地点">
          <el-option v-for="(item,index) in locationOptions"
          :key="item" :label="item" :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-select v-model="location" placeholder="选择上课时间">
          <el-option v-for="(item,index) in locationOptions"
          :key="item" :label="item" :value="index">
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
      <el-form-item label="搜索课程">
        <el-input v-model="keyword" placeholder="请输入搜索关键词" clearable=""></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="name" label="课程名称">
      </el-table-column>
      <el-table-column prop="credit" label="学分" sortable>
      </el-table-column>
      <el-table-column prop="teacher" label="任课老师">
      </el-table-column>
      <el-table-column prop="type" label="学科">
      </el-table-column>
      <el-table-column prop="time" label="上课时间">
      </el-table-column>
      <el-table-column prop="location" label="上课地点">
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
          <el-button size="mini" :type="deleteAble?'danger':'success'">
            {{deleteAble?'删除':'选课'}}
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  :page-size="15"
  :pager-count="9"
  layout="prev, pager, next"
  :total="100"
  class="pagination">
</el-pagination>
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
  margin-top:0;
  display: flex;
  flex-direction: column;
  align-items: center;

}


</style>


<script>
import { locationOptions } from '../variable';

export default {
  props: {
    // tableData: {
    //   type: Array,
    //   default: null,
    // },
    deleteAble: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    tableData: [{
      name: '聆听音乐',
      credit: 2,
      teacher: '111',
      type: 'test',
      addition: '1111111111111111111111111111111111111',
    }, {
      name: '聆听音乐',
      credit: 2,
      teacher: '111',
      type: 'test',
    }],
    locationOptions,
    location: '',
  }),
};
</script>
