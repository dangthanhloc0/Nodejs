// routes/userRoutes.js
import express from 'express';
import { getAllUsers, createUser } from '../controllers/UserController/userController.js';
import { authenticateUser, checkAdmin } from '../controllers/middlewares/authMiddleware.js';
const router = express.Router();

router.get('/get-user', getAllUsers);
router.post('/create-user',authenticateUser, createUser);

export default router;
