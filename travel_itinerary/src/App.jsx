import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Onboarding from "./components/Onboarding";
import Home from "./components/Home";
import TripDetails from "./components/TripDetails";
import DestinationView from "./components/DestinationView";
import SavedTrips from "./components/SavedTrips";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={
              <>
                <NavBar />
                <Home />
              </>
            } />
            <Route path="/trip/:id" element={
              <>
                <NavBar showBackButton={true} />
                <TripDetails />
              </>
            } />
            <Route path="/destination/:id" element={
              <>
                <NavBar showBackButton={true} />
                <DestinationView />
              </>
            } />
            <Route path="/saved" element={<SavedTrips />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
} 