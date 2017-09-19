// ----------------------引入模块----------------------
const db = require('../../db')

const {
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require('graphql')

const {
  ValidationError,
  sendMail,
  checkUser,
  parseToken,
  updateToken,
  checkVerifyObj,
  checkAuthObj,
  checkCode,
} = require('../graphqlUtil')

const {
  getActiveCode
} = require('../../sundry/util')

const {
  infoBaseType,
  infoUpdateType
} = require('../unitTypes/infoTypes')

const {
  authInputType,
  authVerifyType,
  authLooseVerifyType,
} = require('../unitTypes/authTypes')

const {
  verifyCreateType
} = require('../unitTypes/verifyTypes')

// ----------------------声明 mutation----------------------
// 创建验证，用于新用户的激活
const createVerify = {
  type: GraphQLString,
  description: '生成激活码',
  args: {
    verifyObj: {
      type: verifyCreateType
    }
  },
  resolve: async(_, {
    verifyObj
  }, ctx) => {
    // 声明变量
    let {
      verifyType,
      verifyAccount
    } = verifyObj
    // 验证
    checkVerifyObj(verifyObj)
    // 发送验证码 && 生成 verify
    let code = getActiveCode(6)
    // 向注册用户成功发送验证码之后再 createVerify
    switch (verifyType) {
      case 'phone':
        throw new ValidationError({
          key: 'verifyObj',
          message: `暂时没有实现发送短信方法`
        })
        break;
      case 'email':
        await sendMail(verifyAccount, code)
        break;
    }
    await db.deleteVerifyByAccount(verifyAccount)
    await db.createVerify(verifyAccount, code)
    // 返回
    return `成功发送激活码`
  }
}

// 创建新用户，返沪新用户 info 信息(用于phone、email注册用户)
const createUser = {
  type: GraphQLString,
  description: '创建用户',
  args: {
    authObj: {
      type: authVerifyType
    }
  },
  resolve: async(_, {
    authObj
  }, ctx) => {
    // 验证
    await checkAuthObj(authObj)
    if (await db.checkAuthByAccount(authObj.authAccount)) throw new ValidationError({
      key: 'authObj',
      message: `已经使用 ${authObj.authAccount} 注册过用户了`
    })
    // 开始创建用户相关信息
    let info = await db.createInfo({
      infoPhone: authObj.authType === 'phone' ? authObj.authAccount : '',
      infoEmail: authObj.authType === 'email' ? authObj.authAccount : '',
      infoEnrollIp: ctx.ip
    })
    await db.createAuth(Object.assign({
      authInfoId: info.infoId
    }, {
      authAccount: authObj.authAccount,
      authType: authObj.authType,
      authCredential: authObj.authCredential,
    }))
    // 返回给前端用户信息
    return `成功创建用户 ${info.infoId}`
  }
}

// 用户登录，返沪用户 info 信息，将 token 信息写入 cookie（用于用户登录或者第三方注册/登录）
const userLogin = {
  type: infoBaseType,
  description: '用户登录',
  args: {
    authObj: {
      type: authInputType
    }
  },
  resolve: async(_, {
    authObj
  }, ctx) => {
    // 验证
    await checkAuthObj(authObj)
    let infoId = await db.checkAuth(authObj.authAccount, authObj.authCredential)
    if (infoId) return updateToken(infoId, authObj.authType, ctx)
    if (['phone', 'email'].includes(authObj.authType)) throw new ValidationError({
      key: 'authObj',
      message: '登录失败，账号密码不匹配'
    })
    // 第三方账号
    let info = await db.getInfoByAccount(authObj.authAccount)
    if (info) { // 已注册用户
      await db.updateAuthCredential({
        authType: authObj.authType,
        authInfoId: info.infoId,
        authCredential: authObj.authCredential,
      })
      return updateToken(info.infoId, authObj.authType, ctx)
    } else { // 未注册用户
      let newInfo = await db.createInfo({
        infoEnrollIp: ctx.ip
        // 第三方获取用户信息，getUserInfo(authObj.authAccount)
      })
      await db.createAuth(Object.assign({
        authInfoId: newInfo.infoId
      }, authObj))
      return updateToken(newInfo.infoId, authObj.authType, ctx)
    }
  }
}

// 增加用户登录途径，返回用户绑定的登录途径列表
const addAuth = {
  type: new GraphQLList(GraphQLString),
  description: '添加用户登录方式',
  args: {
    authObj: {
      type: authLooseVerifyType
    }
  },
  resolve: async(_, {
    authObj
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    let authList = await db.getAuthList(userId)
    let isCommenType = ['phone', 'email'].includes(authObj.authType) // 是否是手机／邮箱
    // 验证
    if (isCommenType && !authObj.verifyCode) throw new ValidationError({
      key: 'authObj',
      message: `添加手机／邮箱账号时需要提供验证码`
    })
    await checkUser(ctx)
    await checkAuthObj(authObj)
    if (authList.includes(authObj.authType)) throw new ValidationError({
      key: 'authObj',
      message: `该账号已经绑定了 ${authObj.authType} 登录方式`
    })
    // 创建新的 auth
    await db.createAuth(Object.assign({
      authInfoId: userId
    }, authObj))
    // 统一密码 && 更新 info(手机／邮箱)
    if (isCommenType) {
      await Promise.all(
        db.updateAuthPassword(userId, authObj.authCredential),
        db.updateInfo({
          infoId: userId,
          [authObj.authType === 'phone' ? 'infoPhone' : 'infoEmail']: authObj.authAccount
        })
      )
    }
    // 返回数据
    return db.getAuthList(userId)
  }
}

// 删除用户登录途径
const removeAuth = {
  type: new GraphQLList(GraphQLString),
  description: '移除用户登录方式',
  args: {
    authType: {
      type: GraphQLString
    }
  },
  resolve: async(_, {
    authType
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    let authList = await db.getAuthList(userId)
    // 验证
    await checkUser(ctx)
    if (!['sina', 'wechat', 'qq', 'phone', 'email'].includes(authType)) throw new ValidationError({
      key: 'authType',
      message: `没有 ${authType} 登录方式`
    })
    if (authList.length < 2) throw new ValidationError({
      key: 'authType',
      message: `现在只有 ${authType} 一种登录方式，不能继续移除`
    })
    // 删除该用户某种登录途径
    await db.deleteAuthByType(userId, authType)
    return authList.filter(item => item !== authType)
  }
}

// 更新用户信息
const updateInfo = {
  type: infoBaseType,
  description: '修改用户信息',
  args: {
    infoObj: {
      type: infoUpdateType
    }
  },
  resolve: async(_, {
    infoObj
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    // 更新
    let info = await db.updateInfo(Object.assign({
      infoId: userId
    }, infoObj))
    return info
  }
}

// 修改用户密码
const updatePassword = {
  type: GraphQLString,
  description: '修改用户登录密码（手机／邮箱）',
  args: {
    authObj: {
      type: authVerifyType
    }
  },
  resolve: async(_, {
    authObj
  }, ctx) => {
    // 验证
    await checkAuthObj(authObj)
    // 根据账号获取用户id
    let info = await db.getInfoByAccount(authObj.authAccount)
    // 修改用户密码（手机／邮箱）
    await db.updateAuthPassword(info.infoId, authObj.authCredential)
    // 返回值
    return `用户 ${info.infoId} 的账户密码已经修改`
  }
}

// 删除用户，成功后返回相应的 infoId
const deleteUser = {
  type: GraphQLString,
  description: '删除用户',
  args: {
    infoId: { // 被删除者
      type: GraphQLID
    }
  },
  resolve: async(_, {
    infoId
  }, ctx) => {
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    if (userId !== 1) {
      throw new ValidationError({
        key: 'token',
        message: '该用户没有删除用户的权限'
      })
    }
    // 删除 infoId 对应用户信息
    await Promise.all([
      db.deleteInfo(infoId),
      db.deleteAuthByInfo(infoId)
    ])
    // 返回
    return `成功删除用户 ${infoId}`
  }
}

module.exports = {
  createVerify,
  createUser,
  userLogin,
  addAuth,
  removeAuth,
  updateInfo,
  updatePassword,
  deleteUser,
}
