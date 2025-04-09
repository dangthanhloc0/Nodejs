import express from 'express';
import { getTransTours } from '../controllers/TransportController/transtoursController.js';

const router = express.Router();

router.get('/getall_trans', getTransTours);

export default router;