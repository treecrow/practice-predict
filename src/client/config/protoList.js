import {
  validator,
  Merge,
  DeepCopy,
  Request,
} from './util'

import avatarImg from 'client/assets/imgs/avatar.jpg'
import coverImg from 'client/assets/imgs/cover.jpg'

// 向 vue实例添加方法
const protoList = {}
protoList.install = (Vue) => {
  Vue.prototype.validator = validator
  Vue.prototype.Merge = Merge
  Vue.prototype.DeepCopy = DeepCopy
  Vue.prototype.Request = Request
  Vue.filter('unfilled', (value) => {
    return value ? value : '未填'
  })
  Vue.filter('defaultAvatar', (value) => {
    return value ? value : avatarImg
  })
  Vue.filter('time', (value) => {
    return new Date(Number(value)).toLocaleDateString()
  })
  // 备用
  Vue.filter('defaultCover', (value) => {
    return value ? value : coverImg
  })
}
export default protoList
