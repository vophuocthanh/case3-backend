require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.API_LOCALHOST,
  user: process.env.API_SQL_USER,
  password: process.env.API_SQL_PASSWORD,
  database: process.env.API_SQL_DATABASE,
});

module.exports.db = db;
