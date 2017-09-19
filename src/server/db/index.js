const query = require('./query')
const sqlList = require('./sqlList')

const {
  toLineObj, // 修改对象属性名为下划线风格
  toHumpObj, // 修改对象属性名为驼峰风格
  tiLikeStr // 用 % 包裹字符串
} = require('../sundry/util.js')

class db {
  // info
  static async getInfo(infoId){
    let results = await query(sqlList.getInfo, infoId)
    return toHumpObj(results[0])
  }
  static async getInfoByToken(infoToken) {
    let results = await query(sqlList.getInfoByToken, infoToken)
    return toHumpObj(results[0])
  }
  static async getInfoAllWithId() {
    let results = await query(sqlList.getInfoAllWithId)
    return results.map((item) => item.info_id)
  }
  static async getInfoAll() {
    let results = await query(sqlList.getInfoAll)
    return toHumpObj(results)
  }
  static async getInfoByName(name) {
    let results = await query(sqlList.getInfoByName, [tiLikeStr(name), tiLikeStr(name)])
    return toHumpObj(results)
  }
  static async createInfo(infoObj) {
    let result = await query(sqlList.createInfo, toLineObj(infoObj))
    return this.getInfo(result.insertId)
  }
  static async updateInfo(infoObj) {
    let infoId = infoObj.infoId
    delete infoObj.infoId
    await query(sqlList.updateInfo, [toLineObj(infoObj), infoId])
    return this.getInfo(infoId)
  }
  static async deleteInfo(infoId) {
    await query(sqlList.deleteInfo, infoId)
  }

  // auth
  static async getInfoByAccount(authAccount) {
    let results = await query(sqlList.getInfoByAccount, authAccount)
    let auth = results[0]
    if (!auth) return
    return this.getInfo(auth.auth_info_id)
  }
  static async getAuthList(infoId) {
    let authTypes = await query(sqlList.getAuthList, infoId)
    return authTypes.map((item) => item.auth_type)
  }
  static async getAuthByInfoAndType(infoId, authType) {
    let results = await query(sqlList.getAuthByInfoAndType, [infoId, authType])
    return toHumpObj(results[0])
  }
  static async checkAuth(authAccount, authCredential) {
    let results = await query(sqlList.checkAuth, [authAccount, authCredential])
    return results[0] ? results[0].auth_info_id : null
  }
  static async checkAuthByAccount(authAccount) {
    let results = await query(sqlList.checkAuthByAccount, authAccount)
    return !!results[0].count
  }
  static async createAuth(authObj) {
    let result = await query(sqlList.createAuth, toLineObj(authObj))
    return result.insertId
  }
  static async updateAuthCredential(authObj) {
    await query(sqlList.updateAuthCredential, [authObj.authCredential, authObj.authInfoId, authObj.authType])
  }
  static async updateAuthPassword(authInfoId, authCredential) {
    await query(sqlList.updateAuthPassword, [authCredential, authInfoId])
  }
  static async deleteAuthByType(authInfoId, authType) {
    await query(sqlList.deleteAuthByType, [authInfoId, authType])
  }
  static async deleteAuthByInfo(authInfoId) {
    await query(sqlList.deleteAuthByInfo, authInfoId)
  }

  // verify
  static async getVerifyByAccount(verifyAccount) {
    let results = await query(sqlList.getVerifyByAccount, verifyAccount)
    return toHumpObj(results[0])
  }
  static async createVerify(verifyAccount, verifyCode) {
    let result = await query(sqlList.createVerify, toLineObj({
      verifyAccount,
      verifyCode
    }))
    return result.insertId
  }
  static async deleteVerifyByAccount(verifyAccount) {
    await query(sqlList.deleteVerifyByAccount, verifyAccount)
  }

  // follow
  static async getFollowList(followInfoId) {
    let results = await query(sqlList.getFollowList, followInfoId)
    return results.map((item) => {
      return item.follow_info_mogul
    })
  }
  static async getFollowedList(followInfoMogul) {
    let results = await query(sqlList.getFollowedList, followInfoMogul)
    return results.map((item) => {
      return item.follow_info_id
    })
  }
  static async getFollowCount(followInfoId) {
    let results = await query(sqlList.getFollowCount, followInfoId)
    return results[0].count
  }
  static async getFollowedCount(followInfoMogul) {
    let results = await query(sqlList.getFollowedCount, followInfoMogul)
    return results[0].count
  }
  static async checkFollow(followInfoId, followInfoMogul) {
    let results = await query(sqlList.checkFollow, [followInfoId, followInfoMogul])
    return !!results[0].count
  }
  static async createFollow(followInfoId, followInfoMogul) {
    let result = await query(sqlList.createFollow, [followInfoId, followInfoMogul])
    return result.insertId
  }
  static async deleteFollow(followInfoId, followInfoMogul) {
    await query(sqlList.deleteFollow, [followInfoId, followInfoMogul])
  }

