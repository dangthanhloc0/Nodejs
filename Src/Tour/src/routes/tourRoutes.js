// routes/userRoutes.js
import express from 'express';
import { getAllTourApi, createTourApi } from '../controllers/TourController/tourController.js';

const router = express.Router();

router.get('/get-all-tour', getAllTourApi);
router.post('/create-tour', createTourApi);

export default router;
