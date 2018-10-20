```
以下所有response按这个格式， 只会描述message中的内容
token在header的Authorization 字段

{
	status:Number //按需求定状态码 常见是 200 401 404
	message:{
        
	}
}
```







POST /api/user/login

```json
request
{
	account:
    password:
}
message 
{
   success:true,//true表示通过 false表示密码错误
   token: //JWT生成的
   user:
    {
   		SchoolID:String //学号或工号 数据库需要设置为唯一
   		name:String //学生名
   		id：唯一 id号
   		auth: Number//权限等级
	}
}
```



POST /api/user/select 选课

```json
request
{
	select:true //true为选修 false为退选 
    user_id:
    course_id:
}
message 
{
   success:true/false//true表示通过 false表示失败 课程不存在等
}
```





GET /api/courses 

```json
request
{
    limit:Number
    offset:Number //参照数据库这两个关键字 这两个关键字必然存在 后面参数可能不存在
    keyword:String
    time:Number
    credit:Number
    location:String
    type: String
}

以上request的参数可能有的时候为空 按需搜索
message 
{
    courses|0-limit:[ //按照搜索的顺序返回 如有limit返回上限数的数据 按create_time排序
    {	
		id:Number
    	name:String
    	credit:NUM
    	type:String
    	limit:NUM
    	num_join:NUM
    	course_time:String
    	courese_location:String
    	teacher:String
    	addition：String
	}]  
	total:NUM //每次都需要统计总共符合条件的记录数
}

request
{
    selected:true //当查询已修课程时 会有该参数 当存在该参数时下列response的message变化
}

以上request的参数可能有的时候为空 按需搜索
message 
{
    courses|0-limit:[ //按照搜索的顺序返回 如有limit返回上限数的数据 按create_time排序
    {	
		id:Number
    	name:String
    	credit:NUM
    	type:String
    	limit:NUM
    	num_join:NUM
    	course_time:String
    	courese_location:String
    	teacher:String
    	addition：String
    	has_choosen :BOOL //true为正选 false为待抽签
	}]  
}

request
{
    user_id:NUM
    finished:true //当查询已修课程时 会有该参数 当与selected共存时报错response的status改为404
}

以上request的参数可能有的时候为空 按需搜索
message 
{
    courses|0-limit:[ //按照搜索的顺序返回 如有limit返回上限数的数据 按create_time排序
    {	
		id:Number
    	name:String
    	credit:NUM
    	type:String  	
    	teacher:String
	}]  
}
```



GET /api/courses/:id  管理员获取单个课程列表

```json
request
{
    id:Number 课程ID
}

message 
{
    course: 
    {	
		id:Number
    	name:String
    	credit:
    	type:
    	limit:
    	num_join:
    	course_time:
    	courese_location:
    	teacher:String
        addition: String 备注
	}
    students:[{
    	id:Number
    	name:
    	schoolID（工号或学号）:String
	}]
}
```





POST /api/courses  新建课程

```json
request
{
	limit:Number
    num_join:Number
    keyword:String
    time:Number
    credit:Number
    location:0 1 2 3//0为东九 1为东十二
    type: 0 1 2 //0是综合 1是人文 2是科学 3是艺术
}

以上request的参数可能有的时候为空 按需搜索
message 
{
    success:true/false
}
```





DELETE /api/courses/:id 

```json
request  //课程id 在url
{
    token:
}

message 
{
    success:ture/false
}
```













