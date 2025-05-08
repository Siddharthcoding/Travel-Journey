// src/controllers/tripController.js
import { Trip } from '../models/Trip.js';
import { User } from '../models/User.js';

// Get all trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ created: -1 });
    res.json({ trips });
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ message: 'Error fetching trips' });
  }
};

// Get trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ trip });
  } catch (err) {
    console.error('Error fetching trip details:', err);
    res.status(500).json({ message: 'Error fetching trip details' });
  }
};

// Create new trip
export const createTrip = async (req, res) => {
  try {
    const { title, country, image, subtitle, description,
            category, days, price, priceValue, itinerary } = req.body;
    const trip = new Trip({
      title, country, image, subtitle, description,
      category, days, price, priceValue, itinerary,
      author: req.user.id
    });
    await trip.save();
    res.status(201).json({ message: 'Trip created successfully', trip });
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ message: 'Error creating trip' });
  }
};

// Update trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this trip' });
    }
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Trip updated successfully', trip: updated });
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).json({ message: 'Error updating trip' });
  }
};

// Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this trip' });
    }
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).json({ message: 'Error deleting trip' });
  }
};

// Get trips by category
export const getTripsByCategory = async (req, res) => {
  try {
    const trips = await Trip.find({ category: req.params.category }).sort({ created: -1 });
    res.json({ trips });
  } catch (err) {
    console.error('Error fetching by category:', err);
    res.status(500).json({ message: 'Error fetching trips by category' });
  }
};

// Get trips by country
export const getTripsByCountry = async (req, res) => {
  try {
    const trips = await Trip.find({ country: req.params.country }).sort({ created: -1 });
    res.json({ trips });
  } catch (err) {
    console.error('Error fetching by country:', err);
    res.status(500).json({ message: 'Error fetching trips by country' });
  }
};

// Search trips
export const searchTrips = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ message: 'Search query is required' });
    const trips = await Trip.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { country: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }).sort({ created: -1 });
    res.json({ trips });
  } catch (err) {
    console.error('Error searching trips:', err);
    res.status(500).json({ message: 'Error searching trips' });
  }
};

// Toggle save/like for a trip
export const toggleSaveTrip = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const idx = user.bookings.indexOf(req.params.id);
    const saved = idx === -1;
    if (saved) user.bookings.push(req.params.id);
    else user.bookings.splice(idx, 1);

    await user.save();
    res.json({ success: true, saved });
  } catch (err) {
    console.error('Error toggling save trip:', err);
    res.status(500).json({ message: 'Error saving trip' });
  }
};
