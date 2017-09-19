const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

// follow字段，剔除了followInfoId、followInfoMogul等字段
const fragFields = {
  followId: {
    type: GraphQLID,
    description: '关注用户 id'
  },
  followCreateTime: {
    type: GraphQLString,
    description: '关注用户时间'
  }
}

// follow类，包含了所有字段
const followBaseType = new GraphQLObjectType({
  name: 'followBaseType',
  description: '关注用户基本信息',
  fields: Object.assign({
    followInfoId: {
      type: GraphQLID,
      description: '关注者 id'
    },
    followInfoMogul: {
      type: GraphQLID,
      description: '被关注者 id'
    }
  }, fragFields)
})

module.exports = {
  followBaseType
}
