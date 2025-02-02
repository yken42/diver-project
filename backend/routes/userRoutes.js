import express from "express";
import { signup, login, protcetedRoute, logout } from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyToken, protcetedRoute)
router.post('/logout', logout);

export default router;