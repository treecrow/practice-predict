<template>
<div id="opus" class="zh-opus">
  <el-card>
    <!-- 作品标题 -->
    <h1 class="opus-title">{{ opus.opusTitle }}</h1>

    <!-- 小信息区域 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="18" class="zh-detail opus-detail">
        <span>{{ opus.opusStatus }}</span>
        <span>关注人数：{{ opus.opusCareCount }}</span>
        <span>评判次数：{{ opus.opusJudgeCount }}</span>
        <span>评判指数：{{ opus.opusJudgeIndex }}</span>
        <span>
          <el-button type="text" @click="careHandle">
            <i class="el-icon-star-off"></i> {{ opusRelate.care ? '取消关注' : '关注' }}
          </el-button>
        </span>
      </el-col>
      <el-col :span="6" class="opus-author">
        <span class="time">创建于 : {{ opus.opusCreateTime | time }}</span>
        <router-link :to="{name: 'judge', params:{infoId: opus.opusInfo.infoId}}">
          <!-- <img :src="opus.opusInfo.infoAvatar | defaultAvatar" /> -->
          by <img :src="'' | defaultAvatar" />{{ opus.opusInfo.infoNickname }}
        </router-link>
      </el-col>
    </el-row>

    <!-- 简介区域 -->
    <div class="opus-summary">--- {{ opus.opusSummary }}</div>

    <!-- 正文区域 -->
    <div class="markdown-body opus-text" v-html="this.opusText"></div>

    <!-- 评分区域 -->
    <div class="opus-score">
      <el-row type="flex">
        <el-col :span="14" :offset="2" class="reason">
          <template v-if="!opusRelate.judge && judgeShow">
            <textarea v-model="newJudge.judgeContent" placeholder="添加你的评判理由..." class="zh-textarea"></textarea>
            <el-button type="primary" @click="judgeHandle">确定评判</el-button>
          </template>
        </el-col>
        <el-col :span="2" :offset="1">你的评分:</el-col>
        <el-col :span="3">
          <el-rate v-model="newJudge.judgePrefer" @change="scoreHandle" v-if="!opusRelate.judge"></el-rate>
          <el-rate :disabled="true" v-model="opusRelate.judge.judgePrefer" v-else></el-rate>
        </el-col>
      </el-row>
      <el-row v-if="opusRelate.judge">
        <el-col :span="14" :offset="8">
          <p class="text">{{ opusRelate.judge ? '---' + opusRelate.judge.judgeContent : '---你没有添加评判理由！' }}</p>
        </el-col>
      </el-row>
    </div>

  </el-card>

  <!-- 评论区域 -->
  <div class="opus-comment">
    <h2 class="title">评论</h2>
    <div style="text-align:right; padding-right:40px">
      <el-button type="text" @click="commentHandle()">添加评论 <i class="el-icon-edit"></i></el-button>
    </div>
    <el-row type="flex" v-for="(comment, index) in opusCommentList" :key="index" class="comment-item">
      <el-col :span="2" class="avatar">
        <router-link :to="{name: 'judge', params:{infoId: comment.commentInfo.infoId}}">
          <img :src="comment.commentInfo.infoAvatar | defaultAvatar" />
        </router-link>
      </el-col>
      <el-col :span="22">
        <router-link :to="{name: 'judge', params:{infoId: comment.commentInfo.infoId}}">
          {{ comment.commentInfo.infoNickname }}
        </router-link>
        <p>{{ comment.commentContent }}</p>
        <el-row type="flex" justify="space-between" class="zh-detail">
          <el-col :span="6" class="handle">
            <span>{{ comment.commentAgree }}赞 </span>
            <el-button type="text" @click="commentHandle(comment.commentId)"><i class="el-icon-edit"></i></el-button>
          </el-col>
          <el-col :span="6">{{ comment.commentCreateTime | time }}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

  <!-- 添加评论对话框 -->
  <el-dialog :show-close="false" :visible.sync="commentShow" size="tiny">
    <div slot="title" class="zh-login-header">
      <h3>添加评论</h3>
    </div>
    <textarea v-model="newComment.commentContent" placeholder="评论内容..." class="zh-textarea" @focus="resetTips"></textarea>
    <p class="zh-tip" v-show="commentTip">请输入评论内容</p>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleEnsure">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import * as marked from 'marked/lib/marked.js'
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'opusView',
  data() {
    return {
      opusText: '',
      newJudge: {
        judgeOpusId: '',
        judgePrefer: 0,
        judgeContent: '',
      },
      newComment: {
        commentOpusId: '',
        commentContent: ''
      },
      judgeShow: false, // 评判区域是否显示
      commentShow: false, // 评论对话框是否显示
      commentTip: false, // 评论内容未填写的提示
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'opus',
      'opusRelate',
      'opusCommentList',
    ])
  },
  methods: {
    ...mapMutations([
      'setLoginModel',
    ]),
    ...mapActions([
      'getPredict',
      'createCare',
      'deleteCare',
      'createJudge',
      'createComment',
    ]),
    // 关注 && 取消关注
    careHandle() {
      // 请先登录
      if (!this.userId) {
        this.setLoginModel({
          show: true,
          type: 'signup'
        })
        return
      }
      if (this.opusRelate.care) {
        this.deleteCare(this.opus.opusId)
      } else {
        this.createCare(this.opus.opusId)
      }
    },
    // 评分
    scoreHandle() {
      this.judgeShow = true
    },
    // 评判
    judgeHandle() {
      this.newJudge.judgeOpusId = this.opus.opusId
      this.createJudge(this.newJudge)
    },
    // 打开评论对话框
    commentHandle(commentId) {
      this.newComment.commentOpusId = this.opus.opusId
      if (commentId) this.newComment.commentCommentId = commentId
      this.commentShow = true
    },
    // 取消评论
    handleCancel() {
      this.commentShow = false
    },
    // 创建评论
    handleEnsure() {
      if (!this.newComment.commentContent) {
        this.commentTip = true
        return
      }
      this.createComment(this.newComment)
      this.commentShow = false
    },
    // 重置提示
    resetTips() {
      this.commentTip = false
    }
  },
  created() {
    this.getPredict(this.$route.params.opusId)
  },
  beforeUpdate() {
    this.opusText = marked(this.opus.opusText)
  }
}
</script>

