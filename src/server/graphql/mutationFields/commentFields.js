// ----------------------引入模块----------------------
const db = require('../../db')

const {
  GraphQLID,
  GraphQLString,
} = require('graphql')

const {
  checkUser,
  parseToken,
  ValidationError,
} = require('../graphqlUtil')

const {
  commentCreateType
} = require('../unitTypes/commentTypes')

// ----------------------声明 mutation----------------------
// 创建评论
const createComment = {
  type: GraphQLString,
  description: '创建评论',
  args: {
    commentObj: {
      type: commentCreateType
    }
  },
  resolve: async(_, {
    commentObj
  }, ctx) => {
    console.log('createComment', commentObj)
    // 验证
    await checkUser(ctx)
    let userId = parseToken(ctx).infoId
    let opusId = commentObj.commentOpusId
    let commentCommentId = commentObj.commentCommentId
    let comment
    if(commentCommentId){
      comment = await db.getComment(commentCommentId)
    }
    if (comment && (comment.commentOpusId != opusId)) throw new ValidationError({
      key: 'commentObj',
      message: `作品id ${opusId} 没有你回复的评论 ${commentCommentId}`
    })
    // 创建评判
    let commentId = await db.createComment(Object.assign({
      commentInfoId: userId
    }, commentObj))
    // 更新opus && 创建消息
    let promises = []
    let fansList = await db.getFollowedList(userId)
    let opusFansList = await db.getCareInfosByOpus(opusId)
    promises.push(db.updateOpus({
      opusId,
      opusCommentCount: await db.getCommentCount(opusId),
    }))
    if (comment) {
      promises.push(db.createMsg({
        msgType: 12,
        msgInfoId: comment.commentInfoId,
        msgInfoId2: userId,
        msgOpusId: opusId,
        msgCommentId: commentCommentId,
        msgCommentId2: commentId,
      }))
    } else {
      promises.push(db.createMsg({
        msgType: 9,
        msgInfoId: (await db.getOpus(opusId)).opusInfoId,
        msgInfoId2: userId,
        msgOpusId: opusId,
        msgCommentId: commentId,
      }))
      promises.concat(fansList.map((fansId) => db.createMsg({
        msgType: 10,
        msgInfoId: fansId,
        msgInfoId2: userId,
        msgOpusId: opusId,
        msgCommentId: commentId,
      })))
      promises.concat(opusFansList.map((fansId) => db.createMsg({
        msgType: 11,
        msgInfoId: fansId,
        msgInfoId2: userId,
        msgOpusId: opusId,
        msgCommentId: commentId,
      })))
    }
    await Promise.all(promises)
    // 返回
    return `成功创建对作品 ${opusId} 的评论 ${commentId}`
  }
}

// 删除评论
const deleteComment = {
  type: GraphQLString,
  description: '删除评论',
  args: {
    commentId: {
      type: GraphQLID
    }
  },
  resolve: async(_, {
    commentId
  }, ctx) => {
    // 声明变量
    let userId = parseToken(ctx).infoId
    // 验证
    await checkUser(ctx)
    let comment = await db.getComment(commentId)
    let commentOpusId = comment.commentOpusId
    if (!comment) throw new ValidationError({
      key: 'commentId',
      message: `没有评论 ${commentId} 或者该评论已经删除`
    })
    if (comment.commentInfoId != userId) throw new ValidationError({
      key: 'commentId',
      message: `你没有删除评论 ${commentId} 的权限`
    })
    // 删除评论 && 更新用户评论数
    await db.deleteComment(commentId)
    await db.updateOpus({
      opusId: commentOpusId,
      opusCommentCount: await db.getCommentCount(commentOpusId),
    })
    // 返回
    return `成功删除评论 ${commentId}`
  }
}

module.exports = {
  createComment,
  deleteComment
}
