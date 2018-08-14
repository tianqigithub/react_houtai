/*
包含n个能操作mongodb数据库集合的model的模块
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义出对应特定集合的Model并向外暴露
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
  2.3. 向外暴露Model
 */
//1、连接数据库
//1.1 引入mongoose
const mongoose = require('mongoose')
//2、连接指定数据库（URL 只有数据库是变化的）
mongoose.connect('mongodb://localhost:27017/bossz')
//1.3 获取连接对象
const conn = mongoose.connection
//1.4 绑定连接完成的监听（用来提示连接成功）
conn.on('connected', function () {
  console.log('数据库连接成功')
})
//2、定义出对应特定集合的Model 并向外暴露
// 2.1 字义Schema（描述文档结构）
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String},
  header: {type: String},
  post: {type: String},
  info: {type: String},
  company: {type: String},
  salary: {type: String},

})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema)
//2.3 向外暴露Model
exports.UserModel = UserModel

/*
1. 一次性暴露: module.exports = value
2. 分多次暴露: exports.xxx = value1  exports.yyy = value2
3. commonjs向外暴露暴露永远是exports
4. exports的默认值是一个{}

exports.xxx = function (){}   // 向外暴露一个对象, 对象中包含xxx方法
const xxx = require('xxx')
xxx.xxx()

module.exports = function (){}  // 向外暴露一个函数

如何选择暴露对象, 还是暴露一个函数?
    模块包含一个功能(函数)还是多个功能(对象)
 */