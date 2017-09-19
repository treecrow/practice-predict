<template >
<div id="app">

  <!-- 顶部导航栏 -->
  <zh-header></zh-header>

  <!-- 内容切换 -->
  <transition name="el-zoom-in-center" mode='out-in'>
    <keep-alive>
      <router-view class="zh-wrapper"></router-view>
    </keep-alive>
  </transition>

  <!-- 注册登录对话框 -->
  <zh-login></zh-login>

  <!-- 确认／取消对话框 -->
  <zh-sure></zh-sure>

</div>
</template>

<script>
import zhHeader from 'client/views/model/header'
import zhLogin from 'client/views/model/login'
import zhSure from 'client/views/model/sure'
export default {
  name: 'AppView',
  data() {
    return {}
  },
  components: {
    zhHeader,
    zhLogin,
    zhSure,
  }
}
</script>

<style lang="stylus">
@import '~client/assets/base.styl'
@import '~normalize.css'
@import '~element-ui/lib/theme-default/index.css'
@import '~client/assets/style/github-style.css'

*, :after, :before
  box-sizing border-box

a
  text-decoration none

body
  background-color $color-bg-base
  color $color-text-base
  position: relative

.unstyle-list
  list-style none
  padding 0
  margin 0

.zh-wrapper
  margin: 0 auto
  width: 1200px

.zh-full-screen
  position: absolute
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  overflow hidden
  display flex
  flex-direction column
  background-color $color-bg-white

.zh-page-main
  display: flex
  flex: 1

.zh-page-half
  display: flex
  flex: 0 0 50%
  width: 100%
  height: 100%
  overflow:hidden

.zh-row:not(:last-child)
  margin-bottom: $ruler-base

.zh-tip
  color: $color-text-red
  font-size: $font-size-mini

.zh-detail
  font-size: $font-size-mini
  color: $color-text-gray

.zh-textarea
  width: 100%
  border-radius: $border-radius-small
  border: 1px solid #bfcbd9
  min-height: 100px
  &:focus
    outline: 0;
    border-color: #20a0ff

</style>
