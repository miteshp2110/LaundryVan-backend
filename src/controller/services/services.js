const { pool } = require("../../config/db")

const getServices = async(req,res)=>{
   
    try{
        const {limit=null} = req.query || {}
        var query = "Select * from services"
        if(limit){
            query += ` LIMIT ${limit}`
        } 
    
        const [result] = await pool.query(query)
        if(result.length === 0){
            return res.status(404).json({message: "No services found"})
        }
        return res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }

}

module.exports = {getServices}