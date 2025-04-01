
import {CreateOrderMethod, getAllOrder, getOrderDetailTour} from '../controllers/OrderController/orderController.js';
import { authenticateUser, checkAdmin } from '../controllers/middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/create-order',authenticateUser,CreateOrderMethod);
router.get("/all-orders", authenticateUser, getAllOrder);
router.get("/order-detail/:id", getOrderDetailTour);


export default router;