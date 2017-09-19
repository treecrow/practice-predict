const userFields = require('./userFields')
const followFields = require('./followFields')
const opusFields = require('./opusFields')
const judgeFields = require('./judgeFields')
const commentFields = require('./commentFields')
const careFields = require('./careFields')
const msgFields = require('./msgFields')

module.exports = Object.assign({},
  userFields,
  followFields,
  opusFields,
  judgeFields,
  commentFields,
  careFields,
  msgFields
)
