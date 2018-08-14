/*
使用axios封装的ajax请求函数
函数返回的是promise对象
 */

import axios from 'axios'
export default function ajax(url, data={}, type='GET') {
  //git请求
  if (type==='GET'){
    //根据data来拼query参数串
    let query = ''
    //object.keys（data）：得到指定对象自身所有属性名组成的数组  [username, password]

    object.keys(data).forEach(key => {
      const value = data[key]
      queryStr += `${key}=${value}&`
    })
    if (queryStr){
      queryStr = queryStr.substring(0, queryStr.length-1)
      url += '?'+ queryStr
    }
  }else {//post请求
    return axios.post(url, data)
  }
}