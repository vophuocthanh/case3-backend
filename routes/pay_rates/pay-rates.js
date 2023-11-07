const express = require('express');
const routerPayRates = express.Router();
const mysql = require('mysql');
const { db } = require('../../modules/server-database');

// Backend phía Pay Rates

// Đọc dữ liệu của Pay Rates
routerPayRates.get('/', (req, res) => {
  const sql = 'SELECT * FROM pay_rates';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Create Pay Rates
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

// Update Pay Rates

routerPayRates.put('/:id', (req, res) => {
  const IdEmployee = req.params.id;
  const updatedEmployee = req.body;
  const sql = 'UPDATE pay_rates SET ? WHERE idPay_Rates = ?';
  db.query(sql, [updatedEmployee, IdEmployee], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy Pay Rates để cập nhật' });
    }
    return res.json({ message: 'Pay Rates đã được cập nhật', id: IdEmployee });
  });
});

// Delete Pay Rates

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

module.exports.routerPayRates = routerPayRates;
