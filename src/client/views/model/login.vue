<template>
<div id="login">
  <el-dialog :show-close="false" :visible.sync="modelShow" size="tiny" :lock-scroll="true">
    <div slot="title" class="zh-login-header">
      <h1>
        <template v-if="loginModelType === 'find'">kizun 重置密码</template>
        <template v-else-if="loginModelType === 'add'">kizun 添加登录方式</template>
        <template v-else-if="loginModelType === 'signup'">kizun 注册</template>
        <template v-else>kizun 登录</template>
      </h1>
      <p>与世界分享你的知识、经验和见解</p>
    </div>
    <!-- 账号 -->
    <div class="zh-login-row">
      <el-input v-model="authAccount" placeholder="请输入手机号或邮箱" @focus="resetTips"></el-input>
      <p class="zh-login-tip" v-show="accountTip">请输入正确的手机／邮箱格式</p>
    </div>
    <!-- 账号密码 -->
    <div class="zh-login-row">
      <el-input v-model="authCredential" :placeholder="loginModelType === 'find' ? '请输入新密码' : '请输入账号密码'" @focus="resetTips"></el-input>
      <p class="zh-login-tip" v-show="credentialTip">请输入6位以上密码</p>
    </div>
    <!-- 验证码 -->
    <div class="zh-login-row" v-show="loginModelType !== 'signin'">
      <el-row>
        <el-col :span="16">
          <el-input v-model="verifyCode" placeholder="请输入验证码" @focus="resetTips"></el-input>
          <p class="zh-login-tip" v-show="codeTip">请输入验证码</p>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-button :loading="loginModelSending" :disabled="!loginModelCanSend" type="primary" @click="handleSendCode" class="zh-login-button">
            {{ loginModelCodeText }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 注册登录失败 -->
    <p class="zh-login-tip" v-show="loginModelFail">账号和密码不匹配</p>
    <!-- footer -->
    <div slot="footer">
      <el-button type="primary" size="large" class="zh-login-button" @click="handleSend">确 定</el-button>
      <el-row>
        <el-col :span="12" class="zh-login-belel" v-show="loginModelType !== 'find'">
          <template v-if="loginModelType === 'signup'">社交账号注册</template>
          <template v-else-if="loginModelType === 'signin'">社交账号登录</template>
          <template v-else>添加社交账号</template>
          <span><i class="el-icon-star-on"></i></span>
          <span><i class="el-icon-star-on"></i></span>
          <span><i class="el-icon-star-on"></i></span>
        </el-col>
        <el-col :span="12" class="zh-login-belel right" @click.native="turnToFind" v-show="loginModelType == 'signin'">
          <span>找回密码 <i class="el-icon-arrow-right"></i></span>
        </el-col>
      </el-row>
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
export default {
  name: 'zhLogin',
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
      'loginModelShow',
      'loginModelType',
      'loginModelFail',
      'loginModelSending',
      'loginModelCanSend',
      'loginModelCodeText',
    ])
  },
  watch: {
    modelShow(val) {
      this.setLoginModel({
        show: val
      })
    },
    loginModelShow(val) {
      this.modelShow = this.loginModelShow
    }
  },
  methods: {
    ...mapMutations([
      'setLoginModel',
    ]),
    ...mapActions([
      'createVerify',
      'createUser',
      'userLogin',
      'updatePassword',
      'addAuth',
    ]),
    // 切换到找回(重置)密码模式
    turnToFind() {
      this.setLoginModel({
        type: 'find'
      })
    },
    // 验证账号
    checkAccount() {
      let isEmail = this.validator.isEmail(this.authAccount)
      let isPhone = this.validator.isMobilePhone(this.authAccount, 'zh-CN')
      let authType = isEmail ? 'email' : (isPhone ? 'phone' : false)
      if (!authType) this.accountTip = true
      return authType
    },
    // 获取验证码
    handleSendCode() {
      // 验证
      let authType = this.checkAccount()
      if (!authType) return
      // loading...
      this.setLoginModel({
        sending: true
      })
      // 获取验证码
      this.createVerify({
        verifyType: authType,
        verifyAccount: this.authAccount
      })
    },
    // 处理登录／注册提交事件
    handleSend() {
      // 验证
      let authType = this.checkAccount()
      if (!authType) return
      let rightCredential = this.authCredential.length >= 6
      if (!rightCredential) {
        this.credentialTip = true
        return
      }
      if (this.loginModelType !== 'signin' && !this.verifyCode) {
        this.codeTip = true
        return
      }
      // 注册、登录、重置密码、添加账号
      let authObj = {
        authType,
        authAccount: this.authAccount,
        authCredential: this.authCredential,
      }
      switch (this.loginModelType) {
        case 'signup':
          this.createUser({
            verifyCode: this.verifyCode,
            ...authObj
          })
          break;
        case 'signin':
          this.userLogin(authObj)
          break;
        case 'find':
          this.updatePassword({
            verifyCode: this.verifyCode,
            ...authObj
          })
          break;
        case 'add':
          this.addAuth({
            verifyCode: this.verifyCode,
            ...authObj
          })
          break;
      }
    },
    // 取消各种提示
    resetTips() {
      this.accountTip = this.credentialTip = this.codeTip = false
      this.setLoginModel({
        fail: false
      })
    }
  }
}
</script>

<style lang='stylus'>
@import '~client/assets/base.styl'
.zh-login-header
  text-align: center
  color: $color-text-light
  font-size: $font-size-small
  & h1
    color: $color-text-gray
    font-size: $font-size-medium

.zh-login-button
  width:100%

.zh-login-row:not(:last-child)
  margin-bottom: $ruler-base

.zh-login-tip
  color: $color-text-red
  font-size: $font-size-mini

.zh-login-belel
  margin-top: $ruler-large
  color: $color-text-gray
  font-size: $font-size-small
  text-align:left
  &.right
    text-align: right
  & span
    cursor: pointer
    &:hover
      color: $color-text-cyan
</style>
