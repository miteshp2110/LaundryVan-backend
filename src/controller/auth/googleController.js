const { pool } = require("../../config/db");
const { GOOGLE_CLIENT_ID } = require("../../config/secret");
const { OAuth2Client } = require('google-auth-library');
const { getJwtToken } = require("../../utils/jwtManager");

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const continueWithGoogle = (async(req,res)=>{
    const {idToken} = req.body
    if(!idToken){
        return res.status(400).json({Message:"Invalid Body"})
    }
    try{
        const ticket = await client.verifyIdToken({
            idToken:idToken,
            audience:GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()

        const {name,email,picture} = payload
        
        const [result] = await pool.query("Select count(*) as count from admins where email = ?",[email])
        
        if(result[0].count === 1){
            return res.status(200).json({Message:"isAdmin",token:"",email:email,name:name,profile_url:""})
        }
        else{
            const [checkUser] = await pool.query("Select count(*) as count from users where email = ?",[email])

            if(checkUser[0].count === 1){
                const payload = {
                    email : email,
                    role : 'user'
                }
                return res.status(200).json({Message:"Success",token:getJwtToken(payload),email:email,name:name,profile_url:picture})
            }
            else{
                await pool.query("insert into users (name,email,profile_url) values (?,?,?)",[name,email,picture])
                const payload = {
                    email : email,
                    role : "user"
                }
                return res.status(200).json({Message:"Success",token:getJwtToken(payload),email:email,name:name,profile_url:picture})
            }
        }

    }
    catch(err){
        // console.error(err)
        return res.status(401).json({Message:"Invalid User"})
    }
})

module.exports = continueWithGoogle