const express = require('express');
const routerPayRates = express.Router();
const { db } = require('../../modules/server-database');

/**
 * @swagger
 * tags:
 *   name: PayRates
 *   description: Quản lý Pay Rates API
 */

routerPayRates.get('/', (req, res) => {
  const sql = 'SELECT * FROM pay_rates';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

routerPayRates.get('/:id', (req, res) => {
  const idPayRates = req.params.id;
  const sql = 'SELECT * FROM pay_rates WHERE idPay_Rates = ?';
  db.query(sql, [idPayRates], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy Pay Rates' });
    }
    return res.json(data[0]);
  });
});

routerPayRates.post('/', (req, res) => {
  const {
    idPay_Rates,
    Pay_Rate_Name,
    Value,
    Tax_Percentage,
    Pay_Type,
    Pay_Amount,
    PT_Level_C,
  } = req.body;
  const sql =
    'INSERT INTO pay_rates (idPay_Rates, Pay_Rate_Name, Value, Tax_Percentage, Pay_Type, Pay_Amount, 	PT_Level_C) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
    idPay_Rates,
    Pay_Rate_Name,
    Value,
    Tax_Percentage,
    Pay_Type,
    Pay_Amount,
    PT_Level_C,
  ];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(201)
      .json({ message: 'Pay Rates đã được tạo', idPay_Rates: data.insertId });
  });
});

routerPayRates.put('/:id', (req, res) => {
  const idPayRates = req.params.id;
  const updatedPayRates = req.body;
  const sql = 'UPDATE pay_rates SET ? WHERE idPay_Rates = ?';
  db.query(sql, [updatedPayRates, idPayRates], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy Pay Rates để cập nhật' });
    }
    return res.json({ message: 'Pay Rates đã được cập nhật', id: idPayRates });
  });
});

routerPayRates.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM pay_rates WHERE idPay_Rates = ?';
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy Pay Rates để xóa' });
    }
    return res.json({ message: 'Pay Rates đã được xóa', id: userId });
  });
});

/**
 * @swagger
 * /pay_rates:
 *   get:
 *     summary: Lấy ra tất cả các Pay Rates
 *     responses:
 *       200:
 *         description: Danh sách Pay Rates
 *       500:
 *         description: Lỗi server
 *       404:
 *         description: Không tìm thấy Pay Rates
 *       400:
 *         description: Yêu cầu không hợp lệ.
 */

/**
 * @swagger
 * /pay_rates/{id}:
 *   get:
 *     summary: Lỗi Pay Rates theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Pay Rates
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thống tin Pay Rates
 *       404:
 *         description: Không tìm thấy Pay Rates
 *       500:
 *         description: Lối server
 */

/**
 * @swagger
 * /pay_rates:
 *   post:
 *     summary: Tạo Pay Rates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPay_Rates:
 *                 type: integer
 *               Pay_Rate_Name:
 *                 type: string
 *               Value:
 *                 type: integer
 *               Tax_Percentage:
 *                 type: integer
 *               Pay_Type:
 *                 type: string
 *               Pay_Amount:
 *                 type: integer
 *               PT_Level_C:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tạo Pay Rates
 *       500:
 *         description: Lỗi server
 *       400:
 *         description: Yêu cầu không hợp lệ.
 *       404:
 *         description: Không tìm thấy
 *       409:
 *         description: Lỗi
 */

/**
 * @swagger
 * /pay_rates/{id}:
 *   put:
 *     summary: Cập nhật Pay Rates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Pay Rates
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPay_Rates:
 *                 type: integer
 *               Pay_Rate_Name:
 *                 type: string
 *               Value:
 *                 type: integer
 *               Tax_Percentage:
 *                 type: integer
 *               Pay_Type:
 *                 type: string
 *               Pay_Amount:
 *                 type: integer
 *               PT_Level_C:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật Pay Rates
 *       500:
 *         description: Lỗi server
 *       400:
 *         description: Yêu cầu không hợp lệ.
 *       404:
 *         description: Không tìm thấy Pay Rates
 */

/**
 * @swagger
 * /pay_rates/{id}:
 *   delete:
 *     summary: Xóa Pay Rates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Pay Rates
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pay Rates được xóa
 *       404:
 *         description: Không tìm thấy Pay Rates không xóa
 *       500:
 *         description: Lỗi server
 */

module.exports.routerPayRates = routerPayRates;
