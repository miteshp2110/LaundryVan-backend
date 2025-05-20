const { pool } = require("../../config/db");
const { GOOGLE_CLIENT_ID } = require("../../config/secrets");
const { OAuth2Client } = require('google-auth-library');
const { getJwtToken,getRefreshToken} = require("../../utils/jwtManager");



const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const continueWithGoogle = (async(req,res)=>{
    const {idToken,fcmToken} = req.body
    if(!idToken){
        return res.status(400).json({Message:"Invalid Body"})
    }
    try{

        const ticket = await client.verifyIdToken({
            idToken:idToken,
            audience:GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()

        const {email} = payload
        
        const [result] = await pool.query("Select * from users where email = ?",[email])

        if(result.length === 0){
            return res.status(201).json({method:"google", message:"success"})
        }else{
            await pool.query("UPDATE users SET fcmToken = ? WHERE email = ?",[fcmToken,email])
            const user = result[0]
            return res.status(200).json({message:"success",jwt:getJwtToken({email:user.email,role:'user'}),refreshToken:getRefreshToken({type:'refresh',email:user.email}),user:{
                email:user.email,fullName:user.fullName,phone:user.phone,profileUrl:user.profileUrl
            }})

        }
        
        

    }
    catch(err){
        console.error(err)
        return res.status(401).json({error:"Invalid User"})
    }
})

module.exports = continueWithGoogle