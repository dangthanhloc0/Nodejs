import { pool } from "../../config/db.js";
// create order
export const createOrder = async (ordertour) => {
   try{
        const today = new Date()
        const query = `INSERT INTO OrderTours(typeoforderid,user_id,numberpeople,totalprice,date,detailtour_id) VALUES(?,?,?,?,?,?);`
        const values = [ordertour.typeoforderid,ordertour.user_id,ordertour.numberpeople,ordertour.totalprice,today,ordertour.detailtour_id];
        await pool.query(query,values);
        return {status : true, message : "Order created successfully"};

   } catch(error){
     console.log('error when fetching data create order: error: '+error );
     return {status : false,message : 'failed when create order'};
   }
}

// Truy vấn OrderTours theo user_id
export const getOrdersByUserId = async (user_id) => {
  try {
    const query = "SELECT * FROM OrderTours WHERE user_id = ?";
    const [rows] = await pool.query(query, [user_id]);
    return rows;
  } catch (error) {
    console.error("Lỗi khi truy vấn order theo user_id:", error.message);
    throw error;
  }
};