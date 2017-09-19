# graphqlApi

## mutation

分类            | api            | more
------------- | -------------- | -------------------------------------------------------
userFields    | createVerify   | -
~             | createUser     | 创建新用户，返沪新用户 info 信息(用于phone、email注册用户)
~             | userLogin      | 用户登录，返沪用户 info 信息，将 token 信息写入 cookie（用于用户登录或者第三方注册/登录）
~             | addUserAuth    | 增加用户登录途径，返回用户绑定的登录途径列表
~             | removeUserAuth | 删除用户登录途径
~             | updateInfo     | 更新用户信息
~             | updatePassword | 修改用户密码
~             | deleteUser     | 删除用户，成功后返回相应的 infoId
followFields  | addFollow      | 关注用户
~             | removeFollow   | 取消关注某个用户
opusFields    | createOpus     | 创建作品
~             | updateOpus     | 更新作品
~             | deleteOpus     | 删除作品
judgeFields   | createJudge    | 创建评判
commentFields | createComment  | 创建评论
~             | deleteComment  | 删除评论
careFields    | createCare     | 关注作品
~             | deleteCare     | 取消关注作品
msgFields     | broadcastMsg   | 广播消息（infoId=1的用户有操作权限）
~             | deleteMsg      | 删除消息

## query

### user

字段           | 类型                             | more
------------ | ------------------------------ | -----------
info         | infoBaseType                   | 用户自身信息
authList     | new GraphQLList(GraphQLString) | 用户绑定的登录途径列表
followList   | 嵌套了，后面需要去掉嵌套                   | 用户关注的用户列表
followedList | 嵌套了，后面需要去掉嵌套                   | 关注用户的其它用户列表
opusList     | new GraphQLList(opusBaseType)  | 用户的作品列表
judgeList    | new GraphQLList(judgeUserType) | 用户的评判列表
careList     | new GraphQLList(careUserType)  | 用户关注作品列表
msgHomeList  | new GraphQLList(msgUserType)   | 用户主页消息列表
msgShowList  | new GraphQLList(msgUserType)   | 用户展示列表

### predict

字段                 | 类型                                  | more
------------------ | ----------------------------------- | ---------
opus               | opusPredictType                     | 作品本身包含的信息
judgeList          | new GraphQLList(judgePredictType)   | 作品被评判的列表
commentListByTime  | new GraphQLList(commentPredictType) | 作品被评论的列表
commentListByAgree | new GraphQLList(commentPredictType) | 作品被评论的列表
careList           | new GraphQLList(carePredictType)    | 作品被关注的列表
