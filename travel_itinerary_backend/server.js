import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as authRoutes } from './src/routes/auth.js';
import { router as tripRoutes } from './src/routes/trips.js';
import { seedData } from './src/utils/seedData.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'https://trip-glide.onrender.com' }));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

async function checkAndSeedDatabase() {
  try {
    const count = await Trip.countDocuments();
    if (count === 0) {
      console.log('Database empty, seeding with initial data...');
      await Trip.insertMany(seedData);
      console.log(`Database seeded with ${seedData.length} trips`);
    } else {
      console.log(`Database already contains ${count} trips, skipping seed`);
    }
  } catch (error) {
    console.error('Error checking/seeding database:', error);
  }
}

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  }); 
