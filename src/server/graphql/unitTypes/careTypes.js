const db = require('../../db')

const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const {
  infoLimitType,
} = require('./infoTypes')

const {
  opusUserType
} = require('./opusTypes')

// ----------------------fields----------------------
// care 字段，剔除了 careInfoId、careOpusId 字段
const fragFields = {
  careId: {
    type: GraphQLID,
    description: '关注作品 id',
  },
  careCreateTime: {
    type: GraphQLString,
    description: '关注作品时间',
  }
}

// ----------------------type----------------------
// care类，确定了常规 care 信息包含的内容
const careBaseType = new GraphQLObjectType({
  name: 'careBaseType',
  description: '关注作品基本信息',
  fields: Object.assign({
    careInfoId: {
      type: GraphQLID,
      description: '关注作品者 id',
    },
    careOpusId: {
      type: GraphQLID,
      description: '被关注的作品 id',
    },
  }, fragFields)
})

// care类，扩展了 careOpus 字段
const careUserType = new GraphQLObjectType({
  name: 'careUserType',
  description: '关注作品信息，扩展了被关注的作品信息',
  fields: Object.assign({
    careInfoId: {
      type: GraphQLID,
      description: '关注作品者 id',
    },
    careOpus: {
      type: opusUserType,
      description: '被关注的作品信息',
      resolve: async(care) => {
        let opus = await care.careOpus
        opus.opusInfo = db.getInfo(opus.opusInfoId)
        return opus
      }
    },
  }, fragFields)
})

// care类，扩展了 careInfo 字段
const carePredictType = new GraphQLObjectType({
  name: 'carePredictType',
  description: '关注作品信息，扩展了关注作品者的信息',
  fields: Object.assign({
    careInfo: {
      type: infoLimitType,
      description: '关注作品者信息',
    },
    careOpusId: {
      type: GraphQLID,
      description: '被关注的作品 id',
    },
  }, fragFields)
})

module.exports = {
  careBaseType,
  careUserType,
  carePredictType,
}
