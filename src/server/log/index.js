const log4js = require('log4js');

log4js.configure({
  appenders: {
    'log': {
      type: 'file',
      // 生成的日志文件存放位置
      filename: 'app/log/app.log'
    },
    'out': {
      type: 'stdout'
    }
  },
  categories: {
    // 生成日志 && 打印出来
    default: {
      appenders: ['log', 'out'],
      level: 'all'
    },
    // 生成日志
    log: {
      appenders: ['log'],
      level: 'all'
    },
    // 打印出来
    out: {
      appenders: ['out'],
      level: 'all'
    }
  }
});

module.exports = log4js.getLogger('out')
