const express = require('express');
const routerUsers = express.Router();
const { db } = require('../../modules/server-database');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng API
 */

routerUsers.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});
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

routerUsers.post('/', (req, res) => {
  const { User_ID, User_Name, Email, Password, Active } = req.body;
  const sql =
    'INSERT INTO users (User_ID, User_Name, Email, Password, Active) VALUES (?, ?, ?, ?, ?)';
  const values = [User_ID, User_Name, Email, Password, Active];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(201)
      .json({ message: 'Người dùng đã được tạo', User_ID: data.insertId });
  });
});

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy ra tất cả các users
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *       500:
 *         description: L.Xr
 *       404:
 *         description: Không tìm thấy người dùng
 *       400:
 *         description: Yêu cầu không hợp lệ.
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *             properties:
 *               User_ID:
 *                 type: integer
 *               User_Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Active:
 *                 type: string
 *     responses:
 *       201:
 *         description: Người dùng được tạo
 *       500:
 *         description: Lỗi server
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Cập nhật người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID người dùng
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *             properties:
 *               User_ID:
 *                 type: integer
 *               User_Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Active:
 *                 type: string
 *     responses:
 *       200:
 *         description: Người dùng được cập nhật
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID người dùng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Người dùng được xóa
 *       404:
 *         description: Không tìm thường người dùng
 *       500:
 *         description: Lỗi server
 */

module.exports.routerUsers = routerUsers;
