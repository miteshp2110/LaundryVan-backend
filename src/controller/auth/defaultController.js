const { pool } = require("../../config/db");
const { deleteFile } = require("../../middleware/uploads");
const { getHashedPassword } = require("../../utils/bcryptManager");
const { checkExistingUserDefault } = require("../../utils/datbaseUtils");
const { getJwtToken, getRefreshToken } = require("../../utils/jwtManager");

const CREATE_USER_QUERY = "INSERT INTO users(fullName,email,phone,password,authType,profileUrl) values (?,?,?,?,'password',?)"
const DEFAULT_PROFILE_PLACEHOLDER_URL = "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg"

const signUpWithPassword = async (req,res)=>{
    const fileName = req.imageName || DEFAULT_PROFILE_PLACEHOLDER_URL
    try{

        const {fullName=null,email=null,password=null,phone=null} = req.body || {}
        
        if(!fullName || !email || !password || !phone){
            return res.status(400).json({error:"Invalid Body"})
        }
        
        const existingUser = await checkExistingUserDefault(email)

        if(existingUser){
            if(fileName!=DEFAULT_PROFILE_PLACEHOLDER_URL){
                const splits = fileName.split("/")
                deleteFile(splits[splits.length -1])
            }
            return res.status(400).json({error:"Email Already Exist"})
        }
        
        await pool.query(CREATE_USER_QUERY,[fullName,email,phone,await getHashedPassword(password),fileName])
        
        return res.status(201).json({message:"User Created",jwt:getJwtToken({email:email,role:'user'}),refreshToken:getRefreshToken({email:email,type:'refresh'})})

        
    }
    catch(e){
        if(fileName!=DEFAULT_PROFILE_PLACEHOLDER_URL){
            const splits = fileName.split("/")
            deleteFile(splits[splits.length -1])
        }
        if(e.code === 'ER_DUP_ENTRY'){
            return res.status(400).json({error:"Phone Number already exists."})
        }
        
        console.error(e)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {signUpWithPassword}