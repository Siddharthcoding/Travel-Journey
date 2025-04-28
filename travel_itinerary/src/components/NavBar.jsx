import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import HamburgerMenu from "./HamburgerMenu";

export default function NavBar({ showBackButton = false }) {
  const navigate = useNavigate();
  const { user, toggleUserMenu, toggleMainMenu } = useAppContext();
  
  return (
    <div className="relative">
      <nav className="px-5 py-4 flex items-center justify-between">
        {showBackButton ? (
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="rounded-full bg-white dark:bg-dark-card shadow dark:shadow-dark-shadow p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        ) : (
          <div className="flex items-center">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleUserMenu}
              className="relative"
            >
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-dark-card shadow"
              />
              <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-dark-bg"></span>
            </motion.button>
            
            <ThemeToggle />
          </div>
        )}
        
        {!showBackButton && (
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleMainMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </motion.button>
        )}
      </nav>
      
      {/* User menu dropdown */}
      <UserMenu />
      
      {/* Main menu sidebar */}
      <HamburgerMenu />
    </div>
  );
} 