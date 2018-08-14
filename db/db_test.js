/*
使用mongoose操作mongodb的测试文件
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */

const md5 = require('blueimp-md5');
//1、连接数据库 引入mongoose
const mongoose = require('mongoose');
//2、连接指定数据库（URL只有数据库是变化的）
mongoose.connect('mongodb://localhost:27017/gzhipin_test2');
//3、获取连接对象
const conn = mongoose.connection;
//4、绑定连接完成的监听（用来提示连接成功）
conn.on('connected',function () {
  console.log('数据库连接成功')
});

//得到对应特定集合model
//1、字义schema（描述文档结构）
const userSchema = mongoose.Schema({
  username: {type: String, required: true},//用户名
  password: {type: String, required: true},//用户密码
  type: {type: String, required: true}//用户类型 大神/老板

})
//2、定义model（与集合对应可以操作集合）
const userModel = mongoose.model('users',userSchema,) //集合名users
/*3. 通过Model或其实例对集合数据进行CRUD操作*/
//3.通过model实例的save（）添加数据
function thisSave() {
  const user = {
    username:'tom', password:md5('123'),type:'dashen'
  }
  const userModel = new UserModel (user)
//保存到数据库
  userModel.save(function (error, userDoc) {
    console.log('save()',error, userDoc)
  })
  

}

// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function thisFind() {
  //查询所有得到的数据，如果没有返回[]
    userModel.find(
    {_id:'123'}, function (error,userDoc ) {
      console.log('find()',error, doc)
    })
  //查询得到的第一个对象，如果没有匹配的返回null
    userModel.findOne(
    {_id:'123'}, function (error,userDoc ) {
      console.log('findOne()', error, doc)
    })
}

// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
  const user = {username:'xxx'}
  UserModel.findByIdAndUpdate({_id:'123'},user, function (error, oldUserDoc) {
    console.log('update()', error, oldUserDoc)
  })

}
// 3.4. 通过Model的remove()删除匹配的数据
function testDelete() {
  UserModel.remove({_id:'123'}, function (error, doc) {
    console.log('delete()', error, doc)
  })
}
