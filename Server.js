import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import scheduleRoutes from './routes/schedule.js';

dotenv.config();
const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);

app.use('/auth', authRoutes);
app.use('/schedules', scheduleRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
