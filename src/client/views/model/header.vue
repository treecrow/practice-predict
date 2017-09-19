<template>
<div id="header">
  <el-menu mode="horizontal" theme="dark" :default-active="activeIndex">
    <el-row class="zh-wrapper">
      <el-col :span="2">
        <div class="zh-header-item">
          <router-link :to="{ name: 'home'}" class="zh-header-logo">kizun</router-link>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="zh-header-item">
          <el-input placeholder="请输入搜索内容" v-model="searchContent" :autofocus="true">
            <el-button slot="append" icon="search" @click.native="handleSearch"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <el-menu-item v-for="(item, index) in navList" :key="index" :index="item.text">
          <router-link :to="item.path">{{ item.text }}</router-link>
        </el-menu-item>
      </el-col>
      <el-col :span="6">
        <el-submenu index="user" v-if="userId > 0">
          <template slot="title">
            <span class="zh-header-avtar"><img :src="info.infoAvatar | defaultAvatar" /> user</span>
          </template>
          <el-menu-item index="我的主页">
            <router-link to="/user/1"><i class="el-icon-menu"></i> 我的主页</router-link>
          </el-menu-item>
          <el-menu-item index="退出" @click.native="userLogout">
            <i class="el-icon-close"></i> 退出
          </el-menu-item>
        </el-submenu>
        <template v-else>
          <el-menu-item v-for="(item, index) in loginList" :key="index" :index="item.text" @click='handleLogin(item.text)'>
            {{ item.text }}
          </el-menu-item>
        </template>
      </el-col>
    </el-row>
  </el-menu>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'zhHeader',
  data() {
    return {
      activeIndex: '/',
      navList: [{
          path: {
            name: 'home'
          },
          text: '首页'
        },
        {
          path: {
            name: 'find'
          },
          text: '发现'
        },
        {
          path: {
            name: 'create'
          },
          text: '创作'
        },
      ],
      loginList: [{
        text: '注册'
      }, {
        text: '登录'
      }],
      searchContent: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'info',
    ])
  },
  methods: {
    ...mapMutations([
      'setLoginModel'
    ]),
    ...mapActions([
      'userLogout'
    ]),
    handleSearch() {
      console.log('handleSearch')
    },
    handleLogin(loginType) {
      if (loginType === this.loginList[0].text) {
        this.setLoginModel({
          show: true,
          type: 'signup'
        })
      } else {
        this.setLoginModel({
          show: true,
          type: 'signin'
        })
      }
    }
  }
}
</script>

<style lang='stylus'>
@import '~client/assets/base.styl'
.zh-header-logo
  font-size: $font-size-big
  color: $color-text-white!important

.zh-header-item
  color: $color-text-white
  height:60px
  line-height: 60px

.zh-header-avtar
  font-size: $font-size-medium
.zh-header-avtar img
  width: 30px
  height: 30px
  border-radius: 3px
  vertical-align: middle
</style>
