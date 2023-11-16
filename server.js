const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./modules/server-database.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Case 3',
      version: '1.0.0',
      description: 'Nhóm 3 - Backend Class SE 445 I',
    },
    servers: [
      {
        url: 'http://localhost:8081',
      },
    ],
  },
  apis: ['./routes/*/*.js'],
};
const specs = swaggerJsDoc(options);
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
  console.log('Ứng dụng trên cổng 8081');
});
