const express = require('express')
const app = express()
const cors = require('cors')
const jsonBodyValidator = require('./middleware/jsonBodyValidator')
const { getJwtToken } = require('./utils/jwtManager')
const { testConnection } = require('./config/db')

//test


//preloaders

testConnection()

app.use(cors())
app.use(express.json())

//custom middleware

app.use(jsonBodyValidator)



app.get("/test",(req,res)=>{

    res.json({message:"Test Route",jwt : getJwtToken({body:"test"})})
})


//routes 
app.use("/api/auth",require("./routes/auth-routes"))


module.exports = app