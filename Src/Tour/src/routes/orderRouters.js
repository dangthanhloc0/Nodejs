
import {CreateOrderMethod} from '../controllers/OrderController/orderController.js';
import { authenticateUser, checkAdmin } from '../controllers/middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/create-order',authenticateUser,CreateOrderMethod);

export default router;