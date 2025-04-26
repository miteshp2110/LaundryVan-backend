const express = require('express');
const checkUser = require('../middleware/checkUser');
const { addOrder } = require('../controller/orders/orders');
const router = express.Router();



router.post("/create",checkUser,addOrder)


module.exports = router