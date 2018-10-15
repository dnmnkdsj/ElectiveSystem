import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/index.vue';
import Admin from './pages/admin.vue';
import Login from './pages/login.vue';
import Course from './pages/course.vue';
import ForgetPassword from './pages/forgetPassword.vue';
import NotFound from './pages/notFound.vue';
import CourseList from './components/courseList.vue';
import FinishedList from './components/finishedList.vue';
import SelectedList from './components/selectedList.vue';

Vue.use(Router);

export default new Router({
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
        },
        {
          path: 'selected',
          component: SelectedList,
        },
        {
          path: 'finished',
          component: FinishedList,
        },
      ],
    },
    {
      path: '/404',
      component: NotFound,
    },
  ],
});
