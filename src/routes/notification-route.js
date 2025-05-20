const express = require('express')
const router = express.Router()
const checkUser = require('../middleware/checkUser')
const { sendNotification } = require('../controller/notification/notification')


router.post("/send",sendNotification)

module.exports = router