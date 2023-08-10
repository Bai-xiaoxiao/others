const mysql = require('mysql2')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: '12345678',
});

module.exports = db