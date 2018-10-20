import url from 'url';

import {
  creditOptions,
  locationOptions,
  typeOptions,
  timeOptions,
} from './variable';
// eslint-disable-next-line
const Mock = require('mockjs');
const { Random } = Mock;

Mock.mock('/api/user/login', 'post', (req) => {
  const info = JSON.parse(req.body);
  const { schoolID, password } = info;
  if (schoolID && password && schoolID === password) {
    return Mock.mock({
      status: 200,
      message: {
        user: {
          name: '@string(1,6)',
          'id|0-99999': 1,
          auth: 4,
          schoolId: schoolID,
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

Mock.mock(/^\/api\/courses/, 'get', (req) => {
  const { query } = url.parse(req.url, true);
  const {
    limit, credit, time, type, location, keyword,
  } = query;
  const result = { status: 200 };
  let message;
  if (query.finished) {
    message = Mock.mock({
      [`courses|1-${limit}`]: [
        {
          id: '@integer(1, 100)',
          name: '@string(1,6)',
          'credit|+1': creditOptions,
          'type|+1': typeOptions,
          teacher: '@string(1,6)',
        },
      ],
    });
  } else {
    message = Mock.mock({
      [`courses|1-${limit}`]: [
        {
          id: '@integer(1, 100)',
          name: `@string(1,6)${keyword || ''}`,
          'credit|+1': credit || creditOptions,
          'type|+1': type || typeOptions,
          limit: '@integer(1, 100)',
          num_join: '@integer(1, 100)',
          'course_time|+1': time || timeOptions,
          'course_location|+1': location || locationOptions,
          teacher: `@string(1,6)${keyword || ''}`,
          addition: `@string(1,20)${keyword || ''}`,
        },
      ],
      total: 100,
    });
    if (query.selected) {
      message.courses.forEach((element) => {
        Object.assign(element, { has_choosen: Random.integer(0, 1) });
      });
      delete message.total;
    }
  }
  return Object.assign(result, { message });
});

Mock.mock('/api/user/select', 'post', () => Mock.mock({
  status: 200,
  message: {
    success: Random.boolean(),
  },
}));

