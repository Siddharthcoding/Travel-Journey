import { useNavigate } from "react-router-dom";

const trips = [
  {
    id: 1,
    title: "Rio de Janeiro",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    reviews: 143,
    description: "One of Brazil's most iconic cities, renowned for its beaches and mountains.",
  },
  // Add more trip objects as needed
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-2">Hello, Traveler</h2>
      <p className="text-lg text-gray-500 mb-6">Welcome to your Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {trips.map(trip => (
          <div
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow p-4 hover:bg-blue-50 transition"
          >
            <img src={trip.image} alt={trip.title} className="rounded-lg mb-2 w-full h-40 object-cover" />
            <h4 className="text-xl font-bold">{trip.title}</h4>
            <div className="text-sm text-gray-600">{trip.country}</div>
            <div className="text-sm text-yellow-600">⭐ {trip.rating} ({trip.reviews} reviews)</div>
            <p className="text-gray-700 mt-2">{trip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 