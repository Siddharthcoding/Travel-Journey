import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  // Image data for the background
  const travelImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", alt: "Paris" },
    { id: 2, src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47", alt: "Bali" },
    { id: 3, src: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e", alt: "Santorini" },
    { id: 4, src: "https://images.unsplash.com/photo-1512100356356-de1b84283e18", alt: "New York" },
    { id: 5, src: "https://images.unsplash.com/photo-1565967511849-76a60a516170", alt: "Beach" },
    { id: 6, src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1", alt: "Mountains" },
    { id: 7, src: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd", alt: "Japan" },
    { id: 8, src: "https://images.unsplash.com/photo-1533105079780-92b9be482077", alt: "Rome" },
    { id: 9, src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", alt: "Dubai" },
    { id: 10, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", alt: "Thailand" },
    { id: 11, src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d", alt: "Maldives" },
    { id: 12, src: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a", alt: "Switzerland" },
    { id: 13, src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b", alt: "Venice" },
    { id: 14, src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd", alt: "Hawaii" },
    { id: 15, src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9", alt: "Venice" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-screen background image animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image animation columns */}
        <div className="absolute inset-0 flex">
          {/* Column 1 */}
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: 0 }}
              animate={{ y: [0, -2000] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear"
              }}
            >
              {travelImages.slice(0, 6).map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Repeat first few images to keep animation smooth */}
              {travelImages.slice(0, 3).map(image => (
                <div 
                  key={`repeat-1-${image.id}`} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Column 2 */}
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -400 }}
              animate={{ y: [-400, -2400] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 70,
                ease: "linear"
              }}
            >
              {travelImages.slice(3, 9).map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Repeat images to keep animation smooth */}
              {travelImages.slice(3, 6).map(image => (
                <div 
                  key={`repeat-2-${image.id}`} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Column 3 */}
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -800 }}
              animate={{ y: [-800, -2800] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 65,
                ease: "linear"
              }}
            >
              {travelImages.slice(6, 12).map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Repeat images to keep animation smooth */}
              {travelImages.slice(6, 9).map(image => (
                <div 
                  key={`repeat-3-${image.id}`} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Column 4 */}
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -1200 }}
              animate={{ y: [-1200, -3200] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 75,
                ease: "linear"
              }}
            >
              {travelImages.slice(9, 15).map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Repeat images to keep animation smooth */}
              {travelImages.slice(9, 12).map(image => (
                <div 
                  key={`repeat-4-${image.id}`} 
                  className="mb-1 h-[200px] md:h-[300px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-8 md:mb-12"
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="font-bold italic text-emerald-400 mr-1">Trip</span>
            <span className="font-extrabold">Glide</span>
          </motion.h1>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-1">
              Discover your next adventure
            </p>
            <p className="text-base sm:text-lg italic text-emerald-300 font-medium mb-6">
              with personalized travel experiences tailored just for you
            </p>
            <div className="w-24 h-1 bg-emerald-400 mx-auto"></div>
          </motion.div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link to="/login">
            <motion.button 
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Log In
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button 
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-full shadow-lg transition-all duration-300 text-lg border border-white/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 