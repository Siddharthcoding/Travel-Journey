import React from "react";
import { useAppContext } from "../context/AppContext";
import BottomNav from "./BottomNav";

export default function Profile() {
  const { user } = useAppContext();
  
  return (
    <div className="pb-24">
      <div className="px-5 pt-4">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-gray-500">Your personal information</p>
        
        <div className="mt-10 flex flex-col items-center">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <h3 className="mt-4 text-xl font-bold">{user.name}</h3>
          <p className="text-gray-500">Premium Member</p>
          
          <div className="mt-10 w-full">
            <div className="border border-gray-200 rounded-xl divide-y">
              <button className="flex items-center justify-between w-full p-4" onClick={() => alert("Personal Information settings")}>
                <span className="font-medium">Personal Information</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="flex items-center justify-between w-full p-4" onClick={() => alert("Payment Methods settings")}>
                <span className="font-medium">Payment Methods</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="flex items-center justify-between w-full p-4" onClick={() => alert("Notifications settings")}>
                <span className="font-medium">Notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="flex items-center justify-between w-full p-4" onClick={() => alert("Security settings")}>
                <span className="font-medium">Security</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Trip Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Preferred Currency</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">USD</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Language</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">English</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className="mt-8 w-full py-3 bg-red-100 text-red-600 rounded-xl font-semibold"
              onClick={() => confirm("Are you sure you want to log out?") && alert("Logged out successfully")}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      
      <BottomNav active="profile" />
    </div>
  );
} 