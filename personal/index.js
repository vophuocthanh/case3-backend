const express = require('express');
const sql = require('mssql/msnodesqlv8');
const routerPersonal = express.Router();

const config = {
  driver: 'msnodesqlv8',
  server: 'DESKTOP-5C3BH5N\\SQLEXPRESS01',
  database: 'HR',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const app = express();
const port = 3000; // You can choose any available port

// Connect to the SQL Server database
sql.connect(config, function (err) {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

// Define a route for the SELECT operation
app.get('/personal', (req, res) => {
  const selectQuery = 'SELECT * FROM Personal';
  executeQuery(selectQuery, 'Select', res);
});

// Define a route for the INSERT operation
app.post('/personal', (req, res) => {
  const insertQuery = `INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Driver_License_Number, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  executeQuery(insertQuery, 'Insert', res);
});

// Function to execute a query
function executeQuery(query, operation, response) {
  const request = new sql.Request();
  request.query(query, function (err, recordset) {
    if (err) {
      console.error(`Error during ${operation} operation: ${err}`);
      response.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(`${operation} operation successful`);
      console.log(recordset);
      response.json(recordset);
    }
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
