import express, { json } from 'express';
import connectDB from './db/connect.js';
import 'dotenv/config';
import userRoute from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoute);

app.listen(PORT, () => {
    console.log(`app is running on localhost:${PORT}`);
})