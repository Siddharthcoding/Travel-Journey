import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";

// Protected pages
import Home from "./components/Home";
import TripDetails from "./components/TripDetails";
import DestinationView from "./components/DestinationView";
import SavedTrips from "./components/SavedTrips";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import YourTrips from "./components/YourTrips";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text font-sans transition-colors duration-200">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes */}
                <Route path="/home" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/trip/:id" element={
                  <ProtectedRoute>
                    <TripDetails />
                  </ProtectedRoute>
                } />
                <Route path="/destination/:id" element={
                  <ProtectedRoute>
                    <DestinationView />
                  </ProtectedRoute>
                } />
                <Route path="/yourTrips" element={
                  <ProtectedRoute>
                    <YourTrips />
                  </ProtectedRoute>
                } />
                <Route path="/saved" element={
                  <ProtectedRoute>
                    <SavedTrips />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
}