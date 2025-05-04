import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { tripAPI } from "../services/api";
import BottomNav from "./BottomNav";

export default function TripDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Tour schedule");
  const [expandedDays, setExpandedDays] = useState([1]);
  const { getTripDetails, toggleLike } = useAppContext();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAttempted = useRef(false);
  
  // Booking state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    travelers: 2,
    date: "",
    specialRequests: "",
    contactEmail: "",
    contactPhone: ""
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  
  const tabs = ["Tour schedule", "Accommodation", "Booking details"];
  
  useEffect(() => {
    // Prevent multiple fetch attempts for the same ID
    if (fetchAttempted.current) return;
    fetchAttempted.current = true;
    
    const fetchTripDetails = async () => {
      setIsLoading(true);
      try {
        const tripData = await getTripDetails(id);
        if (tripData) {
          setTrip(tripData);
          setError(null);
        } else {
          setError("Trip not found");
        }
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Failed to load trip details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTripDetails();
  }, [id, getTripDetails]);
  
  const toggleDayExpansion = (day) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter(d => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };
  
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const nextBookingStep = () => {
    setBookingStep(prev => prev + 1);
  };
  
  const prevBookingStep = () => {
    setBookingStep(prev => prev - 1);
  };
  
  const submitBooking = async () => {
    setIsBooking(true);
    setBookingError("");
    
    try {
      // Calculate total price based on number of travelers
      const totalPrice = trip.priceValue * bookingData.travelers;
      
      // Prepare booking data to send to API
      const bookingPayload = {
        ...bookingData,
        totalPrice,
        tripId: trip._id
      };
      
      // Call the API to book the trip
      const response = await tripAPI.bookTrip(trip._id, bookingPayload);
      
      // Set booking reference from response
      setBookingReference(response.bookingReference);
      setBookingSuccess(true);
      setBookingStep(3); // Move to confirmation step
    } catch (err) {
      setBookingError(err.message || "Failed to book your trip. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };
  
  const closeBookingModal = () => {
    setShowBookingModal(false);
    // Reset booking state after animation completes
    setTimeout(() => {
      setBookingStep(1);
      setBookingSuccess(false);
      setBookingError("");
      // Don't reset booking data if successful to allow for repeat bookings
      if (!bookingSuccess) {
        setBookingData({
          travelers: 2,
          date: "",
          specialRequests: "",
          contactEmail: "",
          contactPhone: ""
        });
      }
    }, 300);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC' // Ensure consistent date interpretation
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString;
    }
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (!trip || !bookingData.travelers) return "0";
    
    const totalPrice = trip.priceValue * bookingData.travelers;
    return `$${totalPrice.toLocaleString()}`;
  };
  
  // Improved loading state with skeleton UI
  if (isLoading) return (
    <div className="pb-20">
      {/* Skeleton header */}
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="absolute top-4 left-4 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full"></div>
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full"></div>
      </div>
      
      {/* Skeleton content */}
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl -mt-8 relative z-10 px-5 pt-6 pb-4">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
        
        {/* Skeleton tabs */}
        <div className="mt-6 flex border-b border-gray-200 dark:border-gray-700 space-x-4">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Skeleton content */}
        <div className="mt-6">
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
  
  if (error || !trip) return (
    <div className="p-8 text-center">
      <p className="text-red-500 dark:text-red-400 font-medium">{error || "Trip not found."}</p>
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
          loading="eager"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&auto=format";
          }}
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
          onClick={() => toggleLike(trip._id)}
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
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl -mt-8 relative z-10 px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">{trip.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{trip.subtitle || `${trip.days}-Day Adventure in ${trip.country}`}</p>
        
        {/* Tabs */}
        <div className="mt-6 flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-black dark:border-white text-black dark:text-white' 
                  : 'border-transparent text-gray-500 dark:text-gray-400'
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
            
            {trip.itinerary && trip.itinerary.length > 0 ? (
              trip.itinerary.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mt-4 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                >
                  <div 
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                    onClick={() => toggleDayExpansion(day.day)}
                  >
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-lg w-12 h-12 flex items-center justify-center mr-3">
                      <img 
                        src={`https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&auto=format&h=100`} 
                        alt={`Day ${day.day}`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-semibold">Day {day.day}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{day.title}</p>
                    </div>
                    <button>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-gray-400 dark:text-gray-300 transition-transform ${expandedDays.includes(day.day) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {expandedDays.includes(day.day) && (
                    <div className="p-4 bg-white dark:bg-gray-800">
                      {day.activities && day.activities.map((activity, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">{activity.time}</h4>
                          <p className="text-sm">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              // Default itinerary if none exists
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Detailed itinerary for this trip will be provided upon booking. This {trip.days}-day adventure includes visits to the main attractions in {trip.country} with expert local guides.
                </p>
                <div className="mt-4 space-y-3">
                  {Array.from({ length: Math.min(trip.days, 3) }, (_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">{i+1}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Day {i+1}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Explore {trip.country}'s highlights</p>
                      </div>
                    </div>
                  ))}
                  {trip.days > 3 && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic mt-2">
                      + {trip.days - 3} more days of adventure
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "Accommodation" && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Your Accommodations</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Information about your accommodations during the trip will be displayed here.
            </p>
            <div className="mt-4 rounded-xl overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&auto=format"
                alt="Accommodation"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold">Premium Hotels</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Stay in carefully selected accommodations that offer comfort and authentic local experience.
                </p>
                <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="mr-4">⭐ 4-5 Star Rating</span>
                  <span>🏨 Central Locations</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "Booking details" && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Booking Information</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Your booking details and payment information will be displayed here.
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">Trip Price</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Per person, double occupancy</p>
                </div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{trip.price}</div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                <h3 className="font-medium mb-2">What's Included:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{trip.days} nights accommodation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert local guides</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All transportation during the tour</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <motion.button 
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowBookingModal(true)}
          >
            Book this tour - {trip.price}
          </motion.button>
        </motion.div>
      </div>
      
      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={closeBookingModal}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl z-50 p-6 pb-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress indicator */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {bookingStep === 1 ? "Book Your Trip" : 
                   bookingStep === 2 ? "Contact Information" :
                   "Booking Confirmation"}
                </h2>
                <button 
                  onClick={closeBookingModal}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                <motion.div 
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: "33.3%" }}
                  animate={{ width: `${bookingStep * 33.3}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Step 1: Trip Details */}
              {bookingStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{trip.title}</h3>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{trip.price}</span>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Select Travel Date</span>
                      </div>
                      <input 
                        type="date" 
                        name="date"
                        value={bookingData.date}
                        onChange={handleBookingChange}
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                        min={new Date().toISOString().split('T')[0]} // Prevent past dates
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm font-medium">Number of Travelers</span>
                      </div>
                      <select 
                        name="travelers"
                        value={bookingData.travelers}
                        onChange={handleBookingChange}
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'traveler' : 'travelers'}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span className="text-sm font-medium">Special Requests</span>
                      </div>
                      <textarea 
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleBookingChange}
                        placeholder="Any dietary requirements, accessibility needs, or other requests..."
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Price:</span>
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {calculateTotalPrice()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {trip.price} × {bookingData.travelers} {bookingData.travelers === 1 ? 'traveler' : 'travelers'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
                      onClick={closeBookingModal}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium ${!bookingData.date ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={nextBookingStep}
                      disabled={!bookingData.date}
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Contact Information */}
              {bookingStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Email Address</span>
                      </div>
                      <input 
                        type="email" 
                        name="contactEmail"
                        value={bookingData.contactEmail}
                        onChange={handleBookingChange}
                        placeholder="your.email@example.com"
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-medium">Phone Number</span>
                      </div>
                      <input 
                        type="tel" 
                        name="contactPhone"
                        value={bookingData.contactPhone}
                        onChange={handleBookingChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">By proceeding, you agree to our <span className="text-emerald-600 dark:text-emerald-400">Terms & Conditions</span> and <span className="text-emerald-600 dark:text-emerald-400">Privacy Policy</span>.</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Booking Summary:</span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Trip:</span>
                          <span>{trip.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Date:</span>
                          <span>{formatDate(bookingData.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Travelers:</span>
                          <span>{bookingData.travelers}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-1 border-t border-gray-200 dark:border-gray-600 mt-1">
                          <span>Total:</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{calculateTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {bookingError && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {bookingError}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
                      onClick={prevBookingStep}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center ${
                        isBooking || !bookingData.contactEmail || !bookingData.contactPhone ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={submitBooking}
                      disabled={isBooking || !bookingData.contactEmail || !bookingData.contactPhone}
                    >
                      {isBooking ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : "Complete Booking"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Confirmation */}
              {bookingStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="mb-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Your trip to {trip.country} has been booked successfully. We've sent a confirmation email to {bookingData.contactEmail}.
                    </p>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Booking Reference:</span>
                        <span className="text-sm font-medium">{bookingReference || `TRV-${Math.floor(Math.random() * 1000000)}`}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Trip:</span>
                        <span className="text-sm font-medium">{trip.title}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="text-sm font-medium">{formatDate(bookingData.date)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Travelers:</span>
                        <span className="text-sm font-medium">{bookingData.travelers}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Price:</span>
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{calculateTotalPrice()}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      You can view your booking details and manage your reservation in your account under "My Trips".
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium"
                      onClick={() => navigate("/saved")}
                    >
                      View My Trips
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                      onClick={closeBookingModal}
                    >
                      Done
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <BottomNav />
    </div>
  );
}
