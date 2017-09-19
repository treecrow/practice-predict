<template>
<div class="flex-lay-main">
  <!-- cover区域 -->
  <el-card :body-style="{ padding: '0px' }" class="zh-user-card">
    <img class="zh-user-cover" src="~client/assets/imgs/cover.jpg">
    <el-row class="zh-user-box">
      <!-- 头像区域 -->
      <el-col :span="5">
        <img class="zh-user-avatar" :src="info.infoAvatar | defaultAvatar" />
      </el-col>
      <!-- 用户资料区域 -->
      <el-col :span="16" class="zh-user-profile">
        <template v-if="detailsShow">
          <el-row v-for="(value, key, index) in info" key="index" class="item">
            <el-col :span="6" class="title">{{ means[key] }}</el-col>
            <el-col :span="18" class="label">{{ value | unfilled }}</el-col>
          </el-row>
        </template>
        <template v-else>
          <h2 class="name">{{ info.infoNickname | unfilled }} <i :class="infoIcons[info.infoSex]" class="icon"></i></h2>
          <p>
            <i :class="infoIcons[item]" class="icon" v-for="item in authList"></i>
          </p>
          <el-row  class="item">
            <el-col :span="6" class="title">作品数</el-col>
            <el-col :span="18" class="label">还没有这个字段</el-col>
          </el-row>
          <el-row  class="item">
            <el-col :span="6" class="title">关注作品数</el-col>
            <el-col :span="18" class="label">{{ info.infoCareCount | unfilled }}</el-col>
          </el-row>
          <el-row  class="item">
            <el-col :span="6" class="title">关注用户数</el-col>
            <el-col :span="18" class="label">{{ info.infoFollowCount | unfilled }}</el-col>
          </el-row>
          <el-row  class="item">
            <el-col :span="6" class="title">粉丝数</el-col>
            <el-col :span="18" class="label">{{ info.infoFollowedCount | unfilled }}</el-col>
          </el-row>
        </template>
        <el-button type="text" @click.native="detailsShow = !detailsShow" v-if="userModelSelf">
          <i :class="arrowClass"></i> {{detailsShow ? '收起详细资料' : '查看详细资料'}}
        </el-button>
      </el-col>
      <!-- more -->
      <div class="zh-user-more">
        <el-button v-if="userModelSelf">
          <router-link :to="{name: 'setting', params:{infoId: userId}}">编辑个人资料</router-link>
        </el-button>
        <el-button type="primary" @click="" v-else><i class="el-icon-plus"></i> 关注他</el-button>
      </div>
    </el-row>
  </el-card>

  <el-row>
    <!-- tabs区域 -->
    <el-col :span="17">
      <el-card :body-style="{ padding: '0px' }" class="zh-user-card">
        <el-menu default-active="评判" mode="horizontal">
          <el-menu-item v-for="(item, index) in tapList" :key="index" :index="item.text">
            <router-link :to="item.path">{{ item.text }}</router-link>
          </el-menu-item>
        </el-menu>
        <router-view></router-view>
      </el-card>
    </el-col>
    <!-- 杂项 -->
    <el-col :span="7">
      <el-card :body-style="{ padding: '0px' }" class="zh-user-side">
        <p>联系我们</p>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'userView',
  data() {
    return {
      // 是否显示完整用户信息
      detailsShow: false,
      // info 对应的 icon
      infoIcons: {
        phone: 'el-icon-start-off',
        email: 'el-icon-message',
        wechat: 'el-icon-start-on',
        qq: 'el-icon-time',
        sina: 'el-icon-view',
        secrecy: 'el-icon-search',
        man: 'el-icon-minus',
        woman: 'el-icon-loading',
        '保密': 'el-icon-loading',
      },
      // 释义
      means: {
        infoName: '名字',
        infoNickname: '昵称',
        infoAvatar: '头像',
        infoSex: '性别',
        infoBirthday: '生日',
        infoPhone: '手机',
        infoEmail: '邮箱',
        infoAddress: '住址',
        infoEnrollTime: '注册时间',
        infoEnrollIp: '注册 IP',
        infoLoginTime: '最近登录时间',
        infoLoginIp: '最近登录 IP',
        infoLoginType: '最近登录方式',
        infoStatus: '账号状态',
        infoFollowCount: '关注人数',
        infoFollowedCount: '被关注次数',
        infoCareCount: '关注作品数',
      },
      // 标签页签换
      tapList: []
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'userModelSelf',
      'userModelTabs',
      'info',
      'authList'
    ]),
    arrowClass() {
      return this.detailsShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  methods: {
    ...mapMutations([
      'setUserModel',
    ]),
    ...mapActions([
      'getUser',
    ]),
  },
  watch: {
    info(val) {
      console.log(val)
      this.Merge(this.profiles, val)
    }
  },
  created() {
    let infoId = this.$route.params.infoId
    let self = (infoId == this.userId)
    // 确定是否为自己的主页
    this.setUserModel({
      self,
    })
    if (self) {
      this.tapList = this.userModelTabs
    } else {
      let tapList = this.DeepCopy(this.userModelTabs).map((tab) => {
        tab.path.infoId = infoId
        return tab
      })
      this.tapList = tapList.splice(1)
    }
    // 获取所有user信息
    this.getUser(infoId)
  }
}
</script>

<style lang='stylus'>
@import '~client/assets/base.styl'
.zh-user-card
  margin: $ruler-base 0
  padding: 0
.zh-user-cover
  width: 100%
  height: 300px
  overflow: hidden
.zh-user-box
  position: relative
.zh-user-avatar
  position: relative
  top: -40px
  margin-left: 40px
  width: 160px
  height: 160px
  border: $ruler-small solid #fff
  border-radius: $border-radius-large
.zh-user-profile
  padding: $ruler-big 0
  & .name
    margin-top: 0
    font-size: $font-size-big
  & .item
    margin: $ruler-large
    font-size: $font-size-small
  & .label
    color: $color-text-gray
    font-size: $font-size-small
  & .icon
    color: $color-text-gray
    font-size: $font-size-small
.zh-user-more
  position: absolute
  right: 0
  bottom: 0
  padding: 0 $ruler-big $ruler-big 0
.zh-user-side
  margin-left: $ruler-big
  margin-top: $ruler-base
</style>
