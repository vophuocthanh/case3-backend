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

// Backend phía Employee

// Đọc dữ liệu của Employee
app.get('/employee', (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Create Employee
app.post('/employee', (req, res) => {
  const {
    Employee_Number,
    idEmployee,
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
    'INSERT INTO employee (Employee_Number, idEmployee, First_Name, Last_Name, SSN, Pay_Rate, PayRates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    Employee_Number,
    idEmployee,
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
    return res
      .status(201)
      .json({ message: 'Employee đã được tạo', id: data.insertId });
  });
});

// Update Employee
app.put('/employee/:id', (req, res) => {
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
app.delete('/employee/:id', (req, res) => {
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

// Backend phía Pay Rates

// Đọc dữ liệu của Pay Rates
app.get('/pay_rates', (req, res) => {
  const sql = 'SELECT * FROM pay_rates';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Create Pay Rates
app.post('/pay_rates', (req, res) => {
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
      .json({ message: 'Pay Rates đã được tạo', id: data.insertId });
  });
});

// Update Pay Rates

app.put('/pay_rates/:id', (req, res) => {
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

app.delete('/pay_rates/:id', (req, res) => {
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

app.listen(8081, () => {
  console.log('Ứng dụng đang lắng nghe trên cổng 8081');
});
