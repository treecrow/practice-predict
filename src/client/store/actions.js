// --------------------------引入模块--------------------------
import {
  Message,
} from 'element-ui'
import {
  Request,
  Cookies,
} from 'client/config/util'
import queryList from './queryList'

import router from 'client/config/router'

// --------------------------query--------------------------
// 获取用户自身信息
export const getUser = async({
  commit,
  getter
}, infoId) => {
  let user = await getPostPms(queryList.userQuery, {
    infoId
  }, 'user', )
  if (!user) {
    console.error('getUser error: 获取用户信息失败')
    return
  }
  if (!user.info) {
    console.error('到404页面')
    return
  }
  commit('setInfo', user.info)
  commit('setAuthList', user.authList)
}
// 获取用户 home 消息
export const getMsgHomeList = async({
  commit,
  getter
}, infoId) => {
  let user = await getPostPms(queryList.msgHomeListQuery, {
    infoId
  }, 'user', )
  if (!user) {
    console.error('getUser error: 获取用户 home 消息失败')
    return
  }
  commit('setMsgHomeList', user.msgHomeList)
}
// 获取 opus 相关信息
export const getPredict = async({
  commit,
  getter
}, opusId) => {
  let predict = await getPostPms(queryList.predictQuery, {
    opusId
  }, 'predict', )
  if (!predict) {
    console.error('getPredict error: 获取作品失败')
    return
  }
  commit('setOpus', predict.opus)
  commit('setOpusRelate', predict.opusRelate)
  commit('setOpusCommentList', predict.commentListByTime)
}

// --------------------------mutations--------------------------
// 创建验证码
export const createVerify = async({
  commit
}, verifyObj) => {
  let successStr = await getPostPms(queryList.createVerifyQuery, {
    verifyObj
  }, 'createVerify')
  if (!successStr) {
    console.error('createVerify error: 创建验证码失败')
    return
  }
  // 成功创建验证码
  commit('setLoginModel', {
    sending: false,
    canSend: false
  })
  // 开始计时
  let count = 60
  let counter = setInterval(() => {
    commit('setLoginModel', {
      codeText: count
    })
    count--
  }, 1000)
  // 结束计时
  setTimeout(function() {
    clearInterval(counter)
    commit('setLoginModel', {
      canSend: true
    })
  }, 6000)
}
// 用户注册
export const createUser = async({
  commit
}, authObj) => {
  let successStr = await getPostPms(queryList.createUserQuery, {
    authObj
  }, 'createUser')
  if (!successStr) {
    console.error('createUser error: 注册用户失败')
    return
  }
  // 提示注册成功
  // ...
  // 跳转到登录模式
  commit('setLoginModel', {
    type: 'signin'
  })
}
// 用户登录
export const userLogin = async({
  commit
}, authObj) => {
  let user = await getPostPms(queryList.userLoginQuery, {
    authObj
  }, 'userLogin')
  if (!user) {
    commit('setLoginModel', {
      fail: true
    })
    return
  }
  commit('setUserId', user.infoId)
  commit('setLoginModel', {
    show: false
  })
  Message({
    message: '登录成功!',
    type: 'success'
  })
}
// 重置密码
export const updatePassword = async({
  commit
}, authObj) => {
  let successStr = await getPostPms(queryList.updatePasswordQuery, {
    authObj
  }, 'updatePassword')
  if (!successStr) {
    console.error('updatePassword error: 重置密码失败')
    return
  }
  console.log('跳转到登录模式')
  // 跳转到登录模式
  commit('setLoginModel', {
    type: 'signin'
  })
}
// 用户注销
export const userLogout = async({
  commit
}) => {
  Cookies.remove('token')
  commit('setUserId', 0)
}
// 添加 auth
export const addAuth = async({
  commit
}, authObj) => {
  let authList = await getPostPms(queryList.addAuthQuery, {
    authObj
  }, 'addAuth')
  if (!authList) {
    console.error('添加 auth 失败')
    return
  }
  commit('setAuthList', authList)
  commit('setLoginModel', {
    show: false
  })
  Message({
    message: '成功添加登录方式!',
    type: 'success'
  })
}
// 删除 auth
export const removeAuth = ({
  commit
}, authType) => {}
// 修改 info
export const updateInfo = async({
  commit
}, infoObj) => {
  console.log(infoObj)
  let info = await getPostPms(queryList.updateInfoQuery, {
    infoObj
  }, 'updateInfo')
  console.log(info)
  if (!info) {
    console.error('更新 info 失败')
    return
  }
  commit('setInfo', info)
  Message({
    message: '成功更新用户自身信息!',
    type: 'success'
  })
}
// 创建 opus
export const createOpus = async({
  commit
}, opusObj) => {
  let opusId = await getPostPms(queryList.createOpusQuery, {
    opusObj
  }, 'createOpus')
  if (!opusId) {
    console.error('创建 opus 失败')
    return
  }
  Message({
    message: '成功创建作品!',
    type: 'success'
  })
  // 跳转到 opus/opusId 到展示页面
  router.replace({
    name: 'opus',
    params: {
      opusId
    }
  })
}
// 创建 care
export const createCare = async({
  commit
}, careOpusId) => {
  let opusRelate = await getPostPms(queryList.createCareQuery, {
    careOpusId
  }, 'createCare')
  if (!opusRelate) {
    console.error('创建 care 失败')
    return
  }
  commit('setOpusRelate', opusRelate)
}
// 删除 care
export const deleteCare = async({
  commit
}, careOpusId) => {
  let opusRelate = await getPostPms(queryList.deleteCareQuery, {
    careOpusId
  }, 'deleteCare')
  if (!opusRelate) {
    console.error('删除 care 失败')
    return
  }
  commit('setOpusRelate', opusRelate)
}
// 创建 judge
export const createJudge = async({
  commit
}, judgeObj) => {
  let opusRelate = await getPostPms(queryList.createJudgeQuery, {
    judgeObj
  }, 'createJudge')
  if (!opusRelate) {
    console.error('创建 judge 失败')
    return
  }
  commit('setOpusRelate', opusRelate)
}
// 创建 comment
export const createComment = async({
  commit
}, commentObj) => {
  console.log('createComment', commentObj)
  console.log('createComment', queryList.createCommentQuery)
  let str = await getPostPms(queryList.createCommentQuery, {
    commentObj
  }, 'createComment')
  console.log('createComment', str)
  if (!str) {
    console.error('创建 comment 失败')
    return
  }
}



// --------------------------通用方法--------------------------
function getPostPms(query, variables, back) {
  return new Promise((resolve, reject) => {
    Request.post('http://localhost:3000/graphql')
      .withCredentials()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify({
        query,
        variables
      })).end((err, res) => {
        if (err) {
          console.error('superagent error:', err)
        } else {
          if (res.body.errors) {
            console.error(res.body)
            if (res.body.errors[0].stack) {
              console.error(res.body.errors[0].stack)
            }
            resolve(undefined)
          } else {
            resolve(res.body.data[back])
          }
        }
      })
  })
}
