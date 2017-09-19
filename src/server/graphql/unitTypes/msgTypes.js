const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const {
  infoLimitType
} = require('./infoTypes')
const {
  opusBaseType
} = require('./opusTypes')
const {
  commentBaseType
} = require('./commentTypes')
const {
  judgeBaseType
} = require('./judgeTypes')

// msg 字段，剔除了 msgInfoId、msgInfoId2，msgInfoId3、msgOpusId、msgCommentId、msgCommentId2 字段
const fragFields = {
  msgId: {
    type: GraphQLID,
    description: '消息 id'
  },
  msgType: {
    type: GraphQLString,
    description: '消息类型'
  },
  msgCreateTime: {
    type: GraphQLString,
    description: '消息创建时间'
  },
  msgContent: {
    type: GraphQLString,
    description: '消息内容'
  }
}

// msg类，确定了常规 msg 信息包含的内容
const msgBaseType = new GraphQLObjectType({
  name: 'msgBaseType',
  description: '消息基本信息',
  fields: Object.assign({
    msgInfoId: {
      type: GraphQLID,
      description: '消息所有者 id'
    },
    msgInfoId2: {
      type: GraphQLID,
      description: '消息相关用户2 id'
    },
    msgInfoId3: {
      type: GraphQLID,
      description: '消息相关用户3 id'
    },
    msgOpusId: {
      type: GraphQLID,
      description: '消息相关作品 id'
    },
    msgJudgeId: {
      type: GraphQLID,
      description: '消息相关评判 id'
    },
    msgCommentId: {
      type: GraphQLID,
      description: '消息相关评论 id'
    },
    msgCommentId2: {
      type: GraphQLID,
      description: '消息相关评论2 id'
    }
  }, fragFields)
})

// msg类，扩展了 msgInfo、msgInfo2、msgInfo3、msgOpus、msgComment、msgComment2 字段
const msgUserType = new GraphQLObjectType({
  name: 'msgUserType',
  description: '消息信息，扩展了所有信息，包括相关用户的信息、相关作品的信息，相关评论的信息',
  fields: Object.assign({
    msgInfo: {
      type: infoLimitType,
      description: '消息所有者信息'
    },
    msgInfo2: {
      type: infoLimitType,
      description: '消息相关用户2信息'
    },
    msgInfo3: {
      type: infoLimitType,
      description: '消息相关用户3信息'
    },
    msgOpus: {
      type: opusBaseType,
      description: '消息相关作品信息'
    },
    msgJudge: {
      type: judgeBaseType,
      description: '消息相关评判信息'
    },
    msgComment: {
      type: commentBaseType,
      description: '消息相关评论信息'
    },
    msgComment2: {
      type: commentBaseType,
      description: '消息相关评论2信息'
    }
  }, fragFields)
})

module.exports = {
  msgBaseType,
  msgUserType
}
