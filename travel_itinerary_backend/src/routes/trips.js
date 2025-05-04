import express from 'express';
import { 
  getAllTrips, 
  getTripById, 
  createTrip, 
  updateTrip, 
  deleteTrip,
  getTripsByCategory,
  getTripsByCountry,
  searchTrips
} from '../controllers/tripController.js';
import {
  bookTrip,
  getUserBookings,
  cancelBooking
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';

export const router = express.Router();

// Public routes
router.get('/', getAllTrips);
router.get('/search', searchTrips);
router.get('/category/:category', getTripsByCategory);
router.get('/country/:country', getTripsByCountry);
router.get('/:id', getTripById);

// Protected routes
router.post('/', authMiddleware, createTrip);
router.put('/:id', authMiddleware, updateTrip);
router.delete('/:id', authMiddleware, deleteTrip);

// Booking routes
router.post('/:id/book', authMiddleware, bookTrip);
router.get('/bookings', authMiddleware, getUserBookings);
router.post('/bookings/:bookingId/cancel', authMiddleware, cancelBooking);
