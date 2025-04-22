const express = require('express')
const router = express.Router()
const checkUser = require('../middleware/checkUser')
const { getServices } = require('../controller/services/services')

router.get('/list',checkUser,getServices)

module.exports = router