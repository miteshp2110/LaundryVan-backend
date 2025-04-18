const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/secrets')

const optionsForJwt = {
    algorithm:"HS256",
    expiresIn:"1m"
}

const optionsForRefreshToken = {
    algorithm:"HS256",
    expiresIn:"150d"
}

function getJwtToken (payload={}){
    try{
        const finalToken = jwt.sign(payload,JWT_SECRET,optionsForJwt)
        return finalToken
    }
    catch(err){
        console.log(err)
        return null
    }
}
function getRefreshToken (payload={}){
    try{
        const finalToken = jwt.sign(payload,JWT_SECRET,optionsForRefreshToken)
        return finalToken
    }
    catch(err){
        console.log(err)
        return null
    }
}



function verifyJwtToken(token,role=''){
    try{
        const isValid = jwt.verify(token,JWT_SECRET,{algorithms:"HS256"})
        if(role){
            if(isValid.role===role){
                return {email:isValid.email}
            }
            else{
                return false
            }
        }

        return {email:isValid.email}

    }
    
    catch(err){
        if(err.name==="TokenExpiredError"){
            console.log("Token Expired")
        }
        else if(err.name==="JsonWebTokenError"){
            console.log("Invalid Token")
        }
        else{
            console.log("Unknown Error")
        }
        return false
    }
}

function verifyRefreshToken(token){
    try{
        jwt.verify(token,JWT_SECRET,{algorithms:"HS256"})
        return true

    }
    
    catch(err){

        return false
    }
}

// verifyJwtToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5IjoidGVzdCIsImlhdCI6MTc0NDkxNDA1MywiZXhwIjoxNzQ0OTE0MTEzfQ.MDEr6GkbjmnMna5SenBbNCr8ezabSmsd1TQRrfnx908", "user")

// // console.log(getRefreshToken({email:"test"})) 
// console.log(verifyRefreshToken("eyJhciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE3NDQ5MTU0NDcsImV4cCI6MTc1Nzg3NTQ0N30.Tytbdhk9EuS9xY5YgSoLm2YspBDgsoHpQEUAZ6wSbRI")) 



module.exports = {getJwtToken,verifyJwtToken}