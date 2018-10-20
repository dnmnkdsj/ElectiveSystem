<template>
  <el-row tag="header">
    <el-col :xs="24" :sm="4">
      <router-link to="/" class="title">
        <h1><i class="el-icon-star-off"></i>选课系统</h1>
      </router-link>
    </el-col>
    <el-col :xs="20" :sm="12" style="height:60px;">
      <el-menu router class="menu" mode="horizontal"
      :text-color="color.color_text"
      :active-text-color="color.color_theme"
      :default-active="activeIndex" v-if="user" ref="menu">
        <el-menu-item :index="tab.path" v-for="tab in tabs" :key="tab.path">
          {{tab.name}}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs='4' :sm="{span:2,offset:3}">
      <div class="btn-group">
        <el-button type="text" v-if="!user" @click="toLogin">登录</el-button>
        <div class="user-name" v-if="user">{{user.name}}</div>
        <el-button type="text" v-if="user" @click="toLogout">登出</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
@import "../style/variable";
@import "../style/base";
.menu {
  border-bottom: 0;
}

.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: $color-theme;
  text-decoration: none;
}

.btn-group {
  line-height: 60px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user-name {
  @include no-wrap;
  color: $color-theme;
}
</style>


<script>
import { mapGetters } from 'vuex';
import { storeKey, color, routes, adminRoutes, storeType, authLevel } from '../variable';
import { postLogout } from '../api';

export default {
  data: () => ({
    color,
  }),
  methods: {
    toLogin() {
      this.$router.replace('/login');
    },
    async toLogout() {
      const loading = this.$loading({
        lock: true,
        text: '登出中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      await postLogout();
      this.$store.commit(storeType.LOGOUT);
      loading.close();
      this.$router.replace('/');
    },
  },
  created() {
    this.activeIndex = this.$route.path;
  },
  computed: {
    ...mapGetters([storeKey.userKey]),
    tabs() {
      if (this.user) {
        const index = authLevel.indexOf(this.user.auth);
        return [routes, adminRoutes][index];
      }
      return [];
    },
  },
  watch: {
    $route(to) {
      if (this.user && this.$refs.menu) {
        this.$refs.menu.activeIndex = to.path;
      }
    },
  },
};
</script>
