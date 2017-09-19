// 引入模块
const fs = require('fs')
const path = require('path')

class util {
  // 对象属性名转化为下划线形式
  static toLineObj(obj) {
    function toLineStr(str) {
      return str.replace(/([A-Z])/g, "_$1").toLowerCase()
    }
    let newObj = {}
    for (let [key, value] of Object.entries(obj)) {
      newObj[toLineStr(key)] = value
    }
    return newObj
  }

  // 对象属性名转化为驼峰形式
  static toHumpObj(obj) {
    if (!obj) return null
    if (Array.isArray(obj)) {
      return obj.map((item) => {
        return util.toHumpObj(item)
      })
    }

    function toHumpStr(str) {
      return str.replace(/_(\w)/g, ($0, $1) => {
        return $1.toUpperCase()
      })
    }
    let newObj = {}
    for (let [key, value] of Object.entries(obj)) {
      newObj[toHumpStr(key)] = value
    }
    return newObj
  }

  // 用 '%' 包裹字符串，用于 like 查询
  static tiLikeStr(str) {
    return '%' + str + '%'
  }

  // 验证是否是手机号
  static isPhone(str) {
    return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
  }

  // 验证是否是邮箱
  static isEmail(str) {
    let pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return pattern.test(str)
  }

  // 生成验证码（激活码）
  static getActiveCode(count) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', , 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ]
    return arr.sort(() => Math.random() - 0.5).slice(-1 - count).join('')
  }

  // 同步创建文件目录
  static mkdirsSync( dirname ) {
    if (fs.existsSync( dirname )) {
      return true
    } else {
      if (mkdirsSync( path.dirname(dirname)) ) {
        fs.mkdirSync( dirname )
        return true
      }
    }
  }

  // 获取上传文件的后缀名
  static getSuffixName( fileName ) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
  }
}

module.exports = util
