// data config

export const storeKey = {
  tokenKey: 'token',
  userKey: 'user',
  stateKey: 'courseState',
};

export const storeType = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CHANGE_STATE: 'STATE_CHANGE',
};
export const routes = [
  { path: '/course', name: '课程列表' },
  { path: '/course/selected', name: '已选课程' },
  { path: '/course/finished', name: '已修课程' },
];

export const adminRoutes = [
  { path: '/admin', name: '管理课程' },
];

export const authLevel = [
  'student', 'admin',
];


export const codeAnswer = [
  'dgks', 'uqdo',
];

export const newCourseRules = {
  name: [
    { required: true, message: '请输入课程名称', trigger: 'blur' },
  ],
  teacher: [
    { required: true, message: '请输入授课老师名字', trigger: 'blur' },
  ],
  course_location: [
    { required: true, message: '请选择上课地点', trigger: 'change' },
  ],
  course_time: [
    { required: true, message: '请选择上课时间', trigger: 'change' },
  ],
  credit: [
    { required: true, message: '请选择课程学分', trigger: 'change' },
  ],
  type: [
    { required: true, message: '请选择课程分类', trigger: 'change' },
  ],
  limit: [
    { required: true, message: '请输入上课上限人数', trigger: 'change' },
  ],

};


export const timeRules = {
  start_time: [
    { required: true, message: '请设置开始时间', trigger: 'change' },
  ],
  end_time: [
    { required: true, message: '请设置结束时间', trigger: 'change' },
  ],
  select_time: [
    { required: true, message: '请设置抽签时间', trigger: 'change' },
  ],

};
// client customization

export const color = {
  color_background: '#fff',
  color_theme: '#409eff',
  color_sub_theme: '#36465d',
  color_text: '#444444',
};

export const pageSize = 10;

export const certificateType = [
  '身份证',
  '港澳通行证',
];


export const locationOptions = [
  '东九楼',
  '东十二',
  '西十二',
];

export const timeOptions = [
  '周一', '周二', '周三', '周四', '周五', '周六', '周日',
];

export const creditOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
];

export const typeOptions = [
  '人文', '科学', '综合',
];

export const chooseState = [
  '待抽签', '正选',
];

export const chooseStateEN = [
  'waiting', 'selected',
];

export const passedState = [
  '待评定', '通过', '不及格',
];

export const passedStateEN = [
  'undecided', 'passed', 'failed',
];
