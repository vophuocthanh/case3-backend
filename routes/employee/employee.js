const express = require('express');
const routerEmployee = express.Router();
const { db } = require('../../modules/server-database');

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Quản lý employee API
 */

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

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Lấy ra tất cả các employee
 *     responses:
 *       200:
 *         description: Danh sách employee
 *       500:
 *         description: L.Xr
 *       404:
 *         description: Không tìm thấy employee
 *       400:
 *         description: Lỗi bộ
 */

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Lấy employee theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID employee
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thống tin employee
 *       404:
 *         description: Không tìm thấy employee
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Tạo employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEmployee:
 *                 type: integer
 *                 description: ID employee
 *               Employee_Number:
 *                 type: integer
 *                 description: Employee_Number
 *               First_Name:
 *                 type: string
 *                 description: First_Name
 *               Last_Name:
 *                 type: string
 *                 description: Last_Name
 *               SSN:
 *                 type: integer
 *                 description: SSN
 *               Pay_Rate:
 *                 type: integer
 *                 description: Pay_Rate
 *               PayRates_id:
 *                 type: integer
 *                 description: PayRates_id
 *               Vacation_Days:
 *                 type: integer
 *                 description: Vacation_Days
 *               Paid_To_Date:
 *                 type: integer
 *                 description: Paid_To_Date
 *               Paid_Last_Year:
 *                 type: integer
 *                 description: Paid_Last_Year
 *     responses:
 *       201:
 *         description: Tạo employee
 *       500:
 *         description: Lỗi server
 *       400:
 *         description: Lỗi bộ
 */

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Cập nhật employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID employee
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *             properties:
 *               idEmployee:
 *                 type: integer
 *                 description: ID employee
 *               Employee_Number:
 *                 type: integer
 *                 description: Employee_Number
 *               First_Name:
 *                 type: string
 *                 description: First_Name
 *               Last_Name:
 *                 type: string
 *                 description: Last_Name
 *               SSN:
 *                 type: integer
 *                 description: SSN
 *               Pay_Rate:
 *                 type: integer
 *                 description: Pay_Rate
 *               PayRates_id:
 *                 type: integer
 *                 description: PayRates_id
 *               Vacation_Days:
 *                 type: integer
 *                 description: Vacation_Days
 *               Paid_To_Date:
 *                 type: integer
 *                 description: Paid_To_Date
 *               Paid_Last_Year:
 *                 type: integer
 *                 description: Paid_Last_Year
 *     responses:
 *       200:
 *         description: Employee được cập nhật
 *       404:
 *         description: Không tìm thấy employee để cập nhật
 */

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Xóa employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID employee
 *         schema:
 *           type: integer
 */

module.exports.routerEmployee = routerEmployee;
