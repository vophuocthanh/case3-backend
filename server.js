const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Đọc dữ liệu từ cơ sở dữ liệu (Read all)
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Đọc một người dùng dựa trên ID (Read by ID)
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    return res.json(data[0]);
  });
});

// Tạo một người dùng mới (Create)
app.post('/users', (req, res) => {
  const { User_Name, Email, Password, Active } = req.body;
  const sql =
    'INSERT INTO users (User_Name, Email, Password, Active) VALUES (?, ?, ?, ?)';
  const values = [User_Name, Email, Password, Active];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(201)
      .json({ message: 'Người dùng đã được tạo', id: data.insertId });
  });
});

// Cập nhật thông tin người dùng (Update)
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const sql = 'UPDATE users SET ? WHERE User_id = ?';
  db.query(sql, [updatedUser, userId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy người dùng để cập nhật' });
    }
    return res.json({ message: 'Người dùng đã được cập nhật', id: userId });
  });
});

// Xóa người dùng (Delete)
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE User_id = ?';
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy người dùng để xóa' });
    }
    return res.json({ message: 'Người dùng đã được xóa', id: userId });
  });
});
// Đăng nhập (Login)
app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE Email = ? AND Password = ?';
  // const values = [req.body.Email, req.body.Password];
  db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
    if (err) return res.json('Error');
    if (data.length > 0) {
      return res.json('Login success');
    } else {
      return res.json('No record');
    }
  });
});

app.listen(8081, () => {
  console.log('Ứng dụng đang lắng nghe trên cổng 8081');
});
