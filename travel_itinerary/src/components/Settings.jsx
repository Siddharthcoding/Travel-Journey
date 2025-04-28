import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNav from "./BottomNav";

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>
        
        <div className="space-y-6">
          {/* Display */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Display</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span>Dark Mode</span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <motion.div 
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: darkMode ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4">
                <span>Notifications</span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${notifications ? 'bg-emerald-500' : 'bg-gray-200'}`}
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
            <h3 className="text-lg font-semibold mb-3">Language and Region</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100"
                   onClick={() => alert("Language selection will open here")}
              >
                <span>Language</span>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">{language}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4"
                   onClick={() => alert("Currency selection will open here")}
              >
                <span>Currency</span>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">{currency}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Account</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100"
                   onClick={() => navigate('/profile')}
              >
                <div className="flex items-center justify-between">
                  <span>Personal Information</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4 border-b border-gray-100"
                   onClick={() => alert("Payment methods will open here")}
              >
                <div className="flex items-center justify-between">
                  <span>Payment Methods</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4"
                   onClick={() => alert("Security settings will open here")}
              >
                <div className="flex items-center justify-between">
                  <span>Security</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100"
                   onClick={() => alert("Help center will open here")}
              >
                <div className="flex items-center justify-between">
                  <span>Help Center</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4"
                   onClick={() => alert("Report a problem will open here")}
              >
                <div className="flex items-center justify-between">
                  <span>Report a Problem</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-red-100 text-red-600 rounded-xl font-semibold"
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                navigate('/');
              }
            }}
          >
            Log Out
          </motion.button>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            Version 1.0.1
          </p>
        </div>
      </div>
      
      <BottomNav active="profile" />
    </div>
  );
} 