//Add your database
import mysql2 from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const pool=mysql2.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'1234',
    database:'tour',
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
});

const checkConnection=async()=>{
    try {
        const connection=await pool.getConnection();
        console.log("Database Connection Successfull!!");
        connection.release();
        
    } catch (error) {
        console.log("Error connecting to database!");
        throw error;
        
    }
}

export {pool,checkConnection};