  // opus
  static async getOpus(opusId) {
    let results = await query(sqlList.getOpus, opusId)
    return toHumpObj(results[0])
  }
  static async getOpusAllByInfo(opusInfoId) {
    let results = await query(sqlList.getOpusAllByInfo, opusInfoId)
    return toHumpObj(results)
  }
  static async checkOpus(opusInfoId, opusId) {
    let results = await query(sqlList.checkOpus, [opusInfoId, opusId])
    return !!results[0].count
  }
  static async getOpusAll() {
    let results = await query(sqlList.getOpusAll)
    return toHumpObj(results)
  }
  static async getOpusByName(name) {
    let results = await query(sqlList.getOpusByName, [tiLikeStr(name), tiLikeStr(name)])
    return toHumpObj(results)
  }
  static async createOpus(opusObj) {
    let result = await query(sqlList.createOpus, toLineObj(opusObj))
    return result.insertId
  }
  static async updateOpus(opusObj) {
    opusObj = Object.assign({}, opusObj)
    let opusId = opusObj.opusId
    delete opusObj.opusId
    await query(sqlList.updateOpus, [toLineObj(opusObj), opusId])
  }
  static async deleteOpus(opusId) {
    await query(sqlList.deleteOpus, opusId)
  }

  // judge
  static async getJudge(judgeInfoId, judgeOpusId) {
    let results = await query(sqlList.getJudge, [judgeInfoId, judgeOpusId])
    return toHumpObj(results[0])
  }
  static async getJudgeByInfo(judgeInfoId) {
    let results = await query(sqlList.getJudgeByInfo, judgeInfoId)
    return toHumpObj(results)
  }
  static async getJudgeByOpus(judgeOpusId) {
    let results = await query(sqlList.getJudgeByOpus, judgeOpusId)
    return toHumpObj(results)
  }
  static async getJudgeIndexByOpus(judgeOpusId) {
    let results = await query(sqlList.getJudgeIndexByOpus, judgeOpusId)
    return results[0].sum
  }
  static async getJudgeCountByOpus(judgeOpusId) {
    let results = await query(sqlList.getJudgeCountByOpus, judgeOpusId)
    return results[0].count
  }
  static async checkJudge(judgeInfoId, judgeOpusId) {
    let results = await query(sqlList.checkJudge, [judgeInfoId, judgeOpusId])
    return !!results[0].count
  }
  static async createJudge(judgeObj) {
    let result = await query(sqlList.createJudge, toLineObj(judgeObj))
    return result.insertId
  }
  static async deleteJudgeByInfoAndOpus(judgeInfoId, judgeOpusId) {
    await query(sqlList.deleteJudge, [judgeInfoId, judgeOpusId])
  }
  static async deleteJudgeByInfo(judgeInfoId) {
    await query(sqlList.deleteJudgeByInfo, judgeInfoId)
  }

  // comment
  static async getComment(commentId) {
    let results = await query(sqlList.getComment, commentId)
    return toHumpObj(results[0])
  }
  static async getCommentOrderByTime(commentOpusId) {
    let results = await query(sqlList.getCommentOrderByTime, commentOpusId)
    return toHumpObj(results)
  }
  static async getCommentOrderByAgree(commentOpusId) {
    let results = await query(sqlList.getCommentOrderByAgree, commentOpusId)
    return toHumpObj(results)
  }
  static async getCommentCount(commentOpusId) {
    let results = await query(sqlList.getCommentCount, commentOpusId)
    return results[0].count
  }
  static async createComment(commentObj) {
    let result = await query(sqlList.createComment, toLineObj(commentObj))
    return result.insertId
  }
  static async agreeComment(commentId) {
    await query(sqlList.agreeComment, commentId)
  }
  static async disAgreeComment(commentId) {
    await query(sqlList.disAgreeComment, commentId)
  }
  static async deleteComment(commentId) {
    await query(sqlList.deleteComment, commentId)
  }

  // care
  static async getCare(careInfoId, careOpusId) {
    let results = await query(sqlList.getCare, [careInfoId, careOpusId])
    return toHumpObj(results[0])
  }
  static async getCareByInfo(careInfoId) {
    let results = await query(sqlList.getCareByInfo, careInfoId)
    return toHumpObj(results)
  }
  static async getCareByOpus(careOpusId) {
    let results = await query(sqlList.getCareByOpus, careOpusId)
    return toHumpObj(results)
  }
  static async getCareInfosByOpus(careOpusId) {
    let results = await query(sqlList.getCareInfosByOpus, careOpusId)
    return results.map((item) => item.care_info_id)
  }
  static async getCareCountByInfo(careInfoId) {
    let results = await query(sqlList.getCareCountByInfo, careInfoId)
    return results[0].count
  }
  static async getCareCountByOpus(careOpusId) {
    let results = await query(sqlList.getCareCountByOpus, careOpusId)
    return results[0].count
  }
  static async checkCare(careInfoId, careOpusId) {
    let results = await query(sqlList.checkCare, [careInfoId, careOpusId])
    return !!results[0].count
  }
  static async createCare(careInfoId, careOpusId) {
    let result = await query(sqlList.createCare, [careInfoId, careOpusId])
    return result.insertId
  }
  static async deleteCare(careInfoId, careOpusId) {
    await query(sqlList.deleteCare, [careInfoId, careOpusId])
  }

  // msg
  static async getMsg(msgId) {
    let results = await query(sqlList.getMsg, msgId)
    return toHumpObj(results[0])
  }
  static async getMsgByHome(msgInfoId) {
    let results = await query(sqlList.getMsgByHome, msgInfoId)
    return toHumpObj(results)
  }
  static async getMsgByShow(msgInfoId) {
    let results = await query(sqlList.getMsgByShow, msgInfoId)
    return toHumpObj(results)
  }
  static async createMsg(msgObj) {
    await query(sqlList.createMsg, toLineObj(msgObj))
  }
  static async deleteMsg(msgId) {
    await query(sqlList.deleteMsg, msgId)
  }
}

module.exports = db
