import React, { useState, useEffect } from "react";
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
    sortBy
  } = useAppContext();
  
  const [showSortMenu, setShowSortMenu] = useState(false);
  const categories = ["All", "Asia", "Europe", "South America", "North America", "Africa"];
  
  // Debug - log trips when they change or sort changes
  useEffect(() => {
    console.log("Current sort:", sortBy);
    console.log("Trips in the component:", trips.map(t => `${t.title} - $${t.priceValue}`));
  }, [trips, sortBy]);
  
  // Map sort types to display names
  const sortNames = {
    "recommended": "Recommended",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    "rating": "Highest Rated",
    "reviews": "Most Reviewed"
  };
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-4">
        <h2 className="text-2xl font-bold">Hello, {user.name}</h2>
        <p className="text-gray-500">Welcome to TripGlide</p>
        
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
              <span className="font-medium ml-1 text-black">
                {sortNames[sortBy]}
              </span>
            </span>
          </motion.div>
        )}
        
        {/* Categories */}
        <h3 className="text-lg font-semibold mt-6 mb-3">Select your next trip</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {categories.map(category => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Trips */}
      <div className="mt-6 px-5">
        {trips.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No trips found matching your criteria</p>
          </div>
        ) : (
          trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-md dark:shadow-dark-shadow mb-5"
            >
              <div className="relative">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-48 object-cover"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 bg-white/30 backdrop-blur-md rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(trip.id);
                  }}
                >
                  <motion.svg 
                    animate={trip.liked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${trip.liked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </motion.svg>
                </motion.button>
                <div 
                  className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full py-3 px-4"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className="text-white font-semibold text-xs">{trip.country}</div>
                  <div className="text-white font-bold text-xl">{trip.title}</div>
                  <div className="flex items-center text-white space-x-1">
                    <span>⭐</span>
                    <span className="text-sm">{trip.rating}</span>
                    <span className="text-xs text-gray-300">({trip.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{trip.description}</p>
                <div className="flex justify-between items-center mt-3">
                  {trip.price && <div className="text-emerald-600 font-semibold">{trip.price}</div>}
                  <motion.button 
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-auto flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 w-10 h-10"
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {/* Sort Menu */}
      <SortMenu isOpen={showSortMenu} onClose={() => setShowSortMenu(false)} />
      
      {/* Bottom Navigation */}
      <BottomNav active="home" />
    </div>
  );
} 