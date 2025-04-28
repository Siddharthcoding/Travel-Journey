import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { tripAPI } from "../services/api";

// Create context
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState({
    name: "Vanessa",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    savedTrips: []
  });
  
  // Trips state
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected category state
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort state with proper sorting logic
  const [sortBy, setSortBy] = useState("recommended");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const { trips: fetchedTrips } = await tripAPI.getAllTrips();
        // Add liked property to each trip
        const tripsWithLiked = fetchedTrips.map(trip => ({
          ...trip,
          liked: false
        }));
        setTrips(tripsWithLiked);
        setError(null);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError('Failed to load trips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, []);
  
  // Use useMemo to compute filtered and sorted trips only when dependencies change
  const processedTrips = useMemo(() => {
    // If still loading or error, return empty array
    if (loading || error) return [];
    
    // First, filter trips
    const filtered = trips.filter(trip => {
      const matchesCategory = activeCategory === "All" || trip.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        trip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    // Then sort the filtered trips
    return filtered.sort((a, b) => {
      switch(sortBy) {
        case "price-low":
          return a.priceValue - b.priceValue;
        case "price-high": 
          return b.priceValue - a.priceValue;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "recommended":
        default:
          // For recommended, prioritize high ratings and reasonable prices
          const aScore = a.rating * 20 - (a.priceValue / 100);
          const bScore = b.rating * 20 - (b.priceValue / 100);
          return bScore - aScore;
      }
    });
  }, [trips, activeCategory, searchQuery, sortBy, loading, error]);
  
  // Toggle like status for a trip
  const toggleLike = (tripId) => {
    setTrips(trips.map(trip => 
      trip._id === tripId ? { ...trip, liked: !trip.liked } : trip
    ));
  };
  
  // Get details for a specific trip
  const getTripDetails = async (tripId) => {
    try {
      setLoading(true);
      const { trip } = await tripAPI.getTripById(tripId);
      return { ...trip, liked: trips.find(t => t._id === tripId)?.liked || false };
    } catch (err) {
      console.error('Error fetching trip details:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Search trips with API
  const searchTripsWithAPI = async (query) => {
    try {
      setLoading(true);
      const { trips: searchResults } = await tripAPI.searchTrips(query);
      return searchResults;
    } catch (err) {
      console.error('Error searching trips:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle menus
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const closeUserMenu = () => setShowUserMenu(false);
  
  const toggleMainMenu = () => setShowMainMenu(!showMainMenu);
  const closeMainMenu = () => setShowMainMenu(false);
  
  return (
    <AppContext.Provider value={{
      user,
      trips: processedTrips,
      loading,
      error,
      activeCategory,
      setActiveCategory,
      searchQuery,
      handleSearch,
      searchTripsWithAPI,
      toggleLike,
      getTripDetails,
      sortBy,
      setSortBy,
      showUserMenu,
      toggleUserMenu,
      closeUserMenu,
      showMainMenu,
      toggleMainMenu,
      closeMainMenu
    }}>
      {children}
    </AppContext.Provider>
  );
};
