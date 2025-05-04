// controllers/bookingController.js
import { Trip } from '../models/Trip.js';
import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail', // e.g., 'gmail', 'outlook', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send confirmation email
const sendConfirmationEmail = async (booking, trip, user) => {
  try {
    // Format date for display
    const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
    
    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
          }
          .header {
            background-color: #10b981;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
          }
          .booking-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .btn {
            display: inline-block;
            background-color: #10b981;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear ${user.name},</p>
            <p>Thank you for booking your trip with us! Your reservation for <strong>${trip.title}</strong> has been confirmed.</p>
            
            <div class="booking-details">
              <h3>Booking Details:</h3>
              <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
              <p><strong>Destination:</strong> ${trip.country}</p>
              <p><strong>Travel Date:</strong> ${formattedDate}</p>
              <p><strong>Duration:</strong> ${trip.days} days</p>
              <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
              <p><strong>Total Price:</strong> $${booking.totalPrice.toLocaleString()}</p>
            </div>
            
            <p>We've received your special requests and will do our best to accommodate them:</p>
            <p><em>${booking.specialRequests || 'No special requests provided.'}</em></p>
            
            <p>You can view your booking details and manage your reservation in your account under "My Trips".</p>
            
            <p>If you have any questions or need to make changes to your booking, please contact our customer service team at support@travelapp.com or call us at +1-800-TRAVEL.</p>
            
            <p>We're looking forward to providing you with an unforgettable travel experience!</p>
            
            <p>Safe travels,<br>The Travel Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>© ${new Date().getFullYear()} Travel App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Email options
    const mailOptions = {
      from: `"Travel App" <${process.env.EMAIL_USER}>`,
      to: booking.contactEmail,
      subject: `Booking Confirmation: ${trip.title} (Ref: ${booking.bookingReference})`,
      html: emailHtml
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw the error to prevent booking process from failing
    // just because email sending failed
  }
};

// Generate a unique booking reference
const generateBookingReference = () => {
  const prefix = 'TRV';
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  const timestamp = Date.now().toString().slice(-4); // Last 4 digits of timestamp
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
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Calculate total price if not provided
    const calculatedTotalPrice = totalPrice || (trip.priceValue * travelers);
    
    // Generate unique booking reference
    const bookingReference = generateBookingReference();
    
    // Create new booking
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
    
    // Save booking to database
    await booking.save();
    
    // Send confirmation email
    await sendConfirmationEmail(booking, trip, user);
    
    // Return success response
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
    
    // Find all bookings for this user and populate trip details
    const bookings = await Booking.find({ user: userId })
      .populate('trip', 'title country image price days rating')
      .sort({ created: -1 });
    
    // Format bookings for response
    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      bookingReference: booking.bookingReference,
      trip: {
        id: booking.trip._id,
        title: booking.trip.title,
        country: booking.trip.country,
        image: booking.trip.image,
        price: booking.trip.price,
        days: booking.trip.days,
        rating: booking.trip.rating
      },
      travelers: booking.travelers,
      date: booking.date,
      status: booking.status,
      totalPrice: booking.totalPrice,
      created: booking.created
    }));
    
    res.status(200).json({
      bookings: formattedBookings
    });
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
    
    // Find booking and populate trip details
    const booking = await Booking.findById(bookingId)
      .populate('trip')
      .populate('user', 'name email');
    
    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    // Format booking for response
    const formattedBooking = {
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
    };
    
    res.status(200).json({
      booking: formattedBooking
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
    
    // Find booking
    const booking = await Booking.findById(bookingId).populate('trip').populate('user');
    
    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to cancel this booking
    if (booking.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    // Send cancellation email
    await sendCancellationEmail(booking, booking.trip, booking.user);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: {
        id: booking._id,
        status: booking.status
      }
    });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};

// Send cancellation email
const sendCancellationEmail = async (booking, trip, user) => {
  try {
    // Format date for display
    const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
    
    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
          }
          .header {
            background-color: #4b5563;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
          }
          .booking-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Cancellation</h1>
          </div>
          <div class="content">
            <p>Dear ${user.name},</p>
            <p>Your booking for <strong>${trip.title}</strong> has been cancelled as requested.</p>
            
            <div class="booking-details">
              <h3>Booking Details:</h3>
              <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
              <p><strong>Destination:</strong> ${trip.country}</p>
              <p><strong>Travel Date:</strong> ${formattedDate}</p>
              <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
              <p><strong>Status:</strong> Cancelled</p>
            </div>
            
            <p>If you have any questions about this cancellation or would like to book another trip, please contact our customer service team at support@travelapp.com or call us at +1-800-TRAVEL.</p>
            
            <p>We hope to see you on another adventure soon!</p>
            
            <p>Regards,<br>The Travel Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>© ${new Date().getFullYear()} Travel App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Email options
    const mailOptions = {
      from: `"Travel App" <${process.env.EMAIL_USER}>`,
      to: booking.contactEmail,
      subject: `Booking Cancellation: ${trip.title} (Ref: ${booking.bookingReference})`,
      html: emailHtml
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    // Don't throw the error to prevent cancellation process from failing
  }
};
