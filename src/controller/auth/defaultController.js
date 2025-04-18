const { pool } = require("../../config/db");

const CREATE_USER_QUERY = "INSERT INTO users(fullName,email,phone,password,authType,profileUrl) values (?,?,?,?,'password',?)"
const DEFAULT_PROFILE_PLACEHOLDER_URL = "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg"

const signUpWithPassword = async (req,res)=>{
    try{

        const {fullName=null,email=null,password=null,phone=null} = req.body || {}
        const fileName = req.imageName || DEFAULT_PROFILE_PLACEHOLDER_URL
        console.log(fileName)

        if(!fullName || !email || !password || !phone){
            return res.status(400).json({error:"Invalid Body"})
        }
        console.log(fullName)
        console.log(email)
        console.log(password)
        console.log(phone)
    
    }
    catch(e){
        console.error(e)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {signUpWithPassword}