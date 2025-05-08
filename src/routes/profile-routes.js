const express = require('express')
const {handleFileUpload} = require('../middleware/uploads')
const checkUser = require('../middleware/checkUser')
const { getProfile, updateProfile } = require('../controller/profile/profile')
const router = express.Router()



router.get("/",checkUser,getProfile)
router.put("/",checkUser,handleFileUpload,updateProfile)


module.exports = router