import { pool } from "../../config/db.js";
// create order
export const createOrder = async (ordertour) => {
   try{
        const [rows] = await pool.query("SELECT numerseatunoccupied FROM detailtours WHERE ID = ?", [ordertour.detailtour_id]); 
        if(ordertour.numberpeople > rows[0].numerseatunoccupied){
          return {state: false,message: "Not enough seats available"}; 
        }
        const today = new Date()
        const query = `INSERT INTO OrderTours(typeoforderid,user_id,numberpeople,totalprice,date,detailtour_id) VALUES(?,?,?,?,?,?);`
        const values = [ordertour.typeoforderid,ordertour.user_id,ordertour.numberpeople,ordertour.totalprice,today,ordertour.detailtour_id];
        await pool.query(query,values);
        await pool.query("UPDATE detailtours SET numerseatunoccupied = numerseatunoccupied - ? WHERE ID = ?",[ordertour.numberpeople,ordertour.detailtour_id]);

        return {status : true, message : "Order created successfully"};

   } catch(error){
     console.log('error when fetching data create order: error: '+error );
     return {status : false,message : 'failed when create order'};
   }
}

