import { pool } from "../../config/db.js";
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

