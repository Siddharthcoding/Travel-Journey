import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import BottomNav from "./BottomNav";

export default function DestinationView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTripDetails, loading } = useAppContext();
  const [destination, setDestination] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [likedActivities, setLikedActivities] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const tripData = await getTripDetails(id);
        if (tripData) {
          // Transform trip data to match the destination format
          setDestination({
            id: tripData._id,
            name: tripData.title,
            country: tripData.country,
            continent: tripData.category,
            tagline: tripData.subtitle || `${tripData.days}-Day Adventure in ${tripData.country}`,
            description: tripData.description,
            rating: tripData.rating,
            reviews: tripData.reviews,
            images: [
              tripData.image,
              // Add placeholder images if needed
              "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&auto=format",
              "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&auto=format",
            ],
            attractions: [
              {
                name: tripData.title,
                type: `${tripData.category} Tour • ${tripData.country}`,
                price: tripData.priceValue,
                image: tripData.image
              }
            ],
            activities: tripData.itinerary && tripData.itinerary.length > 0 
              ? tripData.itinerary.slice(0, 3).map(day => ({
                  name: day.title,
                  image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&auto=format"
                }))
              : [
                  {
                    name: "Explore " + tripData.country,
                    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&auto=format"
                  },
                  {
                    name: "Local Cuisine",
                    image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&auto=format"
                  },
                  {
                    name: "Cultural Experience",
                    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&auto=format"
                  }
                ]
          });
        } else {
          setError("Destination not found");
        }
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError("Failed to load destination details");
      }
    };
    
    fetchDestination();
  }, [id, getTripDetails]);
  
  const nextImage = () => {
    if (!destination) return;
    setCurrentImage((prev) => (prev === destination.images.length - 1 ? 0 : prev + 1));
  };
  
  const prevImage = () => {
    if (!destination) return;
    setCurrentImage((prev) => (prev === 0 ? destination.images.length - 1 : prev - 1));
  };
  
  const toggleLikeActivity = (activityName) => {
    if (likedActivities.includes(activityName)) {
      setLikedActivities(likedActivities.filter(name => name !== activityName));
    } else {
      setLikedActivities([...likedActivities, activityName]);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  if (error || !destination) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error || "Destination not found"}</p>
        <button 
          onClick={() => navigate("/home")}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="pb-20">
      {/* Hero Slider */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
        <img 
          src={destination.images[currentImage]}
          alt={destination.name}
          className="w-full h-72 object-cover"
        />
        
        {/* Back button */}
        <button
          className="absolute top-4 left-4 z-20 bg-white/30 backdrop-blur-sm rounded-full p-2"
          onClick={() => navigate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Slider controls */}
        <div className="absolute top-6 right-6 flex items-center space-x-3 z-20">
          <span className="text-white text-xs">{currentImage + 1}/{destination.images.length}</span>
          <button 
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
            onClick={prevImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
            onClick={nextImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-6">
        <h1 className="text-2xl font-bold">Discover {destination.name}: {destination.tagline}</h1>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Top Attraction</h2>
          <p className="text-gray-500 text-sm">{destination.description}</p>
          
          {/* Attraction Card */}
          <div className="mt-4 relative border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={destination.attractions[0].image}
              alt={destination.attractions[0].name}
              className="w-full h-48 object-cover"
            />
            <button 
              className="absolute top-3 right-3 bg-white/50 backdrop-blur-sm rounded-full p-2"
              onClick={() => alert(`Added ${destination.attractions[0].name} to favorites!`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <div className="p-4">
              <div className="text-xs text-gray-500">{destination.attractions[0].type}</div>
              <div className="text-lg font-bold">{destination.attractions[0].name}</div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">{destination.rating}</span>
                <span className="text-xs text-gray-500">({destination.reviews})</span>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="text-xl font-bold text-emerald-600">${destination.attractions[0].price}<span className="text-xs text-gray-500">/per day</span></div>
                <button 
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium"
                  onClick={() => navigate(`/trip/${destination.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          {/* Activities */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Essential Things to Do</h2>
            <p className="text-gray-500 text-sm">Fun things to do worth your time</p>
            
            <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
              {destination.activities.map((activity, index) => (
                <div key={index} className="flex-shrink-0 w-40 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="relative">
                    <img 
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-28 object-cover"
                    />
                    <button 
                      className="absolute top-2 right-2 bg-white/70 rounded-full p-1.5"
                      onClick={() => toggleLikeActivity(activity.name)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ${likedActivities.includes(activity.name) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm">{activity.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Popular activity</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Book Now Button */}
          <button 
            className="mt-8 w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold shadow"
            onClick={() => {
              alert(`Booking experience in ${destination.name}!`);
              setTimeout(() => navigate('/home'), 500);
            }}
          >
            Book Experience Now
          </button>
        </div>
      </div>
      
      <BottomNav active="trips" />
    </div>
  );
}
