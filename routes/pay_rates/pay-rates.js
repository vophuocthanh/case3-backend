const express = require('express');
const routerPayRates = express.Router();
const { db } = require('../../modules/server-database');

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

module.exports.routerPayRates = routerPayRates;
