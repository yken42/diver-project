import express, { json } from 'express';
import connectDB from './db/connect.js';
import 'dotenv/config';
import userRoute from './routes/userRoutes.js';
import reservationRouter from './routes/reservationRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/reservation', reservationRouter);

app.listen(PORT, () => {
    console.log(`app is running on localhost:${PORT}`);
})