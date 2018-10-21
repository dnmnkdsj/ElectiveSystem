import url from 'url';

import {
  creditOptions,
  locationOptions,
  typeOptions,
  timeOptions,
  chooseStateEN,
  passedStateEN,
} from './variable';
// eslint-disable-next-line
const Mock = require('mockjs');
const { Random } = Mock;

Mock.mock('/api/user/login', 'post', (req) => {
  const info = JSON.parse(req.body);
  const { schoolId, password } = info;
  if (schoolId && password && schoolId === password) {
    return Mock.mock({
      user: {
        name: '@string(1,6)',
        'id|0-99999': 1,
        auth: 'student',
        major: 'computer',
        schoolId,
      },
      success: true,

    });
  }
  return Mock.mock({
    user: {},
    success: false,
  });
});

Mock.mock('/api/user/logout', 'post', () => Mock.mock({
  success: true,
}));

Mock.mock(/^\/api\/user\/courses\/passed/, 'get', () => {
  const message = Mock.mock({
    'courses|1-6': [
      {
        id: '@integer(1, 100)',
        name: '@string(1,6)',
        'credit|+1': creditOptions,
        'type|+1': typeOptions,
        teacher: '@string(1,6)',
      },
    ],
  });
  return message;
});


Mock.mock(/^\/api\/user\/courses\/selected/, 'get', () => {
  const message = Mock.mock({
    'courses|1-5': [
      {
        id: '@integer(1, 100)',
        'state|+1': chooseStateEN,
        name: '@string(1,6)',
        'credit|+1': creditOptions,
        'type|+1': typeOptions,
        limit: '@integer(1, 100)',
        num_join: '@integer(1, 100)',
        'course_time|+1': timeOptions,
        'course_location|+1': locationOptions,
        teacher: '@string(1,6)',
        addition: '@string(1,20)',
      },
    ],
    total: 100,
  });
  return message;
});

Mock.mock('/api/user/select', 'post', () => Mock.mock({
  success: Random.boolean(),
}));

Mock.mock(/^\/api\/courses\//, 'delete', () => Mock.mock({
  success: Random.boolean(),
}));


Mock.mock(/^\/api\/courses\//, 'get', () => {
  const message = Mock.mock({
    course:
      {
        id: '@integer(1, 100)',
        name: '@string(1,6)',
        'credit|+1': creditOptions,
        'type|+1': typeOptions,
        limit: '@integer(1, 100)',
        num_join: '@integer(1, 100)',
        'course_time|+1': timeOptions,
        'course_location|+1': locationOptions,
        teacher: '@string(1,6)',
        addition: '@string(1,20)',
      },
    'students|1-30': [{
      id: 12,
      name: '@string(1,5)',
      school_id: 'U2016171',
      major: '@string(1,5)',
      'state|+1': passedStateEN,
    }],
  });
  return message;
});

Mock.mock(/^\/api\/courses\//, 'post', () => Mock.mock({
  success: true,
}));

Mock.mock(/^\/api\/courses/, 'get', (req) => {
  const { query } = url.parse(req.url, true);
  const {
    limit, credit, time, type, location, keyword,
  } = query;
  const message = Mock.mock({
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
  return message;
});

Mock.mock('/api/courses', 'post', () => Mock.mock({
  success: true,
}));

Mock.mock('/api/setup/break', 'post', () => Mock.mock({
  success: true,
}));
Mock.mock('/api/setup/times', 'put', (req) => {
  const info = JSON.parse(req.body);
  console.log(info);
  return Mock.mock({
    success: true,
  });
});

Mock.mock('/api/setup/times', 'get', () => Mock.mock({
  start_time: 1550060914344,
  end_time: 1560060914344,
  select_time: 1570060914344,
}));
