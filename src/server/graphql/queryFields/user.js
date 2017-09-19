const db = require('../../db')

const {
  GraphQLID,
} = require('graphql')

// const userType = require('../unionTypes/userType')
const {
  userType,
} = require('../unionTypes/clientTypes')

const user = {
  type: userType,
  description: '一个用户的所有相关信息',
  args: {
    infoId: {
      type: GraphQLID
    }
  },
  resolve: (_, {
    infoId
  }) => {
    return queryAll()
  }
}

// 查询所有信息
function queryAll() {
  return {
    info: db.getInfo(infoId),
    authList: db.getAuthList(infoId),
    followList: db.getFollowList(infoId),
    followedList: db.getFollowedList(infoId),
    opusList: db.getOpusAllByInfo(infoId),
    judgeList: db.getJudgeByInfo(infoId),
    careList: db.getCareByInfo(infoId),
    msgHomeList: db.getMsgByHome(infoId),
    msgShowList: db.getMsgByShow(infoId)
  }
}

module.exports = {
  user
}
