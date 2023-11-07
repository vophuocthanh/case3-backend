const express = require('express');
const routerEmployee = express.Router();
const { db } = require('../../modules/server-database');

// Backend phía Employee

// Đọc dữ liệu của Employee
routerEmployee.get('/', (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Create Employee
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

// Update Employee
routerEmployee.put('/:id', (req, res) => {
  const IdEmployee = req.params.id;
  const updatedEmployee = req.body;
  const sql = 'UPDATE employee SET ? WHERE idEmployee = ?';
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

// Delete Employee
routerEmployee.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM employee WHERE idEmployee = ?';
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
