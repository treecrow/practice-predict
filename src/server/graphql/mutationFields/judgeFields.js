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
  judgeCreateType
} = require('../unitTypes/judgeTypes')

const relateType = require('../unionTypes/relateType')

// ----------------------声明 mutation----------------------
// 创建评判
const createJudge = {
  type: relateType,
  description: '创建评判',
  args: {
    judgeObj: {
      type: judgeCreateType
    }
  },
  resolve: async(_, {
    judgeObj
  }, ctx) => {
    // 验证
    await checkUser(ctx)
    let userId = parseToken(ctx).infoId
    let opusId = judgeObj.judgeOpusId
    if (![1, 2, 3, 4, 5].includes(judgeObj.judgePrefer)) throw new ValidationError({
      key: 'judgeObj',
      message: `评判倾向的值 ${judgeObj.judgePrefer} 无效`
    })
    if (await db.checkJudge(userId, opusId)) throw new ValidationError({
      key: 'judgeObj',
      message: `你已经对该作品作出评判`
    })
    // 创建评判
    let judgeId = await db.createJudge(Object.assign({
      judgeInfoId: userId,
    }, judgeObj))
    // 更新opus && 创建消息
    let promises = []
    let userFansList = await db.getFollowedList(userId)
    let opusFansList = await db.getCareInfosByOpus(opusId)
    promises.push(db.updateOpus({
      opusId,
      opusJudgeCount: await db.getJudgeCountByOpus(opusId),
      opusJudgeIndex: await db.getJudgeIndexByOpus(opusId),
    }))
    promises.push(
      db.createMsg({
        msgType: 6,
        msgInfoId: (await db.getOpus(opusId)).opusInfoId,
        msgInfoId2: userId,
        msgOpusId: opusId,
        msgJudgeId: judgeId,
      })
    )
    promises.concat(userFansList.map((fansId) => db.createMsg({
      msgType: 7,
      msgInfoId: fansId,
      msgInfoId2: userId,
      msgOpusId: opusId,
      msgJudgeId: judgeId,
    })))
    promises.concat(opusFansList.map((fansId) => db.createMsg({
      msgType: 8,
      msgInfoId: fansId,
      msgInfoId2: userId,
      msgOpusId: opusId,
      msgJudgeId: judgeId,
    })))
    await Promise.all(promises)
    // 返回
    return {
      care: db.getCare(userId, opusId),
      judge: db.getJudge(userId, opusId)
    }
  }
}

module.exports = {
  createJudge
}
