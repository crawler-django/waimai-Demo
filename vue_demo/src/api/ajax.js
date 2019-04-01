import axios from 'axios';

export default function ajax(url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {

    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }

    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })
}

export function fetchInfo(url='', data={}, methods='get') {
  let initObj = {};
  const searchStr = obj2String(data);
  // console.log(searchStr);
  if (methods.toLowerCase() == 'get') {
    url += '?' + searchStr

    initObj = {
      method: 'GET',
    };
  } else if (methods.toLowerCase() == 'post') {
      initObj = {
        method: 'POST',
        body: searchStr,
        //credentials: 'include'
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };
  }

  return fetch(url, initObj).then(response => {
    return response.json();
  }).then(res => {
    return res;
  }).catch(e => e);
}

function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}
