import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import BottomNav from "./BottomNav";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Profile() {
  const { user } = useAppContext();
  const { currentUser, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  // State for modals
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    currency: "USD",
    language: "English",
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true
    },
    password: {
      current: "",
      new: "",
      confirm: ""
    },
    paymentMethod: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: ""
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  
  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate('/login');
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  // Handle form submission for personal info
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFormSuccess("");
    
    try {
      await updateUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      setFormSuccess("Profile updated successfully!");
      setTimeout(() => setActiveModal(null), 1500);
    } catch (err) {
      setFormError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFormSuccess("");
    
    // Validate password
    if (formData.password.new !== formData.password.confirm) {
      setFormError("New passwords don't match");
      setIsSubmitting(false);
      return;
    }
    
    try {
      await updateUserProfile({
        currentPassword: formData.password.current,
        newPassword: formData.password.new
      });
      
      setFormSuccess("Password updated successfully!");
      setFormData(prev => ({
        ...prev,
        password: { current: "", new: "", confirm: "" }
      }));
      setTimeout(() => setActiveModal(null), 1500);
    } catch (err) {
      setFormError(err.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle payment method update
  const handlePaymentUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFormSuccess("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormSuccess("Payment method updated successfully!");
      setTimeout(() => setActiveModal(null), 1500);
    } catch (err) {
      setFormError(err.message || "Failed to update payment method");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle notification preferences update
  const handleNotificationUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFormSuccess("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormSuccess("Notification preferences updated!");
      setTimeout(() => setActiveModal(null), 1500);
    } catch (err) {
      setFormError(err.message || "Failed to update notification preferences");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pb-24">
      <div className="px-5 pt-6">
        <div className="flex items-center mb-2">
          <div className="h-6 w-1 bg-emerald-500 rounded-full mr-2"></div>
          <h2 className="text-2xl font-black tracking-tight">
            <span className="text-emerald-600 dark:text-emerald-400">MY</span>
            <span className="ml-1.5">PROFILE</span>
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light italic pl-3">Your journey, your way</p>
        
        <div className="mt-10 flex flex-col items-center">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 p-1"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-2 border-white"
              />
            </motion.div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-100 dark:bg-emerald-900 rounded-full p-1.5 border-2 border-white dark:border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          
          <h3 className="mt-4 text-2xl font-bold tracking-tight">{user.name}</h3>
          
          <div className="flex items-center mt-1">
            <div className="h-px w-12 bg-emerald-400/30"></div>
            <span className="px-2 text-xs uppercase tracking-widest font-medium text-emerald-600 dark:text-emerald-400">Premium Member</span>
            <div className="h-px w-12 bg-emerald-400/30"></div>
          </div>
          
          <div className="mt-10 w-full">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <div className="p-3 bg-emerald-500 text-white">
                <h4 className="uppercase text-xs tracking-widest font-bold">Account Settings</h4>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y dark:divide-gray-800">
                <button 
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" 
                  onClick={() => setActiveModal("personal")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Personal Information</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" 
                  onClick={() => setActiveModal("payment")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">Payment Methods</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" 
                  onClick={() => setActiveModal("notifications")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="font-medium">Notifications</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" 
                  onClick={() => setActiveModal("security")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-medium">Security</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="h-5 w-1 bg-emerald-500 rounded-full mr-2"></div>
                <h3 className="text-base font-bold uppercase tracking-wide">Trip Preferences</h3>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-sm">Preferred Currency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{formData.currency}</span>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="font-medium text-sm">Language</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{formData.language}</span>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="font-medium text-sm">Theme</span>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 w-full py-3.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-semibold tracking-wide flex items-center justify-center space-x-2 transition-colors hover:bg-red-200 dark:hover:bg-red-900/50"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>LOG OUT</span>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Personal Information Modal */}
              {activeModal === "personal" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                  
                  {formError && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}
                  
                  {formSuccess && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                      {formSuccess}
                    </div>
                  )}
                  
                  <form onSubmit={handlePersonalInfoSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </>
              )}
              
              {/* Payment Methods Modal */}
              {activeModal === "payment" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
                  
                  {formError && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}
                  
                  {formSuccess && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                      {formSuccess}
                    </div>
                  )}
                  
                  <form onSubmit={handlePaymentUpdate}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <input
                        type="text"
                        name="paymentMethod.cardNumber"
                        value={formData.paymentMethod.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="paymentMethod.cardName"
                        value={formData.paymentMethod.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="paymentMethod.expiry"
                          value={formData.paymentMethod.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input
                          type="text"
                          name="paymentMethod.cvv"
                          value={formData.paymentMethod.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : "Save Card"}
                      </button>
                    </div>
                  </form>
                </>
              )}
              
              {/* Notifications Modal */}
              {activeModal === "notifications" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
                  
                  {formError && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}
                  
                  {formSuccess && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                      {formSuccess}
                    </div>
                  )}
                  
                  <form onSubmit={handleNotificationUpdate}>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive booking confirmations and updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="notifications.email"
                            checked={formData.notifications.email}
                            onChange={handleInputChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get alerts on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="notifications.push"
                            checked={formData.notifications.push}
                            onChange={handleInputChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive text messages for important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="notifications.sms"
                            checked={formData.notifications.sms}
                            onChange={handleInputChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive special offers and promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="notifications.marketing"
                            checked={formData.notifications.marketing}
                            onChange={handleInputChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : "Save Preferences"}
                      </button>
                    </div>
                  </form>
                </>
              )}
              
              {/* Security Modal */}
              {activeModal === "security" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Security Settings</h3>
                  
                  {formError && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}
                  
                  {formSuccess && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                      {formSuccess}
                    </div>
                  )}
                  
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        name="password.current"
                        value={formData.password.current}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        name="password.new"
                        value={formData.password.new}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="password.confirm"
                        value={formData.password.confirm}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : "Update Password"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <BottomNav active="profile" />
    </div>
  );
}
