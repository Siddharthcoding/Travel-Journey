import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  // Image data for the background
  const travelImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d", alt: "Beach" },
    { id: 2, src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa", alt: "Mountain" },
    { id: 3, src: "https://images.unsplash.com/photo-1499678329028-101435549a4e", alt: "Beach Road" },
    { id: 4, src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9", alt: "Venice" },
    { id: 5, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945", alt: "Jungle" },
    { id: 6, src: "https://images.unsplash.com/photo-1534008897995-27a23e859048", alt: "Desert" },
    { id: 7, src: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd", alt: "Scooter" },
    { id: 8, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", alt: "Beach Hut" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    try {
      await signup(name, email, password);
      navigate('/onboarding');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-screen background image animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image animation columns */}
        <div className="absolute inset-0 flex">
          {/* Column 1 */}
          <div className="w-1/3 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: 0 }}
              animate={{ y: [0, -1600] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 75,
                ease: "linear"
              }}
            >
              {travelImages.slice(0, 5).map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[250px] md:h-[350px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Repeat first few images to keep animation smooth */}
              {travelImages.slice(0, 2).map(image => (
                <div 
                  key={`repeat-1-${image.id}`} 
                  className="mb-1 h-[250px] md:h-[350px]" 
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
          <div className="w-1/3 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -500 }}
              animate={{ y: [-500, -2100] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 80,
                ease: "linear"
              }}
            >
              {travelImages.slice(3, 8).map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[250px] md:h-[350px]" 
                >
                  <img 
                    src={`${image.src}?w=800&q=80`} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Repeat images to keep animation smooth */}
              {travelImages.slice(3, 5).map(image => (
                <div 
                  key={`repeat-2-${image.id}`} 
                  className="mb-1 h-[250px] md:h-[350px]" 
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
          <div className="w-1/3 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -1000 }}
              animate={{ y: [-1000, -2600] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 85,
                ease: "linear"
              }}
            >
              {travelImages.map(image => (
                <div 
                  key={image.id} 
                  className="mb-1 h-[250px] md:h-[350px]" 
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link to="/">
                <img 
                  src="/travel-logo.svg" 
                  alt="TripGlide" 
                  className="w-16 h-16 object-contain mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://img.icons8.com/fluency/96/airplane-take-off.png";
                  }}
                />
              </Link>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-light text-white mb-3"
            >
              <span className="font-bold text-emerald-400">Start</span> Your Journey
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-emerald-300 font-light"
            >
              Sign up to begin your adventure
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8"
          >
            {(formError || error) && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 p-4 rounded-xl mb-6 text-sm backdrop-blur-sm">
                {formError || error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/90 font-medium mb-2 text-sm">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/90 font-medium mb-2 text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-white/90 font-medium mb-2 text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-white/90 font-medium mb-2 text-sm">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl flex justify-center items-center transition-colors mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Create Account"}
              </motion.button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Already have an account? 
                <Link to="/login" className="text-emerald-300 font-medium ml-2 hover:text-emerald-200 hover:underline transition-colors">
                  Log In
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 