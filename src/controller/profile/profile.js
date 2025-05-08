const { pool } = require("../../config/db");

const getProfile = async (req, res) => {
    try {
        const { email } = req.user;
        const [result] = await pool.query("Select * from users where email = ?", [
        email,
        ]);
        if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
        } else {
        const user = result[0];
        return res.status(200).json({
            message: "success",
            user: {
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            profileUrl: user.profileUrl,
            },
        });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateProfile = async (req, res) => {

    const fileName = req.imageName
    const { email } = req.user
    try{
        const {name=null} = req.body || {}

        if(!name && !fileName){
            return res.status(400).json({error:"No data to update"})
        }
        else{
           if(name && fileName){
                const [result] = await pool.query("Update users set fullName = ?, profileUrl = ? where email = ?",[name,fileName,email])
                if(result.affectedRows === 0){
                    return res.status(404).json({error:"User not found"})
                }
                else{
                    return res.status(200).json({message:"Profile updated successfully"})
                }

            }
            else if(name){
                const [result] = await pool.query("Update users set fullName = ? where email = ?",[name,email])
                if(result.affectedRows === 0){
                    return res.status(404).json({error:"User not found"})
                }
                else{
                    return res.status(200).json({message:"Profile updated successfully"})
                }
            }
            else if(fileName){
                const [result] = await pool.query("Update users set profileUrl = ? where email = ?",[fileName,email])
                if(result.affectedRows === 0){
                    return res.status(404).json({error:"User not found"})
                }
                else{
                    return res.status(200).json({message:"Profile updated successfully"})
                }
            }
        }
        return res.status(200).json({message:"success"})
    }
    catch(e){
        console.error(e)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = { getProfile ,updateProfile};