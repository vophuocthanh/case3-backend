const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard',
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  console.log('sql:', sql);
  db.query(sql, (err, data) => {
    if (err) return res.json(data);
    return res.json(data);
  });
});

app.get('/', (req, res) => {
  return res.json('From backend');
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
