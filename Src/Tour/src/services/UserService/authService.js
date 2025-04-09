// services/userService.js
import { pool } from "../../config/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { filter } from "../../config/bloomFilter.js";
import { Worker } from 'worker_threads';
import {redisClient } from '../../config/redis.js'; 
const JWT_SECRET = '76348734687346874363443434343443333333333'; 
// Register User
export const registerUser = async (user) => {
    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [user.email]);
        if (existingUser.length > 0) {
            return { state: false, message: 'User already exists' };
        }
        
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = `INSERT INTO users (name, email, mobile, password, userType) VALUES (?, ?, ?, ?,?)`;
        const values = [user.username, user.email, user.mobile, hashedPassword,user.userType];
        await pool.query(query, values);
        filter.add(user.email);
        return { state: true, message: 'User registered statefully' };
    } catch (error) {
        console.error("Registration error:", error);
        return { state: false, message: 'Registration failed. Please try again later.' };
    }
};

// Login User with JWT token
export const loginUser = async (email, password) => {
    try {
        if (!filter.has(email)) {
            return { state: false, message: 'User not found' };
        }
        const cacheUser = await redisClient.get(email);
        if (cacheUser) {
            console.log("Login by cache");
            const user = JSON.parse(cacheUser);
        
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return generateLoginResponse(user);
            }
            return { state: false, message: 'Incorrect password' };
        }
        const user = await getUserFromDatabase(email);
        console.log("Login by Db");
        if (!user) {
            return { state: false, message: 'User not found' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { state: false, message: 'Incorrect password' };
        }
        await redisClient.setEx(email, 3600, JSON.stringify(user));

        return generateLoginResponse(user);
    } catch (error) {
        console.error("Login error:", error);
        return { state: false, message: 'Login failed. Please try again later.' };
    }
};

const getUserFromDatabase = (email) => {
    return new Promise((resolve, reject) => {
        const workerCode = `
            import { parentPort, workerData } from 'worker_threads';
            import mysql2 from 'mysql2/promise';

            (async () => {
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

                try {
                    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [workerData.email]);
                    parentPort.postMessage({ result: rows.length > 0 ? rows[0] : null });
                } catch (error) {
                    parentPort.postMessage({ error: error.message });
                } finally {
                    await pool.end();  // Đóng connection pool
                    process.exit(0);   // Đảm bảo worker kết thúc
                }
            })();
        `;

        const worker = new Worker(workerCode, { eval: true, workerData: { email } });

        worker.on('message', (data) => resolve(data.result || null));
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error());
        });
    });
};


const generateLoginResponse = (user) => {
    const token = jwt.sign(
        { id: user.id, email: user.email, userType: user.userType },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        state: true,
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, userType: user.userType }
    };
};

export const getUserFromToken = async (token) => {
    try {
        const trimmedToken = token.trim();
        console.log("Received token:", trimmedToken);
        const decoded = jwt.verify(trimmedToken, JWT_SECRET);
        console.log("Decoded token:", decoded);
        const [rows] = await pool.query('SELECT id, name, email, mobile, userType FROM users WHERE id = ?', [decoded.id]);
        if (rows.length === 0) {
            return { state: false, message: 'User not found' };
        }

        const user = rows[0];
        return { state: true, user };
    } catch (error) {
        console.error("Token verification error:", error);
        return { state: false, message: 'Invalid or expired token' };
    }
};



 