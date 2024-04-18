const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sai@163",
  database: "login_crud"
});

module.exports = db;
