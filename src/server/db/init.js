const path = require('path')
const fs = require('fs')
const query = require('./query')

async function initData() {
  const sqlArr = fs.readFileSync(path.join(__dirname, './init.sql'), 'utf-8').split(';')
  for (let [i, sql] of sqlArr.entries()) {
    if (sql.trim()) {
      let result = await query(sql)
      console.log(`执行第${i+1}条sql语句的结果`, result)
    }
  }
}

initData()
