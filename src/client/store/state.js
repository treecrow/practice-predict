import {
  Cookies
} from 'client/config/util'

let token = Cookies.get('token')
let userId = token ? Number(token.split('#')[0]) : 0

export default {
  // user
  userId, // 用户 id
  user: {
    info: { // 用户个人信息
      infoName: '',
      infoNickname: '',
      infoAvatar: '',
      infoSex: '',
      infoBirthday: '',
      infoPhone: '',
      infoEmail: '',
      infoAddress: '',
      infoEnrollTime: '',
      infoEnrollIp: '',
      infoLoginTime: '',
      infoLoginIp: '',
      infoLoginType: '',
      infoStatus: '',
      infoFollowCount: '',
      infoFollowedCount: '',
      infoCareCount: '',
    },
    authList: [], // 用户账号信息
    followList: [], // 用户关注用户列表
    followedList: [], // 用户被关注列表
    opusList: [], // 用户的作品列表
    judgeList: [], // 用户的评判列表
    careList: [], // 用户关注作品列表
    msgHomeList: [], // 用户主页消息列表
    msgShowList: [], // 用户展示消息列表
  },
  // 作品
  predict: {
    // 作品自身信息
    opus: {
      opusId: '',
      opusInfo: {
        infoId: 0
      },
      opusTitle: '',
      opusSummary: '',
      opusText: '',
      opusCreateTime: '',
      opusAlterTime: '',
      opusStatus: '',
      opusCareCount: '',
      opusJudgeCount: '',
      opusJudgeIndex: '',
      opusCommentCount: '',
    },
    opusRelate: '', // 用户与作品关联
    judgeList: [], // 作平评判列表
    commentList: [], // 作品评论列表
    careList: [],
  },
  // model
  loginModel: {
    show: false, //是否显示 loginModel
    type: '', // loginModel 类型 ['find','add','signup','signin']
    fail: false, // 是否显示登录失败提示
    sending: false, // 是否正在生成验证码
    canSend: true, // 是否可以获取验证码
    codeText: '获取验证码', // 获取验证码按钮文本内容
  },
  sureModel: {
    show: false, //是否显示 sureModel
    content: '确定要XXX吗？', //sureModel 的文本内容
    val: false, // sureModel 的操作结果，是取消了还是确定了
    action: '', // sureModel 确定后执行的操作
    params: [], // sureModel 确定后执行操作的方法对应的参数
  },
  editModel: {
    create: true, // 新的 opus
  },
  userModel: {
    self: false, // 是否是自己的主页
    // 主页子页面导航(通用)
    tabs: [{
        path: {
          name: 'message',
          infoId: userId
        },
        text: '消息'
      }, {
        path: {
          name: 'work',
          infoId: userId
        },
        text: '作品'
      },
      {
        path: {
          name: 'care',
          infoId: userId
        },
        text: '关注'
      },
      {
        path: {
          name: 'follow',
          infoId: userId
        },
        text: '用户'
      },
      {
        path: {
          name: 'followed',
          infoId: userId
        },
        text: '粉丝'
      },
      {
        path: {
          name: 'judge',
          infoId: userId
        },
        text: '评判'
      }
    ],
  },
}
