import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BottomNav({ active }) {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border shadow-lg dark:shadow-dark-shadow rounded-t-3xl">
      <div className="flex justify-between px-10 py-4">
        <motion.button 
          className="flex flex-col items-center"
          onClick={() => navigate('/home')}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={active === 'home' ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${active === 'home' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
            </svg>
          </motion.div>
          <span className={`text-xs ${active === 'home' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'} font-medium mt-1`}>Home</span>
        </motion.button>
        
        <motion.button 
          className="flex flex-col items-center"
          onClick={() => navigate('/yourTrips')}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={active === 'trips' ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${active === 'trips' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </motion.div>
          <span className={`text-xs ${active === 'trips' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'} font-medium mt-1`}>Trips</span>
        </motion.button>
        
        <motion.button 
          className="flex flex-col items-center"
          onClick={() => navigate('/saved')}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={active === 'saved' ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${active === 'saved' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.div>
          <span className={`text-xs ${active === 'saved' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'} font-medium mt-1`}>Saved</span>
        </motion.button>
        
        <motion.button 
          className="flex flex-col items-center"
          onClick={() => navigate('/profile')}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={active === 'profile' ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${active === 'profile' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <span className={`text-xs ${active === 'profile' ? 'text-primary-light dark:text-primary-dark' : 'text-gray-400 dark:text-gray-500'} font-medium mt-1`}>Profile</span>
        </motion.button>
      </div>
    </div>
  );
} 