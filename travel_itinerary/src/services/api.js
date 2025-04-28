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
      throw error.response?.data || { message: 'Error fetching trips' };
    }
  },
  
  getTripById: async (id) => {
    try {
      const response = await api.get(`/trips/${id}`);
      return response.data;
    } catch (error) {
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
  }
};

export default api; 