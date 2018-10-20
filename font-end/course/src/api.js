import Axios from 'axios';
import { pageSize } from './variable';

const axios = Axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  (config) => {
    if (config.method !== 'get') {
      const token = localStorage.getItem('loginToken');
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  },
  err => Promise.reject(err),
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('loginItem');
      }
    }
    return Promise.reject(error);
  },
);

export const postLogin = async (account, password) => {
  const data = Object.assign({}, { schoolID: account, password });
  try {
    const res = await axios.post('/user/login', data);
    console.log(res);
    if (res.data.status !== 200) { throw new Error('server login is failed'); }
    return res.data.message;
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
    if (res.data.status !== 200) { throw new Error('server login is failed'); }
    return res.data.message;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

export const postSelect = async (userId, courseId, select) => {
  const data = Object.assign({}, { user_id: userId, course_id: courseId, select });
  try {
    const res = await axios.post('/user/select', data);
    if (res.data.status !== 200) { throw new Error('server login is failed'); }
    return res.data.message;
  } catch (e) {
    throw new Error('server login is failed');
  }
};

