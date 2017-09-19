// 引入模块
const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

const {
  mkdirsSync,
  getSuffixName,
} = require('./util')

const db = require('../db')

const avatarPath = path.join(__dirname, '../../../static/imgs/avatar')
const coverPath = path.join(__dirname, '../../../static/imgs/cover')

module.exports = async(ctx) => {
  // 验证
  let token = ctx.cookies.get('token')
  let info = token ? await db.getInfoByToken(token) : null
  if (!info) {
    ctx.status = 401
    ctx.body = "请先登录"
    return
  }
  // 声明变量
  let infoId = info.infoId
  let localFilePath, newFileName
  let busboy = new Busboy({
    headers: ctx.req.headers
  });
  // 判断上传图片的类型
  switch(ctx.querystring) {
    case 'avatar':
      localFilePath = avatarPath
      newFileName = `avatar_${infoId}.`
      break;
    case 'cover':
      localFilePath = coverPath
      newFileName = `cover_${infoId}.`
      break;
  }
  // 创建文件夹
  mkdirsSync(localFilePath)

  ctx.body = await new Promise((resolve, reject) => {
    // 返回数据
    let result = {
      success: false,
      filePath: '',
      formData: {}
    }
    //  解析请求文件
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      // 文件命名一会自定义
      let uploadFilePath = path.join(localFilePath, `${newFileName}${getSuffixName(filename)}`)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(uploadFilePath))

      // 文件写入事件结束
      file.on('end', () => {
        result.success = true
        result.filePath = uploadFilePath.split('static')[1]
        resolve(result)
      })
    })
    // 解析表单中其他字段信息
    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      result.formData[fieldname] = inspect(val)
    })
    // 解析结束事件
    busboy.on('finish', function() {
      resolve(result)
    })
    // 解析错误事件
    busboy.on('error', function(err) {
      reject(result)
    })
    ctx.req.pipe(busboy)
  })
}
