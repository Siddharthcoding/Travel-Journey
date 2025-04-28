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
        <h2 className="text-2xl font-bold">Saved Trips</h2>
        <p className="text-gray-500">Your favorite destinations</p>
      </div>
      
      {/* Trips */}
      <div className="mt-6 px-5">
        {savedTrips.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">You haven't saved any trips yet</p>
            <button 
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg"
              onClick={() => navigate("/home")}
            >
              Explore Trips
            </button>
          </div>
        ) : (
          savedTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md mb-5"
            >
              <div className="relative">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-48 object-cover"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                />
                <button 
                  className="absolute top-3 right-3 bg-white/30 backdrop-blur-md rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(trip.id);
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-red-500 fill-red-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
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
                <p className="text-gray-600 text-sm line-clamp-2">{trip.description}</p>
                <div className="flex justify-between items-center mt-3">
                  {trip.price && <div className="text-emerald-600 font-semibold">{trip.price}</div>}
                  <button 
                    className="ml-auto flex items-center justify-center rounded-full bg-gray-100 w-10 h-10"
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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