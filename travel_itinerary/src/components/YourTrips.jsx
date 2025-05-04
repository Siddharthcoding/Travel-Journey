import React, { useEffect, useState } from "react";
import { tripAPI } from "../services/api";
import BottomNav from "./BottomNav";
import { motion } from "framer-motion";

export default function YourTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError("");
      try {
        const { bookings } = await tripAPI.getUserBookings();
        setBookings(bookings || []);
      } catch (err) {
        setError(err.message || "Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="pb-24 min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
      <div className="px-5 pt-6">
        <h2 className="text-2xl font-black tracking-tight mb-1 flex items-center">
          <span className="text-emerald-600 dark:text-emerald-400">Your</span>
          <span className="ml-2">Trips</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light italic pl-1 mb-6">
          All your booked adventures in one place
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-10 px-5">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

        {!loading && bookings.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
            <img
            src="https://assets-v2.lottiefiles.com/a/0e4a8a9f-1161-11ee-b9e6-6f6c1c9c2e5b/9mK7UjZk7P.gif"
            alt="No bookings"
            className="w-40 h-40 mb-6"
            style={{ filter: "grayscale(0.3)" }}
            />
            <h3 className="text-2xl font-extrabold mb-2 text-emerald-600 dark:text-emerald-400">No Trips Booked Yet</h3>
            <p className="text-gray-400 dark:text-gray-500 text-base mb-6 text-center max-w-md">
            You haven't booked any adventures yet.<br />
            Start exploring and plan your next unforgettable journey!
            </p>
            <button
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold shadow transition"
            onClick={() => window.location.href = "/home"}
            >
            Explore Destinations
            </button>
        </div>
        )}


      {!loading && bookings.length > 0 && (
        <div className="px-5 mt-4 space-y-6">
          {bookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={booking.trip?.image}
                alt={booking.trip?.title}
                className="w-full md:w-48 h-40 object-cover"
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">{booking.trip?.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    {booking.trip?.country} &middot; {booking.trip?.days} days
                  </p>
                  <div className="flex items-center space-x-3 text-sm mb-2">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg">
                      {booking.status === "cancelled" ? "Cancelled" : "Confirmed"}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span>
                      {new Date(booking.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span>{booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs">
                    <span>Booking Ref:</span>
                    <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{booking.bookingReference}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ${booking.totalPrice?.toLocaleString()}
                  </span>
                  {/* Add a cancel button if not cancelled */}
                  {booking.status !== "cancelled" && (
                    <button
                      className="px-4 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold"
                      onClick={async () => {
                        if (window.confirm("Cancel this booking?")) {
                          try {
                            await tripAPI.cancelBooking(booking.id);
                            setBookings(b => b.map(bk => bk.id === booking.id ? { ...bk, status: "cancelled" } : bk));
                          } catch (err) {
                            alert("Failed to cancel booking.");
                          }
                        }
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <BottomNav active="trips" />
    </div>
  );
}
