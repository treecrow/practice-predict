# api

## info(中心)

api                | 用途               | more
------------------ | ---------------- | ----
getInfo()          | 根据id获取某个用户的信息    | 用到了
getInfoByToken()   | 根据token获取某个用户的信息 | 用到了
getInfoAllWithId() | 获取所有用户id列表       | 用到了
getInfoAll()       | 获取所有用户的信息        | -
getInfoByName()    | 根据名字搜索用户         | -
createInfo()       | 创建用户信息           | 用到了
updateInfo()       | 修改用户信息           | 用到了
deleteInfo()       | 删除用户信息           | 用到了

## auth

api                    | 用途                      | more
---------------------- | ----------------------- | ----
getInfoByAccount()     | 根据账号获取用户的信息             | 用到了
getAuthList()          | 获取某个用户已经绑定的登录方式(列表)     | 用到了
getAuthByInfoAndType() | 根据infoId和authType获取auth | 用到了
checkAuth()            | 验证用户账号密码,并返回 infoId     | 用到了
checkAuthByAccount()   | 查看某个 Account 是否已经存在     | 用到了
createAuth()           | 创建用户授权                  | 用到了
updateAuthCredential() | 修改用户授权密码凭证              | 用到了
updateAuthPassword()   | 修改用户账号密码                | 用到了
deleteAuthByType()     | 删除某个类型的用户授权             | 用到了
deleteAuthByInfo()     | 删除某个用户所有授权              | 用到了

## verify

api                     | 用途               | more
----------------------- | ---------------- | ----
getVerifyByAccount()    | 根据账号获取 verify 信息 | -
createVerify()          | 创建 verify        | -
deleteVerifyByAccount() | 根据账号删除 verify    | -

## follow

api                | 用途                | more
------------------ | ----------------- | ----
getFollowList()    | 获取用户关注列表          | 用到了
getFollowedList()  | 获取用户被关注的列表        | 用到了
getFollowCount()   | 获取用户关注次数          | 用到了
getFollowedCount() | 获取用户被关注的次数        | 用到了
checkFollow()      | 验证某个用户是否已经关注另一个用户 | 用到了
createFollow()     | 添加关注用户            | 用到了
deleteFollow()     | 删除关注用户            | 用到了

## opus（中心）

api                | 用途             | more
------------------ | -------------- | ----
getOpus()          | 查看某个作品         | 用到了
getOpusAllByInfo() | 查看某个用户的所有作品    | 用到了
checkOpus()        | 判断某个作品是否属于某个用户 | 用到了
getOpusAll()       | 查看所有作品         | -
getOpusByName()    | 搜索作品           | -
createOpus()       | 创建用户作品         | 用到了
updateOpus()       | 修改用户作品         | 用到了
deleteOpus()       | 删除用户作品         | 用到了

## judge

api                        | 用途                        | more
-------------------------- | ------------------------- | ----
getJudge()                 | 根据用户 id 和 opusId 获取 judge | 用到了
getJudgeByInfo()           | 获取某个用户的评判数据               | 用到了
getJudgeByOpus()           | 获取某个作品的评判数据               | 用到了
getJudgeIndexByOpus()      | 获取某个作品的评判指数               | 用到了
getJudgeCountByOpus()      | 获取某个作品的评判次数               | 用到了
checkJudge()               | 查看某个用户对某个作品的评判            | 用到了
createJudge()              | 创建用户评判                    | 用到了
deleteJudgeByInfoAndOpus() | 删除某个用户对某个问题对评判操作          | -
deleteJudgeByInfo()        | 删除某个用户所有的评判操作             | -

## comment

api                      | 用途             | more
------------------------ | -------------- | ----
getComment()             | 根据评论id获取评论     | 用到了
getCommentOrderByTime()  | 获取用户评论（时间排序）   | 用到了
getCommentOrderByAgree() | 获取用户评论（赞同指数排序） | 用到了
getCommentCount()        | 获取作品评论次数       | 用到了
createComment()          | 创建用户评论         | 用到了
agreeComment()           | 对用户评论支持        | -
disAgreeComment()        | 对用户评论反对        | -
deleteComment()          | 删除用户评论         | 用到了

## care

api                  | 用途                       | more
-------------------- | ------------------------ | ----
getCare()            | 根据用户 id 和 opusId 获取 care | 用到了
getCareByInfo()      | 获取某用户关注的作品列表             | 用到了
getCareByOpus()      | 获取关注某作品的用户列表             | 用到了
getCareInfosByOpus() | 获取关注某个作品的用户列表(id列表)      | 用到了
getCareCountByInfo() | 获取某用户关注作品的个数             | 用到了
getCareCountByOpus() | 获取某作品被关注的次数              | 用到了
checkCare()          | 查看是否关注了某作品               | 用到了
createCare()         | 创建 "关注作品"                | 用到了
deleteCare()         | 删除 "关注作品"                | 用到了

## 用途

api            | 用途            | more
-------------- | ------------- | ----
getMsg()       | 根据id获取一个消息    | 用到了
getMsgByHome() | 获取某个用户的主页消息列表 | 用到了
getMsgByShow() | 获取某个用户的展示消息列表 | 用到了
createMsg()    | 创建一条消息        | 用到了
deleteMsg()    | 删除某条评论        | 用到了
-              | 数据库自动定期删除     | -

## 待完成的任务

- 第三方登录的 authAccount、authCredential 获取
- 第三方登录的用户信息获取
- 点赞或反对某条评论
