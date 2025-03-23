// routes/userRoutes.js
import express from 'express';
import { getUserDetails, login, register } from '../controllers/UserController/authController.js';
import { authenticateUser, checkAdmin } from '../controllers/middlewares/authMiddleware.js';


const router = express.Router();

router.post('/register-user', register);
router.post('/login', login);
router.get('/get-userDetails',authenticateUser, getUserDetails);


export default router;
