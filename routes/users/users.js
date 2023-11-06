const express = require('express');
const routerUsers = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard',
});

routerUsers.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Đọc một người dùng dựa trên ID (Read by ID)
routerUsers.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE User_ID = ?';
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    return res.json(data[0]);
  });
});

// Tạo một người dùng mới (Create)
routerUsers.post('/users', (req, res) => {
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
routerUsers.put('/:id', (req, res) => {
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
routerUsers.delete('/:id', (req, res) => {
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
module.exports.routerUsers = routerUsers;
