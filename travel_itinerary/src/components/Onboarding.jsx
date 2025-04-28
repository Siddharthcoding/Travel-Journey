import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Install with: npm install framer-motion

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const destinations = [
    { name: "Yogyakarta", image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&auto=format" },
    { name: "Komodo", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&auto=format" },
    { name: "Lombok", image: "https://images.unsplash.com/photo-1588048516328-54b17efa7116?q=80&auto=format" },
    { name: "Bali", image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&auto=format" },
    { name: "Sumba", image: "https://images.unsplash.com/photo-1621944190310-aa38932c4e24?q=80&auto=format" },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const startApp = () => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Background collage */}
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="collage-container relative h-full w-full">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`absolute rounded-2xl overflow-hidden shadow-lg transform rotate-${Math.floor(Math.random() * 10) - 5}`}
              style={{
                width: `${100 + Math.random() * 50}px`,
                height: `${100 + Math.random() * 50}px`,
                top: `${10 + Math.random() * 40}%`,
                left: `${10 + Math.random() * 70}%`,
                zIndex: i
              }}
            >
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 bg-white/80 px-2 py-1 text-xs font-medium">
                {dest.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="mt-auto px-8 pt-4 pb-12 bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="h-1.5 w-12 bg-gray-200 rounded-full"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-24"
        >
          {/* Slide 1 */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-2">
              Exploring Cultures,<br />Embracing the World
            </h1>
            <p className="text-center text-gray-500">
              Dive into Diverse Cultures Responsibly
            </p>
          </motion.div>
          
          {/* Slide 2 */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-2">
              Plan Smarter,<br />Travel Better
            </h1>
            <p className="text-center text-gray-500">
              Personalized itineraries made for you
            </p>
          </motion.div>
          
          {/* Slide 3 */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-2">
              Discover Hidden Gems<br />& Local Favorites
            </h1>
            <p className="text-center text-gray-500">
              Experience authenticity wherever you go
            </p>
          </motion.div>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={startApp}
          disabled={isLoading}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold text-lg shadow-lg transition mt-8"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          ) : (
            "Start using Voyage"
          )}
        </motion.button>

        {/* Progress dots */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex justify-center mt-6 space-x-2"
        >
          {[0,1,2].map(i => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-gray-800 w-4' : 'bg-gray-300'}`}
            ></button>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 