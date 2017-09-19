const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType
} = require('graphql')

const {
  infoLimitType,
} = require('./infoTypes')


// ----------------------fields----------------------
// opus 字段，剔除了 opusInfoId 字段
const fragFields = {
  opusId: {
    type: GraphQLID,
    description: '作品 id'
  },
  opusTitle: {
    type: GraphQLString,
    description: '作品标题'
  },
  opusSummary: {
    type: GraphQLString,
    description: '作品概述'
  },
  opusText: {
    type: GraphQLString,
    description: '作品正文'
  },
  opusCreateTime: {
    type: GraphQLString,
    description: '作品创建时间'
  },
  opusAlterTime: {
    type: GraphQLString,
    description: '作品最近修改时间'
  },
  opusStatus: {
    type: GraphQLString,
    description: '作品状态'
  },
  opusCareCount: {
    type: GraphQLInt,
    description: '作品被关注次数'
  },
  opusJudgeCount: {
    type: GraphQLInt,
    description: '作品评判次数'
  },
  opusJudgeIndex: {
    type: GraphQLInt,
    description: '作品评判指数'
  },
  opusCommentCount: {
    type: GraphQLInt,
    description: '作品评论次数'
  }
}

const createFields = {
  opusTitle: {
    type: new GraphQLNonNull(GraphQLString),
    description: '作品标题'
  },
  opusSummary: {
    type: new GraphQLNonNull(GraphQLString),
    description: '作品概述'
  },
  opusText: {
    type: GraphQLString,
    description: '作品正文'
  }
}

const updateFields = {
  opusId: {
    type: new GraphQLNonNull(GraphQLID),
    description: '作品 id'
  },
  opusText: {
    type: new GraphQLNonNull(GraphQLString),
    description: '作品正文'
  }
}

// ----------------------type----------------------

// opus类，确定了常规 opus 信息包含的内容
const opusBaseType = new GraphQLObjectType({
  name: 'opusBaseType',
  description: '作品基本信息',
  fields: Object.assign({
    opusInfoId: {
      type: GraphQLID,
      description: '作品创作者 id'
    }
  }, fragFields)
})

// opus类，扩展了 opusInfo 字段
const opusUserType = new GraphQLObjectType({
  name: 'opusUserType',
  description: '作品信息，扩展了创作者的信息',
  fields: Object.assign({
    opusInfo: {
      type: infoLimitType,
      description: '作品创作者信息'
    }
  }, fragFields)
})

// opus类，确定 createOpus()输入参数的形式
const opusCreateType = new GraphQLInputObjectType({
  name: 'opusCreateType',
  fields: createFields
})

// opus类，确定 updateOpus()输入参数的形式
const opusUpdateType = new GraphQLInputObjectType({
  name: 'opusUpdateType',
  fields: updateFields
})

module.exports = {
  fragFields,
  opusBaseType,
  opusUserType,
  opusPredictType: opusUserType,
  opusCreateType,
  opusUpdateType
}
