import express from 'express';
import { createReservation, getReservation } from '../controllers/reservationControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createReservation', verifyToken, createReservation);
router.get('/reservation', verifyToken, getReservation);

export default router;