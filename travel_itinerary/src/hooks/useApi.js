import { useAuth } from '../context/AuthContext';

export default function useApi() {
  const { getAuthHeader, logout } = useAuth();
  
  async function authFetch(url, options = {}) {
    try {
      // Add auth headers
      const headers = {
        ...options.headers,
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      };
      
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      // If unauthorized, logout
      if (response.status === 401) {
        logout();
        throw new Error('Session expired. Please login again.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  
  return { authFetch };
} 