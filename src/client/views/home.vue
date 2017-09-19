<template>
<div id="home" class="zh-home">
  <el-card v-for="(msg, index) in msgHomeList" :key="index" class="msg-card">
    <template v-if="msg.msgType === '3'">a发表作品B(opus)</template>
    <template v-else-if="msg.msgType === '5'">a关注b的作品B(care)</template>
    <template v-else-if="msg.msgType === '7'">a评判了b的作品B(judge)</template>
    <template v-else-if="msg.msgType === '8'">a评判了b的作品B(judge)</template>
    <template v-else-if="msg.msgType === '10'">a评论了b的作品B(comment)</template>
    <template v-else-if="msg.msgType === '11'">a评论了b的作品B(comment)</template>
    <p>
      {{ msg }}
    </p>
  </el-card>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'homeView',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'msgHomeList'
    ])
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([
      'getMsgHomeList',
    ]),
  },
  created() {
    this.getMsgHomeList(this.userId)
  }
}
</script>

<style lang='stylus'>
// .zh-home
//   & .msg-card
</style>
