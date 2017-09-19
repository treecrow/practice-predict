// user
export const userId = state => state.userId
export const info = state => state.user.info
export const authList = state => state.user.authList
export const followList = state => state.user.followList
export const followedList = state => state.user.followedList
export const opusList = state => state.user.opusList
export const judgeList = state => state.user.judgeList
export const careList = state => state.user.careList
export const msgHomeList = state => state.user.msgHomeList
export const msgShowList = state => state.user.msgShowList
// opus
export const opus = state => state.predict.opus
export const opusRelate = state => state.predict.opusRelate
export const opusCommentList = state => state.predict.commentList
// loginModel
export const loginModelShow = state => state.loginModel.show
export const loginModelType = state => state.loginModel.type
export const loginModelFail = state => state.loginModel.fail
export const loginModelSending = state => state.loginModel.sending
export const loginModelCanSend = state => state.loginModel.canSend
export const loginModelCodeText = state => state.loginModel.codeText
// sureModel
export const sureModelShow = state => state.sureModel.show
export const sureModelContent = state => state.sureModel.content
export const sureModelVal = state => state.sureModel.val
export const sureModelAction = state => state.sureModel.action
export const sureModelParams = state => state.sureModel.params
// editModel
export const editModelCreate = state => state.editModel.create
// userModel
export const userModelSelf = state => state.userModel.self
export const userModelTabs = state => state.userModel.tabs
