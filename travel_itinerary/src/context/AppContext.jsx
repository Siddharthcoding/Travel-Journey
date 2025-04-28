import React, { createContext, useState, useContext, useEffect, useMemo } from "react";

// Sample trip data with prices in consistent format
const initialTrips = [
  {
    id: 1,
    title: "Rio de Janeiro",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&auto=format",
    rating: 5.0,
    reviews: 143,
    description: "One of Brazil's most iconic cities, renowned for its beaches and mountains.",
    category: "South America",
    liked: false,
    price: "$489",
    priceValue: 489
  },
  {
    id: 2,
    title: "Iconic Brazil",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?q=80&auto=format",
    rating: 4.6,
    reviews: 56,
    description: "8 days tour exploring Brazil's incredible landscapes and culture.",
    category: "South America",
    liked: false,
    price: "$659",
    priceValue: 659
  },
  {
    id: 3,
    title: "Beach Paradise",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1629806178135-880c184ae5eb?q=80&auto=format",
    rating: 4.8,
    reviews: 128,
    description: "Discover the most beautiful beaches along Brazil's coastline.",
    category: "South America",
    liked: false,
    price: "$529",
    priceValue: 529
  },
  {
    id: 4,
    title: "Bangkok Explorer",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&auto=format",
    rating: 4.7,
    reviews: 89,
    description: "Experience the vibrant culture and delicious cuisine of Bangkok.",
    category: "Asia",
    liked: false,
    price: "$449",
    priceValue: 449
  },
  {
    id: 5,
    title: "Paris Getaway",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&auto=format",
    rating: 4.9,
    reviews: 215,
    description: "Explore the romantic streets and iconic landmarks of Paris.",
    category: "Europe",
    liked: false,
    price: "$789",
    priceValue: 789
  },
  {
    id: 6,
    title: "Nairobi Safari",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&auto=format",
    rating: 4.8,
    reviews: 64,
    description: "Witness the incredible wildlife of Kenya on this safari adventure.",
    category: "Africa",
    liked: false,
    price: "$899",
    priceValue: 899
  }
];

// Trip details data
const tripDetails = {
  1: {
    days: 7,
    subtitle: "Wed, Oct 21 - Wed, Oct 28",
    itinerary: [
      {
        day: 1,
        title: "Arrival to Rio de Janeiro",
        activities: [
          { time: "Morning", description: "Arrive in Rio de Janeiro and transfer to your hotel" },
          { time: "Afternoon", description: "Free time to relax or explore the nearby area" },
          { time: "Evening", description: "Welcome dinner at a traditional Brazilian restaurant" }
        ]
      },
      {
        day: 2,
        title: "Rio de Janeiro Highlights",
        activities: [
          { time: "Morning", description: "Visit Christ the Redeemer statue" },
          { time: "Afternoon", description: "Tour of Sugarloaf Mountain with cable car ride" },
          { time: "Evening", description: "Dinner and Samba show" }
        ]
      }
    ]
  },
  // Add details for other trips as needed
};

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
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('trips');
    return savedTrips ? JSON.parse(savedTrips) : initialTrips;
  });

  // Selected category state
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort state with proper sorting logic
  const [sortBy, setSortBy] = useState("recommended");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Save trips to localStorage when changed
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);
  
  // Use useMemo to compute filtered and sorted trips only when dependencies change
  const processedTrips = useMemo(() => {
    console.log("Recomputing processed trips with sort:", sortBy);
    
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
  }, [trips, activeCategory, searchQuery, sortBy]);
  
  // Toggle like status for a trip
  const toggleLike = (tripId) => {
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, liked: !trip.liked } : trip
    ));
  };
  
  // Get details for a specific trip
  const getTripDetails = (tripId) => {
    const trip = trips.find(t => t.id === Number(tripId)) || {};
    const details = tripDetails[tripId] || { days: 0, subtitle: "", itinerary: [] };
    return { ...trip, ...details };
  };
  
  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Toggle menus
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const closeUserMenu = () => setShowUserMenu(false);
  
  const toggleMainMenu = () => setShowMainMenu(!showMainMenu);
  const closeMainMenu = () => setShowMainMenu(false);
  
  // Debug sorting
  useEffect(() => {
    console.log("Sort by changed to:", sortBy);
  }, [sortBy]);
  
  return (
    <AppContext.Provider value={{
      user,
      trips: processedTrips, // Use the memoized processed trips
      activeCategory,
      setActiveCategory,
      searchQuery,
      handleSearch,
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
