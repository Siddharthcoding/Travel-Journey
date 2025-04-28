# Travel Itinerary Application

## Overview
Travel Itinerary is a web application that helps users discover, plan, and save trips to various destinations. It provides user authentication, trip browsing, detailed views, and a customizable user profile — all built with a clean, responsive design.

This project includes a separate **frontend** (`React.js`) and **backend** (`Node.js + Express`) for modularity and scalability.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Component Hierarchy](#component-hierarchy)
- [Challenges Faced](#challenges-faced)
- [Future Enhancements](#future-enhancements)

---

## Project Structure

### Frontend: `travel_itinerary`
```
travel_itinerary/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
```

### Backend: `travel_itinerary_backend`
```
travel_itinerary_backend/
├── node_modules/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
├── .env
├── package.json
├── server.js
├── README.md
```

---

## Frontend Overview

- **Framework**: React.js with Vite for faster builds
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **Key Components**:
  - `LandingPage`, `Home`, `DestinationView`: Core pages for trip exploration.
  - `Login`, `Signup`, `Onboarding`: User authentication flows.
  - `Dashboard`, `Profile`, `Settings`: User-specific management sections.
  - `TripDetails`, `SavedTrips`: Viewing and saving travel plans.
  - `NavBar`, `BottomNav`, `HamburgerMenu`: Responsive navigation UI.
  - `ProtectedRoute`: Protects authenticated-only pages.
  - `ThemeToggle`, `SortMenu`, `UserMenu`: Auxiliary UI components.

- **Folder Highlights**:
  - `context/`: Authentication and trip context providers.
  - `hooks/`: Custom reusable logic (e.g., fetching data, handling auth).
  - `services/`: API call services to backend.

---

## Backend Overview

- **Framework**: Node.js with Express.js
- **Database**: MongoDB (Mongoose models)
- **Key Controllers**:
  - `authController.js`: Manages user signup/login/logout.
  - `tripController.js`: Manages trip creation, fetching, updating.
- **Middleware**:
  - Authentication checks, error handlers, input validations.
- **Routing**:
  - `auth` routes, `trip` routes connecting controllers to endpoints.
- **Utils**:
  - Common helper functions (like token generation).

---

## Component Hierarchy

```
App.jsx
 ├── NavBar / BottomNav / HamburgerMenu
 └── Routes
     ├── LandingPage
     ├── Home (ProtectedRoute)
     │    ├── DestinationView
     │    ├── TripDetails
     │    ├── SavedTrips
     ├── Dashboard (ProtectedRoute)
     │    ├── Profile
     │    ├── Settings
     ├── Login / Signup / Onboarding
```

- Public pages: LandingPage, Login, Signup
- Protected pages: Home, Dashboard, TripDetails, SavedTrips

---

## Challenges Faced

- **Trip Data Loading**:  
  - Some API calls returned empty results because the database was not seeded with trip data or the fetch request paths were incorrect.
  - Solved by double-checking API endpoints and backend controllers.

- **Authentication Management**:  
  - Implementing `ProtectedRoute` correctly across routes was tricky.
  - Required persistent auth (tokens in localStorage) and context refreshes.

- **State Complexity**:  
  - Managing saved trips, selected trip details, and user profile needed Context API for consistent state access across the app.

- **Theme Toggling**:
  - Ensuring smooth switching between light and dark themes globally was challenging, especially with Tailwind dark mode classes.

- **Responsive Navigation**:
  - Adjusting multiple navigation components (`NavBar`, `BottomNav`, `HamburgerMenu`) for mobile and desktop breakpoints.

---

## Future Enhancements

- Add trip filtering by destination, price, rating, etc.
- Implement password reset and email verification.
- Add multi-language support.
- Integrate maps and travel route planners.
- Improve trip save and share functionalities.
- Add admin panel for managing trips and users.
