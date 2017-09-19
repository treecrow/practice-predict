const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'msl88259875',
  database: 'kizunDb'
})

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log('query error-------------------')
            console.log('query sql:',sql)
            console.log('query values:',values)
            console.log('query error:', err)
            console.log('------------------------------')
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = query
