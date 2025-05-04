import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { tripAPI } from "../services/api";
import { useAuth } from "./AuthContext";

// Sample trip data as fallback
const sampleTrips = [
  // South America trips
  {
    _id: "sa1",
    title: "Rio de Janeiro",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&auto=format",
    subtitle: "Wed, Oct 21 - Wed, Oct 28",
    description: "One of Brazil's most iconic cities, renowned for its beaches and mountains.",
    category: "South America",
    days: 7,
    rating: 5.0,
    reviews: 143,
    price: "$489",
    priceValue: 489,
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Tour",
        activities: [
          { time: "09:00 AM", description: "Arrival and hotel check-in" },
          { time: "12:00 PM", description: "Lunch at a local restaurant" },
          { time: "02:00 PM", description: "Guided city tour" }
        ]
      },
      {
        day: 2,
        title: "Christ the Redeemer & Sugarloaf",
        activities: [
          { time: "09:00 AM", description: "Visit Christ the Redeemer" },
          { time: "01:00 PM", description: "Lunch with a view" },
          { time: "03:00 PM", description: "Cable car to Sugarloaf Mountain" }
        ]
      }
    ]
  },
  {
    _id: "sa2",
    title: "Machu Picchu Explorer",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&auto=format",
    subtitle: "Tue, Nov 5 - Thu, Nov 14",
    description: "Discover the ancient wonders of Machu Picchu and the Sacred Valley.",
    category: "South America",
    days: 9,
    rating: 4.9,
    reviews: 178,
    price: "$1,199",
    priceValue: 1199,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cusco",
        activities: [
          { time: "10:00 AM", description: "Arrival and hotel check-in" },
          { time: "02:00 PM", description: "Cusco city tour" }
        ]
      }
    ]
  },
  
  // Asia trips
  {
    _id: "as1",
    title: "Bangkok Explorer",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&auto=format",
    subtitle: "Wed, Jan 15 - Wed, Jan 22",
    description: "Experience the vibrant culture and delicious cuisine of Bangkok.",
    category: "Asia",
    days: 7,
    rating: 4.7,
    reviews: 89,
    price: "$449",
    priceValue: 449,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Temple Tour",
        activities: [
          { time: "09:00 AM", description: "Arrival and hotel check-in" },
          { time: "01:00 PM", description: "Visit Grand Palace" }
        ]
      }
    ]
  },
  {
    _id: "as2",
    title: "Kyoto Cultural Journey",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&auto=format",
    subtitle: "Sat, Apr 1 - Sat, Apr 8",
    description: "Immerse yourself in Japan's traditional culture in historic Kyoto.",
    category: "Asia",
    days: 7,
    rating: 4.9,
    reviews: 132,
    price: "$1,299",
    priceValue: 1299,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Fushimi Inari",
        activities: [
          { time: "10:00 AM", description: "Arrival and hotel check-in" },
          { time: "02:00 PM", description: "Visit Fushimi Inari Shrine" }
        ]
      }
    ]
  },
  
  // Europe trips
  {
    _id: "eu1",
    title: "Paris Getaway",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&auto=format",
    subtitle: "Sat, Feb 14 - Sat, Feb 21",
    description: "Explore the romantic streets and iconic landmarks of Paris.",
    category: "Europe",
    days: 7,
    rating: 4.9,
    reviews: 215,
    price: "$789",
    priceValue: 789,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Eiffel Tower",
        activities: [
          { time: "09:00 AM", description: "Arrival and hotel check-in" },
          { time: "02:00 PM", description: "Visit Eiffel Tower" },
          { time: "07:00 PM", description: "Seine River dinner cruise" }
        ]
      },
      {
        day: 2,
        title: "Louvre & Notre Dame",
        activities: [
          { time: "09:00 AM", description: "Visit the Louvre Museum" },
          { time: "02:00 PM", description: "Notre Dame Cathedral" }
        ]
      }
    ]
  },
  {
    _id: "eu2",
    title: "Greek Island Hopping",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&auto=format",
    subtitle: "Sun, Jul 9 - Wed, Jul 19",
    description: "Experience the stunning beauty of Santorini, Mykonos, and Athens.",
    category: "Europe",
    days: 10,
    rating: 4.7,
    reviews: 148,
    price: "$1,299",
    priceValue: 1299,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Athens",
        activities: [
          { time: "10:00 AM", description: "Arrival and hotel check-in" },
          { time: "02:00 PM", description: "Acropolis tour" }
        ]
      }
    ]
  },
  
  // Africa trips
  {
    _id: "af1",
    title: "Nairobi Safari",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&auto=format",
    subtitle: "Mon, Mar 10 - Mon, Mar 17",
    description: "Witness the incredible wildlife of Kenya on this safari adventure.",
    category: "Africa",
    days: 7,
    rating: 4.8,
    reviews: 64,
    price: "$899",
    priceValue: 899,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Nairobi National Park",
        activities: [
          { time: "09:00 AM", description: "Arrival and hotel check-in" },
          { time: "02:00 PM", description: "Nairobi National Park visit" }
        ]
      }
    ]
  },
  
  // North America trips
  {
    _id: "na1",
    title: "New York City Weekend",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&auto=format",
    subtitle: "Fri, Oct 7 - Mon, Oct 10",
    description: "Experience the energy and attractions of the Big Apple in a long weekend.",
    category: "North America",
    days: 3,
    rating: 4.6,
    reviews: 128,
    price: "$649",
    priceValue: 649,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Times Square",
        activities: [
          { time: "09:00 AM", description: "Arrival and hotel check-in" },
          { time: "02:00 PM", description: "Times Square exploration" }
        ]
      }
    ]
  },
  
  // Oceania trips
  {
    _id: "oc1",
    title: "Sydney & Great Barrier Reef",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&auto=format",
    subtitle: "Sat, Feb 4 - Thu, Feb 16",
    description: "Experience the best of Sydney and the world's largest coral reef system.",
    category: "Oceania",
    days: 12,
    rating: 4.8,
    reviews: 95,
    price: "$2,799",
    priceValue: 2799,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sydney",
        activities: [
          { time: "08:00 AM", description: "Arrival and hotel check-in" },
          { time: "01:00 PM", description: "Sydney Opera House tour" }
        ]
      }
    ]
  }
];

