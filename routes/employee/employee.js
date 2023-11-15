const express = require('express');
const routerEmployee = express.Router();
const { db } = require('../../modules/server-database');

routerEmployee.get('/', (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

routerEmployee.get('/:id', (req, res) => {
  const EmployeeNumber = req.params.id;
  const sql = 'SELECT * FROM employee WHERE Employee_Number = ?';
  db.query(sql, [EmployeeNumber], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy Employee' });
    }
    return res.json(data[0]);
  });
});

routerEmployee.post('/', (req, res) => {
  const {
    idEmployee,
    Employee_Number,
    First_Name,
    Last_Name,
    SSN,
    Pay_Rate,
    PayRates_id,
    Vacation_Days,
    Paid_To_Date,
    Paid_Last_Year,
  } = req.body;
  const sql =
    'INSERT INTO employee (idEmployee, Employee_Number, First_Name, Last_Name, SSN, Pay_Rate, PayRates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    idEmployee,
    Employee_Number,
    First_Name,
    Last_Name,
    SSN,
    Pay_Rate,
    PayRates_id,
    Vacation_Days,
    Paid_To_Date,
    Paid_Last_Year,
  ];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({
      message: 'Employee đã được tạo',
      idEmployee: data.insertId,
    });
  });
});

routerEmployee.put('/:id', (req, res) => {
  const IdEmployee = req.params.id;
  const updatedEmployee = req.body;
  const sql = 'UPDATE employee SET ? WHERE Employee_Number = ?';
  db.query(sql, [updatedEmployee, IdEmployee], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy employee để cập nhật' });
    }
    return res.json({ message: 'Employee đã được cập nhật', id: IdEmployee });
  });
});

routerEmployee.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM employee WHERE Employee_Number = ?';
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy employee để xóa' });
    }
    return res.json({ message: 'Employee đã được xóa', id: userId });
  });
});

module.exports.routerEmployee = routerEmployee;
