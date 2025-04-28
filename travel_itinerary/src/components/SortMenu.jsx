import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";

export default function SortMenu({ isOpen, onClose }) {
  const { sortBy, setSortBy } = useAppContext();

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    onClose();
  };

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
              <button
                className={`flex items-center w-full p-3 rounded-xl ${sortBy === "recommended" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => handleSort("recommended")}
              >
                <span className="text-left font-medium">Recommended</span>
                {sortBy === "recommended" && (
                  <svg className="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              
              <button
                className={`flex items-center w-full p-3 rounded-xl ${sortBy === "price-low" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => handleSort("price-low")}
              >
                <span className="text-left font-medium">Price: Low to High</span>
                {sortBy === "price-low" && (
                  <svg className="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              
              <button
                className={`flex items-center w-full p-3 rounded-xl ${sortBy === "price-high" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => handleSort("price-high")}
              >
                <span className="text-left font-medium">Price: High to Low</span>
                {sortBy === "price-high" && (
                  <svg className="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              
              <button
                className={`flex items-center w-full p-3 rounded-xl ${sortBy === "rating" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => handleSort("rating")}
              >
                <span className="text-left font-medium">Rating</span>
                {sortBy === "rating" && (
                  <svg className="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              
              <button
                className={`flex items-center w-full p-3 rounded-xl ${sortBy === "reviews" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => handleSort("reviews")}
              >
                <span className="text-left font-medium">Number of Reviews</span>
                {sortBy === "reviews" && (
                  <svg className="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 