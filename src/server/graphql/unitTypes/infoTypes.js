const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')

// ----------------------fields----------------------
// 用户字段，只暴露了部分字段，用于其它用户浏览主页
const limitFields = {
  infoId: {
    type: GraphQLID,
    description: '用户 id'
  },
  infoNickname: {
    type: GraphQLString,
    description: '用户昵称'
  },
  infoAvatar: {
    type: GraphQLString,
    description: '用户头像'
  },
  infoSex: {
    type: GraphQLString,
    description: '用户性别'
  },
  infoBirthday: {
    type: GraphQLString,
    description: '用户生日'
  },
  infoStatus: {
    type: GraphQLString,
    description: '用户当前状态'
  },
  infoFollowCount: {
    type: GraphQLInt,
    description: '用户关注人数'
  },
  infoFollowedCount: {
    type: GraphQLInt,
    description: '用户被关注次数'
  },
  infoCareCount: {
    type: GraphQLInt,
    description: '用户关注作品数'
  }
}

// 用户字段，剔除了infoId、infoToken、infoTokenDeadline 字段
const fragFields = Object.assign({
  infoName: {
    type: GraphQLString,
    description: '用户真实名'
  },
  infoPhone: {
    type: GraphQLString,
    description: '用户手机'
  },
  infoEmail: {
    type: GraphQLString,
    description: '用户邮箱'
  },
  infoAddress: {
    type: GraphQLString,
    description: '用户地址'
  },
  infoEnrollTime: {
    type: GraphQLString,
    description: '用户注册时间'
  },
  infoEnrollIp: {
    type: GraphQLString,
    description: '用户注册ip'
  },
  infoLoginTime: {
    type: GraphQLString,
    description: '用户最近登录时间'
  },
  infoLoginIp: {
    type: GraphQLString,
    description: '用户最近登录ip'
  },
  infoLoginType: {
    type: GraphQLString,
    description: '用户最近登录方式'
  }
}, limitFields)

// 用户字段，剔除了infoId 字段
const baseFields = Object.assign({
  infoId: {
    type: GraphQLID,
    description: '用户 id'
  }
}, fragFields)

// 用户字段，用于确定 updateInfo()可以输入的用户信息字段，只保留了必须的
const updateFields = {
  infoName: {
    type: GraphQLString,
    description: '用户真实名'
  },
  infoNickname: {
    type: GraphQLString,
    description: '用户昵称'
  },
  infoAvatar: {
    type: GraphQLString,
    description: '用户头像'
  },
  infoSex: {
    type: GraphQLString,
    description: '用户性别'
  },
  infoBirthday: {
    type: GraphQLString,
    description: '用户生日'
  },
  infoPhone: {
    type: GraphQLString,
    description: '用户手机'
  },
  infoEmail: {
    type: GraphQLString,
    description: '用户邮箱'
  },
  infoAddress: {
    type: GraphQLString,
    description: '用户地址'
  }
}

// ----------------------type----------------------
// info类，确定限制的 info 信息所包含的字段
const infoLimitType = new GraphQLObjectType({
  name: 'infoLimitType',
  description: '用户基本信息',
  fields: limitFields
})

// info类，确定大部分的 info 信息所包含的字段
const infoBaseType = new GraphQLObjectType({
  name: 'infoBaseType',
  description: '用户基本信息',
  fields: baseFields
})

// info类，确定 updateInfo()输入参数的形式
const infoUpdateType = new GraphQLInputObjectType({
  name: 'infoUpdateType',
  fields: updateFields
})

module.exports = {
  infoLimitType,
  infoBaseType,
  infoUpdateType
}
