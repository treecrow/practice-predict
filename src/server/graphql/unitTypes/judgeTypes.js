const db = require('../../db')

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

const {
  opusUserType
} = require('./opusTypes')

// ----------------------fields----------------------
// judge 字段，剔除了 judgeInfoId、judgeOpusId等字段
const fragFields = {
  judgeId: {
    type: GraphQLID,
    description: '评判 id'
  },
  judgeCreateTime: {
    type: GraphQLString,
    description: '评判时间'
  },
  judgePrefer: {
    type: GraphQLInt,
    description: '评判倾向'
  },
  judgeContent: {
    type: GraphQLString,
    description: '评判理由'
  }
}

const createFields = {
  judgeOpusId: {
    type: new GraphQLNonNull(GraphQLID),
    description: '作品标题'
  },
  judgePrefer: {
    type: new GraphQLNonNull(GraphQLInt),
    description: '作品概述'
  },
  judgeContent: {
    type: GraphQLString,
    description: '作品正文'
  }
}

// ----------------------type----------------------
// judge类，确定了常规 judge 信息包含的内容
const judgeBaseType = new GraphQLObjectType({
  name: 'judgeBaseType',
  description: '评判基本信息',
  fields: Object.assign({
    judgeInfoId: {
      type: GraphQLID,
      description: '评判者 id'
    },
    judgeOpusId: {
      type: GraphQLID,
      description: '被评判的作品 id'
    }
  }, fragFields)
})

// judge类，扩展了 judgeOpus 字段
const judgeUserType = new GraphQLObjectType({
  name: 'judgeUserType',
  description: '评判信息,扩展了被评判作品的信息',
  fields: Object.assign({
    judgeInfoId: {
      type: GraphQLID,
      description: '评判者 id'
    },
    judgeOpus: {
      type: opusUserType,
      description: '被评判的作品信息',
      resolve: async(judge) => {
        let opus = await judge.judgeOpus
        opus.opusInfo = db.getInfo(opus.opusInfoId)
        return opus
      }
    }
  }, fragFields)
})

// judge类，扩展了 judgeInfo 字段
const judgePredictType = new GraphQLObjectType({
  name: 'judgePredictType',
  description: '评判信息,扩展了评判者的信息',
  fields: Object.assign({
    judgeInfo: {
      type: infoLimitType,
      description: '评判者信息'
    },
    judgeOpusId: {
      type: GraphQLID,
      description: '被评判的作品 id'
    }
  }, fragFields)
})

// judge类，用于 judge 的创建
const judgeCreateType = new GraphQLInputObjectType({
  name: 'judgeCreateType',
  fields: createFields
})

module.exports = {
  judgeBaseType,
  judgeUserType,
  judgePredictType,
  judgeCreateType
}
