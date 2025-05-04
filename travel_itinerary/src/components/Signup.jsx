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
      // Navigate directly to home instead of onboarding
      navigate('/login');
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
          <div className="text-center mb-9">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-7"
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-3"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="h-px w-16 bg-emerald-400/40"></div>
                <span className="text-xs uppercase tracking-[0.25em] text-emerald-300 font-bold mx-3">Join Us</span>
                <div className="h-px w-16 bg-emerald-400/40"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-1 tracking-tight">
                BEGIN YOUR <span className="text-emerald-400 font-extrabold italic">STORY</span>
              </h1>
              
              <p className="text-base md:text-lg font-thin text-white/80 mt-2 tracking-wide">
                Create an account to <span className="font-medium">discover</span> and <span className="font-medium">explore</span> new places
              </p>
            </motion.div>
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
                <label htmlFor="name" className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wider">
                    Confirm
                  </label>
                  <input
                    id="confirmPassword"
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl flex justify-center items-center transition-colors mt-8 tracking-wider uppercase text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Start Your Journey"}
              </motion.button>
            </form>
            
            <div className="mt-6 text-center flex flex-col items-center">
              <p className="text-white/60 text-sm mb-2">
                Already have an account?
              </p>
              <Link to="/login" className="text-white font-medium hover:text-emerald-200 transition-colors inline-flex items-center group">
                <span className="mr-1 group-hover:underline">Sign In</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
