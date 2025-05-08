const { pool } = require("../../config/db");
const { GOOGLE_CLIENT_ID } = require("../../config/secrets");
const { OAuth2Client } = require('google-auth-library');
const { getJwtToken, getRefreshToken } = require("../../utils/jwtManager");

const CREATE_USER_QUERY = "INSERT INTO users(fullName,email,phone,profileUrl) values (?,?,?,?)"
const DEFAULT_PROFILE_PLACEHOLDER_URL = "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg"

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const createNewUser = async (req,res)=>{
    try{

        const {idToken=null,phone=null} = req.body || {}
        
        if(!idToken  || !phone){
            return res.status(400).json({error:"Invalid Body"})
        }

        const ticket = await client.verifyIdToken({
            idToken:idToken,
            audience:GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        
        const {name,email,picture} = payload
        
        const [result] = await pool.query("Select count(id) as count from users where email = ?",[email])
        if(result[0].count > 0){
            return res.status(409).json({error:"User already exists"})
        }

        
        await pool.query(CREATE_USER_QUERY,[name,email,phone,picture])
        
        return res.status(200).json({message:"success",jwt:getJwtToken({email:email,role:'user'}),refreshToken:getRefreshToken({type:'refresh',email:email}),user:{
            email:email,fullName:name,phone:phone,profileUrl:picture
        }})

        
    }
    catch(e){
        console.error(e)
        return res.status(500).json({error:"Internal Server Error"})
    }
}



module.exports = {createNewUser}