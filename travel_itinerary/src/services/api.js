import axios from 'axios';

// Define API base URL - Fix for Vite environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error logging in' };
    }
  },
  
  signup: async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error signing up' };
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching user data' };
    }
  }
};

// Trip API
export const tripAPI = {
  getAllTrips: async () => {
    try {
      const response = await api.get('/trips');
      return response.data;
    } catch (error) {
      console.error("Error fetching trips:", error);
      return { trips: [] };
    }
  },  
  
  getTripById: async (id) => {
    try {
      const response = await api.get(`/trips/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching trip details:", error);
      throw error.response?.data || { message: 'Error fetching trip details' };
    }
  },
  
  searchTrips: async (query) => {
    try {
      const response = await api.get(`/trips/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error searching trips' };
    }
  },
  
  getTripsByCategory: async (category) => {
    try {
      const response = await api.get(`/trips/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching trips by category' };
    }
  },
  
  getTripsByCountry: async (country) => {
    try {
      const response = await api.get(`/trips/country/${country}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching trips by country' };
    }
  },
  
  createTrip: async (tripData) => {
    try {
      const response = await api.post('/trips', tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating trip' };
    }
  },
  
  updateTrip: async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating trip' };
    }
  },
  
  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/trips/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting trip' };
    }
  },
  
  toggleSaveTrip: async (tripId) => {
    try {
      const response = await api.post(`/trips/${tripId}/toggle-save`);
      return response.data;
    } catch (error) {
      console.error("Error toggling save trip:", error);
      throw error.response?.data || { message: 'Error saving trip' };
    }
  },
  
  bookTrip: async (tripId, bookingData) => {
    try {
      const response = await api.post(`/trips/${tripId}/book`, bookingData);
      return response.data;
    } catch (error) {
      console.error("Error booking trip:", error);
      throw error.response?.data || { message: 'Error booking trip' };
    }
  },
  
  getUserBookings: async () => {
    try {
      const response = await api.get('/trips/bookings');
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error.response?.data || { message: 'Error fetching bookings' };
    }
  },
  
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.post(`/trips/bookings/${bookingId}/cancel`);
      return response.data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error.response?.data || { message: 'Error cancelling booking' };
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating profile' };
    }
  },
  
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error changing password' };
    }
  },
  
  updateNotifications: async (preferences) => {
    try {
      const response = await api.put('/auth/notifications', { preferences });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating notification preferences' };
    }
  },
  
  updatePaymentMethod: async (paymentData) => {
    try {
      const response = await api.put('/auth/payment-method', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating payment method' };
    }
  }
};

export default api;
