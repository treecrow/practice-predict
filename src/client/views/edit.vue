<template>
<div class="zh-full-screen" id="edit">
  <md-editer :mdText="mdText" @save="saveHandle" @publich="publichHandle"></md-editer>
  <el-dialog :show-close="false" :visible.sync="dialogShow" size="tiny" :lock-scroll="true">
    <div slot="title" class="zh-login-header">
      <h1>请输入 opus 标题和简介</h1>
    </div>
    <div class="zh-row">
      <el-input v-model="newOpus.opusTitle" placeholder="作品标题"></el-input>
      <p class="zh-tip" v-show="opusTitleTip">请输入作品标题</p>
    </div>
    <div class="zh-row">
      <textarea class="zh-textarea" v-model="newOpus.opusSummary" placeholder="作品简介"></textarea>
      <p class="zh-tip" v-show="opusSummaryTip">请输入作品简介</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="large" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="large" @click="handleEnsure">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import mdEditer from 'client/views/model/mdEditer'
export default {
  name: 'editView',
  data() {
    return {
      opusId: '',
      mdText: '',
      dialogShow: false,
      newOpus: {
        opusTitle: '',
        opusSummary: '',
        opusText: '',
      },
      opusTitleTip: false,
      opusSummaryTip: false
    }
  },
  computed: {
    ...mapGetters([
      'editModelCreate',
    ])
  },
  methods: {
    ...mapMutations([
      'setEditModel',
    ]),
    ...mapActions([
      'createOpus',
    ]),
    // 提示成功保存到本地
    saveHandle() {
      this.$message({
        message: '成功保存到本地!',
        type: 'success'
      })
    },
    // 发布事件
    publichHandle(mdContent) {
      this.newOpus.opusText = mdContent
      if (this.editModelCreate) {
        this.dialogShow = true
        // 请输入 opus 标题和简介
        // ...
        // 创建新的opus
        // 跳转
      } else {
        console.log('更新opus')
        // 更新opus
        // 跳转
      }
    },
    handleCancel() {
      this.dialogShow = false
    },
    handleEnsure() {
      // 验证
      if (!this.newOpus.opusTitle) {
        this.opusTitleTip = true
        return
      }
      if (!this.newOpus.opusSummary) {
        this.opusSummaryTip = true
        return
      }
      this.dialogShow = false
      // 创建
      this.createOpus(this.newOpus)
    },
  },
  components: {
    mdEditer,
  },
  created() {
    this.opusId = this.$route.params.opusId
    if (this.opusId) {
      this.setEditModel({
        create: false
      })
    } else {
      this.setEditModel({
        create: true
      })
    }
  },
}
</script>

<style lang='stylus'>
</style>
