import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";

export default function SortMenu({ isOpen, onClose }) {
  const { sortBy, setSortBy } = useAppContext();

  const handleSort = (sortOption) => {
    console.log("Setting sort to:", sortOption);
    setSortBy(sortOption);
    onClose();
  };

  // Sort options with clear descriptions
  const sortOptions = [
    { id: "recommended", label: "Recommended", description: "Best value for experience" },
    { id: "price-low", label: "Price: Low to High", description: "Lowest prices first" },
    { id: "price-high", label: "Price: High to Low", description: "Premium experiences first" },
    { id: "rating", label: "Highest Rated", description: "Best reviewed experiences" },
    { id: "reviews", label: "Most Reviewed", description: "Most popular among travelers" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-5"
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Sort By</h3>
            
            <div className="space-y-3">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  className={`flex items-center w-full p-3 rounded-xl transition-colors ${
                    sortBy === option.id ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleSort(option.id)}
                >
                  <div className="text-left">
                    <span className="font-medium block">{option.label}</span>
                    <span className={`text-xs ${sortBy === option.id ? "text-gray-300" : "text-gray-500"}`}>
                      {option.description}
                    </span>
                  </div>
                  
                  {sortBy === option.id && (
                    <svg className="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full mt-5 py-3 bg-gray-100 rounded-xl font-medium text-gray-500"
              onClick={onClose}
            >
              Cancel
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 