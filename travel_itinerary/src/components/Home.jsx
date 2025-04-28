import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import BottomNav from "./BottomNav";
import SortMenu from "./SortMenu";

export default function Home() {
  const navigate = useNavigate();
  const { 
    user, 
    trips, 
    activeCategory, 
    setActiveCategory, 
    handleSearch,
    searchQuery,
    toggleLike,
    sortBy,
    loading
  } = useAppContext();
  
  const [showSortMenu, setShowSortMenu] = useState(false);
  const categories = ["All", "Asia", "Europe", "South America", "North America", "Africa", "Oceania"];
  
  // Group trips by continent
  const tripsByContinent = useMemo(() => {
    const grouped = {};
    
    // Initialize all continents with empty arrays
    categories.forEach(category => {
      if (category !== "All") {
        grouped[category] = [];
      }
    });
    
    // Add trips to their respective continent groups
    trips.forEach(trip => {
      if (trip.category && grouped[trip.category]) {
        grouped[trip.category].push(trip);
      }
    });
    
    return grouped;
  }, [trips, categories]);
  
  // Map sort types to display names
  const sortNames = {
    "recommended": "Recommended",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    "rating": "Highest Rated",
    "reviews": "Most Reviewed"
  };
  
  // Render a single trip card
  const renderTripCard = (trip, index) => (
    <motion.div
      key={trip._id || trip.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-md min-w-[270px] flex-shrink-0 mx-2 mb-2"
    >
      <div className="relative">
        <img 
          src={trip.image} 
          alt={trip.title} 
          className="w-full h-48 object-cover"
          onClick={() => navigate(`/trip/${trip._id || trip.id}`)}
        />
        <button 
          className="absolute top-3 right-3 bg-white/30 backdrop-blur-md rounded-full p-2"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(trip._id || trip.id);
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${trip.liked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div 
          className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full py-3 px-4"
          onClick={() => navigate(`/trip/${trip._id || trip.id}`)}
        >
          <div className="text-white font-semibold text-xs uppercase tracking-wider">{trip.country}</div>
          <div className="text-white font-bold text-xl">{trip.title}</div>
          <div className="flex items-center text-white space-x-1">
            <span>⭐</span>
            <span className="text-sm font-medium">{trip.rating}</span>
            <span className="text-xs text-gray-300 font-light italic">({trip.reviews} reviews)</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{trip.description}</p>
        <div className="flex justify-between items-center mt-3">
          {trip.price && (
            <div className="text-emerald-600 dark:text-emerald-400 font-black text-lg tracking-tight">
              {trip.price}
            </div>
          )}
          <motion.button 
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
            className="ml-auto flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 w-10 h-10"
            onClick={() => navigate(`/trip/${trip._id || trip.id}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-4">
        <div className="border-l-4 border-emerald-500 pl-3 mb-6">
          <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">Welcome Back</p>
          <h2 className="text-3xl font-extrabold tracking-tight">
            <span className="text-black dark:text-white">Hello, </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black italic">{user.name}</span>
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="h-px w-6 bg-emerald-500/40"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light italic">Discover your next adventure</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search destinations, countries, experiences..." 
            className="w-full py-3 pl-10 pr-4 bg-white dark:bg-dark-card rounded-full border border-gray-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-2"
            onClick={() => setShowSortMenu(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          </motion.button>
        </div>
        
        {/* Sort menu indicator with animation */}
        {sortBy !== "recommended" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center justify-end"
          >
            <span className="text-xs flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Sorted by: 
              <span className="font-medium ml-1 text-black dark:text-white">
                {sortNames[sortBy]}
              </span>
            </span>
          </motion.div>
        )}
        
        {/* Categories */}
        <div className="mt-8 mb-3 flex items-center justify-between">
          <h3 className="text-base uppercase tracking-wide font-bold text-gray-800 dark:text-gray-200">
            <span className="text-emerald-600 dark:text-emerald-400 mr-1">—</span>
            Explore Categories
          </h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">View All</p>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {categories.map(category => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {/* No results */}
      {!loading && trips.length === 0 && (
        <div className="text-center py-10 px-5">
          <p className="text-gray-500 italic">No trips found matching your criteria</p>
        </div>
      )}
      
      {/* Filtered trips (when category is selected) */}
      {!loading && activeCategory !== "All" && trips.length > 0 && (
        <div className="mt-8 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold tracking-tight">
              <span className="italic font-light">Exploring</span> 
              <span className="text-emerald-600 dark:text-emerald-400 ml-1">{activeCategory}</span>
            </h2>
          </div>
          
          <div className="space-y-5">
            {trips.map((trip, index) => renderTripCard(trip, index))}
          </div>
        </div>
      )}
      
      {/* All continents (when no category filter) */}
      {!loading && activeCategory === "All" && trips.length > 0 && (
        <div className="mt-6">
          {/* Featured Destinations */}
          <div className="px-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold tracking-tight">
                <span className="italic font-light">Featured</span> 
                <span className="text-emerald-600 dark:text-emerald-400 ml-1">Destinations</span>
              </h2>
            </div>
            
            <div className="space-y-5">
              {trips.slice(0, 3).map((trip, index) => renderTripCard(trip, index))}
            </div>
          </div>
          
          {/* Continent sections */}
          {Object.entries(tripsByContinent).map(([continent, continentTrips]) => {
            if (continentTrips.length === 0) return null;
            
            return (
              <div key={continent} className="mb-8">
                <div className="px-5 mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    <span className="text-emerald-600 dark:text-emerald-400">{continent}</span>
                  </h2>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(continent)}
                    className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center"
                  >
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
                
                <div className="overflow-x-auto flex -mx-5 px-3 pb-4 scrollbar-hide">
                  {continentTrips.map((trip, index) => renderTripCard(trip, index))}
                </div>
              </div>
            );
          })}
          
          {/* Explore by Interest section */}
          <div className="px-5 mt-6 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold tracking-tight">
                <span className="italic font-light">Explore by</span> 
                <span className="text-emerald-600 dark:text-emerald-400 ml-1">Interest</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Beach Getaways", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&auto=format" },
                { name: "Mountain Adventures", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&auto=format" },
                { name: "City Breaks", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&auto=format" },
                { name: "Cultural Tours", image: "https://images.unsplash.com/photo-1543470373-e055b73a8f29?q=80&auto=format" }
              ].map((interest, index) => (
                <motion.div
                  key={interest.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden h-32"
                >
                  <img 
                    src={interest.image}
                    alt={interest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white font-bold text-center">{interest.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Sort Menu */}
      <SortMenu isOpen={showSortMenu} onClose={() => setShowSortMenu(false)} />
      
      {/* Bottom Navigation */}
      <BottomNav active="home" />
    </div>
  );
} 