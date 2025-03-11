
import {CreateOrderMethod} from '../controllers/OrderController/orderController.js';
import express from 'express';

const router = express.Router();

router.post('/create-order',CreateOrderMethod);

export default router;