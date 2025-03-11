// routes/userRoutes.js
import express from 'express';
import { getAllTourMethod, createTourMethod,createDetailTourMethod,getAllDetailTourMethod  } from '../controllers/TourController/tourController.js';

const router = express.Router();

router.get('/get-all-tour', getAllTourMethod);
router.post('/create-tour', createTourMethod);
router.post('/create-detailTour',createDetailTourMethod);
router.get('/get-All-DetailTour-By-TourId/:id',getAllDetailTourMethod);

export default router;
