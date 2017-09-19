const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType
} = require('graphql')

// ----------------------fields----------------------
// 认证字段，剔除了 authInfoId 字段
const fragFields = {
  authId: {
    type: GraphQLID,
    description: '用户认证 id'
  },
  authType: {
    type: GraphQLString,
    description: '用户认证类型'
  },
  authAccount: {
    type: GraphQLString,
    description: '用户认证账号'
  },
  authCredential: {
    type: GraphQLString,
    description: '用户认证密码凭证'
  }
}

// 完整的认证字段
const baseFields = Object.assign({
  authInfoId: {
    type: GraphQLID,
    description: '认证用户 id'
  }
}, fragFields)

// 认证字段，用于确定 createInfo() 可以输入的用户认证字段
const inputFields = {
  authType: {
    type: new GraphQLNonNull(GraphQLString),
    description: '用户认证类型'
  },
  authAccount: {
    type: new GraphQLNonNull(GraphQLString),
    description: '用户认证账号'
  },
  authCredential: {
    type: new GraphQLNonNull(GraphQLString),
    description: '用户认证密码凭证'
  }
}

// 认证字段，用于账户的注册和重置
const verifyFields = Object.assign({
  verifyCode: {
    type: new GraphQLNonNull(GraphQLString),
    description: '用户验证激活码'
  }
}, inputFields)

// 认证字段，用于账户的注册和重置(宽松模式，verifyCode不是必须的)
const looseVerifyFields = Object.assign({
  verifyCode: {
    type: GraphQLString,
    description: '用户验证激活码'
  }
}, inputFields)

// ----------------------type----------------------
// auth类，包含了所有 auth 字段
const authBaseType = new GraphQLObjectType({
  name: 'authBaseType',
  description: '用户基本认证信息',
  fields: baseFields
})

// auth类，确定 createInfo()输入参数的形式
const authInputType = new GraphQLInputObjectType({
  name: 'authInputType',
  fields: inputFields
})

// auth类，确定账户的注册和重置输入参数的形式
const authVerifyType = new GraphQLInputObjectType({
  name: 'authVerifyType',
  fields: verifyFields
})

// auth类，确定账户的注册和重置输入参数的形式(宽松模式，verifyCode不是必须的)
const authLooseVerifyType = new GraphQLInputObjectType({
  name: 'authLooseVerifyType',
  fields: looseVerifyFields
})

module.exports = {
  authBaseType,
  authInputType,
  authVerifyType,
  authLooseVerifyType,
}
