import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "./BottomNav";

// Mock data for destinations
const destinationsData = {
  1: {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    tagline: "Where Culture Meets Tranquility",
    description: "Discover what makes this island so unique",
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&auto=format",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&auto=format",
      "https://images.unsplash.com/photo-1588048516328-54b17efa7116?q=80&auto=format",
    ],
    attractions: [
      {
        name: "Best of Bali",
        type: "Bali Trip • Bali, Indonesia",
        price: 700,
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&auto=format"
      }
    ],
    activities: [
      {
        name: "Rice Terraces",
        image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&auto=format"
      },
      {
        name: "Temples",
        image: "https://images.unsplash.com/photo-1517358150039-8d8603789cc8?q=80&auto=format"
      },
      {
        name: "Beaches",
        image: "https://images.unsplash.com/photo-1588843363338-02613de2f4d3?q=80&auto=format"
      }
    ]
  },
  2: {
    id: 2,
    name: "Rio de Janeiro",
    country: "Brazil",
    tagline: "Where Rhythm Meets Nature",
    description: "Experience the vibrant culture of this remarkable city",
    rating: 4.6,
    reviews: 98,
    images: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&auto=format",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&auto=format",
      "https://images.unsplash.com/photo-1591456983933-9a341badae46?q=80&auto=format",
    ],
    attractions: [
      {
        name: "Rio Highlights",
        type: "City Tour • Rio, Brazil",
        price: 650,
        image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?q=80&auto=format"
      }
    ],
    activities: [
      {
        name: "Christ the Redeemer",
        image: "https://images.unsplash.com/photo-1544989164-21587b410bc3?q=80&auto=format"
      },
      {
        name: "Sugarloaf Mountain",
        image: "https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?q=80&auto=format"
      },
      {
        name: "Copacabana Beach",
        image: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&auto=format"
      }
    ]
  }
};

export default function DestinationView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [likedActivities, setLikedActivities] = useState([]);
  
  // Get destination data
  const destination = destinationsData[id] || destinationsData[1]; // Fallback to Bali if ID not found
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev === destination.images.length - 1 ? 0 : prev + 1));
  };
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? destination.images.length - 1 : prev - 1));
  };
  
  const toggleLikeActivity = (activityName) => {
    if (likedActivities.includes(activityName)) {
      setLikedActivities(likedActivities.filter(name => name !== activityName));
    } else {
      setLikedActivities([...likedActivities, activityName]);
    }
  };
  
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
      
      <BottomNav />
    </div>
  );
} 