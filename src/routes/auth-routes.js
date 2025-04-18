const express = require('express')
const handleFileUpload = require('../middleware/uploads')
const { signUpWithPassword } = require('../controller/auth/defaultController')
const router = express.Router()



router.post("/default/signup",handleFileUpload,signUpWithPassword)


module.exports = router