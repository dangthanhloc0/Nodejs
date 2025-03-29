import { parentPort, workerData } from 'worker_threads';
import { pool } from './db';
import { redisClient } from './redis';

export const processTask = async ()=>{
    const {task,email} = workerData;
    console.log(task,email);
    if(task = 'checkCache'){
        const cacheUser =  await  redisClient.get(email);
        parentPort.postMessage({task,result :cacheUser ? cacheUser  : null })
    }
    
    if(task = 'checkDatabase'){
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email]); 
        parentPort.postMessage({task,result :rows.length ? rows[0] : null })
    }
}

processTask();