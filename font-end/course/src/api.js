import Axios from 'axios';

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
        config.headers.Authorization = token;
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

export const postLogin = async (accout, password) => {
  const data = Object.assign({}, { accout, password });
  console.log(data);
  const res = await axios.post('/user/login', data);
};

export const getCourses = async () => {
  const res = await axios.post('/get');
};

