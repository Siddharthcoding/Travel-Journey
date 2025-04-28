import { Trip } from '../models/Trip.js';

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
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    res.json({ trip });
  } catch (err) {
    console.error('Error fetching trip:', err);
    res.status(500).json({ message: 'Error fetching trip details' });
  }
};

// Create new trip
export const createTrip = async (req, res) => {
  try {
    const {
      title,
      country,
      image,
      subtitle,
      description,
      category,
      days,
      price,
      priceValue,
      itinerary
    } = req.body;
    
    // Create new trip
    const trip = new Trip({
      title,
      country,
      image,
      subtitle,
      description,
      category,
      days,
      price,
      priceValue,
      itinerary,
      author: req.user.id
    });
    
    await trip.save();
    
    res.status(201).json({
      message: 'Trip created successfully',
      trip
    });
  } catch (err) {
    console.error('Create trip error:', err);
    res.status(500).json({ message: 'Error creating trip' });
  }
};

// Update trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    // Check if trip exists
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    // Check if user is the author
    if (trip.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this trip' });
    }
    
    // Update trip fields
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json({
      message: 'Trip updated successfully',
      trip: updatedTrip
    });
  } catch (err) {
    console.error('Update trip error:', err);
    res.status(500).json({ message: 'Error updating trip' });
  }
};

// Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    // Check if trip exists
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    // Check if user is the author
    if (trip.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this trip' });
    }
    
    await Trip.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Delete trip error:', err);
    res.status(500).json({ message: 'Error deleting trip' });
  }
};

// Get trips by category
export const getTripsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const trips = await Trip.find({ category }).sort({ created: -1 });
    
    res.json({ trips });
  } catch (err) {
    console.error('Error fetching trips by category:', err);
    res.status(500).json({ message: 'Error fetching trips' });
  }
};

// Get trips by country
export const getTripsByCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const trips = await Trip.find({ country }).sort({ created: -1 });
    
    res.json({ trips });
  } catch (err) {
    console.error('Error fetching trips by country:', err);
    res.status(500).json({ message: 'Error fetching trips' });
  }
};

// Search trips
export const searchTrips = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const trips = await Trip.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { country: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ created: -1 });
    
    res.json({ trips });
  } catch (err) {
    console.error('Search trips error:', err);
    res.status(500).json({ message: 'Error searching trips' });
  }
}; 