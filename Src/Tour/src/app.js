// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import orderRouters from './routes/orderRouters.js';
import typetourRoutes from './routes/typetourRoutes.js'; 
import { checkConnection } from './config/db.js';
import createAllTable from './utils/dbUtils.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import { loadUserIntoBloom } from './config/bloomFilter.js';
import { connectRedisClient } from './config/redis.js';
const app = express();
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies
// Use Model routes for API calls
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/tour',tourRoutes); 
app.use('/api/order',orderRouters);
app.use('/api/typetour',typetourRoutes); 

app.listen(3000, async() => {
  console.log('Server running on port 3000');
  try {
    // connect with database
    await checkConnection();
    // create all table 
    await createAllTable();
    // load user into bloomfilter
    await loadUserIntoBloom();
    // conect redis
    await connectRedisClient();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});

