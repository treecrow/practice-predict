import {
  Merge
} from 'client/config/util'

export default {
  // --------------------user--------------------
  setUserId(state, userId) {
    state.userId = userId
  },
  setInfo(state, params) {
    state.user.info = params
  },
  setAuthList(state, params) {
    state.user.authList = params
  },
  setFollowList(state, params) {
    state.user.followList = params
  },
  setFollowedList(state, params) {
    state.user.followedList = params
  },
  setOpusList(state, params) {
    state.user.opusList = params
  },
  setJudgeList(state, params) {
    state.user.judgeList = params
  },
  setCareList(state, params) {
    state.user.careList = params
  },
  setMsgHomeList(state, params) {
    state.user.msgHomeList = params
  },
  setMsgShowList(state, params) {
    state.user.msgShowList = params
  },
  // --------------------predict--------------------
  setOpus(state, params) {
    state.predict.opus = params
  },
  setOpusRelate(state, params) {
    state.predict.opusRelate = params
  },
  setOpusCommentList(state, params) {
    state.predict.commentList = params
  },
  // --------------------model--------------------
  setLoginModel(state, params) {
    Object.assign(state.loginModel, params)
  },
  setSureModel(state, params) {
    Object.assign(state.sureModel, params)
  },
  setEditModel(state, params) {
    Object.assign(state.editModel, params)
  },
  setUserModel(state, params) {
    Object.assign(state.userModel, params)
  }
}
