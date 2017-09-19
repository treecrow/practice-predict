const db = require('../../db')

const {
  GraphQLID,
} = require('graphql')

const {
  parseToken,
} = require('../graphqlUtil')

const predictType = require('../unionTypes/predictType')

const predict = {
  type: predictType,
  description: '一个预测的所有相关信息',
  args: {
    opusId: {
      type: GraphQLID
    }
  },
  resolve: (_, {
    opusId
  }, ctx) => {
    let userId = parseToken(ctx).infoId
    let predict = {
      opus: db.getOpus(opusId),
      judgeList: db.getJudgeByOpus(opusId),
      commentListByTime: db.getCommentOrderByTime(opusId),
      commentListByAgree: db.getCommentOrderByAgree(opusId),
      careList: db.getCareByOpus(opusId),
      opusRelate: null
    }
    if (!userId) return predict
    predict.opusRelate = {
      care: db.getCare(userId, opusId),
      judge: db.getJudge(userId, opusId)
    }
    return predict
  }
}

module.exports = predict
