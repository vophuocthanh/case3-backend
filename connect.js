const sql = require('mssql/msnodesqlv8');
var config = {
  driver: 'msnodesqlv8',
  server: 'DESKTOP-0DQK2T6\\SQLEXPRESS',
  database: 'HR',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

module.exports = {
  conn: conn,
  sql: sql,
};
