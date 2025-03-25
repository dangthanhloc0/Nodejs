//Add your database
import mysql2 from 'mysql2/promise';
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(express.json()); // Đọc JSON từ request body
app.use(cors({ origin: 'http://localhost:5181' })); 


const pool = mysql2.createPool({
    host: 'localhost', 
    port: 3306, 
    user: 'root',
    password: '03102003',
    database: 'tour',
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true
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