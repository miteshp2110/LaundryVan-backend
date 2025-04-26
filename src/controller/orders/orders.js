const { pool } = require("../../config/db")

const insertOrderQuery = "Insert into orders (user_id, address,pickup_date,pickup_time,delivery_time,delivery_date,promotion_id,payment_mode,payment_status,order_total,order_status,van_id) values ((select id from users where email = ?),?,?,?,?,?,?,?,?,?,1,(select id from vans where region_id = (select region_id from addresses where id = ?)))"


const addOrder = async (req, res) => {
    const conn = await pool.getConnection()
    const {itemsList=null, addressId=null, pickUpDate=null,pickUpTime=null,deliveryTime=null,deliveryDate=null,promotionId=null, paymentStatus=null,orderTotal = null} = req.body || {}
    var {paymentMode = null} = req.body || {}
        if(!itemsList || !addressId || !pickUpDate || !pickUpTime || !deliveryTime || !deliveryDate || !promotionId || !paymentMode || paymentStatus==null || !orderTotal){
            return res.status(400).json({error: "Invalid body"})
        }

        paymentMode = paymentMode.toLowerCase()
        
        const {email} = req.user 
    
    try{

        if((paymentMode ==="online" && paymentStatus === false) || (paymentMode === "cash" && paymentStatus === true)){
            return res.status(400).json({error: "Invalid payment state"})
        }

        await conn.beginTransaction()


        const [orderId] = await conn.query(insertOrderQuery,[email,addressId,pickUpDate,pickUpTime,deliveryTime,deliveryDate,promotionId,paymentMode,paymentStatus,orderTotal,addressId])

        var itemsInsertQuery = "Insert into order_items (order_id,item_id,quantity) values  "

        itemsList.forEach((item) => {
            const newItemInsert = `(${orderId.insertId},${item.itemId},${item.quantity}),`
            itemsInsertQuery += newItemInsert
        })
        itemsInsertQuery = itemsInsertQuery.slice(0, -1)

        await conn.query(itemsInsertQuery)
    
        await conn.query("Insert into order_status_history (order_id,order_status) values (?,1)",[orderId.insertId])

        await conn.commit()

        return res.status(200).json({message: "Order created successfully"})
    }
    catch(err){
        

        if(paymentMode === "online" && paymentStatus === true){
            await pool.query("insert into failed_orders (user_id,order_total) values ((select id from users where email = ?),?)",[email,orderTotal])
        }
        await conn.rollback()
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
    finally{
        conn.release()
    }
} 

module.exports = { addOrder}