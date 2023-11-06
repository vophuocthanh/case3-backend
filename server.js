const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/router.js'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Kết nối MySQL thành công');
});

app.listen(8081, () => {
  console.log('Ứng dụng đang lắng nghe trên cổng 8081');
});
