// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  travelers: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    required: true
  },
  specialRequests: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  bookingReference: {
    type: String,
    required: true,
    unique: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export const Booking = mongoose.model('Booking', bookingSchema);
