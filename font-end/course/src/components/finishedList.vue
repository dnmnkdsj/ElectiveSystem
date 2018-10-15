<template>
  <div>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="name" label="课程名称" >
      </el-table-column>
      <el-table-column prop="credit" label="学分" sortable >
      </el-table-column>
      <el-table-column prop="teacher" label="任课老师" >
      </el-table-column>
      <el-table-column prop="type" label="学科" >
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
export default {
  data: () => ({
    tableData: [{
      name: '聆听音乐',
      credit: 2,
      teacher: '111',
      type: 'test',
    }],
  }),
};
</script>
