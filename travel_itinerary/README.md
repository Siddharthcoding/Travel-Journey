# Travel Journey Frontend

This is the frontend for the Travel Journey application, a React-based web app for exploring and booking travel itineraries.

## Features

- Beautiful landing page with animated elements
- User authentication (signup, login)
- Trip browsing and filtering
- Trip details view with itinerary
- Responsive design with dark mode support
- Integration with backend API

## Setup

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

Start the development server:
```
npm run dev
```

Build for production:
```
npm run build
```

Preview the production build:
```
npm run preview
```

## Connecting to the Backend

Make sure the backend server is running at http://localhost:5000 (or update the `.env` file if using a different URL).

## Technologies Used

- React 19
- React Router v7
- Framer Motion for animations
- Tailwind CSS for styling
- Axios for API requests
