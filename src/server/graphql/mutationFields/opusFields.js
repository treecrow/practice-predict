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
  opusCreateType,
  opusUpdateType
} = require('../unitTypes/opusTypes')

// ----------------------声明 mutation----------------------
// 创建作品
const createOpus = {
  type: GraphQLID,
  description: '创建作品',
  args: {
    opusObj: {
      type: opusCreateType
    }
  },
  resolve: async(_, {
    opusObj
  }, ctx) => {
    // 验证
    await checkUser(ctx)
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 创建作品
    let opusId = await db.createOpus(Object.assign({
      opusInfoId: userId
    }, opusObj))
    // 创建消息
    let fansList = await db.getFollowedList(userId)
    await Promise.all(fansList.map((fansId) => db.createMsg({
      msgType: 3,
      msgInfoId: fansId,
      msgInfoId2: userId,
      msgOpusId: opusId
    })))
    // 返回
    return opusId
  }
}

// 更新作品
const updateOpus = {
  type: GraphQLString,
  description: '修改作品',
  args: {
    opusObj: {
      type: opusUpdateType
    }
  },
  resolve: async(_, {
    opusObj
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    if (!await db.checkOpus(userId, opusObj.opusId)) throw new ValidationError({
      key: 'opusObj',
      message: `你没有作品 ${opusObj.opusId} 的所有权,无法修改作品`
    })
    // 修改作品
    await db.updateOpus(Object.assign(opusObj, {
      opusAlterTime: Date.now()
    }))
    // 返回
    return `成功修改作品 ${opusObj.opusId}`
  }
}

// 删除作品
const deleteOpus = {
  type: GraphQLString,
  description: '删除作品',
  args: {
    opusId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    opusId
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    if (!await db.checkOpus(userId, opusId)) throw new ValidationError({
      key: 'opusId',
      message: `你没有作品 ${opusId} 的所有权，无法删除作品`
    })
    // 删除作品
    await db.deleteOpus(opusId)
    // 返回
    return `成功删除作品 ${opusId}`
  }
}

module.exports = {
  createOpus,
  updateOpus,
  deleteOpus,
}
