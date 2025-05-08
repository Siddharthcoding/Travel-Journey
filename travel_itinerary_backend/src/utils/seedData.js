import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Trip } from '../models/Trip.js';
import { User } from '../models/User.js';

dotenv.config();

// Sample trip data with more destinations by continent
export const tripData = [
  // South America trips
  {
    title: "Rio de Janeiro",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&auto=format",
    subtitle: "Wed, Oct 21 - Wed, Oct 28",
    description: "One of Brazil's most iconic cities, renowned for its beaches and mountains.",
    category: "South America",
    days: 7,
    rating: 5.0,
    reviews: 143,
    price: "$489",
    priceValue: 489,
    itinerary: [
      {
        day: 1,
        title: "Arrival to Rio de Janeiro",
        activities: [
          { time: "Morning", description: "Arrive in Rio de Janeiro and transfer to your hotel" },
          { time: "Afternoon", description: "Free time to relax or explore the nearby area" },
          { time: "Evening", description: "Welcome dinner at a traditional Brazilian restaurant" }
        ]
      },
      {
        day: 2,
        title: "Rio de Janeiro Highlights",
        activities: [
          { time: "Morning", description: "Visit Christ the Redeemer statue" },
          { time: "Afternoon", description: "Tour of Sugarloaf Mountain with cable car ride" },
          { time: "Evening", description: "Dinner and Samba show" }
        ]
      }
    ]
  },
  {
    title: "Machu Picchu Explorer",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&auto=format",
    subtitle: "Tue, Nov 5 - Thu, Nov 14",
    description: "Discover the ancient wonders of Machu Picchu and the Sacred Valley.",
    category: "South America",
    days: 9,
    rating: 4.9,
    reviews: 178,
    price: "$1,199",
    priceValue: 1199,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Lima",
        activities: [
          { time: "Morning", description: "Arrive in Lima and transfer to your hotel" },
          { time: "Afternoon", description: "Orientation walk around Miraflores district" },
          { time: "Evening", description: "Welcome dinner at a local restaurant" }
        ]
      }
    ]
  },
  {
    title: "Patagonia Trek",
    country: "Argentina & Chile",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&auto=format",
    subtitle: "Mon, Feb 3 - Sun, Feb 16",
    description: "Experience the breathtaking landscapes of Patagonia in Argentina and Chile.",
    category: "South America",
    days: 14,
    rating: 4.8,
    reviews: 92,
    price: "$2,349",
    priceValue: 2349,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Buenos Aires",
        activities: [
          { time: "Morning", description: "Arrive in Buenos Aires and transfer to your hotel" },
          { time: "Afternoon", description: "Rest and acclimatization" },
          { time: "Evening", description: "Welcome dinner and trip briefing" }
        ]
      }
    ]
  },
  
  // Asia trips
  {
    title: "Bangkok Explorer",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&auto=format",
    subtitle: "Wed, Jan 15 - Wed, Jan 22",
    description: "Experience the vibrant culture and delicious cuisine of Bangkok.",
    category: "Asia",
    days: 7,
    rating: 4.7,
    reviews: 89,
    price: "$449",
    priceValue: 449,
    itinerary: [
      {
        day: 1,
        title: "Arrival to Bangkok",
        activities: [
          { time: "Morning", description: "Arrive in Bangkok and transfer to your hotel" },
          { time: "Afternoon", description: "Rest and refreshment" },
          { time: "Evening", description: "Night market food tour" }
        ]
      }
    ]
  },
  {
    title: "Kyoto Cultural Journey",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&auto=format",
    subtitle: "Sat, Apr 1 - Sat, Apr 8",
    description: "Immerse yourself in Japan's traditional culture in historic Kyoto.",
    category: "Asia",
    days: 7,
    rating: 4.9,
    reviews: 132,
    price: "$1,299",
    priceValue: 1299,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kyoto",
        activities: [
          { time: "Morning", description: "Arrive in Kyoto and transfer to your traditional ryokan" },
          { time: "Afternoon", description: "Tea ceremony experience" },
          { time: "Evening", description: "Traditional kaiseki dinner" }
        ]
      }
    ]
  },
  {
    title: "Bali Island Hopping",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&auto=format",
    subtitle: "Mon, Jun 12 - Thu, Jun 22",
    description: "Explore the paradise islands of Bali, Nusa Penida, and the Gili Islands.",
    category: "Asia",
    days: 10,
    rating: 4.8,
    reviews: 156,
    price: "$899",
    priceValue: 899,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Denpasar",
        activities: [
          { time: "Morning", description: "Arrive in Denpasar and transfer to Ubud" },
          { time: "Afternoon", description: "Check-in and relax at your villa" },
          { time: "Evening", description: "Welcome dinner with traditional dance performance" }
        ]
      }
    ]
  },
  
  // Europe trips
  {
    title: "Paris Getaway",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&auto=format",
    subtitle: "Sat, Feb 14 - Sat, Feb 21",
    description: "Explore the romantic streets and iconic landmarks of Paris.",
    category: "Europe",
    days: 7,
    rating: 4.9,
    reviews: 215,
    price: "$789",
    priceValue: 789,
    itinerary: [
      {
        day: 1,
        title: "Arrival to Paris",
        activities: [
          { time: "Morning", description: "Arrive in Paris and transfer to your hotel" },
          { time: "Afternoon", description: "Orientation walk around neighborhood" },
          { time: "Evening", description: "Welcome dinner at a French bistro" }
        ]
      }
    ]
  },
  {
    title: "Italian Highlights",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&auto=format",
    subtitle: "Thu, May 5 - Sun, May 15",
    description: "Discover the beauty of Rome, Florence, and Venice in this Italian adventure.",
    category: "Europe",
    days: 10,
    rating: 4.8,
    reviews: 183,
    price: "$1,599",
    priceValue: 1599,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rome",
        activities: [
          { time: "Morning", description: "Arrive in Rome and transfer to your hotel" },
          { time: "Afternoon", description: "Orientation walk around the historic center" },
          { time: "Evening", description: "Welcome dinner at a traditional trattoria" }
        ]
      }
    ]
  },
  {
    title: "Greek Island Hopping",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&auto=format",
    subtitle: "Sun, Jul 9 - Wed, Jul 19",
    description: "Experience the stunning beauty of Santorini, Mykonos, and Athens.",
    category: "Europe",
    days: 10,
    rating: 4.7,
    reviews: 148,
    price: "$1,299",
    priceValue: 1299,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Athens",
        activities: [
          { time: "Morning", description: "Arrive in Athens and transfer to your hotel" },
          { time: "Afternoon", description: "Visit the Acropolis" },
          { time: "Evening", description: "Dinner in the Plaka district" }
        ]
      }
    ]
  },
  
  // Africa trips
  {
    title: "Nairobi Safari",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&auto=format",
    subtitle: "Mon, Mar 10 - Mon, Mar 17",
    description: "Witness the incredible wildlife of Kenya on this safari adventure.",
    category: "Africa",
    days: 7,
    rating: 4.8,
    reviews: 64,
    price: "$899",
    priceValue: 899,
    itinerary: [
      {
        day: 1,
        title: "Arrival to Nairobi",
        activities: [
          { time: "Morning", description: "Arrive in Nairobi and transfer to your lodge" },
          { time: "Afternoon", description: "Rest and preparation for safari" },
          { time: "Evening", description: "Welcome dinner and safari briefing" }
        ]
      }
    ]
  },
  {
    title: "Moroccan Discovery",
    country: "Morocco",
    image: "https://images.unsplash.com/photo-1548018560-c7196548970d?q=80&auto=format",
    subtitle: "Thu, Nov 3 - Fri, Nov 11",
    description: "Explore the vibrant markets, ancient medinas, and Sahara Desert in Morocco.",
    category: "Africa",
    days: 8,
    rating: 4.6,
    reviews: 97,
    price: "$749",
    priceValue: 749,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Marrakech",
        activities: [
          { time: "Morning", description: "Arrive in Marrakech and transfer to your riad" },
          { time: "Afternoon", description: "Rest and refreshment" },
          { time: "Evening", description: "Welcome dinner in Jemaa el-Fnaa square" }
        ]
      }
    ]
  },
  {
    title: "Cape Town & Winelands",
    country: "South Africa",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&auto=format",
    subtitle: "Tue, Jan 10 - Wed, Jan 18",
    description: "Discover the beauty of Cape Town, Table Mountain, and the Cape Winelands.",
    category: "Africa",
    days: 8,
    rating: 4.7,
    reviews: 109,
    price: "$999",
    priceValue: 999,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cape Town",
        activities: [
          { time: "Morning", description: "Arrive in Cape Town and transfer to your hotel" },
          { time: "Afternoon", description: "Orientation walk along the V&A Waterfront" },
          { time: "Evening", description: "Welcome dinner with views of Table Mountain" }
        ]
      }
    ]
  },
  
  // North America trips
  {
    title: "New York City Weekend",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&auto=format",
    subtitle: "Fri, Oct 7 - Mon, Oct 10",
    description: "Experience the energy and attractions of the Big Apple in a long weekend.",
    category: "North America",
    days: 3,
    rating: 4.6,
    reviews: 128,
    price: "$649",
    priceValue: 649,
    itinerary: [
      {
        day: 1,
        title: "Arrival in New York",
        activities: [
          { time: "Morning", description: "Arrive in New York and transfer to your hotel" },
          { time: "Afternoon", description: "Times Square and Midtown exploration" },
          { time: "Evening", description: "Broadway show experience" }
        ]
      }
    ]
  },
  {
    title: "Canadian Rockies",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&auto=format",
    subtitle: "Mon, Jul 3 - Tue, Jul 11",
    description: "Discover the breathtaking landscapes of Banff and Jasper National Parks.",
    category: "North America",
    days: 8,
    rating: 4.9,
    reviews: 87,
    price: "$1,399",
    priceValue: 1399,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Calgary",
        activities: [
          { time: "Morning", description: "Arrive in Calgary and pick up rental car" },
          { time: "Afternoon", description: "Drive to Banff National Park" },
          { time: "Evening", description: "Check-in and orientation walk in Banff" }
        ]
      }
    ]
  },
  {
    title: "Mexico's Yucatan Peninsula",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1574866412308-32d9923e2530?q=80&auto=format",
    subtitle: "Tue, Dec 5 - Thu, Dec 14",
    description: "Explore ancient Mayan ruins, stunning beaches, and colonial cities.",
    category: "North America",
    days: 9,
    rating: 4.7,
    reviews: 114,
    price: "$849",
    priceValue: 849,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cancun",
        activities: [
          { time: "Morning", description: "Arrive in Cancun and transfer to Playa del Carmen" },
          { time: "Afternoon", description: "Check-in and beach time" },
          { time: "Evening", description: "Welcome dinner on 5th Avenue" }
        ]
      }
    ]
  },
  
  // Oceania trips
  {
    title: "Sydney & Great Barrier Reef",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&auto=format",
    subtitle: "Sat, Feb 4 - Thu, Feb 16",
    description: "Experience the best of Sydney and the world's largest coral reef system.",
    category: "Oceania",
    days: 12,
    rating: 4.8,
    reviews: 95,
    price: "$2,799",
    priceValue: 2799,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sydney",
        activities: [
          { time: "Morning", description: "Arrive in Sydney and transfer to your hotel" },
          { time: "Afternoon", description: "Rest and acclimatization" },
          { time: "Evening", description: "Welcome dinner with views of Sydney Harbour" }
        ]
      }
    ]
  },
  {
    title: "New Zealand Adventure",
    country: "New Zealand",
    image: "https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?q=80&auto=format",
    subtitle: "Wed, Mar 8 - Tue, Mar 21",
    description: "Explore the stunning landscapes of New Zealand's North and South Islands.",
    category: "Oceania",
    days: 14,
    rating: 4.9,
    reviews: 76,
    price: "$3,099",
    priceValue: 3099,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Auckland",
        activities: [
          { time: "Morning", description: "Arrive in Auckland and transfer to your hotel" },
          { time: "Afternoon", description: "Orientation walk in Auckland" },
          { time: "Evening", description: "Welcome dinner at Sky Tower" }
        ]
      }
    ]
  },
  {
    title: "Fiji Island Paradise",
    country: "Fiji",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&auto=format",
    subtitle: "Fri, Sep 8 - Sat, Sep 16",
    description: "Experience the ultimate relaxation on Fiji's pristine beaches and crystal waters.",
    category: "Oceania",
    days: 8,
    rating: 4.8,
    reviews: 122,
    price: "$1,899",
    priceValue: 1899,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nadi",
        activities: [
          { time: "Morning", description: "Arrive in Nadi and transfer to your island resort by boat" },
          { time: "Afternoon", description: "Check-in and beach time" },
          { time: "Evening", description: "Welcome dinner with traditional Fijian performance" }
        ]
      }
    ]
  }
];