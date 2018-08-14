var express = require('express');
var router = express.Router();
//引入md5 加密函数库
const md5 = require('blueimp-md5')
//引入UserModel
const UserModel = require('../db/models').UserModel
const filter = {password: 0}  //查询时过滤不需要的属性


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
提供一个用户注册的接口
  a)path为: /register
  b)请求方式为: POST
  c)接收username和password参数
  d)admin和xfzhang是已注册用户
  e)注册成功返回: {code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}}
  f)注册失败返回: {code: 1, msg: '此用户已存在'}
 */
/*
后台路由回调的3步?
1. 获取请求参数数据
    GET:
      query参数: /register?username=xxx&password=yyy   req.query属性
      param参数: /register/:username  /register/xxx   req.params属性
    POST: req.body属性
2. 处理数据
    a. 会有一些逻辑计算
    b. 可能会操作数据库

3. 返回响应数据
 */
/*router.post('/register', function (req, res) {
  // 1. 获取请求参数数据
  const {username, password} = req.body

  // 2. 处理数据
  if (username==='admin' || username==='xfzhang') { // 注册不能成功
    // 3. 返回响应数据(失败)
    res.send({code: 1, msg: '此用户已存在'})
    // res.json({code: 1, msg: '此用户已存在'})
  } else { // 注册能成功
    // 将用户信息保存到数据库
    // 3. 返回响应数据 (成功)
    res.json({code: 0, data: {_id: 'abc', username, password}})
  }
})*/

//注册的路由

router.post('/register', function (req, res, ) {
  //1. 获取请求参数数据(username, password, type)
  const {username, password,type} = req.body
  // 2. 处理: 根据username查询users集合, 如果有, 直接返回了一个失败的提示数据, 如果没有, 保存, 完成后返回一个成功的信息
  UserModel.findOne({username}, function (error, userDoc) {
    if (userDoc) {//此用户已有
      //返回一个提示响应数据
      res.send({code: 1, msg: '此用户已存在'})//code 是数据是否是正常数据的标识
    } else {//没有此用户 可注册
      //向浏览器返回一个cookie数据（实现注册成功后自动登录）
      res.cookie('userid', userDoc._id,{maxAge:1000*60*60*24*7})
      //创一个实例对象
      new UserModel({username,password:md5(password),type}).save((error, userDoc) => {
        //3.返回响应
      res.json({code: 0, data:{_id: userDoc._id, username, type}})
      })
    }
  })

})

// 2. 登录的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username 和 passWord 查询users 集合， 如果有对应的user， 返回成功的信息，如果没有返回失败的信息
  UserModel.findOne({username, password:md5(password)}, (error, userDoc) => {
    if (userDoc){//成功
      //向浏览器返回一个cookie数据（实现七天免登录）
      res.cookie('userid', userDoc._id,{maxAge:1000*60*60*24*7})
      res.send({code:0, data:userDoc})
    }else {//失败
      res.send({code:1, msg: '用户名或密码错误'})
    }
  })
})



module.exports = router;
