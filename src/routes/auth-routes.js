const express = require('express')
const {handleFileUpload} = require('../middleware/uploads')
const { signUpWithPassword, loginWithPassword, createNewUser } = require('../controller/auth/defaultController')
const revalidateUser = require('../controller/auth/refreshToken')
const {sendOtpForMobile, validateOtp} = require('../controller/auth/phoneOTP')
const continueWithGoogle = require('../controller/auth/googleController')
const router = express.Router()



router.post("/createUser",createNewUser)
router.post("/google",continueWithGoogle)
router.get("/refresh",revalidateUser)
router.post("/sendOTP",sendOtpForMobile)
router.post("/validateOtp",validateOtp)


module.exports = router