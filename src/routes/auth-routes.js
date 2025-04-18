const express = require('express')
const {handleFileUpload} = require('../middleware/uploads')
const { signUpWithPassword } = require('../controller/auth/defaultController')
const revalidateUser = require('../controller/auth/refreshToken')
const router = express.Router()



router.post("/default/signup",handleFileUpload,signUpWithPassword)
router.get("/refresh",revalidateUser)


module.exports = router