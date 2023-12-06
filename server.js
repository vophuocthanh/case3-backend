const express = require('express');
const sql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const config = {
  driver: 'msnodesqlv8',
  server: 'DESKTOP-5C3BH5N\\SQLEXPRESS01',
  database: 'HR',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const db = sql.connect(config, function (err) {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/Personal', async function (req, res) {
  let request = db.request();
  const result = await request.query('SELECT * FROM Personal');
  res.json({ msg: 'Success', data: result });
});

app.get('/Personal/:id', async function (req, res) {
  let request = db.request();
  const result = await request
    .input('id', sql.Int, req.params.id)
    .query('SELECT * FROM Personal WHERE Employee_ID = @id');
  res.json({ msg: 'Success', data: result });
});

app.post('/Personal', async function (req, res) {
  let request = db.request();
  const result = await request
    .input('Employee_ID', sql.Int, req.body.Employee_ID)
    .input('First_Name', sql.VarChar(50), req.body.First_Name)
    .input('Last_Name', sql.VarChar(50), req.body.Last_Name)
    .input('Middle_Initial', sql.VarChar(50), req.body.Middle_Initial)
    .input('Address1', sql.VarChar(50), req.body.Address1)
    .input('Address2', sql.VarChar(50), req.body.Address2)
    .input('City', sql.VarChar(50), req.body.City)
    .input('State', sql.VarChar(50), req.body.State)
    .input('Zip', sql.VarChar(50), req.body.Zip)
    .input('Email', sql.VarChar(50), req.body.Email)
    .input('Phone_Number', sql.VarChar(50), req.body.Phone_Number)
    .input(
      'Social_Security_Number',
      sql.VarChar(50),
      req.body.Social_Security_Number
    )
    .input('Drivers_License', sql.VarChar(50), req.body.Drivers_License)
    .input('Marital_Status', sql.VarChar(50), req.body.Marital_Status)
    .input('Gender', sql.VarChar(50), req.body.Gender)
    .input('Shareholder_Status', sql.VarChar(50), req.body.Shareholder_Status)
    .input('Benefit_Plans', sql.VarChar(50), req.body.Benefit_Plans)
    .input('Ethnicity', sql.VarChar(50), req.body.Ethnicity)
    .query(
      'INSERT INTO Personal VALUES (@Employee_ID, @First_Name, @Last_Name, @Middle_Initial, @Address1, @Address2, @City, @State, @Zip, @Email, @Phone_Number, @Social_Security_Number, @Drivers_License, @Marital_Status, @Gender, @Shareholder_Status, @Benefit_Plans, @Ethnicity)'
    );
  res.json({ msg: 'Success', data: result });
});

app.put('/Personal/:id', async function (req, res) {
  try {
    const request = db.request();
    const result = await request
      .input('id', sql.Int, req.params.id)
      .input('Employee_ID', sql.Int, req.body.Employee_ID)
      .input('First_Name', sql.VarChar(50), req.body.First_Name)
      .input('Last_Name', sql.VarChar(50), req.body.Last_Name)
      .input('Middle_Initial', sql.VarChar(50), req.body.Middle_Initial)
      .input('Address1', sql.VarChar(50), req.body.Address1)
      .input('Address2', sql.VarChar(50), req.body.Address2)
      .input('City', sql.VarChar(50), req.body.City)
      .input('State', sql.VarChar(50), req.body.State)
      .input('Zip', sql.VarChar(50), req.body.Zip)
      .input('Email', sql.VarChar(50), req.body.Email)
      .input('Phone_Number', sql.VarChar(50), req.body.Phone_Number)
      .input(
        'Social_Security_Number',
        sql.VarChar(50),
        req.body.Social_Security_Number
      )
      .input('Drivers_License', sql.VarChar(50), req.body.Drivers_License)
      .input('Marital_Status', sql.VarChar(50), req.body.Marital_Status)
      .input('Gender', sql.VarChar(50), req.body.Gender)
      .input('Shareholder_Status', sql.VarChar(50), req.body.Shareholder_Status)
      .input('Benefit_Plans', sql.VarChar(50), req.body.Benefit_Plans)
      .input('Ethnicity', sql.VarChar(50), req.body.Ethnicity)
      .query(
        'UPDATE Personal ' +
          'SET ' +
          'Employee_ID = @Employee_ID, ' +
          'First_Name = @First_Name, ' +
          'Last_Name = @Last_Name, ' +
          'Middle_Initial = @Middle_Initial, ' +
          'Address1 = @Address1, ' +
          'Address2 = @Address2, ' +
          'City = @City, ' +
          'State = @State, ' +
          'Zip = @Zip, ' +
          'Email = @Email, ' +
          'Phone_Number = @Phone_Number, ' +
          'Social_Security_Number = @Social_Security_Number, ' +
          'Drivers_License = @Drivers_License, ' +
          'Marital_Status = @Marital_Status, ' +
          'Gender = @Gender, ' +
          'Shareholder_Status = @Shareholder_Status, ' +
          'Benefit_Plans = @Benefit_Plans, ' +
          'Ethnicity = @Ethnicity ' +
          'WHERE Employee_ID = @Employee_ID'
      );
    res.status(200).send('Record updated successfully');
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/Personal/:id', async function (req, res) {
  try {
    const request = db.request();
    const result = await request
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Personal WHERE Employee_ID = @id');
    res.status(200).send('Record deleted successfully');
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/Benefit_Plans', async (req, res) => {
//   const sql = 'SELECT * FROM Benefit_Plans';
//   db.query(sql, (err, data) => {
//     if (err) return res.status(500).json({ error: err.message });
//     return res.json(data);
//   });
// });

// app.get('/Benefit_Plans/:id', async (req, res) => {
//   let request = db.request();
//   const result = await request
//     .input('id', sql.Int, req.params.id)
//     .query('SELECT * FROM Benefit_Plans WHERE Benefit_Plan_ID = @id');
//   res.json({ msg: 'Success', data: result });
// });

// app.post('/Benefit_Plans', async function (req, res) {
//   let request = db.request();

//   // Kiểm tra xem ID đã tồn tại hay không
//   const existingRecord = await request
//     .input('Benefit_Plan_ID', sql.VarChar(50), req.body.Benefit_Plan_ID)
//     .query(
//       'SELECT * FROM Benefit_Plans WHERE Benefit_Plan_ID = @Benefit_Plan_ID'
//     );

//   if (existingRecord.recordset.length > 0) {
//     const updateResult = await request
//       .input('Plan_Name', sql.VarChar(50), req.body.Plan_Name)
//       .input('Deductable', sql.VarChar(50), req.body.Deductable)
//       .input('Percentage_CoPay', sql.VarChar(50), req.body.Percentage_CoPay)
//       .input('Benefit_Plan_ID', sql.VarChar(50), req.body.Benefit_Plan_ID)
//       .query(
//         'UPDATE Benefit_Plans SET Plan_Name = @Plan_Name, Deductable = @Deductable, Percentage_CoPay = @Percentage_CoPay WHERE Benefit_Plan_ID = @Benefit_Plan_ID'
//       );

//     res.json({ msg: 'Record updated', data: updateResult });
//   } else {
//     const insertResult = await request
//       .input('Plan_Name', sql.VarChar(50), req.body.Plan_Name)
//       .input('Deductable', sql.VarChar(50), req.body.Deductable)
//       .input('Percentage_CoPay', sql.VarChar(50), req.body.Percentage_CoPay)
//       .query(
//         'INSERT INTO Benefit_Plans (Plan_Name, Deductable, Percentage_CoPay) VALUES (@Plan_Name, @Deductable, @Percentage_CoPay)'
//       );

//     res.json({ msg: 'Record inserted', data: insertResult });
//   }
// });

// app.put('/Benefit_Plans/:id', async function (req, res) {
//   let request = db.request();
//   const result = await request
//     .input('id', sql.Int, req.params.id)
//     .input('Plan_Name', sql.VarChar(50), req.body.Plan_Name)
//     .input('Deductable', sql.VarChar(50), req.body.Deductable)
//     .input('Percentage_CoPay', sql.VarChar(50), req.body.Percentage_CoPay)
//     .query(
//       'UPDATE Benefit_Plans ' +
//         'SET ' +
//         'Plan_Name = @Plan_Name, ' +
//         'Deductable = @Deductable, ' +
//         'Percentage_CoPay = @Percentage_CoPay ' +
//         'WHERE Benefit_Plan_ID = @id'
//     );
//   res.json({ msg: 'Success', data: result });
// });

// app.delete('/Benefit_Plans/:id', async function (req, res) {
//   let request = db.request();
//   const result = await request
//     .input('id', sql.Int, req.params.id)
//     .query('DELETE FROM Benefit_Plans WHERE Benefit_Plan_ID = @id');
//   res.json({ msg: 'Success', data: result });
// });

// app.get('/Job_History', async (req, res) => {
//   const sql = 'SELECT * FROM Job_History';
//   db.query(sql, (err, data) => {
//     if (err) return res.status(500).json({ error: err.message });
//     return res.json(data);
//   });
// });

// app.get('/Job_History/:id', async (req, res) => {
//   let request = db.request();
//   const result = await request
//     .input('id', sql.Int, req.params.id)
//     .query('SELECT * FROM Job_History WHERE ID = @id');
//   res.json({ msg: 'Success', data: result });
// });

// app.post('/Job_History', async function (req, res) {
//   let request = db.request();
//   const result = await request
//     .input('ID', sql.Int, req.body.ID)
//     .input('Employee_ID', sql.Int, req.body.Employee_ID)
//     .input('Department', sql.VarChar(50), req.body.Department)
//     .input('Division', sql.VarChar(50), req.body.Division)
//     .input('Start_Date', sql.VarChar(50), req.body.Start_Date)
//     .input('End_Date', sql.VarChar(50), req.body.End_Date)
//     .input('Job_Title', sql.VarChar(50), req.body.Job_Title)
//     .input('Supervisor', sql.VarChar(50), req.body.Supervisor)
//     .input('Job_Category', sql.VarChar(50), req.body.Job_Category)
//     .input('Location', sql.VarChar(50), req.body.Location)
//     .input('Department_Code', sql.VarChar(50), req.body.Department_Code) // Assuming 'Departmen_Code' was a typo
//     .input('Salary_Type', sql.VarChar(50), req.body.Salary_Type)
//     .input('Pay_Period', sql.VarChar(50), req.body.Pay_Period)
//     .input('Hours_Per_Week', sql.VarChar(50), req.body.Hours_per_Week) // Updated column name
//     .input('Hazardous_Training', sql.VarChar(50), req.body.Hazardous_Training)
//     .query(
//       'INSERT INTO Personal (ID, Employee_ID, Department, Division, Start_Date, End_Date, Job_Title, Supervisor, Job_Category, Location, Department_Code, Salary_Type, Pay_Period, Hours_Per_Week, Hazardous_Training) VALUES (@ID, @Employee_ID, @Department, @Division, @Start_Date, @End_Date, @Job_Title, @Supervisor, @Job_Category, @Location, @Department_Code, @Salary_Type, @Pay_Period, @Hours_Per_Week, @Hazardous_Training)'
//     );
//   res.json({ msg: 'Success', data: result });
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
