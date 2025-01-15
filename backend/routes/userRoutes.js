import express from "express";
import { signup, login, protcetedRoute } from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', verifyToken, protcetedRoute)


export default router;