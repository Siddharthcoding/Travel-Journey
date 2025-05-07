// controllers/bookingController.js
import { Trip } from '../models/Trip.js';
import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';

// Generate a unique booking reference
const generateBookingReference = () => {
  const prefix = 'TRV';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${randomNum}-${timestamp}`;
};

// Book a trip
export const bookTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const userId = req.user.id;
    const { travelers, date, specialRequests, contactEmail, contactPhone, totalPrice } = req.body;

    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const calculatedTotalPrice = totalPrice || trip.priceValue * travelers;
    const bookingReference = generateBookingReference();

    const booking = new Booking({
      trip: tripId,
      user: userId,
      travelers,
      date,
      specialRequests,
      contactEmail,
      contactPhone,
      status: 'confirmed',
      bookingReference,
      totalPrice: calculatedTotalPrice
    });

    await booking.save();

    // Return success response (no email)
    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      bookingReference,
      booking: {
        id: booking._id,
        trip: {
          id: trip._id,
          title: trip.title,
          country: trip.country,
          image: trip.image
        },
        travelers,
        date,
        status: booking.status,
        totalPrice: calculatedTotalPrice
      }
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Error processing booking', error: err.message });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId })
      .populate('trip', 'title country image price days rating')
      .sort({ created: -1 });

    const formatted = bookings.map(bk => ({
      id: bk._id,
      bookingReference: bk.bookingReference,
      trip: {
        id: bk.trip._id,
        title: bk.trip.title,
        country: bk.trip.country,
        image: bk.trip.image,
        price: bk.trip.price,
        days: bk.trip.days,
        rating: bk.trip.rating
      },
      travelers: bk.travelers,
      date: bk.date,
      status: bk.status,
      totalPrice: bk.totalPrice,
      created: bk.created
    }));

    res.json({ bookings: formatted });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

// Get booking details
export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId)
      .populate('trip')
      .populate('user', 'name email');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json({
      booking: {
        id: booking._id,
        bookingReference: booking.bookingReference,
        trip: {
          id: booking.trip._id,
          title: booking.trip.title,
          country: booking.trip.country,
          image: booking.trip.image,
          price: booking.trip.price,
          days: booking.trip.days,
          itinerary: booking.trip.itinerary
        },
        travelers: booking.travelers,
        date: booking.date,
        specialRequests: booking.specialRequests,
        contactEmail: booking.contactEmail,
        contactPhone: booking.contactPhone,
        status: booking.status,
        totalPrice: booking.totalPrice,
        created: booking.created
      }
    });
  } catch (err) {
    console.error('Error fetching booking details:', err);
    res.status(500).json({ message: 'Error fetching booking details', error: err.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ success: true, message: 'Booking cancelled successfully', booking: { id: booking._id, status: booking.status } });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};
