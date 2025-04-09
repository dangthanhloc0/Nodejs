import express from 'express';
import { getAll } from '../controllers/TypeOfTourController/typeTourController.js';

const router = express.Router();

router.get('/getall_type', getAll);

export default router;