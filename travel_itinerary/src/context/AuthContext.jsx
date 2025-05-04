import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // API URL from environment or default
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when they login
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  // Signup function - fixed parameter order to match component calls
  async function signup(name, email, password) {
  setLoading(true);
  setError("");
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password
    });
    setCurrentUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    if (response.data.user.token) {
      localStorage.setItem('token', response.data.user.token); // <-- ADD THIS LINE
    }
    return response.data.user;
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to signup');
    throw err;
  } finally {
    setLoading(false);
  }
}

  

  // Login function
  async function login(email, password) {
  setLoading(true);
  setError("");
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    setCurrentUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    if (response.data.user.token) {
      localStorage.setItem('token', response.data.user.token); // <-- ADD THIS LINE
    }
    return response.data.user;
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to login');
    throw err;
  } finally {
    setLoading(false);
  }
}



  // Logout function
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // <-- ADD THIS
  }
  
  
  // Update user profile
  async function updateUserProfile(userData) {
    setLoading(true);
    setError("");
    
    try {
      // Get token from current user
      const token = currentUser?.token;
      
      if (!token) {
        throw new Error("Not authenticated");
      }
      
      const response = await axios.put(
        `${API_URL}/auth/profile`, 
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update current user with new data
      setCurrentUser(prev => ({
        ...prev,
        ...response.data.user
      }));
      
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }
  
  // Change password
  async function changePassword(currentPassword, newPassword) {
    setLoading(true);
    setError("");
    
    try {
      // Get token from current user
      const token = currentUser?.token;
      
      if (!token) {
        throw new Error("Not authenticated");
      }
      
      const response = await axios.put(
        `${API_URL}/auth/change-password`, 
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  }
  
  // Update notification preferences
  async function updateNotificationPreferences(preferences) {
    setLoading(true);
    setError("");
    
    try {
      // Get token from current user
      const token = currentUser?.token;
      
      if (!token) {
        throw new Error("Not authenticated");
      }
      
      const response = await axios.put(
        `${API_URL}/auth/notifications`, 
        { preferences },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update current user with new preferences
      setCurrentUser(prev => ({
        ...prev,
        notificationPreferences: preferences
      }));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update notification preferences');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateUserProfile,
    changePassword,
    updateNotificationPreferences,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
