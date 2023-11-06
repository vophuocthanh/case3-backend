const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/users', require('./users/users').routerUsers);
router.use('/employee', require('./employee/employee').routerEmployee);
router.use('/pay_rates', require('./pay_rates/pay-rates').routerPayRates);
router.use('/login', require('./login/login').routerLogin);

module.exports = router;
