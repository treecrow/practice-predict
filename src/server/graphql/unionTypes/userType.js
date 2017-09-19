const db = require('../../db')

const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')

const {
  infoLimitType,
  infoBaseType,
} = require('../unitTypes/infoTypes')

const {
  authReturnType
} = require('../unitTypes/authTypes')

const {
  opusBaseType
} = require('../unitTypes/opusTypes')

const {
  judgeUserType
} = require('../unitTypes/judgeTypes')

const {
  careUserType
} = require('../unitTypes/careTypes')

const {
  msgUserType
} = require('../unitTypes/msgTypes')

const userType = new GraphQLObjectType({
  name: 'userType',
  description: '用户信息类型',
  fields: () => ({
    info: {
      type: infoBaseType,
      description: '用户自身信息'
    },
    authList: {
      type: new GraphQLList(GraphQLString),
      description: '用户绑定的登录途径列表',
    },
    followList: {
      type: new GraphQLList(infoLimitType),
      description: '用户关注用户列表',
      resolve: async(user) => {
        let followList = await user.followList
        return followList.map((infoId) => db.getInfo(infoId))
      }
    },
    followedList: {
      type: new GraphQLList(infoLimitType),
      description: '用户被关注列表',
      resolve: async(user) => {
        let followedList = await user.followedList
        return followedList.map((infoId) => db.getInfo(infoId))
      }
    },
    opusList: {
      type: new GraphQLList(opusBaseType),
      description: '用户的作品列表'
    },
    judgeList: {
      type: new GraphQLList(judgeUserType),
      description: '用户的评判列表',
      resolve: async(user) => {
        let judgeList = await user.judgeList
        return judgeList.map((judge) => {
          judge.judgeOpus = db.getOpus(judge.judgeOpusId)
          return judge
        })
      }
    },
    careList: {
      type: new GraphQLList(careUserType),
      description: '用户关注作品列表',
      resolve: async(user) => {
        let careList = await user.careList
        return careList.map((care) => {
          care.careOpus = db.getOpus(care.careId)
          return care
        })
      }
    },
    msgHomeList: {
      type: new GraphQLList(msgUserType),
      description: '用户主页消息列表',
      resolve: async(user) => {
        let msgHomeList = await user.msgHomeList
        return handleMsgList(msgHomeList)
      }
    },
    msgShowList: {
      type: new GraphQLList(msgUserType),
      description: '用户展示消息列表',
      resolve: async(user) => {
        let msgShowList = await user.msgShowList
        return handleMsgList(msgShowList)
      }
    }
  })
})

// 接受 msg 对象数组，返回 msg 的相关信息
function handleMsgList(msgList) {
  return msgList.map((msg) => ({
    msgId: msg.msgId,
    msgType: msg.msgType,
    msgCreateTime: msg.msgCreateTime,
    msgContent: msg.msgContent,
    msgInfo: db.getInfo(msg.msgInfoId),
    msgInfo2: msg.msgInfoId2 ? db.getInfo(msg.msgInfoId2) : null,
    msgInfo3: msg.msgInfoId3 ? db.getInfo(msg.msgInfoId3) : null,
    msgOpus: msg.msgOpusId ? db.getOpus(msg.msgOpusId) : null,
    msgJudge: msg.msgJudgeId ? db.getOpus(msg.msgJudgeId) : null,
    msgComment: msg.msgCommentId ? db.getComment(msg.msgCommentId) : null,
    msgComment2: msg.msgCommentId2 ? db.getComment(msg.msgCommentId2) : null
  }))
}

module.exports = userType
