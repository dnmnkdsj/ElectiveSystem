FORMAT: 1A

# 选课系统接口文档
选课系统后台接口  
设计指导  
RESTful API 设计指南：http://www.ruanyifeng.com/blog/2014/05/restful_api.html  
API blueprint：https://apiblueprint.org/

# Group 用户
在用户Group下的api设计均没有显性的方式提交身份信息，包括进行查询，
server将从每个报文的头部自动读取cookie来判断身份。

## 登录 [POST /api/user/login]

+ Request (application/json)

            {
                "schoolId": "U2016777",
                "password": "password"
            }

+ Response 200 (application/json)

    + Headers

            token: "token"

    + Body

            {
                "success":true,
                "user":{
                            "schoolId": "U2016777",
                            "name": "学生姓名",
                            "id": 123,
                            "major": "computer",
                            "auth": "admin"
                        }
            }
    
    + Schema

            {
                "auth": "admin 代表管理员， student 代表普通用户"
                "success" : "true 表示登录成功，false表示登录失败，其他value均无效"
            }

## 退出 [POST /api/user/logout]

+ Response 200 (application/json)

    + Body

            "success": true

## 查询学生通过的课程 [GET /api/user/courses/passed/]

+ Response 200 (application/json)

    + Body

            {
                "courses":[
                    {
                        "id": 123,
                        "name": "python课程1",
                        "credit": 2,
                        "type": "科学",
                        "teacher": "老师",
                    },
                    {
                        "id": 124,
                        "name": "python课程2",
                        "credit": 2,
                        "type": "科学",
                        "teacher": "老师",
                    }]
            }

## 查询学生已选课程的 [GET /api/user/courses/selected/]

+ Response 200 (application/json)

    + Body

            {
                "courses":[
                    {
                        "id": 123,
                        "name": "python课程1",
                        "type": "科学",
                        "course_time": "周一",
                        "course_location": "东九",
                        "limit": 55,
                        "num_join": 35,
                        "credit": 2,
                        "in_course": true
                    },
                    {
                        "id": 124,
                        "name": "python课程2",
                        "type": "科学",
                        "course_time": "周一",
                        "course_location": "东九",
                        "limit": 55,
                        "num_join": 35,
                        "credit": 2,
                        "in_course": true
                    }]
            }

## 学生选课 [POST /api/user/select/]

+ Request (application/json)

    + Body
 
            {
                "select": true 
                "course_id": 2
            }

    + Schema

            {
                "select": "true表示选修，false表示退选"
            }

+ Response 200 (application/json)
    
    + Body

            {
                "success": true
            }

    + Schema

            {
                "success": "true表示通过，false表示失败、课程不存在/已通过等"
            }

<!-- ## 更改密码 [POST /api/user/changepwd/] 
因为没有找回密码，暂时不做

+ Request (application/json)

    + Body

            {
                "new_password": "newpass"
            }
    
    + Schema

            {
                "new_password": "最好所有的密码都填散列后的"
            }

+ Response 200 (application/json)

    + Body

            {
              "success": true
            } -->

# Group 课程 

## 课程列表 [/api/courses/]
课程列表下有两个方法，GET可以得到列表，POST仅一次添加一门课程。

### 查询课程 [GET]

+ Request (application/json)

    + Body

            {
                "limit": 10,
                "offset": 7,
                "keyword": "python",
                "time": "周一",
                "credit": 2,
                "location": "东九",
                "type": "科学"
            }

    + Schema

            {
                "imit": "Number",
                "offset": "参照数据库这两个关键字 这两个关键字必然存在 后面参数可能不存在"
            }

+ Response 200 (application/json)

    + Body

            {
                "courses":[
                    {
                        "id": 123,
                        "name": "python课程1",
                        "credit": 2,
                        "type": "科学",
                        "limit": 45,
                        "num_join": 30,
                        "course_time": "周一",
                        "course_location": "东九",
                        "teacher": "老师",
                        "addtion": "Python初级教学"
                    },
                    {
                        "id": 124,
                        "name": "python课程2",
                        "credit": 2,
                        "type": "科学",
                        "limit": 45,
                        "num_join": 30,
                        "course_time": "周一",
                        "course_location": "东九",
                        "teacher": "老师",
                        "addtion": "Python初级教学2"
                    }],
                "total": 2
            }

    + Schema

            {
                "courses":"返回课程的list"
                "course":{
                    "id": "课程id",
                    "type": "三种：人文、科学、综合",
                    "course_time": "周一、周二……周日",
                    "course_location": "东九、东十二、西十二",
                    "limit": "人数上限",
                    "num_join": "已加入人数",
                    "credit": "Option: 1,1.5,2,2.5,3,3.5,4,4.5,5"
                }
            }

### 新建课程 [POST]
Response 400 if has no admin auth.

+ Request (application/json)

    + Body

            {
                "name": "python课程1",
                "credit": 2,
                "type": "科学",
                "limit": 45,
                "num_join": 30,
                "course_time": "周一",
                "course_location": "东九",
                "teacher": "老师",
                "addtion": "Python初级教学"
            }

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "course_id": 123
            }

+ Response 400

## 课程 [/api/course/{id}/]

+ Parameters

    + id: 123 (number) - 课程id

### 查询课程详情 [GET]

+ Response 200 (application/json)

    + Body

            {
                course:{
                    "id": 123,
                    "name": "python课程1",
                    "credit": 2,
                    "type": "科学",
                    "limit": 45,
                    "num_join": 30,
                    "course_time": "周一",
                    "course_location": "东九",
                    "teacher": "老师",
                    "addtion": "Python初级教学"
                },
                students:[{
                    "id": 12,
                    "name": "学生1",
                    "school_id": "U2016171",
                    "major": "computer",
                    "state": "passed"
                },{
                    "id": 13,
                    "name": "学生2",
                    "school_id": "U2016172",
                    "major": "computer",
                    "state": "undecided"
                }]
            }

### 修改课程评分 [POST]

+ Request (application/json)

    + Body

            {
                "students": [{
                    "id": 12,
                    "state": "passed"
                    },{
                    "id": 13,
                    "state": "undecided"
                    }]
            }

    + Schema

            "state": "Option: passed,failed,undecided"

+ Response 200 (application/json)

    + Body

            "success": true

### 删除一门课程 [DELETE]

+ Response 201 (application/json)

    + Body

            "success": true

# Group 选课系统设置

## 选课的开始、结束和抽签时间 [/api/setup/times]

### 缺 GET 查看三个时间戳的请求 [GET]

+ Response 200 (application/json)

    + Body

            {
                "start_time": 1540029819000,
                "end_time": 1540029824000,
                "select_time": 1540029819000
            }

### 更新选课的开始、结束和抽签时间 [PUT]

+ Request (application/json)

    + Body

            {
                "start_time": 1540029819000,
                "end_time": 1540029824000,
                "select_time": 1540029819000
            }

+ Response 200 (application/json)

    + Body

            "success": true

## 立即终止选课 [POST /api/setup/break]

+ Response 200 (application/json)

    + Body

            "success": true
