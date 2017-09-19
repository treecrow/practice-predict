<template>
<div class="flex-lay-main">
  <h1>cssView</h1>
  <h2>背景颜色</h2>
  <ul class="unstyle-list">
    <li class='css-bg-box css-bg-dark'>dark</li>
    <li class='css-bg-box css-bg-theme'>theme</li>
    <li class='css-bg-box css-bg-light'>light</li>
    <li class='css-bg-box css-bg-base'>base</li>
    <li class='css-bg-box css-bg-white'>white</li>
  </ul>
  <h2>字体颜色</h2>
  <ul class="unstyle-list">
    <li class='css-text-black'>black</li>
    <li class='css-text-base'>base</li>
    <li class='css-text-blue'>blue</li>
    <li class='css-text-gray'>gray</li>
    <li class='css-text-red'>red</li>
    <li class='css-text-white'>white</li>
  </ul>
  <h2>图标</h2>
  <ul>
    <li><i class="zh-icon">&#xe610;</i></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'cssView',
  data() {
    return {

    }
  },
}
</script>

<style lang='stylus'>
@import "~client/assets/base.styl";

.css-bg-box
  width: 50px
  height: 50px

.css-bg-dark
  background-color:$color-bg-dark
.css-bg-theme
  background-color:$color-bg-theme
.css-bg-light
  background-color:$color-bg-light
.css-bg-base
  background-color:$color-bg-base
.css-bg-white
  background-color:$color-bg-white

.css-text-black
  color:$color-text-black
.css-text-base
  color:$color-text-base
.css-text-blue
  color:$color-text-blue
.css-text-gray
  color:$color-text-gray
.css-text-red
  color:$color-text-red
.css-text-white
  color:$color-text-white

</style>