// Create context
export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  // User state
  const [user, setUser] = useState({
    name: "Guest",
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    savedTrips: []
  });
  
  // Update user state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUser({
        ...currentUser,
        savedTrips: currentUser.savedTrips || []
      });
    }
  }, [currentUser]);
  
  // Trips state
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected category state
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort state
  const [sortBy, setSortBy] = useState("recommended");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const { trips: fetchedTrips } = await tripAPI.getAllTrips();
        
        if (fetchedTrips && fetchedTrips.length > 0) {
          const tripsWithLiked = fetchedTrips.map(trip => ({
            ...trip,
            liked: user?.savedTrips?.includes(trip._id) || false
          }));
          setTrips(tripsWithLiked);
          setError(null);
        } else {
          console.log("No trips returned from API, using sample data");
          setTrips(sampleTrips);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching trips:', err);
        // Use sample data instead of showing error
        console.log("Error fetching trips, using sample data instead");
        setTrips(sampleTrips);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, [user]);
  
  // Filtered and sorted trips
  const processedTrips = useMemo(() => {
    if (loading || error) return [];
    
    // Filter trips
    const filtered = trips.filter(trip => {
      const matchesCategory = activeCategory === "All" || trip.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        trip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    // Sort filtered trips
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
          const aScore = a.rating * 20 - (a.priceValue / 100);
          const bScore = b.rating * 20 - (b.priceValue / 100);
          return bScore - aScore;
      }
    });
  }, [trips, activeCategory, searchQuery, sortBy, loading, error]);
  
  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Search trips with API
  const searchTripsWithAPI = async (query) => {
    try {
      setLoading(true);
      try {
        const { trips: searchResults } = await tripAPI.searchTrips(query);
        return searchResults;
      } catch (err) {
        // If API search fails, filter sample data
        console.log("API search failed, using sample data for search");
        return sampleTrips.filter(trip => 
          trip.title.toLowerCase().includes(query.toLowerCase()) ||
          trip.country.toLowerCase().includes(query.toLowerCase()) ||
          trip.description.toLowerCase().includes(query.toLowerCase()) ||
          trip.category.toLowerCase().includes(query.toLowerCase())
        );
      }
    } catch (err) {
      console.error('Error searching trips:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle like status for a trip
  const toggleLike = async (tripId) => {
    if (!user) return;
    
    try {
      // Update local state immediately
      setTrips(trips.map(trip => 
        trip._id === tripId ? { ...trip, liked: !trip.liked } : trip
      ));
      
      // Try API call but don't wait for it to complete
      tripAPI.toggleSaveTrip(tripId).catch(err => {
        console.log("API call failed, but continuing with UI update");
      });
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };
  
  // Get details for a specific trip
  const getTripDetails = async (tripId) => {
    try {
      // First check if we already have the trip in our state
      const localTrip = trips.find(t => t._id === tripId);
      if (localTrip) {
        return localTrip;
      }
      
      // Then try to get from API
      try {
        const { trip } = await tripAPI.getTripById(tripId);
        if (trip) {
          return { ...trip, liked: user?.savedTrips?.includes(trip._id) || false };
        }
      } catch (apiErr) {
        console.log("API call for trip details failed, checking sample data");
      }
      
      // Finally check sample data
      const sampleTrip = sampleTrips.find(t => t._id === tripId);
      if (sampleTrip) {
        return sampleTrip;
      }
      
      return null;
    } catch (err) {
      console.error('Error fetching trip details:', err);
      return null;
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
