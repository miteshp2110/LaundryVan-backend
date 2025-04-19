const getOtp = require("../../utils/otpManager")


const sendOtpForMobile = async(req,res)=>{
    try{

        const {phone=null} = req.body || {}
        if(!phone){
            return res.status(400).json({error:"Invalid Body"})
        }

        //TODO: Check into Db for existing
        
        const newOTP = getOtp()
        //TODO: Save it into db
        // TODO: Send OTP via Twillio

        return res.status(200).json({message:`Sent OTP on ${phone} valid for 5 mins`})

    }
    catch(e){
        console.error(e)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const validateOtp = async(req,res)=>{
    try{
        const {phone=null,otp=null} = req.body || {}
        if(!phone || !otp){
            return res.status(400).json({error:"Invalid Body"})
        }
        // TODO: check in db if otp exists

        if(otp === 1111){
            return res.status(200).json({message:"success"})
        }
        else{
            return res.status(401).json({error:"Wrong OTP"})
        }
    }
    catch(e){
        console.error(e)
        return res.status(500).json({error:"Internal Server Error"})
    }
}


module.exports = {sendOtpForMobile,validateOtp}