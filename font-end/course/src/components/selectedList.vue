<template>
  <div>
    <div>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="name" label="课程名称">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable>
        </el-table-column>
        <el-table-column prop="teacher" label="任课老师">
        </el-table-column>
        <el-table-column prop="time" label="上课时间">
        </el-table-column>
        <el-table-column prop="location" label="上课地点">
        </el-table-column>
        <el-table-column  label="人数">
          <el-table-column prop="num_join" label="已选人数">
          </el-table-column>
          <el-table-column prop="limit" label="最大容量">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="state" label="选课状态">
        </el-table-column>
        <el-table-column label="退选">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">退选</el-button>
      </template>
    </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
export default {
  data: () => ({
    tableData: [],
  }),
};
</script>
