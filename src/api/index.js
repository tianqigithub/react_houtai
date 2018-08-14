
//包含n个接口请求函数的对象模块
//每个函数的返回值是promise

import ajax from './ajax'

//注册
export function reqRegister({username, password, type}) {
  return ajax('/register', {username, password, type}, 'POST')
}
//登录
export const reqLogin = (username, password) => ajax('/login',{username, password},'POST')