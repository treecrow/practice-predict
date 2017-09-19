<template>
<div class="zh-full-screen">
  <!-- 设置区域 -->
  <div class="md-setting">
    <div class="md-setting-item">
      <router-link :to="{ name: 'home'}" class="md-setting-logo">kizun</router-link>
    </div>
    <div class="md-setting-item" @click="lineWrapHandle">换行</div>
    <!-- <div class="md-setting-item">上传图片</div> -->
    <div class="md-setting-item" @click="openFileHandle">本地文件</div>
    <input ref="openFile" type="file" style="display:none;" @change="fileChangeHandle">
    <div class="md-setting-item" @click="fullScreenHandle">全屏</div>
    <div class="md-setting-item" @click="publichHandle">发布</div>
  </div>
  <!-- 主体内容 -->
  <div class="zh-page-main">
    <div class="zh-page-half">
      <textarea ref="CodeMirror">some text ......</textarea>
    </div>
    <div class="zh-page-half">
      <div class="markdown-body" v-html="htmlContent"></div>
    </div>
  </div>
</div>
</template>

<script>
import * as CodeMirror from 'codemirror/lib/codemirror.js'
import * as markdown from 'codemirror/mode/markdown/markdown.js' // model 为 markdown
import * as closebrackets from 'codemirror/addon/edit/closebrackets.js' // 自动闭合括号
import * as continuelist from 'codemirror/addon/edit/continuelist.js' // 列表换行自动添加列表符号
import * as activeLine from 'codemirror/addon/selection/active-line.js' //光标所在行高亮
import * as placeholder from 'codemirror/addon/display/placeholder.js' // placehoder

import * as marked from 'marked/lib/marked.js'

export default {
  name: "mdEditer",
  props: {
    mdText: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      editor: null, // 编辑器对象
      localMdContent: localStorage.getItem('mdContent'), //本地存储的 md 文本
      htmlContent: null, // html形式的内容
    }
  },
  computed: {},
  methods: {
    // 换行
    lineWrapHandle() {
      this.editor.setOption('lineWrapping', this.editor.getOption('lineWrapping') ? false : true)
    },
    // 载入本地文件
    openFileHandle() {
      let openFile = this.$refs.openFile
      if (document.all) {
        openFile.click()
      } else {
        let e = document.createEvent("MouseEvents")
        e.initEvent("click", true, true)
        openFile.dispatchEvent(e)
      }
    },
    // 文件变动处理
    fileChangeHandle() {
      let app = this
      let openFile = this.$refs.openFile
      let fileData = openFile.files[0]
      if (!fileData || !fileData.type || !fileData.type.match("text.*")) {
        console.error('some thing wrong!')
        return
      }
      let reader = new FileReader()
      reader.onerror = () => {
        console.error("Cannot read file, some eroor occuerd.")
        return
      };
      reader.onload = (evt) => {
        app.editor.setValue(evt.target.result)
      };
      reader.readAsText(fileData, "utf-8")
    },
    // 全屏
    fullScreenHandle() {
      if (!this.editor.getOption('fullScreen')) {
        this.editor.setOption('fullScreen', true)
        // 只显示编辑区域
        // ...
        // 浏览器全屏
        const docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          //FireFox
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          //Chrome等
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          //IE11
          elem.msRequestFullscreen();
        }
      } else {
        this.editor.setOption('fullScreen', false)
        // 显示编辑器和展示区域
        // ...
        // 浏览器退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    // 发布
    publichHandle() {
      this.$emit('publich', this.editor.getValue())
    },
    // 保存到markdown内容本地
    saveToLocal() {
      localStorage.setItem('mdContent', this.editor.getValue())
      this.$emit('save')
    }
  },
  mounted() {
    // 获取编辑器对象
    this.editor = CodeMirror.fromTextArea(this.$refs.CodeMirror, {
      mode: "markdown", // 指明编辑器的语言
      theme: 'default', // 设置主题
      lineWrapping: true, // 是否换行
      lineNumbers: true, // 添加行号
      autofocus: true, // 初始化后自动获取焦点
      fullScreen: false, // 全屏模式
      placeholder: 'Code goes here...', //没有内容时候的占位符
      autoCloseBrackets: true, // 自动闭合括号引号等
      styleActiveLine: true, //光标所在行高亮
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList", //markdown列表换行自动添加前导符号
      }
    })
    // 根据相关内容充实编辑器
    if (this.mdText) {
      this.editor.setValue(this.mdText)
      this.htmlContent = marked(this.mdText)
    } else if (this.localMdContent) {
      this.editor.setValue(this.localMdContent)
      this.htmlContent = marked(this.localMdContent)
    }
    let app = this
    this.editor.setOption("extraKeys", {
      // 空格替换tab按键
      Tab(cm) {
        let spaces = Array(cm.getOption("indentUnit") + 1).join(" ")
        cm.replaceSelection(spaces)
      },
      'Ctrl-S' () {
        app.saveToLocal()
      },
      'Cmd-S' () {
        app.saveToLocal()
      }
    })
    // 内容有更新
    this.editor.on('update', () => {
      this.htmlContent = marked(this.editor.getValue())
    })
  }
}
</script>
<style lang="stylus">
@import '~client/assets/base.styl'
@import '~codemirror/lib/codemirror.css'
.md-setting
  height: 40px
  padding: 0 $ruler-big
  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227)
  z-index: 10
.md-setting-item
  display: inline-block
  height: 30px
  margin: 5px 0 5px
  padding: 0 10px
  border-radius: $border-radius-small
  line-height: 30px
  cursor: pointer
  &:hover
    background-color: $color-bg-light
    color: $color-text-white
.md-setting-logo
  font-size: $font-size-big
  color: $color-text-cyan!important
.CodeMirror
  width: 100%
  height: 100%
.markdown-body
  width: 100%
  height: 100%
  padding-left: $ruler-large
  overflow-y: scroll
.CodeMirror-gutters
  left: 0!important
.CodeMirror-gutter-wrapper
  left: -30px!important
</style>
