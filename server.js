const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./modules/server-database.js');

const app = express();
app.use(express.json());
app.use(cors()); // cơ chế bảo mật cho phép các tài nguyên từ một miền khác được truy cập bởi một trang web được lưu trữ trên một miền khác
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/router.js'));

db.connect((err) => {
  if (err) throw err;
  console.log('Kết nối MySQL thành công');
});

app.listen(8081, () => {
  console.log('Ứng dụng đang lắng nghe trên cổng 8081');
});
