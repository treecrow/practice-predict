const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')

const createFields = {
  verifyType: {
    type: new GraphQLNonNull(GraphQLString),
    description: '账号类型（手机还是邮箱）'
  },
  verifyAccount: {
    type: new GraphQLNonNull(GraphQLString),
    description: '生成激活码的账号'
  }
}
// verify类，用于 verify 的创建
const verifyCreateType = new GraphQLInputObjectType({
  name: 'verifyCreateType',
  fields: createFields
})

module.exports = {
  verifyCreateType
}
