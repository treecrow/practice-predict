// --------------------query--------------------
const userQuery = `query($infoId:ID){
  user(infoId:$infoId){
    info {
      infoId,
      infoName,
      infoNickname,
      infoAvatar,
      infoSex,
      infoBirthday,
      infoPhone,
      infoEmail,
      infoAddress,
      infoEnrollTime,
      infoEnrollIp,
      infoLoginTime,
      infoLoginIp,
      infoLoginType,
      infoStatus,
      infoFollowCount,
      infoFollowedCount,
      infoCareCount
    },
    authList
  }
}`
const authListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    authList
  }
}`
const followListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    followList
  }
}`
const followedListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    followedList
  }
}`
const opusListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    opusList
  }
}`
const judgeListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    judgeList
  }
}`
const careListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    careList
  }
}`
const msgHomeListQuery = `query($infoId:ID){
  user(infoId:$infoId){
    msgHomeList{
      msgId,
      msgType,
      msgCreateTime,
      msgInfo{
        infoId,
        infoNickname,
        infoAvatar
      },
      msgInfo2{
        infoId,
        infoNickname,
        infoAvatar
      },
      msgInfo3{
        infoId,
        infoNickname,
        infoAvatar
      },
      msgOpus{
        opusId,
        opusTitle
      },
      msgJudge{
        judgeId,
        judgePrefer,
        judgeContent
      },
      msgComment{
        commentId,
        commentOpusId,
        commentContent
      },
      msgComment2{
        commentId,
        commentOpusId,
        commentContent
      }
    }
  }
}`
const predictQuery = `query($opusId:ID){
  predict(opusId:$opusId){
    opus {
      opusId,
      opusInfo{
        infoId,
        infoNickname,
        infoAvatar
      },
      opusTitle,
      opusSummary,
      opusText,
      opusCreateTime,
      opusAlterTime,
      opusStatus,
      opusCareCount,
      opusJudgeCount,
      opusJudgeIndex,
      opusCommentCount
    },
    opusRelate{
      care{
        careCreateTime
      },
      judge{
        judgeCreateTime,
        judgePrefer,
        judgeContent,
      }
    },
    commentListByTime{
      commentId,
      commentInfo{
        infoId,
        infoNickname,
        infoAvatar
      },
      commentOpusId,
      commentCommentId,
      commentCreateTime,
      commentContent,
      commentAgree
    }
  }
}`
// --------------------mutation--------------------
const createVerifyQuery = `mutation ($verifyObj:verifyCreateType){
  createVerify(verifyObj:$verifyObj)
}`
const createUserQuery = `mutation ($authObj:authVerifyType){
  createUser(authObj:$authObj)
}`
const userLoginQuery = `mutation ($authObj:authInputType){
  userLogin(authObj:$authObj) {
    infoId
  }
}`
const updatePasswordQuery = `mutation ($authObj:authVerifyType){
  updatePassword(authObj:$authObj)
}`
const addAuthQuery = `mutation ($authObj:authLooseVerifyType){
  addAuth(authObj:$authObj)
}`
const updateInfoQuery = `mutation ($infoObj:infoUpdateType){
  updateInfo(infoObj:$infoObj){
    infoId,
    infoName,
    infoNickname,
    infoAvatar,
    infoSex,
    infoBirthday,
    infoPhone,
    infoEmail,
    infoAddress,
    infoEnrollTime,
    infoEnrollIp,
    infoLoginTime,
    infoLoginIp,
    infoLoginType,
    infoStatus,
    infoFollowCount,
    infoFollowedCount,
    infoCareCount
  }
}`
const createOpusQuery = `mutation ($opusObj:opusCreateType){
  createOpus(opusObj:$opusObj)
}`
const createCareQuery = `mutation ($careOpusId:ID){
  createCare(careOpusId:$careOpusId){
    care{
      careCreateTime
    },
    judge{
      judgeCreateTime,
      judgePrefer,
      judgeContent,
    }
  }
}`
const deleteCareQuery = `mutation ($careOpusId:ID){
  deleteCare(careOpusId:$careOpusId){
    care{
      careCreateTime
    },
    judge{
      judgeCreateTime,
      judgePrefer,
      judgeContent,
    }
  }
}`
const createJudgeQuery = `mutation ($judgeObj:judgeCreateType){
  createJudge(judgeObj:$judgeObj){
    care{
      careCreateTime
    },
    judge{
      judgeCreateTime,
      judgePrefer,
      judgeContent,
    }
  }
}`
const createCommentQuery = `mutation ($commentObj:commentCreateType){
  createComment(commentObj:$commentObj)
}`

export default {
  userQuery, // 综合查询 user信息
  authListQuery, // 查询 authList 信息
  followListQuery, // 查询 followList 信息
  followedListQuery, // 查询 followedList 信息
  opusListQuery, // 查询 opusList 信息
  judgeListQuery, // 查询 judgeList 信息
  careListQuery, // 查询 careList 信息
  msgHomeListQuery, // 查询 msgHomeList 信息
  predictQuery, //综合查询 opus 信息

  createVerifyQuery, // 创建验证码
  createUserQuery, // 创建用户
  userLoginQuery, // 用户登录
  updatePasswordQuery, // 重置密码
  addAuthQuery, //
  updateInfoQuery, // 修改 info 信息
  createOpusQuery, // 创建 opus
  createCareQuery, // 创建 care
  deleteCareQuery, // 删除 care
  createJudgeQuery, // 创建 judge
  createCommentQuery, // 创建 comment
}
