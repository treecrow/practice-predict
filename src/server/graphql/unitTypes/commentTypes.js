const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require('graphql')

const {
  infoLimitType,
} = require('./infoTypes')

// ----------------------fields----------------------
// comment 字段，剔除了 commentInfoId、commentOpusId 字段
const fragFields = {
  commentId: {
    type: GraphQLID,
    description: '评论 id'
  },
  commentCommentId: {
    type: GraphQLID,
    description: '被回复的评论 id'
  },
  commentCreateTime: {
    type: GraphQLString,
    description: '评论时间'
  },
  commentContent: {
    type: GraphQLString,
    description: '评论内容'
  },
  commentAgree: {
    type: GraphQLInt,
    description: '评论赞同指数'
  }
}

const createFields = {
  commentOpusId: {
    type: new GraphQLNonNull(GraphQLID),
    description: '被评论作品 id'
  },
  commentCommentId: {
    type: GraphQLID,
    description: '被回复的评论 id'
  },
  commentContent: {
    type: new GraphQLNonNull(GraphQLString),
    description: '评论内容'
  },
}

// ----------------------type----------------------
// comment类，确定了常规 comment 信息包含的内容
const commentBaseType = new GraphQLObjectType({
  name: 'commentBaseType',
  description: '评论基本信息',
  fields: Object.assign({
    commentInfoId: {
      type: GraphQLID,
      description: '评论者 id'
    },
    commentOpusId: {
      type: GraphQLID,
      description: '被评论作品 id'
    }
  }, fragFields)
})

// comment类，扩展了 commentInfo 字段
const commentPredictType = new GraphQLObjectType({
  name: 'commentPredictType',
  description: '评论信息，扩展了评论者的信息',
  fields: Object.assign({
    commentInfo: {
      type: infoLimitType,
      description: '评论者信息'
    },
    commentOpusId: {
      type: GraphQLID,
      description: '被评论作品 id'
    }
  }, fragFields)
})

// comment类，用于 comment 的创建
const commentCreateType = new GraphQLInputObjectType({
  name: 'commentCreateType',
  fields: createFields
})

module.exports = {
  commentBaseType,
  commentPredictType,
  commentCreateType
}
