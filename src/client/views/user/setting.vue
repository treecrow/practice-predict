<template>
<div id="setting">
  <div class="zh-setting-box">
    <!-- 用户基本信息 -->
    <h2 class="sort-title">基本信息</h2>
    <el-row>
      <el-col :span="8">
        <el-upload class="zh-setting-uploader" action="http://localhost:3000/upload?avatar" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :with-credentials="true" accept="image/*">
          <img v-if="newInfo.infoAvatar" :src="newInfo.infoAvatar">
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-col>
      <el-col :span="16">
        <el-row class="zh-setting-block">
          <el-col :span="5">名字</el-col>
          <el-col :span="16">
            <el-input v-model="newInfo.infoName" placeholder="请输入你的名字"></el-input>
          </el-col>
        </el-row>
        <el-row class="zh-setting-block">
          <el-col :span="5">昵称</el-col>
          <el-col :span="16">
            <el-input v-model="newInfo.infoNickname" placeholder="请输入你的昵称"></el-input>
          </el-col>
        </el-row>
        <el-row class="zh-setting-block">
          <el-col :span="5">性别</el-col>
          <el-col :span="16">
            <template>
              <el-radio class="radio" v-model="newInfo.infoSex" label="保密">保密</el-radio>
              <el-radio class="radio" v-model="newInfo.infoSex" label="男">男</el-radio>
              <el-radio class="radio" v-model="newInfo.infoSex" label="女">女</el-radio>
            </template>
          </el-col>
        </el-row>
        <el-row class="zh-setting-block">
          <el-col :span="5">生日</el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="newInfo.infoBirthday"
              type="date"
              placeholder="选择日期"
              :editable="false"
              :clearable="false"
              :value="newInfo.infoBirthday"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="zh-setting-block">
          <el-col :span="5">住址</el-col>
          <el-col :span="16">
            <textarea class="zh-textarea" v-model="newInfo.infoAddress" placeholder="请输入你的住址"></textarea>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="18">
            <el-button type="primary" @click="updateInfoHandle">保存</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 用户 auth 信息 -->
    <h2 class="sort-title">账号信息</h2>
    <div class="zh-setting-auth">
      <el-row>
        <el-col :span="4">已绑定</el-col>
        <el-col :span="20">
          <span v-for="authType in authList" class="auth-item" @click="removeAuthHandle(authType)">
            <i :class="infoIcons[authType]"></i>
          </span>
        </el-col>
      </el-row>
      <el-row class="zh-setting-block">
        <el-col :span="6" :offset="18">
          <el-button type="text" @click="addAuthHandle">添加登录途径 <i class="el-icon-plus"></i></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'settingView',
  data() {
    return {
      authLists: [
        'phone',
        'email',
        'wechat',
        'qq',
        'sina',
      ],
      newInfo: {
        infoName: '',
        infoNickname: '',
        infoAvatar: '',
        infoSex: '',
        infoBirthday: '',
        infoAddress: ''
      },
      infoIcons: {
        phone: 'el-icon-circle-check',
        email: 'el-icon-message',
        wechat: 'el-icon-circle-check',
        qq: 'el-icon-time',
        sina: 'el-icon-view'
      },
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'authList',
      'sureModelVal'
    ])
  },
  methods: {
    ...mapMutations([
      'setSureModel',
      'setLoginModel',
    ]),
    ...mapActions([
      'updateInfo',
    ]),
    // 成功上传头像之后的回调
    handleAvatarSuccess(res, file) {
      console.log('success')
      console.log(res)
      console.log(file)
      console.log(URL.createObjectURL(file.raw))
      this.newInfo.infoAvatar = res.filePath
    },
    // 上传头像之前的回调
    beforeAvatarUpload(file) {
      // const isImg = ['png', 'jpg', 'jpeg', 'gif'].includes(file.name.split('.').unshift())
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M
    },
    // 删除 auth
    removeAuthHandle(authType) {
      if (this.authList.length < 2) {
        this.$message({
          showClose: true,
          message: '你只有一种登录途径，不能再删除',
          type: 'warning'
        })
        return
      }
      this.setSureModel({
        show: true,
        content: `确定要删除 ${authType} 登录途径吗？`,
        action: 'removeAuth',
        params: [authType]
      })
    },
    // 添加用户
    addAuthHandle(authType) {
      this.setLoginModel({
        show: true,
        type: 'add'
      })
    },
    updateInfoHandle() {
      // 验证
      if(!(this.newInfo.infoNickname && this.newInfo.infoSex)){
        this.$message({
          showClose: true,
          message: '昵称或性别不能为空',
          type: 'warning'
        })
        return
      }
      this.updateInfo({
        ...this.newInfo,
        ...{
          infoBirthday: this.newInfo.infoBirthday.getTime()
        }
      })
    },
  },
  created() {
    this.Merge(this.newInfo, this.info)
    this.newInfo.infoBirthday = new Date(Number(this.newInfo.infoBirthday))
  }
}
</script>

<style lang='stylus'>
@import '~client/assets/base.styl'
.zh-setting-box
  padding: $ruler-large
  margin-bottom: 40px
  & .sort-title
    padding-bottom: $ruler-base
    border-bottom: 1px solid $color-text-cyan
    color: $color-text-cyan
    font-weight: $font-weight-base
    font-size: $font-size-large
.zh-setting-uploader
  display: inline-block
  border: 1px dashed $color-text-gray
  border-radius: $border-radius-base
  cursor: pointer
  overflow: hidden
  &:hover
    border-color: $color-text-cyan
  & img
    width: 175px
    height: 175px
  & i
    font-size: $font-size-super
    color: #8c939d
    width: 175px
    height: 175px
    line-height: 175px
    text-align: center
.zh-setting-block
  margin: $ruler-large 0
  font-size: $font-size-small
.zh-setting-auth
  padding: $ruler-big 0 0 $ruler-big
  & .auth-item
    padding: 0 $ruler-big
    cursor: pointer
    &:hover
      & i
        color $color-text-cyan
    & i
      color: $color-text-gray
      font-size: $font-size-super
</style>
