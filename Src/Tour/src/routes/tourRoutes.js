// routes/userRoutes.js
import { authenticateUser, checkAdmin } from '../controllers/middlewares/authMiddleware.js';
import express from 'express';
import { getAllTourMethod, createTourMethod,createDetailTourMethod,getAllDetailTourMethod  } from '../controllers/TourController/tourController.js';

const router = express.Router();

router.get('/get-all-tour',getAllTourMethod);
router.post('/create-tour',authenticateUser,checkAdmin ,createTourMethod);
router.post('/create-detailTour',authenticateUser,checkAdmin,createDetailTourMethod);
router.get('/get-All-DetailTour-By-TourId/:id',authenticateUser,getAllDetailTourMethod);

export default router;
