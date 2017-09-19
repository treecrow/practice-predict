// ----------------------引入模块----------------------
const db = require('../../db')

const {
  GraphQLID,
  GraphQLString,
} = require('graphql')

const {
  checkUser,
  parseToken,
  ValidationError,
} = require('../graphqlUtil')

const {
  commentCreateType
} = require('../unitTypes/commentTypes')

// ----------------------声明 mutation----------------------
// 广播消息（infoId=1的用户有操作权限）
const broadcastMsg = {
  type: GraphQLString,
  description: '广播消息',
  args: {
    msgContent: {
      type: GraphQLString
    }
  },
  resolve: async(_, {
    msgContent
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    if (userId != 1) throw new ValidationError({
      key: 'msgContent',
      message: `你没有权限发送广播`
    })
    // 创建广播消息
    let infoList = await db.getInfoAllWithId()
    await Promise.all(infoList.map((infoId) => db.createMsg({
      msgType: 14,
      msgInfoId: infoId,
      msgCommentId: msgContent,
    })))
    // 返回
    return `成功创建广播消息`
  }
}

// 删除消息
const deleteMsg = {
  type: GraphQLString,
  description: '删除消息',
  args: {
    msgId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    msgId
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    if ((await db.getMsg(msgId)).msgInfoId != userId) throw new ValidationError({
      key: 'msgId',
      message: `你没有权限删除消息 ${msgId}`
    })
    // 删除消息
    await db.deleteMsg(msgId)
    // 返回
    return `成功删除消息 ${msgId}`
  }
}

module.exports = {
  broadcastMsg,
  deleteMsg
}
