const express = require('express');
const checkUser = require('../middleware/checkUser');
const { addOrder, getPreviousOrders, addQuickOrder } = require('../controller/orders/orders');
const router = express.Router();



router.post("/create",checkUser,addOrder)
router.post("/create/quick",checkUser,addQuickOrder)
router.get("/previousOrders",checkUser,getPreviousOrders)


module.exports = router