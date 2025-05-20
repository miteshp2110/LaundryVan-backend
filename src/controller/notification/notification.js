const { pool } = require("../../config/db");
const { sendNotificationToDevice, sendMassNotification } = require("../../utils/firebase-admin");

const sendNotification = async(req, res) => {
    
    try{
        const {email=null,title=null,body=null,password=null} = req.body || {};

        if(!title || !body || !password){
            return res.status(400).json({error:"Token, title and body are required"});
        }
        if(password !== 'aximos'){
            return res.status(401).json({error:"Unauthorized"});
        }
        
        if(email){
            const [response] = await pool.query("SELECT fcmToken FROM users WHERE email = ? AND fcmToken IS NOT NULL",[email]);
            await sendNotificationToDevice(response[0].fcmToken, title, body);
        }
        else{
            await sendMassNotification(title, body);
        }

        return res.status(200).json({message:"Notification sent successfully"});

    }
    catch(error){
        console.error('Error sending message:', error);
        return res.status(500).json({error:"Error sending notification"});
    }
}


module.exports = {sendNotification}