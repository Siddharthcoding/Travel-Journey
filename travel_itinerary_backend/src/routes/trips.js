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
  getBookingDetails,
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
router.get('/bookings/:bookingId', authMiddleware, getBookingDetails);
router.post('/bookings/:bookingId/cancel', authMiddleware, cancelBooking);


router.post('/test-email', authMiddleware, async (req, res) => {
  try {
    // Create a test email
    const info = await transporter.sendMail({
      from: `"Travel App" <${process.env.EMAIL_USER}>`,
      to: req.body.email || req.user.email,
      subject: "Test Email",
      html: "<b>This is a test email from your Travel App!</b>"
    });
    
    res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    });
  } catch (err) {
    console.error('Error sending test email:', err);
    res.status(500).json({ message: 'Error sending test email', error: err.message });
  }
});