import Axios from 'axios';
import { pageSize } from './variable';
import router from './router';

const axios = Axios.create({
  baseURL: '/api',
  timeout: 5000,
});


// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        router.replace('/404');
      }
    }
    return Promise.reject(error);
  },
);

export const postLogin = async (account, password) => {
  const data = Object.assign({}, { schoolId: account, password });
  try {
    const res = await axios.post('/user/login', data);
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const postLogout = async () => {
  try {
    const res = await axios.post('/user/logout');
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const getPassedCourses = async () => {
  try {
    const res = await axios.get('/user/passedcourses');
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const postSelect = async (courseId, select) => {
  const data = Object.assign({}, { course_id: courseId, select });
  try {
    const res = await axios.post('/user/select', data);
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const getCourses = async (payload = {}) => {
  let params = {
    limit: pageSize,
    offset: 0,
  };
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== '') {
      params = Object.assign(params, { [key]: value });
    }
  });
  try {
    const res = await axios.get('/courses', { params });
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const getCourseDetail = async (id) => {
  try {
    const res = await axios.get(`/courses/${id}`);
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const delCourse = async (id) => {
  try {
    const res = await axios.delete(`/courses/${id}`);
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const postNewCourse = async (payload) => {
  try {
    const res = await axios.post('/courses', payload);
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const postBreak = async () => {
  try {
    const res = await axios.post('/setup/break');
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const putTiming = async (data) => {
  try {
    const res = await axios.put('/setup/times', data);
    return res.data;
  } catch (e) {
    throw new Error('server login is failed');
  }
};
