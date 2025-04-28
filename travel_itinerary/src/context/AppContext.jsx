import React, { createContext, useState, useContext, useEffect } from "react";

// Sample trip data
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
    price: "$489/person"
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
    price: "$659/person"
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
    price: "$529/person"
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
    price: "$449/person"
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
    price: "$789/person"
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
    price: "$899/person"
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
  const [activeCategory, setActiveCategory] = useState("South America");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // Add sort state
  const [sortBy, setSortBy] = useState("recommended");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Save trips to localStorage when changed
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);
  
  // Filter trips by category and search query
  const filteredTrips = trips.filter(trip => {
    const matchesCategory = activeCategory === "All" || trip.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      trip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
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
  
  // Add trip to saved trips
  const saveTrip = (tripId) => {
    if (!user.savedTrips.includes(tripId)) {
      setUser({
        ...user,
        savedTrips: [...user.savedTrips, tripId]
      });
    }
  };
  
  // Remove trip from saved trips
  const unsaveTrip = (tripId) => {
    setUser({
      ...user,
      savedTrips: user.savedTrips.filter(id => id !== tripId)
    });
  };
  
  return (
    <AppContext.Provider value={{
      user,
      trips: filteredTrips,
      activeCategory,
      setActiveCategory,
      searchQuery,
      handleSearch,
      toggleLike,
      getTripDetails,
      saveTrip,
      unsaveTrip
    }}>
      {children}
    </AppContext.Provider>
  );
};
