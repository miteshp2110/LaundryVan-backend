const { pool } = require("../config/db")

const QUERY_EXISTING_USER_DEFAULT = "SELECT password FROM users WHERE email = ? AND authType = 'password'"
const QUERY_EXISTING_USER_GOOGLE = "SELECT * FROM users WHERE email = ? AND authType = 'google'"



async function checkExistingUserDefault(email){

    try{
        const [result] = await pool.query(QUERY_EXISTING_USER_DEFAULT,[email])
        if(result.length === 0){
            return false
        }
        else{
            return result[0].password
        }
        
    }
    catch(err){
        console.error(err)
        return false
    }
} 

module.exports = {checkExistingUserDefault}