import express from 'express';
import { 
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripsByCategory,
  getTripsByCountry,
  searchTrips,
  toggleSaveTrip              // ← import this
} from '../controllers/tripController.js';
import {
  bookTrip,
  getUserBookings,
  getBookingDetails,
  cancelBooking
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';

export const router = express.Router();

// BOOKING & SAVE routes (static, must come BEFORE /:id)
router.get('/bookings', authMiddleware, getUserBookings);
router.get('/bookings/:bookingId', authMiddleware, getBookingDetails);
router.post('/bookings/:bookingId/cancel', authMiddleware, cancelBooking);
router.post('/:id/book', authMiddleware, bookTrip);
router.post('/:id/toggle-save', authMiddleware, toggleSaveTrip);  // ← new

// OTHER static
router.get('/search', searchTrips);
router.get('/category/:category', getTripsByCategory);
router.get('/country/:country', getTripsByCountry);

// PUBLIC list
router.get('/', getAllTrips);

// PROTECTED CRUD
router.post('/', authMiddleware, createTrip);
router.put('/:id', authMiddleware, updateTrip);
router.delete('/:id', authMiddleware, deleteTrip);

// PARAM route last
router.get('/:id', getTripById);
