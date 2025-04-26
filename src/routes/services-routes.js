const express = require('express')
const router = express.Router()
const checkUser = require('../middleware/checkUser')
const { getServices, getServiceDetails, searchServices } = require('../controller/services/services')

router.get('/list',checkUser,getServices)
router.get('/details',checkUser,getServiceDetails)
router.get('/search',checkUser,searchServices)

module.exports = router