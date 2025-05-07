import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';               // ← add this
import { router as authRoutes } from './src/routes/auth.js';
import { router as tripRoutes } from './src/routes/trips.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. Serve static files from `public/`
app.use(express.static(path.join(process.cwd(), 'public')));

// 2. Mount your API routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// 3. (Optional) catch-all 404 for API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  next();
});

// 4. (Optional) SPA fallback-serves your index.html for client‐side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// 5. Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
