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

const relateType = require('../unionTypes/relateType')

// ----------------------声明 mutation----------------------
// 关注作品
const createCare = {
  type: relateType,
  description: '关注作品',
  args: {
    careOpusId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    careOpusId
  }, ctx) => {
    // 验证
    await checkUser(ctx)
    let userId = parseToken(ctx).infoId
    if (await db.checkCare(userId, careOpusId)) throw new ValidationError({
      key: 'careOpusId',
      message: `你已关注了作品 ${careOpusId}`
    })
    // 关注作品
    let careId = await db.createCare(userId, careOpusId)
    // 更新info && 更新opus && 创建消息
    let promises = []
    let fansList = await db.getFollowedList(userId)
    promises.push(db.updateInfo({
      infoId: userId,
      infoCareCount: await db.getCareCountByInfo(userId)
    }))
    promises.push(db.updateOpus({
      opusId: careOpusId,
      opusCareCount: await db.getCareCountByOpus(careOpusId),
    }))
    promises.push(db.createMsg({
      msgType: 4,
      msgInfoId: (await db.getOpus(careOpusId)).opusInfoId,
      msgInfoId2: userId,
      msgOpusId: careOpusId,
    }))
    promises.concat(fansList.map((fansId) => db.createMsg({
      msgType: 5,
      msgInfoId: fansId,
      msgInfoId2: userId,
      msgOpusId: careOpusId,
    })))
    await Promise.all(promises)
    // 返回
    return {
      care: db.getCare(userId, careOpusId),
      judge: db.getJudge(userId, careOpusId)
    }
  }
}

// 取消关注作品
const deleteCare = {
  type: relateType,
  description: '取消关注作品',
  args: {
    careOpusId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    careOpusId
  }, ctx) => {
    // 验证
    await checkUser(ctx)
    let userId = parseToken(ctx).infoId
    if (!await db.checkCare(userId, careOpusId)) throw new ValidationError({
      key: 'careOpusId',
      message: `你没有关注了作品 ${careOpusId}，不需要取消关注`
    })
    // 取消关注作品 && 更新 info 和 opus
    await db.deleteCare(userId, careOpusId)
    await Promise.all([
      db.updateInfo({
        infoId: userId,
        infoCareCount: await db.getCareCountByInfo(userId)
      }),
      db.updateOpus({
        opusId: careOpusId,
        opusCareCount: await db.getCareCountByOpus(careOpusId),
      })
    ])
    // 返回
    return {
      care: db.getCare(userId, careOpusId),
      judge: db.getJudge(userId, careOpusId)
    }
  }
}

module.exports = {
  createCare,
  deleteCare
}
