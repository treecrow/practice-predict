import validator from 'validator'
import Cookies from 'js-cookie'
import Request from 'superagent'

// 只拷贝 obj1 对象中有的字段
function Merge(obj1, obj2) {
  for (let key in obj1) {
    obj1[key] = obj2[key]
  }
}
// 深复制
function DeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export {
  Cookies,
  validator,
  Request,
  Merge,
  DeepCopy,
}
