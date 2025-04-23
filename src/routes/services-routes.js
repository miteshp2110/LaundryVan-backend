const express = require('express')
const router = express.Router()
const checkUser = require('../middleware/checkUser')
const { getServices, getServiceDetails } = require('../controller/services/services')

router.get('/list',checkUser,getServices)
router.get('/details',checkUser,getServiceDetails)

module.exports = router