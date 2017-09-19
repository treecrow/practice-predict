const db = require('../../db')

const {
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')

const {
  opusPredictType
} = require('../unitTypes/opusTypes')
const relateType = require('./relateType')

const {
  judgePredictType
} = require('../unitTypes/judgeTypes')

const {
  commentPredictType
} = require('../unitTypes/commentTypes')

const {
  carePredictType
} = require('../unitTypes/careTypes')

const {
  parseToken,
} = require('../graphqlUtil')

const predictType = new GraphQLObjectType({
  name: 'Predict',
  description: '预测信息类型',
  fields: () => ({
    opus: {
      type: opusPredictType,
      description: '作品本身包含的信息',
      resolve: async(predict) => {
        let opus = await predict.opus
        opus.opusInfo = db.getInfo(opus.opusInfoId)
        return opus
      }
    },
    opusRelate: {
      type: relateType,
      description: '用户与作品关联的信息',
    },
    judgeList: {
      type: new GraphQLList(judgePredictType),
      description: '作品被评判的列表',
      resolve: async(predict) => {
        let judgeList = await predict.judgeList
        return judgeList.map((judge) => {
          judge.judgeInfo = db.getInfo(judge.judgeInfoId)
          return judge
        })
      }
    },
    commentListByTime: {
      type: new GraphQLList(commentPredictType),
      description: '作品被评论的列表',
      resolve: async(predict) => {
        let commentList = await predict.commentListByTime
        return handleCommentList(commentList)
      }
    },
    commentListByAgree: {
      type: new GraphQLList(commentPredictType),
      description: '作品被评论的列表',
      resolve: async(predict) => {
        let commentList = await predict.commentListByAgree
        return handleCommentList(commentList)
      }
    },
    careList: {
      type: new GraphQLList(carePredictType),
      description: '作品被关注的列表',
      resolve: async(predict) => {
        let careList = await predict.careList
        return careList.map((care) => {
          care.careInfo = db.getInfo(care.careInfoId)
          return care
        })
      }
    },
  })
})

// 接受 comment 对象数组，返回 comment 的相关信息
function handleCommentList(commentList) {
  return commentList.map((comment) => {
    comment.commentInfo = db.getInfo(comment.commentInfoId)
    return comment
  })
}

module.exports = predictType
