module.exports = {
  // info
  getInfo: 'select * from info where info_id=?',
  getInfoByToken: 'select * from info where info_token=?',
  getInfoAllWithId: 'select info_id from info',
  getInfoAll: 'select * from info',
  getInfoByName: 'select * from info where info_name like ? or info_nickname like ?',
  createInfo: 'insert into info set ?,info_enroll_time=unix_timestamp(now())*1000',
  deleteInfo: 'delete from info where info_id=?',
  updateInfo: 'update info set ? where info_id=?',

  // auth
  getInfoByAccount: 'select * from auth where auth_account=?',
  getAuthList: 'select auth_type from auth where auth_info_id=?',
  getAuthByInfoAndType: 'select * from auth where auth_info_id=? and auth_type=?',
  checkAuth: 'select * from auth where auth_account=? and auth_credential=?',
  checkAuthByAccount: 'select count(*) count from auth where auth_account=?',
  createAuth: 'insert into auth set ?',
  updateAuthCredential: 'update auth set auth_credential=? where auth_info_id=? and auth_type=?',
  updateAuthPassword: 'update auth set auth_credential=? where auth_info_id=? and auth_type in ("phone","email")',
  deleteAuthByType: 'delete from auth where auth_info_id=? and auth_type=?',
  deleteAuthByInfo: 'delete from auth where auth_info_id=?',

  // verify
  getVerifyByAccount: 'select * from verify where verify_account=?',
  createVerify: 'insert into verify set ?,verify_create_time=unix_timestamp(now())*1000',
  deleteVerifyByAccount: 'delete from verify where verify_account=?',

  // follow
  getFollowList: 'select follow_info_mogul from follow where follow_info_id=?',
  getFollowedList: 'select follow_info_id from follow where follow_info_mogul=?',
  getFollowCount: 'select count(*) count from follow where follow_info_id=?',
  getFollowedCount: 'select count(*) count from follow where follow_info_mogul=?',
  checkFollow: 'select count(*) count from follow where follow_info_id=? and follow_info_mogul=?',
  createFollow: 'insert into follow values(0,?,?,unix_timestamp(now())*1000)',
  deleteFollow: 'delete from follow where follow_info_id=? and follow_info_mogul=?',

  // opus
  getOpus: 'select * from opus where opus_id=?',
  getOpusAllByInfo: 'select * from opus where opus_info_id=?',
  checkOpus: 'select count(*) count from opus where opus_info_id=? and opus_id=?',
  getOpusAll: 'select * from opus',
  getOpusByName: 'select * from opus where opus_title like ? or opus_summary like ?',
  createOpus: 'insert into opus set ?,opus_create_time=unix_timestamp(now())*1000',
  updateOpus: 'update opus set ?,opus_alter_time=unix_timestamp(now())*1000 where opus_id=?',
  deleteOpus: 'delete from opus where opus_id=?',

  // judge
  getJudge: 'select * from judge where judge_info_id=? and judge_opus_id=?',
  getJudgeByInfo: 'select * from judge where judge_info_id=?',
  getJudgeByOpus: 'select * from judge where judge_opus_id=?',
  getJudgeIndexByOpus: 'select sum(judge_prefer) sum from judge where judge_opus_id=?',
  getJudgeCountByOpus: 'select count(*) count from judge where judge_opus_id=?',
  checkJudge: 'select count(*) count from judge where judge_info_id=? and judge_opus_id=?',
  createJudge: 'insert into judge set ?,judge_create_time=unix_timestamp(now())*1000',
  deleteJudgeByInfoAndOpus: 'delete from judge where judge_info_id=? and judge_opus_id=?',
  deleteJudgeByInfo: 'delete from judge where judge_info_id=?',

  // comment
  getComment: 'select * from comment where comment_id=?',
  getCommentOrderByTime: 'select * from comment where comment_opus_id=?',
  getCommentOrderByAgree: 'select * from comment where comment_opus_id=? order by comment_agree desc',
  getCommentCount: 'select count(*) count from comment where comment_opus_id=?',
  createComment: 'insert into comment set ?,comment_create_time=unix_timestamp(now())*1000',
  agreeComment: 'update comment set comment_agree=comment_agree+1 where comment_id=?',
  disAgreeComment: 'update comment set comment_agree=comment_agree-1 where comment_id=?',
  deleteComment: 'delete from comment where comment_id=?',

  // care
  getCare: 'select * from care where care_info_id=? and care_opus_id=?',
  getCareByInfo: 'select * from care where care_info_id=?',
  getCareByOpus: 'select * from care where care_opus_id=?',
  getCareInfosByOpus: 'select care_info_id from care where care_opus_id=?',
  getCareCountByInfo: 'select count(*) count from care where care_info_id=?',
  getCareCountByOpus: 'select count(*) count from care where care_opus_id=?',
  checkCare: 'select count(*) count from care where care_info_id=? and care_opus_id=?',
  createCare: 'insert into care values(0,?,?,unix_timestamp(now())*1000)',
  deleteCare: 'delete from care where care_info_id=? and care_opus_id=?',

  // msg
  getMsg: 'select * from msg where msg_id=?',
  getMsgByHome: 'select * from msg where msg_info_id=? and msg_type in (1,2,3,5,8,11,12,13)',
  getMsgByShow: 'select * from msg where msg_info_id=? and msg_type in (4,7,9,10)',
  createMsg: 'insert into msg set ?,msg_create_time=unix_timestamp(now())*1000',
  deleteMsg: 'delete from msg where msg_id=?',
}
