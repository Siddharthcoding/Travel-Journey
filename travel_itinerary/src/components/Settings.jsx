import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import BottomNav from "./BottomNav";

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  
  return (
    <div className="pb-24">
      <div className="px-5 pt-4">
        <div className="flex items-center mb-6">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <h2 className="text-2xl font-bold dark:text-white">Settings</h2>
        </div>
        
        <div className="space-y-6">
          {/* Display */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Display</h3>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-shadow overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
                <span className="dark:text-white">Dark Mode</span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-primary-dark' : 'bg-gray-200'}`}
                  onClick={toggleDarkMode}
                >
                  <motion.div 
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: darkMode ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4">
                <span className="dark:text-white">Notifications</span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${notifications ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-200 dark:bg-gray-700'}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <motion.div 
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: notifications ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Language and Region */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Language and Region</h3>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-shadow overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border"
                   onClick={() => alert("Language selection will open here")}
              >
                <span className="dark:text-white">Language</span>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">{language}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4"
                   onClick={() => alert("Currency selection will open here")}
              >
                <span className="dark:text-white">Currency</span>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">{currency}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Account</h3>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-shadow overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-dark-border"
                   onClick={() => navigate('/profile')}
              >
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Personal Information</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4 border-b border-gray-100 dark:border-dark-border"
                   onClick={() => alert("Payment methods will open here")}
              >
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Payment Methods</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4"
                   onClick={() => alert("Security settings will open here")}
              >
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Security</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Support</h3>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-shadow overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-dark-border"
                   onClick={() => alert("Help center will open here")}
              >
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Help Center</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4"
                   onClick={() => alert("Report a problem will open here")}
              >
                <div className="flex items-center justify-between">
                  <span className="dark:text-white">Report a Problem</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-xl font-semibold"
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                navigate('/');
              }
            }}
          >
            Log Out
          </motion.button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Version 1.0.1
          </p>
        </div>
      </div>
      
      <BottomNav active="profile" />
    </div>
  );
} 