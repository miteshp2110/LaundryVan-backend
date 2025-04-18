const { verifyJwtToken } = require("../utils/jwtManager");

const checkAdmin = (async(req,res,next)=>{
    try{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(400).json({message:"Token Required"})
        }  
        const token = authorization.split(' ')[1]
        let verification = verifyJwtToken(token)
        if(verification === false){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.user = verification.email
        next()

    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:"Some Error Occured"})
    }
})

module.exports=checkAdmin