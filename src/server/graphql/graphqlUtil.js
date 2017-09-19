// --------------------导入模块--------------------
const nodemailer = require('nodemailer')
const smtpPool = require('nodemailer-smtp-pool')
const db = require('../db')
const {
  isPhone,
  isEmail
} = require('../sundry/util')
const {
  GraphQLError
} = require('graphql')

// --------------------util--------------------
// throw 错误
class ValidationError extends GraphQLError {
  constructor(errors) {
    super('The request is invalid.')
    if (!Array.isArray(errors)) {
      errors = [errors]
    }
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message)
      } else {
        result[error.key] = [error.message]
      }
      return result
    }, {})
  }
}

// 通过邮件发送验证码
function sendMail(verifyAccount, code) {
  let transporter = nodemailer.createTransport(smtpPool({
    "service": "QQ",
    "auth": {
      "user": "945641139@qq.com",
      "pass": "61d73t35c3699"
    },
    "maxConnections": 10,
    "secure": true
  }))

  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: '945641139@qq.com',
      to: verifyAccount,
      subject: 'kizun 用户注册',
      text: '用户注册验证码',
      html: `<h2>你的验证码为<b>${code}</b></h2>`,
      alternatives: [{
        contentType: 'text/x-web-markdown',
        content: '**Hello world!**'
      }]
    }, (error, info) => {
      if (error) {
        console.error('sendMail:', error)
      } else {
        resolve(info)
      }
    })
  })
}

// 通过 token 验证用户
async function checkUser(ctx) {
  let infoToken = ctx.cookies.get('token')
  if(!infoToken){
    throw new ValidationError({
      key: 'token',
      message: '用户 token 验证失败，请重新登录'
    })
  }
  let info = await db.getInfoByToken(infoToken)
  if (!info) {
    throw new ValidationError({
      key: 'token',
      message: '用户 token 验证失败，请重新登录'
    })
  }
  if (info.infoTokenDeadline && new Date() > info.infoTokenDeadline) {
    throw new ValidationError({
      key: 'token',
      message: '用户 token 过期，请重新登录'
    })
  }
}

// 生成token、更新info，设置token到 cookie中,返回新的 info
async function updateToken(infoId, loginType, ctx) {
  let newToken = infoId + '#tokenSalt' + '#hash'
  let newInfo = await db.updateInfo({
    infoId: infoId,
    infoToken: newToken,
    infoTokenDeadline: null,
    infoLoginTime: Date.now(),
    infoLoginIp: ctx.ip,
    infoLoginType: loginType,
  })
  ctx.cookies.set('token', newToken, {
    maxAge: Date.now() + 100000000000,
    overwrite: true,
    httpOnly: false
  })
  return newInfo
}

// 解析token
function parseToken(ctx) {
  let tokenArr = ctx.cookies.get('token').split('#')
  return {
    infoId: Number(tokenArr[0]),
    tokenSalt: tokenArr[1],
    hash: tokenArr[2]
  }
}

// 验证 verifyObj，判断手机邮箱格式是否复合要求
function checkVerifyObj({
  verifyType,
  verifyAccount
}) {
  if (!['phone', 'email'].includes(verifyType)) throw new ValidationError({
    key: 'verifyType',
    message: `暂不支持对 ${verifyType} 类型的账户`
  })
  if (verifyType === 'phone' && !isPhone(verifyAccount)) throw new ValidationError({
    key: 'verifyAccount',
    message: '手机格式不正确'
  })
  if (verifyType === 'email' && !isEmail(verifyAccount)) throw new ValidationError({
    key: 'verifyAccount',
    message: '邮箱格式不正确'
  })
}

// 验证 authType,判断手机邮箱格式是否复合要求。如果有验证码，验证是否不匹配，是否超时
async function checkAuthObj({
  authAccount,
  authType,
  verifyCode
}) {
  // 通用验证
  let typeArr = ['sina', 'wechat', 'qq', 'phone', 'email']
  if (!typeArr.includes(authType)) throw new ValidationError({
    key: 'authObj',
    message: `暂不支持 ${authType} 登录方式`
  })
  if (authType === 'phone' && !isPhone(authAccount)) throw new ValidationError({
    key: 'authObj',
    message: '手机格式不正确'
  })
  if (authType === 'email' && !isEmail(authAccount)) throw new ValidationError({
    key: 'authObj',
    message: '邮箱格式不正确'
  })
  // 如果包含了验证码，也在这里验证
  if (!verifyCode) return
  let verify = await db.getVerifyByAccount(authAccount)
  if (!verify) throw new ValidationError({
    key: 'verifyCode',
    message: `验证码不存在`
  })
  if (verify.verifyCode !== verifyCode) throw new ValidationError({
    key: 'verifyCode',
    message: `验证码不匹配`
  })
  if ((Date.now() - verify.verifyCreateTime) > 300000) throw new ValidationError({
    key: 'verifyCode',
    message: `5 min 内没有验证，验证码失效`
  })
}

// --------------------导出--------------------
module.exports = {
  ValidationError,
  sendMail,
  checkUser,
  updateToken,
  parseToken,
  checkVerifyObj,
  checkAuthObj,
}
