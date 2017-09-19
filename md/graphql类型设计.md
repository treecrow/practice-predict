# graphql类型设计

## graphql 类型列表

分类           | 类型                 | more
------------ | ------------------ | --------------------------------------------------------------------
infoTypes    | infoBaseType       | info类，确定大部分的 info 信息所包含的字段
~            | infoUpdateType     | info类，确定 updateInfo()输入参数的形式
authTypes    | authBaseType       | auth类，包含了所有 auth 字段
~            | authInputType      | auth类，确定 createInfo()输入参数的形式
~            | authVerifyType     | auth类，确定账户的注册和重置输入参数的形式
verifyTypes  | verifyCreateType   | verify类，用于 verify 的创建
followTypes  | followBaseType     | follow类，包含了所有字段
opusTypes    | opusBaseType       | opus类，确定了常规 opus 信息包含的内容
~            | opusUserType       | opus类，扩展了 opusInfo 字段
~            | opusPredictType    | opus类，确定 createOpus()输入参数的形式
~            | opusCreateType     | opus类，与 opusPredictType 相同
~            | opusUpdateType     | opus类，确定 updateOpus()输入参数的形式
judgeTypes   | judgeBaseType      | judge类，确定了常规 judge 信息包含的内容
~            | judgeUserType      | judge类，扩展了 judgeOpus 字段
~            | judgePredictType   | judge类，扩展了 judgeInfo 字段
~            | judgeCreateType    | judge类，用于 judge 的创建
commentTypes | commentBaseType    | comment类，确定了常规 comment 信息包含的内容
~            | commentPredictType | comment类，扩展了 commentInfo 字段
~            | commentCreateType  | comment类，用于 comment 的创建
careTypes    | careBaseType       | care类，确定了常规 care 信息包含的内容
~            | careUserType       | care类，扩展了 careOpus 字段
~            | carePredictType    | care类，扩展了 careInfo 字段
msgTypes     | msgBaseType        | msg类，确定了常规 msg 信息包含的内容
~            | msgUserType        | msg类，扩展了 msgInfo、msgInfo2、msgInfo3、msgOpus、msgComment、msgComment2 字段
