const {
  GraphQLObjectType,
} = require('graphql')
const {
  careBaseType
} = require('../unitTypes/careTypes')
const {
  judgeBaseType
} = require('../unitTypes/judgeTypes')
const relateType = new GraphQLObjectType({
  name: 'relateType',
  description: '用户信息类型',
  fields: () => ({
    care: {
      type: careBaseType,
      description: '用户是否关注了当前作品'
    },
    judge: {
      type: judgeBaseType,
      description: '用户对当前作品的评判',
    }
  })
})
module.exports = relateType
