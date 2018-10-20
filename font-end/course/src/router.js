import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Index from './pages/index.vue';
import Admin from './pages/admin.vue';
import Login from './pages/login.vue';
import Course from './pages/course.vue';
import ForgetPassword from './pages/forgetPassword.vue';
import NotFound from './pages/notFound.vue';
import CourseList from './components/courseList.vue';
import FinishedList from './components/finishedList.vue';
import SelectedList from './components/selectedList.vue';
import { authLevel } from './variable';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/admin',
      component: Admin,
      meta: { requireAuth: true, admin: true },
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/lost',
      component: ForgetPassword,
    },
    {
      path: '/course',
      component: Course,
      children: [
        {
          path: '',
          component: CourseList,
          meta: { requireAuth: true },
        },
        {
          path: 'selected',
          component: SelectedList,
          meta: { requireAuth: true },
        },
        {
          path: 'finished',
          component: FinishedList,
          meta: { requireAuth: true },
        },
      ],
    },
    {
      path: '/404',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLogin = !!store.state.user;
  if (to.matched.length === 0) { // 如果未匹配到路由
    next('/404');
  }
  if (to.meta.requireAuth && !isLogin) { // 判断该路由是否需要登录权限
    next('/404');
  }
  if (to.meta.admin && store.state.user.auth !== authLevel[1]) {
    next('/404');
  }
  next();
});

export default router;

