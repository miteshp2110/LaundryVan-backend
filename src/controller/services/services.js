const { pool } = require("../../config/db")
const { groupItemsByCategory } = require("../../utils/grouping")

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

const getServiceDetails = async(req,res)=>{
    try{
        const {id=null} = req.query || {}
        if(!id){
            return res.status(400).json({error: "Service id is required"})
        }
        const query = "select category.id as cId, category.name as category, items.id as itemId, items.name as item , items.price as price , items.iconUrl as iconUrl from category join items on items.category_id = category.id where service_id = ?"
        const [result] = await pool.query(query,[id])
    
        if(result.length === 0){
            return res.status(404).json({message: "Service not found"})
        }
        return res.status(200).json(groupItemsByCategory(result))
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
}


module.exports = {getServices,getServiceDetails}