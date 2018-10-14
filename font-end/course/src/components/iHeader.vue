<template>
  <el-row tag="header">
    <el-col :xs="24" :sm="4">
      <h1 class="title"><i class="el-icon-star-off"></i>选课系统</h1>
    </el-col>
    <el-col :xs="20" :sm="12">
      <el-menu router class="menu" mode="horizontal"
      :text-color="color.color_text"
      :active-text-color="color.color_theme">
        <el-menu-item :index="tab.path" v-for="tab in tabs" :key="tab.path">
          {{tab.name}}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs='4' :sm="{span:2,offset:3}">
      <div class="btn-group">
        <el-button type="text">登录</el-button>
        <el-button type="text">登出</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.menu {
  border-bottom: 0;
}

.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.btn-group {
  line-height: 60px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>


<script>
import { mapGetters } from 'vuex';
import { storeKey, color } from '../variable';

export default {
  data: () => ({
    color,
    tabs: [
      { path: '/course', name: '课程列表' },
      { path: '/course/selected', name: '已选课程' },
      { path: '/course/finished', name: '已修课程' },
    ],
  }),
  computed: {
    ...mapGetters([storeKey.userKey]),
  },
};
</script>
