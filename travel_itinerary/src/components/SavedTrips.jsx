import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import BottomNav from "./BottomNav";

export default function SavedTrips() {
  const navigate = useNavigate();
  const { trips, toggleLike } = useAppContext();
  
  // Filter liked trips
  const savedTrips = trips.filter(trip => trip.liked);
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-4">
        <div className="border-b border-emerald-200 dark:border-emerald-800 pb-3 mb-4">
          <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Saved Collection
          </p>
          <h2 className="text-3xl font-black tracking-tight flex items-baseline">
            <span className="mr-1">FAVORITE</span>
            <span className="text-emerald-600 dark:text-emerald-400 italic">Destinations</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light italic mt-1">Your curated travel wishlist</p>
        </div>
      </div>
      
      {/* Trips */}
      <div className="mt-4 px-5">
        {savedTrips.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
          >
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No Saved Trips Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto">Start exploring and save destinations you're interested in for future reference</p>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl shadow-md flex items-center justify-center mx-auto"
              onClick={() => navigate("/home")}
            >
              <span className="mr-2">Explore Trips</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </motion.div>
        ) : (
          savedTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md mb-6"
            >
              <div className="relative">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-52 object-cover"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 bg-white/30 backdrop-blur-md rounded-full p-2.5 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(trip.id);
                  }}
                >
                  <motion.svg 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.3 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-red-500 fill-red-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </motion.svg>
                </motion.button>
                <div 
                  className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent w-full py-3 px-4"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className="text-emerald-300 font-semibold text-xs uppercase tracking-wider">{trip.country}</div>
                  <div className="text-white font-bold text-2xl tracking-tight">{trip.title}</div>
                  <div className="flex items-center text-white space-x-1 mt-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium">{trip.rating}</span>
                    <span className="text-xs text-gray-300 font-light italic">({trip.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{trip.description}</p>
                <div className="flex justify-between items-center">
                  {trip.price && (
                    <div className="text-emerald-600 dark:text-emerald-400 font-black text-lg tracking-tight">
                      {trip.price}
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 italic font-light">Saved for later</span>
                    <motion.button 
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 w-10 h-10"
                      onClick={() => navigate(`/trip/${trip.id}`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      <BottomNav active="saved" />
    </div>
  );
} 