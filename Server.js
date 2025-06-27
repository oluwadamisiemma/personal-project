import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//import authRoutes from './routes/auth.js';
//import scheduleRoutes from './routes/schedule.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    app.use('/auth', authRoutes);
    app.use('/schedules', scheduleRoutes);

    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
