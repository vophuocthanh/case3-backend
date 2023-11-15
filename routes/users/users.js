const express = require('express');
const routerUsers = express.Router();
const { db } = require('../../modules/server-database');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         User_ID:
 *           type: integer
 *           description: ID người dùng
 *           example: 1
 *         User_Name:
 *           type: string
 *           description: Tên người dùng
 *           example: John
 *         Email:
 *           type: string
 *           format: email
 *           description: Địa chỉ email của người dùng
 *           example: john@example.com
 *         Password:
 *           type: string
 *           description: Mật khẩu của người dùng (hashed)
 *           example: '$2b$10$U0.y5RY4DNLOIguz9/IKlOf8sDa1SrlvcuR85lDrogepmCDLdHozi'
 *         Role:
 *           type: string
 *           description: Vai trò của người dùng
 *           example: admin
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

routerUsers.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});
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
module.exports.routerUsers = routerUsers;
