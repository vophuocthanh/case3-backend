const express = require('express');
const routerLogin = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard',
});

routerLogin.post('/', (req, res) => {
  const sql = 'SELECT * FROM login WHERE Email = ? AND Password = ?';
  db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
    if (err) return res.json('Error');
    if (data.length > 0) {
      return res.json('Login success');
    } else {
      return res.json('No record');
    }
  });
});

module.exports.routerLogin = routerLogin;