<style lang='stylus'>
@import '~client/assets/base.styl'
.zh-opus
  padding-top: $ruler-large
  & .zh-textarea
    min-height:50px
.opus-title
  font-size: $font-size-super
  text-align: center
  margin: 20px 0 40px

.opus-detail
  font-size: $font-size-mini
  color: $color-text-gray
  span
    padding-left: $ruler-base
.opus-author
  & img
    vertical-align: middle
    margin: 0 $ruler-small
    width: 36px
    height: 36px
    border-radius: 50%
  & .time
    font-size: $font-size-mini
    color: $color-text-gray

.opus-summary
  padding: $ruler-big

.opus-text
  margin-bottom: $ruler-big
  padding: $ruler-large
  background-color: $color-bg-base

.opus-score
  margin-bottom: $ruler-big
  color: $color-text-gray
  & .reason
    text-align: right
  & textarea
    margin-bottom: $ruler-base
  & .text
    text-align: right

.opus-comment
  width: 80%
  margin: $ruler-big auto
  cursor: pointer
  & .title
    text-align: center
  & .comment-item
    margin-bottom: $ruler-base
    padding: $ruler-large
    background-color: $color-bg-white
    & .handle
      visibility: hidden
    &:hover .handle
      visibility: visible
  & .avatar
    padding-right: $ruler-big
    text-align: right
    & img
      width: 36px
      height: 36px
      border-radius: 50%
</style>
