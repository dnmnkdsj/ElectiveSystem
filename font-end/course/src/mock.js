import url from 'url';
// eslint-disable-next-line
const Mock = require('mockjs');
// 获取 mock.Random 对象
const { Random } = Mock;

Mock.mock('/api/login', 'post', (req) => {
  const info = JSON.parse(req.body);
  const { account, password } = info.params;
  if (account && password && account === password) {
    return Mock.mock({
      status: 200,
      message: {
        user: {
          'id|0-99999': 1,
          auth: 5,
          schoolId: info.params.account,
        },
        success: true,
        token: 'adsfsdafsdfasdfsadfasdfasdfsadfsdf',
      },
    });
  }
  return Mock.mock({
    status: 200,
    message: {
      user: {},
      success: false,
      token: '',
    },
  });
});
