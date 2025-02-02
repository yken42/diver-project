import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ error: 'Unauthorized, please login' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; 
    next(); 
  } catch (err) {
    return res.status(403).json({ error: 'Token expired or invalid, please login' });
  }
};