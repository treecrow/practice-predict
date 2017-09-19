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

// ----------------------声明 mutation----------------------
// 关注用户
const addFollow = {
  type: GraphQLString,
  description: '关注用户',
  args: {
    infoId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    infoId
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    if (await db.checkFollow(userId, infoId)) throw new ValidationError({
      key: 'infoId',
      message: `已经关注用户 ${infoId}`
    })
    // 创建follow
    await db.createFollow(userId, infoId)
    // 修改用户info中关注（和被关注）次数，生成消息
    let promises = []
    promises.concat([db.updateInfo({
      infoId: userId,
      infoFollowCount: await db.getFollowCount(userId)
    }), db.updateInfo({
      infoId: infoId,
      infoFollowedCount: await db.getFollowedCount(infoId)
    }), db.createMsg({
      msgType: 1,
      msgInfoId: infoId,
      msgInfoId2: userId
    })])
    let fansList = await db.getFollowedList(userId)
    promises.concat(fansList.map((fansId) => db.createMsg({
      msgType: 2,
      msgInfoId: fansId,
      msgInfoId2: userId,
      msgInfoId3: infoId
    })))
    await Promise.all(promises)
    // 返回值
    return `成功关注了用户 ${infoId}`
  }
}

// 取消关注某个用户
const removeFollow = {
  type: GraphQLString,
  description: '关注用户',
  args: {
    infoId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    infoId
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    // 取消关注 && 修改用户info中关注（和被关注）次数
    await db.deleteFollow(userId, infoId)
    await Promise.all([db.updateInfo({
      infoId: userId,
      infoFollowCount: await db.getFollowCount(userId)
    }), db.updateInfo({
      infoId: infoId,
      infoFollowedCount: await db.getFollowedCount(infoId)
    })])
    // 返回值
    return `已经取消关注了用户 ${infoId}`
  }
}

module.exports = {
  addFollow,
  removeFollow,
}
