<template>
<div id="sure" class="zh-sure">
  <el-dialog title="提示" :show-close="false" :visible.sync="modelShow" size="tiny">
    <h2 class="content">{{ sureModelContent }}</h2>
    <div class="btns">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleEnsure">确 定</el-button>
    </div>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'zhSure',
  data() {
    return {
      modelShow: false, // 本地存放 vuex中的 loginModelShow
      accountTip: false, // 账号格式错误提示
      credentialTip: false, // 密码格式错误提示
      codeTip: false, // 验证码错误提示
      authAccount: '', // 账号
      authCredential: '', // 密码
      verifyCode: '', // 验证码
    }
  },
  computed: {
    ...mapGetters([
      'sureModelShow',
      'sureModelContent',
      'sureModelVal',
      'sureModelAction',
      'sureModelParams',
    ])
  },
  watch: {
    modelShow(val) {
      this.setSureModel({
        show: val
      })
    },
    sureModelShow(val) {
      this.modelShow = this.sureModelShow
    }
  },
  methods: {
    ...mapMutations([
      'setSureModel',
    ]),
    ...mapActions([
      'removeAuth',
    ]),
    // 取消
    handleCancel() {
      this.setSureModel({
        val: false
      })
      this.modelShow = false
    },
    // 确认
    handleEnsure() {
      this.setSureModel({
        val: true
      })
      this[this.sureModelAction](...this.sureModelParams)
      this.modelShow = false
    },
  }
}
</script>

<style lang='stylus'>
@import '~client/assets/base.styl'
.zh-sure
  & .content
    font-weight: $font-weight-base
  & .btns
    text-align: right
</style>
