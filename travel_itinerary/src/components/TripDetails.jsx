import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import BottomNav from "./BottomNav";

export default function TripDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Tour schedule");
  const [expandedDays, setExpandedDays] = useState([1]);
  const { getTripDetails, toggleLike } = useAppContext();
  
  const tabs = ["Tour schedule", "Accommodation", "Booking details"];
  const trip = getTripDetails(Number(id));
  
  const toggleDayExpansion = (day) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter(d => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };
  
  if (!trip) return (
    <div className="p-8 text-center">
      <p>Trip not found.</p>
      <button 
        onClick={() => navigate("/home")}
        className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg"
      >
        Return to Home
      </button>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Hero Image */}
      <div className="relative">
        <img 
          src={trip.image} 
          alt={trip.title} 
          className="w-full h-64 object-cover"
        />
        <button 
          onClick={() => navigate("/home")}
          className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-2"
          onClick={() => toggleLike(trip.id)}
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
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-8 relative z-10 px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">{trip.title}</h1>
        <p className="text-gray-500 text-sm">{trip.subtitle}</p>
        
        {/* Tabs */}
        <div className="mt-6 flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        {activeTab === "Tour schedule" && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">{trip.days}-Days {trip.country} Adventure</h2>
            
            {trip.itinerary.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mt-4 border border-gray-100 rounded-2xl overflow-hidden"
              >
                <div 
                  className="flex items-center p-3 bg-gray-50 cursor-pointer"
                  onClick={() => toggleDayExpansion(day.day)}
                >
                  <div className="bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center mr-3">
                    <img 
                      src={`https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&auto=format&h=100`} 
                      alt={`Day ${day.day}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-semibold">Day {day.day}</h3>
                    <p className="text-xs text-gray-500">{day.title}</p>
                  </div>
                  <button>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 text-gray-400 transition-transform ${expandedDays.includes(day.day) ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {expandedDays.includes(day.day) && (
                  <div className="p-4 bg-white">
                    {day.activities.map((activity, i) => (
                      <div key={i} className="mb-4 last:mb-0">
                        <h4 className="text-xs font-medium text-gray-500">{activity.time}</h4>
                        <p className="text-sm">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === "Accommodation" && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Your Accommodations</h2>
            <p className="text-gray-500 text-sm mt-2">
              Information about your accommodations during the trip will be displayed here.
            </p>
          </div>
        )}
        
        {activeTab === "Booking details" && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Booking Information</h2>
            <p className="text-gray-500 text-sm mt-2">
              Your booking details and payment information will be displayed here.
            </p>
          </div>
        )}
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <button 
            className="w-full py-3 bg-black text-white rounded-xl font-semibold shadow"
            onClick={() => {
              // Booking functionality
              alert(`Booking for ${trip.title} will be implemented here.`);
            }}
          >
            Book this tour - {trip.price}
          </button>
        </motion.div>
      </div>
      
      <BottomNav />
    </div>
  );
} 