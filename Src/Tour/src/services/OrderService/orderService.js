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

// Truy vấn OrderTours theo user_id
export const getOrdersByUserId = async (user_id) => {
  try {
    const query = `
      SELECT ot.id, ot.user_id, ot.numberpeople, ot.totalprice, ot.detailtour_id, ot.date,
             t.id AS typeoforderid, t.name AS typeoforder_name
      FROM OrderTours ot
      JOIN TypeOfOrders t ON ot.typeoforderid = t.id
      WHERE ot.user_id = ?;
    `;

    const [rows] = await pool.query(query, [user_id]);
    return rows;
  } catch (error) {
    console.error("Lỗi khi truy vấn order theo user_id:", error.message);
    throw error;
  }
};