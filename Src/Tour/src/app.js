// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import orderRouters from './routes/orderRouters.js';  
import { checkConnection } from './config/db.js';
import createAllTable from './utils/dbUtils.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'


const app = express();
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies
// Use Model routes for API calls
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/tour',tourRoutes); 
app.use('/api/order',orderRouters);

app.listen(3000, async() => {
  console.log('Server running on port 3000');
  try {
    // connect with database
    await checkConnection();
    // create all table 
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});

